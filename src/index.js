import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import store from './store/store.js';
import { Provider } from 'react-redux';
import '../src/style/base.css';
import '../src/style/sass.scss';
import 'semantic-ui-react-single/css'
import { onSlotListFetched, onBonusListFetched, onProducerListFetched } from './utils/Callbacks'
import { getSlotList, getBonusList, getProducerList } from './firebase/firebase';
import keys from 'lodash/keys'

// // fetch dati iniziali
keys(store.slotList).length === 0 && getSlotList(onSlotListFetched)
keys(store.bonusList).length === 0 && getBonusList(onBonusListFetched)
keys(store.producerList).length === 0 && getProducerList(onProducerListFetched)

// ---------------------------per swappare dal database che ho allegato su slack alla nuova struttura
/* swapBonusToNewDatabase()
swapProducerToNewDatabase() */
// swapSlotsToNewDatabase()

// removeImageLink()
// purgeDb()
// store Provider
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
