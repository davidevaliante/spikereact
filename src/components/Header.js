import React, { Component } from 'react'
import {
    Segment,
    Visibility,
    Button, Icon
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getSlotWithId } from '../firebase/firebase'
import { setUserPlaying } from '.././reducers/PlayModeReducer'


import Navbar from './HomeComponents/Navbar'
import LazyLoad from 'react-lazyload';
import ShortHandMenu from './SlotPageComponents/ShortHandMenu'
import Responsability from "./Resposability";
class Header extends Component {

    state = {
        displaying: 'HOME',
    }

    styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            height: '100vh',
        }
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })



    homePageHeader = (fixed) => (
        <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}>
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 700, padding: 0 }}
                vertical>
                <LazyLoad height={'100vh'}>
                    <header style={{ backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/spike-2481d.appspot.com/o/Mix%2Fslot-header-img-min-min.jpg?alt=media&token=6648de0a-3cd6-402f-9ada-a961cf893c2a')` }}>
                        <div style={this.styles.overlay}>
                            <Navbar fixed={fixed} displaying={this.props.displaying} />
                            <div className='hero-text-box'>
                                <h1 className='header-spike-text' style={{ fontSize: '600%' }}>Spike Slot</h1>
                                <h1 className='slideRight'>Vinci soldi veri<br></br>I migliori consigli per vincere con le slot machine sul web.</h1>
                            </div>
                        </div>
                    </header>
                </LazyLoad>
            </Segment>
            <Responsability/>
        </Visibility>
    )

    slotPageHeader = (fixed, slot) => {

        const name = slot ? slot.name : undefined
        const producer = (slot && slot.producer) && slot.producer.name
        const image = slot ? slot.image : undefined

        return (

            <Visibility
                once={false}
                onBottomPassed={this.showFixedMenu}
                onBottomPassedReverse={this.hideFixedMenu}>
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 700, padding: 0 }}
                    vertical>
                    <LazyLoad height={'100vh'}>
                        <header
                            style={{ backgroundImage: `url(${image})` }}>
                            <div
                                style={this.styles.overlay}>
                                <Navbar fixed={fixed} displaying={this.props.displaying} slotId={this.props.slotId} />
                                <div className='description-alignment'>
                                    <div className='align-center'>
                                        <h1 className='header-spike-text'>{name}</h1>
                                        <h1 className='slideRight'>{producer}</h1>
                                        <ShortHandMenu />
                                        <div style={{marginTop:'3rem'}}>
                                            <Button animated size= 'huge' color='white' onClick={() => this.props.dispatch(setUserPlaying())}>
                                                <Button.Content visible>Provala Subito !</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='gamepad' />
                                                </Button.Content>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </LazyLoad>
                </Segment>
                <Responsability/>
            </Visibility>
        )
    }


    render() {
        const { fixed } = this.state
        const { displaying } = this.props
        const slot = this.props.currentSlot
        const producer = this.props.producer

        const slotId = this.props.slotId



        switch (displaying) {
            case 'HOME':
                return this.homePageHeader(fixed)
            case 'SLOT':
                return this.slotPageHeader(fixed, slot)
            default:
                return this.homePageHeader(fixed)
        }
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    slotList: state.slotList,
    bonusList: state.bonusList,
    producerList: state.producerList,
    currentSlot: state.currentSlot,
})

export default connect(mapStateToProps)(Header)

