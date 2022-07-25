import React, { Component } from 'react'
import"../setting.css"
import RichTextEditor from '../../../../RichTextEditor';
import api from '../../../../ApiConfig';
import { Apis } from '../../../../../config';
import { getStoreinformation ,GetDeliveryAreas } from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class storeInformation extends Component {
    constructor(props){
        super(props);
        this.state={
            slelectzon:"",
            filtercityList:[],
            countaryList:[],
            storeDetails:[],
             StoreName:"",
            StoreContactPerson:"",
            StoreContactNumber:"",
            StoreEmail:"",
            Location:"", 
            City:"",
            State:"",
            Country:"",
            Timezone:"",
            Zipcode:"",
            Currency:"",
            AppShareLink:"", 
            AndroidShareLink:"" , 
            phoneShareLink:"",
            ShowCurrency:"",
            UploadStoreLogo:"",
            photoUrl:"",
            AboutUs:""
        }
    }
    //description handler
    handleContentChange = contentHtml => {
        this.setState({
            AboutUs: contentHtml
        });
    };
    
     //static logo file handler...........
    logoUploade = ({ target: { files } }) =>{
         let data = new FormData();
         data.append( 'photo', files[0] )
        
        api.post(Apis.postphoto, data).then(res => { 
           this.setState({ UploadStoreLogo: res.data.photo,
              })
             })
        }
    //app icon upload
    logoappiconUploade=({target:{files}}) =>{
            let data = new FormData();
         data.append( 'photo', files[0] )
        
        api.post(Apis.postphoto, data).then(res => { 
        this.setState({ photoUrl: res.data.photo,
              })
             })
        }
    //
  
    async getstoredata(id=1){
       let result = await getStoreinformation.getStoreDetails(id)
       const {  StoreName,StoreContactPerson, StoreContactNumber,StoreEmail,Location,City,State, Country, Timezone,Zipcode, Currency,
            AppShareLink, AndroidShareLink, phoneShareLink, ShowCurrency, UploadStoreLogo,photoUrl, AboutUs} =result.data
       this.setState({
             StoreName:StoreName,
            StoreContactPerson:StoreContactPerson,
            StoreContactNumber:StoreContactNumber,
            StoreEmail:StoreEmail,
            Location:Location, 
            City:City,
            State:State,
            Country:Country,
            Timezone:Timezone,
            Zipcode:Zipcode,
            Currency:Currency,
            AppShareLink:AppShareLink, 
            AndroidShareLink:AndroidShareLink, 
            phoneShareLink:phoneShareLink,
            ShowCurrency:ShowCurrency,
            UploadStoreLogo:UploadStoreLogo,
            photoUrl:photoUrl,
            AboutUs:AboutUs
       })

    }
    
   async getAllCountaryGlobel(){
       let result = await GetDeliveryAreas.getIndiaCountryList()
       this.setState({countaryList: result.data})

    }
   

 

    componentDidMount(){
        this.getstoredata();
        this.getAllCountaryGlobel();
     
    }

    

    handleChangecontain(e){
       this.setState({ [e.target.name]: e.target.value })
    }


      async submit(e){
         e.preventDefault();
         const {  StoreName,StoreContactPerson, StoreContactNumber,StoreEmail,Location,City,State, Country, Timezone,Zipcode, Currency,
            AppShareLink, AndroidShareLink, phoneShareLink, ShowCurrency, UploadStoreLogo,photoUrl, AboutUs} = this.state

        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             infoId:1,
            StoreName:StoreName,
            StoreContactPerson:StoreContactPerson,
            StoreContactNumber:StoreContactNumber,
            StoreEmail:StoreEmail,
            Location:Location, 
            City:City,
            State:State,
            Country:Country,
            Timezone:Timezone,
            Zipcode:Zipcode,
            Currency:Currency,
            AppShareLink:AppShareLink, 
            AndroidShareLink:AndroidShareLink, 
            phoneShareLink:phoneShareLink,
            ShowCurrency:ShowCurrency,
            UploadStoreLogo:UploadStoreLogo,
            photoUrl:photoUrl,
            AboutUs:AboutUs
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update New city",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await getStoreinformation.getUpdateStoredetails(config);
                
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
           <div className='mx-2 py-4'>
          <div className='mx-2'>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                   <li className="breadcrumb-item active">Store Information</li>
                </ol>
          </div>
          <hr></hr>
          
               
          <div className='mx-4 my-4'>
                <form  onChange={(e)=>{this.handleChangecontain(e)}}>
                    <div className='row'>
                        <div className="form-group col-sm-4">
                        <label>Store Name<em style={{color:"tomato"}}>*</em></label>
                        <input type="text" defaultValue={this.state.StoreName}  name="StoreName"  className="form-control " />
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Store Contact Person <em style={{color:"tomato"}}>*</em></label>
                        <input type="text"  defaultValue={this.state.StoreContactPerson}  name="StoreContactPerson"className="form-control " />
                        </div>
                        <div className="form-group col-sm-4">
                        <label>Store Contact Number <em style={{color:"tomato"}}>*</em></label>
                        <input type="text"  defaultValue={this.state.StoreContactNumber} name="StoreContactNumber"  className="form-control " />
                        </div>
                    </div>
                    <div  className='row'>
                        <div className="form-group col-sm-4">
                        <label>Store Email *</label>
                        <input type="text"  defaultValue={this.state.StoreEmail} name="StoreEmail" className="form-control " />
                        </div>
                        <div className="form-group col-sm-4">
                        <label>Location<em style={{color:"tomato"}}>*</em></label>
                        <input type="text"  defaultValue={this.state.Location} name="Location"  className="form-control " />
                        </div>
                        <div className="form-group col-sm-4">
                        <label>City<em style={{color:"tomato"}}>*</em></label>
                        <input type="text" defaultValue={this.state.City}  name="City"   className="form-control " />
                        </div> 
                         
                    </div>
                    <div  className='row'>
                        <div className="form-group col-sm-4">
                            <label>State <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.State}  name="State"  className="form-control " />
                        </div>
                        <div className='form-group col-sm-4'>
                            <label>Country <em style={{color:"tomato"}}>*</em></label><br></br>
                            <select   name="Country"  value={ this.state.Country?this.state.Country:this.state.storeDetails.Country} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                                <option >select Country</option>
                              {this.state.countaryList.map((row,id) =>(
                                        <option  value={row.name}>{row.name}</option>
                                    ))}
                            </select>

                        </div>
                        {/* <div className="form-group col-sm-4">
                            <label>Timezone <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.storeDetails.Timezone} name="Timezone"  className="form-control " />
                        </div> */}
                        <div className='form-group col-sm-4'>
                            <label>Timezone <em style={{color:"tomato"}}>*</em></label><br></br>
                            <select   name="Timezone"  value={this.state.Timezone} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                                <option >select Country</option>
                                 <option value="Asia/kolkota">Asia/kolkota</option>
                            </select>

                        </div>
                       
                    </div>
                       <div  className='row'>
                        <div className="form-group col-sm-4">
                            <label>Zipcode  <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.Zipcode} name="Zipcode"  className="form-control " />
                        </div>
                        {/* <div className="form-group col-sm-4">
                            <label>Currency    <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  name="Currency"   className="form-control " />
                        </div> */}
                        <div className='form-group col-sm-4'>
                            <label>Currency <em style={{color:"tomato"}}>*</em></label><br></br>
                            <select   name="Currency" style={{padding:"4px",borderRadius:"2px", width:"100%"}}  value={ this.state.Currency?this.state.Currency:this.state.storeDetails.Currency}>
                                <option >select Currency</option>
                                <option value="INR(India)">INR(India)</option>
                            </select>

                        </div>
                        <div className="form-group col-sm-4">
                            <label>App Share Link <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.AppShareLink} name="AppShareLink"  className="form-control " />
                        </div>
                       
                    </div>
                       <div  className='row'>
                        <div className="form-group col-sm-4">
                            <label>Android Share Link <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.AndroidShareLink} name="AndroidShareLink"  className="form-control " />
                        </div>
                        <div className="form-group col-sm-4">
                            <label>Iphone Share Link   <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  defaultValue={this.state.phoneShareLink} name="phoneShareLink"   className="form-control " />
                        </div>
                      </div>
                      <div>
                        <label>Show Currency<em style={{color:"tomato"}}>*</em></label>
                        <div>
                            <button onClick={(e)=>{e.preventDefault(),this.setState({ShowCurrency:"Symbol"})}} className={`${this.state.ShowCurrency  == 'Symbol' ? "btn bg-success mx-2 col-sm-2" : "btn col-sm-2 bg-danger text-light mx-2  " }`}>Symbol</button>
                            <button onClick={(e)=>{e.preventDefault(),this.setState({ShowCurrency:"Abbreviation"})}} className={`${ this.state.ShowCurrency !== 'Symbol'? "btn bg-success mx-2 col-sm-2" :"col-sm-2 btn bg-danger text-light mx-2"}`}>Abbreviation</button>
                        </div>
                    </div>
                    <div className='py-4'>
                        <label>Upload Store Logo(recommended size 200*50) </label><br></br>
                         <input type="file" className='py-2'   onChange={(e)=>{this.logoUploade(e)}}/>
                        <div className='logocontainer col-sm-6'>
                          <img src={this.state.UploadStoreLogo}  alt='logo'/>
                        </div>
                    </div>
                     <div className='py-4'>
                        <label>Upload App Icon (size 512*512) </label><br></br>
                         <input type="file" className='py-2'   onChange={(e)=>{this.logoappiconUploade(e)}}/>
                        <div className='logocontainer col-sm-6'>
                          <img src={this.state.photoUrl} width="200px" height="200px"  alt='logo'/>
                           {/* <input className="btn-inputfile" id="file02" type="file" name="file"/> */}
                        </div>
                    </div>
                      <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">About Us*</label>
                                            <RichTextEditor
                                                style={{ height: " 275.438px" }}
                                                className="w3-input w3-border"
                                                content={this.state.AboutUs}
                                                handleContentChange={this.handleContentChange}
                                                placeholder="insert text here..." />
                                        </div>
                                    </div>
              </form>
              </div>
          <hr></hr>
           <div className='filebtndiv mx-4'>
                <button  onClick={(e)=>{this.submit(e)}}   className="btn btntop text-light col mx-2 my-2">Add</button>
            </div>
          
      
          
      </div>
    )
  }
}
