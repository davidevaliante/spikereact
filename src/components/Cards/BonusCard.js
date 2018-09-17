import React from 'react'
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
import { Button } from 'semantic-ui-react-single/Button'
import { getImageLinkFromName } from '../../utils/Utils'
import lowerCase from 'lodash/lowerCase'
import { withRouter } from 'react-router-dom'
import { ROUTE } from '../../enums/Constants'

const BonusCard = (props) => {

    const goToExternalLink = () => {
        window.open(props.bonus.link)
    }

    const goToGuide = () => {
        // props.history.push(`/article/${props.bonus.id}`)
        props.history.push('/article/-LMaxXw5Z0MHi_mIY27Z')
    }

    return (

        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div class="flipper">
                <div class="front">
                    <Card color='red'>
                        <Card.Content>
                            <Card.Header>
                                {lowerCase(props.bonus.bonus)}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='vertical-center'>
                                <Image style={{ height: '4.3rem', objectFit: 'cover' }} src={getImageLinkFromName('bonus', props.bonus.name)} />
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                <div class="back">
                    <Card style={{ background: '#454545' }}>
                        <Card.Content>
                            <Button onClick={(event) => goToExternalLink()} fluid color='red'>Provalo subito</Button>
                            <br></br>
                            <Button onClick={(event) => goToGuide()} fluid color='green'>Leggi la guida</Button>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default withRouter(BonusCard);