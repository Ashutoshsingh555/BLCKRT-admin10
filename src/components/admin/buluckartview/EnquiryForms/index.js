import React, { Component } from 'react'
import { Switch,Route } from 'react-router'
import enquiryFormList from './enquiryFormList'

export default class EnquiryRoute extends Component {
    render() {
           const { match } = this.props;
        return (
           <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/forms`]} component={enquiryFormList} />
                    </Switch>
                </main>
            </div>
        )
    }
}
