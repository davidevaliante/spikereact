import React from 'react'
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'
import { getImageLinkFromName } from '../../utils/Utils'
import lowerCase from 'lodash/lowerCase'

const BonusCard = (props) => {

    const handleClick = () => {
        window.open(props.bonus.link)
    }

    return (
        <Card color='red' onClick={(event) => handleClick()}>
            <Card.Content>
                <Card.Meta></Card.Meta>
                <Card.Header>
                    {lowerCase(props.bonus.bonus)}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className='vertical-center'>
                    <Image circular style={{ height: '3rem', objectFit: 'cover' }} src={getImageLinkFromName('bonus', props.bonus.name)} />
                </div>
            </Card.Content>

        </Card>
    )
}

export default BonusCard;