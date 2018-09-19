import React, { Component } from 'react'
// semantic
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
// mix
import { getImageLinkFromName } from '../../utils/Utils'
import { setProducerPage } from '../../reducers/CurrentPageReducer'
// router e redux
import { connect } from 'react-redux'

class ProducersDropdown extends Component {
    state = {}

    formatProducerForDropdown = (list) => {
        let formattedList = []
        for (const key in list) {
            const prod = list[key]
            formattedList.push({
                text: prod.name,
                value: prod.name,
                image: {
                    avatar: true,
                    src: getImageLinkFromName(prod.name)
                },
                id: key
            })
        }
        return formattedList
    }

    dropdownChoiceHandler = (producerName) => {
        this.props.dispatch(setProducerPage(producerName))
        this.setState({ path: `/producer/${producerName}` })
    }


    render() {
        return (
            <Dropdown
                placeholder='Produttori'
                onChange={(event, data) => this.dropdownChoiceHandler(data.value)}
                options={this.formatProducerForDropdown(this.props.producerList)} />
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    producerList: state.producerList
})

export default connect(mapStateToProps)(ProducersDropdown)