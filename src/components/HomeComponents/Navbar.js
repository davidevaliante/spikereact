import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Container,
    Menu
} from 'semantic-ui-react'
import NavbarSearchBar from './NavbarSearchBar';
import { PAGES } from '../../enums/Constants';
import { setHomePage, setBarPage, setOnlinePage, setGratisPage } from '../../reducers/CurrentPageReducer';



const Navbar = (props) => {

    const updateCurrentPage = (page) => {
        switch (page) {
            case PAGES.HOME:
                props.dispatch(setHomePage())
                break;
            case PAGES.SLOT_BAR:
                props.dispatch(setBarPage())
                break;
            case PAGES.SLOT_ONLINE:
                props.dispatch(setOnlinePage())
                break;
            case PAGES.SLOT_GRATIS:
                props.dispatch(setGratisPage())
                break;
            default:
                props.dispatch(setHomePage())
        }
    }

    return (
        <Menu
            style={{ zIndex: 999 }}
            color={props.fixed ? 'red' : undefined}
            fixed={props.fixed ? 'top' : null}
            inverted={!props.fixed}
            pointing={!props.fixed}
            secondary={!props.fixed}
            size='large'>
            <Container>

                <Menu.Item style={{ visibility: props.fixed ? 'visible' : 'hidden' }} >
                    <img src='https://react.semantic-ui.com/logo.png' alt='spike-logo' />
                </Menu.Item>

                <Menu.Item
                    as='a'
                    className='navbarItemOne'
                    onClick={(event, data) => updateCurrentPage(PAGES.HOME)}
                    active={props.currentPage === PAGES.HOME}>
                    Home
                </Menu.Item>

                <Menu.Item
                    as='a'
                    onClick={(event, data) => updateCurrentPage(PAGES.SLOT_ONLINE)}
                    active={props.currentPage === PAGES.SLOT_ONLINE}>
                    Slot Online
                </Menu.Item>

                <Menu.Item
                    as='a'
                    onClick={(event, data) => updateCurrentPage(PAGES.SLOT_GRATIS)}
                    active={props.currentPage === PAGES.SLOT_GRATIS}>
                    Slot Gratis
                </Menu.Item>

                <Menu.Item
                    as='a'
                    onClick={(event, data) => updateCurrentPage(PAGES.SLOT_BAR)}
                    active={props.currentPage === PAGES.SLOT_BAR}>
                    Slot da bar
                </Menu.Item>

                <Menu.Item position='right' style={{ marginRight: '4rem' }}>
                    <NavbarSearchBar />
                </Menu.Item>

            </Container>
        </Menu>
    )
}

Navbar.propTypes = {
    fixed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    currentPage: state.currentPage,
    // fixed: state.navbarIsShowing
})
export default connect(mapStateToProps)(Navbar);