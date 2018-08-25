import store from '../store/store'
import { addSlotList } from '../reducers/SlotListReducer'
import { addBonusList } from '../reducers/BonusListReducer'
import { addProducerList } from '../reducers/ProducerListReducer'


export const onSlotListFetched = (slotList) => {
    let list = {}
    for (const key in slotList) {
        const slot = slotList[key];
        slot['id'] = key
        list[key] = slot
    }
    store.dispatch(addSlotList(list))

}

export const onBonusListFetched = (bonusList) => {
    let list = {}
    for (const key in bonusList) {
        const bonus = bonusList[key];
        list[key] = bonus
    }
    store.dispatch(addBonusList(list))
}

export const onProducerListFetched = (producerList) => {
    let list = {}
    for (const key in producerList) {
        const producer = producerList[key];
        list[key] = producer;
    }
    store.dispatch(addProducerList(list))
}