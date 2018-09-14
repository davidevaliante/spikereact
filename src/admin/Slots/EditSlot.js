import React from "react";
import { Button } from 'semantic-ui-react-single/Button';
import { Form } from 'semantic-ui-react-single/Form';
import { Input } from 'semantic-ui-react-single/Input';
import { Dropdown } from 'semantic-ui-react-single/Dropdown';
import { Image } from "semantic-ui-react-single/Image";
import { FormField } from 'semantic-ui-react-single/Form';
import SearchField from "../SearchField";
import SearchMultipleSelection from "../SearchMultipleSelection";
import ImagePicker from "../ImagePicker";
import { getSlotWithId } from "../../firebase/firebase";
import { SLOT_TYPES } from '../../enums/Constants';
import { updateSlotWithId } from '../../firebase/firebase';
import { getBonusList } from '../../firebase/firebase';
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'



class EditSlot extends React.Component {
    state = {
        currentSlot: {},
        ratingStateOptions: [
            { key: 'uno', value: '1', text: '1' },
            { key: 'due', value: '2', text: '2' },
            { key: 'tre', value: '3', text: '3' },
            { key: 'quattro', value: '4', text: '4' },
            { key: 'cinque', value: '5', text: '5' },
        ],
        slotTypeOptions: [
            { key: 'one', value: SLOT_TYPES.BAR, text: 'Slot da bar' },
            { key: 'two', value: SLOT_TYPES.GRATIS, text: 'Slot gratis' },
        ],
        shouldDisplayErrors: false,
        emptyFields: [],
        list: "",
        selectedBonus: {}
    };



    componentDidMount() {
        getSlotWithId(this.props.match.params.id, (slot) => {

            let options = [];
            getBonusList(list => {
                let counter = 1
                for (const key in list) {
                    options.push({ key: `${key}`, value: `${counter}`, text: `${list[key].name}` })
                    counter++
                }
                const k = keys(slot.bonus)

                let def = []
                // valori default per l'edit
                forEach(k, (element) => {
                    forEach(options, (e, i) => {
                        if (e.key === element) def.push((i + 1).toString())
                    })
                })


                this.setState({
                    currentSlot: slot,
                    defaultType: slot.type,
                    defaultRating: slot.rating,
                    defaultValuesForBonus: def,
                    currentSlotId: this.props.match.params.id,
                    optionList: options,
                    firebaseBonusObject: slot.bonus,
                    selectedBonus: slot.bonus
                })
            })


        })
    }
    onProducerSelected = (selectedProducer) => {
        this.setState({ selectedProducer: selectedProducer })
        console.log(selectedProducer);
    }
    onImageSelected = (image) => {
        this.setState({ image: image, imageName: image.name })
    }

    onTypeChanged = (data) => {
        this.setState({ type: data.value })
    }

    onRatingChanged = (data) => {
        this.setState({ rating: data.value })
    }

    onBonusSelected = (selectedBonus) => {
        console.log(selectedBonus);

        this.setState({ selectedBonus: selectedBonus })
    }

    submitEditSlot = () => {
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
        let BONUS = this.state.selectedBonus

        let producer = this.state.selectedProducer
        if (!producer) {
            producer = this.state.currentSlot.producer
        }
        let rating = this.state.rating;
        if (!rating) {
            rating = this.state.currentSlot.rating
        }
        let type = this.state.type;
        if (!type) {
            type = this.state.currentSlot.type
        }

        const updatedSlot = {
            name: name,
            producer: producer,
            linkYoutube: linkYoutube,
            linkPlay: linkPlay,
            bonus: BONUS,
            description: description,
            rating: rating,
            tips: tipsField,
            tecnicals: tecnicalsField,
            type: type,
        }

        const image = this.state.image
        const slotId = this.props.match.params.id

        console.log(updatedSlot);

        if (name && producer && linkYoutube && linkPlay && BONUS && description && rating && tipsField && tecnicalsField && updatedSlot.type) {
            updateSlotWithId(slotId, updatedSlot, image)
        }

    }

    render() {

        const { currentSlot } = this.state
        const { producer } = this.state.currentSlot

        return (
            <div>
                <h1
                    style={{
                        color: 'black',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                    Modifica Slot
                    </h1>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='nameField'
                            defaultValue={currentSlot.name}
                            control={Input}
                            label='Nome'
                            placeholder='Nome slot...'>
                        </Form.Field>

                        <Form.Field>
                            <label>Produttore</label>
                            <SearchField
                                id='producerField'
                                onSelected={this.onProducerSelected}
                                nodename='Produttore'
                                placeholder={producer ? producer.name : 'Nome produttore...'}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group
                        widths='equal'>
                        <Form.Field
                            id='linkYoutube'
                            defaultValue={currentSlot.linkYoutube}
                            control={Input}
                            label='YouTube Link'
                            placeholder='YouTube Link...' />
                        <Form.Field
                            id='linkPlay'
                            defaultValue={currentSlot.linkPlay}
                            control={Input}
                            label='Slot Link'
                            placeholder='Slot Play Link...' />
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
                        widths='equal'>
                        <Form.Field
                            id='tipsField'
                            defaultValue={currentSlot.tips}
                            control={Input}
                            label='Consigli'
                            placeholder='Consigli...' />
                        <Form.Field
                            id='tecnicalsField'
                            defaultValue={currentSlot.tecnicals}
                            control={Input}
                            label='Scheda Tecnica'
                            placeholder='Scheda Tecnica...' />
                    </Form.Group>



                    <Form.Field
                        id='descriptionField'
                        defaultValue={currentSlot.description}
                        control={Input}
                        label='Descrizione'
                        placeholder='Descrizione slot...' />
                    <Form.Group widths='equal'>
                        <FormField>
                            {this.state.defaultType &&
                                <Dropdown
                                    id='typeField'
                                    placeholder='Gratis / Da Bar'
                                    onChange={(event, data) => this.onTypeChanged(data)}
                                    defaultValue={this.state.defaultType}
                                    options={this.state.slotTypeOptions}
                                    search
                                    selection />
                            }
                        </FormField>
                        <FormField>
                            {this.state.defaultRating &&
                                <Dropdown
                                    id='ratingField'
                                    style={{ marginBottom: '1rem' }}
                                    placeholder='Rating'
                                    onChange={(event, data) => this.onRatingChanged(data)}
                                    options={this.state.ratingStateOptions}
                                    search
                                    defaultValue={this.state.defaultRating}
                                    selection />
                            }
                        </FormField>
                        <FormField>
                            {this.state.defaultValuesForBonus &&
                                <SearchMultipleSelection
                                    defaults={this.state.defaultValuesForBonus}
                                    onListUpdate={this.onBonusSelected} />
                            }
                        </FormField>
                        <Form.Field>
                            <ImagePicker onImageSelected={this.onImageSelected} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Field
                        style={{ width: '100%' }}
                        onClick={this.submitEditSlot}
                        control={Button}>
                        Modifica
                    </Form.Field>
                    <Image >ci vorrei mette la foto corrente della macchinetta ma non so dove prenderla xD</Image>
                </Form>
            </div>

        )
    }
}



export default EditSlot;