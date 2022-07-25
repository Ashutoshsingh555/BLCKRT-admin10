import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import loyaltycoupon from './loyaltyCoupon/loyaltycoupon';
import configurePoint from './configurePoint/configurePoint';
import addeditLoyalty from './loyaltyCoupon/addeditLoyalty';
import EditCoupon from './loyaltyCoupon/EditCoupon'
import editConfig from './configurePoint/editConfig'


export default class loyaltyProgram extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/configure`]} component={configurePoint} />
                        <Route path={[`${match.path}/lc`]} component={loyaltycoupon} />
                        <Route path={[`${match.path}/addlc`]} component={addeditLoyalty} />
                        <Route path={[`${match.path}/editlc`]} component={EditCoupon} />
                        <Route path={[`${match.path}/editConfig`]} component={editConfig} />
                    </Switch>
                </main>
            </div>
        );
    }
}