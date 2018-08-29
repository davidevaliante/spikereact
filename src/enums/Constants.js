
export const STORAGE_FOLDERS = {
    BONUS_IMAGES: 'BonusImages',
    SLOT_IMAGES: 'SlotImages',
    PRODUCER_IMAGES: 'ProducerImages'
};

export const SLOT_TYPES = {
    BAR: 'BAR',
    ONLINE: 'ONLINE',
    GRATIS: 'GRATIS'
};

export const DATABASE_REFERENCE = {
    SLOT: 'Slots'
};

export const PAGES = {
    SLOT_BAR: 'SLOT_BAR',
    SLOT_GRATIS: 'SLOT_GRATIS',
    SLOT_ONLINE: 'SLOT_ONLINE',
    HOME: 'HOME',
    ABOUT: 'ABOUT'
};

const admin = '/admin';

export const ROUTE = {
    ROOT: '/',
    SLOT: '/slot/:id',
    SLOT_ONLINE: '/slot-online',
    SLOT_GRATIS: '/slot-gratis',
    SLOT_BAR: '/slot-bar',
    ABOUT: '/about',

    ADMIN: `${admin}`,
    ADMINSLOT: `${admin}/slots`,
    ADDSLOT: `${admin}/addslot`,
    ADDBONUS: `${admin}/addbonus`,
    ADDPRODUCER: `${admin}/addproducer`,
    ADDARTICLE: `${admin}/addarticle`
};

export const ADMINPAGES = {
    ADMIN: 'Admin',
    ARTICLE: 'Article',
    SLOT: 'Slot',
    BONUS: 'Bonus',
    PRODUCER: 'Producer'
};