import React from 'react'
import truncate from 'lodash/truncate'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Image } from 'semantic-ui-react-single/Image'
import { Card } from 'semantic-ui-react-single/Card'
import { removeHtmlFrom } from '../../utils/Utils'
import { getImageLinkFromName } from '../../utils/Utils'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'
import moment from 'moment'
const SlotCard = (props) => {

    const formatTitle = (title) => truncate(capitalize(lowerCase(props.slot.name)), { length: 30, omission: '...' })

    return (
        <NavLink to={`slot/${props.slot.id}`}>
            <div className='slot-card-shadow-animation'>
                <Card key={props.slot.id}>
                    <Image src={getImageLinkFromName('slot', props.slot.name, 'medium')} style={{ height: '14rem', objectFit: 'cover' }} />
                    <Card.Content >
                        <Card.Header>{formatTitle(props.slot.name)}</Card.Header>
                        <Card.Meta >
                            <span className='date'>Aggiornato il {moment(props.slot.time).format("DD-MM-YYYY")}</span>
                        </Card.Meta>
                        <Card.Description>{truncate(removeHtmlFrom(props.slot.description), { 'length': 150 })}</Card.Description>
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

export default SlotCard;