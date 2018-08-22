import React, { Component } from 'react'
import {
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getSlotWithId } from './../firebase/firebase'

import Navbar from './HomeComponents/Navbar'
import LazyLoad from 'react-lazyload';

class Header extends Component {

    state = {
        displaying: 'HOME',
    }

    styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            height: '100vh'
        }
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    componentDidMount() {
        // aggiunto per il LazyLoading dell'immagine
        window.scrollTo(0, 0)

        const { displaying } = this.props


        if (displaying === 'SLOT') {
            /* id viene passato dinamicamente da react router e passato nelle props all'interno
               DOCS : https://reacttraining.com/react-router/web/api/Route/route-props
            */
            const id = this.props.slotId

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

    }

    homePageHeader = (fixed) => (
        <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header
                        style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fslot-header-img-min-min.jpg?alt=media&token=6648de0a-3cd6-402f-9ada-a961cf893c2a')` }}>
                        <div
                            style={this.styles.overlay}>
                            <Navbar fixed={fixed} />
                            <div className='hero-text-box'>
                                <h1 className='headerSpikeText'>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
        </Visibility>
    )

    slotPageHeader = (fixed, header, subheader, image) => (
        <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header
                        style={this.state.slot && { backgroundImage: `url(${image})` }}>
                        <div
                            style={this.styles.overlay}>
                            <Navbar fixed={fixed} />
                            <div className='hero-text-box'>
                                <h1 className='headerSpikeText'>{header}</h1>
                                <h1 className='slideRight'>{subheader}</h1>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
        </Visibility>
    )


    render() {
        const { fixed } = this.state
        const { displaying } = this.props
        const slot = this.state.slot

        switch (displaying) {
            case 'HOME':
                return this.homePageHeader(fixed)
            case 'SLOT':
                return this.slotPageHeader(fixed, slot && slot.name, slot && slot.producer.name, slot && slot.image)
            default:
                return this.homePageHeader(fixed)
        }
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList,
})

export default connect(mapStateToProps)(Header)

