import { createStore, combineReducers } from 'redux';
import authReducer from './../reducers/AuthReducer';
import currentPageReducer from './../reducers/CurrentPageReducer';
import navbarVisibilityReducer from './../reducers/NavbarVisibilityReducer';
import slotListReducer from './../reducers/SlotListReducer';
import bonusListReducer from './../reducers/BonusListReducer';
import producerListReducer from './../reducers/ProducerListReducer';
import slotPageReducer from './../reducers/SlotPageReducer';

const reducers = combineReducers(
    {
        'auth': authReducer,
        'displaying': currentPageReducer,
        'navbarIsShowing': navbarVisibilityReducer,
        'slotList': slotListReducer,
        'bonusList': bonusListReducer,
        'producerList': producerListReducer,
        'currentSlot': slotPageReducer
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
