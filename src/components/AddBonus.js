import React, { Component } from 'react';
import _ from 'lodash';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Dropdown,
    Dimmer,
    Header, Icon
} from 'semantic-ui-react';
import ImagePicker from './ImagePicker';
import { pushNewBonus, pushNewImage } from '../firebase/firebase';
import SearchField from './SearchField';

class AddBonus extends Component {

    onDropDownChange = (data) => {
        this.setState({
            ...this.state,
            rating: data.value
        })
    }

    buildFakeSlot = () => {
        document.getElementById('nameField').value = `Bonus Esempio numero ${Math.floor(Math.random() * 100)}`;
        document.getElementById('casinoField').value = "Fake casino";
        document.getElementById('welcomeBonusField').value = `${Math.floor(Math.random() * 4) * 10} SENZA DEPOSITO + 30 FREE SPIN + 300€`;
        document.getElementById('reviewField').value = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ea tempora delectus rem omnis vero, tenetur quaerat numquam repellat architecto quas minus debitis deleniti? Eveniet accusantium quo amet deleniti tempora?";
        document.getElementById('linkField').value = "https://youtu.be/G4VAdWJXyFk?list=RDG4VAdWJXyFk";

        this.setState({
            ...this.state,
            rating: Math.floor(Math.random() * 6)
        });
    }

    submitNewBonus = () => {
        // resetta quali sono i field vuoti errori
        this.setState({ shouldDisplayErrors: false, emptyFields: [] });

        const name = document.getElementById('nameField').value.trim();
        if (!name) {
            let errorList = this.state.emptyFields;
            errorList.push('name');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const producer = document.getElementById('casinoField').value.trim();
        if (!producer) {
            let errorList = this.state.emptyFields;
            errorList.push('producer');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const bonus = document.getElementById('welcomeBonusField').value.trim();
        if (!bonus) {
            let errorList = this.state.emptyFields;
            errorList.push('bonus');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const review = document.getElementById('reviewField').value.trim();
        if (!review) {
            let errorList = this.state.emptyFields;
            errorList.push('review');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const link = document.getElementById('linkField').value.trim();
        if (!link) {
            let errorList = this.state.emptyFields;
            errorList.push('link');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }
        const rating = this.state.rating;
        if (!rating) {
            let errorList = this.state.emptyFields;
            errorList.push('rating');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        }

        const newBonus = {
            name: name,
            producer: producer,
            bonus: bonus,
            rating: rating,
            review: review,
            link: link
        }
        if (name && producer && bonus && review && link && rating) {
            pushNewBonus(newBonus, this.onBonusPushSuccess);
        }

    }

    resetErrorOn = (fieldName) => {
        const updated = _.filter(this.state.emptyFields, (field) => field !== fieldName);
        this.setState({ emptyFields: updated });
    }

    onBonusPushSuccess = () => {
        this.setState({ active: true })
        _.delay(() => {
            this.setState({ active: false })
        }, 800)
    }

    onImageSelected = (image) => {
        this.setState({
            pickedImage: image
        })
        pushNewImage(image, 'BonusImages')
    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })


    state = {
        shouldDisplayErrors: false,
        emptyFields: [],
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
        console.log(this.state);

        return (
            <div
                style={{ padding: '4rem' }}>
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
                    Nuovo Bonus
                </h1>

                <Form>

                    <Form.Group widths='equal' >
                        <Form.Field
                            id='nameField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('name')}
                            control={Input}
                            onChange={() => this.resetErrorOn('name')}
                            label='Nome Bonus'
                            placeholder='Nome Bonus' >
                        </Form.Field>

                        <Form.Field
                            id='casinoField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('producer')}
                            control={Input}
                            onChange={() => this.resetErrorOn('producer')}
                            label='Erogatore'
                            placeholder='Nome Casinò/Produttore/Erogatore del bonus' />
                    </Form.Group>

                    <Form.Group
                        widths='equal' >

                        <Form.Field
                            id='welcomeBonusField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('bonus')}
                            control={Input}
                            onChange={() => this.resetErrorOn('bonus')}
                            label='Bonus di benvenuto'
                            placeholder='Bonus di benvenuto' />

                        <Form.Field
                            id='linkField'
                            error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('link')}
                            control={Input}
                            onChange={() => this.resetErrorOn('link')}
                            label='Link del bonus'
                            placeholder='Copia ed incolla qui' />

                    </Form.Group>

                    <Form.Field
                        id='reviewField'
                        error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('review')}
                        control={TextArea}
                        onChange={() => this.resetErrorOn('review')}
                        label='Recensione'
                        placeholder='Recensione' />
                    <Form.Group
                        widths='equal'>
                        <Form.Field
                            width='8'>
                            <Dropdown
                                id='ratingField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                                style={{ marginBottom: '1rem' }}
                                placeholder='Rating'
                                onChange={(event, data) => this.onDropDownChange(data)}
                                search
                                selection
                                options={this.state.ratingStateOptions} />
                        </Form.Field>

                        <Form.Field>
                            <ImagePicker
                                onImageSelected={this.onImageSelected}
                                style={{ marginLeft: '2rem' }} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field
                        onClick={this.buildFakeSlot}
                        control={Button} >
                        Aggiungi Bonus Finto
                    </Form.Field>

                    <Form.Field
                        onClick={this.submitNewBonus}
                        control={Button} >
                        Aggiungi
                    </Form.Field>

                </Form>

            </div>
        )
    }
}

export default AddBonus;
