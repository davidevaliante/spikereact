import React from 'react'
import { Item } from 'semantic-ui-react'
import truncate from 'lodash/truncate'
import upperFirst from 'lodash/upperFirst'
import { removeHtmlFrom } from '../../utils/Utils'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react-single/Button'
import { deleteExtraWithId } from '../../firebase/delete'
import { ROUTE } from '../../enums/Constants'
import { Card } from 'semantic-ui-react-single/Card'

const ArticleCard = (props) => {

    const formatTitle = () => {
        return props.item.title ? props.item.title : upperFirst(truncate(removeHtmlFrom(props.item.content), { 'length': 30, 'omission': '...' }));
    }

    const formatDescription = () => {
        return upperFirst(truncate(removeHtmlFrom(props.item.content), { 'length': 1000, 'omission': '...' }));
    }

    const formatDate = () => {
        return moment(props.item.time).format("DD-MM-YYYY")
    }

    const goTo = (id) => {
        props.history.push(`/article/${id}`)
    }

    const handleEdit = (id) => {
        props.history.push(`editextra/${id}`)
    }

    const handleDelete = (id) => {
        deleteExtraWithId(id, id => {
            props.onItemDeleted(id)
        })
    }

    const RenderAdmin = () => {
        return (
            <Item>
                <Item.Content>
                    <Item.Header as='a'>
                        {formatTitle()}
                    </Item.Header>
                    <Item.Meta>Pubblicato il {formatDate()}</Item.Meta>
                    <Item.Description className='extra-card-pointer' onClick={() => goTo(props.item.id)}>
                        {formatDescription()}
                    </Item.Description>
                    {props.inAdmin && <Item.Extra>
                        <Button
                            onClick={() => handleEdit(props.item.id)}>
                            Modifica
                    </Button>
                        <Button
                            onClick={() => handleDelete(props.item.id)}>
                            Elimina
                    </Button>
                    </Item.Extra>}
                </Item.Content>
            </Item>
        )

    }
    const RenderHomePage = () => {
        return (<div>
            <div className='slot-card-shadow-animation' onClick={() => goTo(props.item.id)}>
                <Card key={props.item.id}>

                    <Card.Content >
                        <Card.Header>{formatTitle(props.item.title)}</Card.Header>

                        <Card.Description>{truncate(removeHtmlFrom(props.item.content), { 'length': 150 })}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>

                    </Card.Content>
                </Card>
            </div>
        </div>)

    }


    return (
        <div>
            {props.inAdmin === false ? RenderHomePage() : RenderAdmin()}
        </div>

    )
}

export default withRouter(ArticleCard)