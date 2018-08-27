import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Header from '../Header'
import TipsList from './TipsList'
import TecnicalsList from './TecnicalsList'
import Description from './Description'
import PlayDimmer from './PlayDimmer'
import SlotPageBonusList from './SlotPageBonusList'
import { Segment, Grid, Dimmer } from 'semantic-ui-react'
import { Footer } from "../Footer";
import YouTubeEmbed from './YouTubeEmbed'


const SlotPage = (props) => {
    console.log(props.valoreAggiunto);


    return (
        <div>
            <Dimmer.Dimmable dimmed={props.isPlaying}>
                {window.scrollTo(0, 0)}

                <PlayDimmer url={props.currentSlot.linkPlay} />

                <Header
                    displaying='SLOT'
                    slotId={props.match.params.id} />

                <Description
                    slotName={props.currentSlot.name}
                    text={props.currentSlot.description} />

                <Grid celled='internally' columns='equal' stackable style={{ paddingTop: '0rem', paddingBottom: '0rem' }}>
                    <Grid.Row textAlign='center' id='slot-page-lists'>
                        <TipsList tipList={props.currentSlot.tips} />
                        <TecnicalsList tecList={props.currentSlot.tecnicals} />
                    </Grid.Row>
                </Grid>
                <SlotPageBonusList bonusList={props.currentSlot.bonus} />
                <YouTubeEmbed width='900' height='450' />
                <Footer />
            </Dimmer.Dimmable>
        </div>
    )

}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    currentSlot: state.currentSlot,
    isPlaying: state.isPlaying
})

export default connect(mapStateToProps)(SlotPage)
