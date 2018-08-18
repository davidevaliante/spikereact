import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import { getBonusList, getProducerList } from '../firebase/firebase';



let producerList = [];
let bonusList = [];

export default class SearchField extends Component {
    componentWillMount() {
        this.resetComponent()
        // callback function
        const transformData = (list) => {
            for (const key in list) {
                const current = list[key]
                const formatted = {
                    title: current.name,
                    description: current.bonus,
                    image: current.image,
                    original: {
                        ...current,
                        id: key
                    }
                }
                switch (this.props.nodename) {
                    case 'Bonus':
                        bonusList.push(formatted);
                        break;
                    case 'Produttore':
                        producerList.push(formatted);
                        break;
                    default:
                    //
                }
            }
        }

        // call a firebase
        switch (this.props.nodename) {
            case 'Bonus':
                getBonusList(transformData);
                break;
            case 'Produttore':
                getProducerList(transformData);
                break;
            default:
            //
        }
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

            let list = [];

            switch (this.props.nodename) {
                case 'Bonus':
                    list = bonusList
                    break;
                case 'Produttore':
                    list = producerList
                    break;
                default:
                //
            }

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
                <Grid.Column width={16}>
                    <h3>{this.props.nodename}</h3>
                    <Search
                        label='Cerca'
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