import axios from 'axios'
import { COUNTRY } from '../enums/Constants'
import { databaseRoot } from './firebase'
import store from '../store/store'
import { addSlotList, replaceSlotList } from '../reducers/SlotListReducer'
import { updateSlotMenuList } from '../reducers/SlotsMenuReducer'
import { addPopularSlot } from '../reducers/PopularSlotreducer'
import map from 'lodash/map'
import forEach from 'lodash/forEach'

export const getExtraById = (extraId, callback) => {
    axios.get(`${databaseRoot}/Extra/it/${extraId}.json`)
        .then(value => {
            callback(value.data)
        })
}

export const getPopularSlots = () => {
    const idListToFetch = ['-LMTB6IRITXsmWGp4e-s', '-LLt3eNw41nayvVTDtSC',
        '-LMTDa-DXBM08cj454s5', '-LLtKLvdUfpgpLPJU_5x',
        '-LLVjwJsBoMYGlYTQmzE', '-LLtVumsNX92o6518exz',
        '-LMJ7Hu1ifdhKmRB4lDo', '-LMIsiZ_b3kF9UtnJ9bC']
    const queries = map(idListToFetch, id => axios.get(`${databaseRoot}/SlotsCard/it/${id}.json`))
    axios.all(queries).then(axios.spread(
        (one, two, three, four, five, six, seven, eight) => {
            store.dispatch(addPopularSlot(one.data))
            store.dispatch(addPopularSlot(two.data))
            store.dispatch(addPopularSlot(three.data))
            store.dispatch(addPopularSlot(four.data))
            store.dispatch(addPopularSlot(five.data))
            store.dispatch(addPopularSlot(six.data))
            store.dispatch(addPopularSlot(seven.data))
            store.dispatch(addPopularSlot(eight.data))
        }
    ))
}

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

export const getAllByType = (type, callback) => {
    axios.get(`${databaseRoot}/SlotsCard/it.json?orderBy="type"&equalTo="${type}"`)
        .then(
            list => {
                console.log(list.data);

                store.dispatch(replaceSlotList(list.data))
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