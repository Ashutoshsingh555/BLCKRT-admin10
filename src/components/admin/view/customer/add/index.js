import React, { Component } from 'react'
import { GetCustomerDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

export default class Add extends Component {
    constructor(props){
        super(props);
        this.state ={
            Name:"",
            phone:"",
            email:""
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    onchangeHandler(e){
         this.setState({ [e.target.name]: e.target.value })
    }
 
     handleSubmit = (e) => {
        
        e.preventDefault();
        const {    Name, phone, email} = this.state;
        if(this.state.Name==='' || this.state.email==='')
            {
                NotificationManager.error(" Error -Please Fill up  all Required Field!!!");
                return false;
            }
        
        // const formData = new FormData();
        //     formData.append('Name', Name);
        //     formData.append('phone', phone);
        //     formData.append('email', email);
           
         const config = {
            
                Headers: {
                    'content-type': 'multipart/form-data',
                }, 
                 Name:Name,
                 phone:phone,
                 email:email
            };
            swal({
                title: "Are you sure?",
                text: "You want to Add New Product",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (success) => {
                    if (success) {
                        let list = await GetCustomerDetails.addCustomerList(config);
                    
                        if (list) {
                            this.setState({ isLoaded: false })
                            this.props.history.push("/admin/customer/list")
                        } else {
                            NotificationManager.error("Please! Check input field", "Input Field");
                        }
                    }
                });
        }
 
    render() {
      
        return (
            <div className='mx-4 my-4'>
                 <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/customer/list">Customers</a></li>
                    <li className="breadcrumb-item active">Add Customer</li>
                </ol>
                <hr></hr>
                <div className='mx-2 my-4 py-4'>
                    <form onChange={(e)=>this.onchangeHandler(e)}>
                        <div className='row'>
                            <div className='col-sm-4'>
                                 <div className="form-group">
                                    <label htmlFor="phone" class="form-label">Phone Number <em style={{ color: "tomato" }}>*</em></label>
                                    <input type="text" id="phone" name="phone" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                 <div className="form-group">
                                    <label htmlFor="Name" class="form-label">Full Name  <em style={{ color: "tomato" }}>*</em></label>
                                    <input type="text" id="Name" name="Name" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                 <div className="form-group">
                                    <label htmlFor="email" class="form-label">Email<em style={{ color: "tomato" }}>*</em></label>
                                    <input type="text" id="email" name="email" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <hr></hr>
                 <div style={{textAlign:"right"}}>
                        <button className='btntop btn text-light' onClick={(e) => this.handleBack()}>Cancel</button>
                        <button type="submit" onClick={this.handleSubmit} className='btntop btn text-light mx-2'>Add</button>
                    </div>
            </div>
        )
    }
}
