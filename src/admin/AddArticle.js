import React, { Component } from 'react'
import AddRow from './AddRow'
import { Divider, Icon, Dropdown, Input } from 'semantic-ui-react'
import _ from 'lodash'

class AddArticle extends Component {

    TextComponentRenderer = ({ position, content }) => {
        return (
            <div className='row-container'>
                <h2
                    style={{ width: '100%' }}
                    fluid
                    placeholder={`Inserisci riga numero ${position}`}>{content}</h2>
                <Icon color='red' name='delete' onClick={(event) => this.handleDelete(position)} />
            </div>
        );
    }

    state = {
        rows: [

        ]
    }

    handleDelete = positionToRemove => {
        console.log(`removing ${positionToRemove}`);

        this.setState(prevState => ({ rows: _.filter(prevState.rows, (value, index, collection) => index !== positionToRemove) }))
    }

    setContentToPosition = (toPosition, newContent) => {
        this.setState(prevState => (
            {
                rows: prevState.rows.map((row, position) => {
                    if (position === toPosition) {
                        row['content'] = newContent
                        return row
                    } else {
                        return row
                    }
                })
            }
        )
        )
    }

    onKeyDown = (event) => {
        if (event.key === 'Enter' && document.getElementById('input').value.trim()) {
            const objectToAdd = {
                type: 'text',
                editable: true,
                content: document.getElementById('input').value.trim()
            }
            this.setState(prevState => ({ rows: [...prevState.rows, objectToAdd] }))
            document.getElementById('input').value = ''
        }
    }


    rowsRenderer = () => {
        return this.state.rows.map((row, position) => {
            switch (row.type) {
                case 'text':
                    return <this.TextComponentRenderer position={position} content={this.state.rows[position].content} />

                default:
                    return <Input
                        id='input'
                        onKeyDown={this.onKeyDown}
                        style={{ width: '100%' }}
                        fluid
                        value={this.state.rows[position].content}
                        placeholder='Inserisci' />
            }
        })
    }

    render() {
        console.log(this.state);


        return (
            <div className='main-column'>
                {this.rowsRenderer()}
                <Input
                    id='input'
                    onKeyDown={this.onKeyDown}
                    style={{ width: '100%' }}
                    fluid
                    placeholder='Inserisci' />
            </div>
        )
    }
}

export default AddArticle