import React, { Component } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { NotificationManager } from 'react-notifications';
import {GetTaxSettingDetail} from"../../../../services"  
import swal from 'sweetalert';
import FixedRate from"./FixedRate"


export default class texSetting extends Component {
    constructor(props){
        super(props);
        this.state ={
            EnambleTex:false,
            GSTNumber:"",
            GSTState:"" ,
            AllowCustomerGST:false,
            ApplyDiscountOnOrder:"Before",
            SetTax:"" ,
            fixChargeId:"",
            fixedRate:[{
                Sort:"",
                FixedChargeLabel:"",
                FixedChargeAmount :""
            }]

        }
    }
      onchangehandle(e){
           this.setState({ [e.target.name]: e.target.value })
        }

    async getlist(id=1){
        let result= await GetTaxSettingDetail.GetTesListById(id);
         var {EnambleTex,GSTNumber,GSTState,AllowCustomerGST, ApplyDiscountOnOrder, SetTax, texDynamicSettings} = await result.data
          this.setState({ EnambleTex:EnambleTex,GSTNumber:GSTNumber,
              GSTState:GSTState,
              AllowCustomerGST:AllowCustomerGST,
              ApplyDiscountOnOrder:ApplyDiscountOnOrder,
              SetTax:SetTax,
              fixedRate:texDynamicSettings
             })
      }
     componentDidMount(){
         this.getlist()
     }

        handleChange = (e) => {

        if (["Sort",  "FixedChargeLabel", "FixedChargeAmount"].includes(e.target.name)) {
            let fixedRate = [...this.state.fixedRate]
            fixedRate[e.target.dataset.id][e.target.name] = e.target.value;
        }
        else {
            // this.setState({ [e.target.name]: e.target.value })
        }
    }
  
    
    addNewRow = () => {
        this.setState((prevState) => ({
            fixedRate: [...prevState.fixedRate, { index: Math.random(), Sort:5,
                FixedChargeLabel: "",
                FixedChargeAmount: "",
               }],
        }));
    }
    deteteRow = (index) => {
        this.setState({
            fixedRate: this.state.fixedRate.filter((s, sindex) => index !== sindex),
        });
     
    }

