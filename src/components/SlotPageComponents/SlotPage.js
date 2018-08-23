import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Header from '../Header'
import TipsList from './TipsList'
import TecnicalsList from './TecnicalsList'
import Description from './Description'
import PlayDimmer from './PlayDimmer'
import { Segment, Grid, Image, Header as SemanticHeader, Dimmer } from 'semantic-ui-react'


const SlotPage = (props) => {


    return (
        <div>
            <Dimmer.Dimmable dimmed={props.isPlaying}>
                <PlayDimmer url={props.currentSlot.linkPlay} />
                <Header displaying='SLOT' slotId={props.match.params.id} />
                <Description slotName={props.currentSlot.name} text={props.currentSlot.description} />
                <Segment vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                            <TipsList tipList={props.currentSlot.tips} />
                            <TecnicalsList tecList={props.currentSlot.tecnicals} />
                        </Grid.Row>
                    </Grid>
                </Segment>
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
