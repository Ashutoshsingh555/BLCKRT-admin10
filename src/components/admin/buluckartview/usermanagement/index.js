import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import userindex from"./adminuser/userindex";


export default class userAdminManagement extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/managementindex`]} component={userindex} />
                    </Switch>
                </main>
            </div>
        );
    }
}