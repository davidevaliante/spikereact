import React from 'react'
// semantic
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { List } from 'semantic-ui-react-single/List'
// router e redux
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'

const ShortHandMenu = (props) => {

    const smoothScrollTo = (elementId) => {
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const buttonsStyle = {
        width: '165px', 
        height: '40px'
    }

    return (
        <div className='shorthand-container-style'>
            <div className='small-buttons-container'>
                <List style={{ margin: '0 auto'}}>
                    <List.Item>
                        <Button
                            style={buttonsStyle}
                            inverted
                            color='red'
                            onClick={() => smoothScrollTo('slot-page-description')}>
                            Descrizione
                        </Button>
                    </List.Item>

                    <List.Item>
                        <Button
                            style={buttonsStyle}
                            inverted
                            color='red'
                            onClick={() => smoothScrollTo('slot-page-lists')}>
                            Consigli di gioco
                        </Button>
                    </List.Item>
                    <List.Item>
                        <Button
                            style={buttonsStyle}
                            inverted
                            color={'red'}
                            onClick={() => smoothScrollTo('slot-page-lists')}>
                            Scheda tecnica
                        </Button>
                    </List.Item>
                </List>
            </div>

            <div className='big-buttons-container'>
                <Button style={{ width: '45%' }} 
                        animated 
                        size='huge' 
                        color='white' 
                        onClick={() => props.dispatch(setUserPlaying())}>
                    <Button.Content visible>Provala Subito</Button.Content>
                    <Button.Content hidden>
                        <Icon name='gamepad' />
                    </Button.Content>
                </Button>

                <Button style={{ width: '45%' }} 
                        size='huge' 
                        color='red' 
                        onClick={() => smoothScrollTo('slot-page-bonus')}>
                    Bonus Offerti
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch
})

export default connect(mapStateToProps)(ShortHandMenu)