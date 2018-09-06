
export const STORAGE_FOLDERS = {
    BONUS_IMAGES: 'BonusImages',
    SLOT_IMAGES: 'SlotImages',
    PRODUCER_IMAGES: 'ProducerImages'
};

export const SLOT_TYPES = {
    BAR: 'BAR',
    GRATIS: 'GRATIS'
};

export const DATABASE_REFERENCE = {
    SLOT: 'Slots',
    BONUS: 'Bonus',
    PRODUCER: 'Producer',
    ARTICLE: 'Article'
};

export const PAGES = {
    SLOT_BAR: 'SLOT_BAR',
    SLOT_GRATIS: 'SLOT_GRATIS',
    SLOT_ONLINE: 'SLOT_ONLINE',
    SLOT: 'SLOT',
    HOME: 'HOME',
    ABOUT: 'ABOUT',
    PAGE_NOT_FOUND: '*'
};

const admin = '/admin';

export const ROUTE = {
    ROOT: '/',
    SLOT: '/slot/:id',
    SLOT_ONLINE: '/slot-online',
    SLOT_GRATIS: '/slot-gratis',
    SLOT_BAR: '/slot-bar',
    ABOUT: '/about',
    ERROR404: '*',


    ADMIN: `${admin}`,
    ADMINARTICLE: `${admin}/article`,
    ADDARTICLE: `${admin}/addarticle`,
    ADMINSLOT: `${admin}/slots`,
    ADDSLOT: `${admin}/addslot`,
    ADMINBONUS: `${admin}/bonus`,
    ADDBONUS: `${admin}/addbonus`,
    ADDPRODUCER: `${admin}/addproducer`,
    ADDARTICLE: `${admin}/addarticle`,
    EDITPAGE: `${admin}/editpage`,
};

export const ADMINPAGES = {
    ADMIN: 'Admin',
    ARTICLE: 'Article',
    SLOT: 'Slot',
    BONUS: 'Bonus',
    PRODUCER: 'Producer'
};