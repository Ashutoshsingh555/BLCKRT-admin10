import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import product from'./product.jsx';
import addProduct from'./add_product/addProduct.jsx'
import editProduct from'./edit_product/editProduct.js'


export default class mainProduct extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        
                        <Route path={[`${match.path}/list`]} component={product} />
                        <Route path={[`${match.path}/addproduct`]} component={addProduct}/>
                        <Route path={[`${match.path}/edit`]} component={editProduct}/>
                      
                    </Switch>
                </main>
            </div>
        );
    }
}