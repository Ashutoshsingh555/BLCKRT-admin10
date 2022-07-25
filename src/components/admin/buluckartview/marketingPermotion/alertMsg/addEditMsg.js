import React, { Component } from 'react'
import { GetAlertCouponNotification,GetUserLogin ,GetCustomerDetails} from"../../../../services"
import swal from 'sweetalert';

import { NotificationManager } from 'react-notifications';

export default class addEditMsg extends Component {
     constructor(props) {
        super(props);
        this.state = {
             title:"",
             alerttext:"",
             pushstatus:false,
             clients:[],
             userList:[],
             reason:"",
             message:"",
             checked:false
        }
    }
    handleChange= async(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    clintshandler= async(e)=>{
        let arr =[]
        arr.push(e.target.value)
          this.setState({clients:arr})

    }

     async getlistdata(){
        this.setState({ isloaded: false })
        let list = await GetCustomerDetails.getAllCustomerList()
        console.log(list)
       
    
            this.setState({ userList:  list.data })
        
        
    }

    async componentDidMount() {
        this.getlistdata();
    }

    
     async submit(e){
        
        e.preventDefault();
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
                
             }, 
             title:this.state.title,
             alerttext:this.state.alerttext,
             pushstatus:this.state.pushstatus,
             clients:this.state.clients,
             reason:this.state.reason,
             message:this.state.message
           
           };
        swal({
            title: "Are you sure?",
            text: "You want to Add New alert",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetAlertCouponNotification.addalert(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/marketing/alertmsg")

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
        handleChangesub =(e)=>{
        let checkid = e.target.value
        this.state.clients.push(checkid)
        this.setState({clients:this.state.clients})
        
        }
    render() {
        console.log(this.state)
      return (
              <div>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/marketing/addeditmsg'>Alert Messages</a></li>
                    <li className="breadcrumb-item active"><a>Add Alert Messages</a></li>
                </ol>
                <hr className='mx-4'></hr>
                  
              <form onChange={(e)=>{this.handleChange(e)}}>
                    <div className='row'>
                        <div className='col-sm-6'>
                                <div className='referbody row '>
                                    <div className="form-group">
                                        <label for="inputPassword5" class="form-label">Title <em style={{color:"tomato"}}>*</em></label>
                                        <hr></hr>
                                        <input type="text" id="title" class=" w3-input w3-border form-control" name='title' aria-describedby="passwordHelpBlock"/>
                                    </div>
                                </div>
                                <div className='mx-4 my-4'>
                                    <label>Notifications Text</label>
                                    <div className="form-group">
                                            <textarea id="alerttext" name="alerttext"
                                                    rows="5" cols="142">
                                        
                                            </textarea>
                                    </div>
                                </div>
                                <div className='mx-4 my-4'>
                                    <input type="checkbox" onChange={(e)=>{this.setState({pushstatus:this.state.pushstatus === true?false:true})}} defaultChecked={this.state.pushstatus}   />
                                    <label className=' mx-2' for="pushstatus">Push Notification</label>
                                </div>
                            </div>
                            <div className='col-sm-6 my-4'>
                                <div className="form-group">
                                    <label for="inputPassword5" class="form-label">Select Customers<em style={{color:"tomato"}}>*</em></label>
                                        <hr></hr>
                                     
                                        <div className="ex2  mx-4 pl-4">
                                           {this.state.userList.map((row,i) => 
                                                <div class="form-check row">
                                                    <input className="form-check-input mt-1" 
                                                        key={i}
                                                        type="checkbox"
                                                        value={row.phone}
                                                        checked={row.isChecked}
                                                    
                                                        onChange={(e) => this.handleChangesub(e, i)}
                                                    />
                                                     <label className='label-brand '>{row.Name}({row.phone})</label>
                                                </div>
                                            )}
                                           
                                        </div><br></br>
                                </div>
                                <div>
                                    <div className="form-group col-sm-8">
                                    <select id="status"  name="reason" className=" w3-input w3-border form-control">
                                            <option value="0">Select Reason</option>
                                            <option value="Upgrade Plan Request">Upgrade Plan Request</option>
                                            <option value="Feature Enquiry">Feature Enquiry</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-4 mx-4">
                                    <label>Messages *</label>
                                    <div className="form-group">
                                            <textarea  name="message"
                                                    rows="5" cols="43"></textarea>
                                        
                                    </div>
                        </div>
                        <div className='row my-2 mx-4'>
                        <div className='col-sm-2'>
                            <button className="btntopsc btn text-light"onClick={(e)=>{this.handleBack(e)}} >Close</button>
                        </div>
                            <div className='col-sm-2'>
                            <button className="btntopsc btn text-light"onClick={(e)=>{this.submit(e)}}>Save</button>
                        </div>
                    </div>
                       </div>
                       </div>
              </form>
                  
            </div>
        )
    }
}
