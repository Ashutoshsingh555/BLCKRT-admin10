import React, { Component } from 'react'
import "../setting.css"
import {GetBannerDetails,GetCategoryDetails} from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class addEditBanners extends Component {
    constructor(props){
        super(props);
        // let self = this.props.location.state.row;
        this.state={
            // BannerId:self.id,
            categoryList:[],
            BannerType:"",
            imageCaption:"",
            filselected:"",
            photo:"",
            categoryId:"",
            status:true

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
        this.setState({photo:str})
    }
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
        
        e.preventDefault();
       
       const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             "BannerType":this.state.BannerType
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
                    let list = await GetBannerDetails.addBanner(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        NotificationManager.success(list.mesage, 'Status');
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/banner")

                        },1000)
                      
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
                    <li className="breadcrumb-item active"><a>Add Banner Type</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <div className='formbody'>
                    <div className='col-sm-6'>
                        <form onChange={(e)=>this.handleChange(e)}>
                            <div className="form-group col-sm-8">
                                <label for="inputPassword5" className="form-label">Banner Type*</label>
                                <select id="status"  name="BannerType" className=" w3-input w3-border form-control">
                                    <option value={0}>selecte type</option>
                                    <option value="topBanner">Top Banner</option>
                                    <option value="middle1">Middle1</option>
                                    <option value="middle2">Middle2</option>
                                    <option value="webFoterBanner">Web Footer Banner</option>
                                    <option value="aboutUsBanner">AboutUs Banner</option>
                                    <option value="CategoryBanner">Category Banner</option>
                                    <option value="OffersBanner">Offers Banner</option>
                                    
                                </select>
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