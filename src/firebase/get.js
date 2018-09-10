import axios from 'axios'
import { databaseRoot } from './firebase'
import firebase from 'firebase'
import store from '../store/store'
import keys from 'lodash/keys'
import { addSlotList } from '../reducers/SlotListReducer'

// primo chunk di 
export const getSlotsCardBasedOnTime = (limit, start, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&startAt=${start}&limitToLast=${limit}`)
        .then(
            list => {
                console.log('fetching', list.data);
                store.dispatch(addSlotList(list.data))
            }
        )
}

// primo chunk di 
export const loadNextChunk = (limit, end, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="time"&endAt=${end}&limitToLast=${limit}`)
        .then(
            list => {
                console.log('fetching', list.data);
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