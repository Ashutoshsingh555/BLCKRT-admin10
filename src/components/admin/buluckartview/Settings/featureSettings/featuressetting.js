import React, { Component } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {GetFeatureSettingDetails} from"../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import "./feature.css";

export default class featuressetting extends Component {
    constructor(props){
        super(props);
        this.state={
            radius:"",
            storeStatus:false,
            deliveryArea:"",
            radiusType:"",
            recomendedProduct:false,
            deliverySlotStatus: false,
            loyaltyProgram :false,
            pickUpAdress:false,
            delivery:false,
            mobileNotrification:false,
            emailNotification :false,
            smsNotification : false,
            COD : false,
            socialLogIn : false,
            googleAnalyticKey:""   ,
            feacebookPixleKey:"" ,
            googleId: ""  ,
            feacebookId:"" ,
            googleAnalyticPixleKey :"" ,
            productTitleHomepage:"" ,
            noOfCategory:"",
            reccemendProductNo: "",
            emailMandetory:false,
            storeLogo:"",
            enableRatting :false,
            mapEnable :false,
            appTitle : false,
            homePageTitle:"",
            appSubTitle:false,
            appHeader:"",
            showCOD : false,
            displayNumber:"",
            ageRistriction  : false,
            innoviceAmount:false,
            numberType:""

        }
    }
  
     async getlistsetting(id=1){
         let result = await GetFeatureSettingDetails.getFeatureList(id);
           const {  storeStatus,deliveryArea,radiusType,recomendedProduct,deliverySlotStatus, loyaltyProgram , pickUpAdress,delivery, mobileNotrification,emailNotification ,smsNotification, COD, socialLogIn, googleAnalyticKey ,
            feacebookPixleKey, googleId,feacebookId, googleAnalyticPixleKey ,productTitleHomepage,noOfCategory, reccemendProductNo,emailMandetory, storeLogo, enableRatting, mapEnable,
            appTitle, homePageTitle, appSubTitle, appHeader,showCOD,displayNumber, ageRistriction,innoviceAmount, numberType}  = result.data
       this.setState({ 
            storeStatus:storeStatus,
            deliveryArea:deliveryArea,
            recomendedProduct:recomendedProduct,
            deliverySlotStatus: deliverySlotStatus,
            loyaltyProgram :loyaltyProgram,
            pickUpAdress:pickUpAdress,
            delivery:delivery,
            mobileNotrification:mobileNotrification,
            emailNotification :emailNotification,
            smsNotification : smsNotification,
            COD : COD,
            socialLogIn : socialLogIn,
            googleAnalyticKey:googleAnalyticKey   ,
            feacebookPixleKey:feacebookPixleKey ,
            feacebookId: feacebookId ,
            feacebookId:feacebookId ,
            googleAnalyticPixleKey :googleAnalyticPixleKey ,
            productTitleHomepage:productTitleHomepage ,
            noOfCategory:noOfCategory,
            reccemendProductNo:reccemendProductNo,
            emailMandetory:emailMandetory,
            storeLogo:storeLogo,
            enableRatting :enableRatting,
            mapEnable :mapEnable,
            appTitle : appTitle,
            homePageTitle:homePageTitle,
            appSubTitle:appSubTitle,
            appHeader:appHeader,
            showCOD : showCOD,
            displayNumber:displayNumber,
            ageRistriction  : ageRistriction,
            innoviceAmount:innoviceAmount,
            numberType:numberType})

    }
    componentDidMount(){
        this.getlistsetting()
    }

    

    handleChangeeddd(e){
       this.setState({ [e.target.name]: e.target.value })
    }


