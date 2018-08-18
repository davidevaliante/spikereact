import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home'
import HomePage from '../components/HomeComponents/HomePage'
import AdminDashboard from './../admin/AdminDashboard';
import AddSlot from './../admin/AddSlot';
import AddBonus from '../admin/AddBonus';
import AddProducer from '../admin/AddProducer';
import Navbar from '../components/HomeComponents/Navbar';



const AppRouter = () => {


  return (
    <div className='matchParentHeight'>
      <BrowserRouter>
        <div className='matchParentHeight'>
          <Switch>
            <Route path='/' component={HomePage} exact={true} />
            <Route path='/admin' component={AdminDashboard} exact={true} />
            <Route path='/admin/addslot' component={AddSlot} />
            <Route path='/admin/addbonus' component={AddBonus} />
            <Route path='/admin/addproducer' component={AddProducer} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
