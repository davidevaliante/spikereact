import React, { Component } from 'react'
import PropTypes from 'prop-types'
// semantic
import { Menu } from 'semantic-ui-react-single/Menu'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Container } from 'semantic-ui-react-single/Container'
import { Responsive } from 'semantic-ui-react-single/Responsive'
// components
import NavbarSearchBar from './NavbarSearchBar'
import ProducersDropdown from './ProducersDropdown'
// router e redux
import { NavLink } from 'react-router-dom'
import { PAGES, ROUTE } from '../../enums/Constants'
import { setHomePage, setBarPage, setGratisPage, setProducerPage, setArticlePage } from '../../reducers/CurrentPageReducer'
import { connect } from 'react-redux'
// static files
import logo from '../../static/slot-icon.svg';


class Navbar extends Component {

    state = {}
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })


    updateCurrentPage = (page) => {
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
                this.props.dispatch(setProducerPage(this.props.match.params.name));
                break;
            default:
                // document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
        }
    }


    responsivMobile = () => {
        return (
            <div>
                <Menu vertical>
                    <Menu.Item
                        className='navbarItemOne'
                        onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                        active={this.props.displaying === PAGES.HOME}>
                        <NavLink id='home-nav-link' to='/'>Home</NavLink>
                    </Menu.Item>

                    <Menu.Item
                        onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                        active={this.props.displaying === PAGES.SLOT_GRATIS}>
                        <NavLink id='gratis-nav-link' to={ROUTE.SLOT_GRATIS}>Slot Gratis</NavLink>
                    </Menu.Item>

                    <Menu.Item
                        onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                        active={this.props.displaying === PAGES.SLOT_BAR}>
                        <NavLink id='bar-nav-link' to={ROUTE.SLOT_BAR}>Slot da bar</NavLink>
                    </Menu.Item>

                    <Menu.Item
                        as="a"
                        active={this.props.displaying === PAGES.PRODUCER}>
                        <ProducersDropdown />
                    </Menu.Item>
                    <Menu.Item
                        as='a'
                        onClick={(event, data) => this.updateCurrentPage(PAGES.ARTICLE)}
                        active={this.props.displaying === PAGES.ARTICLE}>
                        <NavLink id='article-nav-link' to={ROUTE.ARTICLE}>Articoli</NavLink>
                    </Menu.Item>

                    <Menu.Item  >
                        <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                    </Menu.Item>
                </Menu>
            </div>
        )
    }


    responsivMobile2 = () => {
        return (
            <div>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}>
                    <div>
                        <Menu
                            stackable
                            style={!this.state.fixed ? { position: 'absolute', zIndex: 99, width: '100%' } : { zIndex: 99 }}
                            fixed={this.state.fixed ? 'top' : null}
                            inverted={!this.props.fixColor && !this.state.fixed}
                            secondary={!this.props.fixColor && !this.state.fixed}
                            size='large'>

                            <Container>
                                <Menu.Item style={{ visibility: this.state.fixed ? 'visible' : 'hidden' }} >
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
                                    as="a" >
                                    <ProducersDropdown />
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
                            </Container>
                        </Menu>
                    </div>
                </Visibility>
            </div>
        )
    }

    render() {
        console.log('STATE', this.state)
        console.log('PROPS', this.props)
        return (
            <div>
                {this.props.isResponsive ? this.responsivMobile() : this.responsivMobile2()}
            </div>
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