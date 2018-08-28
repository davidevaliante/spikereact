import React, {Component} from 'react';
import _ from 'lodash';
import {
    Button,
    Form,
    Input,
    Dimmer,
    Header, Icon
} from 'semantic-ui-react';
import ImagePicker from './ImagePicker';
import {pushNewProducer} from '../firebase/firebase';
import AdminNavbar from "./AdminNavbar";
import {ADMINPAGES} from "../enums/Constants";

class AddProducer extends Component {

    buildFakeProducer = () => {
        document.getElementById('nameField').value = `Casinò finto numero ${Math.floor(Math.random() * 100)}`;
        document.getElementById('linkField').value = 'https://youtu.be/HKrOH0sQV6w?list=RDGMEMYH9CUrFO7CfLJpaD7UR85wVMHKrOH0sQV6w';
    }

    submitNewProducer = () => {
        const name = document.getElementById('nameField').value.trim();
        const link = document.getElementById('linkField').value.trim();

        if (name && link) {
            const newProducer = {
                name: name,
                link: link,
                image: this.state.image
            }
            pushNewProducer(newProducer, this.onProducerPushSuccess)
        }
    }

    onImageSelected = (image) => {
        this.setState({image: image})
    }

    onProducerPushSuccess = () => {
        this.setState({active: true})
        _.delay(() => {
            this.setState({active: false})
        }, 800)
    }

    handleOpen = () => this.setState({active: true})
    handleClose = () => this.setState({active: false})

    state = {}

    render() {

        const {active} = this.state

        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.PRODUCER}/>

                <div
                    style={{padding: '4rem'}}>
                    <Dimmer blurring active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check'/>
                            Aggiunto con successo
                        </Header>
                    </Dimmer>
                    <h1
                        style={{
                            color: 'black',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                        Nuovo Produttore / Casinò
                    </h1>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='nameField'
                                control={Input}
                                label='Nome Casinò / Produttore'
                                placeholder='Inserisci nome'
                            >
                            </Form.Field>

                            <Form.Field
                                id='linkField'
                                control={Input}
                                label='Link del sito'
                                placeholder='Inserisci link'
                            >
                            </Form.Field>
                        </Form.Group>

                        <ImagePicker onImageSelected={this.onImageSelected}/>

                        <Form.Field
                            style={{width: '100%'}}
                            onClick={this.submitNewProducer}
                            control={Button}>
                            Aggiungi
                        </Form.Field>

                        <Form.Field
                            onClick={this.buildFakeProducer}
                            control={Button}>
                            Aggiungi Produttore Finto
                        </Form.Field>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddProducer;