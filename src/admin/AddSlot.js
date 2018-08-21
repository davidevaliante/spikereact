import React, { Component } from 'react'
import {
    Button,
    Form,
    Input,
    Radio,
    TextArea,
    Dropdown,
    Dimmer,
    Header, Icon, FormField
} from 'semantic-ui-react'

import { pushNewSlot } from '../firebase/firebase.js'
import SearchField from './SearchField.js';
import ImagePicker from './ImagePicker.js';
import SearchMultipleSelection from './SearchMultipleSelection.js';
import _ from 'lodash';
import { SLOT_TYPES } from '../enums/Constants.js';


class AddSlot extends Component {

    fakeObject = () => {

        const produttoriFinti = ['Ntent', 'SlotOnline', 'Pyramid', 'Haunted House Inc']

        document.getElementById('nameField').value = `Slot Esempio numero ${Math.floor(Math.random() * 100)}`;
        document.getElementById('producerField').value = `${produttoriFinti[Math.floor(Math.random() * produttoriFinti.length)]}`;
        document.getElementById('linkYoutube').value = 'https://www.youtube.com/watch?v=G4VAdWJXyFk';
        document.getElementById('linkPlay').value = 'https://www.youtube.com/watch?v=G4VAdWJXyFk';
        document.getElementById('descriptionField').value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        // document.getElementById('ratingField').value;

        this.setState({
            ...this.state,
            rating: 5,
            isFake: true
        })


        document.getElementById('tipsField').value = '@sdfgsg @fhdhnfghjn @dfgdfghdfh'
        document.getElementById('tecnicalsField').value = '$dfsdfsfgb $dfgsgdfg $dfgsdfsfgbdfg';

    }

    onDropDownChange = (data) => {
        this.setState(
            {
                ...this.state,
                rating: data.value
            }
        )
        console.log(this.state);
    }

