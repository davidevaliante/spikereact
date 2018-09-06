import firebase from 'firebase/app';
// import 'firebase/database'
import 'firebase/storage'
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';
import { STORAGE_FOLDERS, DATABASE_REFERENCE } from '../enums/Constants';
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


export const pushNewSlot = (newSlot, imageData, onPushSlotSuccess, language) => {
    newSlot['time'] = now()
    let l = 'it'
    if (language && language !== 'it') l = language
    axios.post(`${databaseRoot}/Slots/${l}.json`, newSlot)
        .then(
            (success) => {
                const key = success.data.name;
                axios.put(`${databaseRoot}/Producer-Slot/${newSlot.producer.id}/${key}.json`, true)
                for (const bonusId in newSlot.bonus) {
                    axios.put(`${databaseRoot}/Bonus-Slot/${bonusId}/${key}.json`, true)
                }
                const filetype = imageData.imageFile.name.split('.').pop()

                pushNewImage(
                    imageData.imageFile,
                    `${STORAGE_FOLDERS.SLOT_IMAGES}`,
                    snakeCase(newSlot.name),
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


export const pushNewProducer = (newProducer, callback) => {
    pushNewImage(newProducer.image, STORAGE_FOLDERS.PRODUCER_IMAGES, (url) => {
        newProducer['image'] = url
        axios.post(`${databaseRoot}/Producer.json`, newProducer)
            .then(
                (success) => {
                    callback()
                }
            )
    })

}

export const pushNewBonus = (newBonus, onBonusPushSuccess) => {
    pushNewImage(newBonus.image, STORAGE_FOLDERS.BONUS_IMAGES, (url) => {
        newBonus['image'] = url
        axios.post(`${databaseRoot}/Bonus.json`, newBonus)
            .then(
                (success) => {
                    onBonusPushSuccess()
                }
            )
    })
}


export const getBonusList = (callback) => {
    axios.get(`${databaseRoot}/Bonus.json`)
        .then(
            success => callback(success.data)
        )
}



export const getProducerList = (callback) => {
    axios.get(`${databaseRoot}/Producer.json`)
        .then(
            success => callback(success.data)
        )
}



export const getSlotList = (callback) => {
    axios.get(`${databaseRoot}/SlotsCard.json`)
        .then(
            success => callback(success.data)
        )
}



export const getSlotWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Slots/${id}.json`)
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