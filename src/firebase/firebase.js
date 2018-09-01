import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';
import { STORAGE_FOLDERS, DATABASE_REFERENCE } from '../enums/Constants';
import  now  from 'lodash/now';

const config = configuration;
const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();


export const pushNewImage = (image, folderName, callback) => {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${folderName}/${image.name}`).put(image)
        .then(
            (snapshot) => snapshot.ref.getDownloadURL()
                .then(
                    (url) => callback(url)
                )
                .catch(
                    (error) => { console.log(error) }
                )
        )
        .catch(
            (error) => { console.log(error) }
        )
}


export const pushNewSlot = (newSlot, onPushSlotSuccess) => {
    pushNewImage(newSlot.image, STORAGE_FOLDERS.SLOT_IMAGES, (url) => {
        newSlot['image'] = url
        newSlot['time'] = now();
        firebase.database().ref(DATABASE_REFERENCE.SLOT).push(newSlot)
            .then(
                (completed) => {
                    const key = completed.key;
                    firebase.database().ref(`Producer-Slot/${newSlot.producer.id}/${key}`).set(true);
                    for (const bonusId in newSlot.bonus) {
                        firebase.database().ref(`Bonus-Slot/${bonusId}/${key}`).set(true);
                    }
                    onPushSlotSuccess();
                }
            )
            .catch(
                (fail) => {
                    console.log('New slot push failed', fail);
                }
            )
    })

}


export const pushNewProducer = (newProducer, callback) => {
    pushNewImage(newProducer.image, STORAGE_FOLDERS.PRODUCER_IMAGES, (url) => {
        newProducer['image'] = url
        firebase.database().ref(DATABASE_REFERENCE.PRODUCER).push(newProducer)
            .then(
                (snapshot) => {
                    callback()
                }
            )
    })

}

export const pushNewBonus = (newBonus, onBonusPushSuccess) => {
    pushNewImage(newBonus.image, STORAGE_FOLDERS.BONUS_IMAGES, (url) => {
        newBonus['image'] = url
        firebase.database().ref(DATABASE_REFERENCE.BONUS).push(newBonus)
            .then(
                ((snapshot) => {
                    onBonusPushSuccess();
                })
            )
            .catch(
                (fail) => {
                    console.log('New bonus push failed');
                    console.log(fail);
                }
            )
    })
}

export const getBonusList = (callback) => {
    firebaseDatabase.ref(DATABASE_REFERENCE.BONUS).once('value')
        .then(
            (snapshot) => {
                callback(snapshot.val());
            }
        )
}

export const getProducerList = (callback) => {
    firebaseDatabase.ref(DATABASE_REFERENCE.PRODUCER).once('value')
        .then(
            (snapshot) => callback(snapshot.val())
        )
}

export const getSlotList = (callback) => {
    const slotPath = firebaseDatabase.ref(DATABASE_REFERENCE.SLOT)
    slotPath.orderByChild('time').once('value')
        .then(
            (snapshot) => {
                callback(snapshot.val())
            }
        )
}

export const getSlotWithId = (id, callback) => {
    firebaseDatabase.ref(`${DATABASE_REFERENCE.SLOT}/${id}`).once('value')
        .then(
            (snapshot) => callback(snapshot.val())
        )
}

export const deleteSlotWithId = (id, callback) => {
    firebaseDatabase.ref(`${DATABASE_REFERENCE.SLOT}/${id}`).remove()
        .then(
            () => {
                console.log('deleteSlotWithId', id, callback)
                callback()
            }
        ).catch(
            (error) => {
                console.log('deleteSlotWithId', id, callback, error)
                callback(error)
            }
        )
    // callback()
}


export const getUserAuthStatus = (store) => {
    firebaseApp.auth().onAuthStateChanged((user) => {
        if (!user) {
            store.dispatch(setUserLoggedOut());
            store.dispatch(setUserId(undefined));
            store.dispatch(setUserName(undefined));
        } else {
            store.dispatch(setUserLoggedIn());
            store.dispatch(setUserId("someuserid"));
            store.dispatch(setUserName("Need to fecth this"));
        }
    });
}
