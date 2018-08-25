import React from 'react'
import {connect} from 'react-redux'
import { Button, Segment } from 'semantic-ui-react'

const ShortHandMenu = (props) => {

    const scrollToDescription = () => {
        // Scroll to a certain element
        document.getElementById('slot-page-description').scrollIntoView({ 
            behavior: 'smooth',
            block:'start'
        });
    }

    const scrollToLists = () => {
        document.getElementById('slot-page-lists').scrollIntoView({
            behavior: 'smooth',
            block:'start'
        })
    }

    const scrollToBonus = () => {
        document.getElementById('slot-page-bonus').scrollIntoView({
            behavior: 'smooth',
            block:'start'
        })
    }

    return(
        <div className='fast-buttons-layout'>

            <Button inverted color='red' style={{marginRight:'1.6rem'}} onClick={()=>scrollToDescription()}>
                Descrizione
            </Button>

            <Button inverted color='red' style={{marginRight:'1.6rem'}} onClick={()=>scrollToLists()}>
                Consigli di gioco
            </Button>

            <Button inverted color='red' style={{marginRight:'1.6rem'}} onClick={()=>scrollToLists()}>
                Scheda tecnica
            </Button>

            <Button inverted color='red' style={{marginRight:'1.6rem'}} onClick={()=>scrollToBonus()}>
                Bonus
            </Button>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    dispatch:state.dispatch
})

export default connect(mapStateToProps)(ShortHandMenu)