import React from 'react';
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

const Description = (props) => {



    return (
        <Segment style={{ padding: '6em 0em', borderBottom: '0px' }} vertical id='slot-page-description'>
            <Container text>

                <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Raleway' }}>
                    {props.slotName}
                </Header>

                <p style={{ fontSize: '1.33em', fontFamily: 'Raleway' }}>
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