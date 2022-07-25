import React, { Component } from 'react';
import { GetUploadInventoryImage } from '../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import "./addimage.css"

export default class addimage extends Component {
    constructor(props){
        super(props)
        this.state={
            image:"",
            filselected:""
        }
    }
     handleBack() {
        this.props.history.goBack();
    }
    onChangehandle =  (e) =>{
          const MAX_LENGTH = 100;
      if ((e.target.files).length > MAX_LENGTH) {
                    e.preventDefault();
                   NotificationManager.error(`Cannot upload files more than ${MAX_LENGTH}`)
                    return;
                }else{
                       this.setState({ image:e.target.files ,filselected:"Your multiple Inventory images have been selected Successfully"});
                }
       
    }

    submit = async (e) =>{
      e.preventDefault();
       const formData = new FormData();
         for (const file of this.state.image) {
            await formData.append('photo',file);
        }
      
         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
         };
        swal({
            title: "Are you sure?",
            text: "You want to Upload New Inventory Image",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
      
                if (success) {
                    let list = await GetUploadInventoryImage.addinventoryImage(formData ,config);
                
                    if (list) {
                        NotificationManager.success(list.mesage, 'Status');
                        this.setState({ isLoaded: false })
                        this.props.history.push("/admin/upload/create")
                         
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    
    }


    render() {
        return (
            <div className='addinvetoryimage'>
                  <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/admin/upload/create">Image list</a></li>
                    <li className="breadcrumb-item active">AddImage</li>
                </ol>
                <div className='dropimgefile'>
                    <form>
                        <div class="file-area">
                            <div class="form-group">
                                <label className="form-label">Select Image*</label>
                                   <input id="files"  multiple name="files[]" type="file"  onChange={(e)=>{this.onChangehandle(e)}} className="form-control"  />
                                <div class="file-dummy">
                                     {
                                    this.state.image? <span class="success my-4">{this.state.filselected}</span>: <span class="success my-4">Drop files here to upload</span>
                                }
                                  
                                </div>
                               
                            </div>
                        </div>
                    </form>
                    <div className='filebtndiv mx-4 py-4'>
                          <buton  onClick={(e) => this.handleBack()} className="btn btntop text-light col mx-2 my-2">Cancel</buton>
                          <buton   onClick={(e)=> this.submit(e)} className="btn btntop text-light col mx-2 my-2">Add</buton>
                    </div>
                </div><br></br><br></br><br></br>
                <hr></hr>

            </div>
        )
    }
}