      async submit(e){
          e.preventDefault()
          const {  storeStatus,deliveryArea,radiusType,recomendedProduct,deliverySlotStatus, loyaltyProgram , pickUpAdress,delivery, mobileNotrification,emailNotification ,smsNotification, COD, socialLogIn, googleAnalyticKey ,
            feacebookPixleKey, googleId,feacebookId, googleAnalyticPixleKey ,productTitleHomepage,noOfCategory, reccemendProductNo,emailMandetory, storeLogo, enableRatting, mapEnable,
            appTitle, homePageTitle, appSubTitle, appHeader,showCOD,displayNumber, ageRistriction,innoviceAmount, numberType}  = this.state
       
       
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             },
             settingId:1,
             storeStatus:storeStatus,
             deliveryArea:deliveryArea,
             recomendedProduct:recomendedProduct,
             deliverySlotStatus: deliverySlotStatus,
             loyaltyProgram :loyaltyProgram,
             pickUpAdress:pickUpAdress,
             delivery:delivery,
             mobileNotrification:mobileNotrification,
             emailNotification :emailNotification,
             smsNotification : smsNotification,
             COD : COD,
             socialLogIn : socialLogIn,
             googleAnalyticKey:googleAnalyticKey   ,
             feacebookPixleKey:feacebookPixleKey ,
             feacebookId: feacebookId ,
             feacebookId:feacebookId ,
             googleAnalyticPixleKey :googleAnalyticPixleKey ,
             productTitleHomepage:productTitleHomepage ,
             noOfCategory:noOfCategory,
             reccemendProductNo:reccemendProductNo,
             emailMandetory:emailMandetory,
             storeLogo:storeLogo,
             enableRatting :enableRatting,
             mapEnable :mapEnable,
             appTitle : appTitle,
             homePageTitle:homePageTitle,
             appSubTitle:appSubTitle,
             appHeader:appHeader,
             showCOD : showCOD,
             displayNumber:displayNumber,
             ageRistriction  : ageRistriction,
             innoviceAmount:innoviceAmount,
              numberType:numberType
           
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
                    let list = await GetFeatureSettingDetails.getUpdateFeatureDetails(config);
                
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
         console.log(this.state)
       return (
            <div className='mx-2 my-4'>
              <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                   <li className="breadcrumb-item active">Store Setting</li>
                </ol>
                <form onChange={(e)=>{this.handleChangeeddd(e)}}>
                    <div className='container py-2'>
                   <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Store On/Off  <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.storeStatus}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ storeStatus:this.state.storeStatus == false? true:false  })
                                }}
                            />
                        </div>
                   </div>
                   <div className='row py-4'>
                       <div className='col-sm-3 py-4'>
                           <label>Delivery Area<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                           <button   className={`${this.state.deliveryArea  == 'ByArea' ? "btn bg-success" : "btn bg-danger text-light mx-2 my-2 " }`}  onClick={(e)=>{e.preventDefault(),this.setState({radius:null,deliveryArea:"ByArea"})}}>By Area</button>
                           <button  className={`${this.state.deliveryArea  !== 'ByArea' ? "btn bg-success" : "btn bg-danger text-light mx-2 my-2 " }`} onClick={(e)=>{e.preventDefault(),this.setState({radius:"radius",deliveryArea:"ByRadius"})}}>By Radius</button>
                        </div>
                         {
                             this.state.radius?<div className='row'>
                                  <div className='col-sm-3 py-4'> 
                                    <label>Radius Measurement<em style={{color:"tomato"}}>*</em></label>
                                </div>
                                <div className='col-sm-3'>
                                    <button onClick={(e)=>{e.preventDefault(),this.setState({deliveryArea:"km"})}} className=' buttonoption btn bg-success text-light mx-2 my-2 '>km</button>
                                    <button onClick={(e)=>{e.preventDefault(),this.setState({deliveryArea:"mile"})}}  className='btn  text-light' style={{background:"#02085e"}}>Mile</button>
                                    </div>
                             </div>:null
                         }
                   </div>
                    <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Recommended Products<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.recomendedProduct}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ recomendedProduct: this.state.recomendedProduct == false? true:false })
                                }}
                            />
                        </div>

                         <div className='col-sm-3 py-2'>
                           <label>Delivery Slot <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                                checked={this.state.deliverySlotStatus}
                               onstyle='success'
                                offstyle='danger'
                                onChange={() => {
                                    this.setState({ deliverySlotStatus: this.state.deliverySlotStatus == false? true:false })
                                }}
                            />
                        </div>
                   </div>
                   <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Loyality Program<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.loyaltyProgram}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ loyaltyProgram:  this.state.loyaltyProgram == false? true:false})
                                }}
                            />
                        </div>

                         <div className='col-sm-3 py-2'>
                           <label>Pickup Address <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                                checked={this.state.pickUpAdress}
                               onstyle='success'
                                offstyle='danger'
                                onChange={() => {
                                    this.setState({ pickUpAdress: this.state.pickUpAdress == false? true:false })
                                }}
                            />
                        </div>
                   </div>

                    <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Delivery<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.delivery}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ delivery: this.state.delivery == false? true:false })
                                }}
                            />
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Mobile Notification <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.mobileNotrification}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ mobileNotrification: this.state.mobileNotrification == false? true:false })
                                }}
                            />
                        </div>
                   </div>
                   <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Email Notification<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.emailNotification}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ emailNotification:  this.state.emailNotification == false? true:false})
                                }}
                            />
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>SMS Notification <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                                checked={this.state.smsNotification}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ smsNotification: this.state.smsNotification == false? true:false })
                                }}
                            />
                        </div>
                   </div>
                    <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>COD<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.COD}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ COD:this.state.COD == false? true:false  })
                                }}
                            />
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Social Login <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                                checked={this.state.socialLogIn}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ socialLogIn: this.state.socialLogIn == false? true:false  })
                                }}
                            />
                        </div>
                   </div>
                   <div className='row py-2'>
                       <div className="form-group col-sm-6">
                                <label>Google Analytics key<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.googleAnalyticKey}  name="googleAnalyticKey"className="form-control " />
                         </div>
                         <div className="form-group col-sm-6">
                                <label>Facebook Pixel Key<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.feacebookPixleKey}   name="feacebookPixleKey"className="form-control " />
                         </div>
                    </div>
                    <div className='row py-2'>
                       <div className="form-group col-sm-6">
                                <label>Google Id<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.googleId}   name="googleId"className="form-control " />
                         </div>
                         <div className="form-group col-sm-6">
                                <label>Facebook Id<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.feacebookId}   name="feacebookId"className="form-control " />
                         </div>
                    </div>
                    <div className='row py-2'>
                       <div className="form-group col-sm-6">
                                <label>Google Analytics Pixel key<em style={{color:"tomato"}}>*</em></label>
                                <input type="text"  defaultValue={this.state.googleAnalyticPixleKey}  name="googleAnalyticPixleKey"className="form-control " />
                         </div>
                         <div className="form-group col-sm-6">
                                <label>Products title on home page <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.productTitleHomepage}   name="productTitleHomepage"className="form-control " />
                         </div>
                    </div>
                    <div className='row py-2'>
                       <div className="form-group col-sm-6">
                                <label>Number of categories on home page<em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.noOfCategory}   name="noOfCategory"className="form-control " />
                         </div>
                         <div className="form-group col-sm-6">
                                <label>Recommended products on home page <em style={{color:"tomato"}}>*</em></label>
                                <input type="text" defaultValue={this.state.reccemendProductNo}   name="reccemendProductNo"className="form-control " />
                         </div>
                    </div>
                     <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Email Mandatory For Place Order <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                                checked={this.state.emailMandetory}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ emailMandetory: this.state.emailMandetory == false? true:false })
                                }}
                            />
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Display store logo or name <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <div className='row'>
                                    <button onClick={(e)=>{e.preventDefault(),this.setState({storeLogo:"Logo"})}} className={`${this.state.storeLogo  == 'Logo' ? "btn bg-success mx-2 col-sm-5" : "btn col-sm-5 bg-danger text-light mx-2  " }`}>logo</button>
                                    <button onClick={(e)=>{e.preventDefault(),this.setState({storeLogo:"StoreName"})}} className={`${ this.state.storeLogo !== 'Logo'? "btn bg-success mx-2 col-sm-5" :"col-sm-5 btn bg-danger text-light mx-2"}`}>StoreName</button>
                                    </div>
                        </div>
                   </div>
                    <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>Enable Review & Rating<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.enableRatting}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ enableRatting: this.state.enableRatting == false? true:false})
                                }}
                            />
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Map enable in home page<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.mapEnable}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ mapEnable: this.state.mapEnable == false? true:false })
                                }}
                            />
                        </div>
                   </div>
                    <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>App Home Page Title<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.appTitle}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ appTitle: this.state.appTitle == false? true:false})
                                }}
                            />
                        </div>
                        
                      <div className="form-group col-sm-6">
                                <label>Enter Home Page Title(25 Characters Limit)  <em style={{color:"tomato"}}>*</em></label>
                                <input type="text"  defaultValue={this.state.homePageTitle}  name="homePageTitle"className="form-control " />
                         </div>
                   </div>
                   <div className='row'>
                       <div className='col-sm-3 py-2'>
                           <label>App Home Page Sub Title<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.appSubTitle}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ appSubTitle :this.state.appSubTitle == false? true:false})
                                }}
                            />
                        </div>
                        </div>
                  <div className='row'>
                      <div className='col-sm-2 py-2'>
                           <label>App Home Page Header Right <em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-4'>
                            <div className='row'>
                            <button onClick={(e)=>{e.preventDefault(),this.setState({appHeader:"ContactNumber"})}} className={`${this.state.appHeader  == 'ContactNumber' ? "btn bg-success mx-2 col-sm-5" : "btn col-sm-5 bg-danger text-light mx-2  " }`}>Contact Number</button>
                            <button onClick={(e)=>{e.preventDefault(),this.setState({appHeader:"None"})}}  className={`${this.state.appHeader !== 'ContactNumber' ? "btn col-sm-5 bg-success  mx-2 " : "btn bg-danger mx-2 text-light col-sm-5" }`}>None</button>
                            </div>
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Show COD Payment status<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-2'>
                            <BootstrapSwitchButton
                               checked={this.state.showCOD}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ showCOD: this.state.showCOD == false? true:false })
                                }}
                            />
                        </div>
                    </div>
                      <div className='row'>
                           <p>Display Number on App Home Page<p style={{fontSize:"13px"}}>(Leave blank if you don't want to display)</p></p>
                      <div className='col-sm-2 py-2'>
                         
                         <input type="text"  defaultValue={this.state.displayNumber}   name="displayNumber"className="form-control " />
                       </div>
                       <div className='col-sm-4'>
                            <div className='row'>
                            <button onClick={(e)=>{e.preventDefault(),this.setState({numberType:"WhatsApp"})}} className={`${ this.state.numberType == 'WhatsApp'? "btn bg-success mx-2 col-sm-5" :"col-sm-5 btn bg-danger text-light mx-2"}`}>WhatsApp</button>
                            <button  onClick={(e)=>{e.preventDefault(),this.setState({numberType:"PhoneCall"})}}  className={`${ this.state.numberType !== 'WhatsApp'? "btn bg-success mx-2 col-sm-5" :"col-sm-5 btn bg-danger text-light mx-2"}`}>PhoneCall</button>
                            </div>
                        </div>
                         <div className='col-sm-3 py-2'>
                           <label>Show Age Restriction In Category<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-2'>
                            <BootstrapSwitchButton
                               checked={this.state.ageRistriction}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ ageRistriction:this.state.ageRistriction == false? true:false })
                                }}
                            />
                        </div>
                          <p style={{fontSize:"13px",color:"red"}}>Note : Please add number with country code</p>
                    </div>
                </div>
                <div className='row mx-2'>
                     <div className='col-sm-3 py-2'>
                           <label>Round of Amount in Invoice<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-2'>
                            <BootstrapSwitchButton
                               checked={this.state.innoviceAmount}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ innoviceAmount: this.state.innoviceAmount == false? true:false })
                                }}
                            />
                            </div>
                    
                </div>
                <hr></hr>
                   <div className='filebtndiv mx-4'>
                <button  onClick={(e)=>{this.submit(e)}}  className="btn btntop text-light col mx-2 my-2">Save</button>
            </div>
                </form>
        </div>
         )
    }
}
