import React, {Component} from 'react';
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import {Loader} from "semantic-ui-react-single/Loader";

export const InfoDimmer = (props) => {
    // props.icon = error || check
    return (
        <Dimmer blurring active={props.active} page>
            <Header as='h2' icon inverted>
                <Icon name={props.icon}/>
                {props.text}
            </Header>
        </Dimmer>
    )
};

export const LoadingDimmer = (props) => {
    return (
        <Dimmer blurring active={props.active} page>
            <Header as='h2' icon inverted>
                <Loader />
            </Header>
        </Dimmer>
    )
};