import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import inventorystock from'./inventorystock/inventorystock';


export default class inventorySetting extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        
                        <Route path={[`${match.path}/inventorystock`]} component={inventorystock} />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}