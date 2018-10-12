import React, { Component } from 'react';
import RichTextEditor from 'react-rte';

class RichEdit extends Component {
    state = {
        value: RichTextEditor.createValueFromString('', 'html'),
        format: 'html'
    };

    componentDidMount() {
        if (this.props.defaultContent) {
            this.setState({
                value: this.state.value.setContentFromString(this.props.defaultContent, this.state.format),
            });
        }
    }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            // da cambiare, utilizzare lodash/debounce ??? --- DAVIDE
            this.props.onChange(
                value.toString('html')
            );
        }
    };

    onChangeSource = (event) => {
        let source = event.target.value;
        let oldValue = this.state.value;
        this.setState({
            value: oldValue.setContentFromString(source, this.state.format),
        });
    };

    render() {
        let { value, format } = this.state;

        return (
            <div>
                <RichTextEditor
                    id='richTextInput'
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="Editor"
                />
                <label for="htmlText">Trasformato in html :</label>
                <textarea
                    id='htmlText'
                    rows={10}
                    placeholder="Editor Source"
                    value={value.toString(format)}
                    onChange={this.onChangeSource}
                />
            </div>

        );
    }
}

export default RichEdit