    handleSubmit = async (e) => {
        
        e.preventDefault();
    var {EnambleTex,GSTNumber,GSTState,AllowCustomerGST, ApplyDiscountOnOrder, SetTax, fixedRate} =  this.state
   
 
       
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             taxid:1,
             EnambleTex:EnambleTex,
             GSTNumber:GSTNumber,
             GSTState:GSTState,
             AllowCustomerGST:AllowCustomerGST,
             ApplyDiscountOnOrder:ApplyDiscountOnOrder,
             SetTax:SetTax,
             fixedRate:fixedRate
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
                    let list = await GetTaxSettingDetail.getUpdateTax(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                             window.location.reload(false);

                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
   async  clickOnDelete(record) {
        this.setState({
            fixedRate: this.state.fixedRate.filter(r => r !== record),
        })
         const id =await record.id
     
         const config = {
            Headers: {
                'content-type': 'multipart/form-data',
                 "Content-Type": "multipart/form-data; boundary=AaB03x" +
                        "--AaB03x" +
                        "Content-Disposition: file" +
                        "Content-Type: png" +
                        "Content-Transfer-Encoding: binary" +
                        "...data... " +
                        "--AaB03x--",
                        "Accept": "application/json",
                        "type": "formData"
           }}
          swal({
            title: "Are you sure?",
            text: "You want to Delete  this varient",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetTaxSettingDetail.deletebyid(id,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    render() {
        return (
            <div className='mx-2 my-4'>
                 <div className='mx-2'>
                    <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tax Settings</li>
                    </ol>
                </div>
                <form onChange={(e)=>{this.handleChange(e)}}>
                      <div className='mx-4 my-4'>
                            <div className='row'>
                        <div className='col-sm-3 py-2'>
                            <label  className="form-label">Enable Tax Setting <em style={{color:"tomato"}}>*</em></label>
                        </div>
                        <div className='col-sm-3'>
                                <BootstrapSwitchButton
                                checked={this.state.EnambleTex}
                                onstyle='success'
                                offstyle='danger'
                                   onChange={() => {
                                    this.setState({ EnambleTex: this.state.EnambleTex == false? true:false})
                                }}
                                />
                            </div>
                        </div>
                     
                     </div>
                         <div className='form-group col-sm-4 mx-2 my-2'>
                            <label  className="form-label">GST Number <em style={{color:"tomato"}}>*</em></label><br></br>
                            <input type="text"  onChange={(e)=>{this.setState(e)}}  defaultValue={this.state.GSTNumber} style={{height:"35px",padding:"5px",width:"100%"}} name='GSTNumber'/><br></br>
                        </div>
                          <div className='form-group col-sm-4 mx-2 my-2'>
                            <label  className="form-label">GST State *</label><br></br>
                            <input type="text"  onChange={(e)=>{this.onchangehandle(e)}} defaultValue={this.state.GSTState}  style={{height:"35px",padding:"5px",width:"100%"}} name='GSTState'/><br></br>
                        </div>
                         <div className='form-group row mx-2 my-4'>
                            <label  className="form-label">Allow Customer to Add GST Number <em style={{color:"tomato"}}>*</em></label><br></br>
                          
                           <div className='row mx-2'>
                               <div className='col-sm-6'>
                                    <div className='row'>
                                 <div class="form-check col-sm-3 mx-2">
                                    <input className="form-check-input my-2"  onClick={()=>this.setState({AllowCustomerGST :this.state.AllowCustomerGST === true?false:true})} defaultChecked={this.state.AllowCustomerGST  == true? true:null} type="radio" name="AllowCustomerGST 1" id="flexRadioDefault11"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault11">
                                       yes
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-3">
                                    <input className="form-check-input my-2" onClick={()=>this.setState({AllowCustomerGST :this.state.AllowCustomerGST === true?false:true})}  type="radio"  defaultChecked={this.state.AllowCustomerGST  !== true? true:null} name="AllowCustomerGST 1" id="flexRadioDefault21"  />
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault21">
                                        No
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                          <div className='form-group row mx-2 my-4'>
                            <label  className="form-label">Apply discount on order amount after adding tax or before adding tax <em style={{color:"tomato"}}>*</em></label><br></br>
                          
                           <div className='row mx-2'>
                               <div className='col-sm-6'>
                                    <div className='row'>
                                <div class="form-check col-sm-2 mx-2">
                                    <input className="form-check-input my-2"   onClick={(e)=>this.setState({ApplyDiscountOnOrder:"After"})} defaultChecked={this.state.ApplyDiscountOnOrder == 'After'? true:null} type="radio" name="ApplyDiscountOnOrder" id="flexRadioDefault31"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault31">
                                        After
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-2">
                                    <input className="form-check-input my-2"   onClick={(e)=>this.setState({ApplyDiscountOnOrder:"Before"})} type="radio"  defaultChecked={this.state.ApplyDiscountOnOrder !== 'After'? true:null}  name="ApplyDiscountOnOrder"  id="flexRadioDefault41"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault41">
                                        Before
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                         <div className='form-group row mx-2 my-4'>
                            <label  className="form-label">Set common tax rate for all products or product wise<em style={{color:"tomato"}}>*</em></label><br></br>
                          
                           <div className='row mx-2'>
                               <div className='col-sm-10'>
                                    <div className='row'>
                                <div class="form-check col-sm-3 mx-2">
                                    <input className="form-check-input my-2"  onClick={()=>this.setState({SetTax: "CommonTaxRate"})} defaultChecked={this.state.SetTax == 'CommonTaxRate'?true:null} type="radio" name="links" id="flexRadioDefault61"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault61">
                                        Common Tax Rate
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-3">
                                    <input className="form-check-input my-2" type="radio"    onClick={(e)=>this.setState({SetTax:"productTaxRate"})} defaultChecked={this.state.SetTax !=='CommonTaxRate'?true:null} name="links" id="flexRadioDefault51"  />
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault51">
                                        Product Wise Tax Rate
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                        {/* dynamic form */}
                        <div className='mx-4 my-2'>
                           <div className='varientheader ' style={{ paddingBottom: "15px" }}>
                                    <a  onClick={this.addNewRow}  className="btn" style={{ float: 'right', color: "Tomato" }}><i class="fas fa-plus"></i>Add More Fixed Charges</a>
                                    <h3 style={{ float: 'left', }}>
                                         <h5>Fix Charges</h5>
                                         <h6 style={{fontSize:"15px",fontStyle:"italic"}}>Note: Add fix charges like packaging</h6>
                                    </h3>
                                </div><br></br>
                                <hr></hr>
                                <div style={{ border: " 2px solid lightgray",padding:"10px" }}>
                                  <FixedRate add={this.addNewRow} delete={this.clickOnDelete.bind(this)}  fixedRate={this.state.fixedRate} />
                              
                                </div>

                        </div>
                      
                </form>
                   <div className='filebtndiv mx-2'>
                   <button  onClick={(e)=>this.handleSubmit(e)} className="btn btntop text-light col mx-2 my-2">Save</button>
                
            </div>
     
            </div>
        )
    }
}
