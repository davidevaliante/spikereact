import axios from 'axios'
import { databaseRoot } from './firebaseConfig'
import { STORAGE_FOLDERS } from '../enums/Constants'
import { pushNewImage } from './firebase'
import snakeCase from 'lodash/snakeCase'
import now from 'lodash/now';

export const submitExtraFromHtml = (newExtra, callback) => {
    const objectToPush = newExtra;
    objectToPush['time'] = now();
    axios.post(`${databaseRoot}/Extra/it.json`, objectToPush)
        .then(success => {
            callback(success)
        })
};

export const pushNewBonuswithGuide = async (newBonus, image, guide, language, callback) => {
    const newGuide = {
        bonus: newBonus,
        time: now(),
        content: guide
    }
    newBonus['time'] = now()

    try {
        const guidePushId = await axios.post(`${databaseRoot}/BonusGuides/it.json`, newGuide)
        newBonus['guideId'] = guidePushId.data.name
        const newBonusCallbackData = await axios.post(`${databaseRoot}/Bonus/it.json`, newBonus)
        await pushNewImage(image, STORAGE_FOLDERS.BONUS_IMAGES, `bonus_${snakeCase(newBonus.name)}`)
        if (callback) callback(newBonusCallbackData)
    } catch (error) {
        console.log(error)
    }
}