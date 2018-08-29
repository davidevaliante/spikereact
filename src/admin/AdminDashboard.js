import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddSlot from "./AdminSlots/AddSlot";
import AdminNavbar from "./AdminNavbar";
import AddArticle from "./AddArticle";
import {ADMINPAGES} from "../enums/Constants";
import {Responsive} from "semantic-ui-react";
import Header from "../components/Header";
import SlotDashboard from "./AdminSlots/SlotDashboard";


class AdminDashboard extends Component {
    state = {};

    handleClick = (childComponent) => {
        console.log("childComponent:",childComponent)
        console.log(React.findDOMNode(this.refs.theChild))
    };

    render() {
        console.log(this.props.match.path);
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN}/>
                "Im Admin DashBoard component"
            </Responsive>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps,)(AdminDashboard);
