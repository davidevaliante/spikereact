import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { getBonusList } from "../../firebase/firebase";
import AdminBonusCard from "./AdminBonusCard";
import AdminNavbar from "../../admin/AdminNavbar";
import { ADMINPAGES } from "../../enums/Constants";
import { setToUpdate } from "../../reducers/ToUpdateReducer";

function mapStateToProps(state) {
    return {
        toUpdate: state.toUpdate
    };
}

class BonusDashboard extends Component {
    state = {
        slotList: {}
    };


    componentDidMount() {
        getBonusList(this.onBonusListFetched);
    }

    componentWillMount() {
    }

    onBonusListFetched = (bonusList) => {
        let list = []
        for (const key in bonusList) {
            const bonus = bonusList[key];
            bonus['id'] = key
            list.push(bonus)
        }

        this.setState({
            bonusList: list
        })
    }


    renderSlot = () => {
        return this.state.bonusList.map((bonus) => (bonus &&
            <Grid.Column><AdminBonusCard bonus={bonus} key={bonus.id} /></Grid.Column>))
    };

    render() {
        const { bonusList } = this.state
        return (
            <Responsive>
                <AdminNavbar activeItem={ADMINPAGES.ADMIN} />
                <Grid stackable columns={4} style={{ padding: '2rem' }}>
                    {bonusList && this.renderSlot()}
                </Grid>
            </Responsive>
        );
    }
}

export default connect(mapStateToProps)(BonusDashboard);
