import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react-single/Grid'
import {Responsive} from 'semantic-ui-react-single/Responsive'
import {getBonusList, getSlotList} from "../../firebase/get";
import AdminBonusCard from "./AdminBonusCard";
import AdminNavbar from "../../admin/AdminNavbar";
import {ADMINPAGES, RESPONSIVE_RESOLUTION} from "../../enums/Constants";
import delay from 'lodash/delay';
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";

function mapStateToProps(state) {
    return {};
}

class BonusDashboard extends Component {

    state = {
        active: false
    };

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
    };

    onBonusDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getBonusList(this.onBonusListFetched);
    };

    renderItem = () => {
        return this.state.bonusList.map((bonus) => (bonus &&
            <Grid.Column>
                <AdminBonusCard key={bonus.id} bonus={bonus} onDelete={this.onBonusDeleted}/>
            </Grid.Column>))
    };

    componentDidMount() {
        getBonusList(this.onBonusListFetched);
    };

    render() {
        const {bonusList, active} = this.state
        return (
            <div style={{maxWidth: '1920px'}}>
                <Dimmer blurring active={active} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Bonus cancellato con successo
                    </Header>
                </Dimmer>
                <AdminNavbar activeItem={ADMINPAGES.BONUS}/>
                <div style={{marginTop: '5rem'}}>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={4} style={{padding: '2rem'}}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={3} style={{padding: '2rem'}}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                        <Grid stackable columns={2} style={{padding: '2rem'}}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                        <Grid stackable columns={1} style={{padding: '2rem'}}>
                            {bonusList && this.renderItem()}
                        </Grid>
                    </Responsive>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(BonusDashboard);
