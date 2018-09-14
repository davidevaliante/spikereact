import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { capitalize } from 'lodash/capitalize'
import { getImageLinkFromName } from '../../utils/Utils'
import { addSlotList } from '../../reducers/SlotListReducer'
import { setProducerPage} from '../../reducers/CurrentPageReducer'
import { Redirect } from 'react-router-dom'
 
// ----------------Come va formattata la lista da mostrare
// friendOptions = [
//   {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
//   },
//  ...
// ]

class ProducersDropdown extends Component {
    state={}

    formatProducerForDropdown = (list) => {
        let formattedList = []
        for (const key in list) {
            const prod = list[key]
            formattedList.push({
                text: prod.name,
                value: prod.name, //  capitalize(prod.name),
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
        this.setState({path:`/producer/${producerName}`})
    }


    render(){
        const {path} = this.state
        if(path) return <Redirect to={path} push />
        return(
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