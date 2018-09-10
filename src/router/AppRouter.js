import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomeComponents/HomePage'
import AdminDashboard from './../admin/AdminDashboard';
import AddSlot from '../admin/Slots/AddSlot';
import AddBonus from '../admin/Bonus/AddBonus';
import AddProducer from '../admin/AddProducer';
import AddArticle from '../admin/AddArticle';
import Test from './Test'
import SlotPage from '../components/SlotPageComponents/SlotPage';
import { PAGES, ROUTE } from "../enums/Constants";
import AboutPage from '../components/AboutPage'
import SlotDashboard from "../admin/Slots/SlotDashboard";
import NotFound from "../components/SlotPageComponents/NotFound"
import EditSlot from "../admin/Slots/EditSlot";
import BonusDashboard from "../admin/Bonus/BonusDashboard"




const AppRouter = () => {


    return (
        <div className='matchParentHeight'>
            <Router>

                <Switch>

                    { /* entry points  */}
                    <Route path={ROUTE.ROOT} component={HomePage} exact={true} page='HOME' />
                    <Route path={ROUTE.SLOT} component={SlotPage} page={PAGES.SLOT} />
                    <Route path={ROUTE.ABOUT} component={AboutPage} page={PAGES.ABOUT} />


                    { /* HOME filtered */}
                    <Route path={ROUTE.SLOT_ONLINE} component={HomePage} exact={true} page={PAGES.SLOT_ONLINE} />
                    <Route path={ROUTE.SLOT_GRATIS} component={HomePage} exact={true} page={PAGES.SLOT_GRATIS} />
                    <Route path={ROUTE.SLOT_BAR} component={HomePage} exact={true} page={PAGES.SLOT_BAR} />

                    <Route path='/test' component={Test} />

                    { /* admin */}
                    <Route path={ROUTE.ADMIN} component={AdminDashboard} exact={true} />
                    <Route path={ROUTE.ADMINSLOT} component={SlotDashboard} />
                    <Route path={ROUTE.ADDSLOT} component={AddSlot} />
                    <Route path={ROUTE.ADDBONUS} component={AddBonus} />
                    <Route path={ROUTE.ADDPRODUCER} component={AddProducer} />
                    <Route path={ROUTE.ADDARTICLE} render={() => <AddArticle editable={true} />} />
                    <Route path='/admin/editslot/:id' component={EditSlot} />
                    <Route path='/admin/editbonus/:bonusid' component={AddBonus} />
                    <Route path={Route.ADMINBONUS} component={BonusDashboard}></Route>
                    <Route path={ROUTE.ERROR404} component={NotFound} />

                    { /* test */}
                </Switch>

            </Router>
        </div>
    );
};

export default AppRouter;
