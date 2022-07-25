import React, { Component } from 'react'
import "../setting.css"
import {GetBannerDetails,GetCategoryDetails} from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class BannerPhotoEdit extends Component {
    constructor(props){
        super(props);
        let self = this.props.location.state.historyRow;
        this.state={
            id:self.id,
            BannerId:self.bannerId,
            photo:self.photoUrl,
            imageCaption:self.imageCaption,
            status: self.status,
            categoryId:self.categoryId,
             categoryList:[],
            // categoryId:self.categoryId,
            // BannerType:self.BannerType,
            file:[],
            // imageCaption:self.imageCaption,
            // photo:self.bannerPhotosSettings,
             filselected:"",
            // status:self.status

        }
    }
      async getCategory() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({categoryList:list.data})
        
     }
     componentDidMount(){
         this.getCategory()
     }
    handleChange(e){
       this.setState({ [e.target.name]: e.target.value })
    }
    async  filehandler(e){
       let str= await e.target.files[0]
        this.setState({photo:str,filselected:"Banners image  selected  Successfully"})
    }
     //awsmultiplephoto delete
     async handlawsDeleteById(id) {
         console.log(id,"data")
       
        swal({
            title: "Are you sure?",
            text: "You want to delete Photo ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetBannerDetails.getDeletephoto(id);
                    if (value) {
                        this.setState({
                            photo:this.state.photo.filter(ele => ele.id !==id)
                        })
                         NotificationManager.success(value.mesage, 'Status');
                      
                        
                    }
                }
            });
    }
    
   //updateimage
   
     onChangehandle =  (e) =>{
          const MAX_LENGTH = 100;
      if ((e.target.files).length > MAX_LENGTH) {
                    e.preventDefault();
                    // alert(`Cannot upload files more than ${MAX_LENGTH}`);
                    NotificationManager.error(`Cannot upload files more than ${MAX_LENGTH}`)
                    return;
                }else{
                       this.setState({ photo:e.target.files ,filselected:"Banners image  selected  Successfully"});
                }
       
    }

    handleBack() {
        this.props.history.goBack();
    }
    async submit(e){
           const {  imageCaption,id, BannerId,categoryId,links,status} = this.state 
        
        e.preventDefault();
        const formData = new FormData();
         await formData.append('id', id);
         await formData.append('imageCaption', imageCaption);
         await formData.append('categoryId',categoryId?categoryId:null );
         await formData.append('bannerId', BannerId);
         await formData.append('photo',this.state.photo);
         await formData.append('status',status)
   


         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
               
           };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Banner",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetBannerDetails.getUpdateBanner(formData,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        NotificationManager.success(list.mesage, 'Status');
                        this.props.history.push("/admin/settings/banner")

                        
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    render() {
        console.log(this.state)
        return (
            <div className='settingbody'>
                 <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/banner'>Banner</a></li>
                    <li className="breadcrumb-item active"><a>Edit Banner Photos</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <div className='formbody'>
                    <div className='col-sm-6'>
                        <form onChange={(e)=>this.handleChange(e)}>
                         <div className="col-sm-8 my-4">
                                      <label className="form-label">Category Id*</label>
                                <form class="d-flex"  onChange={(e)=>this.setState({categoryId:e.target.value})}>
                                            <select value={this.state.categoryId}  style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                               
                                            <option >select Category</option>
                                        {this.state.categoryList.map((row,id) =>(
                                                    <option  value={row.id}>{row.name}</option>
                                                ))}
                                        </select>

                                        
                                        </form>
                                </div>
                            <div className="form-group col-sm-8">
                              
                                <label for="imageCaption" clasName="form-label">Image Caption <em style={{color:"tomato"}}>*</em></label>
                            
                                <input type="text" value={this.state.imageCaption} name="imageCaption" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                            </div>
                          
                             <div class="file-area mx-4">
                            <div class="form-group">
                                <label className="form-label">Select Image*</label>
                                   <input id="files"  multiple  type="file"  onChange={(e)=>{this.filehandler(e)}} className="form-control"  />
                                <div class="file-dummy">
                                     {
                                    this.state.filselected? <span class="success my-4">{this.state.filselected}</span>: <span class="success my-4">Drop files here to upload</span>
                                }
                                  
                                </div>
                               
                            </div>
                     
                            </div>
                                    <div className='my-2 py-2 m-4'>
                                 
                                    <div className="img_wrp mx-2">
                                        <div style={{width:"100%"}}> 
                                            
                                         {
                                            this.state.filselected? <img  width="100px" class="rounded float-left" height="105px"  src={ URL.createObjectURL(this.state.photo)} alt="img "/>: <img  width="100px" class="rounded float-left" height="105px" value ={this.state.photo} src={this.state.photo} alt="img "/>
                                         }
                                     </div>
                            </div>

                       
                           </div>
                                       <div className='row mx-2 py-2 my-4'>
                            
                                <div className='col-sm-2 '>
                                    <label>Status*</label>
                                </div>
                                <div className='col'>
                                    <div className='row mx-4'>
                                 <div class="form-check col-sm-4 mx-2">
                                   <input className="form-check-input my-2"  onClick={()=>this.setState({status:this.state.status== true?false:true})} defaultChecked={this.state.status == true? true:null} type="radio" name="status1" id="flexRadioDefault111"/>
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault111">
                                       Active
                                    </label>
                                    </div>
                                    <div class="form-check col-sm-4">
                                    <input className="form-check-input my-2" onClick={()=>this.setState({status:this.state.status== false?true:false})}  type="radio"  defaultChecked={this.state.status !== true? true:null} name="status1" id="flexRadioDefault651"  />
                                    <label className="form-check-label btn btntop text-light" for="flexRadioDefault651">
                                        InActive
                                    </label>
                                    </div>
                                  </div>
                               </div>
                            </div>
                       </form>
                    </div>
                    <hr className='mx-4'></hr>
                    <div className='row mx-4 my-4'>
                        <div className='col-sm-1 mx-2'>
                            <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Submit</button>
                        </div>
                            <div className='col-sm-1'>
                            <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">Cancel</button>
                        </div>
                    </div>
                </div>
                <hr className="mx-4 my-2"></hr>
            </div>
        )
    }
}
