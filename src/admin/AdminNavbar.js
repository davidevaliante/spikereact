import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import {Menu, Dropdown, Icon, Search} from 'semantic-ui-react'
import {ADMINPAGES, ROUTE, SLOT_TYPES} from "../enums/Constants";
import _ from "lodash";
import NavbarSearchBar from "../components/HomeComponents/NavbarSearchBar";

class AdminNavbar extends Component {
    state = {};
    activeItem = ADMINPAGES.ADMIN;

    handleClick = (e, {name}) => {
        console.log("handleClick", e, name);

    };


    render() {
        const activeItem = this.props.activeItem;
        return (
            <div>
                <Menu>
                    <Menu.Item>
                        <NavLink to={ROUTE.ADMIN}><Icon name='cog'/></NavLink>
                    </Menu.Item>

                    <Menu.Item style={{padding: '0rem'}} active={activeItem === ADMINPAGES.ARTICLE}>
                        <Dropdown item simple text='Articoli'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item name={ROUTE.ADDARTICLE} onClick={this.handleClick}>
                                    <NavLink to={ROUTE.ADDARTICLE}><Icon name='add'/> Aggiungi Articolo</NavLink>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                    <Icon name='archive'/> Gestione Articoli
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{padding: '0', margin: '0'}} active={activeItem === ADMINPAGES.SLOT}>
                        <Dropdown item simple text='Slot'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item>
                                    <NavLink to={ROUTE.ADDSLOT}><Icon name='add'/> Aggiungi Slot</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Icon name='game'/> Gestione Slot
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{padding: '0rem'}} active={activeItem === ADMINPAGES.BONUS}>
                        <Dropdown item simple text='Bonus'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item>
                                    <NavLink to={ROUTE.ADDBONUS}><Icon name='add'/> Aggiungi Bonus</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Icon name='plus circle'/> Gestione Bonus
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{padding: '0rem'}} active={activeItem === ADMINPAGES.PRODUCER}>
                        <Dropdown item simple text='Produttori'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item>
                                    <NavLink to={ROUTE.ADDPRODUCER}><Icon name='add'/> Aggiungi Produttore</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Icon name='lab'/> Gestione Produttori
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item position='right' style={{marginRight: '4rem'}}>
                        <Search
                            color='red'
                            size='mini'
                            category
                            noResultsMessage='TODO!!1'
                            // loading={isLoading}
                            // onResultSelect={this.handleResultSelect}
                            // onSearchChange={_.debounce(this.handleSearchChange, 400, { leading: true })}
                            // results={results}
                            // value={value} >
                        >

                        </Search>
                    </Menu.Item>


                </Menu>
            </div>
        );
    }
}

AdminNavbar.propTypes = {};

export default AdminNavbar;

