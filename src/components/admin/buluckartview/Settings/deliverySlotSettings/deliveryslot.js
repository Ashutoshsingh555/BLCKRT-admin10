import React, { Component } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { NotificationManager } from 'react-notifications';
import {GetDeliverySlotSetting} from"../../../../services"  
import swal from 'sweetalert';
import TimeSlote from'./TimeSlote'

export default class deliveryslot extends Component {
     constructor() {
            super();
            this.state = {
            InstanceDelivery:"",
            OrderBuffertime:"",
            OrderTimeTaken:"",
            MaxOrder: "",
            appDisplayMsg:"",
            timeSlote:[{
                    timeSlotfrom:"",
                    timeSlotTo:"",
                    Mon:"",
                    Tue:"",
                    Wed:"",
                    Thu:"",
                    Fri:"",
                    Sat:"",
                    Sun:"",
                    
            }]
         
            };
        }
  
              onchangehandle(e){
           this.setState({ [e.target.name]: e.target.value })
        }

    async getlist(id=1){
        let result= await GetDeliverySlotSetting.GetSlotlistById(id);
        
        var  {OrderBuffertime,InstanceDelivery,OrderTimeTaken,MaxOrder,appDisplayMsg,timeSlots} = await  result.data[0]
      
        this.setState({
             InstanceDelivery:InstanceDelivery,
             OrderBuffertime:OrderBuffertime,
             OrderTimeTaken:OrderTimeTaken,
             MaxOrder:MaxOrder,
             appDisplayMsg:appDisplayMsg,
             timeSlote:timeSlots
             })
      }
     componentDidMount(){
         this.getlist()
     }

        handleChange = (e) => {
          if (["timeSlotfrom",  "timeSlotTo"  ,"Mon" ,"Tue", "Wed",  "Thu", "Fri" , "Sat", "Sun"].includes(e.target.name)) {
            let timeSlote = [...this.state.timeSlote]
            timeSlote[e.target.dataset.id][e.target.name] = e.target.value;
        }
       
    }
  
    
    addNewRow = () => {
        this.setState((prevState) => ({
          
            timeSlote: [...prevState.timeSlote, { 
                index: Math.random(), 
                timeSlotfrom: "",
                timeSlotTo: "",
                Mon:"",
                Tue:"",
                Wed:"",
                Thu:"",
                Fri:"",
                Sat:"",
                Sun:"",
                    
               }],
              
        }));
    }
    deteteRow = (index) => {
        this.setState({
            timeSlote: this.state.timeSlote.filter((s, sindex) => index !== sindex),
        });
     
    }

