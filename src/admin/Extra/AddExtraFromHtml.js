import React, { Component } from 'react'
import { Form } from 'semantic-ui-react-single/Form'
import { TextArea } from 'semantic-ui-react-single/TextArea'


class AddExtraFromHtml extends Component {

    render() {
        return (
            <div>
                <Form.Field
                    id='pastedHtml'
                    style={{ width: '100%', height: '40%' }}
                    fluid
                    control={TextArea}
                    placeholder='Copia e incolla html qui' />
            </div>
        )
    }
}

export default AddExtraFromHtml