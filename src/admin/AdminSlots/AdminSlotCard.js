import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Icon, Image, Button, Divider, List} from "semantic-ui-react";
import _ from "lodash";

function mapStateToProps(state) {
    return {};
}

const AdminSlotCard = (props) => {

    return (
        <div>
            <List divided relaxed='very'>
                <List.Item key={props.slot.id} style={{border: '1px solid rgb(0, 0, 0, .2)', borderRadius: '0.3rem', padding:'0.3rem'}}>
                    {/*<Image className='ui list item middle aligned' src={props.slot.image} size='mini'/>*/}
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='p'>{props.slot.name}</List.Header>
                        <List.Description as='p'>
                            {props.slot.producer.name}
                            <Divider/>
                            {_.truncate(props.slot.description, { 'length': 100 })}
                            <Divider/>
                            <Icon name='star' />
                            {props.slot.rating}
                        </List.Description>
                        <Divider/>
                        <Button icon labelPosition='left' size='mini'>
                            <Icon name='edit outline' />Edit
                        </Button>
                        <Button icon labelPosition='left' size='mini' floated='right' negative>
                            <Icon name='delete' />Delete
                        </Button>
                    </List.Content>
                </List.Item>
            </List>
        </div>
    );
}

export default connect(
    mapStateToProps,
)(AdminSlotCard);