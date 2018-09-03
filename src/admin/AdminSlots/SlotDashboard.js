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
    state = {
        slotList: {}
    };
    list = [];
    r = 1;

    componentDidMount() {
        getSlotList(this.onSlotListFetched);
    }

    componentWillMount() {
    }

    onSlotListFetched = (slotList) => {
        this.list = []
        for (const key in slotList) {
            const slot = slotList[key];
            slot['id'] = key
            this.list.push(slot)
            // this.list[key] = slot
        }

        this.setState({
            // ...this.state,
            slotList: this.list
        })
        // console.log('onSlotListFetched', this.list)
        // store.dispatch(addSlotList(this.list))
    }

    updateSlotList = () => {
        if (this.props.toUpdate) {
            //do shit
            console.log('Aggiornare slot list', this.state.slotList, this.list)
            getSlotList(this.onSlotListFetched);
            this.props.dispatch(setToUpdate())
        }
    }

    renderSlot = () => {
        return this.list.map((slot) => (slot &&
            <Grid.Column><AdminSlotCard slot={slot} key={slot.id} /></Grid.Column>))
    };

    render() {
        console.log('rendered #', this.r++);
        console.log('render::', this.state.slotList, this.list);
        this.updateSlotList();
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN} />
                <Grid stackable columns={4} style={{ padding: '2rem' }}>
                    {this.renderSlot()}
                </Grid>
            </Responsive>
        );
    }
}

export default connect(mapStateToProps)(SlotDashboard);
