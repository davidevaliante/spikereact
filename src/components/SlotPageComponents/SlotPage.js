import React, { Component } from 'react'
import { connect } from 'react-redux'
import TipsList from './TipsList'
import TecnicalsList from './TecnicalsList'
import Description from './Description'
import PlayDimmer from './PlayDimmer'
import SlotPageBonusList from './SlotPageBonusList'
import { Grid } from 'semantic-ui-react-single/Grid'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import Footer from "../Footer";
import YouTubeEmbed from './YouTubeEmbed'
import SlotPageHeader from '../Header/SlotPageHeader'
import { getSlotWithId } from '../../firebase/firebase'
import { slotIsLoading, slotIsLoaded } from '../../reducers/SlotPageReducer'
import Navbar from '../Header/Navbar'
import { Responsive } from 'semantic-ui-react-single/Responsive';
import { withRouter } from 'react-router-dom'
import split from 'lodash/split'
class SlotPage extends Component {

    state = {
        currentSlot: {},
        currentSlotId: ''
    }

    componentDidMount() {
        console.log('mounting')
        getSlotWithId(this.props.match.params.id, (slot) => {
            this.props.dispatch(slotIsLoaded())
            this.setState({
                currentSlot: slot,
                currentSlotId: this.props.match.params.id
            })
        })
    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        // se l'id nell'url è cambiato
        if (prevProps.match.params.id !== this.props.match.params.id) {
            console.log('firebase query');
            this.props.dispatch(slotIsLoading())
            getSlotWithId(this.props.match.params.id, (slot) => {
                this.props.dispatch(slotIsLoaded())
                this.setState({
                    currentSlot: slot,
                    currentSlotId: this.props.match.params.id
                })
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch(slotIsLoading())
    }

    getYoutubeEmbedSource = () => {
        const id = split(this.state.currentSlot.linkYoutube, '=').pop()
        return `https://www.youtube.com/embed/${id}`
    }

    render() {
        const { currentSlot } = this.state
        const { isPlaying, isLoading } = this.props
        return (
            <div>
                <Dimmer.Dimmable dimmed={isPlaying}>
                    {window.scrollTo(0, 0)}

                    <PlayDimmer url={currentSlot.linkPlay} />
                    <div>
                        <Responsive maxWidth={600}> <Navbar displaying={'SLOT'} isResponsive={true} /></Responsive>
                        <Responsive minWidth={600}>   <Navbar displaying={'SLOT'} isResponsive={false} /></Responsive>

                        <SlotPageHeader
                            style={{ position: 'absolute', zIndex: 1 }}
                            displaying='SLOT'
                            loading={isLoading}
                            currentSlot={currentSlot} />
                    </div>

                    <Description
                        slotName={currentSlot.name}
                        text={currentSlot.description} />

                    <Grid celled='internally' columns='equal' stackable style={{ paddingTop: '0rem', paddingBottom: '0rem' }}>
                        <Grid.Row textAlign='center' id='slot-page-lists'>
                            <TipsList tipList={currentSlot.tips} />
                            <TecnicalsList tecList={currentSlot.tecnicals} />
                        </Grid.Row>
                    </Grid>
                    <Responsive minWidth={1200} as={SlotPageBonusList} bonusList={currentSlot.bonus} isResponsive={true} />

                    <Responsive maxWidth={1200} isResponsive={false} as={SlotPageBonusList} bonusList={currentSlot.bonus}  >

                    </Responsive>
                    {currentSlot &&
                        <div>
                            <Responsive minWidth={600}>  <YouTubeEmbed width='900' height='450' src={this.getYoutubeEmbedSource()} /></Responsive>
                            <Responsive maxWidth={600}> <YouTubeEmbed width='300' height='150' src={this.getYoutubeEmbedSource()} /></Responsive>
                        </div>
                    }
                    <Footer />
                </Dimmer.Dimmable>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    isPlaying: state.isPlaying,
    isLoading: state.currentSlot.isLoading
})

export default withRouter(connect(mapStateToProps)(SlotPage))
