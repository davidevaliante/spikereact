import firebase from 'firebase/app';
// import 'firebase/database'
import 'firebase/storage'
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';
import { STORAGE_FOLDERS, DATABASE_REFERENCE } from '../enums/Constants';
import now from 'lodash/now';
import axios from 'axios'

const config = configuration;
const firebaseApp = firebase.initializeApp(config);

export const getFirebase = () => firebase


// export const firebaseDatabase = firebase.database();
const databaseRoot = 'https://spike-2481d.firebaseio.com';
// per trasformare da online a gratis
/* export const fromOnlineToGratis = () => {
    axios.get('https://spike-2481d.firebaseio.com/Slots.json')
        .then(
            // success
            (response) => {
                const list = response.data
                for (const key in list) {
                    let current = list[key]
                    if (current.type === 'ONLINE') {
                        current['type'] = 'GRATIS'
                        onlineToGratis(key, current)
                    }
                }
            }
        )
        .catch(
            (error) => { console.log(error) }
        )
        .then(
            // sempre eseguita
            () => { }
        )
} */

// ------------------------------------------NON CANCELLARE PER ADESSO
/* export const onlineToGratis = (id, obj) => {
    axios.patch(`https://spike-2481d.firebaseio.com/Slots/${id}/.json`, obj)
        .then(
            (success) => console.log('PATCH_SUCCESS', success)
        )
        .catch(
            (error) => console.log('PATCH_ERROR', error)
        )
} */

/* export const pushNewSlotToRest = (id, obj) => {
    axios.put(`https://spike-2481d.firebaseio.com/TestSlot/${id}/.json`, obj)
        .then(
            // fa automaticamente PUSH, l'id del push è contenuto in success.data.name
            (success) => console.log('POST_SUCCESS', success.data.name)
        )
        .catch(
            (error) => console.log('POST_ERROR', error)
        )
} */


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

// --------------------------------FIREBASE----------NON CANCELLARE PER ORA
/* export const pushNewSlot = (newSlot, onPushSlotSuccess) => {
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

} */

export const pushNewSlot = (newSlot, onPushSlotSuccess) => {

    pushNewImage(newSlot.image, STORAGE_FOLDERS.SLOT_IMAGES, (url) => {
        newSlot['image'] = url
        newSlot['time'] = now()
        axios.post(`${databaseRoot}/Slots.json`, newSlot)
            .then(
                (success) => {
                    const key = success.data.name;
                    axios.put(`${databaseRoot}/Producer-Slot/${newSlot.producer.id}/${key}.json`, true)
                    for (const bonusId in newSlot.bonus) {
                        axios.put(`${databaseRoot}/Bonus-Slot/${bonusId}/${key}.json`, true)
                    }
                    onPushSlotSuccess();
                }
            )
            .catch(
                (error) => console.log(error)
            )
            .then(

            )
    })

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


// ----------------------FIREBASE NON CANCELLARE
/* export const getBonusList = (callback) => {
    firebaseDatabase.ref(DATABASE_REFERENCE.BONUS).once('value')
        .then(
            (snapshot) => {
                callback(snapshot.val());
            }
        )
} */

export const getBonusList = (callback) => {
    axios.get(`${databaseRoot}/Bonus.json`)
        .then(
            success => callback(success.data)
        )
}

// ----------------------FIREBASE NON CANCELLARE

// export const getProducerList = (callback) => {
//     firebaseDatabase.ref(DATABASE_REFERENCE.PRODUCER).once('value')
//         .then(
//             (snapshot) => callback(snapshot.val())
//         )
// }

export const getProducerList = (callback) => {
    axios.get(`${databaseRoot}/Producer.json`)
        .then(
            success => callback(success.data)
        )
}

// ----------------------FIREBASE NON CANCELLARE
// export const getSlotList = (callback) => {
//     const slotPath = firebaseDatabase.ref(DATABASE_REFERENCE.SLOT)
//     slotPath.orderByChild('time').once('value')
//         .then(
//             (snapshot) => {
//                 callback(snapshot.val())
//             }
//         )
// }

export const getSlotList = (callback) => {
    axios.get(`${databaseRoot}/SlotsCard.json`)
        .then(
            success => callback(success.data)
        )
}


// ----------------------FIREBASE NON CANCELLARE

// export const getSlotWithId = (id, callback) => {
//     firebaseDatabase.ref(`${DATABASE_REFERENCE.SLOT}/${id}`).once('value')
//         .then(
//             (snapshot) => callback(snapshot.val())
//         )
// }


export const getSlotWithId = (id, callback) => {
    axios.get(`${databaseRoot}/Slots/${id}.json`)
        .then(
            success => callback(success.data)
        )
}

// ----------------------FIREBASE NON CANCELLARE

// export const deleteSlotWithId = (id, callback) => {
//     firebaseDatabase.ref(`${DATABASE_REFERENCE.SLOT}/${id}`).remove()
//         .then(
//             () => {
//                 console.log('deleteSlotWithId', id, callback)
//                 callback()
//             }
//         ).catch(
//             (error) => {
//                 console.log('deleteSlotWithId', id, callback, error)
//                 callback(error)
//             }
//         )
//     // callback()
// }


export const deleteSlotWithId = (id, callback) => {
    axios.delete(`${databaseRoot}/Slots/${id}.json`)
        .then(
            () => callback()
        )

}


// ----------------------FIREBASE NON CANCELLARE

// export const deleteBonusWithId = (id, callback) => {
//     firebaseDatabase.ref(`${DATABASE_REFERENCE.BONUS}/${id}`).remove()
//         .then(
//             () => {
//                 console.log('deleteBonusWithId', id, callback)
//                 callback()
//             }
//         ).catch(
//             (error) => {
//                 console.log('deleteBonusWithId', id, callback, error)
//                 callback(error)
//             }
//         )
//     // callback()
// }


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