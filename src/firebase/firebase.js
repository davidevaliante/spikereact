import firebase from 'firebase';
import { setUserLoggedIn, setUserLoggedOut, setUserName, setUserId } from './../reducers/AuthReducer';
import { configuration } from './firebaseConfig';

const config = configuration;
const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();

export const pushNewProducer = (newProducer, callback) => {
    firebase.database().ref('Producer').push(newProducer)
        .then(
            (snapshot) => {
                callback()
            }
        )
}

export const pushNewSlot = (newSlot, onPushSlotSuccess) => {
    firebase.database().ref('Slots').push(newSlot)
        .then(
            (completed) => {
                console.log(completed);
                const key = completed.key;

                firebase.database().ref(`Producer-Slot/${newSlot.producer.id}/${key}`).set(true);
                console.log(key);
                onPushSlotSuccess();
            }
        )
        .catch(
            (fail) => {
                console.log('New slot push failed');
                console.log(fail);
            }
        )
}

export const pushNewBonus = (newBonus, onBonusPushSuccess) => {
    firebase.database().ref('Bonus').push(newBonus)
        .then(
            (completed => {
                onBonusPushSuccess();
            })
        )
        .catch(
            (fail) => {
                console.log('New bonus push failed');
                console.log(fail);
            }
        )
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



export const getUserAuthStatus = (store) => {
    firebaseApp.auth().onAuthStateChanged((user) => {
        if (!user) {
            store.dispatch(setUserLoggedOut());
            store.dispatch(setUserId(undefined));
            store.dispatch(setUserName(undefined));
            console.log(`User IS NOT logged`);
            console.log(store.getState())
        } else {
            store.dispatch(setUserLoggedIn());
            store.dispatch(setUserId("someuserid"));
            store.dispatch(setUserName("Need to fecth this"));
            console.log(`User IS logged`);
            console.log(store.getState());
        }
    });
}
