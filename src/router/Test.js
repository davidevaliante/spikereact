import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Dropdown, Button } from 'semantic-ui-react';

class Test extends Component {
    state = {}
    componentDidMount() {
        this.setState({
            options: [
                { value: '1', text: 'Lamborghini Aventador 2016' },
                { value: '2', text: 'VW Beetle 1971' },
                { value: '3', text: 'Ford Mustang' },
            ],

        });
    }
    selected = ['1', '2']
    render() {
        return (
            <div>
                <Dropdown
                    search
                    placeholder="Select Options"
                    defaultValue={this.selected}
                    fluid
                    multiple
                    selection
                    options={this.state.options && this.state.options}
                />

            </div>
        );
    }
}

export default Test

