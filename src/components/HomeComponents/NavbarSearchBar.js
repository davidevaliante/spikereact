import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

const getResults = () =>
    _.times(5, () => ({
        title: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        image: faker.internet.avatar(),
        price: faker.finance.amount(0, 100, 2, '$'),
    }))

const source = _.range(0, 3).reduce((memo) => {
    const name = faker.hacker.noun()

    // eslint-disable-next-line no-param-reassign
    memo[name] = {
        name,
        results: getResults(),
    }

    return memo
}, {})

class NavbarSearchBar extends Component {

    componentWillMount() {
        this.resetComponent()
    }

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
                original: current
            })
        }

        const formattedBonus = []
        for (const bonus in bonusList) {
            const current = bonusList[bonus]
            formattedBonus.push({
                title: current.name,
                description: current.bonus,
                image: current.image,
                original: current
            })
        }

        const formattedProducer = []
        for (const producer in producerList) {
            const current = producerList[producer]
            formattedProducer.push({
                title: current.name,
                image: current.image,
                original: current
            })
        }
        list['slot']['results'] = formattedSlot
        list['bonus']['results'] = formattedBonus
        list['producer']['results'] = formattedProducer

        console.log(list);

        return list
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title })
        if (result.original.link) window.open(result.original.link)
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
        }, 300)
    }


    render() {
        const { isLoading, value, results } = this.state
        const { bonusList, slotList, producerList } = this.props
        console.log(bonusList)

        return (
            <Search
                color='red'
                size='mini'
                category
                noResultsMessage='Nessun risultato'
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
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