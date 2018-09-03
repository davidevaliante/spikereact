import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react-single/Button'
import { setUserPlaying } from '../../reducers/PlayModeReducer'
import { Icon } from 'semantic-ui-react-single/Icon'


const ShortHandMenu = (props) => {

    const smoothScrollTo = (elementId) => {
        // Scroll to a certain element
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }






    return (
        <div className='shorthand-container-style'>

            <div className='small-buttons-container'>
                <Button
                    style={{ width: '30%', height: '100%', marginRight: '1.6rem' }}
                    inverted
                    color='red'
                    onClick={() => smoothScrollTo('slot-page-description')}>
                    Descrizione e strategia
                </Button>

                <Button
                    style={{ width: '30%', marginRight: '1.6rem' }}
                    inverted
                    color='red'
                    onClick={() => smoothScrollTo('slot-page-lists')}>
                    Consigli di gioco
                </Button>

                <Button
                    style={{ width: '30%' }}
                    inverted
                    color='red'
                    onClick={() => smoothScrollTo('slot-page-lists')}>
                    Scheda tecnica
                </Button>
            </div>

            <div className='big-buttons-container'>
                <Button style={{ width: '45%' }} animated size='huge' color='white' onClick={() => props.dispatch(setUserPlaying())}>
                    <Button.Content visible>Provala Subito</Button.Content>
                    <Button.Content hidden>
                        <Icon name='gamepad' />
                    </Button.Content>
                </Button>

                <Button style={{ width: '45%' }} size='huge' color='red' onClick={() => smoothScrollTo('slot-page-bonus')}>
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