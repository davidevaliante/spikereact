import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import store from './store/store.js';
import './firebase/firebase';
import { Provider } from 'react-redux';
import { getUserAuthStatus } from './firebase/firebase';
import 'semantic-ui-css/semantic.min.css';
import '../src/style/base.css';


const mystore = store();
const storeState = () => { console.log(mystore.getState()) }

storeState();
getUserAuthStatus(mystore);


// store Provider
const jsx = (
    <Provider store={mystore}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
