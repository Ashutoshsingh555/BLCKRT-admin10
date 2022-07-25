import React, { Component } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import "./refer.css"
import {GetReferAndEarn} from"../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';


export default class referEarn extends Component {
    constructor(props){
        super(props)
        this.state ={
                discount:"",
                DaysValidity:"",
                Message:"",
                Notification:"",
                status:false

        }
    }
    async getlistdata(id=1){
        let list = await GetReferAndEarn.getReferList(id)
        this.setState({
                id:list.data.id,
                discount:list.data.discount,
                DaysValidity:list.data.DaysValidity,
                Message:list.data.Message,
                Notification:list.data.Notification,
                status:list.data.status
            })

    }
    componentDidMount(){
        this.getlistdata()
    }
       

    handleChangecontain(e){
       this.setState({ [e.target.name]: e.target.value })
    }


      async submit(e){
    
          e.preventDefault();
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
                id:this.state.id,
                discount:this.state.discount,
                DaysValidity:this.state.DaysValidity,
                Message:this.state.Message,
                Notification:this.state.Notification,
                status:this.state.status
           
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update Refer & Earn",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetReferAndEarn.GetUpdateList(config);
                
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
           <div>
              <ol className="breadcrumb mb-30 mx-4 my-4">
                     <li className="breadcrumb-item"><a href="/">Home</a></li>
                     <li className="breadcrumb-item active"><a>Refer And Earn</a></li>
                </ol>
                <form onChange={(e)=>this.handleChangecontain(e)}>
                    <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Refer & Earn Info</h6>
                        </div>
                        <div className='referbody row '>
                            <div className='col-sm-3'>
                                <label>Amounts *</label>
                                <input  name='discount' type="number" defaultValue={this.state.discount}/>
                            </div>
                            <div className='col-sm-2'>
                                 <label>Days Validity*</label>
                                <input name='DaysValidity' type="number"  defaultValue={this.state.DaysValidity}/>
                            </div>
                        </div>
                    </div>
                    <div className='notecontainer mx-4 py-4'>
                         <fieldset className='px-4'>
                             <div className='lgfield'>
                                <legend>Note:-</legend><br></br><br></br>
                            </div>
                          
                            <a>Amounts =</a><br></br>
                            <a>Days Validity =</a><br></br>
                            <a>Store Name =</a><br></br>
                            <a>Store  Url=</a><br></br>
                            <a>Users'refer code =</a><br></br>
                     </fieldset>
                </div>
                 <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Shared Message</h6>
                        </div>
                        <div className='referbody row '>
                            <div className='mx-2 my-2'>
                                <label>Message</label>
                                   <div className="form-group">
                                        <textarea id="story" name="Message"
                                                rows="5" cols="142"  defaultValue={this.state.Message}>
                                      
                                        </textarea>
                                  </div>
                            </div>
                        </div>
                    </div>
                      <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>App Notifications</h6>
                        </div>
                        <div className='referbody row '>
                            <div className='mx-2 my-2'>
                                <label>Notifications Text</label>
                                   <div className="form-group">
                                        <textarea id="story" name="Notification" defaultValue={this.state.Notification}
                                                rows="5" cols="142">
                                      
                                        </textarea>
                                          {/* <div  style={{float:"right"}}>
                                            <buton  className="btn btntop text-light  mx-4 px-4 my-2">Save & Send Notification</buton>
                                        </div> */}
                                  </div>
                            </div>
                        </div>
                    </div>
                    
                     <div className="containerrefer mx-4 my-4">
                        <div className='refertitle'>
                            <h6>Status</h6>
                        </div>
                        <div className='referbody row '>
                             <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.status}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ status:this.state.status === false? true:false  })
                                }}
                            />
                        </div>
                        </div>
                    </div>
                     <div className='row my-4 mx-4' style={{float:"right"}}>
                            
                                 <div className='col-sm-6'>
                                    <button className="btntopsc btn text-light"  onClick={(e)=>{this.submit(e)}}>Save</button>
                                </div>
                            </div>

               </form>
           
            </div>
        )
    }
}
    