import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import bulkindex from'./bulkimport/bulkindex';
import imageUploadInventory from"./bulkimport/imageUploadInventory"
import UpdateProductPrice from"./bulkimport/UpdateProductPrice"


export default class bulkImportExport extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/bulkimport`]} component={bulkindex} />
                        <Route path={[`${match.path}/imageInventoryUpload`]} component={imageUploadInventory} />
                        <Route path={[`${match.path}/varientUpdate`]} component={UpdateProductPrice} />
                    </Switch>
                </main>
            </div>
        );
    }
}