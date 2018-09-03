import React from 'react'
import truncate from 'lodash/truncate'
import { NavLink } from 'react-router-dom'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Image from 'semantic-ui-react/dist/commonjs/elements/Image'
import Card from 'semantic-ui-react/dist/commonjs/views/Card'
import Radium from 'radium'


const SlotCard = (props) => {

    const cardShadow = {
        boxShadow: '10px 10px 34px -7px rgba(46,46,46,1)',
        margin: '1rem 1rem 1rem 1rem',
        transition: "all ease .5s",
        ":hover": {
            boxShadow: '0px 0px 28px 7px rgba(230,39,39,1)'
        }
    }

    return (

        <NavLink to={`slot/${props.slot.id}`}>
            <div style={cardShadow}>
                <Card key={props.slot.id}>
                    <Image src={props.slot.image} style={{ height: '14rem' }} />
                    <Card.Content >
                        <Card.Header>{props.slot.name}</Card.Header>
                        <Card.Meta >
                            <span className='date'>{props.slot.producer.name}</span>
                        </Card.Meta>
                        <Card.Description>{truncate(props.slot.description, { 'length': 150 })}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='star' />
                            {props.slot.rating}
                        </a>
                    </Card.Content>
                </Card>
            </div>
        </NavLink >
    );
}

export default Radium(SlotCard);