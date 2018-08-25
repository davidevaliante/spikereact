import _ from 'lodash'
import { formatList, onSlotListFetched, onBonusListFetched, onProducerListFetched } from '../../utils/Utils'

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
        slot: {},
        slotId: '',
        redirect: {
            shouldRedirect: false,
            path: undefined
        }
    }

    componentWillMount() {
        this.resetComponent()
    }

    componentDidMount() {
        console.log('componentdidmount');

        window.onpopstate = (e) => {
            console.log('backpressed');
            this.forceUpdate()
        }


        // solo se gli oggetti sono vuoti
        _.keys(this.props.slotList).length === 0 && getSlotList(this.onSlotListFetched)
        _.keys(this.props.bonusList).length === 0 && getBonusList(this.onBonusListFetched)
        _.keys(this.props.producerList).length === 0 && getProducerList(this.onProducerListFetched)


        const { displaying } = this.props

        if (displaying === 'SLOT') {
            const id = this.props.slotId
            console.log('firebase call for', id);

            getSlotWithId(id, (slot) => {
                this.props.dispatch(updateCurrentSlot(slot))
                this.setState({ slot: slot, slotId: id })
            })
            // se redux è accessibile
            if (!_.get(this.props.slotList, id)) {

                // console.log('dispatching from firebase');
                //this.props.dispatch(updateCurrentSlot(_.get(this.props.slotList, id)))
                //console.log('dispatching from redux');
                // console.log(_.get(this.props.slotList, id));
            }
        }

    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    // ------------------------ HANDLERS --------------------------------------------------
    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })
        // solo bonus e produttori hanno la proprietà "link"
        if (result.link) window.open(result.link)
        // se non esiste link allora è una slot
        else {
            /*  console.log('dispatching from select');
             this.props.dispatch(updateCurrentSlot(result.original)) */

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

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            const filteredResults = _.reduce(
                formatList(this.props.slotList, this.props.bonusList, this.props.producerList),
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
        const shouldRedirect = this.state.redirect.shouldRedirect
        const path = this.state.redirect.path



        return (
            <div>
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
                <Redirect to={path} push={path ? true : undefined} />
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