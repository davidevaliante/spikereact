const defaultListState = {};

const slotListReducer = (state = defaultListState, action) => {
    switch (action.type) {
        case 'ADD_SINGLE_SLOT':
            return [
                ...state,
                action.slotToAdd
            ]
        case 'ADD_SLOT_LIST': {
            return {
                ...state,
                ...action.slotListToAdd
            }
        }
        default:
            return state
    }
}

export const addSingleSlot = (slot) => {
    return {
        type: 'ADD_SINGLE_SLOT',
        slotToAdd: slot
    }
}

export const addSlotList = slotList => ({
    type: 'ADD_SLOT_LIST',
    slotListToAdd: slotList
})

export default slotListReducer;