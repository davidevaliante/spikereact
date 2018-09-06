import firebase from 'firebase/app';
// import 'firebase/database'
import 'firebase/storage'
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';
import { STORAGE_FOLDERS, DATABASE_REFERENCE, COUNTRY } from '../enums/Constants';
import now from 'lodash/now';
import axios from 'axios'
import snakeCase from 'lodash/snakeCase'
const config = configuration;
const firebaseApp = firebase.initializeApp(config);

export const getFirebase = () => firebase



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
        )
        .catch(
            (error) => { console.log(error) }
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
export const editSlot = (slotId, slotToUpdate) => {

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
}






export const pushNewProducer = (newProducer, image, callback, country) => {
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
    axios.delete(`${databaseRoot}/Slots/${id}.json`)
        .then(
            () => callback()
        )

}


export const deleteBonusWithId = (id, callback) => {
    axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.SLOT}/${id}.json`)
        .then(
            () => callback()
        )
}


export const deleteProducerWithId = (id, callback) => {
    axios.delete(`${databaseRoot}/${DATABASE_REFERENCE.PRODUCER}/${id}.json`)
        .then(
            () => callback()
        )
}