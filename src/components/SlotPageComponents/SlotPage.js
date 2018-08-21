import React, { Component } from 'react'
import {
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getSlotWithId } from '../../firebase/firebase'

import Navbar from '../HomeComponents/Navbar'

class SlotPage extends Component {

    state = {
        slot: {}
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    componentDidMount() {

        /* id viene passato dinamicamente da react router e passato nelle props all'interno
           DOCS : https://reacttraining.com/react-router/web/api/Route/route-props
        */
        const { id } = this.props.match.params
        // se redux è accessibile
        if (_.get(this.props.slotList, id)) {
            this.setState({ slot: _.get(this.props.slotList, id) })
            console.log(_.get(this.props.slotList, id));
        }
        // altrimenti carica da firebase
        else {
            /* questa funzione prende l'id della slot come primo argomento ed una funzione come secondo
               argomento (callback). Di solito le metto fuori per chiarezza ma stavolta deve solo chiamare
               setState con i dati scaricati e quindi è inutile
            */
            getSlotWithId(id, (slot) => this.setState({ slot: slot }))
        }

    }

    render() {
        const { name } = this.state.slot
        const { fixed } = this.state

        return (
            <Responsive
                minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ minHeight: 700, padding: 0 }}
                        vertical>
                        <header>
                            <Navbar fixed={fixed} />
                            <div className='hero-text-box'>
                                <h1 className='headerSpikeText'>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                            </div>
                        </header>
                    </Segment>
                </Visibility>


            </Responsive>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList
})

export default connect(mapStateToProps)(SlotPage)
