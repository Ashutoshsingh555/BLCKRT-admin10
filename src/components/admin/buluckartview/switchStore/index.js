import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import switchstore from'./switchstorePage/switchstore';


export default class storeSwitchRoute extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/addswitch`]} component={switchstore} />
                    </Switch>
                </main>
            </div>
        );
    }
}