import firebase from 'firebase/app';
// import 'firebase/database'
import 'firebase/storage'
import { STORAGE_FOLDERS, COUNTRY } from '../enums/Constants';
import now from 'lodash/now';
import axios from 'axios'
import snakeCase from 'lodash/snakeCase'


const databaseRoot = 'https://spike-2481d.firebaseio.com';



export const pushNewImage = (image, folderName, imageName, callback) => {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${folderName}/${imageName}`).put(image)
        .then(
            (snapshot) => snapshot.ref.getDownloadURL()
                .then(
                    (url) => callback && callback(url)
                )
                .catch(
                    (error) => { console.log(error) }
                )
                .catch(
                    (error) => { console.log(error) }
                )
        )
}


export const pushNewSlot = (newSlot, imageData, onPushSlotSuccess, country) => {
    newSlot['time'] = now()
    let c = COUNTRY.ITALY
    axios.post(`${databaseRoot}/Slots/${c}.json`, newSlot)
        .then(
            (success) => {
                const key = success.data.name;
                axios.put(`${databaseRoot}/Producer-Slot/${newSlot.producer.id}/${key}.json`, true)
                for (const bonusId in newSlot.bonus) {
                    axios.put(`${databaseRoot}/Bonus-Slot/${bonusId}/${key}.json`, true)
                }

                pushNewImage(
                    imageData.imageFile,
                    `${STORAGE_FOLDERS.SLOT_IMAGES}`,
                    `slot_${snakeCase(newSlot.name)}`,
                )
                onPushSlotSuccess();
            }
        )
        .catch(
            (error) => console.log(error)
        )
        .then(

        )
}

export const pushNewBonus = (newBonus, imageData, onBonusPushSuccess, country) => {
    newBonus['time'] = now()
    let c = COUNTRY.ITALY
    axios.post(`${databaseRoot}/Bonus/${c}.json`, newBonus)
        .then(
            (success) => {
                pushNewImage(
                    imageData,
                    `${STORAGE_FOLDERS.BONUS_IMAGES}`,
                    `bonus_${snakeCase(newBonus.name)}`
                )
                onBonusPushSuccess()
            }
        )

}

//non so bene come passare l immagine  
/* export const editSlot = (slotId, slotToUpdate) => {

    firebase.database().ref(`${databaseRoot}/Slots/l +${slotId}`).set({
        name: slotToUpdate.name,
        producer: slotToUpdate.producer,
        linkYoutube: slotToUpdate.linkYoutube,
        linkPlay: slotToUpdate.linkPlay,
        bonus: slotToUpdate.BONUS,
        description: slotToUpdate.description,
        rating: slotToUpdate.rating,
        time: slotToUpdate.time,
        tips: slotToUpdate.tipsField,
        tecnicals: slotToUpdate.tecnicalsField,
    },


        function (error) {
            if (error) {
                // The write failed...
            } else {
                // Data saved successfully!
            }

        });
} */

export const pushNewProducer = (newProducer, image, callback, country) => {
    newProducer['time'] = now()
    let c = COUNTRY.ITALY
    axios.post(`${databaseRoot}/Producer/${c}.json`, newProducer)
        .then(
            (success) => {
                pushNewImage(
                    image,
                    STORAGE_FOLDERS.PRODUCER_IMAGES,
                    `producer_${snakeCase(newProducer.name)}`
                )
                callback()
            }
        )


}

export const getBonusList = (callback, country) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/Bonus/${c}.json`)
        .then(
            success => callback(success.data)
        )
}



export const getProducerList = (callback, country) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/Producer/${c}.json`)
        .then(
            success => callback(success.data)
        )
}

export const getSlotList = (callback, country) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/SlotsCard/${c}.json`)
        .then(
            success => callback(success.data)
        )
}

export const getSlotWithId = (id, callback, country) => {
    let c = COUNTRY.ITALY
    axios.get(`${databaseRoot}/Slots/${c}/${id}.json`)
        .then(
            success => callback(success.data)
        )
}

