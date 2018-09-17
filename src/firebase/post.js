import axios from 'axios'
import { COUNTRY } from '../enums/Constants'
import { databaseRoot } from './firebase'
import store from '../store/store'
import now from 'lodash/now';

export const submitExtraFromHtml = newExtra => {
    const objectToPush = newExtra
    objectToPush['time'] = now()
    axios.post(`${databaseRoot}/Extra/it.json`, objectToPush)
        .then(success => console.log('pushed :', success.data))
}