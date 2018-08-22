import React, { Component } from 'react'
import {
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getSlotWithId } from '../../firebase/firebase'

import Navbar from '../HomeComponents/Navbar'
import LazyLoad from 'react-lazyload';
import Header from '../Header'

class SlotPage extends Component {


    componentDidMount() {


    }


    render() {
        return (
            <div>
                <Header displaying='SLOT' slotId={this.props.match.params.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList
})

export default connect(mapStateToProps)(SlotPage)
