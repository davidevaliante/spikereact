import React from 'react'
import _ from 'lodash'

const ImagePicker = (props) => {

    const handleNewImage = () => {
        const selectedFile = document.getElementById('imagePicker').files[0];
        console.log(selectedFile.type);

        if (_.split(selectedFile.type, '/')[0] === 'image') {
            props.onImageSelected(selectedFile)
        } else {
            console.log('unsupported file type');
            console.log(selectedFile.type);
        }
    }

    return (
        <div className='upload-btn-wrapper'>
            <button className="btn">Carica Immagine</button>
            <input
                id='imagePicker'
                onChange={() => handleNewImage()}
                type="file"
                name="myfile" />
        </div>
    )
}

export default ImagePicker;