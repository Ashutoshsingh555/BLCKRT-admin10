import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { GetUserLogin,GetAdninContactDetails } from '../../services';
import './header.css'
import ReactModal from 'react-modal';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';



export default class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            showModal:false,
             Query:"",
             message:""


        }
           this.handleOpenModal = this.handleOpenModal.bind(this);
           this.handleCloseModal = this.handleCloseModal.bind(this);
    }
     //model handler
     handleOpenModal () {
    this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    //form handler
    handleContact=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }


    async submit(e){
      e.preventDefault();
    const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
                Query:this.state.Query,
             message:this.state.message

            
           };
        swal({
            title: "Are you sure?",
            text: "You want to Informe",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetAdninContactDetails.getAddMessage(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        this.handleCloseModal()
                        NotificationManager.success("Message Sent Successfully")
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    render() {
        console.log(this.state,"datag")
        return (

            <div>
                <nav className="sb-topnav navbar navbar-expand navbar-light bg-clr">
                    <a className="navbar-brand logo-brand" href="/">BulucKart Admin</a>
                    <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" ><i className="fas fa-bars" /></button>
                    <a href="/" className="frnt-link"><i className="fas fa-external-link-alt" />Home</a>
                    <ul className="navbar-nav ml-auto mr-md-0">
                        <li className='nav-item '>
                             <a href='https://play.google.com/store/apps/details?id=com.signity.valueapps' className="btn btntop text-light mx-2">Admin App</a>
                        </li>
                          <li className='nav-item '>
                             <a  href='https://docs.google.com/document/d/1ZAfqm5onaJoVBWvf7RVLa5wbH7N0Mw-JN75oF0XjyPk/edit?usp=sharing' className="btn btntop text-light mx-2">Admin FAQ</a>
                        </li>
                          <li className='nav-item '>
                             <button onClick={this.handleOpenModal} className="btn btntop text-light mx-2">Contact Us</button>
                               <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Minimal Modal Example"
                                className="Modal"
                                overlayClassName="Overlay"
                                 onRequestClose={this.handleCloseModal}
                             
                                >
                                <div>
                                     <div className='mx-2' >
                                        <div>
                                            <h5 class="modal-title" id="exampleModalLabel">Contact-Us</h5>
                                            <hr></hr>
                                        </div>
                                        <div  className='py-2'>
                                            <form onChange={(e)=>this.handleContact(e)}>
                                                 <div className="form-group">
                                                     <label>Reason*</label>
                                                
                                                    <input   type="text" name="Query" className=" w3-input w3-border form-control"/>
                                                      
                                                </div>
                                                                                   
                                                     <div className='my-4'>
                                                            <label>Messages*</label>
                                                            <div className="form-group">
                                                                    <textarea id="alerttext" name="message"  rows="4" cols="62"></textarea>
                                                            </div>
                                                        </div>
                                                        <hr></hr>
                                                                 
                                                    <button onClick={(e)=>{this.submit(e)}} className="btn btn-primary hover-btn mx-2" type="submit">Add</button>
                                                    <button  class="btn btn-outline-primary" onClick={this.handleCloseModal}>Close</button>
                                                </form>
                                        </div>
                                    </div>
                                </div>
                                
                            </ReactModal>

                        </li>
                        
                          <li className='nav-item '>
                             <a href='https://buluckart.com' className="btn btntop text-light mx-2">View Store</a>
                        </li>
                      
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user fa-fw" /></a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item admin-dropdown-item" href="edit_profile.html">Edit Profile</a>
                                <a className="dropdown-item admin-dropdown-item" href="change_password.html">Change Password</a>
                                <span className="dropdown-item admin-dropdown-item" onClick={() => GetUserLogin.logout()}>Logout</span>
                            </div>
                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
};
