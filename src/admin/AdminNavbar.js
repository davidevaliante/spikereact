import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react-single/Menu'
import { Dropdown } from 'semantic-ui-react-single/Dropdown'
import { Icon } from 'semantic-ui-react-single/Icon'
import { Search } from 'semantic-ui-react-single/Search'
import { ADMINPAGES, ROUTE } from "../enums/Constants";

class AdminNavbar extends Component {
    state = {};
    activeItem = ADMINPAGES.ADMIN;

    handleClick = (id) => {
        document.getElementById(id).click()
    };


    render() {
        const activeItem = this.props.activeItem;
        return (
            <div>
                <Menu stackable fixed='top'>
                    <Menu.Item>
                        <NavLink to={ROUTE.ADMIN}>
                            <Icon name='cogs' />
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.ARTICLE}>
                        <Dropdown item simple text='Articoli'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-article')}>
                                    <NavLink id='admin-nav-add-article' to={ROUTE.ADDARTICLE}>
                                        <Icon name='add' /> Aggiungi Articolo
                                    </NavLink>
                                </Dropdown.Item>

                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-article')}>
                                    <NavLink id='admin-nav-article' to='#'>
                                        <Icon name='archive' /> Gestione Articoli
                                    </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{ padding: '0', margin: '0' }} active={activeItem === ADMINPAGES.SLOT}>
                        <Dropdown item simple text='Slot'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-slot')}>
                                    <NavLink id='admin-nav-add-slot' to={ROUTE.ADDSLOT}>
                                        <Icon name='add' /> Aggiungi Slot
                                    </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-slot')}>
                                    <NavLink id='admin-nav-slot' to={ROUTE.ADMINSLOT}>
                                        <Icon name='game' /> Gestione Slot
                                    </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.BONUS}>
                        <Dropdown item simple text='Bonus'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-bonus')}>
                                    <NavLink id='admin-nav-add-bonus' to={ROUTE.ADDBONUS}><Icon name='add' /> Aggiungi Bonus</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-bonus')}>
                                    <NavLink id='admin-nav-bonus' to={ROUTE.ADMINBONUS}>
                                        <Icon name='plus circle' /> Gestione Bonus
                                    </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.PRODUCER}>
                        <Dropdown item simple text='Produttori'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-producer')}>
                                    <NavLink id='admin-nav-add-producer' to={ROUTE.ADDPRODUCER}><Icon name='add' /> Aggiungi Produttore</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-producer')}>
                                    <NavLink id='admin-nav-producer' to={ROUTE.ADMINPRODUCER}>
                                        <Icon name='lab' /> Gestione Produttori
                                    </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item style={{ padding: '0rem' }} active={activeItem === ADMINPAGES.EXTRA}>
                        <Dropdown item simple text='Extra'>
                            <Dropdown.Menu simple>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-add-extra')}>
                                    <NavLink id='admin-nav-add-extra' to={ROUTE.ADDEXTRAFROMHTML}><Icon name='add' /> Aggiungi Extra da Html</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleClick('admin-nav-extra')}>
                                    <NavLink id='admin-nav-extra' to='#'>
                                        <Icon name='lab' /> Gestione Extra
                                </NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>

                    <Menu.Item position='right' style={{ marginRight: '4rem' }}>
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

