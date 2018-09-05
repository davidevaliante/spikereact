import { Segment } from 'semantic-ui-react-single/Segment'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Footer from "../Footer";
import ListDescriptionBanner from './ListDescriptionBanner'
import { ROUTE, SLOT_TYPES } from "../../enums/Constants";
import { setHomePage, setGratisPage, setBarPage, setAboutPage } from '../../reducers/CurrentPageReducer'
import HomePageHeader from '../Header/HomePageHeader'
import SiteDescription from './HomeBody/SiteDescription'
import HomeBody from './HomeBody/HomeBody'

class HomePage extends Component {
    state = {};
    title = '';

    componentDidMount() {
        // solo se redux è vuoto   
    }

    handleContextRef = contextRef => this.setState({ contextRef })
    handleChange = (e, { value }) => this.setState({ order: value })


    getType(path) {
        switch (path) {
            case ROUTE.SLOT_BAR:
                this.title = 'Slot da Bar'
                this.props.dispatch(setBarPage())
                return SLOT_TYPES.BAR;
            case ROUTE.SLOT_GRATIS:
                this.title = 'Slot Gratis'
                this.props.dispatch(setGratisPage())
                return SLOT_TYPES.GRATIS;
            case ROUTE.ABOUT:
                this.props.dispatch(setAboutPage())
                return undefined
            default:
                this.title = 'Le Slot del giorno'
                this.props.dispatch(setHomePage())
                return undefined
        }
    }

    render() {
        const { contextRef, order, fixed } = this.state
        const type = this.getType(this.props.match.path)

        return (
            <div>
                <HomePageHeader
                    fixmenu={fixed}
                />
                <SiteDescription />
                <Segment vertical>
                    <ListDescriptionBanner />
                    <HomeBody
                        orderHandler={this.handleChange}
                        slotorder={order}
                        handleContextRef={this.handleContextRef}
                        type={type}
                        isSticky={contextRef}
                    />
                </Segment>
                <Footer />
            </div >
        )
    }
}


const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList,
    bonusList: state.bonusList,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomePage)