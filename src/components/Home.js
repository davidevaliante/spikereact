import React, { Component } from 'react';
import Header from './Header';
import { getSlotList } from '../firebase/firebase';
import SlotCard from './SlotCard';
import _ from 'lodash'

class Home extends Component {

    state = {

    }

    componentDidMount() {
        getSlotList(this.onSlotListFetched)
    }

    onSlotListFetched = (slotList) => {
        let list = []
        for (const key in slotList) {
            const slot = slotList[key];
            list.push(slot)
        }
        this.setState({ slotList: _.reverse(list) })
    }

    slotListJsx = (slotList) => (
        _.slice(slotList, 0, 4).map((element, index) =>
            <SlotCard slot={element} listKey={index} key={index} />
        )
    )


    render() {

        const { slotList } = this.state
        return (
            <div>
                <Header />
                <div style={{ display: 'flex', padding: '2rem' }}>
                    {slotList ? this.slotListJsx(slotList) : <h1>LOL</h1>}
                </div>

            </div>
        )
    }
}


export default Home;
