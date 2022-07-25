import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import orderindex from'./orderPage/orderindex';
import Edit from'./edit/index';
import View from'./view/index';
import innovice from'./inovice/innovice.jsx';
import GstPrint from './GSTR1/GstPrint';



export default class orderRoute extends Component {
    render() {
        const { match } = this.props;
        
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        
                        <Route path={[`${match.path}/add`]} component={orderindex} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/view`]} component={View} />
                        <Route path={[`${match.path}/inovice`]} component={innovice} />
                        <Route path={[`${match.path}/gst`]} component={GstPrint} />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}