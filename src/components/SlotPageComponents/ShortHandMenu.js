import React from 'react'
import { connect } from 'react-redux'
import { Button, Segment, Icon } from 'semantic-ui-react'

const ShortHandMenu = (props) => {

    const smoothScrollTo = (elementId) => {
        // Scroll to a certain element
        document.getElementById(elementId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }



    return (
        <div className='fast-buttons-layout'>

            <Button inverted color='red' style={{ marginRight: '1.6rem' }} onClick={() => smoothScrollTo('slot-page-description')}>
                Descrizione
            </Button>

            <Button inverted color='red' style={{ marginRight: '1.6rem' }} onClick={() => smoothScrollTo('slot-page-lists')}>
                Consigli di gioco
            </Button>

            <Button inverted color='red' style={{ marginRight: '1.6rem' }} onClick={() => smoothScrollTo('slot-page-lists')}>
                Scheda tecnica
            </Button>

            <Button inverted color='red' style={{ marginRight: '1.6rem' }} onClick={() => smoothScrollTo('slot-page-bonus')}>
                Bonus Offerti
            </Button>

           
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch
})

export default connect(mapStateToProps)(ShortHandMenu)