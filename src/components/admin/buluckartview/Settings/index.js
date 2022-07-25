import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import banners from './banners/banners';
import  deliveryareas from './deliveryAreas/deliveryareas';
import deliveryslot from './deliverySlotSettings/deliveryslot';
import faq from './FAQ/faq';
import editFaq from'./FAQ/editFaq';
import  addFaq from'./FAQ/addFaq';
import featuressetting from './featureSettings/featuressetting';
import onlinPayment from './onlinePaymentSetting/onlinPayment';
import settingpages from './pages/settingpages';
import runnerManagement from './runnerManagementSetting/runnerManagement';
import AddRunner from'./runnerManagementSetting/AddRunner';
import storeInformation from './storeInformation/storeInformation';
import storeTime from './storeTimeSetting/storeTime';
import texSetting from './texSettings/texSetting';
import addEditBanners from './banners/addEditBanners';
import addDeliveryAdress from './deliveryAreas/addDeliveryAdress';
import editDeliveryAdress from'./deliveryAreas/editDeliveryAdress';
import addEditPickup from './deliveryAreas/addEditPickup';
import manageArea from './deliveryAreas/manageArea';
import addCity from './deliveryAreas/addCity';
import editCity from'./deliveryAreas/editCity'
import Editbanner from'./banners/editbanner';
import AddPage from'./pages/AddPage';
import EditPage from './pages/EditPage';
import BannerPhotoAdd from './banners/BannerPhotoAdd';
import BannerPhotoEdit from './banners/BannerPhotoEdit';

export default class settingsRoute extends Component {
    render() {
        const { match } = this.props;
        
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/banner`]} component={banners} />
                        <Route path={[`${match.path}/editbanner`]} component={Editbanner} />
                        <Route path={[`${match.path}/dareas`]} component={deliveryareas} />
                        <Route path={[`${match.path}/dslot`]} component={deliveryslot} />
                        <Route path={[`${match.path}/faq`]} component={faq} />
                        <Route path={[`${match.path}/addfaq`]} component={addFaq} />
                        <Route path={[`${match.path}/editfaq`]} component={editFaq} />
                        <Route path={[`${match.path}/feature`]} component={featuressetting} />
                        <Route path={[`${match.path}/addonlinpayment`]} component={onlinPayment} />
                        <Route path={[`${match.path}/pages`]} component={settingpages} />
                        <Route path={[`${match.path}/rms`]} component={runnerManagement} />
                        <Route path={[`${match.path}/addrunner`]} component={AddRunner} />
                        <Route path={[`${match.path}/sinformation`]} component={storeInformation} />
                        <Route path={[`${match.path}/storetime`]} component={storeTime} />
                        <Route path={[`${match.path}/tex`]} component={texSetting} />
                        <Route path={[`${match.path}/aebanner`]} component={addEditBanners} />
                        <Route path={[`${match.path}/addPhotoBanner`]} component={BannerPhotoAdd} />
                        <Route path={[`${match.path}/editPhotoBanner`]} component={BannerPhotoEdit} />
                        <Route path={[`${match.path}/addadress`]} component={addDeliveryAdress} />
                         <Route path={[`${match.path}/editaddadress`]} component={editDeliveryAdress} />
                        <Route path={[`${match.path}/addpickup`]} component={addEditPickup} />
                        <Route path={[`${match.path}/managearea`]} component={manageArea} />
                        <Route path={[`${match.path}/city`]} component={addCity} />
                        <Route path={[`${match.path}/editcity`]} component={editCity} />
                        <Route path={[`${match.path}/addpage`]} component={AddPage} />
                        <Route path={[`${match.path}/editpage`]} component={EditPage} />
                   </Switch>
                </main>
            </div>
        );
    }
}