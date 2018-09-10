import React from 'react'
import SlotCard from '../../Cards/SlotCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk'
import orderBy from 'lodash/orderBy'
import last from 'lodash/last'
import head from 'lodash/head'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { loadNextChunk } from '../../../firebase/get'

const SlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve caricare dinamicamente 
    // di più
    const slotListToRows = (slotList, ordering) => {

        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            if (props.type && element.type !== props.type)
                continue
            element['id'] = key
            listOfSlots.push(element)
        }

        switch (ordering) {
            case 'time':
                listOfSlots = orderBy(listOfSlots, ['time'], ['desc'])
                break
            case 'rating':
                listOfSlots = orderBy(listOfSlots, ['rating'], ['desc'])
                break
            case 'name':
                listOfSlots = orderBy(listOfSlots, ['name'], ['asc'])
                break
            default:
                listOfSlots = orderBy(listOfSlots, ['time'], ['desc'])
        }

        const rows = chunk(listOfSlots, props.cardPerRow)

        return rows.map((row, index) => (
            <div className='horizontal-center' key={`slot_row_${index}`}>
                {(index === rows.length - 2) && <Visibility once={false} onTopVisible={() => loadMoreSlots(listOfSlots)} />}
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>

        ))
    }

    const loadMoreSlots = (listOfSlots) => {
        console.log('start at', head(listOfSlots).time);

        loadNextChunk(12, last(listOfSlots).time)
    }



    return (
        <div className='vertical-center'>
            {props.slotList && slotListToRows(props.slotList, props.order)}
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