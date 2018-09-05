import React, { Component } from 'react'

// components
import { Segment } from 'semantic-ui-react-single/Segment'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import Navbar from './Navbar'
import LazyLoad from 'react-lazyload';
import ShortHandMenu from '../SlotPageComponents/ShortHandMenu'
import AamsBanner from "../AamsBanner";
import AboutPageHeader from './AboutPageHeader'
import HomePageHeader from './HomePageHeader'

// misc
import { connect } from 'react-redux'
import { setAboutPage, setHomePage, setSlotPage } from '../../reducers/CurrentPageReducer'


class Header extends Component {

    state = {
        displaying: 'HOME',
        loop: true,
        isLoading: false
    }


    styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            height: '100vh',
        }
    }


    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    slotPageHeader = (fixed, slot) => {
        this.props.dispatch(setSlotPage())
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
                            id='slotHeader'
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
            </Visibility >
        )
    }


    render() {
        const { fixed } = this.state
        const { displaying } = this.props
        const { currentSlot } = this.props

        /*    if(displaying==='HOME') return <HomePageHeader />
           if(displaying==='ABOUT') return <AboutPageHeader /> */

        switch (displaying) {
            case 'HOME':
                this.props.dispatch(setHomePage())
                return <HomePageHeader
                    fixmenu={fixed}
                    showFixedMenu={this.showFixedMenu}
                    hideFixedMenu={this.hideFixedMenu}
                    displaying={displaying}
                />
            case 'SLOT':
                return this.slotPageHeader(fixed, currentSlot)
            case 'ABOUT':
                this.props.dispatch(setAboutPage())
                return <AboutPageHeader
                    fixmenu={fixed}
                    showFixedMenu={this.showFixedMenu}
                    hideFixedMenu={this.hideFixedMenu}
                    displaying={displaying}
                />
            default:
                return <HomePageHeader
                    fixmenu={fixed}
                    showFixedMenu={this.showFixedMenu}
                    hideFixedMenu={this.hideFixedMenu}
                    displaying={displaying}
                />
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

