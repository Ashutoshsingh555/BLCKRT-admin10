import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Button
} from "@material-ui/core";
import Moment from 'react-moment';

export default class View extends Component {
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        let self = this.props.location.state
        console.log(self)
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 mb-30 ml-50 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                                 <button  className="btn btntop text-light mx-2 my-2">Print Setting</button>
                                   <Link className="views-btn" to={{
                                        pathname: `/admin/orders/inovice/${self.id}`,
                                        state: self
                                    }}>
                                            <a className="btn btntop text-light mx-2 my-2">Print Inovice</a>
                                    </Link>
                                        <Link className="views-btn" to={{
                                        pathname: `/admin/orders/gst/${self.id}`,
                                        state: self
                                    }}>
                                            <a className="btn btntop text-light mx-2 my-2">Print GSTR1 </a>
                                    </Link>

                               
                                    
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/">Orders</a></li>
                            <li className="breadcrumb-item active">Order Edit</li>
                        </ol>
                        <div className="row">
                            {self ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="col-lg-12">
                                        <div className="card card-static-2 py-2 mb-30 mt-10">
                                                <div style={{display:"flex"}}>
                                                    <b>{self.Addresses[0].fullname}</b><h6>(#OrderId{self.id}):</h6>
                                                    <b>Order Date :</b> <Moment format='MMMM Do YYYY'>{self.createdAt}</Moment>
                                            </div>
                                            <div className="card-body-table">
                                                <div className="table-responsive">
                                                    <table className="table ucp-table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Id</th>
                                                                < th style={{ width: 100 }}>IMAGE</th>
                                                                <th>ITEM</th>
                                                                <th>GIFT OFFER</th>
                                                                <th>WEIGHT</th>
                                                                <th  style={{ width: 100 }} >UNIT MRP</th>
                                                            
                                                                <th className="text-center">NET PRICE</th>
                                                                <th className="text-center">QUANTITY</th>
                                                                <th style={{ width: 250 }} className="text-center">TAX TYPE</th>
                                                                <th style={{ width: 50 }} className="text-center">TAX AMOUNT</th>
                                                                <th style={{ width: 50 }} className="text-center">TOTAL</th>
                                                                <th style={{ width: 100 }} className="text-center">COMMENT</th>
                                                                <th style={{ width: 100 }} className="text-center">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {self.Addresses.map((prop) => {
                                                                return (
                                                                    self.orderCarts.map((p, index) => (
                                                                        <tr key={index}>
                                                                            <td>{p.id}</td>
                                                                            <td >
                                                                                <img src={p.photo} alt="img" style={{ height: '50px' }} />
                                                                            </td>
                                                                            <td>
                                                                                {p.productName}
                                                                            </td>
                                                                             <td>
                                                                                {p.GiftOffersName}
                                                                            </td>
                                                                            <td>{p.waightunitno}</td>
                                                                            <td>&#8377;{p.mrp}</td>
                                                                          
                                                                                <td className="text-center">&#8377;{p.price}</td>
                                                                                <td className="text-center">{p.qty}</td>
                                                                                 <td className="text-center">{p.TaxType == "inclusive" ? `CGST + SGST (${p.GSTrate}%)` : `SGST(${p.GSTrate}%)`}</td>
                                                                                  <td className="text-center">{p.taxAmount}</td>
                                                                                <td className="text-center">&#8377;{p.total}</td>
                                                                                 <td className="text-center">{p.comments}</td>
                                                                                <td className="text-center"> <b><i>{self.status}</i></b></td>

                                                                        
                                                                        </tr>
                                                                    ))
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className='container mt-50'>
                                                <hr></hr>
                                                 <div style={{textAlign:"center"}}>
                                                        <h6><b>Custommer Details</b></h6>
                                                    </div>
                                                  {self.Addresses.map((prop) => {
                                                                return (
                                                                    self.orderCarts.map((p, index) => (
                                                                         <div key={p.id}>
                                                                              <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Full Name :-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{prop.fullname}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Phone Number:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{prop.phone}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>City Name :-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{prop.city}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>District Name:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{prop.discrict}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>State:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{prop.states}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>MapAdresss:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-5'>
                                                                                    {prop.mapcustomeradress?<address>{prop.mapcustomeradress.addressType},{prop.mapcustomeradress.Hno},{prop.mapcustomeradress.street},
                                                                                    {prop.mapcustomeradress.locality},{prop.mapcustomeradress.area}
                                                                                    ,{prop.mapcustomeradress.district},{prop.mapcustomeradress.pincode},{prop.mapcustomeradress.state},
                                                                                    {prop.mapcustomeradress.latitude},{prop.mapcustomeradress.longitude}
                                                                                    </address>:null}
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                           
                                                                         </div>
                                              
                                                                    ))
                                                                );
                                                            })}
                                             
                                                   
                                                </div>
                                                <div className='container mt-50'>
                                                <hr></hr>
                                                 <div style={{textAlign:"center"}}>
                                                        <h6><b>Order Details</b></h6>
                                                    </div>
                                                  {self.Addresses.map((prop) => {
                                                                return (
                                                                    self.orderCarts.map((p, index) => (
                                                                         <div key={p.id}>
                                                                              <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Delivery Time:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.deliverydate}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Order Type:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.status}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Payment Option :-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.paymentmethod}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Refund Amount:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.WalletRefund}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>orderCarts Saving:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.totalDiscount}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            
                                                                           
                                                                         </div>
                                              
                                                                    ))
                                                                );
                                                            })}
                                             
                                                   
                                                </div>
                                                <div className='container mt-50'>
                                                <hr></hr>
                                                 <div style={{textAlign:"center"}}>
                                                        <h6><b>Charges Break-down</b></h6>
                                                    </div>
                                                  {self.orderCarts.map((props) => {
                                                                return (
                                                                  
                                                                         <div key={props.id}>
                                                                              <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Checkout :-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>&#8377;{self.grandtotal}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>(-)Discount:-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>&#8377;{self.totalDiscount}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                             <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>(+)Shipping Charge :-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                    <h6>{self.shipingCharge}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-sm-3'>
                                                                                    <h6><b>Total-</b></h6>
                                                                                </div>
                                                                                <div className='col-sm-3'>
                                                                                   <h6>&#8377;{props.price}</h6>
                                                                                </div>
                                                                               <hr></hr>
                                                                            </div>
                                                                           
                                                                         </div>
                                              
                                                                    
                                                                );
                                                            })}
                                             
                                                   
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
