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
import { FormField } from 'semantic-ui-react-single/Form';
import SearchField from "../admin/SearchField";
import SearchMultipleSelection from "../admin/SearchMultipleSelection";
import ImagePicker from "../admin/ImagePicker";


const EditSlot = (props) => {



    console.log(props.match.params.id);
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

                        control={Input}
                        label='Nome'
                        placeholder='Nome slot...'>
                    </Form.Field>

                    <Form.Field>
                        <label>Produttore</label>
                        <SearchField
                            id='producerField'

                            nodename='Produttore'
                            placeholder='Nome produttore...'
                        />
                    </Form.Field>

                </Form.Group>

                <Form.Group
                    widths='equal'>

                    <Form.Field
                        id='linkYoutube'

                        control={Input}
                        label='YouTube Link'
                        placeholder='YouTube Link...' />
                    <Form.Field
                        id='linkPlay'

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

                        control={TextArea}
                        label='Consigli'
                        placeholder='Consigli...' />
                    <Form.Field
                        id='tecnicalsField'
                        control={TextArea}
                        label='Scheda Tecnica'
                        placeholder='Scheda Tecnica...' />

                </Form.Group>



                <Form.Field
                    id='descriptionField'

                    control={TextArea}
                    label='Descrizione'
                    placeholder='Descrizione slot...' />

                <Form.Group widths='equal'>

                    <FormField>
                        <Dropdown
                            id='typeField'

                            placeholder='Tipo di slot'
                            search
                            selection
                        />
                    </FormField>

                    <FormField>
                        <Dropdown
                            id='ratingField'

                            style={{ marginBottom: '1rem' }}
                            placeholder='Rating'

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
                    onClick={this.submitNewSlot}
                    control={Button}>
                    Modifica
                    </Form.Field>


            </Form>
        </div>

    )
}



export default EditSlot;