export const deleteSlotWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Slots/it/${id}/name.json`)
        .then(
            success => {
                const slotName = success.data
                axios.delete(`${databaseRoot}/Slots/it/${id}.json`)
                    .then(
                        () => {
                            firebase.storage().ref().child(`SlotImages/${snakeCase(slotName)}`).delete()
                                .then(() => callback())
                        }
                    )
            }
        )
    axios.delete(`${databaseRoot}/SlotsCard/it/${id}.json`)
    axios.delete(`${databaseRoot}/SlotsMenu/it/${id}.json`)

}

export const deleteBonusWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Bonus/it/${id}/name.json`)
        .then(
            success => {
                const bonusName = success.data
                axios.delete(`${databaseRoot}/Bonus/it/${id}.json`)
                    .then(
                        () => {
                            firebase.storage().ref().child(`BonusImages/${snakeCase(bonusName)}`).delete()
                                .then(() => callback())
                        }
                    )
            }
        )
}

export const deleteProducerWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Producer/it/${id}/name.json`)
        .then(
            success => {
                const ProducerName = success.data
                axios.delete(`${databaseRoot}/Producer/it/${id}.json`)
                    .then(
                        () => {
                            firebase.storage().ref().child(`ProducerImages/${snakeCase(ProducerName)}`).delete()
                                .then(() => callback())
                        }
                    )
            }
        )
}

export const updateSlotWithId = (slotId, updatedSlot, updatedImage, callback) => {
    const data = now()
    axios.patch(`${databaseRoot}/Slots/it/${slotId}.json`, { ...updatedSlot, time: data })
        .then((fullfilled) => {
            if (updatedImage) {
                pushNewImage(
                    updatedImage,
                    STORAGE_FOLDERS.SLOT_IMAGES,
                    `slot_${snakeCase(updatedSlot.name)}`
                )
            }
            console.log('patched');
        })
        .catch(error => console.log(error)
        )
}


// ----------------------NON CANCELLARE MA NON USARE---------------------
/* export const swapSlotsToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Slots.json`)
        .then(
            (snapshot) => {
                const slotList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in slotList) {
                    const slot = slotList[id]
                    if (!slot.isFake) {
                        axios.put(`${databaseRoot}/Slots/it/${id}.json`, omit(slot, ['isFake', 'image']))
                    }
                }
            }
        )
}

export const swapBonusToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Bonus.json`)
        .then(
            (snapshot) => {
                const bonusList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in bonusList) {
                    const slot = bonusList[id]
                    axios.put(`${databaseRoot}/Bonus/it/${id}.json`, slot)
                }
            }
        )
}

export const swapProducerToNewDatabase = () => {
    // prende l'oggetto completo con tutte le slot
    axios.get(`${databaseRoot}/Producer.json`)
        .then(
            (snapshot) => {
                const producerList = snapshot.data
                // per ogni chiave (cioè id)
                for (const id in producerList) {
                    const slot = producerList[id]
                    axios.put(`${databaseRoot}/Producer/it/${id}.json`, slot)
                }
            }
        )
}

export const removeImageLink = () => {
    axios.get(`${databaseRoot}/Producer/it.json`)
        .then(
            (snapshot) => {
                const slotList = snapshot.data
                for (const id in slotList) {
                    axios.delete(`${databaseRoot}/Producer/it/${id}/image.json`)

                }
            }
        )
}

export const purgeDb = () => {
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.SLOT}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.SLOT}/${id}.json`)
                }
            }
        )
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.BONUS}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.BONUS}/${id}.json`)
                }
            }
        )
    axios.get(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}.json`)
        .then(
            snapshot => {
                const l = snapshot.data
                for (const id in l) {
                    if (id !== 'it')
                        axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}/${id}.json`)
                }
            }
        )
} */

