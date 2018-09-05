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
import { getSlotList, getBonusList, getProducerList, getSlotWithId } from '../../firebase/firebase';
import { updateCurrentSlot, resetSlotImage } from '../../reducers/SlotPageReducer'
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

    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    // ------------------------ HANDLERS --------------------------------------------------
    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })
        // solo bonus e produttori hanno la proprietà "link"
        if (result.link) { window.open(result.link) }
        // se non esiste link allora è una slot
        else {
            getSlotWithId(result.id, (slot) => {
                this.setState({
                    slot: result.original, slotId: result.id,
                    redirect: { shouldRedirect: true, path: `/slot/${result.id}` }
                })
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
        const { displaying } = this.props

        switch (displaying) {
            case PAGES.SLOT: {
                const id = this.props.slotId
                if (this.props.slotId !== this.state.slotId) {
                    getSlotWithId(id, (slot) => {
                        console.log('from firebase');

                        this.props.dispatch(updateCurrentSlot(slot))
                        this.setState({ slot: slot, slotId: id })
                    })
                }
            }
                break;

            case PAGES.ABOUT:
                smoothScrollTo('about-page')
                break;

            case PAGES.HOME:
                if (this.props.currentSlot.image !== '')
                    this.props.dispatch(updateCurrentSlot({
                        ...this.props.currentSlot,
                        image: ''
                    }))
                break;
            default:

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
    producerList: state.producerList,
    currentSlot: state.currentSlot
})

export default connect(mapStateToProps)(NavbarSearchBar);