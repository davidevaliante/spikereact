import React from 'react'
import { Card } from 'semantic-ui-react-single/Card'
import { Image } from 'semantic-ui-react-single/Image'



const BonusCard = (props) => {

    const handleClick = () => {
        window.open(props.bonus.link)
    }

    return (
        <Card color='red' onClick={(event) => handleClick()}>
            <Card.Content>
                <Card.Header>{props.bonus.producer.name}</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>
                    {props.bonus.bonus}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='vertical-center'>
                    <Image circular src={props.bonus.image} />
                </div>
            </Card.Content>

        </Card>
    )
}

export default BonusCard;