import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    List,
    Segment,
    Sticky
} from 'semantic-ui-react'
import React, {Component} from 'react'
import ResponsiveContainer from './ResponsiveContainer'
import SlotList from './SlotList'
import BonusList from './BonusList'
import {connect} from 'react-redux';
import {Footer} from "../Footer";
import {ROUTE, SLOT_TYPES} from "../../enums/Constants";


class HomepageLayout extends Component {
    state = {};
    title = '';

    handleContextRef = contextRef => this.setState({contextRef})

    getType(path){
        switch (path) {
            case ROUTE.SLOT_ONLINE:
                this.title = 'Slot Online'
                return SLOT_TYPES.ONLINE;
            case ROUTE.SLOT_BAR:
                this.title = 'Slot da Bar'
                return SLOT_TYPES.BAR;
            case ROUTE.SLOT_GRATIS:
                this.title = 'Slot Gratis'
                return SLOT_TYPES.GRATIS;
            default:
                this.title = 'Le Slot del giorno'
                return undefined
        }
    }

    render() {
        const {contextRef} = this.state
        const type = this.getType(this.props.match.path)
        console.log("STATE", this.props.match.path, "type", type);

        // a quale component mettere  ref={this.handleContextRef} ????

        return (
            <ResponsiveContainer>
                <Segment style={{padding: '8em 0em'}} vertical>
                    <Grid style={{margin: '0rem'}} celled='internally' stackable>
                        <Grid.Row style={{paddingBottom: '4rem'}}>
                            <div ref={this.handleContextRef}>
                                <Grid.Column width={12}>
                                    <Header as='h3' style={{fontSize: '2em'}}>
                                        {this.title}
                                    </Header>
                                    <SlotList cardPerRow={3} maxSlot={9} type={type}/>
                                </Grid.Column>
                            </div>

                            <Grid.Column
                                floated='right'
                                width={4}>
                                <Header as='h3' style={{fontSize: '2em'}}>
                                    I migliori bonus
                                </Header>
                                <Sticky context={contextRef} offset={80}>
                                    <BonusList maxNumber={15}/>
                                </Sticky>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Footer/>
            </ResponsiveContainer>
        )
    }
}


const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    contextRef: state.contextRef
})

export default connect(mapStateToProps)(HomepageLayout)