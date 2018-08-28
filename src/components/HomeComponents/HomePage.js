import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    List,
    Segment,
    Sticky, Transition, Visibility
} from 'semantic-ui-react'
import React, { Component } from 'react'
import ResponsiveContainer from './ResponsiveContainer'
import SlotList from './SlotList'
import BonusList from './BonusList'
import YouTubeEmbed from '../SlotPageComponents/YouTubeEmbed'
import { connect } from 'react-redux';
import Footer from "../Footer";
import ListDescriptionBanner from './ListDescriptionBanner'
import { ROUTE, SLOT_TYPES } from "../../enums/Constants";
import _ from 'lodash'


class HomepageLayout extends Component {
    state = {};
    title = '';

    handleContextRef = contextRef => this.setState({ contextRef })

    segmentStyle = {

        background: 'linear-gradient(177deg, #e13333, #453c3c)',
        animation: 'AnimationName 11s ease infinite',
        padding: '5em 0em'
    }

    getType(path) {
        switch (path) {
            case ROUTE.SLOT_ONLINE:
                this.title = 'Slot Online'
                return SLOT_TYPES.ONLINE;
            case ROUTE.SLOT_BAR:
                this.title = 'Slot da Bar'
                return SLOT_TYPES.BAR;
            case ROUTE.SLOT_GRATIS:
                this.title = 'Slot Gratis'
                return SLOT_TYPES.GRATIS;
            default:
                this.title = 'Le Slot del giorno'
                return undefined
        }
    }

    render() {
        const { contextRef } = this.state
        const type = this.getType(this.props.match.path)
        console.log(this.state);

        // a quale component mettere  ref={this.handleContextRef} ????

        return (
            <ResponsiveContainer>
                <div className='home-page-intro-container'>
                    <div className='home-page-intro-outer'>
                        <div className='home-page-intro-bg'>
                            <div className='home-page-intro'>
                                <h2>Sono giochi di fortuna o anche di abilità?</h2>
                                <p>La <a href='https://www.adm.gov.it/portale/documents/20182/1103856/art110TULPS.pdf/e205cb30-2a0f-41b1-8578-b66d6103a38b'>legge</a> che regolamenta le <strong>awp</strong> stabilisce che oltre al fattore aleatorio, in minima parte l’esito di una partità può dover dipendere anche dall’abilità del giocatore.</p>
                                <p>Ovviamente ci sono slot machine in cui questa componente di abilità <strong>conta in misura maggiore</strong>, altre dove è irrilevante.</p>
                            </div>
                        </div>
                    </div>
                </div>




                <Segment vertical>
                    <Grid style={{ margin: '0rem' }} celled='internally' stackable className='row-centered-spaced'>
                        <Grid.Row style={{ paddingBottom: '4rem' }}>
                            <Grid.Column width={12} >
                                <div ref={this.handleContextRef}>
                                    <ListDescriptionBanner />
                                    <SlotList cardPerRow={3} maxSlot={9} type={type} />
                                </div>
                            </Grid.Column>

                            <Grid.Column
                                style={{ paddingTop: '0' }}
                                width={4}>
                                <Sticky context={contextRef} offset={80}>
                                    <BonusList maxNumber={15} />
                                </Sticky>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Footer />
            </ResponsiveContainer >
        )
    }
}


const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomepageLayout)