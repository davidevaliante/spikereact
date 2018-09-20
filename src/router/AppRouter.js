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
import AddExtraFromHtml from '../admin/Extra/AddExtraFromHtml'
import BonusArticle from '../components/Extra/BonusArticle'
import RichTextEditor from "../admin/Extra/RichEdit";
import ListArticle from "../components/Extra/ListArticle";

const AppRouter = () => {
    let currentSlotPath = ''

    return (
        <div className='matchParentHeight'>
            <Router>

                <Switch>
                    console.log(props.location);

                    { /* entry points  */}
                    <Route path={ROUTE.ROOT} component={HomePage} exact={true} page='HOME' />
                    <Route path={ROUTE.ABOUT} component={AboutPage} page={PAGES.ABOUT} />
                    <Route path={ROUTE.SLOT} component={SlotPage} page={PAGES.SLOT} />


                    { /* HOME filtered */}
                    <Route path={ROUTE.SLOT_ONLINE} component={HomePage} exact={true} page={PAGES.SLOT_ONLINE} />
                    <Route path={ROUTE.SLOT_GRATIS} component={HomePage} exact={true} page={PAGES.SLOT_GRATIS} />
                    <Route path={ROUTE.SLOT_BAR} component={HomePage} exact={true} page={PAGES.SLOT_BAR} />
                    <Route path={ROUTE.EXTRA} component={BonusArticle} />
                    <Route path={ROUTE.ARTICOLI} component={ListArticle} />

                    { /* HOME filtered by producers */}
                    <Route path={ROUTE.PRODUCER} component={HomePage} />

                    { /* admin */}
                    <Route path={ROUTE.ADMIN} component={AdminDashboard} exact={true} />
                    <Route path={ROUTE.ADMINSLOT} component={SlotDashboard} />
                    <Route path={ROUTE.ADDSLOT} component={AddSlot} />
                    <Route path={ROUTE.ADDBONUS} component={AddBonus} />
                    <Route path={ROUTE.ADDPRODUCER} component={AddProducer} />
                    <Route path={ROUTE.ADDEXTRAFROMHTML} component={AddExtraFromHtml} />
                    <Route path={ROUTE.ADDARTICLE} render={() => <AddArticle editable={true} />} />
                    <Route path={ROUTE.EDITSLOT} component={EditSlot} />
                    <Route path={ROUTE.EDITBONUS} component={AddBonus} />
                    <Route path={ROUTE.ADMINBONUS} component={BonusDashboard}></Route>

                    { /* test */}
                    <Route path='/test' component={Test} />

                    {/* Error */}
                    <Route path={ROUTE.ERROR404} component={NotFound} />
                </Switch>

            </Router>
        </div>
    );
};

export default AppRouter;
