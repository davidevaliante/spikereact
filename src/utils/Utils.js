export const onSlotListFetched = (slotList) => {
    let list = {}
    for (const key in slotList) {
        const slot = slotList[key];
        slot['id'] = key
        list[key] = slot
    }
    this.props.dispatch(addSlotList(list))
}

export const onBonusListFetched = (bonusList) => {
    let list = {}
    for (const key in bonusList) {
        const bonus = bonusList[key];
        list[key] = bonus
    }
    this.props.dispatch(addBonusList(list))
}

export const onProducerListFetched = (producerList) => {
    let list = {}
    for (const key in producerList) {
        const producer = producerList[key];
        list[key] = producer;
    }
    this.props.dispatch(addProducerList(list))
}

export const formatList = (slotList, bonusList, producerList) => {

    // oggetto di base, 
    // results deve contenere una lista di oggetti con questa struttura :
    /*
        {
            "title": "Bruen - Green",
            "description": "Monitored analyzing moratorium",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/msveet/128.jpg",
            "price": "$88.56"
        },
    */
    const list = {
        slot: {
            name: "Slot",
            results: []
        },
        bonus: {
            name: "Bonus",
            results: []
        },
        producer: {
            name: "Produttori",
            results: []
        },
    }

    const formattedSlot = []
    for (const slot in slotList) {
        const current = slotList[slot]
        const truncateOptions = { length: '60', omission: '...' }
        formattedSlot.push({
            title: current.name,
            description: `${_.truncate(current.description, truncateOptions)}`,
            image: current.image,
            original: current,
            id: slot
        })
    }

    const formattedBonus = []
    for (const bonus in bonusList) {
        const current = bonusList[bonus]
        formattedBonus.push({
            title: `Bonus ${current.name}`,
            description: current.bonus,
            image: current.image,
            id: bonus,
            link: current.link
        })
    }

    const formattedProducer = []
    for (const producer in producerList) {
        const current = producerList[producer]
        formattedProducer.push({
            title: current.name,
            image: current.image,
            id: producer,
            link: current.link
        })
    }
    list['slot']['results'] = formattedSlot
    list['bonus']['results'] = formattedBonus
    list['producer']['results'] = formattedProducer


    return list
}