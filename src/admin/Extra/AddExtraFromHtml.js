import React, { Component } from 'react'
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { TextArea } from 'semantic-ui-react-single/TextArea'
import { submitExtraFromHtml } from '../../firebase/post'

class AddExtraFromHtml extends Component {

    state = {
        pushedLink: "",
        pushedId: ""
    }

    submit = () => {
        const rawhtml = document.getElementById('pastedHtml').value.trim()
        if (rawhtml.length > 0) {
            submitExtraFromHtml({ content: rawhtml }, success => {
                this.setState({
                    pushedId: success.data.name
                })
            })
        }
    }

    render() {
        const { pushedLink, pushedId } = this.state

        return (
            <div>
                <textarea
                    id='pastedHtml'
                    rows={15}
                    style={{ width: '100%', height: '40%' }}
                    placeholder='Copia e incolla html qui' />
                <Button
                    onClick={this.submit}>
                    Carica
                </Button>
                {pushedId && (
                    <div>
                        <h3>Id nuovo Articolo :   {pushedId}</h3>
                        <h3>link in produzione : localhost:3000/article/{pushedId}</h3>
                        <h3>link reale : https://spike-2481d.firebaseapp.com/article/{pushedId}</h3>
                    </div>
                )}
            </div>
        )
    }
}

export default AddExtraFromHtml