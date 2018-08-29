import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Responsive} from 'semantic-ui-react'
import {getSlotList} from "../../firebase/firebase";
import AdminSlotCard from "./AdminSlotCard";
import AdminNavbar from "../AdminNavbar";
import {ADMINPAGES} from "../../enums/Constants";

function mapStateToProps(state) {
    return {};
}

class SlotDashboard extends Component {
    state = {
        slotList: {}
    };
    list = [];
    r = 1;

    componentDidMount() {
        getSlotList(this.onSlotListFetched);
    }

    onSlotListFetched = (slotList) => {
        for (const key in slotList) {
            const slot = slotList[key];
            slot['id'] = key
            this.list.push(slot)
            // this.list[key] = slot
        }

        this.setState({
            ...this.state,
            slotList: this.list
        })
        // store.dispatch(addSlotList(this.list))
    }

    componentWillMount(){
    }

    renderSlot() {
        return this.list.map((slot) => (slot && <Grid.Column><AdminSlotCard slot={slot} key={slot.id} /></Grid.Column>))
    }

    render() {
        console.log(this.r++);
        console.log(this.state.slotList, this.list);
        console.log('renderSlot()', this.renderSlot())
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN}/>
                <Grid stackable columns={4} style={{padding: '2rem'}}>
                    {this.renderSlot()}
                </Grid>
            </Responsive>
        );
    }
}

export default connect(
    mapStateToProps,
)(SlotDashboard);