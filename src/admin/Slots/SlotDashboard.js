import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { getSlotList } from "../../firebase/firebase";
import AdminSlotCard from "./AdminSlotCard";
import AdminNavbar from "../AdminNavbar";
import { ADMINPAGES } from "../../enums/Constants";
import { setToUpdate } from "../../reducers/ToUpdateReducer";

function mapStateToProps(state) {
    return {
        toUpdate: state.toUpdate
    };
}

class SlotDashboard extends Component {

    state = {}
    componentDidMount() {
        getSlotList(this.onSlotListFetched);
    }

    componentWillMount() {
    }

    onSlotListFetched = (slotList) => {
        let list = []
        for (const key in slotList) {
            const slot = slotList[key];
            slot['id'] = key
            list.push(slot)
            // this.list[key] = slot
        }

        this.setState({
            // ...this.state,
            slotList: list
        })
        // console.log('onSlotListFetched', this.list)
        // store.dispatch(addSlotList(this.list))
    }



    renderSlot = () => {
        return this.state.slotList.map((slot) => (slot &&
            <Grid.Column><AdminSlotCard slot={slot} key={slot.id} /></Grid.Column>))
    };

    render() {
        const { slotList } = this.state
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN} />
                <Grid stackable columns={4} style={{ padding: '2rem' }}>
                    {slotList && this.renderSlot()}
                </Grid>
            </Responsive>
        );
    }
}

export default connect(mapStateToProps)(SlotDashboard);
