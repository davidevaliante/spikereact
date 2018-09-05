import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react-single/Menu'
import { Visibility } from 'semantic-ui-react-single/Visibility'
import { Container } from 'semantic-ui-react-single/Container'

import { NavLink } from 'react-router-dom'
import NavbarSearchBar from './NavbarSearchBar';
import { PAGES, ROUTE } from '../../enums/Constants';
import { setHomePage, setBarPage, setGratisPage } from '../../reducers/CurrentPageReducer';
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
            default:
                document.getElementById('home-nav-link').click()
                this.props.dispatch(setHomePage())
        }
    }

    render() {

        return (
            <Visibility
                once={false}
                onBottomPassed={this.showFixedMenu}
                onBottomPassedReverse={this.hideFixedMenu}>
                <Menu
                    style={{ zIndex: 999 }}
                    color={this.state.fixed ? 'red' : undefined}
                    fixed={this.state.fixed ? 'top' : null}
                    inverted={!this.state.fixed}
                    pointing={!this.state.fixed}
                    secondary={!this.state.fixed}
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

                        <Menu.Item position='right' style={{ marginRight: '4rem' }}>
                            <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                        </Menu.Item>

                    </Container>
                </Menu>
            </Visibility>

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