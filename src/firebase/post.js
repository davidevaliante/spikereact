import axios from 'axios'
import { databaseRoot } from './firebaseConfig'
import { pushNewBonus } from './firebase'
import now from 'lodash/now';

export const submitExtraFromHtml = newExtra => {
    const objectToPush = newExtra;
    objectToPush['time'] = now();
    axios.post(`${databaseRoot}/Extra/it.json`, objectToPush)
        .then(success => console.log('pushed :', success.data))
};

/* export const pushNewBonuswithGuide = (newBonus, image, guide, callback) => {
    console.log('running');
    const newGuide = { content: guide }
    axios.post(`${databaseRoot}/Extra/it.json`, newGuide)
        .then(
            success => console.log(success.data)
        )
        .catch(
            error => console.log(error)
        )
} */


export const pushNewBonuswithGuide = async (newBonus, image, guide, language, callback) => {
    const newGuide = {
        bonus: newBonus,
        time: now(),
        content: guide
    }
    const guidePushId = await axios.post(`${databaseRoot}/BonusGuides/it.json`, newGuide)
    newBonus['guideId'] = guidePushId.data.name
    newBonus['time'] = now()
    const newBonusCallbackData = await axios.post(`${databaseRoot}/Bonus/it.json`, newBonus)
    if (callback)
        callback(newBonusCallbackData)
}