import {createStore, combineReducers} from 'redux';
import authReducer from './../reducers/AuthReducer';

const reducers = combineReducers(
    {
        'auth':authReducer
    }
);

// crea store
const store = () => {
    const store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store;
}

export default store;
