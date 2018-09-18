import axios from 'axios'
import { databaseRoot } from './firebaseConfig'
import now from 'lodash/now';

export const submitExtraFromHtml = newExtra => {
    const objectToPush = newExtra;
    objectToPush['time'] = now();
    axios.post(`${databaseRoot}/Extra/it.json`, objectToPush)
        .then(success => console.log('pushed :', success.data))
};