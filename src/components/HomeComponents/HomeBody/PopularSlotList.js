import React, { Component } from 'react'
import { connect } from 'react-redux'
import SlotCard from '../../Cards/SlotCard'
import { getPopularSlots } from '../../../firebase/get'
import chunk from 'lodash/chunk'

class PopularSlotList extends Component {
    state = {}

    componentDidMount() {

    }

    slotListToRows = (slotList) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            element['id'] = key
            listOfSlots.push(element)
        }



        const rows = chunk(listOfSlots, 4)

        return rows.map((row, index) => (
            <div className='horizontal-center' key={`slot_row_${index}`}>
                {row.map((element) =>
                    (element && <SlotCard slot={element} key={element.id} />))
                }
            </div>

        ))
    }

    render() {

        return (
            <div className='vertical-center' style={{ marginTop: '4rem' }}>
                <h3 className='popular-slot-header'>Le slot più popolari</h3>
                {this.props.popularSlots ? this.slotListToRows(this.props.popularSlots) : <div></div>}
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    dispatch: state.dispatch,
    popularSlots: state.popularSlots
})

export default connect(mapStatetoProps)(PopularSlotList)