import React, { Component } from 'react'
import { GetLoyaltyCouponDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';


export default class EditCoupon extends Component {
     constructor(props){
        super(props);
        let self = this.props.location.state.row;
        this.state={
            id:self.id,
            loyaltyPoints: self.loyaltyPoints,
            AmountsOff: self.AmountsOff,
            couponCode:self.couponCode,
            status: self.status

        }
    }

    handleChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }
   

//    handleCode() {
   
//     const rand =`BkL_${Math.floor(100 + Math.random() * 9000)}`;
//     this.setState({ couponCode:rand });
//   }
//   componentDidMount(){
//       this.handleCode()
//   }
    handleBack() {
        this.props.history.goBack();
    }

    async submit(e){
        
        e.preventDefault();
   


         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             id:this.state.id,
            loyaltyPoints:this.state.loyaltyPoints,
            AmountsOff: this.state.AmountsOff,
            couponCode:this.state.couponCode,
            status:this.state.status
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update New Loyality Coupon",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetLoyaltyCouponDetails.getUpdateLoyaltyCoupon(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/loyalty/lc")

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
             <form onChange={(e)=>{this.handleChange(e)}}>
                    <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/loyalty/lc'>Loyalty Point Coupon</a></li>
                    <li className="breadcrumb-item active"><a>Edit Loyality Point Coupon</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <div className='row py-4 mx-4'>
                    <div className='col-sm-3'>
                         <div className="form-group my-4">
                            <label for="inputPassword5" class="form-label">Amount Off<em style={{color:"tomato"}}>*</em></label>
                            <input defaultValue={this.state.AmountsOff} type="number" id="inputPassword5"  name="AmountsOff" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                        </div>
                    </div>
                    <div className='col-sm-3'>
                         <div className="form-group my-4">
                            <label for="inputPassword5" class="form-label">Loyality Point<em style={{color:"tomato"}}>*</em></label>
                            <input type="number" defaultValue={this.state.loyaltyPoints} id="inputPassword5"  name="loyaltyPoints" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                        </div>
                    </div>
                </div>
                  <div className='form-group row mx-2  my-4'>
                           <div className='row'>
                             <div className='col-sm-3'>
                                <label  className="form-label">Order Buffer time taken on <em style={{color:"tomato"}}>*</em></label><br></br>
                              </div>
                               <div className='col-sm-9'>
                                    <div className='row'>
                                <div class="form-check col-sm-3 mx-2">
                                    <input className="form-check-input my-2"  onChange={()=>this.setState({status:this.state.status== true?false:true})} defaultChecked={this.state.status == true? true:null} type="radio" name="status1" id="flexRadioDefault11"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault11">
                                       Active
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-3">
                                    <input className="form-check-input my-2" onChange={()=>this.setState({status:this.state.status== false?true:false})}  type="radio"  defaultChecked={this.state.status !== true? true:null} name="status1" id="flexRadioDefault21"  />
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault21">
                                        InActive
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                 <hr className='mx-4'></hr>
                 <div className='row my-4 mx-4' style={{float:"right"}}>
                    <div className='col-sm-6'>
                        <button className="btntopsc btn text-light" onClick={(e)=>this.submit(e)}>Submit</button>
                    </div>
                        <div className='col-sm-6'>
                        <button className="btntopsc btn text-light" onClick={(e)=>this.handleBack(e)}>Close</button>
                    </div>
                </div>
             </form>
            </div>
        )
    }
}
