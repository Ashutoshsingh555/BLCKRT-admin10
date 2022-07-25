import React, { Component } from 'react'
import "./index.css"
import {GetInventoryStatusSettingDetails} from"../../../../services"
import swal from 'sweetalert';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { NotificationManager } from 'react-notifications';

export default class inventorystock extends Component {
      constructor(props){
        super(props)
        this.state ={
                id:1,
                SettingStatus:true

        }
    }
    async getlistdata(id=1){
        let list = await GetInventoryStatusSettingDetails.getInventorySetting(id)
     
        this.setState({SettingStatus:list.data[0].SettingStatus
              
            })

    }
    componentDidMount(){
        this.getlistdata()
    }
       
 async submit(e){
    
          e.preventDefault();
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
                 id:this.state.id,
                SettingStatus:this.state.SettingStatus
           
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update InvenTory Setting",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetInventoryStatusSettingDetails.GetUpdateStock(config);
                
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
                <div className='container mx-4 my-4'>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a>Stock Management</a></li>
                </ol>

                </div>
                  
                 <hr></hr>
                 <div className='row  mx-4 my-4'>
                     <div className='col-sm-2'>
                          <h6>Stock Management<em style={{color:"tomato"}}>*</em></h6>
                     </div>
                       <div className='col-sm-1'>
                             <BootstrapSwitchButton
                               checked={this.state.SettingStatus}
                               onstyle='success'
                               offstyle='danger'
                                onChange={() => {
                                    this.setState({ SettingStatus:this.state.SettingStatus === false? true:false  })
                                }}
                            />
                       </div><br></br>
                      <div className='row'>
                           <div className='col-sm-4'>
                            <button className="btntopsc btn text-light"  onClick={(e)=>{this.submit(e)}}>Save</button>
                       </div>

                      </div>
                 </div>
            </div>
        )
    }
}
