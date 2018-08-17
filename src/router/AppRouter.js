import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home'
import HomePage from '../components/HomeComponents/HomePage'
import AdminDashboard from './../components/AdminDashboard';
import AddSlot from './../components/AddSlot';
import AddBonus from '../components/AddBonus';
import AddProducer from '../components/AddProducer';



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
