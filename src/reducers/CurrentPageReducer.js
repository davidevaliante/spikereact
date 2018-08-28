import { PAGES } from '../enums/Constants';

const defaultCurrentPageState = PAGES.HOME


const currentPageReducer = (state = defaultCurrentPageState, action) => {

    switch (action.type) {
        case PAGES.HOME:
            return PAGES.HOME
        case PAGES.SLOT_BAR:
            return PAGES.SLOT_BAR
        case PAGES.SLOT_ONLINE:
            return PAGES.SLOT_ONLINE
        case PAGES.SLOT_GRATIS:
            return PAGES.SLOT_GRATIS
        case PAGES.ABOUT:
            return PAGES.ABOUT
        default:
            return state
    }
}

export const setAboutPage = () => {
    return {
        type: PAGES.ABOUT
    }
}

export const setHomePage = () => {
    return {
        type: PAGES.HOME,
    }
}


export const setBarPage = () => {
    return {
        type: PAGES.SLOT_BAR,
    }
}

export const setOnlinePage = () => {
    return {
        type: PAGES.SLOT_ONLINE,
    }
}

export const setGratisPage = () => {
    return {
        type: PAGES.SLOT_GRATIS,
    }
}



export default currentPageReducer