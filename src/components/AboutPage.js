import React, { Component } from 'react';
import { Responsive, Segment, Sticky, Grid, Header, Container, Icon } from "semantic-ui-react";
import SpikeHeader from "./Header";
import BonusList from "./HomeComponents/BonusList";
import Footer from "./Footer";
import { Button } from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import { setUserPlaying } from "../reducers/PlayModeReducer";
import SlotPageBonusList from "./SlotPageComponents/SlotPageBonusList";
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react'

export const AboutPage = () => {
    return (
        <div>
            <Responsive
                minWidth={Responsive.onlyTablet.minWidth}>
                <SpikeHeader displaying='HOME' />

                <Segment style={{ padding: '6em 0em' }} vertical id='about-page'>
                    <Container text>

                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Chi è SPIKE:
                        </Header>

                        <p style={{ fontSize: '1.33em' }}>

                            <Image floated='left' src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fspike-slot.jpg?alt=media&token=965c3785-1b53-47b9-a50f-a5c757c00269' size='medium' />


                            <p>
                                Salve a tutti signori, sono <strong>SPIKE</strong>!
                                Sono un ragazzo del centro-italia di 28 anni che ha fatto del suo vizio la
                                sua <strong>principale fonte di guadagno</strong>. Gioco alle Slot machine dai
                                tempi delle prime comma 6, le mitiche slot che hanno sostituito i videopoker.
                                Chi non ricorderà la Cherry Slot 2 o la Royal Slot? Era il 2006 circa&#8230;</p>
                            <p>Da allora purtroppo le nuove slot machine da bar sono molto cambiate. Le facili
                                vincite che si ottenevano allora con trucchi e metodi ora sono molto più
                                difficili da realizzare. Difficili ma non impossibili!</p>


                            <p>Il <Image floated="right" src="https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fgiorni-follia-6.jpg?alt=media&token=ec325483-fd4c-458b-b20f-82dcf388e4ea" size="medium"></Image> <a href="http://youtube.com/spikeslot"><strong>Canale YouTube</strong></a>
                                <strong> di SPIKE</strong> nacque nel 2010 per caso, quando
                                unicamente per hobby, caricavo le vincite che ottenevo alle Slot da bar. I video
                                iniziano ad essere seguiti. Solo nel 2014 inizio a dedicarmici seriamente, e
                                nasce la mitica serie <strong>&#8220;Giorni di Ordinaria
                                    Follia&#8221;</strong> in cui vi mostro una giornata tipo: insieme ai miei
                        Soci andiamo in giro a giocare alle Slot, con varie gag divertenti tra una
                                partita e l&#8217;altra.</p>
                            <p>Poi per la passione che da sempre ho per l&#8217;informatica e il mondo
                                digitale, <strong>SPIKE</strong> si è trasformato in qualcosa di più.</p>
                            <p>Appoggiandosi a <Link to="/"> spikeslot </Link>  e al
                                forum <a href="http://www.Professioneslot.it"
                                    target="_blank"> Professioneslot </a>, è diventato il principale
                        (e forse unico) strumento informativo e di dialogo veramente competente in
                                materia, <strong>per tutti i giocatori di Slot Machine d&#8217;Italia.</strong>
                            </p>
                            <p>&nbsp;</p>
                            <Header>Come vincere alle slot machine?</Header>
                            <p>Le slot AWP sono disciplinate da un regolamento <strong>(il comma 6a del
                                TULPS)</strong>, che obbliga i produttori di Slot ad inserire come fattore
                                determinante dell&#8217;esito della partita oltre ovviamente ad uno
                                aleatorio, <strong>anche una componente di abilità</strong>. E sarà proprio
                                questa la chiave delle vincite che faremo.</p>
                            <p>Con questo non voglio illudervi di facili guadagni. Ovviamente <strong>le slot
                                macchine sono progettate per incassare denaro</strong> e non per regalarlo; si
                                parte

                                svantaggiati
                                in partenza. Oltre l'esperienza, che io posso mettere a vostra
                                disposizione completamente Gratis, molto dipenderà dalle vostre attitudini
                                mentali, e dal vostro autocontrollo. Per cui non mi assumo alcuna responsabilità
                                di perdite derivate da un non corretto utilizzo delle informazioni che troverete
                                su questo sito.</p>
                            <p>Ma vi garantisco, che con queste caratteristiche, <strong>vincere alle Slot è
                                possibile!</strong> Ci vuole conoscenza prima di tutto. Se un giocatore
                                inesperto si trova a giocare a una <strong>slot Ulisse</strong> per esempio, non
                                conoscendola e convinto che possa scaricare anche grandi cifre, potrebbe
                                infognarsi e inserirci anche 5-600 euro nella speranza di recuperare. Leggendo
                                su <strong>SPIKE</strong> invece, scoprirete che state buttando i vostri soldi.
                                Diverso sarebbe invece approcciarsi ad altri tipi di slot machine, ad esempio
                                la <strong>Fowl Play Gold</strong>.</p>
                            <p><strong>Visita il sito e cerca i consigli
                            <Link to="/"> qui </Link> per la tua slot preferita! E
                                gioca sempre responsabilmente!</strong></p>
                        </p>
                    </Container>
                    {/*<SlotPageBonusList bonusList={props.currentSlot.bonus} />*/}
                </Segment>

                {/*<Segment style={{padding: '5em 0em'}} vertical>*/}
                {/*<Grid style={{margin: '0rem'}} celled='internally' stackable className='row-centered-spaced'>*/}
                {/*<Grid.Row style={{paddingBottom: '4rem'}}>*/}
                {/*<Grid.Column width={12} style={{ padding: '6em 4em' }}>*/}
                {/*<div>*/}
                {/*<Header id='about-header' style={{fontSize: '3em', textAlign: 'center'}}>*/}
                {/*Chi è SPIKE – About me (SPIKE slot)*/}
                {/*</Header>*/}
                {/**/}
                {/*</div>*/}

                {/*</Grid.Column>*/}

                {/*<Grid.Column*/}
                {/*style={{paddingTop: '0'}}*/}
                {/*width={4}>*/}
                {/*<Sticky offset={80}>*/}
                {/*<BonusList maxNumber={15}/>*/}
                {/*</Sticky>*/}
                {/*</Grid.Column>*/}
                {/*</Grid.Row>*/}
                {/*</Grid>*/}
                {/*</Segment>*/}
                <Footer />
            </Responsive>
        </div>
    );
};
