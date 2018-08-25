import React from 'react'
import { Header } from 'semantic-ui-react'

import SlotPageSlotCard from './SlotPageBonusCard'

const SlotPageBonusList = (props) => {

    const bonusList = () => {
        const formattedList = []
        for (const key in props.bonusList) {
            const current = props.bonusList[key]
            formattedList.push(current)
        }
        return formattedList.map(bonus =>
            <div className='row-centered-spaced'>
                <SlotPageSlotCard bonus={bonus} />
            </div>
        )
    }

    return (
        <div id='slot-page-bonus' style={{ marginTop: '4rem', marginBottom:'6rem', textAlign:'center'}}>
            <Header as='h3' style={{ fontSize: '2em', marginBottom:'4rem' }}>I migliori bonus disponibili</Header>
            <div className='row-centered-spaced' style={{paddingLeft:'4rem', paddingRight:'4rem'}} >                
                {bonusList()}
            </div>
        </div>
        
    )
}

export default SlotPageBonusList;