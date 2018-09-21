import React, { Component } from 'react'
// semantic
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
// mix
import { getImageLinkFromName } from '../../utils/Utils'
import {setProducerPage} from "../../reducers/CurrentPageReducer";
// router e redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// lodash
import orderBy from 'lodash/orderBy'

class ProducersDropdown extends Component {
    state = {};

    formatProducerForDropdown = (list) => {
        let formattedList = []
        for (const key in list) {
            const prod = list[key]
            formattedList.push({
                text: prod.name,
                value: prod.name,
                // image: {
                //     avatar: true,
                //     rounded: true,
                //     size: 'mini',
                //     src: getImageLinkFromName('producer', prod.name)
                // },
                id: key
            })
        }
        formattedList = orderBy(formattedList, ['value'], ['asc']);
        return formattedList
    }

    dropdownChoiceHandler = (producerName) => {
        this.props.history.push(`/producer/${producerName}`)
        this.props.dispatch(setProducerPage(producerName));
    }


    render() {
        return (
            <Dropdown
                text='Produttori'
                onChange={(event, data) => this.dropdownChoiceHandler(data.value)}
                options={this.formatProducerForDropdown(this.props.producerList)} />
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    producerList: state.producerList
})

export default withRouter(connect(mapStateToProps)(ProducersDropdown))