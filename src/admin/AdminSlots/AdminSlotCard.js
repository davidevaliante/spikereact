import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Grid, Icon, List} from "semantic-ui-react";
import _ from "lodash";
import {deleteSlotWithId} from "../../firebase/firebase";
import {setToUpdate} from "../../reducers/ToUpdateReducer";

function mapStateToProps(state) {
    return {
        toUpdate: state.toUpdate
    };
}

class AdminSlotCard extends Component {


    deleteSlot = (id) => {
        deleteSlotWithId(id,
            () => {
                console.log('AdminSlotCard::deleteSlot', id, this.props)
                this.props.dispatch(setToUpdate())
            })
    };

    render() {
        return (
            <div>
                <List divided relaxed='very'>
                    <List.Item key={this.props.slot.id} style={{
                        border: '1px solid rgb(0, 0, 0, .2)',
                        borderRadius: '0.3rem',
                        padding: '0.3rem'
                    }}>
                        {/*<Image className='ui list item middle aligned' src={this.props.slot.image} size='mini'/>*/}
                        <List.Icon name='github' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header as='p'>{this.props.slot.name}</List.Header>
                            <List.Description as='p'>
                                {this.props.slot.producer.name}
                                <Divider/>
                                {_.truncate(this.props.slot.description, {'length': 100})}
                                <Divider/>
                                <Icon name='star'/>
                                {this.props.slot.rating}
                            </List.Description>
                            <Divider/>
                            <Grid stackable columns={1}>
                                <Grid.Column>
                                    <Button icon labelPosition='left' size='mini'>
                                        <Icon name='edit outline'/>Modifica
                                    </Button>
                                    <Button icon labelPosition='left' size='mini' floated='right' negative
                                            onClick={() => this.deleteSlot(this.props.slot.id)}>
                                        <Icon name='delete'/>Cancella
                                    </Button>
                                </Grid.Column>
                            </Grid>

                        </List.Content>
                    </List.Item>
                </List>
            </div>
        )
    };
}

export default connect(mapStateToProps,)(AdminSlotCard);