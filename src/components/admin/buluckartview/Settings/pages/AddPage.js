import React, { Component } from 'react'
import RichTextEditor from '../../../../RichTextEditor';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import {GetSettingPageDetails} from '../../../../services'

export default class AddPage extends Component {
     constructor(props){
        super(props);
        this.state={
            Page:"",
            Message:"",
           

        }
    }
     handleBack() {
        this.props.history.goBack();
    }
     handleChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }

     handleContentChange = contentHtml => {
        this.setState({
            Message: contentHtml
        });
    };
     async submit(e){
        
    e.preventDefault();
   const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             Page:this.state.Page,
             Message:this.state.Message
           };
        swal({
            title: "Are you sure?",
            text: "You want to Add New page Containt",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingPageDetails.addPage(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/pages")

                        },3000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }

  render() {
    return (
         <div className='settingbody'>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                       <li className="breadcrumb-item"><a href='/admin/settings/pages'>Pages</a></li>
                    <li className="breadcrumb-item active">Add Page</li>
                </ol>
                <div className='container py-4'>
                    <form>
                        <div className='form-group col-sm-4'>
                            <label>Page <em style={{color:"tomato"}}>*</em></label><br></br>
                            <select   name="Page" onChange={(e) => this.setState({Page:e.target.value})} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                             
                                 <option>~Select Page~</option>
                                 <option value="Tearm and Conditions">Tearm & Conditions</option>
                                 <option value="Privacy Policy">Privacy Policy</option>
                                 <option value="Refund Policy">Refund Policy</option>
                                 <option value="Shiping Charge Policy">Shiping Charge Policy</option>
                            </select>

                        </div>
                        <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Message <em style={{color:"tomato"}}>*</em></label>
                                            <RichTextEditor
                                                style={{ height: " 275.438px" }}
                                                className="w3-input w3-border"
                                                content={this.state.Message}
                                                handleContentChange={this.handleContentChange}
                                                placeholder="insert text here..." />
                                        </div>
                                    </div>
                                   
                    <div className='row mx-4 my-4 py-4'>
                         <hr></hr>
                        <div className='col-sm-1'>
                            <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Submit</button>
                        </div>
                            <div className='col-sm-1'>
                            <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">Cancel</button>
                        </div>
                    </div>
                    </form>
                </div>
        </div>
    )
  }
}
