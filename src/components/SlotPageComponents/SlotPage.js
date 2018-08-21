import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getSlotWithId } from '../../firebase/firebase'
class SlotPage extends Component {

    state = {
        slot: {}
    }

    componentDidMount() {

        /* id viene passato dinamicamente da react router e passato nelle props all'interno
           DOCS : https://reacttraining.com/react-router/web/api/Route/route-props
        */
        const { id } = this.props.match.params
        // se redux è accessibile
        if (_.get(this.props.slotList, id)) {
            this.setState({ slot: _.get(this.props.slotList, id) })
            console.log(_.get(this.props.slotList, id));
        }
        // altrimenti carica da firebase
        else {
            /* questa funzione prende l'id della slot come primo argomento ed una funzione come secondo
               argomento (callback). Di solito le metto fuori per chiarezza ma stavolta deve solo chiamare
               setState con i dati scaricati e quindi è inutile
            */
            getSlotWithId(id, (slot) => this.setState({ slot: slot }))
        }

    }

    render() {
        console.log(this.state.slot);
        const { name } = this.state.slot
        return (
            <div>
                {name}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList
})

export default connect(mapStateToProps)(SlotPage)
