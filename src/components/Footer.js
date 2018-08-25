import {Container, Grid, Header, Image, Item, List, Segment} from 'semantic-ui-react'
import React from "react";


export const Footer = (props) => {

    return (
        <div>
            <Segment inverted vertical style={{padding: '5em 0em'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            {/*<Grid.Column width={1}>*/}
                            {/*<Image cicrular size='mini' src='https://react.semantic-ui.com/logo.png' />*/}
                            {/*</Grid.Column>*/}

                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='Contatti'/>
                                <List link inverted>
                                    {/*<List.Item as='a'>Sitemap</List.Item>*/}
                                    <List.Item as='a'>Chi sono</List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Header inverted as='h4' content='Social'/>
                                <List link inverted>
                                    <List.Item as='a'><a href='https://youtube.com/spikeslot'>Youtube</a></List.Item>
                                    <List.Item as='a'><a href='https://www.facebook.com/spikeslot'>Facebook</a></List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={5}>
                                <p as='h4' inverted>Se il gioco diventa un problema</p>
                                <p>Numero verde di aiuto alla ludopatia</p>
                                <Header as='h2' inverted>
                                    <Image
                                        circular
                                        size='mini'
                                        src='https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Ftelefono_icon.png?alt=media&token=27e56676-61f5-4657-8b18-b916049fdd13'/>
                                    800 135 903
                                </Header>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
            <Segment inverted vertical
                     style={{backgroundColor: '#3b3c3d', marginTop: '0', paddingTop: '1rem', paddingBottom: '1.5rem'}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row style={{paddingTop: '2rem'}}>
                            <Grid.Column textAlign='center'>
                                <List link inverted>
                                    <List.Item>Copyright &copy; 2018. All rights Reserved</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    )
}

export default Footer()