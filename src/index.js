import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import store from './store/store.js';
import { Provider } from 'react-redux';
import '../src/style/base.css';
import '../src/style/sass.scss';
import 'semantic-ui-react-single/css'
import { onBonusListFetched, onProducerListFetched } from './utils/Callbacks'
import { getBonusList, getProducerList } from './firebase/firebase';
import keys from 'lodash/keys'
import { getSlotsCardBasedOnTime, getSlotsForMenu, getPopularSlots } from './firebase/get'
// // fetch dati iniziali
getSlotsCardBasedOnTime(12)
getSlotsForMenu()
getPopularSlots()
keys(store.bonusList).length === 0 && getBonusList(onBonusListFetched)
keys(store.producerList).length === 0 && getProducerList(onProducerListFetched)

// store Provider
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
