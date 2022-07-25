import React, { Component } from 'react'
import {GetCouponDeatails} from'../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';


export default class addEditCoupon extends Component {
    constructor(props){
        super(props)
        this.state={
                offerName:"",
                couponcode:"",
                discountupto:"",
                coupontype:"",
                discount: "",
                minOrderAmount:"",
                useslimit:"",
                dateFrome:"",
                dateTo:"",
                paymentMethode:"",
                orderFacilities:"",
                limit:"",
                useType:""
        }
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

     handleCode() {
   
    const rand =`BK_${Math.floor(1000 + Math.random() * 9000)}`;
    this.setState({ couponcode:rand });
  }
  componentDidMount(){
      this.handleCode()
  }
    handleBack() {
        this.props.history.goBack();
    }

    async submit(e){
        
        e.preventDefault();
    const {   offerName, couponcode, discountupto, useType,coupontype,discount,minOrderAmount, useslimit, dateFrome,dateTo, paymentMethode, orderFacilities} = this.state 

      if(this.state.imageCaption === '' || this.state.imagBannerType ==='')
        {
            NotificationManager.error(" Error -Please Fill up  all Required Field!!!");
            return false;
        }
       

         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
                
             }, 
             offerName:offerName,
             couponcode:couponcode,
             discountupto:discountupto,
             coupontype:coupontype,
             discount:discount?discount:null,
             minOrderAmount:minOrderAmount,
             useslimit:useslimit?useslimit:null,
             dateFrome:dateFrome,
             dateTo:dateTo,
             useType:useType,
             paymentMethode:paymentMethode,
             orderFacilities:orderFacilities
           
           };
        swal({
            title: "Are you sure?",
            text: "You want to Add New coupon",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCouponDeatails.addcoupon(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        NotificationManager.success("Success")
                        setTimeout(()=>{
                              this.props.history.push("/admin/marketing/coupon")

                        },3000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }

    render() {
        console.log(this.state)
      return (
            <div>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/marketing/coupon'>Discount Offers</a></li>
                    <li className="breadcrumb-item active"><a>Add Discount Offers</a></li>
                </ol>
                  <form onChange={(e) =>{this.handleChange(e)}}>
                      <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Select Your Coupon Type</h6>
                        </div>
                        <div className='referbody row '>
                            <div className='mx-2 my-2'>
                                <div className="form-group col-sm-2">
                                    <label className="form-label">Coupon Type <em style={{color:"tomato"}}>*</em></label>
                                    <select id="coupontype" name="coupontype" className=" w3-input w3-border form-control">
                                        <option value="Coupon Type">Coupon Type</option>
                                        <option value="Flate Coupon">Flate Coupon</option>
                                        <option value="Percentage Coupon">Percentage Coupon</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                      <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Offers Info</h6>
                        </div>
                        <div className='referbody row my-2 '>
                            <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label for="offerName" class="form-label">Offer Name <em style={{color:"tomato"}}>*</em></label>
                                        <input type="text" id="offerName" name='offerName' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label for="couponcode" class="form-label">Coupon Code<em style={{color:"tomato"}}>*</em></label>
                                        <input type="text" id="couponcode" name='couponcode' value={this.state.couponcode} class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                {
                                    this.state.coupontype == "Percentage Coupon" ?
                                      <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label for="discount" class="form-label">Discount(%) <em style={{color:"tomato"}}>*</em></label>
                                        <input type="number" id="discount" name='discount' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>:null
                                }
                                  <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label for="discountupto" class="form-label">Discount Amount Upto <em style={{color:"tomato"}}>*</em></label>
                                        <input type="text" id="discountupto" name='discountupto' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                
                
                        </div>
                    </div>
                      <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Offers Applicable On</h6>
                        </div>
                       <div className='referbody row '>
                            <div className='col-sm-6'>
                                    <div className="form-group my-2">
                                        <label for="minOrderAmount" class="form-label">Minimum Order Amount <em style={{color:"tomato"}}>*</em></label>
                                        <input type="number" id="minOrderAmount" name="minOrderAmount" placeholder='Enter Order Amount' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group btn-group row">
                                        <label for="useslimit" class="form-label">Uses per customer<em style={{color:"tomato"}}>*</em></label>
                                        {/* <input type="text" id="useslimit"  name='useslimit' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/> */}
                                       <div className='col-sm-10 mx-2'>
                                            <button type="button"  onClick={()=>this.setState({useslimit:"Nolimit"})} className="btn btn-dark mx-2 action">NoLimit</button>
                                       <button type="button"  onClick={()=>this.setState({limit:"limit"})} className="btn btn-dark action">Limit</button>
                                       </div>
                                        <div className='col-sm-4'>
                                              {
                                           this.state.limit?
                                             <input type="text" id="useslimit" placeholder='enter limit'  name='useslimit' className=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/> :null
                                       }
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                      <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Offers Validation</h6>
                        </div>
                        <div className='referbody row '>
                            <div className='col-sm-6'>
                                    <div className="form-group my-2">
                                        <label for="dateFrome" class="form-label">Date From<em style={{color:"tomato"}}>*</em></label>
                                        <input type="date" id="dateFrome" name='dateFrome' placeholder='Enter Order Amount' class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group my-2">
                                        <label for="dateTo" class="form-label">Date To<em style={{color:"tomato"}}>*</em></label>
                                        <input type="date" id="dateTo" name="dateTo" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                  <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Order Facilities</h6>
                        </div>
                                <div className='referbody row '>
                                    <div className='col-sm-4'>
                                        <input type="checkbox" id="orderFacilities" name="orderFacilities" value="both" />
                                        <label className='btn bg-success text-light mx-2' for="orderFacilities">Both</label>
                                    </div>
                                    <div className='col-sm-4'>
                                        <input type="checkbox" id="orderFacilities" name="orderFacilities" value="Pickup"  />
                                        <label className='btn btntop text-light mx-2' for="huey">Pickup</label>
                                        
                                    </div>
                                    <div className='col-sm-4'>
                                        <input type="checkbox"  id="orderFacilities" name="orderFacilities" value="Deleviry"/>
                                        <label className='btn btntop text-light mx-2' for="huey">Deleviry</label>
                                        
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                  <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Select Payment Method</h6>
                        </div>
                         <div className='referbody row '>
                            <div className='col-sm-4'>
                                <input type="checkbox" id="paymentMethode" name="paymentMethode" value="Both"/>
                                <label className='btn bg-success text-light mx-2' for="huey">Both</label>
                                
                            </div>
                             <div className='col-sm-4'>
                                <input type="checkbox" id="paymentMethode" name="paymentMethode" value="COD" />
                                <label className='btn btntop text-light mx-2' for="huey">COD</label>
                                
                            </div>
                             <div className='col-sm-4'>
                                <input type="checkbox" id="paymentMethode" name="paymentMethode" value="Online Payment"/>
                                 <label className='btn btntop text-light mx-2' for="huey">UPI</label>
                                
                            </div>
                        </div>
                        
                        </div>
                        
                    </div>
                         <div className='col-sm-6'>
                                  <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Coupon Use Type</h6>
                        </div>
                                <div className='referbody row '>
                                    <div className='col-sm-4'>
                                        <input type="checkbox" id="useType" name="useType" value="Both" />
                                        <label className='btn bg-success text-light mx-2' for="useType">Both</label>
                                    </div>
                                    <div className='col-sm-4'>
                                        <input type="checkbox" id="useType" name="useType" value="App"  />
                                        <label className='btn btntop text-light mx-2' for="useType">App</label>
                                        
                                    </div>
                                    <div className='col-sm-4'>
                                        <input type="checkbox"id="useType" name="useType" value="Web"/>
                                        <label className='btn btntop text-light mx-2' for="huey">Web</label>
                                    </div>
                                </div>
                                </div>
                            </div>
                    
                </div>
                  </form>
                  <div className='row my-4 mx-4' style={{float:"right"}}>
                    <div className='col-sm-6'>
                        <button  onClick={(e)=>{this.handleBack(e)}}  className="btntopsc btn text-light">Close</button>
                    </div>
                        <div className='col-sm-6'>
                        <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Save</button>
                    </div>
                </div>
            </div>
        )
    }
}
