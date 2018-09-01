import React from 'react'
import SlotCard from '../SlotCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk'
import slice from 'lodash/slice'

const SlotList = (props) => {

    const slotListToRows = slotList => {

        const listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            if (props.type && element.type !== props.type)
                continue
            element['id'] = key
            listOfSlots.push(element)
        }

        const rows = chunk(slice(listOfSlots, 0, props.maxSlot), props.cardPerRow)

        return rows.map((row, index) => (
            <div className='horizontal-center' key={`slot_row_${index}`}>
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>

        ))
    }

    return (
        <div className='vertical-center'>
            {props.slotList && slotListToRows(props.slotList)}
        </div>
    )
}

SlotList.propTypes = {
    cardPerRow: PropTypes.number,
    maxSlot: PropTypes.number
}

const mapStateToProps = (state) => ({
    slotList: state.slotList,
})

export default connect(mapStateToProps)(SlotList)