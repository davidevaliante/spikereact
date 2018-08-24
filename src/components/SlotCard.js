import React from 'react'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'


const SlotCard = (props) => {

    return (

        <NavLink
            to={`slot/${props.slot.id}`}>
            <Card key={props.slot.id} style={{ margin: '1rem 1rem 1rem 1rem' }} >
                <Image src={props.slot.image} style={{ height: '14rem' }} />
                <Card.Content>
                    <Card.Header>{props.slot.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{props.slot.producer.name}</span>
                    </Card.Meta>
                    <Card.Description>{_.truncate(props.slot.description, { 'length': 150 })}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='star' />
                        {props.slot.rating}
                    </a>
                </Card.Content>
            </Card>
        </NavLink >
    );
}

export default SlotCard;