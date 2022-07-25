import React, { Component } from 'react'
import {GetDeliveryAreas ,GetRunnerDetails} from '../../../../services';
import { NotificationManager } from 'react-notifications';
import RichTextEditor from '../../../../RichTextEditor';
import swal from 'sweetalert';

export default class AddRunner extends Component {
    constructor(props){
        super(props);
        this.state={
            getcity:[],
                Name:"",
                avatar:"",
                phone:"",
                status:"",
                email:"",
                area:"",
               
        }
    }
     handleBack(e) {
        this.props.history.goBack();
    }
    async getdata(){
        let result= await GetDeliveryAreas.getAllcityManageList();
        this.setState({getcity:result.data})

    }
    componentDidMount(){
        this.getdata();
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

      async  filehandler(e){
       let str= await e.target.files[0]
        this.setState({avatar:str})
    }


    async submit(e){
      e.preventDefault();

        const formData = new FormData();
         await formData.append('Name', this.state.Name);
         await formData.append('email', this.state.email);
         await formData.append('phone', `+91${this.state.phone}`);
         await formData.append('avatar', this.state.avatar);
         await formData.append('status',this.state.status)
         await formData.append('area',this.state.area)

    const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
          
           };
        swal({
            title: "Are you sure?",
            text: "You want to add Runner",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetRunnerDetails.addRunner(formData ,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/rms")

                        },1000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
  render() {
      const {getcity}= this.state;
    return (
      <div className='mx-2 my-4'>
          <div>
               <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/rms'>Runner Management</a></li>
                    <li className="breadcrumb-item active"><a>Add Runner</a></li>
                </ol>
          </div>
          <form onChange={(e) => this.handleChange(e)}>
              <div className='col-sm-6'>
                    <div className="form-group">
                    <label htmlFor="Name" class="form-label">Full Name*  <em style={{ color: "tomato" }}>*</em></label>
                    <input type="text" id="Name"  name="Name" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                </div>
            </div>
              <div className='col-sm-6 my-2'>
                    <div className="form-group">
                    <label htmlFor="Name" class="form-label">Email*  <em style={{ color: "tomato" }}>*</em></label>
                    <input type="text" id="email" name="email" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                </div>
            </div>
            <div className='col-sm-6 my-2' >
                    <div className="form-group">
                    <label htmlFor="phone" class="form-label">Phone Number* <em style={{ color: "tomato" }}>*</em></label>
                    <div className='row'>
                        <span className='col-sm-1 p-2 ml-2' style={{fontSize:"bold",background:"blue",color:"white" }}>+91</span>
                         <span className='col'>
                              <input type="text" id="phone" name="phone" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                         </span>
                    </div>
                   
                </div>
            </div>
             <div className="file-area col-sm-3">
                <div className="form-group">
                    <label className="form-label">Upload Image*</label>
                    <input type="file" className="form-control"  onChange={(e)=>{this.filehandler(e)}} />
                    <div className="file-dummy">
                        <span className="default">Click to select a file, or drag it here</span>
                        <span className="success px-4 py-4"><i class="fas fa-plus"></i></span>
                    </div>
                </div>
            </div>
            <div className="form-group col-sm-4 my-4">
                <label for="inputPassword5" className="form-label">Select Area*</label>
                <select id="status"  name="area" className=" w3-input w3-border form-control">
                     <option>-Select City-</option>
                   {
                       getcity.map((row,id) =>(
                           <option type="checkBox" key={row.id} value={row.name}>{row.City}</option>
                          ))
                   }
                  
                    
                </select>
            </div>
            <div className="form-group col-sm-6">
                <label for="inputPassword5" className="form-label">Status*</label>
                <select id="status"  name="status" className=" w3-input w3-border form-control">
                    <option>-Select status-</option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                </select>
            </div>
            <hr></hr>
            <div className='row mx-4 my-4'>
                <div className='col-sm-1 mx-2'>
                    <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Submit</button>
                </div>
                    <div className='col-sm-1'>
                    <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">Cancel</button>
                </div>
            </div>
          </form>

      </div>
    )
  }
}
