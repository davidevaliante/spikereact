import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, Visibility} from 'semantic-ui-react'
import {PAGES} from '../../enums/Constants'

class ListDescriptionBanner extends Component {

    state = {
        bottomPassed: false,
        stateDisplaying: PAGES.HOME
    }

    fireAnimation = () => {
        console.log('firing');
        !this.state.bottomPassed && this.setState({ bottomPassed: true })
    }



    renderHeader = () => {
        let text = ''
        switch (this.props.displaying) {
            case PAGES.HOME:
                text = 'Le Slot del giorno'
                break
            case PAGES.SLOT_GRATIS:
                text = 'Slot Gratis'
                break
            case PAGES.SLOT_ONLINE:
                text = 'Slot OnLine'
                break
            default:
                text = 'Slot del giorno'
        }
        return (
            <div style={{ marginBottom: '3rem' }}>
                <div className='black-line scale-in-hor-left'>
                </div>
                <Header
                    as='p'
                    className="tracking-in-contract"
                    style={{ color: '#424242', fontSize: '2em', textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                    {text}
                </Header>
                <div className='black-line scale-in-hor-right'>
                </div>
            </div>
        )
    }

    render() {

        if (this.state.stateDisplaying !== this.props.displaying) {
            this.setState({ stateDisplaying: this.props.displaying })
        }

        return (
            <Visibility
                once={this.state.stateDisplaying === this.props.displaying}
                onBottomVisible={this.fireAnimation}>
                {this.state.bottomPassed ? this.renderHeader() : <div></div>}
            </Visibility>

        )
    }

}

const mapStateToProps = (state) => ({
    displaying: state.displaying
})

export default connect(mapStateToProps)(ListDescriptionBanner)