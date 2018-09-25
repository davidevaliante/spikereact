import React, { Component } from 'react'
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Responsive } from 'semantic-ui-react-single/Responsive';
// components
import Footer from "../Footer";
import ListDescriptionBanner from './ListDescriptionBanner'
import HomePageHeader from '../Header/HomePageHeader'
import SiteDescription from './HomeBody/SiteDescription'
import HomeBody from './HomeBody/HomeBody'
import Navbar from '../Header/Navbar'
import PopularSlotList from './HomeBody/PopularSlotList'
// router e redux
import { connect } from 'react-redux';
import { ROUTE, SLOT_TYPES, PAGES } from "../../enums/Constants";
import { setHomePage, setGratisPage, setBarPage, setAboutPage, setProducerPage, setArticlePage } from '../../reducers/CurrentPageReducer'
// data
import { getSlotsCardBasedOnTime, getAllByType } from '../../firebase/get'

class HomePage extends Component {
    state = {};

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.displaying !== this.props.displaying) {
            switch (this.props.displaying) {
                case PAGES.HOME:
                    getSlotsCardBasedOnTime(12);
                    break;
                case PAGES.SLOT_BAR:
                    getAllByType('BAR');
                    break;
                case PAGES.SLOT_GRATIS:
                    getAllByType('GRATIS');
                    break;
                default:
            }
        }
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
                return 'ABOUT'
            case ROUTE.ARTICLE:
                this.props.dispatch(setArticlePage())
                return 'ARTICLE'
            case ROUTE.PRODUCER:
                this.title = this.props.match.params.name
                this.props.dispatch(setProducerPage(this.props.match.params.name))
                return SLOT_TYPES.PRODUCER_FILTERED


            default:
                this.title = 'Le Slot del giorno'
                this.props.dispatch(setHomePage())
                return undefined
        }
    }

    render() {
        const { contextRef, order } = this.state
        const type = this.getType(this.props.match.path)

        return (
            <div>
                <Navbar displaying='HOME'/>
                <HomePageHeader style={{ position: 'absolute', zIndex: 1 }} />
                <SiteDescription />
                <Segment vertical>
                    <PopularSlotList />

                    <ListDescriptionBanner />
                    <HomeBody
                        orderHandler={this.handleChange}
                        slotorder={order}
                        handleContextRef={this.handleContextRef}
                        type={type}
                        isSticky={contextRef} />
                </Segment>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    displaying: state.displaying,
    slotList: state.slotList,
    bonusList: state.bonusList,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomePage)