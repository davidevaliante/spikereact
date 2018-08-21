import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { getSlotList, getBonusList, getProducerList } from '../../firebase/firebase';
import _ from 'lodash';
import { addSlotList } from '../../reducers/SlotListReducer';
import { addBonusList } from '../../reducers/BonusListReducer';
import { addProducerList } from '../../reducers/ProducerListReducer';


class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    componentWillMount() {
        getSlotList(this.onSlotListFetched)
        getBonusList(this.onBonusListFetched)
        getProducerList(this.onProducerListFetched)
    }

    componentDidMount() {

    }

    onSlotListFetched = (slotList) => {
        let list = {}
        for (const key in slotList) {
            const slot = slotList[key];
            list[key] = slot
        }
        this.props.dispatch(addSlotList(list))
    }

    onBonusListFetched = (bonusList) => {
        let list = {}
        for (const key in bonusList) {
            const bonus = bonusList[key];
            list[key] = bonus
        }
        this.props.dispatch(addBonusList(list))
    }

    onProducerListFetched = (producerList) => {
        let list = {}
        for (const key in producerList) {
            const producer = producerList[key];
            list[key] = producer;
        }
        this.props.dispatch(addProducerList(list))
    }

    render() {
        console.log(this.state)
        const { children } = this.props
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

                {children}

            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
})

export default connect(mapStateToProps)(DesktopContainer)