import React from 'react'
import split from 'lodash/split'
import {Grid} from 'semantic-ui-react-single/Grid'
import {doesFileExist} from "../utils/Utils";

const ImagePicker = (props) => {

    if (doesFileExist(props.imagePreview) && !this.changed) {
        // console.log('CHECK FILE', doesFileExist(props.imagePreview))
        this.img = props.imagePreview;
    }
    // (props.imagePreview && !this.changed) ? this.img = props.imagePreview : undefined;


    const handleNewImage = () => {
        this.changed = true;
        const selectedFile = document.getElementById('imagePicker').files[0];
        this.img = URL.createObjectURL(selectedFile);
        if (selectedFile && split(selectedFile.type, '/')[0] === 'image') {
            props.onImageSelected(selectedFile)
        } else {
            console.log('unsupported file type');
        }
    }

    return (
        <Grid stackable columns={1}>
            <Grid.Column>
                <div className='upload-btn-wrapper'>
                    <button className="btn">Carica Immagine</button>
                    <input
                        id='imagePicker'
                        onChange={() => handleNewImage()}
                        type="file"
                        name="myfile"/>
                </div>
            </Grid.Column>
            <Grid.Column>
                <img id='imagePreview' alt='preview' src={this.img} style={{width: '150px'}}/>
            </Grid.Column>
        </Grid>
    )
};

export default ImagePicker;