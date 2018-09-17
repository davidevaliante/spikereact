import React, { Component } from 'react'
import { Container } from 'semantic-ui-react-single/Container'
import Navbar from '../Header/Navbar'
import Footer from '../Footer'
import { getExtraById } from '../../firebase/get'
import Parser from 'html-react-parser';

class Extra extends Component {

    state = {}

    style = {
        h1: "{color:black}",
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            getExtraById(this.props.match.params.id, data => {
                this.setState({ content: data })
            })
        }
    }

    render() {
        const { content } = this.state
        console.log(content);

        return (
            <div>
                <Navbar fixColor={true} />
                <div className='extra-bg'>
                    <Container text className='extra'>
                        {content && Parser(`${content.content}`)}
                    </Container>
                </div>
                <Footer />
            </div>

        )
    }
}

export default Extra

