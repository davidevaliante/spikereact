import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getSlotList, getBonusList, getProducerList } from '../../firebase/firebase';
import { addSlotList } from '../../reducers/SlotListReducer';
import { addBonusList } from '../../reducers/BonusListReducer';
import { addProducerList } from '../../reducers/ProducerListReducer';
import { getSlotWithId } from '../../firebase/firebase'
import { updateCurrentSlot } from '../../reducers/SlotPageReducer'



class NavbarSearchBar extends Component {

    state = {
        redirect: {
            shouldRedirect: false,
            path: undefined
        }
    }

    // ----------------------- FIREBASE ------------------------------------------------
    componentWillMount() {
        this.resetComponent()

        getSlotList(this.onSlotListFetched)
        getBonusList(this.onBonusListFetched)
        getProducerList(this.onProducerListFetched)


        const { displaying } = this.props

        if (displaying === 'SLOT') {
            /* id viene passato dinamicamente da react router e passato nelle props all'interno
               DOCS : https://reacttraining.com/react-router/web/api/Route/route-props
            */
            const id = this.props.slotId

            // se redux è accessibile
            if (_.get(this.props.slotList, id)) {
                this.setState({ slot: _.get(this.props.slotList, id) })
                this.props.dispatch(updateCurrentSlot(_.get(this.props.slotList, id)))
                // console.log(_.get(this.props.slotList, id));

            }
            // altrimenti carica da firebase
            else {
                /* questa funzione prende l'id della slot come primo argomento ed una funzione come secondo
                   argomento (callback). Di solito le metto fuori per chiarezza ma stavolta deve solo chiamare
                   setState con i dati scaricati e quindi è inutile
                */

                getSlotWithId(id, (slot) => {
                    this.setState({ slot: slot })
                    this.props.dispatch(updateCurrentSlot(slot))
                })
            }
        }
    }

    onSlotListFetched = (slotList) => {
        let list = {}
        for (const key in slotList) {
            const slot = slotList[key];
            slot['id'] = key
            list[key] = slot
        }
        this.props.dispatch(addSlotList(list))
    }

    onBonusListFetched = (bonusList) => {
        let list = {}
        for (const key in bonusList) {
            const bonus = bonusList[key];
            list[key] = bonus
        }
        this.props.dispatch(addBonusList(list))
    }

    onProducerListFetched = (producerList) => {
        let list = {}
        for (const key in producerList) {
            const producer = producerList[key];
            list[key] = producer;
        }
        this.props.dispatch(addProducerList(list))
    }


    // ----------------------- SEARCHBAR -------------------------------------------------
    formatList = (slotList, bonusList, producerList) => {

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

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    // ------------------------ HANDLERS --------------------------------------------------
    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })
        // solo bonus e produttori hanno la proprietà "link"
        if (result.link) window.open(result.link)
        // se non esiste link allora è una slot
        else {
            this.props.dispatch(updateCurrentSlot(result.original))
            this.setState({ redirect: { shouldRedirect: true, path: `/slot/${result.id}` } })
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            const filteredResults = _.reduce(
                this.formatList(this.props.slotList, this.props.bonusList, this.props.producerList),
                (memo, data, name) => {
                    const results = _.filter(data.results, isMatch)
                    if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign
                    return memo
                },
                {},
            )

            this.setState({
                isLoading: false,
                results: filteredResults,
            })
        }, 100)
    }




    render() {
        const { isLoading, value, results } = this.state
        const { shouldRedirect, path } = this.state.redirect
        console.log(this.state.redirect.shouldRedirect);

        let finale;

        if (shouldRedirect) {
            finale = <Search
                color='red'
                size='mini'
                category
                noResultsMessage='Nessun risultato'
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 400, { leading: true })}
                results={results}
                value={value} ><Redirect push to={path} /></Search>
        } else {
            finale =
                <Search
                    color='red'
                    size='mini'
                    category
                    noResultsMessage='Nessun risultato'
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 400, { leading: true })}
                    results={results}
                    value={value} ></Search>
        }


        return (
            finale
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    bonusList: state.bonusList,
    slotList: state.slotList,
    producerList: state.producerList
})

export default connect(mapStateToProps)(NavbarSearchBar);