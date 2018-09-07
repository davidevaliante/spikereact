import React from 'react'
import split from 'lodash/split'

const ImagePicker = (props) => {

    const handleNewImage = () => {
        const selectedFile = document.getElementById('imagePicker').files[0];

        if (selectedFile && split(selectedFile.type, '/')[0] === 'image') {
            props.onImageSelected(selectedFile)
        } else {
            console.log('unsupported file type');
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