import axios from 'axios'
import now from 'lodash/now'
import { databaseRoot } from './firebaseConfig'
import snakeCase from 'lodash/snakeCase'
import { pushNewImage } from './firebase'
import { STORAGE_FOLDERS } from '../enums/Constants'

export const updateBonusWithId = async (bonusId, updatedBonus, updatedImage, updatedBonusString, callback) => {
    const data = now();
    const guideId = updatedBonus.guideId
    // rest di un field che non serve
    updatedBonus['bonusId'] = undefined
    const updatedGuide = { bonus: updatedBonus, time: now(), content: updatedBonusString }
    try {
        // update bonus
        await axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data })
        // update immagine bonus
        if (updatedImage)
            await pushNewImage(updatedImage, STORAGE_FOLDERS.BONUS_IMAGES, `bonus_${snakeCase(updatedBonus.name)}`)
        // update guida
        await axios.patch(`${databaseRoot}/BonusGuides/it/${guideId}.json`, updatedGuide)
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