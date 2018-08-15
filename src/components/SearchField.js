import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import { getBonusList } from '../firebase/firebase';

const Llist = _.times(5, () => ({
    name: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

let list = []

export default class SearchField extends Component {
    componentWillMount() {
        this.resetComponent()
        // callback function
        const trasformData = (bonusList) => {
            for (const key in bonusList) {
                const current = bonusList[key]
                const formatted = {
                    title: current.name,
                    description: current.bonus,
                    image: current.image,
                    price: '30',
                    original: {
                        ...current,
                        id: key
                    }
                }
                list.push(formatted)
            }
            console.log(list);
        }

        // call a firebase
        getBonusList(trasformData);
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        this.props.onSelected(result.original);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(list, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid style={{ marginBottom: '1rem' }}>
                <Grid.Column width={6}>
                    <h3>Bonus</h3>
                    <Search
                        label='Cerca'
                        defaultValue='Cerca'
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={results}
                        size='large'
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}