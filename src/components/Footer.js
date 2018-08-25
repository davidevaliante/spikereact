import { Container, Grid, Header, Image, Item, List, Segment, Icon } from 'semantic-ui-react'
import "../style/base.css"
import React from "react";


export const Footer = (props) => {

    return (
        <div>
            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            {/*<Grid.Column width={1}>*/}
                            {/*<Image cicrular size='mini' src='https://react.semantic-ui.com/logo.png' />*/}
                            {/*</Grid.Column>*/}

                            <Grid.Column width={4}>
                                <Header inverted as='h4' content='' />
                                <List link inverted>
                                    {/*<List.Item as='a'>Sitemap</List.Item>*/}

                                    <Image circular src="https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/FooterImage%2FKarloSpike.jpg?alt=media&token=a6e240b0-4a52-4525-9c9b-c3ecd6df77e2" size="tiny" />
                                </List>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Header inverted as='h4' content='Social' />
                                <List link inverted>
                                    <List.Item as="a" > <a href="https://www.facebook.com/spikeslot/"> <p> <Icon name="facebook official" size="big" inverted color='grey'  > </Icon> Facebook</p> </a> </List.Item>
                                    <List.Item as="a" > <a href="https://youtube.com/spikeslot"> <p><Icon name="youtube icon" size="big" inverted color='grey' > </Icon>Youtube</p>  </a> </List.Item>
                                    <List.Item as="a" > <a href="https://www.instagram.com/spikeslot/"><p> <Icon name="instagram icon" size="big" inverted color='grey' ></Icon>Instagram</p>  </a></List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={5}>

                                <p as='h4' inverted>Se il gioco diventa un problema</p>
                                <p >Numero verde di aiuto alla ludopatia</p>

                                <List.Item> <p> <Icon name="phone" size="big" ></Icon>800 135 903 </p></List.Item>

                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
            <Segment inverted vertical
                style={{ backgroundColor: '#3b3c3d', marginTop: '0', paddingTop: '1rem', paddingBottom: '1.5rem' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row style={{ paddingTop: '2rem' }}>
                            <Grid.Column textAlign='center'>
                                <List link inverted>
                                    <List.Item>Copyright &copy; 2018. All rights Reserved</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div >
    )
}

export default Footer()