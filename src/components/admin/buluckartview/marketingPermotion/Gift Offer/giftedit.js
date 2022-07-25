import React, { Component } from 'react'
import "../../Settings/setting.css"
import {GetGiftDetails, GetCategoryDetails} from'../../../../services'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class giftedit extends Component {
    constructor(props){
        super(props);
       let self = this.props.location.state.row;
        this.state={
            id:self.id,
            offerType:self.offerType,
            offerName:self.offerName,
            categoryId:self.categoryId,
            sortdsc:self.sortdsc,
            dsc:self.dsc,
            brand:self.brand,
            qty:self.qty,
            mrp:self.mrp,
            discount:self.discount,
            totalPrice:self.totalPrice,
            status:self.status,
            photo:self.photo,
            categoryList:[],
            filselected:"",
          
         
      

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
          this.setState({photo:str,filselected:"Image  selected  Successfully"})
    }
  onChangehandle =  (e) =>{
          const MAX_LENGTH = 100;
      if ((e.target.files).length > MAX_LENGTH) {
                    e.preventDefault();
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
    const {  offerName, offerType,categoryId,status} = this.state 

    
         const formData = new FormData();
          await formData.append('giftId', this.state.id);
          await formData.append('offerType', offerType);
          await formData.append('categoryId',categoryId?categoryId:null );
          await formData.append('offerName', offerName);
          await formData.append('photo',this.state.photo);
          await formData.append('dsc',this.state.dsc);
           await formData.append('sortdsc',this.state.sortdsc);
          await formData.append('brand',this.state.brand);
          await formData.append('qty',this.state.qty);
          await formData.append('mrp',this.state.mrp);
          await formData.append('discount',this.state.discount);
          await formData.append('totalPrice',this.state.totalPrice);
    
         await formData.append('status',status)


         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
           };
        swal({
            title: "Are you sure?",
            text: "You want to edit Gift offers",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetGiftDetails.getUpdateGiftOffers(formData,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        NotificationManager.success(list.mesage, 'Status');
                        setTimeout(()=>{
                              this.props.history.push("/admin/marketing/giftlist")

                        },1000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    render() {
        console.log(this.state,",edit")
      return (
            <div className='settingbody'>
                 <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/marketing/giftlist'>Gift List</a></li>
                    <li className="breadcrumb-item active"><a>Edit Gift Product</a></li>
                </ol>
                <hr className='mx-4'></hr>
                <form onChange={(e)=>this.handleChange(e)}>
                    <div className='formbody mx-4'>
                     <div className='row my-2'>
                      <div className='col-sm-6'>
                         <div className="form-group">
                                <label htmlFor="name" class="form-label">Gift Offer Name<em style={{ color: "tomato" }}>*</em></label>
                                <input type="text" id="offerName" value={this.state.offerName} name="offerName" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                            </div>
                            </div>

                         </div>
                    
                    <div className='row my-2'>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="name" class="form-label">Offer Type<em style={{ color: "tomato" }}>*</em></label>
                                 <form class="d-flex" onChange={(e)=>{this.setState({offerType:e.target.value})}}>
                                            <select  defaultValue={this.state.offerType}  style={{padding:"4px",borderRadius:"2px", width:"100%"}} >  
                                            <option>Select Offer type</option>   
                                            <option value="Free">Free</option> 
                                            <option value="Paid">Paid</option>                               
                                        </select>
                                    </form>
                                </div>
                            
                        </div>
                           <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Category List<em style={{ color: "tomato" }}>*</em></label>
                                <form class="d-flex"  onChange={(e)=>this.setState({categoryId:e.target.value})}>
                                            <select value={this.state.categoryId}  style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                               
                                            <option >select Category</option>
                                        {this.state.categoryList.map((row,id) =>(
                                                    <option  value={row.id}>{row.name}</option>
                                                ))}
                                        </select>

                                        
                                        </form>
                                </div>
                            </div>

                         </div>
                         {/* second row */}
                          <div className='row my-4'>
                        <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Sort Description<em style={{ color: "tomato" }}>*</em></label>
                                <input type="text" id="sortdsc" value={this.state.sortdsc} name="sortdsc" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                            </div>
                        </div>
                           <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Description<em style={{ color: "tomato" }}>*</em></label>
                                   <input type="text" id="dsc"  value={this.state.dsc} name="dsc" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>

                         </div>
                           {/* second row */}
                          <div className='row my-2'> 
                            {
                                this.state.offerType ==='Paid'?<div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Brand<em style={{ color: "tomato" }}>*</em></label>
                                <input type="text" id="brand" value={this.state.brand} name="brand" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                            </div>
                        </div>:null
                       }
                        {
                                this.state.offerType ==='Paid'?
                           <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Quantity<em style={{ color: "tomato" }}>*</em></label>
                                   <input type="text" id="qty"  value={this.state.qty} name="qty" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>:null}

                         </div>
                           {/* second row */}
                            {
                                this.state.offerType ==='Paid'?
                          <div className='row my-2'>
                        <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Offer MRP<em style={{ color: "tomato" }}>*</em></label>
                                <input type="text" id="mrp" name="mrp"  value={this.state.mrp} class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                            </div>
                        </div>
                           <div className='col-sm-6'>
                             <div className="form-group">
                                <label htmlFor="name" class="form-label">Offer Discount<em style={{ color: "tomato" }}>*</em></label>
                                   <input type="text" id="discount" value={this.state.discount} name="discount" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>

                         </div>:null}
                           {/* second row */}
                          <div className='row my-2'>
                             {
                                this.state.offerType ==='Paid'?
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="name" class="form-label">Total price<em style={{ color: "tomato" }}>*</em></label>
                                    <input type="text" id="totalPrice"  value={this.state.totalPrice} name="totalPrice" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                </div>
                            </div>:null}
                                  <div className='col-sm-6'>
                                <div className="form-group">
                                    <label htmlFor="name" class="form-label">Status<em style={{ color: "tomato" }}>*</em></label>
                                    <div className='mx-4'>
                                         <BootstrapSwitchButton
                                          checked={this.state.status}
                                            onstyle='success'
                                            offstyle='danger'
                                                onChange={() => {
                                                    this.setState({ status:this.state.status == false? true:false  })
                                                }}
                                            />
                                </div>
                                    </div>
                            </div>
                        </div>
                        
                             <div class="file-area mx-2">
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
                           <div className='row my-4 py-4'>
                              <div className='col-sm-1 '>
                                    <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Submit</button>
                                </div>
                                    <div className='col-sm-1'>
                                    <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">Cancel</button>
                                </div>
                            </div>
                    </div>
                </form>
             </div>
        )
    }
}