import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../components/HomeComponents/HomePage'
import AdminDashboard from './../admin/AdminDashboard';
import AddSlot from './../admin/AddSlot';
import AddBonus from '../admin/AddBonus';
import AddProducer from '../admin/AddProducer';
import Test from './Test'
import SlotPage from '../components/SlotPageComponents/SlotPage';



const AppRouter = () => {


  return (
    <div className='matchParentHeight'>
      <BrowserRouter>

        <Switch>
          <Route path='/' component={HomePage} exact={true} page='HOME' />
          <Route path='/admin' component={AdminDashboard} exact={true} />
          <Route path='/admin/addslot' component={AddSlot} />
          <Route path='/admin/addbonus' component={AddBonus} />
          <Route path='/admin/addproducer' component={AddProducer} />
          <Route path='/slot/:id' component={SlotPage} />
          <Test path='/test' component={Test} />
        </Switch>

      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
