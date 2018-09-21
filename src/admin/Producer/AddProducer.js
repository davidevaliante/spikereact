import React, { Component } from 'react';
import delay from 'lodash/delay';
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { Input } from 'semantic-ui-react-single/Input'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Header } from 'semantic-ui-react-single/Header'
import { Icon } from 'semantic-ui-react-single/Icon'


import ImagePicker from '../ImagePicker';
import AdminNavbar from "../AdminNavbar";
import RichEdit from "../Extra/RichEdit";
import { ADMINPAGES } from "../../enums/Constants";
import { pushNewProducer } from '../../firebase/firebase';
import { updateProducerWithId } from '../../firebase/update';
import { getProducerWithId } from "../../firebase/get";
import { getImageLinkFromName } from "../../utils/Utils";

class AddProducer extends Component {

    state = {
        isInEditMode: false,
        shouldDisplayErrors: false,
        submitBtn: 'Aggiungi',
    }

    buildFakeProducer = () => {
        document.getElementById('nameField').value = `Casinò finto numero ${Math.floor(Math.random() * 100)}`;
        document.getElementById('linkField').value = 'https://youtu.be/HKrOH0sQV6w?list=RDGMEMYH9CUrFO7CfLJpaD7UR85wVMHKrOH0sQV6w';
    }

    submitNewProducer = () => {
        const name = document.getElementById('nameField').value.trim();
        const link = document.getElementById('linkField').value.trim();
        const description = document.getElementById('htmlText').value.trim()
        console.log("Pushing", name, link, description)

        if ( name && link ) {
            const newProducer = {
                name: name,
                link: link,
                description: description
            }
            if (!this.state.isInEditMode)
                pushNewProducer(newProducer, this.state.image, this.onProducerPushSuccess)
            else
                updateProducerWithId(this.props.match.params.id, newProducer, this.state.image, this.onProducerPushSuccess)
        }
    }

    onImageSelected = (image) => {
        this.setState({ image: image })
    }

    onProducerPushSuccess = () => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 800)
    }
    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

    componentDidMount(){
        if (this.props.match.params.id) {
            getProducerWithId( this.props.match.params.id,
                (producer) => {
                    console.log(producer)
                    this.setState({
                        isInEditMode: true,
                        producer: producer,
                        submitBtn: 'Modifica',

                    })
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.match.params.id !==this.props.match.params.id) {
            console.log("GG")
            this.setState({
                producer: undefined,
                isInEditMode: false,
                shouldDisplayErrors: false,
                submitBtn: 'Aggiungi',
            })
        }
    }

    render() {

        const { producer, active, isInEditMode } = this.state

        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.PRODUCER} />

                <div
                    style={{ padding: '4rem' }}>
                    <Dimmer blurring active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            { !isInEditMode ? 'Aggiunto' : 'Modificato' } con successo
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
                                defaultValue={producer && producer.name}
                            >
                            </Form.Field>

                            <Form.Field
                                id='linkField'
                                control={Input}
                                label='Link del sito'
                                placeholder='Inserisci link'
                                defaultValue={producer && producer.link}
                            >
                            </Form.Field>
                        </Form.Group>

                        <Form.Field>
                            <label>Descrizione</label>
                            {isInEditMode && this.state.producer &&
                            <RichEdit defaultContent={this.state.producer.description}/>}
                            {!isInEditMode && <RichEdit />}
                        </Form.Field>

                        {isInEditMode && producer &&
                            <ImagePicker
                                onImageSelected={this.onImageSelected}
                                style={{ width: '100%', marginLeft: '2rem' }}
                                imagePreview={getImageLinkFromName('producer', this.state.producer.name)} />
                        }

                        {!isInEditMode &&
                            <ImagePicker onImageSelected={this.onImageSelected} />}

                        <Form.Field
                            style={{ width: '100%' }}
                            onClick={this.submitNewProducer}
                            control={Button}>
                            {this.state.submitBtn}
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