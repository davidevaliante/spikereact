import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react-single/Grid'
import {Responsive} from 'semantic-ui-react-single/Responsive'
import {getProducerList} from "../../firebase/get";
import AdminNavbar from "../../admin/AdminNavbar";
import {ADMINPAGES, RESPONSIVE_RESOLUTION} from "../../enums/Constants";
import AdminProducerCard from "./AdminProducerCard";
import {Header} from "semantic-ui-react-single/Header";
import {Icon} from "semantic-ui-react-single/Icon";
import {Dimmer} from "semantic-ui-react-single/Dimmer";
import delay from 'lodash/delay';
import orderBy from 'lodash/orderBy'

function mapStateToProps(state) {
    return {};
}

class ProducerDashboard extends Component {

    state = {
        active: false
    };

    onListFetched = (rawList) => {
        let list = []
        for (const key in rawList) {
            const item = rawList[key];
            item['id'] = key
            list.push(item)
        }
        
        list = orderBy(list, ['name'], ['asc'])

        this.setState({
            producerList: list
        })
    };

    onProducerDeleted = (id) => {
        this.setState({ active: true })
        delay(() => {
            this.setState({ active: false })
        }, 1000);
        // TODO cercare nello state l'id cancellato ed eliminarlo evitando una chiamata al DB
        getProducerList(this.onListFetched);
    };

    renderItem = () => {
        return this.state.producerList.map((producer) => (producer &&
            <Grid.Column>
                <AdminProducerCard key={producer.id} producer={producer} onDelete={this.onProducerDeleted}/>
            </Grid.Column>))
    };

    componentDidMount() {
        getProducerList(this.onListFetched);
    }

    render() {
        const {producerList, active} = this.state;

        return (
            <div style={{maxWidth: '1920px'}}>
                <Dimmer blurring active={active} page>
                    <Header as='h2' icon inverted>
                        <Icon name='check' />
                        Produttore cancellato con successo
                    </Header>
                </Dimmer>
                <AdminNavbar activeItem={ADMINPAGES.PRODUCER}/>
                <div style={{marginTop: '5rem'}}>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={4} style={{padding: '2rem'}}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM} maxWidth={RESPONSIVE_RESOLUTION.LARGE}>
                        <Grid stackable columns={3} style={{padding: '2rem'}}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive minWidth={RESPONSIVE_RESOLUTION.SMALL} maxWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                        <Grid stackable columns={2} style={{padding: '2rem'}}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={RESPONSIVE_RESOLUTION.SMALL}>
                        <Grid stackable columns={1} style={{padding: '2rem'}}>
                            {producerList && this.renderItem()}
                        </Grid>
                    </Responsive>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(ProducerDashboard);
