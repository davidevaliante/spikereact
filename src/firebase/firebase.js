import firebase from 'firebase';
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';
import { STORAGE_FOLDERS, DATABASE_REFERENCE } from '../enums/Constants';
import _ from 'lodash';

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
        )
}


export const pushNewSlot = (newSlot, onPushSlotSuccess) => {
    pushNewImage(newSlot.image, STORAGE_FOLDERS.SLOT_IMAGES, (url) => {
        newSlot['image'] = url
        newSlot['time'] = _.now();
        firebase.database().ref('Slots').push(newSlot)
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
                    console.log('New slot push failed');
                    console.log(fail);
                }
            )
    })

}




export const pushNewProducer = (newProducer, callback) => {
    pushNewImage(newProducer.image, STORAGE_FOLDERS.PRODUCER_IMAGES, (url) => {
        newProducer['image'] = url
        firebase.database().ref('Producer').push(newProducer)
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
        firebase.database().ref('Bonus').push(newBonus)
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
    firebaseDatabase.ref('Bonus').once('value')
        .then(
            (snapshot) => {
                callback(snapshot.val());
            }
        )
}

export const getProducerList = (callback) => {
    firebaseDatabase.ref('Producer').once('value')
        .then(
            (snapshot) => callback(snapshot.val())
        )
}

export const getSlotList = (callback) => {
    const slotPath = firebaseDatabase.ref(DATABASE_REFERENCE.SLOT)
    slotPath.orderByChild('time').limitToFirst(3).once('value')
        .then(
            (snapshot) => {
                callback(snapshot.val())
            }
        )
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
