import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddSlot from "./AddSlot";
import AdminNavbar from "./AdminNavbar";
import AddArticle from "./AddArticle";
import {ADMINPAGES} from "../enums/Constants";


class AdminDashboard extends Component {
    state = {};

    handleClick = (childComponent) => {
        console.log("childComponent:",childComponent)
        console.log(React.findDOMNode(this.refs.theChild))
    };

    render() {
        console.log(this.props.match.path);
        return (
            <div>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN}/>
                <AddArticle style={{display: 'hidden'}}/>
                "Im Admin DashBoard component"
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps,)(AdminDashboard);
