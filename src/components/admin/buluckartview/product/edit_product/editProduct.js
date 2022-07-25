import React from "react"
import '../add_product/addProduct.css'
import VarientDetailEdit from "../../../form/VarientDetailEdit";
import { ToastContainer, toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import swal from 'sweetalert';
import ReccomendedFormEdit from "../../../form/recomended/ReccomendedFormEdit";
import ReactPlayer from 'react-player/youtube'
import CategoryListEdit from "../../../form/CategoryListEdit";
import RichTextEditor from '../../../../RichTextEditor';
import { GetProductDetails ,SinglePhotoDetails} from '../../../../services';
import api from '../../../../ApiConfig';
import { Apis } from '../../../../../config';
import { NotificationManager } from 'react-notifications';
import suggestdata from "../../../form/tagsData";
import"../../../form/style.css"

class editProduct extends React.Component {
    constructor(props) {

        super(props);
         let self = this.props.location.state.row;
         this.state = {
            updateFile:"",
            loading:false,
            multyPID:"",
            multyimgUrl:"",
            msgThumb:"",
            uploadPercentage: 0,
            msgvideoUpload: "",
            offset: 0,
            filselected:"",
            perPage: 30,
            msgvideoUpload: "",
            files:[],
            orgtableData: [],
            currentPage: 0,
            id:self.id,
            name:self.name,
            description:self.description,
            thumbNailphoto: self.photo,
            lableType:self.lableType,
            isTex:self.isTex,
            GSTrate:self.GSTrate,
            GSTtyp: self.GSTtyp,
            HSNcode:self.HSNcode,
            videoUpload:self.videoUpload,
            categoryId: self.categoryId,
            subCategoryId:self.subCategoryId,
            tags: [],
            originPlace:self.originPlace,
            aboutProduct:self.aboutProduct,
            nutrientsDetals:self.nutrientsDetals,
            storeUses:self.storeUses,
            input: "",
            suggestions: [],
            productphotos:self.productphotos,
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
                rcdata:[]
              
        }
      
        this.setStateOfCategory.bind(this);
        this.setStaterecomended.bind(this);
      
    }
      handleBack() {
        this.props.history.goBack();
    }
    getdatarow(){
        let varientrow = this.props.location.state.row.varientModels;
        this.setState({varientDetails:varientrow})
      
    }
    async  getRecomendedrow(){
        let rcrow = await this.props.location.state.row.reccomendProducts.map(ele=>ele.reccomendedId)
        this.setState({reccomendedProduct:rcrow,rcdata:rcrow})
      
    }
      getTagrow(){
        let tagrow = this.props.location.state.row.tagModels;
        let strs = tagrow.map(ele => ele.name)
        this.setState({tags:strs})
      
    }

      getfilephoto(){
        let filerow = this.props.location.state.row.productphotos;
        this.setState({productphotos:filerow})
        
    }
    
    componentDidMount(){
        this.getdatarow()
        this.getRecomendedrow()
        this.getfilephoto()
        this.getTagrow()
    }
    //awsmultiplephoto delete
     async handlawsDeleteById(id,url) {
        await this.setState({multyPID:id,multyimgUrl:url})
        const data = await {
            id: this.state.multyPID,
            imgUrl: this.state.multyimgUrl}

        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
         };
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.deleteAwwsproductPhoto(data,config);
                    if (value) {
                               const img = this.state.productphotos.filter((ele) =>ele.id !== id );
                                this.setState({
                                productphotos: img
                                });
                           NotificationManager.success(value.mesage, 'Status');
                         
                    }
                }
            });
    }
    
    fileSelectedHandler = async (e) => {
      
        this.setState({ updateFile: e.target.files, filselected:"your multiple Produc files have been sellected" });

        this.setState({ isLoaded: true })
        const formData = new FormData();
       await  formData.append('productId', this.props.location.state.row.id);
        for (const file of this.state.updateFile) {
            formData.append('file', file)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to add Images",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getUploadProductImage(formData, config);
                    if (list) {
                        toast.success("successfully added");
                         this.setState({ isLoaded: false })
                     } else {
                        toast.error("error");
                    }
                }
            });
    }

   deletePhotoStaticVideo = async (e) => {
        const data = await { imgUrl: this.state.videoUpload}
         const config = {
           Headers: {
                'content-type': 'multipart/form-data',
             }, 
         };
        swal({
            title: "Are you sure ?",
            text: "You want to delete aws photo from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let value = await SinglePhotoDetails.deleteAwwssinglePhoto(data,config);
                    if (value) {
                          window.location.reload(false);
                          NotificationManager.success(value.mesage, 'Status');
                    }
                }
            });

   }
    deletePhotoStaticThumb = async (e) => {
        const data = await { imgUrl: this.props.location.state.row.thumbNailphoto}
        const config = {
           Headers: {
                'content-type': 'multipart/form-data',
             }, 
         };
        swal({
            title: "Are you sure ?",
            text: "You want to delete aws photo from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let value = await SinglePhotoDetails.deleteAwwssinglePhoto(data,config);
                    if (value) {
                         window.location.reload(false);
                         
                    }
                }
            });

   }

    //tag handle00r
  handleChanges = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
    this.handleSuggestion();
  };

  

  handleKeyDown = e => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
    const { tags, input, suggestions } = this.state;
    const text = suggestions.length ? suggestions[0].text : input;
    if ([9, 13].includes(e.keyCode) && text) {
      this.setState({
        tags: [...tags, text],
        input: ""
      });
    }
  };

  handleSuggestion = () => {
    const { input, tags } = this.state;
    const suggestFilterInput = suggestdata.filter(suggest =>
      suggest.text.toLowerCase().includes(input.toLowerCase())
    );

    const suggestFilterTags = suggestFilterInput.filter(
      suggest => !tags.includes(suggest.text)
    );

    this.setState({
      suggestions: suggestFilterTags
    });
  };
  handleDelete = i => {
    const { tags ,id} = this.state;
      const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            }, 
           id:id,
           tagName:tags[i]
         };
        
        swal({
            title: "Are you sure?",
            text: "You want to delete Tag",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getDeleteTagName(config);
                    if (list) {
                        this.setState({ isLoaded: false })
                        const newTags = tags.filter((tag, j) => i !== j);
                                this.setState({
                                tags: newTags
                                });
                        
                            NotificationManager.success(list.mesage, 'Status');
                          
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
   };


    AddTags = async  (text) => {
        this.setState({
        tags: [...this.state.tags, text],
        input: ""
        });
    
    };

    //category/subcategoryid handler...
    setStateOfCategory = (value, cat) => {
        this.setState({ categoryId: cat, subCategoryId: value });
    }
    //reccomended product handler
    setStaterecomended = (Id) => {
        this.setState({ reccomendedProduct: Id })
        // this.state.reccomendedProduct.push(Id)
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
        if(files[0].type === "video/mp4"){
             let data = new FormData();
        data.append( 'photo', files[0] )
    
    api.post(Apis.postphoto, data).then(res => { 
       this.setState({ videoUpload: res.data.photo,
            msgvideoUpload: "video uploaded successfully" })
            })
    }else{
        NotificationManager.error("Please Upload Video/mp4")
    }
           
        }
       

    handleChange = (e) => {

        if (["sort",  "sku", "waightunitno", "unit", "mrp", "discount", "price", "stock", "minstock", "outofstock"].includes(e.target.name)) {
            let varientDetails = [...this.state.varientDetails]
            varientDetails[e.target.dataset.id][e.target.name] = e.target.value
           let dis = (Math.round((varientDetails[e.target.dataset.id].mrp * varientDetails[e.target.dataset.id].discount) / 100));
           varientDetails[e.target.dataset.id].price = varientDetails[e.target.dataset.id].mrp-dis
           this.setState({[varientDetails.price]:varientDetails[e.target.dataset.id].mrp-dis})
        } else if (["isTex"].includes(e.target.name)) {
            this.setState({ [e.target.name]: e.target.value })
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


    
    handleSubmit = (e) => {
       e.preventDefault();
         const config = {
            Headers: {
                'content-type': 'multipart/form-data',
                 "Content-Type": "multipart/form-data; boundary=AaB03x" +
                        "--AaB03x" +
                        "Content-Disposition: file" +
                        "Content-Type: png" +
                        "Content-Transfer-Encoding: binary" +
                        "...data... " +
                        "--AaB03x--",
                        "Accept": "application/json",
                        "type": "formData"
           }, 
            productId:this.state.id,
            name:this.state.name?this.state.name:null,
            description:this.state.description?this.state.description:null,
            originPlace:this.state.originPlace?this.state.originPlace:null,
            aboutProduct:this.state.aboutProduct?this.state.aboutProduct:null,
            nutrientsDetals:this.state.nutrientsDetals?this.state.nutrientsDetals:null,
            storeUses:this.state.storeUses?this.state.storeUses:null,
            lableType:this.state.lableType?this.state.lableType:null,
            photo:this.state.thumbNailphoto?this.state.thumbNailphoto:null,
            isTex:this.state.isTex?this.state.isTex:null,
            GSTrate:this.state.GSTrate?this.state.GSTrate:null,
            GSTtyp:this.state.GSTtyp?this.state.GSTtyp:null,
            HSNcode:this.state.HSNcode?this.state.HSNcode:null,
            videoUpload:this.state.videoUpload?this.state.videoUpload:null,
            categoryId:this.state.categoryId?this.state.categoryId:null,
            subCategoryId:this.state.subCategoryId?this.state.subCategoryId:null,
            tags:this.state.tags?this.state.tags:null,
            reccomendedProduct:this.state.reccomendedProduct?this.state.reccomendedProduct:null,
            varientDetails:this.state.varientDetails?this.state.varientDetails:null
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
                    let list = await GetProductDetails.getUpdateProduct(config);
                
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
    
    async clickOnDelete(record) {
        this.setState({
            varientDetails: this.state.varientDetails.filter(r => r !== record),
        });
         const data = await {varientId:record.id}
         const config = {
            Headers: {
                'content-type': 'multipart/form-data',
               
           }}
          swal({
            title: "Are you sure?",
            text: "You want to Delete  this varient",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.deletevarientbyid(data,config);
                 if (list) {
                        this.setState({ isLoaded: false })
                         this.setState({
                                    varientDetails: this.state.varientDetails.filter(r => r !== record),
                                });
                         NotificationManager.success(list.mesage, 'Status');
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
    deleteCheckBox=(id)=>{
      
       const config = {
            Headers: {
                'content-type': 'multipart/form-data',
                
           }, 
           pid:this.state.id,
           reccomendedId:id
           
            
        };
        
        swal({
            title: "Are you sure?",
            text: "You want to resate checkbox",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getdeleteRct(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        window.location.reload(false)
                          NotificationManager.success(list.mesage, 'Status');
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    
    
    }
    render() {
        let { varientDetails,subCategoryId,suggestions,input,tags,productphotos,categoryId } = this.state
        
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
                    <li className="breadcrumb-item active">Edit Product</li>
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
                                            <input type="text" id="name" value={this.state.name} name="name" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
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
                                            <input type="text" value={this.state.originPlace} id="originPlace" name="originPlace" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div>
                                  
                                       <div className="col-sm-12 ">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">About Product Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group">
                                             <textarea type="text"  value={this.state.aboutProduct} id="collapseContent" name="aboutProduct" placeholder="Write Product Details Here...."  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>
                                         <div className="col-sm-12 my-2">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent2" role="button" aria-expanded="false" aria-controls="collapseContent">Nutrients and Proteins Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group " >
                                             <textarea type="text" value={this.state.nutrientsDetals} id="collapseContent2" placeholder="Write Nutrients and Proteins Details Here..."  name="nutrientsDetals"  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>
                                         <div className="col-sm-12">
                                             <a  class="btn btn-dark col-sm-12  mb-3 collapsed" data-toggle="collapse" href="#collapseContent3" role="button" aria-expanded="false" aria-controls="collapseContent">Storage and Uses Details<em style={{color:"white"}}>+</em></a>
                                           <div className="form-group">
                                             <textarea type="text"   id="collapseContent3"  name="storeUses" value={this.state.storeUses} placeholder="Write Storage Details Here..."  class=" collapse w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                           </div>
                                       </div>

                                   <div className='col-sm-8 py-4'>
                                        <div className="form-group row">
                                           <label className="my-2">Lables</label>
                                           <label className={`${this.state.lableType  == 'None' ? "btn bg-success mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
										      <input type="radio" id="lableType" hidden name="lableType" autocomplete="off" value="None" /> None
									      </label>
                                          <label  className={`${this.state.lableType  == 'veg' ? "btn bg-success mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
										      <input type="radio"  hidden id="lableType" name="lableType" value="veg" autocomplete="off" /> veg
									      </label>
                                          <label  className={`${this.state.lableType  == 'None Veg' ? "btn bg-success mx-2 col-sm-3" : "btn col-sm-3 bg-danger text-light mx-2  " }`}>
                                               <input type="radio" hidden id="lableType" name="lableType" value="None Veg" autocomplete="off" /> None Veg
										   </label>

                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword5" class="form-label">Tags</label>
                                            {/* <input type="text" id="inputPassword5" class="w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/> */}
                                          <div className="tags-content">
                                                {tags.map((tag, i) => (
                                                <div key={i} className="tag">
                                                    {tag}
                                                    <div className="remove-tag" onClick={() => this.handleDelete(i)}>
                                                    ×
                                                    </div>
                                                </div>
                                                ))}
                                              <div className="tags-input">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={this.handleChanges}
                                                onKeyDown={this.handleKeyDown}
                                                placeholder="add new tag"
                                            />
                                            {input && Boolean(suggestions.length) && (
                                                <div className="tags-suggestions">
                                                {suggestions.map(suggest => (
                                                    <div
                                                    className="suggestion-item"
                                                    onClick={() => this.AddTags(suggest.text)}
                                                    >
                                                    {suggest.text}
                                                    </div>
                                                ))}
                                                </div>
                                            )}
                                            </div>
                                        </div>
      
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
                                                <input type="number" value={this.state.GSTrate}  className=" w3-input w3-border form-control" name="GSTrate" id="GSTrate" />
                                            </div>
                                        </div>
                                          <div className='col-sm-4'>
                                            <div className="form-group">
                                                <label className="form-label">GST Rate Type <em style={{ color: "tomato" }}>*</em></label>
                                                <select id="GSTtyp" value={this.state.GSTtyp} name="GSTtyp" className=" w3-input w3-border form-control">
                                                    <option value="Inclusive">Inclusive</option>
                                                    <option value="Exclusive">Exclusive</option>
                                                </select>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className='col-sm-4 py-2' style={{paddingLeft:"0"}}>
                                        <div className="form-group">
                                            <label htmlFor="HSNcode" class="form-label">HSN Code</label>
                                            <input type="text" value={this.state.HSNcode} name="HSNcode" className='w3-input w3-border form-control' id="HSNcode" aria-describedby="passwordHelpBlock" />
                                        </div>
                                    </div><br></br>
                                      </div>:null
                                  }
                                    
                                </div>
                                {/* now we are using  varient dynamic form */}
                                <div className='varientheader py-4' style={{ paddingBottom: "15px" }}>
                                    <a onClick={this.addNewRow} className="btn" style={{ float: 'right', color: "Tomato" }}><i class="fas fa-plus"></i>Add More</a>
                                    <h3 style={{ float: 'left', }}>Varients</h3>
                                </div>
                                <hr style={{ padding: "2px", border: "2 px solid black" }}></hr>
                                <div className="container py-4" style={{ border: "lightgray" }}>
                                    <VarientDetailEdit add={this.addNewRow} delete={this.clickOnDelete.bind(this)} varientDetails={varientDetails} />
                                </div>
                                <div className='recomended product'>
                                    <hr></hr>
                                    <h3>Recommended Products</h3>
                                    <hr></hr>
                                    <div className='ex1'>
                                        
                                        <ReccomendedFormEdit checksetIddel={(id)=>this.deleteCheckBox(id)} rowRcData={this.state.rcdata} setStaterecomended={this.setStaterecomended} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* right section cotegory */}
                            <div className='col-sm-4'>
                                <div>
                                    <h3>Category <em style={{ color: "tomato" }}>*</em></h3>
                                    <div className='mx-4 my-2'>
                                        <div className='categorycontainer'>
                                         
                                            <CategoryListEdit data={categoryId} sdata={subCategoryId} setStateOfCategory={this.setStateOfCategory} />
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
                                                           <input id="files"  multiple name="files[]" onChange={this.fileSelectedHandler} type="file" />
                                                    </div> 
                                                
                                                </div>
                                                 <ToastContainer autoClose={1500} />
                                            </div>
                                            
                                            {this.state.filselected ? <div><i>{this.state.filselected}</i>
                                           
                                            </div>:
                                            <p>Drag & Drop files here or click to browse.
                                                Note: Max 4 images are allowed.</p>
                                                }
                                            <div style={{margin:"10px"}} >
                                                    { productphotos.map((item,i)=>(
                                                         <div className="img_wrp mx-2">
                                                             <div style={{width:"100%"}}>
                                                                <img  width="60px" class="rounded float-left" height="55px" value ={item.imgUrl} src={item.imgUrl} alt="img "/><i  onClick={(e) =>this.handlawsDeleteById(item.id,item.imgUrl)} className="fa fa-close close"></i>
                                                            </div>
                                                    </div>

                                                    ))}
                                            </div>
                                             <hr></hr>
                                        </div>
                                        <div className='uploadfile'>
                                            <h3>Upload Video </h3>
                                              <input type="file" className="form-control" onChange={this.VideoUploadFile}  />
                                            <p style={{ color: "blue",fontStyle:"italic",fontWeight:"bold" }}>{this.state.msgvideoUpload}</p>
                                           
                                     
                                         
                                           <div className=" mx-2 my-2">
                                                  <video width="320" height="200" controls  src={ this.state.videoUpload} type="video/mp4" />

                                           </div>
      
        
   

                  
                                            {/* { this.state.uploadPercentage > 0 && <ProgressBar variant="danger" now={this.state.uploadPercentage} active label={`${this.state.uploadPercentage}%`} /> }<br></br> */}
                                            <div className='upload thambnail my-4'>
                                                <h3>Video Thumbnail Image</h3>
                                               {
                                                   this.state.thumbNailphoto?
                                                    <div className="file-area">
                                                    <div className="form-group">
                                                        <input type="file" className="form-control" onChange={this.ThumbnainVideoUpload} />
                                                        <div className="file-dummy">
                                                        
                                                           <img   width="200px" height="150px" src={this.state.thumbNailphoto} alt="video not found "/>
                                                        </div>
                                                       
                                                        <p style={{ color: "blue",fontStyle:"italic",fontWeight:"bold" }}>{this.state.msgThumb}</p>
                                                         <div className="img_wrp">
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                </div>: <div className="file-area">
                                                    <div className="form-group">
                                                        <input type="file" className="form-control" onChange={this.ThumbnainVideoUpload} />
                                                        <div className="file-dummy">
                                                        
                                                            <i className="fas fa-plus mx-4 my-4"></i><br></br>
                                                            <span className="default">Click to select a file, or drag it here</span>
                                                            <span className="success">Great, your file is selected</span>
                                                        </div>
                                                       
                                                        <p style={{ color: "blue",fontStyle:"italic",fontWeight:"bold" }}>{this.state.msgThumb}</p>
                                                         <div className="img_wrp">
                                                        
                                                        </div>
                                                      
                                                    </div>
                                                </div>
                                               }
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
export default editProduct