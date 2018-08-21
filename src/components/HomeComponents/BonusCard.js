import React from 'react'
import { Card, Feed, Image, Button } from 'semantic-ui-react'


const BonusCard = (props) => {
    return (
        <Card href='#' color='red'>
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