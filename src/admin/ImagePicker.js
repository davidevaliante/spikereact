import React, { Component } from 'react'
import split from 'lodash/split'
import { Grid } from 'semantic-ui-react-single/Grid'
import { doesFileExist } from "../utils/Utils";

class ImagePicker extends Component {
    state = {}

    componentDidMount() {
        if (this.props.imagePreview) {
            console.log(this.props.imagePreview)
            this.setState({ currentImageUrl: this.props.imagePreview })

        }
    }


    handleNewImage = () => {
        const selectedFile = document.getElementById('imagePicker').files[0];
        const url = URL.createObjectURL(selectedFile);
        if (selectedFile && split(selectedFile.type, '/')[0] === 'image') {
            this.props.onImageSelected(selectedFile)
            this.setState({ currentImage: selectedFile, currentImageUrl: url })
        } else {
            console.log('unsupported file type');
        }
    }

    render() {
        const { currentImage, currentImageUrl } = this.state
        console.log(currentImageUrl);

        return (

            <Grid stackable columns={1} >
                <Grid.Column>
                    <div className='upload-btn-wrapper'>
                        <button className="btn">Carica Immagine</button>
                        <input
                            id='imagePicker'
                            onChange={() => this.handleNewImage()}
                            type="file"
                            name="myfile" />
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <img id='imagePreview'
                        alt='preview'
                        src={currentImageUrl}
                        style={{ width: '150px' }} />
                </Grid.Column>
            </Grid>
        )
    }

};

export default ImagePicker;