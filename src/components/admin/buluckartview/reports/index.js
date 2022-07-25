import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import dailyOrder from './dailyOrder/dailyOrder';
import soldItemReport from './soldItemReport/soldItemReport';
import searchlist from './recent searches/searchlist';

export default class Reports extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/soldreport`]} component={soldItemReport} />
                        <Route path={[`${match.path}/dailyorder`]} component={dailyOrder} />
                        <Route path={[`${match.path}/searchlist`]} component={searchlist} />
                    </Switch>
                </main>
            </div>
        );
    }
}