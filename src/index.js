import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import store from './store/store.js';
import { Provider } from 'react-redux';
import { getUserAuthStatus } from './firebase/firebase';
import 'semantic-ui-css/semantic.min.css';
import '../src/style/base.css';
import '../src/style/sass.scss';


getUserAuthStatus(store);


// store Provider
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
