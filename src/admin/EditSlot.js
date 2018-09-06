import React from "react";
import { Button } from 'semantic-ui-react-single/Button';
import { Form } from 'semantic-ui-react-single/Form';
import { Input } from 'semantic-ui-react-single/Input';
import { TextArea } from 'semantic-ui-react-single/TextArea';
import { Dropdown } from 'semantic-ui-react-single/Dropdown';
import { Dimmer } from 'semantic-ui-react-single/Dimmer';
import { Header } from 'semantic-ui-react-single/Header';
import { Icon } from 'semantic-ui-react-single/Icon';
import { Radio } from 'semantic-ui-react-single/Radio';
import { Image } from "semantic-ui-react-single/Image";
import { FormField } from 'semantic-ui-react-single/Form';
import SearchField from "../admin/SearchField";
import SearchMultipleSelection from "../admin/SearchMultipleSelection";
import ImagePicker from "../admin/ImagePicker";
import { getSlotWithId } from "../firebase/firebase";
import { SLOT_TYPES } from '../enums/Constants';
import { pushNewSlot } from '../firebase/firebase';
import { editSlot } from "../firebase/firebase";



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
        list: ""
    };




    componentDidMount() {
        getSlotWithId(this.props.match.params.id, (slot) => {
            this.setState({
                currentSlot: slot,
                currentSlotId: this.props.match.params.id
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
    onBonusSelected = (selectedBonus) => {
        this.setState({ selectedBonus: selectedBonus })
        console.log(selectedBonus);

    }






    render() {
        const { currentSlot } = this.state




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
                                placeholder='Nome produttore...'
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
                            <Dropdown
                                id='typeField'

                                placeholder={currentSlot.type}
                                options={this.state.slotTypeOptions}

                                search
                                selection
                            />
                        </FormField>

                        <FormField>
                            <Dropdown
                                id='ratingField'

                                style={{ marginBottom: '1rem' }}

                                placeholder={currentSlot.rating}  // non capisco perchè   defaultValue={currentSlot.rating} non va ma nella documetazione sta scritto che si dovrebbe fa cosi
                                options={this.state.ratingStateOptions}
                                search
                                selection
                            />
                        </FormField>
                        <FormField>
                            <SearchMultipleSelection
                                onListUpdate={this.onBonusSelected} />
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