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
import Header from '../Header'


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
                <Header displaying='HOME' />

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