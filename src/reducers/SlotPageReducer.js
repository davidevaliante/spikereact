const defaultState = {}

const slotPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_SLOT':
            return action.currentSlot

        case 'RESET_CURRENT_SLOT':
            return {
                currentSlot: undefined
            }
        default:
            return state
    }
}

export const updateCurrentSlot = (slot) => {
    console.log('updating current slot');

    return {
        type: 'UPDATE_CURRENT_SLOT',
        currentSlot: slot
    }
}

export const resetCurrentSlot = (slot) => {
    return {
        type: 'UPDATE_CURRENT_SLOT',
        currentSlot: undefined
    }
}


export default slotPageReducer;