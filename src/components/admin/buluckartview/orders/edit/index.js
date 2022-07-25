import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import { GetOrderDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Moment from 'react-moment';

export default class Edit extends Component {
    constructor(props) {
        super(props);
          let self = this.props.location.state;
        this.state = {
            id: this.props.location.state.row.id, status: this.props.location.state.row.status,deliverydate:self.row.deliverydate
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleUpdateStatus = async (event) => {
        let data = { status: this.state.status, id: this.state.id,deliverydate: new Date(this.state.deliverydate) }
        if (data) {
            let update = await GetOrderDetails.getOrderStatusUpdate(data);
            if (update) {
                NotificationManager.success(update.msg, 'Status');
                setTimeout(
                    async function () {
                        window.location.href = "/admin/orders/add"
                    },
                    1000
                );
            } else {
                NotificationManager.error("Check Status", "Status");
            }
        }
        console.log("Edit -> handleUpdateStatus -> data", data)
    }
    render() {
        let self = this.props.location.state;
        console.log("Edit -> render -> self", self)
       let str =this.state.deliverydate?this.state.deliverydate:"";
       let date =str.split('T')
       console.log(date[0])
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Orders</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/admin/orders/add">Orders</a></li>
                            <li className="breadcrumb-item active">Order Edit</li>
                        </ol>
                        <div className="row">
                            {self.row ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Invoice</h2>
                                            <span className="order-id"><b>#OrderId:-</b> {self.row.number}</span>
                                        </div>
                                        <hr></hr>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-4">
                                                    <div className="ordr-date">
                                                        <div style={{display:"flex"}}>
                                                             <b>Mr/mrs Name :</b><h6>{self.row.Addresses[0].fullname.toUpperCase()}</h6>
                                                        </div>
                                                         <b>Order Date :</b> <Moment format='MMMM Do YYYY'>{self.row.createdAt}</Moment>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-sm-8">
                                                    {
                                                        self.row.Addresses.map((data, index) => (
                                                            <div className="ordr-date right-text mr-4" key={index}>
                                                                <address><b>-:Adress Details :-</b></address>
                                                                {data.shipping},<br />
                                                                {data.area},<br />
                                                                {data.city},<br />
                                                                {data.discrict},<br />
                                                                {data.states},<br />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card card-static-2 mb-30 mt-30">
                                                        <div className="card-title-2">
                                                            <h4>Recent Orders</h4>
                                                        </div>
                                                        <div className="card-body-table">
                                                            <div className="table-responsive">
                                                                <table className="table ucp-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: 130 }}>#</th>
                                                                            <th>Image</th>
                                                                            <th>Item</th>
                                                                            <th style={{ width: 150 }} className="text-center">Price</th>
                                                                            <th style={{ width: 150 }} className="text-center">Qty</th>
                                                                            <th style={{ width: 100 }} className="text-center">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {self.row.Addresses.map((prop) => {
                                                                            return (
                                                                                self.row.orderCarts.map((p, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>{p.id}</td>
                                                                                        <td >
                                                                                            <img src={p.photo} alt="cartimage" style={{ height: '50px' }} />
                                                                                        </td>
                                                                                        <td>
                                                                                            {p.productName}
                                                                                        </td>
                                                                                        <td className="text-center">&#8377;{p.price}</td>
                                                                                        <td className="text-center">{p.qty}</td>
                                                                                        <td className="text-center">&#8377;{p.total}</td>
                                                                                    </tr>
                                                                                ))
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Sub Total
                                                    </div>
                                                        <div className="order-total-right-text">
                                                            &#8377;{self.row.grandtotal}
                                                        </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Delivery Fees
                                                    </div>
                                                        <div className="order-total-right-text">
                                                            &#8377;Free
                                                    </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text fsz-18">
                                                            Total Amount
                                                    </div>
                                                        <div className="order-total-right-text fsz-18">
                                                            &#8377;{self.row.grandtotal}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Delivery Date*</label>
                                                        <div className="input-group">
                                                            <input className="custom-select" type="date" name="deliverydate" value={this.state.deliverydate?date[0]:''} onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </div>
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group">
                                                            <select id="status" name="status" className="custom-select" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                                <option value="processing">Processing</option>
                                                                <option value="shipping">Shipping</option>
                                                                <option value="delieverd">Delivered</option>
                                                                <option value="cancel">Cancel</option>
                                                                <option value="ReturnRequest">ReturnRequest</option>
                                                                <option value="AcceptedRequest">AcceptedRequest</option>
                                                                <option value="AssignToDeliveryBoy">AssignToDeliveryBoy</option>
                                                                <option value="PaymentProcessing">PaymentProcessing</option>
                                                                <option value="returned">returned</option>
                                                               
                                                            </select>
                                                            <div className="input-group-append">
                                                                <button className="status-btn hover-btn" type="submit" onClick={this.handleUpdateStatus}>Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : 'Loading'}
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}
