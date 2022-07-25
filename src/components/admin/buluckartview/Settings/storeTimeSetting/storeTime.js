import React, { Component } from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { NotificationManager } from 'react-notifications';
import {GetDeliverySlotSetting} from"../../../../services"  
import swal from 'sweetalert';

export default class storeTime extends Component {
    constructor(props){
        super(props);
        this.state ={
         OrderTimeSetingStatus:false,

        }
    }
    
    async getlist(id=1){
        let result= await GetDeliverySlotSetting.GetSlotlistById(id);
        
        this.setState({OrderTimeSetingStatus:result.data[0].OrderTimeSetingStatus})
        
    
      }
     componentDidMount(){
         this.getlist()
     }


       handleSubmit = async (e) => {
        
        e.preventDefault();
   
  const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            slotId:1,
            OrderTimeSetingStatus:this.state.OrderTimeSetingStatus
            
           
         };
        swal({
            title: "Are you sure?",
            text: "You want to update store 24 X 7 open to take orders ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliverySlotSetting.updateTimeSetting(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                             window.location.reload(false);

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
                   <li className="breadcrumb-item active">Store Time Setting</li>
                </ol>
               <div className='row'>
                       <div className='col-sm-4 py-2'>
                           <label>Is your store 24 X 7 open to take orders ?<em style={{color:"tomato"}}>*</em></label>
                       </div>
                       <div className='col-sm-3'>
                            <BootstrapSwitchButton
                               checked={this.state.OrderTimeSetingStatus}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ OrderTimeSetingStatus: this.state.OrderTimeSetingStatus == false? true:false})
                                }}
                            />
                        </div>
                        </div>
                         <hr></hr>
                   <div className='filebtndiv mx-4'>
                <button className="btn btntop text-light col mx-2 my-2" onClick={(e)=>this.handleSubmit(e)}>Save</button>
            </div>
            </div>
        )
    }
}
