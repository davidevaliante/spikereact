import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Container,
    Menu,
    Visibility,
} from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import NavbarSearchBar from './NavbarSearchBar';
import { PAGES } from '../../enums/Constants';
import { setHomePage, setBarPage, setOnlinePage, setGratisPage } from '../../reducers/CurrentPageReducer';



class Navbar extends Component {
    state = {}
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    updateCurrentPage = (page) => {
        switch (page) {
            case PAGES.HOME:
                this.props.dispatch(setHomePage())
                break;
            case PAGES.SLOT_BAR:
                this.props.dispatch(setBarPage())
                break;
            case PAGES.SLOT_ONLINE:
                this.props.dispatch(setOnlinePage())
                break;
            case PAGES.SLOT_GRATIS:
                this.props.dispatch(setGratisPage())
                break;
            default:
                this.props.dispatch(setHomePage())
        }
    }
    render() {

        console.log(this.props.displaying);
        console.log(this.props.slotId);
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
                            <img src='https://react.semantic-ui.com/logo.png' alt='spike-logo' />
                        </Menu.Item>

                        <Menu.Item
                            as='a'
                            className='navbarItemOne'
                            onClick={(event, data) => this.updateCurrentPage(PAGES.HOME)}
                            active={this.props.displaying === PAGES.HOME}>
                            <NavLink to='/'>Home</NavLink>
                        </Menu.Item>

                        <Menu.Item
                            as='a'
                            onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_ONLINE)}
                            active={this.props.currentPage === PAGES.SLOT_ONLINE}>
                            Slot Online
                        </Menu.Item>

                        <Menu.Item
                            as='a'
                            onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_GRATIS)}
                            active={this.props.currentPage === PAGES.SLOT_GRATIS}>
                            Slot Gratis
                        </Menu.Item>

                        <Menu.Item
                            as='a'
                            onClick={(event, data) => this.updateCurrentPage(PAGES.SLOT_BAR)}
                            active={this.props.currentPage === PAGES.SLOT_BAR}>
                            Slot da bar
                        </Menu.Item>

                        <Menu.Item position='right' style={{ marginRight: '4rem' }}>
                            <NavbarSearchBar displaying={this.props.displaying} slotId={this.props.slotId} />
                        </Menu.Item>

                    </Container>
                </Menu>
                <div style={{ height: '100vh' }}></div>
            </Visibility>
        )
    }
}

Navbar.propTypes = {
    fixed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
})
export default connect(mapStateToProps)(Navbar);