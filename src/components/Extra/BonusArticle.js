import React, { Component } from 'react'
import { Container } from 'semantic-ui-react-single/Container'
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Sticky } from 'semantic-ui-react-single/Sticky'
import { Grid } from 'semantic-ui-react-single/Grid'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import Navbar from '../Header/Navbar'
import Footer from '../Footer'
import { getExtraById } from '../../firebase/get'
import Parser from 'html-react-parser';
import { GridColumn } from 'semantic-ui-react';

class BonusArticle extends Component {

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

    footerBottomTrigger = () => {

    }

    render() {
        const { content } = this.state

        return (
            <div className='extra-bg'>
                <Navbar fixColor={true} />
                <div className='extra-button-left'>
                    <Button size='large' animated inverted>
                        <Button.Content visible>Torna Indietro</Button.Content>
                        <Button.Content hidden inverted>
                            <Icon name='arrow left' />
                        </Button.Content>
                    </Button>
                </div>
                <div className='extra-button-right'>
                    <Button size='large' animated inverted>
                        <Button.Content visible>Provalo Subito</Button.Content>
                        <Button.Content hidden inverted>
                            <Icon name='arrow left' />
                        </Button.Content>
                    </Button>
                </div>

                <div className='extra-content'>
                    <Container text className='extra'>
                        {content && Parser(`${content.content}`)}
                    </Container>
                </div>
                <Visibility onBottomVisible={footerBottomTrigger()}>
                    <Footer />
                </Visibility>
            </div>

        )
    }
}

export default BonusArticle

