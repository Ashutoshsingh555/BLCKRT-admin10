import React, { Component } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {GetOnlinPaymentSetting} from"../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class onlinPayment extends Component {
    constructor(props){
        super(props);
        this.state ={
                razorId:1,
                statusMode: false,
                KeyId:"",
                SecrietKey: "",
                paytamMarchentId: "",
                paytamSecrietKey: ""
        }
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    async getListOfpaymentDetails(id=1){
        let result = await GetOnlinPaymentSetting.getOnlinPaymentList(id)
        const { statusMode,KeyId,SecrietKey, paytamMarchentId, paytamSecrietKey} = result.data
        this.setState({
             
             statusMode:statusMode,
             KeyId:KeyId,
             SecrietKey:SecrietKey,
             paytamMarchentId:paytamMarchentId,
             paytamSecrietKey:paytamSecrietKey

        })
    }

    componentDidMount(){
        this.getListOfpaymentDetails()
    }
     async submit(e){
          e.preventDefault()
        const { statusMode,KeyId,SecrietKey, paytamMarchentId, paytamSecrietKey} = this.state
         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             },
             razorId:1,
             statusMode:statusMode,
             KeyId:KeyId,
             SecrietKey:SecrietKey,
             paytamMarchentId:paytamMarchentId,
             paytamSecrietKey:paytamSecrietKey
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update Onlin Payment Details",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetOnlinPaymentSetting.getUpdateOnlinPaymentDetails(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                            window.location.reload(false);

                        },3000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }

    render() {
       return (
            <div className='mx-2 my-2'>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                   <li className="breadcrumb-item active">Payment Gateways Setting</li>
                </ol>
                <form onChange={(e)=>{ this.handleChange(e)}} className='mx-2'>
                      <div className='mx-4 my-4'>
                            <div className='row'>
                        <div className='col-sm-3 py-2'>
                            <label  className="form-label">Active Online Payment<em style={{color:"tomato"}}>*</em></label>
                        </div>
                        <div className='col-sm-3'>
                                <BootstrapSwitchButton
                                checked={this.state.statusMode}
                                onstyle='success'
                                offstyle='danger'
                                    onChange={() => {
                                        this.setState({ statusMode:this.state.statusMode == false? true:false  })
                                    }}
                                />
                            </div>
                        </div>
                     </div>
                     <div className='row' style={{border:"2px solid gray", width:"96%", margin:"30px"}}>
                         <div className='breadcrumb' style={{ width:"100%" }}>
                             <h5 className='mx-2 my-2 text-primary'>Razorpay Detail</h5>
                        </div>
                        <div className='row py-4'>
                            <div className='col-sm-4 mx-4 py-2'>
                                <div className='form-group'>
                                    <label  className="form-label">Key Id*</label><br></br>
                                    <input type="text"  defaultValue={this.state.KeyId} style={{height:"40px",padding:"5px",width:"100%"}} name='KeyId'/><br></br>
                                </div>
                            </div>
                             <div className='col-sm-4 mx-4 py-2'>
                                <div className='form-group'>
                                    <label  className="form-label">Secret Key*</label><br></br>
                                    <input type="text" defaultValue={this.state.SecrietKey} style={{height:"40px" ,padding:"5px",width:"100%"}} name='SecrietKey'/><br></br>
                                </div>
                            </div>
                        </div>
                        
                                 
                     
                     </div>
                      <div className='row' style={{border:"2px solid gray", width:"96%", margin:"30px"}}>
                         <div className='breadcrumb' style={{ width:"100%" }}>
                             <h5 className='mx-2 my-2 text-primary'>Paytm Detail</h5>
                        </div>
                        <div className='row py-4'>
                            <div className='col-sm-4 mx-4 py-2'>
                                <div className='form-group'>
                                    <label  className="form-label">Merchant Id**</label><br></br>
                                    <input type="text" defaultValue={this.state.paytamMarchentId} style={{height:"40px",padding:"5px",width:"100%"}} name='paytamMarchentId'/><br></br>
                                </div>
                            </div>
                             <div className='col-sm-4 mx-4 py-2'>
                                <div className='form-group'>
                                    <label  className="form-label">Secret Key*</label><br></br>
                                    <input type="text" defaultValue={this.state.paytamSecrietKey} style={{height:"40px",padding:"5px",width:"100%"}} name='paytamSecrietKey'/><br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                       <div className='filebtndiv mx-4'>
                            <button  onClick={(e) =>{this.submit(e)}} className="btn btntop text-light col mx-2 my-2">Save</button>
                        </div>
                </form>
             
            </div>
        )
    }
}
