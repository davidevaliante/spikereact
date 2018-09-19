import React, { Component } from 'react';
import ImagePicker from '../admin/ImagePicker'
import { pushImage, updateSlotImage, deleteImages } from '../firebase/firebase'
import { Button } from 'semantic-ui-react-single/Button'
import snakeCase from 'lodash'

class Test extends Component {
    state = {}
    componentDidMount() {

    }

    onImageSelected = (image) => {
        this.setState({ image: image, imageName: image.name })
    }

    submit = () => {
        updateSlotImage('test', this.state.image)
    }

    update = () => {
        deleteImages('test')
    }

    render() {
        return (
            <div>
                <ImagePicker onImageSelected={this.onImageSelected} />
                <Button onClick={this.submit}>Submit</Button>
                <Button onClick={this.update}>Delete Thumbs</Button>
            </div>
        );
    }
}

export default Test

