import axios from 'axios'
import now from 'lodash/now'
import { databaseRoot } from './firebaseConfig'
import snakeCase from 'lodash/snakeCase'
import { pushNewImage } from './firebase'
import { DATABASE_REFERENCE, STORAGE_FOLDERS } from '../enums/Constants'

export const updateExtraWithId = async (extraId, updatedObject, callback) => {
    const data = now()
    const task = axios.patch(`${databaseRoot}/Extra/it/${extraId}.json`, { ...updatedObject, time: data })
    callback && callback(task)
}

export const updateBonusWithId = async (bonusId, updatedBonus, updatedImage, updatedBonusString, callback) => {
    const data = now();
    const guideId = updatedBonus.guideId
    // rest di un field che non serve
    updatedBonus['bonusId'] = undefined
    const updatedGuide = { bonus: updatedBonus, time: now(), content: updatedBonusString }
    try {

        // update immagine bonus
        if (updatedImage)
            await pushNewImage(updatedImage, STORAGE_FOLDERS.BONUS_IMAGES, `bonus_${snakeCase(updatedBonus.name)}`)
        // update guida
        if (guideId) {
            await axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data })
            await axios.patch(`${databaseRoot}/BonusGuides/it/${guideId}.json`, updatedGuide)
        }
        else {
            const guideId = await axios.post(`${databaseRoot}/BonusGuides/it/.json`, updatedGuide)
            // update bonus
            updatedBonus['guideId'] = guideId.data.name
            await axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data })
        }
    } catch (error) {
        console.log(error)
    }
};

export const updateSlotWithId = (slotId, updatedSlot, updatedImage, callback) => {
    const data = now();
    axios.patch(`${databaseRoot}/Slots/it/${slotId}.json`, { ...updatedSlot, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.SLOT_IMAGES,
                    `slot_${snakeCase(updatedSlot.name)}`
                )
            }
            callback();
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
};

export const updateProducerWithId = (id, updatedProducer, updatedImage, callback) => {
    const data = now();
    axios.patch(`${databaseRoot}/Producer/it/${id}.json`, { ...updatedProducer, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.PRODUCER_IMAGES,
                    `producer_${snakeCase(updatedProducer.name)}`
                )
            }
            callback();
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
};
