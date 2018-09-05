import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react-single/Button'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Divider } from 'semantic-ui-react-single/Divider'
import { Grid } from 'semantic-ui-react-single/Grid'
import { List } from 'semantic-ui-react-single/List'
import { Image } from 'semantic-ui-react-single/Image'

import truncate from "lodash/truncate";
import {deleteBonusWithId} from "../../firebase/firebase";
import { setToUpdate } from "../../reducers/ToUpdateReducer";

function mapStateToProps(state) {
    return {
        toUpdate: state.toUpdate
    };
}

class AdminBonusCard extends Component {


    deleteBonus = (id) => {
        deleteBonusWithId(id,
            () => {
                console.log('AdminBonusCard::deleteBonus', id, this.props)
                this.props.dispatch(setToUpdate())
            })
    };

    render() {
        return (
            <div>
                <List divided relaxed='very'>
                    <List.Item key={this.props.bonus.id} style={{
                        border: '1px solid rgb(0, 0, 0, .2)',
                        borderRadius: '0.3rem',
                        padding: '0.3rem'
                    }}>
                        {/*<Image className='icon slot-card-image' src={this.props.slot.image} size='mini'/>*/}
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='p'>{this.props.bonus.name}</List.Header>
                            <List.Description as='p'>
                                {this.props.bonus.producer.name}
                                <Divider />
                                {truncate(this.props.bonus.review, { 'length': 175 })}
                                <Divider />
                                <div className='crop' >
                                    <Image src={this.props.bonus.image} />
                                </div>
                                <Divider />
                                <Icon name='star' />
                                {this.props.bonus.rating}
                            </List.Description>
                            <Divider />
                            <Grid stackable columns={1}>
                                <Grid.Column>
                                    <Button icon labelPosition='left' size='mini'>
                                        <Icon name='edit outline' />Modifica
                                    </Button>
                                    <Button icon labelPosition='left' size='mini' floated='right' negative
                                        onClick={() => this.deleteBonus(this.props.bonus.id)}>
                                        <Icon name='delete' />Cancella
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

export default connect(mapStateToProps)(AdminBonusCard);