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
        <div id='slot-page-bonus' style={{ paddingTop: '8rem', marginBottom: '8rem', textAlign: 'center' }}>

            <div className='home-page-intro-container' style={{ width: '100%', marginBottom: '8rem' }}>
                <div className='home-page-intro-outer' style={{ width: '100%' }}>
                    <div className='home-page-intro-bg' style={{ width: '100%' }}>
                        <div className='home-page-intro' style={{ width: '100%' }}>
                            <h1>I migliori Bonus</h1>
                            <p>Passa dalla teoria alla pratica</p>
                            <p>Utilizza questi bonus ed inizia a vincere soldi veri su siti certificati e sicuri</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='row-centered-spaced' style={{ paddingLeft: '4rem', paddingRight: '4rem' }} >
                {bonusList()}
            </div>
        </div>

    )
}

export default SlotPageBonusList;