import React, { Component } from 'react'
import { Input } from 'semantic-ui-react-single/Input'
import { Form } from 'semantic-ui-react-single/Form'
import { TextArea } from 'semantic-ui-react-single/TextArea'
import { Button } from 'semantic-ui-react-single/Button'

import { submitExtraFromHtml } from '../../firebase/post'
class AddExtraFromHtml extends Component {

    submitNewExtra = newExtra => {
        const content = document.getElementById('html').value.trim()
        const title = document.getElementById('title').value.trim()
        submitExtraFromHtml({ content: content, title: title })
    }

    render() {
        return (
            <div>
                <Form.Field
                    id='title'
                    style={{ width: '100%', height: '40%' }}
                    fluid
                    control={TextArea}
                    placeholder='Nome della guida' />
                <h2>Aggiungi da html</h2>
                <Form.Field
                    id='html'
                    style={{ width: '100%', height: '40%' }}
                    fluid
                    control={TextArea}
                    placeholder='Html sorgente' />

                <Form.Field
                    style={{ width: '100%' }}
                    onClick={this.submitNewExtra}
                    control={Button}>
                    Aggiungi
                </Form.Field>
            </div>
        )
    }
}

export default AddExtraFromHtml