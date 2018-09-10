import React, { Component } from 'react';
import filter from 'lodash/filter';
import delay from 'lodash/delay'
import { Button } from 'semantic-ui-react-single/Button'
import { Form } from 'semantic-ui-react-single/Form'
import { Input } from 'semantic-ui-react-single/Input'
import { TextArea } from 'semantic-ui-react-single/TextArea'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { Dimmer } from 'semantic-ui-react-single/Dimmer'
import { Header } from 'semantic-ui-react-single/Header'
import { Icon } from 'semantic-ui-react-single/Icon'
import ImagePicker from '../ImagePicker';
import { pushNewBonus } from '../../firebase/firebase';
import { updateBonusWithId } from '../../firebase/update'
import { ADMINPAGES } from "../../enums/Constants";
import { getBonusWithId } from '../../firebase/get'
import AdminNavbar from "../AdminNavbar";

class AddBonus extends Component {


    componentDidMount() {
        if (this.props.match.params.bonusid) {
            getBonusWithId(this.props.match.params.bonusid, 'it', (bonus) => {
                this.setState({ isInEditMode: true, bonusToEdit: bonus, defaultRating: bonus.rating, defaultReview: bonus.review })
            })
        }
    }

    state = {
        isInEditMode: false
    }

    onDropDownChange = (data) => {
        this.setState({
            ...this.state,
            rating: data.value
        })
    }

    buildFakeSlot = () => {
        document.getElementById('nameField').value = `Bonus Esempio numero ${Math.floor(Math.random() * 100)}`;
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
        let rating = this.state.rating;
        if (!rating && !this.state.isInEditMode) {
            let errorList = this.state.emptyFields;
            errorList.push('rating');
            this.setState({ shouldDisplayErrors: true, emptyFields: errorList })
        } else {
            rating = this.state.bonusToEdit.rating
        }


        if (name && bonus && link && rating && this.state.pickedImage) {
            const newBonus = {
                name: name,
                bonus: bonus,
                rating: rating,
                review: review,
                link: link,
            }

            const imageData = this.state.pickedImage
            this.state.isInEditMode ? updateBonusWithId(this.props.match.params.bonusid, newBonus, imageData, this.onBonusPushSuccess) :
                pushNewBonus(newBonus, imageData, this.onBonusPushSuccess);
        }

    }

    resetErrorOn = (fieldName) => {
        const updated = filter(this.state.emptyFields, (field) => field !== fieldName);
        this.setState({ emptyFields: updated });
    }

    onBonusPushSuccess = () => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 800)
    }

    onProducerSelected = (producer) => {
        this.setState({ producer: producer })
    }

    onImageSelected = (image) => {
        this.setState({
            pickedImage: image
        })
    }

    updateBonus = () => {

    }

    handleOpen = () => this.setState({ active: true })
    handleClose = () => this.setState({ active: false })

    ratingStateOptions = [
        { key: 'uno', value: '1', text: '1' },
        { key: 'due', value: '2', text: '2' },
        { key: 'tre', value: '3', text: '3' },
        { key: 'quattro', value: '4', text: '4' },
        { key: 'cinque', value: '5', text: '5' },

    ]

    state = {
        shouldDisplayErrors: false,
        emptyFields: [],

    }

    render() {
        const { active } = this.state
        console.log(this.state);
        const { bonusToEdit, isInEditMode } = this.state
        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.BONUS} />
                <div
                    style={{ padding: '4rem' }}>
                    <Dimmer active={active} onClickOutside={this.handleClose} page>
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
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='nameField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('name')}
                                control={Input}
                                defaultValue={bonusToEdit && bonusToEdit.name}
                                onChange={() => this.resetErrorOn('name')}
                                label='Nome Bonus'
                                placeholder='Nome Bonus'>
                            </Form.Field>

                        </Form.Group>

                        <Form.Group
                            widths='equal'>
                            <Form.Field
                                id='welcomeBonusField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('bonus')}
                                control={Input}
                                onChange={() => this.resetErrorOn('bonus')}
                                defaultValue={bonusToEdit && bonusToEdit.bonus}
                                label='Bonus di benvenuto'
                                placeholder='Bonus di benvenuto' />

                            <Form.Field
                                id='linkField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('link')}
                                control={Input}
                                onChange={() => this.resetErrorOn('link')}
                                label='Link del bonus'
                                defaultValue={bonusToEdit && bonusToEdit.link}
                                placeholder='Copia ed incolla qui' />
                        </Form.Group>

                        {(this.state.defaultReview && isInEditMode) &&
                            <Form.Field
                                id='reviewField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('review')}
                                control={TextArea}
                                onChange={() => this.resetErrorOn('review')}
                                label='Recensione'
                                defaultValue={this.state.defaultReview}
                                placeholder='Recensione' />
                        }
                        {!isInEditMode &&
                            <Form.Field
                                id='reviewField'
                                error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('review')}
                                control={TextArea}
                                onChange={() => this.resetErrorOn('review')}
                                label='Recensione'
                                placeholder='Recensione' />
                        }

                        <Form.Group
                            widths='equal'>
                            <Form.Field>
                                {(this.state.defaultRating && isInEditMode) &&
                                    <Dropdown
                                        id='ratingField'
                                        error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                                        style={{ marginBottom: '1rem' }}
                                        placeholder='Ok'
                                        onChange={(event, data) => this.onDropDownChange(data)}
                                        selection
                                        defaultValue={this.state.defaultRating}
                                        options={this.ratingStateOptions} />
                                }
                                {!isInEditMode &&
                                    <Dropdown
                                        id='ratingField'
                                        error={this.state.shouldDisplayErrors && this.state.emptyFields.includes('rating')}
                                        style={{ marginBottom: '1rem' }}
                                        placeholder='Rating'
                                        onChange={(event, data) => this.onDropDownChange(data)}
                                        selection
                                        options={this.ratingStateOptions} />
                                }
                            </Form.Field>

                            <Form.Field style={{ width: '100%' }}>
                                <ImagePicker
                                    onImageSelected={this.onImageSelected}
                                    style={{ width: '100%', marginLeft: '2rem' }} />
                            </Form.Field>


                        </Form.Group>
                        <Form.Field
                            style={{ width: '100%' }}
                            onClick={this.submitNewBonus}
                            control={Button}>
                            Aggiungi
                        </Form.Field>

                        <Form.Field
                            onClick={this.buildFakeSlot}
                            control={Button}>
                            Aggiungi Bonus Finto
                        </Form.Field>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddBonus;
