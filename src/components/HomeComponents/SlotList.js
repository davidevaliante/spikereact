import React from 'react'
import SlotCard from '../SlotCard';
import { connect } from 'react-redux';
import _ from 'lodash';

const SlotList = (props) => {
    const slotListJsx = (slotList) => {
        const jsx = []
        for (const key in slotList) {
            const element = slotList[key]
            //jsx.push(<SlotCard slot={element} listKey={key} key={key} />)
            jsx.push(element)
        }

        return jsx
    }

    const slotListToRows = slotList => {
        const rows = _.chunk(slotList, 3)

        return rows.map(row => (

            <div className='flex-horizontal'>
                {console.log(row)}
                {row[0] && <SlotCard slot={row[0]} />}
                {row[1] && <SlotCard slot={row[1]} />}
                {row[2] && <SlotCard slot={row[2]} />}
            </div>

        ))
    }

    return (
        <div className='flex-vertical'>
            {props.slotList ? slotListToRows(slotListJsx(props.slotList)) : <h1>LOL</h1>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    slotList: state.slotList
})
export default connect(mapStateToProps)(SlotList)