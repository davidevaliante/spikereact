import React from 'react'
import _ from 'lodash'
import { Card, Icon, Image } from 'semantic-ui-react'


const SlotCard = (props) => {


    return (
        <Card key={props.listKey} style={props.listKey % 2 === 0 ? { marginBottom: '3rem', marginTop: '0', marginRight: '2rem' } : { marginTop: '3rem', marginBottom: '0', marginRight: '2rem' }}>
            <Image src={props.slot.image} />
            <Card.Content>
                <Card.Header>{props.slot.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.slot.producer.name}</span>
                </Card.Meta>
                <Card.Description>{_.truncate(props.slot.description, { 'length': 40 })}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='star' />
                    {props.slot.rating}
                </a>
            </Card.Content>
        </Card>
    );
}

export default SlotCard;