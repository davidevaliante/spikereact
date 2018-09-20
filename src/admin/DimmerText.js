import React, {Component} from 'react';
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";

export const DimmerText = (props) => {
    return (
        <Dimmer blurring active={props.active} page>
            <Header as='h2' icon inverted>
                <Icon name='check'/>
                Produttore cancellato con successo
            </Header>
        </Dimmer>
    )
};
