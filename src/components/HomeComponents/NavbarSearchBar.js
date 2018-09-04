import keys from 'lodash/keys'
import get from 'lodash/get'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import { formatList } from '../../utils/Utils'
import { onSlotListFetched, onBonusListFetched, onProducerListFetched } from '../../utils/Callbacks'
import { PAGES } from '../../enums/Constants'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react-single/Search'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getSlotList, getBonusList, getProducerList } from '../../firebase/firebase';
import { getSlotWithId } from '../../firebase/firebase'
import { updateCurrentSlot } from '../../reducers/SlotPageReducer'
import { smoothScrollTo } from '../../utils/Utils'

class NavbarSearchBar extends Component {

    state = {
        slot: {},
        slotId: '',
        redirect: {
            shouldRedirect: false,
            path: undefined
        }
    }


    componentDidMount() {


        // solo se gli oggetti sono vuoti
        keys(this.props.slotList).length === 0 && getSlotList(onSlotListFetched)
        keys(this.props.bonusList).length === 0 && getBonusList(onBonusListFetched)
        keys(this.props.producerList).length === 0 && getProducerList(onProducerListFetched)

        this.resetComponent()
        const { displaying } = this.props

        if (displaying === PAGES.SLOT) {
            const id = this.props.slotId
            console.log('firebase call for', id);


            // se redux è accessibile
            if (get(this.props.slotList, id)) {
                console.log('from redux');

                this.props.dispatch(updateCurrentSlot(get(this.props.slotList, id)))
            } else {
                getSlotWithId(id, (slot) => {
                    console.log('from firebase');

                    this.props.dispatch(updateCurrentSlot(slot))
                    this.setState({ slot: slot, slotId: id })
                })
            }
        }

        if (displaying === PAGES.ABOUT) {
            smoothScrollTo('about-page')
        }
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    // ------------------------ HANDLERS --------------------------------------------------
    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })
        // solo bonus e produttori hanno la proprietà "link"
        if (result.link) { window.open(result.link) }
        // se non esiste link allora è una slot
        else {
            this.setState({
                slot: result.original, slotId: result.id,
                redirect: { shouldRedirect: true, path: `/slot/${result.id}` }
            })
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(escapeRegExp(this.state.value.trim()), 'i')
            const isMatch = result => re.test(result.title)

            const filteredResults = reduce(
                formatList(this.props.slotList, this.props.bonusList, this.props.producerList),
                (memo, data, name) => {
                    const results = filter(data.results, isMatch)
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
        const shouldRedirect = this.state.redirect.shouldRedirect
        const path = this.state.redirect.path

        if (get(this.props.slotList, this.props.slotId)) {
            this.props.dispatch(updateCurrentSlot(get(this.props.slotList, this.props.slotId)))
        }

        return (
            <div>
                <Redirect to={path} push={path ? true : undefined} />
                <Search
                    color='red'
                    size='mini'
                    category
                    noResultsMessage='Nessun risultato'
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={debounce(this.handleSearchChange, 400, { leading: true })}
                    results={results}
                    value={value} >

                </Search>

            </div>

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