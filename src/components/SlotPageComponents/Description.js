import React from 'react';
// semantic
import { Segment } from 'semantic-ui-react-single/Segment'
import { Container } from 'semantic-ui-react-single/Container'
import { Header } from 'semantic-ui-react-single/Header'
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
// router e redux
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
// mix
import Parser from 'html-react-parser'

const Description = (props) => {
    
    return (
        <Segment style={{ padding: '6em 0em', borderBottom: '0px' }} vertical id='slot-page-description'>
            <Container text>

                <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Raleway' }}>
                    {props.slotName}
                </Header>

                <p style={{ fontSize: '1.33em', fontFamily: 'Raleway' }}>
                    {Parser(`${props.text}`)}
                </p>

                {!props.hidePlayButton &&
                <div className='slot-playbutton'>
                    <Button animated color='red' size='huge' onClick={() => props.dispatch(setUserPlaying())}>
                        <Button.Content visible>Provala Subito !</Button.Content>
                        <Button.Content hidden>
                            <Icon name='gamepad' size='large'/>
                        </Button.Content>
                    </Button>
                </div>
                }
            </Container>
        </Segment>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch
})

export default connect(mapStateToProps)(Description);