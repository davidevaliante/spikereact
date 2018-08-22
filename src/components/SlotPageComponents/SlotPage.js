import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Header from '../Header'
import TipsList from './TipsList'
import TecnicalsList from './TecnicalsList'
import Description from './Description'

class SlotPage extends Component {


    componentDidMount() {


    }


    render() {
        return (
            <div>
                <Header displaying='SLOT' slotId={this.props.match.params.id} />
                <div className='horizontal-center'>
                    <TipsList list={this.props.currentSlot.description}/>
                    <Description text={this.props.currentSlot.description} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    currentSlot: state.currentSlot
})

export default connect(mapStateToProps)(SlotPage)