    submitNewSlot = () => {
        // resetta quali sono i field vuoti errori
        this.setState({ shouldDisplayErrors: false, emptyFields: [] });

        const name = document.getElementById('nameField').value.trim();
        if (!name) {
            let errorList = this.state.emptyFields;
            errorList.push('name');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const linkYoutube = document.getElementById('linkYoutube').value.trim();
        if (!linkYoutube) {
            let errorList = this.state.emptyFields;
            errorList.push('linkYoutube');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const linkPlay = document.getElementById('linkPlay').value.trim();
        if (!linkPlay) {
            let errorList = this.state.emptyFields;
            errorList.push('linkPlay');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const description = document.getElementById('descriptionField').value.trim();
        if (!description) {
            let errorList = this.state.emptyFields;
            errorList.push('description');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const rating = this.state.rating;
        if (!rating) {
            let errorList = this.state.emptyFields;
            errorList.push('rating');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }

        const tipsField = document.getElementById('tipsField').value.trim();
        if (!tipsField) {
            let errorList = this.state.emptyFields;
            errorList.push('tips');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const tecnicalsField = document.getElementById('tecnicalsField').value.trim();
        if (!tecnicalsField) {
            let errorList = this.state.emptyFields;
            errorList.push('tecnicals');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const BONUS = this.state.selectedBonus
        if (!BONUS) {
            let errorList = this.state.emptyFields;
            errorList.push('bonus');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const producer = this.state.selectedProducer
        if (!producer) {
            let errorList = this.state.emptyFields;
            errorList.push('producer');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }


        const d = new Date();
        const time = d.getTime();

        const newSlot = {
            name: name,
            producer: producer,
            linkYoutube: linkYoutube,
            linkPlay: linkPlay,
            bonus: BONUS,
            description: description,
            rating: rating,
            time: time,
            tips: tipsField,
            tecnicals: tecnicalsField,
            image: this.state.image,
            type: this.state.type,
            isFake: this.state.isFake
        }

        if (name && producer && linkYoutube && linkPlay && BONUS && description && rating && tipsField && tecnicalsField && newSlot.type) {
            pushNewSlot(newSlot, this.onSlotPushSuccess)
        }
    }

    formatText = (event, data) => {
        if (this.state.isInCopyPasteMode) {
            const rawList = data.value.split('\n');
            const list = rawList.filter((element) => (element.trim() !== ''))

            switch (event.target.id) {
                case 'tipsField':
                    this.setState({
                        ...this.state,
                        tips: list
                    });
                    break;
                case 'tecnicalsField':
                    this.setState({
                        ...this.state,
                        tecnicals: list
                    });
                    break;
                default:
                    return undefined;
            }

        }
    }

    switchCopyPasteMode = () => {
        this.setState({
            ...this.state,
            isInCopyPasteMode: !this.state.isInCopyPasteMode
        })
    }

    onBonusSelected = (selectedBonus) => {
        this.setState({ selectedBonus: selectedBonus })
        console.log(selectedBonus);

    }

    onProducerSelected = (selectedProducer) => {
        this.setState({ selectedProducer: selectedProducer })

    }

    resetErrorOn = (fieldName) => {
        const updated = _.filter(this.state.emptyFields, (field) => field !== fieldName);
        this.setState({ emptyFields: updated });
    }

    onSlotPushSuccess = () => {
        this.setState({ active: true })
        _.delay(() => {
            this.setState({ active: false })
        }, 800)
    }

    onImageSelected = (image) => {
        this.setState({ image: image })
    }

    onTypeSelected = (data) => {
        this.setState({ type: data.value })
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })


    state = {
        slotTypeOptions: [
            { key: 'one', value: SLOT_TYPES.BAR, text: 'Slot da bar' },
            { key: 'two', value: SLOT_TYPES.GRATIS, text: 'Slot gratis' },
            { key: 'three', value: SLOT_TYPES.ONLINE, text: 'Slot online' }
        ],
        shouldDisplayErrors: false,
        emptyFields: [],
        isInCopyPasteMode: true,
        ratingStateOptions: [
            { key: 'uno', value: '1', text: '1' },
            { key: 'due', value: '2', text: '2' },
            { key: 'tre', value: '3', text: '3' },
            { key: 'quattro', value: '4', text: '4' },
            { key: 'cinque', value: '5', text: '5' },
        ]
    }

    render() {
        const { active } = this.state
        return (
            <div
                style={{ padding: '4rem' }}>
                <Form>

                    <Dimmer blurring active={active} onClickOutside={this.handleClose} page>
                        <Header as='h2' icon inverted>
                            <Icon name='check' />
                            Aggiunto con successo
                        </Header>
                    </Dimmer>

                    <h1
                        style={{
                            color: 'black',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                        Nuova Slot
                    </h1>

                    <Form.Group widths='equal' >

                        <Form.Field
                            id='nameField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('name')}
                            onChange={() => this.resetErrorOn('name')}
                            control={Input}
                            label='Nome'
                            content='Nome prova'
                            placeholder='Nome slot' >
                        </Form.Field>

                        <Form.Field>
                            <SearchField
                                id='producerField'
                                onSelected={this.onProducerSelected}
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('producer')}
                                nodename='Produttore'
                            />
                        </Form.Field>

                    </Form.Group>

                    <Form.Group
                        widths='equal' >

                        <Form.Field
                            id='linkYoutube'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('linkYoutube')}
                            onChange={() => this.resetErrorOn('linkYoutube')}
                            control={Input}
                            label='LinkYoutube'
                            placeholder='LinkYoutube' />
                        <Form.Field
                            id='linkPlay'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('linkPlay')}
                            onChange={() => this.resetErrorOn('linkPlay')}
                            control={Input}
                            label='LinkPlay'
                            placeholder='LinkPlay' />

                    </Form.Group>

                    <h1
                        style={{
                            color: 'black',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                        Liste
                    </h1>

                    <Form.Group
                        widths='equal' >

                        <Form.Field
                            id='tipsField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('tips')}
                            onChange={(event, data) => this.state.isInCopyPasteMode ? this.formatText(event, data) : this.resetErrorOn('tips')}
                            control={TextArea}
                            label='Consigli'
                            placeholder='Consigli' />
                        <Form.Field
                            id='tecnicalsField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('tecnicals')}
                            control={TextArea}
                            onChange={(event, data) => this.state.isInCopyPasteMode ? this.formatText(event, data) : this.resetErrorOn('tecnicals')}
                            label='Descrizione Tecnica'
                            placeholder='Tecnica' />

                    </Form.Group>

                    <Form.Group
                        widths='equal' >

                        <Radio
                            id='copyPasteMode'
                            onChange={this.switchCopyPasteMode}
                            style={{ marginLeft: '1rem' }}
                            toggle />

                    </Form.Group>

                    <Form.Field
                        id='descriptionField'
                        error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('description')}
                        onChange={() => this.resetErrorOn('description')}
                        control={TextArea}
                        label='Descrizione'
                        placeholder='Inserisci descrizione...' />

                    <SearchMultipleSelection
                        onListUpdate={this.onBonusSelected}
                    />

                    <Dropdown
                        id='ratingField'
                        error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                        style={{ marginBottom: '1rem' }}
                        placeholder='Rating'
                        onChange={(event, data) => data ? this.onDropDownChange(data) : this.resetErrorOn('rating')}
                        search
                        selection
                        options={this.state.ratingStateOptions} />
                    <Form.Group>
                        <Form.Field>
                            <ImagePicker
                                onImageSelected={this.onImageSelected}
                            />
                        </Form.Field>
                        <FormField>
                            <Dropdown
                                onChange={(event, data) => this.onTypeSelected(data)}
                                placeholder='State'
                                search
                                selection
                                options={this.state.slotTypeOptions} />
                        </FormField>
                    </Form.Group>


                    <Form.Field
                        onClick={this.submitNewSlot}
                        control={Button} >
                        Aggiungi
                        </Form.Field>

                    <Form.Field
                        onClick={this.fakeObject}
                        control={Button} >
                        Aggiungi Fake
                        </Form.Field>
                </Form>
            </div>
        );
    }
}



export default AddSlot;