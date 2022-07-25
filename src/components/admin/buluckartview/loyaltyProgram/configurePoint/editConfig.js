import React, { Component } from 'react'
import { GetConfigLoyalityDetails} from "../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class editConfig extends Component {
    constructor(props){
        super(props)
        let self = this.props.location.state.row
        this.state={
              confId:self.id,
              Points:self.Points,
              Amounts: self.Amounts

        }
    }

     handlechange =(e) =>{
         this.setState({[e.target.name]:e.target.value})
     }
    
      async submit(e){
       
        const data= this.state
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             

        
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update Configue Points",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetConfigLoyalityDetails.getUpdatesConfig(data,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        NotificationManager.success("success");
                   
                             this.props.history.push("/admin/loyalty/configure")

                  
                      
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
    return (
      <div className='mx-2 my-2'>
        <ol className="breadcrumb mb-30 mx-4 my-4">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item active"><a href='/admin/loyalty/configure' >Loyalty Point</a></li>
                <li className="breadcrumb-item active">Edit ConfigPoints</li>
            </ol>
            <hr className='mx-4'></hr>
           <form onChange={(e)=> this.handlechange(e)}>
                <div className='row mx-4'>
                   <div className="form-group col-sm-4">
                        <label for="PickupAddress" clasName="form-label">Loyality Points <em style={{color:"tomato"}}>*</em></label>
                        <input type="number"  defaultValue={this.state.Points} name='Points' className=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                    </div>
                    <div className="form-group col-sm-4">
                        <label for="PickupAddress" clasName="form-label">Order Amounts <em style={{color:"tomato"}}>*</em></label>
                        <input type="number"  defaultValue={this.state.Amounts} name='Amounts' className=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                    </div>
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
    )
  }
}
