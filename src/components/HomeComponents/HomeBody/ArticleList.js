import React, { Component } from 'react';
import { getExtraList } from "../../../firebase/get"
import { Grid } from 'semantic-ui-react-single/Grid'
import { Responsive } from 'semantic-ui-react-single/Responsive'
import { Header } from "semantic-ui-react-single/Header";
import { Icon } from "semantic-ui-react-single/Icon";
import { Dimmer } from "semantic-ui-react-single/Dimmer";
import delay from 'lodash/delay';
import orderBy from 'lodash/orderBy';
import truncate from 'lodash/truncate'
import filter from 'lodash/filter'
import { Item } from 'semantic-ui-react-single/Item'
import ArticleCard from '../../../components/Cards/ArticleCard'

class ArticleList extends Component {

    state = {
        active: false,
        loadingDimmer: true
    };

    onListFetched = (rawList) => {
        let list = []
        for (const key in rawList) {
            const item = rawList[key];
            item['id'] = key
            list.push(item)
        }

        list = orderBy(list, ['time'], ['desc'])

        this.setState({
            extraList: list,

        })
    };


    componentDidMount() {
        getExtraList(this.onListFetched);
    }
    renderItem = () => {
        return this.state.extraList.map((current) =>
            <ArticleCard inAdmin={false} item={current} onItemDeleted={this.onItemDeleted} />
        )
    };





    render() {
        const { extraList } = this.state
        console.log(this.state);

        return (
            <div>
                <Item.Group>
                    {extraList && this.renderItem()}
                </Item.Group>
            </div>

            /*  <Grid centered>
                 <Grid.Row style={{ paddingBottom: '4rem' }} centered>
 
                 </Grid.Row>
             </Grid>
  */

        );
    }
}

export default ArticleList;

/* 
    // di base renderizza props.maxSlot elementi ma scrollando ne deve carica altre 
    const slotListToRows = (slotList) => {
        let listOfSlots = []
        for (const key in slotList) {
            const element = slotList[key]
            element['id'] = key
            listOfSlots.push(element)
        }

       

        return listOfSlots.map((element) => {
            return <SlotCard slot={element} key={element.id} />
        })
    }

    const loadMoreSlots = (listOfSlots) => {
        loadNextChunk(12, last(listOfSlots).time)
    }

    return (
        <Grid style={{ marginTop: '0rem' }} celled='internally' stackable className='row-centered-spaced'>
            <Grid.Row style={{ padding: '1rem' }} centered>
                {props.type === 'GRATIS' && slotListToRows}
                {props.slotList && slotListToRows(props.slotList, props.order)}
            </Grid.Row>
        </Grid>
    )
}

ArticleList.propTypes = {
    cardPerRow: PropTypes.number,
    maxSlot: PropTypes.number,
    isFixed: PropTypes.bool
}

const mapStateToProps = (state) => ({
    slotList: state.slotList,
    displaying: state.displaying
})


export const getExtraList = async (callback) => {
    const extraList = await axios.get(`${databaseRoot}/Extra/it.json?orderBy="time"`)
    callback(extraList.data)
}

export default connect(mapStateToProps)(SlotList) */