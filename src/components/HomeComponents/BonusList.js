import PropTypes from 'prop-types';
import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import BonusCard from './BonusCard'
import { Feed } from 'semantic-ui-react'


export const BonusList = (props) => {

    const bonusListToColumn = bonusList => {

        const listOfBonus = []

        for (const key in bonusList) {
            const element = bonusList[key]
            element['id'] = key
            listOfBonus.push(element)
        }

        const column = _.slice(_.shuffle(listOfBonus), 0, props.maxNumber)

        return _.slice(_.shuffle(column), 0, 4).map(bonus => <BonusCard bonus={bonus} key={bonus.id} />)
    }

    return (
        <Feed className='vertical-center'>
            {bonusListToColumn(props.bonusList)}
        </Feed>
    )
}

BonusList.propTypes = {
    maxNumber: PropTypes.number
}

const mapStateToProps = (state) => ({
    bonusList: state.bonusList,
    contextRef: state.contextRef

})


export default connect(mapStateToProps)(BonusList)