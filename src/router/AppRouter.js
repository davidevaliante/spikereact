import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomeComponents/HomePage'
import AdminDashboard from './../admin/AdminDashboard';
import AddSlot from './../admin/AddSlot';
import AddBonus from '../admin/AddBonus';
import AddProducer from '../admin/AddProducer';
import AddArticle from '../admin/AddArticle';
import Test from './Test'
import SlotPage from '../components/SlotPageComponents/SlotPage';
import { PAGES, ROUTE, SLOT_TYPES } from "../enums/Constants";


const AppRouter = () => {


    return (
        <div className='matchParentHeight'>
            <BrowserRouter>

                <Switch>
                    <Route path={ROUTE.ROOT} component={HomePage} exact={true} page='HOME' />
                    <Route path={ROUTE.SLOT_ONLINE} component={HomePage} exact={true} page={PAGES.SLOT_ONLINE} />
                    <Route path={ROUTE.SLOT_GRATIS} component={HomePage} exact={true} page={PAGES.SLOT_GRATIS} />
                    <Route path={ROUTE.SLOT_BAR} component={HomePage} exact={true} page={PAGES.SLOT_BAR} />
                    <Route path={ROUTE.SLOT} component={SlotPage} />

                    <Route path={ROUTE.ADMIN} component={AdminDashboard} exact={true} />
                    <Route path={ROUTE.ADDSLOT} component={AddSlot} />
                    <Route path={ROUTE.ADDBONUS} component={AddBonus} />
                    <Route path={ROUTE.ADDPRODUCER} component={AddProducer} />
                    <Route path={ROUTE.ADDARTICLE} component={AddArticle} />
                    <Test path='/test' component={Test} />
                </Switch>

            </BrowserRouter>
        </div>
    );
};

export default AppRouter;
