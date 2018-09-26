import React from 'react'
// semantic
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { List } from 'semantic-ui-react-single/List'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// router e redux
import { connect } from 'react-redux'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
import { RESPONSIVE_RESOLUTION } from '../../enums/Constants'

const ShortHandMenu = (props) => {

    const smoothScrollTo = (elementId) => {
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    const buttonsStyle = {
        width: '165px', 
        height: '40px',
        margin: '0 1.6rem'
    }

    return (
        <div className='shorthand-container-style'>
            <Responsive maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
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
                                onClick={() => smoothScrollTo('slot-tips-list')}>
                                Consigli di gioco
                            </Button>
                        </List.Item>
                        <List.Item>
                            <Button
                                style={buttonsStyle}
                                inverted
                                color={'red'}
                                onClick={() => smoothScrollTo('slot-tec-list')}>
                                Scheda tecnica
                            </Button>
                        </List.Item>
                    </List>
                </div>
            </Responsive>
            <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                <div className='small-buttons-container'>
                    <Button
                        style={buttonsStyle}
                        inverted
                        color='red'
                        onClick={() => smoothScrollTo('slot-page-description')}>
                        Descrizione
                    </Button>
                 <Button
                        style={buttonsStyle}
                        inverted
                        color='red'
                        onClick={() => smoothScrollTo('slot-page-lists')}>
                        Consigli di gioco
                    </Button>
                    <Button
                        style={buttonsStyle}
                        inverted
                        color={'red'}
                        onClick={() => smoothScrollTo('slot-page-lists')}>
                        Scheda tecnica
                    </Button>
                </div>
            </Responsive>

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