import React from "react"
import VarientDetails from "../../../form/VarientDetails";
import swal from 'sweetalert';
import ReccomendedForms from "../../../form/recomended/ReccomendedForms";
import CategoryListform from "../../../form/CategoryListform";
import RichTextEditor from '../../../../RichTextEditor';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { GetProductDetails } from '../../../../services';
import api from '../../../../ApiConfig';
import { Apis } from '../../../../../config';
import { NotificationManager } from 'react-notifications';
import TagsInput from"../../../form/TagsInput"








class addProduct extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            filselected:"",
            msgThumb:"",
            uploadPercentage: 0,
            msgvideoUpload: "",
            offset: 0,
            perPage: 30,
            msgvideoUpload: "",
            files:[],
            orgtableData: [],
            currentPage: 0,
            name: "",
            description: "",
            thumbNailphoto: "",
            lableType: "veg",
            isTex: '0',
            GSTrate:0,
            GSTtyp: "",
            HSNcode: "",
            videoUpload: "",
            categoryId: "",
            subCategoryId: "",
            tags: [],
            originPlace:"",
            aboutProduct:"",
            nutrientsDetals:"",
            storeUses:"",
            varientDetails: [{
                    index: Math.random(),
                    sort:0,
                    sku: "",
                    waightunitno: "",
                    unit:"",
                    mrp:0,
                    discount:0,
                    price:0,
                    stock:0,
                    minstock:0,
                    outofstock: ""
                }],
                reccomendedProduct: [],
        }
         this.setStateOfTags.bind(this);
        this.setStateOfCategory.bind(this);
        this.setStaterecomended.bind(this);
 
      
    }
    handleBack() {
            this.props.history.goBack();
        }
    //tag handler
    setStateOfTags = (tags) => {
       this.setState({ tags: tags });
    }
   
    //category/subcategoryid handler...
    setStateOfCategory = (value, cat) => {
        this.setState({ categoryId: cat, subCategoryId: value });
    }
    //reccomended product handler
    setStaterecomended = (Id) => {
        this.setState({ reccomendedProduct: Id })
    }
    //description handler
    handleContentChange = contentHtml => {
        this.setState({
            description: contentHtml
        });
    };
     //static epdf file handler...........
    ThumbnainVideoUpload = ({ target: { files } }) =>{
       let data = new FormData();
         data.append( 'photo', files[0] )
        api.post(Apis.postphoto, data).then(res => { 
           this.setState({ thumbNailphoto: res.data.photo,
                msgThumb: res.data.message })
             })
        }

       VideoUploadFile = ({ target: { files } }) =>{
         let data = new FormData();
         data.append( 'photo', files[0] )
        
        api.post(Apis.postphoto, data).then(res => { 
           this.setState({ videoUpload: res.data.photo,
                msgvideoUpload: res.data.message })
             })
        }
          caculationTable1 = (e) => {
           this.setState({mrpInputvalue:e.target.value})
          }

    handleChange = async(e) => {
    if (["sort",  "sku", "waightunitno", "unit", "mrp", "discount", "price", "stock", "minstock", "outofstock"].includes(e.target.name)) {
            let varientDetails =[...this.state.varientDetails]
           varientDetails[e.target.dataset.id][e.target.name] = e.target.value
           let dis = (Math.round((varientDetails[e.target.dataset.id].mrp * varientDetails[e.target.dataset.id].discount) / 100));
           varientDetails[e.target.dataset.id].price = varientDetails[e.target.dataset.id].mrp-dis
           this.setState({[varientDetails.price]:varientDetails[e.target.dataset.id].mrp-dis})
       } else if (["isTex"].includes(e.target.name)) {
            this.setState({ [e.target.name]: e.target.value })
            
        }else if (["files[]"].includes(e.target.name)) {
               const MAX_LENGTH = 10;
              if ((e.target.files).length > MAX_LENGTH) {
                    e.preventDefault();
                    NotificationManager.error(`Cannot upload files more than ${MAX_LENGTH}`)
                    return;
                }else{
                       this.setState({ files:e.target.files ,filselected:"your multiple Produc files have been sellected"});
                }
       
            
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }
     
       
    }
   
    addNewRow = () => {
         this.setState((prevState) => ({
            varientDetails: [...prevState.varientDetails, { index: Math.random(), sort:5,
                sku: "",
                waightunitno: "",
                unit:"",
                mrp:0,
                discount:0,
                price:0,
                stock:0,
                minstock:0,
                outofstock:""}],
        }));
        
         
      
    }
    deteteRow = (index) => {
        this.setState({
            varientDetails: this.state.varientDetails.filter((s, sindex) => index !== sindex),
        });
     
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
    const { name, description, thumbNailphoto, originPlace,aboutProduct, nutrientsDetals,storeUses, lableType, isTex, GSTrate, varientDetails,GSTtyp, HSNcode, videoUpload, categoryId, subCategoryId, tags, files, reccomendedProduct } = this.state;
      if(this.state.date==='' || this.state.description==='')
        {
            NotificationManager.error(" Error -Please Fill up  all Required Field!!!");
            return false;
        }
        for(var i=0;i<this.state.varientDetails.length;i++)
        {
                if(this.state.varientDetails[i].sort==='' || this.state.varientDetails[i].varient==='')
                {
                    NotificationManager.error("Error- Product Varient Fields are required!!!");
                    return false;
                }
        }
     const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('subCategoryId', subCategoryId);
        formData.append('name', name);
        formData.append('description', description);
        for (const file of this.state.files) {
            formData.append('file', file)
        }
        formData.append('originPlace',originPlace)
        formData.append('aboutProduct',aboutProduct)
        formData.append('nutrientsDetals',nutrientsDetals)
        formData.append('storeUses',storeUses)
        formData.append('HSNcode', HSNcode);
        formData.append('lableType', lableType);
        formData.append('isTex', isTex);
        formData.append('GSTrate', GSTrate);
        formData.append('GSTtyp', GSTtyp);
        formData.append('videoUpload', videoUpload);
        formData.append('photo', thumbNailphoto);
        tags.forEach(tag =>{formData.append('tags[]' ,tag)})
        formData.append(`varientDetails`, JSON.stringify(varientDetails))
        reccomendedProduct.forEach(rc =>{formData.append('reccomendedProduct[]',rc)})

        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
         };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.addProductList(formData ,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                          NotificationManager.success(list.mesage, 'Status');
                        this.props.history.push("/admin/mainproduct/list")
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    clickOnDelete(record) {
        this.setState({
            varientDetails: this.state.varientDetails.filter(r => r !== record)
        });
    }
    render() {
       const {varientDetails,prices}=this.state
       console.log(varientDetails)
      
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <button className='btntop btn text-light' onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" />Cancel</button>
                        <button type="submit" onClick={this.handleSubmit} className='btntop btn text-light mx-2'>Add</button>
                    </div>
                </div>

                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/mainproduct/list">Products</a></li>
                    <li className="breadcrumb-item active">Add Product</li>
                </ol>
                <hr></hr>

                <div className='container'>
                    <form  onChange={this.handleChange} >
                        <div className='row'>
                            <div className='col-sm-8'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <div className="form-group">
                                            <label htmlFor="name" class="form-label">Title <em style={{ color: "tomato" }}>*</em></label>
                                            <input type="text" id="name" name="name" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Description*</label>
                                            <RichTextEditor
                                                style={{ height: " 275.438px" }}
                                                className="w3-input w3-border"
                                                content={this.state.description}
                                                handleContentChange={this.handleContentChange}
                                                placeholder="insert text here..." />
                                        </div>
                                    </div>
   
                                     <div className='col-sm-8 my-4'>
                                        <div className="form-group">
                                            <label htmlFor="name" class="form-label">Product Origin<em style={{ color: "tomato" }}>*</em></label>
                                            <input type="text" id="originPlace" name="originPlace" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div>


                                
                                       <div className="col-sm-12 ">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">About Product Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group">
                                             <textarea type="text"   id="collapseContent" name="aboutProduct" placeholder="Write Product Details Here...."  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>
                                         <div className="col-sm-12 my-2">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent2" role="button" aria-expanded="false" aria-controls="collapseContent">Nutrients and Proteins Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group " >
                                             <textarea type="text"  id="collapseContent2" placeholder="Write Nutrients and Proteins Details Here..."  name="nutrientsDetals"  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>
                                         <div className="col-sm-12">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent3" role="button" aria-expanded="false" aria-controls="collapseContent">Storage and Uses Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group">
                                             <textarea type="text"   id="collapseContent3"  name="storeUses" placeholder="Write Storage Details Here..."  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>
                                  <div className='col-sm-8 py-4'>
                                        <div className="form-group row">
                                           <label className="my-2">Lables</label>
                                           <label className={`${this.state.lableType  == 'None' ? "btn bg-success text-light mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
										      <input type="radio" id="lableType" hidden name="lableType" autocomplete="off" value="None" /> None
									      </label>
                                          <label  className={`${this.state.lableType  == 'veg' ? "btn bg-success text-light mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
										      <input type="radio"  hidden id="lableType" name="lableType" value="veg" autocomplete="off" /> veg
									      </label>
                                          <label  className={`${this.state.lableType  == 'None Veg' ? "btn bg-success text-light mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
                                               <input type="radio" hidden id="lableType" name="lableType" value="None Veg" autocomplete="off" /> None Veg
										   </label>

                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword5" class="form-label">Tags</label>
                                          <TagsInput  setStateOfTags={this.setStateOfTags}/>
                                        </div>
                                    </div><br></br>
                                   <div className='row my-4'>
                                        <div className='col-sm-3 py-2'>
                                            <label>is Taxt Enable<em style={{color:"tomato"}}>*</em></label>
                                        </div>
                                        <div className='col-sm-3'>
                                                <BootstrapSwitchButton
                                                checked={this.state.isTex == '1'?true:false}
                                                onstyle='success'
                                                offstyle='danger'
                                                    onChange={() => {
                                                        this.setState({ isTex: this.state.isTex == '1'? '0':'1' })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                  {
                                      this.state.isTex === '1'?
                                      <div>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label className="form-label">GST Rate<em style={{ color: "tomato" }}>*</em></label>
                                                <input type="number" className=" w3-input w3-border form-control" name="GSTrate" id="GSTrate" />
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label className="form-label">GST Rate Type <em style={{ color: "tomato" }}>*</em></label>
                                                <select id="GSTtyp" name="GSTtyp" className=" w3-input w3-border form-control">
                                                    <option value="Inclusive">Inclusive</option>
                                                    <option value="Exclusive">Exclusive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-4 py-2' style={{paddingLeft:"0"}}>
                                        <div className="form-group">
                                            <label htmlFor="HSNcode" class="form-label">HSN Code</label>
                                            <input type="text" name="HSNcode" className='w3-input w3-border form-control' id="HSNcode" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div><br></br></div>
                                    :null
                                  }
                                    
                                </div>
                                {/* now we are using  varient dynamic form */}
                                <div className='varientheader py-4' style={{ paddingBottom: "15px" }}>
                                    <a onClick={this.addNewRow} className="btn" style={{ float: 'right', color: "Tomato" }}><i class="fas fa-plus"></i>Add More</a>
                                    <h3 style={{ float: 'left', }}>Varients</h3>
                                </div>
                                <hr style={{ padding: "2px", border: "2 px solid black" }}></hr>
                                <div className="container py-2" style={{ border: "lightgray" }}>
                                    <VarientDetails pricess={this.state.prices}  add={this.addNewRow} delete={this.clickOnDelete.bind(this)} varientDetails={varientDetails} />
                                </div>``
                                <div className='recomended product'>
                                    <hr></hr>
                                    <h3>Recommended Products</h3>
                                    <hr></hr>
                                    <div className='ex1'>
                                        <ReccomendedForms setStaterecomended={this.setStaterecomended} />
                                    </div>
                                </div>
                            </div>
                            {/* right section cotegory */}
                            <div className='col-sm-4'>
                                <div>
                                    <h3>Category <em style={{ color: "tomato" }}>*</em></h3>
                                    <div className='mx-4 my-2'>
                                        <div className='categorycontainer'>
                                         
                                            <CategoryListform setStateOfCategory={this.setStateOfCategory} />
                                            <hr></hr>
                                        </div>
                                        {/* file upload */}
                                        <div className='imagecontainer'>
                                            <h3>Upload Images</h3>
                                            <hr />
                                            <div className="wrapper">
                                                <div className="drop">
                                                    <div className="cont">
                                                        <i className="fas fa-cloud-upload-alt"></i>
                                                        <div className="tit">
                                                            Drag & Drop
                                                        </div>
                                                        <div className="desc">
                                                            your files to Assets, or
                                                        </div>
                                                        <div className="browse">
                                                            click here to browse
                                                        </div>
                                                    </div>
                                                 <input id="files"  multiple name="files[]" type="file" />
                                                </div>
                                            </div>
                                            {this.state.filselected ? <i>{this.state.filselected}</i>:
                                            <p>Drag & Drop files here or click to browse.
                                                Note: Max 4 images are allowed.</p>
                                                }
                                            <hr></hr>
                                        </div>
                                        <div className='uploadfile'>
                                            <h3>Upload Video </h3>
                                              <input type="file" className="form-control" onChange={this.VideoUploadFile}  />
                                            <p style={{ color: "blue",fontStyle:"italic",fontWeight:"bold" }}>{this.state.msgvideoUpload}</p>
                                               <div className='upload thambnail my-4'>
                                                <h3>Video Thumbnail Image</h3>
                                                <div className="file-area">
                                                    <div className="form-group">
                                                        <input type="file" className="form-control" onChange={this.ThumbnainVideoUpload} />
                                                        <div className="file-dummy">
                                                            <i className="fas fa-plus mx-4 my-4"></i><br></br>
                                                            <span className="default">Click to select a file, or drag it here</span>
                                                            <span className="success">Great, your file is selected</span>
                                                        </div>
                                                        <p style={{ color: "blue",fontStyle:"italic",fontWeight:"bold" }}>{this.state.msgThumb}</p>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default addProduct