import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Add from './add';

export default class Customer extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                        <Route path={[`${match.path}/add`]} component={Add} />
                    </Switch>
                </main>
            </div>
        );
    }
}