    handleSubmit = async (e) => {
        
        e.preventDefault();
    var {InstanceDelivery, OrderBuffertime,OrderTimeTaken, MaxOrder,appDisplayMsg,timeSlote} =  this.state
   
 
       
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            slotId:1,
            InstanceDelivery:InstanceDelivery,
            OrderBuffertime:OrderBuffertime,
            OrderTimeTaken:OrderTimeTaken,
            MaxOrder:MaxOrder,
            appDisplayMsg:appDisplayMsg,
            timeSlote:timeSlote
         };
        swal({
            title: "Are you sure?",
            text: "You want to Add DeliverySlot",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliverySlotSetting.updateSlotSetting(config);
                
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
            timeSlote: this.state.timeSlote.filter(r => r !== record),
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
            text: "You want to Delete  this  slote",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliverySlotSetting.deletebyid(id,config);
                
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
             <div className='mx-4 my-4'>
                 <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                   <li className="breadcrumb-item active">Delivery Time Setting</li>
                </ol>
              <form onChange={(e)=>{this.handleChange(e)}}>
               <div className=' mx-2 row'>
                       <div className='col-sm-4 py-2'>
                           <label  style={{fontWeight:800}} >Store provides instant delivery of the orders.<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.InstanceDelivery}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ InstanceDelivery: this.state.InstanceDelivery == false? true:false})
                                }}
                            />
                        </div>
                        
                    </div>
                     <div className='form-group  col-sm-3'>
                            <label>Order Buffer time<em style={{color:"tomato"}}>*</em></label><br></br>
                            <select  value={this.state.OrderBuffertime}  onChange={(e)=>{this.setState({OrderBuffertime:e.target.value})}} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                         
                                 <option>~Select The Time~</option>
                                 <option value="00:00">00:00</option>
                                 <option value="00:30">00:30</option>
                                 <option value="01:00">01:00</option>
                                 <option value="02:00">02:00</option>
                                 <option value="03:00">03:00</option>
                                 <option value="04:00">04:00</option>
                                 <option value="05:00">05:00</option>
                                 <option value="06:00">06:00</option>
                                 <option value="07:00">07:00</option>
                                 <option value="08:00">08:00</option>
                                 <option value="09:00">09:00</option>
                                 <option value="10:00">10:00</option>
                                 <option value="11:00">11:00</option>
                                 <option value="12:00">12:00</option>
                                 <option value="13:00">13:00</option>
                                 <option value="14:00">14:00</option>
                                 <option value="15:00">15:00</option>
                                 <option value="16:00">16:00</option>
                                 <option value="17:00">17:00</option>
                                 <option value="18:00">18:00</option>
                                 <option value="19:00">19:00</option>
                                 <option value="21:00">21:00</option>
                                 <option value="22:00">22:00</option>
                                 <option value="23:00">23:00</option>
                                 <option value="24:00">24:00</option>
                           </select>
                        </div>
                        <div className='form-group row mx-2  my-4'>
                           <div className='row'>
                             <div className='col-sm-3'>
                                <label  className="form-label">Order Buffer time taken on <em style={{color:"tomato"}}>*</em></label><br></br>
                              </div>
                               <div className='col-sm-9'>
                                    <div className='row'>
                                <div class="form-check col-sm-3 mx-2">
                                    <input className="form-check-input my-2" onClick={()=>this.setState({OrderTimeTaken:this.state.OrderTimeTaken === " On start time"?"On end time":" On start time"})} defaultChecked={this.state.OrderTimeTaken == "On start time"? true:null} type="radio" name="OrderTimeTaken1" id="flexRadioDefault11"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault11">
                                        On start time
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-3">
                                    <input className="form-check-input my-2" onClick={()=>this.setState({OrderTimeTaken:this.state.OrderTimeTaken === "On end time"?"On start time":"On end time"})}  type="radio"  defaultChecked={this.state.OrderTimeTaken !== "On start time"? true:null} name="OrderTimeTaken1" id="flexRadioDefault21"  />
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault21">
                                        On end time
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                         <div className='form-group col-sm-3 mx-2 my-2'>
                            <label  className="form-label">Max Orders in a slot <em style={{color:"tomato"}}>*</em></label><br></br>
                            <input type="number"   defaultValue={this.state.MaxOrder} style={{height:"35px",padding:"5px",width:"100%"}}  onChange={(e)=>{this.setState({MaxOrder:e.target.value})}}/><br></br>
                        </div>
                         <div className="form-group col-sm-8">
                            <label  style={{fontWeight:800}} clasName="form-label">App Display Message during Non-Operating Hours <em style={{color:"tomato"}}>*</em></label>
                        
                            <textarea type="text"  style={{ minHeight: "8em"}} onChange={(e) =>{this.setState({appDisplayMsg:e.target.value})}} defaultValue={this.state.appDisplayMsg} class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                        </div>
                        {/* ...............time slote dynamic */}
                          {/* dynamic form */}
                        <div className='mx-4'>
                             <hr></hr>
                             <a  onClick={this.addNewRow}  className="btn bg-success text-light">Add Slot<i class="fas fa-plus mx-2"></i></a>
                             <TimeSlote add={this.addNewRow} delete={this.clickOnDelete.bind(this)}   timeSlote={this.state.timeSlote} />
                             <hr></hr>
                             </div>
                             
                      </form>
                       
                        <div className='filebtndiv mx-4'>
                         
                            <button  onClick={(e)=>this.handleSubmit(e)} className="btn btntop text-light col px-4 my-2">Save</button>
                          
                      </div><br></br>
              </div>
        
       
     
    )
  }
}

