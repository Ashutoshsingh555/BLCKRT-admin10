import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './header';
import Home from './dashboard';
import SideBar from './sidebar';

import Customer from './view/customer';
import User from './view/user';


import mainCategory from'./buluckartview/category/index';
import mainProduct from'./buluckartview/product/index';
import uploadinventory from"./buluckartview/uploadInventory/index";
import inventorySetting  from"./buluckartview/inventorystocksetting/index";
import bulkImportExport from"./buluckartview/bulkimportexport/index";
import varientOutOfStock from"./buluckartview/outofstockvarient/index";
import storeSwitchRoute from"./buluckartview/switchStore/index";
import orderRoute from"./buluckartview/orders/index";
import userAdminManagement from"./buluckartview/usermanagement/index";
import EnquiryRoute from"./buluckartview/EnquiryForms/index";
import marketingPermotion from"./buluckartview/marketingPermotion/index";
import Reports from './buluckartview/reports/index';
import loyaltyProgram from './buluckartview/loyaltyProgram';
import settingsRoute from './buluckartview/Settings';




export default class rootRoutes extends Component {
  render() {
    const { match } = this.props;
   return (
        <main>
        <Header />
        <div id="layoutSidenav">
          <SideBar />
          <Switch>
            <Route exact path={[`${match.path}/home`, `${match.path}`]} component={Home} />
          
            <Route path={`${match.path}/customer`} component={Customer} />
            <Route path={`${match.path}/user`} component={User} />
        
            <Route path={`${match.path}/maincotegory`} component={mainCategory} />
            <Route path={`${match.path}/mainproduct`} component={mainProduct} />
            <Route path={`${match.path}/upload`} component={uploadinventory} />
            <Route  path={`${match.path}/setting`} component={inventorySetting }/>
            <Route  path={`${match.path}/bulk`} component={bulkImportExport }/>
            <Route  path={`${match.path}/varient`} component={varientOutOfStock}/>
            <Route  path={`${match.path}/switch`} component={storeSwitchRoute}/>
            <Route  path={`${match.path}/orders`} component={orderRoute}/>
            <Route  path={`${match.path}/useradmins`} component={userAdminManagement}/>
            <Route  path={`${match.path}/enquiry`} component={EnquiryRoute}/>
            <Route  path={`${match.path}/marketing`} component={marketingPermotion}/>
            <Route  path={`${match.path}/report`} component={Reports}/>
            <Route  path={`${match.path}/loyalty`} component={loyaltyProgram}/>
            <Route  path={`${match.path}/settings`} component={settingsRoute}/>




          </Switch>
        </div>
      </main>
    );
  }
}