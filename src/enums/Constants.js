
export const STORAGE_FOLDERS = {
    BONUS_IMAGES: 'BonusImages',
    SLOT_IMAGES: 'SlotImages',
    PRODUCER_IMAGES: 'ProducerImages'
};

export const SLOT_TYPES = {
    BAR: 'BAR',
    GRATIS: 'GRATIS',
    PRODUCER_FILTERED: 'PRODUCER_FILTERED'
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
    PRODUCER: 'PRODUCER',
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
    EXTRA: `/extra/:id`,
    PRODUCER: `/producer/:name`,
    ERROR404: '*',


    ADMIN: `${admin}`,
    ADMINARTICLE: `${admin}/article`,
    ADDARTICLE: `${admin}/addarticle`,
    ADMINSLOT: `${admin}/slots`,
    ADDSLOT: `${admin}/addslot`,
    EDITSLOT: `${admin}/editslot/:id`,
    ADMINBONUS: `${admin}/bonus`,
    ADDBONUS: `${admin}/addbonus`,
    EDITBONUS: `${admin}/editbonus/:bonusid`,
    ADMINPRODUCER: `${admin}/producers`,
    ADDPRODUCER: `${admin}/addproducer`,
    ADDEXTRAFROMHTML: `${admin}/addextrafromhtml`,
    EDITPAGE: `${admin}/editpage`,
};

export const ADMINPAGES = {
    ADMIN: 'Admin',
    ARTICLE: 'Article',
    SLOT: 'Slot',
    BONUS: 'Bonus',
    PRODUCER: 'Producer',
    EXTRA: 'Extra'
};

export const IMGS_SIZES = {
    SMALL: 64,
    MEDIUM: 250
}

export const COUNTRY = {
    ITALY: 'it'
}