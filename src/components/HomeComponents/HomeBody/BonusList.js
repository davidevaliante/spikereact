import PropTypes from 'prop-types';
import React from 'react'
import slice from 'lodash/slice'
import shuffle from 'lodash/shuffle'
import { connect } from 'react-redux'
import BonusCard from '../../Cards/BonusCard'
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed'


export const BonusList = (props) => {

    const bonusListToColumn = bonusList => {

        const listOfBonus = []

        for (const key in bonusList) {
            const element = bonusList[key]
            element['id'] = key
            listOfBonus.push(element)
        }

        const column = slice(shuffle(listOfBonus), 0, props.maxNumber)

        return slice(shuffle(column), 0, 4).map(bonus => <BonusCard bonus={bonus} key={bonus.id} />)
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