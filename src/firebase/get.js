import axios from 'axios'
import { COUNTRY } from '../enums/Constants'
import { databaseRoot } from './firebase'
import store from '../store/store'
import { addSlotList } from '../reducers/SlotListReducer'
import { updateSlotMenuList } from '../reducers/SlotsMenuReducer'

export const getBonusWithId = (id, country, callback) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/Bonus/it/${id}.json`)
        .then(
            success => callback(success.data)
        )
}

export const getSlotsForMenu = (callback) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/SlotsMenu/it.json`)
        .then(
            response => {
                store.dispatch(updateSlotMenuList(response.data))
            }
        )
}

export const getSlotBasedOnProducer = (producerName, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="name"&startAt="${producerName}"`)
        .then(
            list => {
                store.dispatch(addSlotList(list.data))
            }
        ).catch(err => console.log(err)
        )
}

// primo chunk di 
export const getSlotsCardBasedOnTime = (limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&limitToLast=${limit}`)
        .then(
            list => {
                store.dispatch(addSlotList(list.data))
            }
        ).catch(err => console.log(err)
        )
}

// primo chunk di 
export const loadNextChunk = (limit, end, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&endAt=${end}&limitToLast=${limit}`)
        .then(
            list => {
                store.dispatch(addSlotList(list.data))
            }
        )
}


export const getSlotsCardBasedOnName = (text, limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="name"&startAt="${text}"&endAt="${text}\uf8ff"`)
        .then(
            list => console.log(list.data)
        )
}


export const getSlotsCardBasedOnRating = (limit, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="rating"&limitToLast=${limit}`)
        .then(
            list => console.log(list.data)
        )
}