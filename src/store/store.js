import { createStore, combineReducers } from 'redux';
import authReducer from './../reducers/AuthReducer';
import currentPageReducer from './../reducers/CurrentPageReducer';
import slotListReducer from './../reducers/SlotListReducer';
import bonusListReducer from './../reducers/BonusListReducer';
import producerListReducer from './../reducers/ProducerListReducer';
import slotPageReducer from './../reducers/SlotPageReducer';
import playModeReducer from './../reducers/PlayModeReducer';
import toUpdateReducer from './../reducers/ToUpdateReducer';

const reducers = combineReducers(
    {
        'auth': authReducer,
        'displaying': currentPageReducer,
        'slotList': slotListReducer,
        'bonusList': bonusListReducer,
        'producerList': producerListReducer,
        'currentSlot': slotPageReducer,
        'isPlaying': playModeReducer,
        'toUpdate': toUpdateReducer
    }
);

// crea store
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export default store;
