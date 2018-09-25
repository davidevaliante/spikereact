import React from 'react'
// semantic
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
import { Button } from 'semantic-ui-react-single/Button'
// data
import { getImageLinkFromName } from '../../utils/Utils'
// mix
import lowerCase from 'lodash/lowerCase'
// router e redux
import { withRouter } from 'react-router-dom'

const BonusCard = (props) => {

    const goToExternalLink = () => {
        window.open(props.bonus.link)
    }

    const goToGuide = () => {
        props.history.push(`/article/${props.bonus.guideId}`)
    }

    return (

        <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
            <div className="flipper">
                <div className="front">
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

                <div className="back">
                    <Card style={{ background: '#454545' }}>
                        <Card.Content>
                            <Button onClick={(event) => goToExternalLink()} fluid color='red'>Provalo subito</Button>
                            {props.bonus.guideId &&
                                <div>
                                    <br></br>
                                    <Button onClick={(event) => goToGuide()} fluid color='green'>Leggi la guida</Button>
                                </div>
                            }
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>

    )
}

export default withRouter(BonusCard);