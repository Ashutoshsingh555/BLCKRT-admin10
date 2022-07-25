import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import uploadInventory from'./uploadinventory/uploadInventory';
import addimage from"./uploadinventory/addimage"


export default class uploadinventory extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/create`]} component={uploadInventory} />
                        <Route path={[`${match.path}/addimage`]} component={addimage} />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}