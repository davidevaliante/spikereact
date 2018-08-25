import React from 'react';
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react'

const Description = (props) => {



    return (
        <Segment style={{ padding: '6em 0em' }} vertical id='slot-page-description'>
            <Container text>

                <Header as='h3' style={{ fontSize: '2em' }}>
                    {props.slotName}
                </Header>

                <p style={{ fontSize: '1.33em' }}>
                    {props.text}
                </p>
                <div className='slot-playbutton'>
                    <Button animated color='red' size='huge' onClick={() => props.dispatch(setUserPlaying())}>
                        <Button.Content visible>Provala Subito !</Button.Content>
                        <Button.Content hidden>
                            <Icon name='gamepad' size='large' />
                        </Button.Content>
                    </Button>
                </div>
            </Container>
        </Segment>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch
})

export default connect(mapStateToProps)(Description);