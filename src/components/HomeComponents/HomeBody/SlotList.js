import React from 'react'
import PropTypes from 'prop-types'
// components
import SlotCard from '../../Cards/SlotCard';
// mix
import orderBy from 'lodash/orderBy'
import last from 'lodash/last'
// data
import { loadNextChunk } from '../../../firebase/get'
// router e redux
import { connect } from 'react-redux';
import {Grid} from "semantic-ui-react-single/Grid";


const SlotList = (props) => {

    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre 
    const slotListToRows = (slotList, ordering) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
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

        return listOfSlots.map((element) => {
            return <SlotCard slot={element} key={element.id} />
        })
    }

    const loadMoreSlots = (listOfSlots) => {
        loadNextChunk(12, last(listOfSlots).time)
    }

    return (
        <Grid style={{ marginTop: '0rem' }} celled='internally' stackable className='row-centered-spaced'>
            <Grid.Row style={{ padding: '1rem' }} centered>
                {props.type === 'GRATIS' && slotListToRows}
                {props.slotList && slotListToRows(props.slotList, props.order)}
            </Grid.Row>
        </Grid>
    )
}

SlotList.propTypes = {
    cardPerRow: PropTypes.number,
    maxSlot: PropTypes.number,
    isFixed: PropTypes.bool
}

const mapStateToProps = (state) => ({
    slotList: state.slotList,
    displaying: state.displaying
})

export default connect(mapStateToProps)(SlotList)