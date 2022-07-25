import React, { Component } from 'react'
import "../setting.css"
import { GetDeliveryAreas } from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class addEditDeliveryAdress extends Component {
       constructor(props){
        super(props);
        this.state={
            pickupDetails:[],
            pikupid:1,
            SelectCity:"",
            Zone:"",
            PickupAddress:"",
            PickupPhone:"",
            PickupEmail:"",
            PickupLat:"",
            PickupLng:"",  
            AutoFill:"",
            MinimumOrderAmount:"",
            AdditionalNote:"",
            allowcustomers:""
        }
    }
    

 async getAllCityGlobel(id=1){
       let result = await GetDeliveryAreas.getpickupdetaillist(id)
       this.setState({pickupDetails: result.data})

    }

    componentDidMount(){
        this.getAllCityGlobel()
    }

    

    handleChangeeddd(e){
       this.setState({ [e.target.name]: e.target.value })
    }


      async submit(e){
       
       
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            pikupid:this.state.pikupid,
            SelectCity:this.state.SelectCity?this.state.SelectCity:this.state.pickupDetails.SelectCity,
            Zone:this.state.Zone?this.state.Zone:this.state.pickupDetails.Zone,
            PickupAddress:this.state.PickupAddress?this.state.PickupAddress:this.state.pickupDetails.PickupAddress,
            PickupPhone:this.state.PickupPhone?this.state.PickupPhone:this.state.pickupDetails.PickupPhone,
            PickupEmail:this.state.PickupEmail?this.state.PickupEmail:this.state.pickupDetails.PickupEmail,
            PickupLat:this.state.PickupLat?this.state.PickupLat:this.state.pickupDetails.PickupLat,
            PickupLng:this.state.PickupLng?this.state.PickupLng:this.state.pickupDetails.PickupLng,
            MinimumOrderAmount:this.state.MinimumOrderAmount?this.state.MinimumOrderAmount:this.state.pickupDetails.MinimumOrderAmount,
            AdditionalNote:this.state. AdditionalNote?this.state.AdditionalNote:this.state.pickupDetails.AdditionalNote,
            allowcustomers:this.state.allowcustomers?this.state.allowcustomers:this.state.pickupDetails.allowcustomers,
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update New city",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliveryAreas.getUpdatePickupDetails(config);
                
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

     handleBack() {
        this.props.history.goBack();
    }

    render() {
         const  pickupDetails = this.state.pickupDetails;
      return (
            <div className='settingbody'>
                 <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/dareas'>Pickup Address</a></li>
                    <li className="breadcrumb-item active"><a>Add Pickup Address</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <div className='formbody'>
                   <form onChange={(e)=>this.handleChangeeddd(e)} >
                        <div className='row mx-2'>
                            <div className="form-group col-sm-4">
                                <label for="inputPassword5" className="form-label">select city*</label>
                                <select id="SelectCity"  value={pickupDetails.SelectCity} name="SelectCity" className=" w3-input w3-border form-control">
                                    <option value={0}>-Select City-</option>
                                    <option value="hyderabad" >hyderabad</option>
                                    
                                </select>
                            </div>
                            <div className="form-group col-sm-4">
                                <label for="inputPassword5" clasName="form-label">Zone <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={pickupDetails.Zone} id="Zone" name='Zone' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                         </div>
                          <div className="form-group col-sm-8">
                                <label for="PickupAddress" clasName="form-label">Pickup Address  <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={pickupDetails.PickupAddress} id="PickupAddress" name='PickupAddress' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                             <div className='row mx-2'>
                            <div className="form-group col-sm-4">
                                <label for="PickupPhone" clasName="form-label">Pickup Phone  <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={pickupDetails.PickupPhone} name="PickupPhone" id="PickupPhone" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                            <div className="form-group col-sm-4">
                                <label for="PickupEmail" clasName="form-label">Pickup Email <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={pickupDetails.PickupEmail} id="PickupEmail"  name="PickupEmail"class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                         </div>
                          <div className='row mx-2'>
                            <div className="form-group col-sm-4">
                                <label for="PickupLat" clasName="form-label">Pickup Lat <em style={{color:"tomato"}}>*</em></label>
                                <input type="text"defaultValue={pickupDetails.PickupLat}id="PickupLat" name='PickupLat' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                            <div className="form-group col-sm-4">
                                <label for="PickupLng" clasName="form-label">Pickup Lng <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={pickupDetails.PickupLng} id="PickupLng" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                         </div>
                         <div className="form-group col-sm-10">
                                 <input type="checkbox" className='mx-2' required name="checkbox" value="check" id="agree" /> 
                                <label for="AutoFill" defaultValue={pickupDetails.AutoFill} name="AutoFill" clasName="form-label">Auto Fill</label>                
                            </div>
                             <div className='row mx-2'>
                            <div className="form-group col-sm-4">
                                <label for="MinimumOrderAmount" clasName="form-label">Minimum Order Amount<em style={{color:"tomato"}}>*</em></label>
                                <input type="text"  defaultChecked={pickupDetails.MinimumOrderAmount} id="MinimumOrderAmount"  name="MinimumOrderAmount" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                            <div className="form-group col-sm-4">
                               <label>Additional Note</label>
                                <div className="form-group">
                                    <textarea defaultValue={pickupDetails.AdditionalNote} id="AdditionalNote" name="AdditionalNote" rows="5" cols="42"></textarea>
                                </div>
                            </div>
                         </div>
                            <div className="form-group col-sm-10">
                                 <input type="checkbox"defaultChecked={pickupDetails.allowcustomers}  className='mx-2' required name="checkbox" value="check" id="agree" /> 
                                <label for="allowcustomers" clasName="form-label">Do not allow customers to place order below min order amount</label>                
                            </div>
                       </form>
                
                    <div className='row mx-4 my-4' style={{float:"right"}}>
                        <div className='col-sm-6'>
                            <button   onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">close</button>
                        </div>
                            <div className='col-sm-6'>
                            <button  onClick={(e)=>{this.submit(e)}}  className="btntopsc  btn text-light">Save</button>
                        </div>
                    </div>
                </div>
                <hr className="mx-4 my-2"></hr>
            </div>
        )
    }
}
