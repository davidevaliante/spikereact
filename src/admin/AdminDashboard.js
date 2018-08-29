import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';
import AddSlot from "./AdminSlots/AddSlot";
import AdminNavbar from "./AdminNavbar";
import AddArticle from "./AddArticle";
import { ADMINPAGES } from "../enums/Constants";
import { Responsive } from "semantic-ui-react";
import AddTipsList from './AdminSlots/AddTipsList'


class AdminDashboard extends Component {
    state = {};

    handleClick = (childComponent) => {
        console.log("childComponent:", childComponent)
        console.log(ReactDOM.findDOMNode(this.refs.theChild))
    };

    render() {
        console.log(this.props.match.path);
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN} />
                ESEMPIO SU COME UTILIZZARE NUOVO COMPONENT
                <AddTipsList />
            </Responsive>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AdminDashboard);
