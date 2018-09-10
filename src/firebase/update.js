import axios from 'axios'
import now from 'lodash/now'
import { databaseRoot } from './firebase'
import snakeCase from 'lodash/snakeCase'
import { pushNewImage } from './firebase'
import { STORAGE_FOLDERS } from '../enums/Constants'

export const updateBonusWithId = (bonusId, updatedBonus, updatedImage, callback) => {
    const data = now()
    axios.patch(`${databaseRoot}/Bonus/it/${bonusId}.json`, { ...updatedBonus, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.BONUS_IMAGES,
                    `bonus_${snakeCase(updatedBonus.name)}`
                )
            }
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
}