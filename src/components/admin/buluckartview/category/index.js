import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import productmainCotegory from'./productmainCotegory';
import addCategory from'./addCategory';


export default class mainCategory extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        
                        <Route path={[`${match.path}/create`]} component={productmainCotegory} />
                        <Route path={[`${match.path}/addcategory`]} component={addCategory} />
                      
                    </Switch>
                </main>
            </div>
        );
    }
}