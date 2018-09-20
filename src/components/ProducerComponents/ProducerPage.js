import React, {Component} from 'react';
// semantic
import {Responsive} from "semantic-ui-react-single/Responsive";
// mix
import Navbar from "../Header/Navbar";
// router e redux
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import ProducerHeader from "../Header/ProducerHeader";
import {PAGES, RESPONSIVE_RESOLUTION, SLOT_TYPES} from "../../enums/Constants";
import Description from "../SlotPageComponents/Description";
import {getProducerWithId, getProducerByName,getSlotListByProducerName, getSlotsCardBasedOnTime} from "../../firebase/get";
import Footer from "../Footer";
import {Segment} from "semantic-ui-react-single/Segment";
import FixedSlotList from '../FixedSlotList'
import {setProducerPage} from "../../reducers/CurrentPageReducer";
import {onListFetched} from "../../utils/Callbacks";


class ProducerPage extends Component {
    state = {
        displaying: PAGES.PRODUCER
    };

    componentDidMount() {
        this.gettingPageData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.producerName !== this.props.match.params.producerName){
            this.gettingPageData()
        }
    }

    gettingPageData = () => {
        console.log(this.props.match.params.producerName);
        
        getProducerByName(this.props.match.params.producerName, 
            // callback 
            producerDataResponse => {
            getSlotListByProducerName(this.props.match.params.producerName, 
                // callback 
                slotListObject => {
                this.setState({producer:producerDataResponse, slotProducerList: onListFetched(slotListObject)})
            })
        })
    }

    handleChange = (e, {value}) => this.setState({order: value});
    handleContextRef = contextRef => this.setState({contextRef});

    render() {
        const { currentProducer} = this.state;
        console.log(this.state);
        
        return (
            <div>
                <Navbar displaying={PAGES.PRODUCER}/>

                <ProducerHeader
                    style={{position: 'absolute', zIndex: 1}}
                    currentProducer={currentProducer}
                />

                 {/*<SiteDescription />*/}

                <Description
                    slotName={(currentProducer && currentProducer.name)}
                    text='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    hidePlayButton={true}
                />
                <div className='description-banner-container'>

                    <Responsive minWidth={766}>
                        <div className='description-banner-red'>
                            <div className='white-line scale-in-hor-right'/>
                            <div>
                                <h2 className="tracking-in-contract"
                                    style={{ fontFamily: 'Raleway, sans-serif' }}>&nbsp;</h2>
                            </div>
                        </div>
                    </Responsive>

                    <div className='description-banner-black'>
                        <h2 className="tracking-in-contract"
                            style={{ fontFamily: 'Raleway, sans-serif' }}>Slot del produttore</h2>
                        <div className='white-line scale-in-hor-left'/>
                    </div>
                </div>

                <Segment vertical>
                    {/*<HomeBody*/}
                        {/*orderHandler={this.handleChange}*/}
                        {/*slotorder={order}*/}
                        {/*handleContextRef={this.handleContextRef}*/}
                        {/*type={SLOT_TYPES.PRODUCER_FILTERED}*/}
                        {/*isSticky={contextRef}*/}
                    {/*/>*/}
                    <Responsive 
                        minWidth={RESPONSIVE_RESOLUTION.LARGE} 
                        as={FixedSlotList} 
                        cardPerRow={4} 
                        order='name'
                        slotList={this.state.slotProducerList} />
                    <Responsive 
                        minWidth={RESPONSIVE_RESOLUTION.MEDIUM} 
                        maxWidth={RESPONSIVE_RESOLUTION.LARGE} 
                        as={FixedSlotList} 
                        cardPerRow={2} 
                        order='name'
                        slotList={this.state.slotProducerList} />
                    <Responsive 
                        maxWidth={RESPONSIVE_RESOLUTION.MEDIUM} 
                        as={FixedSlotList} 
                        cardPerRow={1} 
                        order='name'
                        slotList={this.state.slotProducerList} />
                </Segment>

                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    displaying: state.displaying
});

export default withRouter(connect(mapStateToProps)(ProducerPage))