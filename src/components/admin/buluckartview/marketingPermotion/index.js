import React, { Component } from 'react'
import { Switch,Route } from 'react-router'
import coupon from'./coupon/coupon';
import alertMsg from './alertMsg/alertMsg';
import referEarn from './referEarn/referEarn';
import addEditCoupon from './coupon/addEditCoupon';
import addEditMsg from './alertMsg/addEditMsg';
import editCoupon from'./coupon/editCoupon'
import giftAdd from './Gift Offer/giftAdd';
import giftedit from './Gift Offer/giftedit';
import giftlist from './Gift Offer/giftlist';

export default class marketingPermotion extends Component {
    render() {
           const { match } = this.props;
        return (
           <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/alertmsg`]} component={alertMsg} />
                        <Route path={[`${match.path}/coupon`]} component={coupon} />
                        <Route path={[`${match.path}/referearn`]} component={referEarn} />
                        <Route path={[`${match.path}/addeditcoupon`]} component={addEditCoupon} />
                        <Route path={[`${match.path}/addeditmsg`]} component={addEditMsg} />
                        <Route path={[`${match.path}/editcoupon`]} component={editCoupon} />
                        <Route path={[`${match.path}/giftadd`]} component={giftAdd} />
                        <Route path={[`${match.path}/giftedit`]} component={giftedit} />
                        <Route path={[`${match.path}/giftlist`]} component={giftlist} />

                    </Switch>
                </main>
            </div>
        )
    }
}
