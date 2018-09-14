import { Segment } from 'semantic-ui-react-single/Segment'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import Footer from "../Footer";
import ListDescriptionBanner from './ListDescriptionBanner'
import { ROUTE, SLOT_TYPES } from "../../enums/Constants";
import { setHomePage, setGratisPage, setBarPage, setAboutPage, setProducerPage } from '../../reducers/CurrentPageReducer'
import HomePageHeader from '../Header/HomePageHeader'
import SiteDescription from './HomeBody/SiteDescription'
import HomeBody from './HomeBody/HomeBody'
import Navbar from '../Header/Navbar'
import { getSlotBasedOnProducer } from '../../firebase/get'
import { Responsive } from 'semantic-ui-react-single/Responsive';

class HomePage extends Component {
    state = {};
    title = '';

    componentDidMount() {
        // allora è la pagina dei producer
        if (this.props.match.params.name) {
            // data fetch
            getSlotBasedOnProducer(this.props.match.params.name)
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
                <div>
                    <Responsive maxWidth={600}> <Navbar displaying='HOME' isResponsive={true} /></Responsive>
                    <Responsive minWidth={600}> <Navbar displaying='HOME' isResponsive={false} /></Responsive>
                    <HomePageHeader style={{ position: 'absolute', zIndex: 1 }} />
                </div>
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
    displaying:state.displaying,
    slotList: state.slotList,
    bonusList: state.bonusList,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomePage)