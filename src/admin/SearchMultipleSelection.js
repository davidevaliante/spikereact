import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { getBonusList } from '../firebase/firebase';
import pick from 'lodash/pick';




class SearchMultipleSelection extends Component {

    componentDidMount() {
        getBonusList(this.onBonusListFectched)
    }

    formatObjectIntoList = (list) => {
        let formattedList = [];
        for (const key in list) {
            formattedList.push({ key: `${key}`, value: `${key}`, text: `${list[key].name}` })
        }
        return formattedList;
    }

    onBonusListFectched = (list) => {
        this.setState({
            optionList: this.formatObjectIntoList(list),
            firebaseBonusObject: list
        });
    }

    handleClick = (data) => {
        console.log('clicked');

        console.log(data);

    }

    handleItemAdded = (event, data) => {
        this.setState({ pickedList: data.value })
        this.props.onListUpdate(pick(this.state.firebaseBonusObject, data.value));
    }


    state = {
        optionList: [],
        firebaseBonusObject: {}
    }


    render() {
        return (
            <Dropdown
                id='bonusField'
                placeholder='Bonus'
                fluid
                multiple
                search
                selection
                onChange={(event, data) => this.handleItemAdded(event, data)}
                options={this.state.optionList} />
        );
    }
}



export default SearchMultipleSelection