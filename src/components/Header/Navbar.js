import React, { Component } from 'react'
import PropTypes from 'prop-types'
// semantic
import { Menu } from 'semantic-ui-react-single/Menu'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// components
import NavbarSearchBar from './NavbarSearchBar'
import ProducersDropdown from './ProducersDropdown'
// router e redux
import { NavLink } from 'react-router-dom'
import { PAGES, ROUTE, RESPONSIVE_RESOLUTION } from '../../enums/Constants'
import {
    setHomePage,
    setBarPage,
    setGratisPage,
    setProducerPage,
    setArticlePage
} from '../../reducers/CurrentPageReducer'
import { connect } from 'react-redux'
// static files
import logo from '../../static/slot-icon.svg';
// utils
import { smoothScrollTo } from '../../utils/Utils';
import { slide as BurgerMenu } from 'react-burger-menu'


class Navbar extends Component {

    state = {
        menuOpen: false,
        producerDropdownOpen: false
    }

    burgerStyles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '30px',
            height: '24px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#eb2613'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenu: {
            //background: '#373a47',
            background: '#fff',
            paddingTop: '3rem',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
        },
        bmItem: {

        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        },
        bmMenuWrap: {
            width: '100%'
        }
    }

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })


    updateCurrentPage = (page, producerName) => {
        this.setState({
            menuOpen: false
        })
        switch (page) {
            case PAGES.HOME:
                document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
                break;
            case PAGES.SLOT_BAR:
                document.getElementById('bar-nav-link').click()
                this.props.dispatch(setBarPage())
                break;
            case PAGES.SLOT_GRATIS:
                document.getElementById('gratis-nav-link').click()
                this.props.dispatch(setGratisPage())
                break;
            case PAGES.ARTICLE:
                document.getElementById('article-nav-link').click()
                this.props.dispatch(setArticlePage())
                break;
            case PAGES.PRODUCER:
                this.props.dispatch(setProducerPage(producerName));
                break;
            default:
                // document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
        }
        if (document.getElementById('descriptionBanner'))
            smoothScrollTo('descriptionBanner')
    }

    render() {
        return (
            <div>
                {/* BURGER MENU */}
                <Responsive maxWidth={RESPONSIVE_RESOLUTION.MEDIUM - 1}>
                    <BurgerMenu isOpen={this.state.menuOpen} styles={this.burgerStyles} >
                        <Menu
                            stackable
                            size='large'>
                            <Menu.Item
                                as='a'
                                className='navbarItemOne'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                                active={this.props.displaying === PAGES.HOME}>
                                <NavLink id='home-nav-link' to='/'>Home</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                                active={this.props.displaying === PAGES.SLOT_GRATIS}>
                                <NavLink id='gratis-nav-link' to={ROUTE.SLOT_GRATIS}>Slot Gratis</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                                active={this.props.displaying === PAGES.SLOT_BAR}>
                                <NavLink id='bar-nav-link' to={ROUTE.SLOT_BAR}>Slot da bar</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as="a">
                                <ProducersDropdown callback={this.updateCurrentPage}/>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.ARTICLE)}
                                active={this.props.displaying === PAGES.ARTICLE}>
                                <NavLink id='article-nav-link' to={ROUTE.ARTICLE}>Articoli</NavLink>
                            </Menu.Item>

                            <Menu.Item borderless position='right'>
                                <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                            </Menu.Item>
                        </Menu>
                    </BurgerMenu>
                </Responsive>

                {/* ORIZONTAL MENU */}
                <Responsive minWidth={RESPONSIVE_RESOLUTION.MEDIUM}>
                    <Visibility
                        once={false}
                        onBottomPassed={this.showFixedMenu}
                        onBottomPassedReverse={this.hideFixedMenu}>
                        <Menu
                            style={{ zIndex: 99, paddingRight: '12rem'}}
                            fixed='top'
                            inverted={!this.state.fixed}
                            secondary={!this.state.fixed}
                            size='large'>
                            <Menu.Item style={{ visibility: this.state.fixed ? 'visible' : 'hidden' }}>
                                <img src={logo} alt='spike-logo' />
                            </Menu.Item>
                            <Menu.Item
                                as='a'
                                className='navbarItemOne'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                                active={this.props.displaying === PAGES.HOME}>
                                <NavLink id='home-nav-link' to='/'>Home</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                                active={this.props.displaying === PAGES.SLOT_GRATIS}>
                                <NavLink id='gratis-nav-link' to={ROUTE.SLOT_GRATIS}>Slot Gratis</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                                active={this.props.displaying === PAGES.SLOT_BAR}>
                                <NavLink id='bar-nav-link' to={ROUTE.SLOT_BAR}>Slot da bar</NavLink>
                            </Menu.Item>

                            <Menu.Item
                                as="a"
                            >
                                <ProducersDropdown callback={this.updateCurrentPage}/>
                            </Menu.Item>
                            <Menu.Item
                                as='a'
                                onClick={(event, data) => this.updateCurrentPage(PAGES.ARTICLE)}
                                active={this.props.displaying === PAGES.ARTICLE}>
                                <NavLink id='article-nav-link' to={ROUTE.ARTICLE}>Articoli</NavLink>
                            </Menu.Item>

                            <Menu.Item borderless position='right'>
                                <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId}/>
                            </Menu.Item>
                        </Menu >
                    </Visibility >
                </Responsive >
            </div >
        )
    }
}

Navbar.propTypes = {
    fixed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    displaying: state.displaying,
    fixed: state.menuFixed
})
export default connect(mapStateToProps)(Navbar);