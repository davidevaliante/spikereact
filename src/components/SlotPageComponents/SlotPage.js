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
class SlotPage extends Component {

    state = {
        currentSlot: {},
        currentSlotId: ''
    }

    componentDidMount() {
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



    render() {
        const { currentSlot, fixed } = this.state
        const { isPlaying, isLoading } = this.props
        return (
            <div>
                <Dimmer.Dimmable dimmed={isPlaying}>
                    {window.scrollTo(0, 0)}

                    <PlayDimmer url={currentSlot.linkPlay} />

                    <SlotPageHeader
                        displaying='SLOT'
                        loading={isLoading}
                        fixmenu={fixed}
                        currentSlot={currentSlot} />

                    <Description
                        slotName={currentSlot.name}
                        text={currentSlot.description} />

                    <Grid celled='internally' columns='equal' stackable style={{ paddingTop: '0rem', paddingBottom: '0rem' }}>
                        <Grid.Row textAlign='center' id='slot-page-lists'>
                            <TipsList tipList={currentSlot.tips} />
                            <TecnicalsList tecList={currentSlot.tecnicals} />
                        </Grid.Row>
                    </Grid>
                    <SlotPageBonusList bonusList={currentSlot.bonus} />
                    <YouTubeEmbed width='900' height='450' linkYoutube={currentSlot.linkYoutube} />
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

export default connect(mapStateToProps)(SlotPage)
