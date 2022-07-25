import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import varientstock from'./varientstock/varientstock';
import editvarients from'./varientstock/editvarients'


export default class varientOutOfStock extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        
                        <Route path={[`${match.path}/varientstock`]} component={varientstock} />
                        <Route path={[`${match.path}/editvarient`]} component={editvarients} />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}