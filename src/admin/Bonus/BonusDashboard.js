import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { getBonusList } from "../../firebase/get";
import AdminBonusCard from "./AdminBonusCard";
import AdminNavbar from "../../admin/AdminNavbar";
import {ADMINPAGES, RESPONSIVE_RESOLUTION} from "../../enums/Constants";
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


    renderItem = () => {
        return this.state.bonusList.map((bonus) => (bonus &&
            <Grid.Column><AdminBonusCard bonus={bonus} key={bonus.id} /></Grid.Column>))
    };

    render() {
        const { bonusList } = this.state
        return (
            <div style={{maxWidth: '1920px'}}>
                <AdminNavbar activeItem={ADMINPAGES.BONUS} />
                <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                    <Grid stackable columns={4} style={{ padding: '2rem' }}>
                        {bonusList && this.renderItem()}
                    </Grid>
                </Responsive>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                    <Grid stackable columns={3} style={{ padding: '2rem' }}>
                        {bonusList && this.renderItem()}
                    </Grid>
                </Responsive>
                <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <Grid stackable columns={2} style={{ padding: '2rem' }}>
                        {bonusList && this.renderItem()}
                    </Grid>
                </Responsive>
                <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                    <Grid stackable columns={1} style={{ padding: '2rem' }}>
                        {bonusList && this.renderItem()}
                    </Grid>
                </Responsive>
            </div>

        );
    }
}

export default connect(mapStateToProps)(BonusDashboard);
