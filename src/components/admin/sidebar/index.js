import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { getCookie } from '../../../function';
import { FaCogs } from 'react-icons/fa';
import{FaShippingFast} from'react-icons/fa';


import "./index.css"


export default class Sidebar extends Component {
    render() {
        let roles = getCookie('role');
        // alert(roles)
    
        return (
            <div id="layoutSidenav_nav" className='sidebarheader'>
                <nav className="sb-sidenav accordion sb-sidenav-gray" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                        
                             <a className="nav-link " href="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                                Dashboard
                            </a>
                               <a className="nav-link " href="/admin/orders/add">
                                <div className="sb-nav-link-icon"><FaShippingFast/></div>
                                Orders
                            </a>


                            <a className={roles !== "Accounts holder"?"nav-link collapsed":"d-none"} href="#" data-toggle="collapse" data-target="#collapseShops" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-store" /></div>
                                Manage Grocery
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseShops" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav >
                                    <a className="nav-link sub_nav_link" href="/admin/maincotegory/create"><i className="fas fa-database mx-2"></i>Categories</a>
                                    <a className="nav-link sub_nav_link" href="/admin/mainproduct/list"><i className="fas fa-cart-plus mx-2"></i>Product</a>
                                    <a className="nav-link sub_nav_link" href="/admin/bulk/bulkimport"><i className="fas fa-circle-notch mx-2"></i>Bulk Import Export</a>
                                
                                    <a className="nav-link sub_nav_link" href="/admin/upload/create"><i className="fas fa-circle-notch mx-2"></i>Upload Inventory Image</a>
                                    <a className="nav-link sub_nav_link" href="/admin/setting/inventorystock"><i className="fas fa-circle-notch mx-2"></i>Inventory Stock Setting</a>
                                    <a className="nav-link sub_nav_link" href="/admin/varient/varientstock"><i className="fas fa-circle-notch mx-2"></i>Out of Stock Variants</a>
                                    
                                </nav>
                            </div>
                             <a className={roles === "Admin"?"nav-link sub_nav_link":"d-none"} href="/admin/user/list"> 
                        
                                {/* <a className="nav-link sub_nav_link" href="/admin/user/list">*/}
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                Users Management
                            </a> 
                            <a className="nav-link" href="/admin/customer/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                Customers
                            </a>
                          
                               <a className="nav-link" href="/admin/enquiry/forms">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Enquiry Forms
                            </a>


                            

                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMarketing" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-bullhorn"></i></div>
                               Maketing & Promotions
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseMarketing" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav >
                                    <a className="nav-link sub_nav_link" href="/admin/marketing/giftlist"><i className="fas fa-gift  mx-2"></i>Gift Offers</a>
                                    <a className="nav-link sub_nav_link" href="/admin/marketing/coupon"><i className="fas fa-gifts mx-2"></i>Coupons</a>
                                    <a className="nav-link sub_nav_link" href="/admin/marketing/referearn"><i className="fas fa-thumbs-up mx-2"></i>Refer & Earn</a>
                                    <a className="nav-link sub_nav_link" href="/admin/marketing/alertmsg"><i className="fas fa-comment-dots mx-2"></i>Alert Message</a>
                                </nav>
                            </div>



                            
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsereport" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                               Reports
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapsereport" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav >
                                    <a className="nav-link sub_nav_link" href="/admin/report/soldreport"><i className="far fa-circle mx-2"></i> Sold Item Report</a>
                                    <a className="nav-link sub_nav_link" href="/admin/report/dailyorder"><i className="far fa-circle mx-2"></i>Dailly Orders</a>
                                     <a className="nav-link sub_nav_link" href="/admin/report/searchlist"><i className="far fa-circle mx-2"></i>Recent Searches</a>
                                </nav>
                            </div>


                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseloyalty" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-save"></i></div>
                              Loyalty Program
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseloyalty" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav >
                                    <a className="nav-link sub_nav_link" href="/admin/loyalty/configure"><i className="fas fa-wrench mx-2"></i>Configure Points</a>
                                    <a className="nav-link sub_nav_link" href="/admin/loyalty/lc"><i className="fas fa-newspaper mx-2"></i>Loyalty Coupons</a>
                                </nav>
                            </div>


                               <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsettings" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-cog"></i></div>
                               Settings 
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapsettings" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav >
                                    <a  className={roles === "Admin"?"nav-link":"d-none"}  href="/admin/settings/sinformation"><i className="fas fa-university mx-2"></i>Store Information</a>
                                    <a  className={roles === "Admin"?"nav-link":"d-none"} href="/admin/settings/feature"><i className="fas fa-cogs mx-2"></i>Feature Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/addonlinpayment"><i className="fas fa-save mx-2"></i>Online Payment Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/tex"><i className="fas fa-money-check-alt mx-2"></i>Tax Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/storetime"><i className="far fa-clock mx-2"></i>Store Time Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/dslot"><i className="far fa-clock mx-2"></i>Delivery Slot Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/rms"><i className="far fa-user mx-2"></i>Runner Management Settings</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/dareas"><i className="fas fa-location-arrow mx-2"></i>Delivery Areas</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/banner"><i className="fas fa-file-image mx-2"></i>banners</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/pages"><i className="far fa-circle mx-2"></i>Pages</a>
                                    <a className="nav-link sub_nav_link" href="/admin/settings/faq"><i className="far fa-circle mx-2"></i>FAQ</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}
