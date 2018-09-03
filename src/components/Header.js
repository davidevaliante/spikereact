import React, { Component } from 'react'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Visibility from 'semantic-ui-react/dist/commonjs/behaviors/Visibility'

import { connect } from 'react-redux'
import { setAboutPage } from '../reducers/CurrentPageReducer'

import Navbar from './HomeComponents/Navbar'
import LazyLoad from 'react-lazyload';
import ShortHandMenu from './SlotPageComponents/ShortHandMenu'
import AamsBanner from "./AamsBanner";

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

    aboutPageHeader = (fixed) => {
        this.props.dispatch(setAboutPage())
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
                <AamsBanner />
            </Visibility>
        )
    }


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
            <AamsBanner />
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
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ShortHandMenu />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </LazyLoad>
                </Segment>
                <AamsBanner />
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
            case 'ABOUT':
                return this.aboutPageHeader(fixed)
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

