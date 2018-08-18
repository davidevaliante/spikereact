import { createStore, combineReducers } from 'redux';
import authReducer from './../reducers/AuthReducer';
import currentPageReducer from './../reducers/CurrentPageReducer';
import navbarVisibilityReducer from './../reducers/NavbarVisibilityReducer';

const reducers = combineReducers(
    {
        'auth': authReducer,
        'currentPage': currentPageReducer,
        'navbarIsShowing':navbarVisibilityReducer
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
