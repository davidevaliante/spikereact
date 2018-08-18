const defaultVisibility = false;

const navbarVisibilityReducer = (state = defaultVisibility, action) => {
    switch (action.type) {
        case 'NAVBAR_VISIBLE':
            return false
        case 'NAVBAR_INVISIBLE':
            return true
        default:
            return state
    }
}

export const makeNavBarVisible = () => {
    return {
        type: 'NAVBAR_VISIBLE',
    }
}

export const makeNavBarInvisible = () => {
    return {
        type: 'NAVBAR_INVISIBLE',
    }
}

export default navbarVisibilityReducer;