
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
    ARTICLE: 'ARTICLE',
    PAGE_NOT_FOUND: '*'
};

const admin = '/admin';

export const ROUTE = {
    ROOT: '/',
    SLOTS: '/slot',
    SLOT: '/slot/:id',
    SLOT_ONLINE: '/slot-online',
    SLOT_GRATIS: '/slot-gratis',
    SLOT_BAR: '/slot-bar',
    ABOUT: '/about',
    EXTRAS: `/article`,
    EXTRA: `/article/:id`,
    PRODUCERS: '/producer',
    PRODUCER: `/producer/:producerName`,
    ARTICLE: '/articoli',
    ERROR404: '/404',

    // admin
    ADMIN: `${admin}`,
    ADMINSLOT: `${admin}/slots`,
    ADMINBONUS: `${admin}/bonus`,
    ADMINARTICLE: `${admin}/article`,
    ADMINPRODUCER: `${admin}/producers`,
    // add
    ADDARTICLE: `${admin}/addarticle`,
    ADDSLOT: `${admin}/addslot`,
    ADDBONUS: `${admin}/addbonus`,
    ADDPRODUCER: `${admin}/addproducer`,
    ADDEXTRAFROMHTML: `${admin}/addextrafromhtml`,
    // edit
    EDITSLOT: `${admin}/editslot/:id`,
    EDITBONUS: `${admin}/editbonus/:bonusid`,
    EDITPRODUCER: `${admin}/producer/:id`,
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

export const RESPONSIVE_RESOLUTION = {
    SMALL: 425,
    MEDIUM: 805,
    LARGE: 1200
}