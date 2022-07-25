import React, { Component } from 'react'
import "../setting.css"
import { GetDeliveryAreas } from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class addDeliveryAdress extends Component {
    constructor(props){
        super(props);
        this.state ={
            Zone:"",
            city:"",
            DeliveryAreaName: "",
            MinimumOrderAmount: "",
            ShippingFee: "",
            allowcustomers:false,
            AdditionalNote: "",
            ChargeShipping:false
           
            
            

        }
    }
    
      handleChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }
    async  filehandler(e){
       let str= await e.target.files[0]
        this.setState({photo:str})
    }

    handleBack() {
        this.props.history.goBack();
    }
    async submit(e){
        
        e.preventDefault();
   

         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             Zone:this.state.Zone?this.state.Zone:null,
             DeliveryAreaName:this.state.DeliveryAreaName?this.state.DeliveryAreaName:null,
             MinimumOrderAmount:this.state.MinimumOrderAmount?this.state.MinimumOrderAmount:null,
             ShippingFee:this.state.ShippingFee?this.state.ShippingFee:null,
             allowcustomers:this.state.allowcustomers?this.state.allowcustomers:this.state.allowcustomers,
             AdditionalNote:this.state.AdditionalNote?this.state.AdditionalNote:null,
             ChargeShipping:this.state.ChargeShipping?this.state.ChargeShipping:this.state.ChargeShipping,
             city:this.state.city?this.state.city:null
           };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Banner",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliveryAreas.addadress(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/dareas")

                        },3000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    render() {
        return (
            <div className='settingbody'>
                 <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/dareas'>Delivery Areas</a></li>
                    <li className="breadcrumb-item active"><a>Add Delivery Areas</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <div className='formbody'>
                    <div className='col-sm-10'>
                        <form  onChange={(e)=>this.handleChange(e)}>
                             <div className="form-group col-sm-4">
                                <label for="Zone" clasName="form-label">City<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" id="city" name='city' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                            <div className="form-group col-sm-4">
                                <label for="Zone" clasName="form-label">Zone <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" id="Zone" name='Zone' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                             <div className="file-area col-sm-10">
                                <div className="form-group">
                                 <label>Area Name *</label>
                                   <div className="form-group">
                                        <textarea id="story" name="DeliveryAreaName"   rows="5" cols="80"></textarea>
                                  </div>
                               </div>
                                </div>
                                <div className='row mx-2 '>
                                <div className="form-group col-sm-4">
                                    <label for="MinimumOrderAmount" clasName="form-label">Minimum Order Amount</label>
                                    <input type="number" id="MinimumOrderAmount" name='MinimumOrderAmount' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                </div>
                                <div className="form-group col-sm-4">
                                    <label for="ShippingFee" clasName="form-label">Shipping Fee</label>
                                    <input type="text" id="ShippingFee"  name="ShippingFee" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                </div>
                            </div>
                         
                             <div className="form-group col-sm-10">
                                 <input type="checkbox" className='mx-2' required name="allowcustomers" value="true" id="agree"/> 
                                <label for="allowcustomers" name="allowcustomers" clasName="form-label">Do not allow customers to place order below min order amount</label>                
                            </div>
                               <div className="form-group col-sm-10">
                                 <input type="checkbox" className='mx-2' required name="ChargeShipping" value="true" id="agree" /> 
                                <label for="inputPassword5" clasName="form-label">Charge  Shipping Fee above min order amount too</label>                
                            </div>
                              <div className="file-area col-sm-6 my-4" >
                                <div className="form-group">
                                 <label>Additional Note</label>
                                   <div className="form-group">
                                        <textarea id="AdditionalNote" name="AdditionalNote"   rows="5" cols="40"></textarea>
                                  </div>
                               </div>
                           </div>
                       </form>
                    </div>
                    <div className='row mx-4 my-4' style={{float:"right"}}>
                        <div className='col-sm-6'>
                            <button onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">close</button>
                        </div>
                            <div className='col-sm-6'>
                            <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Save</button>
                        </div>
                    </div>
                </div>
                <hr className="mx-4 my-2"></hr>
            </div>
        )
    }
}
