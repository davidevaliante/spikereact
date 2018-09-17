import React from 'react'
import SlotPageSlotCard from './SlotPageBonusCard'
import {Grid} from 'semantic-ui-react-single/Grid'
import {Responsive} from 'semantic-ui-react-single/Responsive'
import {RESPONSIVE_RESOLUTION} from "../../enums/Constants";

const SlotPageBonusList = (props) => {

    const bonusList = () => {
        const formattedList = []
        for (const key in props.bonusList) {
            const current = props.bonusList[key]
            formattedList.push(current)
        }
        return formattedList.map((bonus, index) =>
            <Grid.Column><SlotPageSlotCard bonus={bonus}/></Grid.Column>
        )
    }

    const responsive = () => {
        return (
            <div className='row-centered-spaced' style={{paddingLeft: '4rem', paddingRight: '4rem'}}>
                {bonusList()}
            </div>
        )
    }

    const responsive2 = () => {
        return (
            <div style={{paddingLeft: '4rem', paddingRight: '4rem'}}>
                {bonusList()}
            </div>
        )
    }


    return (
        <div id='slot-page-bonus' style={{paddingTop: '8rem', marginBottom: '8rem', textAlign: 'center'}}>

            <div className='home-page-intro-container' style={{width: '100%', marginBottom: '8rem'}}>
                <div className='home-page-intro-outer' style={{width: '100%'}}>
                    <div className='home-page-intro-bg' style={{width: '100%'}}>
                        <div className='home-page-intro' style={{width: '100%'}}>
                            <h1>I migliori Bonus</h1>
                            <p>Passa dalla teoria alla pratica</p>
                            <p>Utilizza questi bonus ed inizia a vincere soldi veri su siti certificati e sicuri</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{padding: '0 2rem'}}>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                    <Grid stackable columns={4}>
                        {bonusList()}
                    </Grid>
                </Responsive>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                    <Grid stackable columns={3}>
                        {bonusList()}
                    </Grid>
                </Responsive>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <Grid stackable columns={2}>
                        {bonusList()}
                    </Grid>
                </Responsive>
                <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                    <Grid stackable columns={1}>
                        {bonusList()}
                    </Grid>
                </Responsive>
            </div>
        </div>

    )
}

export default SlotPageBonusList;