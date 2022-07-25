import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import './product.css'
import { GetProductDetails,GetCategoryDetails } from '../../../services';



export default class product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
            filterKey:[],
            categoryList:[],
            subcategoryList:[],
            productId:"",
            checkedBoxes:[],
            filterKeyCat:"",
            filterKeySubCat:"",
            updatedPageNo:"",
            index:"", 
            selectedProduct: '', isloaded: false, limit: 20,
            isloaded: false, 
            status: null, 
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0
            
        }
        this.multipledelete = this.multipledelete.bind(this);
        this.deleteMultyProducts = this.deleteMultyProducts.bind(this);
    }

    
     async getProductList(page=this.state.currentPage,limit=this.state.perPage*10) {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getAllProductList();
        if (list) {
            var tdata = list.product;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                getList:slice,
                isloaded: true
            })
        } else {
            this.setState({ isloaded: true })
        }
    }
     async getCategory() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({categoryList:list.data})
     }

     async getsubsCategory() {
        let list = await GetCategoryDetails.getsubcategorydata();
        this.setState({subcategoryList:list.data})
     }
    //pagenation
    handlePageClick = async(e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
      

     };
    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			getList:slice
		})
	
    }

    async filterData(){
           const { getList,filterKey} = this.state;
   
          const getList1 = await getList.filter(item => {
               return item.name === filterKey;
        
            });
        this.setState({getList:getList1});
    }

    async componentDidMount() {
        this.getProductList();
        this.getCategory();
        this.getsubsCategory();
    }
    
    sortingIndex = async () =>{
         const config =  {
           Headers: {
                'content-type': 'multipart/form-data',
             }, 
              productId:this.state.productId,
              index:`${this.state.index}`
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update product sort Index:- "+ this.state.index,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getupdateIndex(config);
                
                    if (list) {
                       NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    

    }

   async categoryFilter(){
       let list = await GetProductDetails.getAllProductList();
       const getList1 = await list.product.filter(item => {
               return item.categoryId == this.state.filterKeyCat;
        
            });
           this.setState({getList:getList1})
   }

     async subcategoryFilter(){
        let list = await GetProductDetails.getAllProductList();
       const getList1 = await list.product.filter(item => {
               return item.subCategoryId == this.state.filterKeySubCat;
        
            });
           this.setState({getList:getList1})
   }

    //search functionality
     async searchClick(e){
       if(this.state.filterKey){
            this.filterData();
       }
        if(this.state.updatedPageNo){
           this.getProductList()
        }
         if(this.state.index){
            this.sortingIndex()
         }
         if(this.state.filterKeyCat){
           this.categoryFilter()
         }
         if(this.state.filterKeySubCat){
             this.subcategoryFilter()
         }
        // }else{
        //     e.preventDefault();
        //     this.setState({ loading: false })
        //     let list = await GetProductDetails.getProductById(this.state.selectedProduct.value);
        //     if (list) {
        //         this.setState({ getList: list.data, isloaded: true })
        //     }
        // }
     
    }
  
    resateClick =(e) =>{
      window.location.reload(false);
    }
    async handlDeleteById(id) {
      swal({
            title: "Are you sure?",
            text: "You want to delete product from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getDeleteProduct(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }
    handleChangeStatus = async (id,statusrow)=>{
     if(statusrow =='active'){
           var data= { 
                "productId":id,
                "status":"0",
        }
        }else{
           var data= { 
                "productId":id,
                "status":"1"
           }
        }

        const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update product Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.updateStatus(data,config);
                
                    if (list) {
                          NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        

    }
       
     handleChangeIndex = async(e ,id) =>{
       await  this.setState({index:e.target.value,productId:e.target.id})
    }

    multipledelete = async (e,row) =>{
        
      if(e.target.checked) {
		let arr = this.state.checkedBoxes;
		arr.push(row.id);
      await this.setState({ checkedBoxes: arr});
	} else {			
		let rows = this.state.checkedBoxes.splice(this.state.checkedBoxes.indexOf(row.id), 1);
		
		this.setState = {
			checkedBoxes: rows
            }
        }		
	}
    //multiple product
    deleteMultyProducts =async (e) => {
        if(e.target.value == "1"){
            const data = await {productMultyId:this.state.checkedBoxes}

            const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
           
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to delete all ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.multiDeletproduct(data,config);
                    if (list) {
                          NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        
        }else{
            alert("action not found yet")

        }
       
	
     }


    //reset function
    resetFunction(e){
        window.location.reload(false)
    }
    render() {
        const { getList} = this.state;
       return (
             <div className='mx-2'>
                <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
                      <div className='row'>
                    <div className="col-sm-1 mx-2">
                       <select class="form-select"  onChange={(e)=>{this.setState({perPage:e.target.value,updatedPageNo:e.target.value})}} style={{padding:"5px"}} aria-label="Default select example">
                            <option value="25">25</option>
                            <option value="3">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="col-sm-2 ">
                       <a  href="/admin/mainproduct/addproduct"style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add Product</a>
                    </div>
                    <div className="col-sm-2">
                       <form class="d-flex">
                          <div className="col-lg-12">
                             <form class="d-flex">
                                <input class="form-control me-2" onChange={(e)=>{this.setState({filterKey:e.target.value})}} type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                            </div>
                         </form>
                    </div>
                     <div className="col-sm-2">
                       <form class="d-flex">
                                <select   onChange={(e)=>this.setState({filterKeyCat:e.target.value})} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                               
                                 <option >select Category</option>
                              {this.state.categoryList.map((row,id) =>(
                                        <option  value={row.id}>{row.name}</option>
                                    ))}
                            </select>

                                {/* <input class="form-control me-2" onChange={(e)=>{this.setState({filterKeyCat:e.target.value})}} type="search" placeholder="Category" aria-label="Search"/> */}
                            </form>
                    </div>
                   
                     <div className="col-sm-2">
                     <form class="d-flex">
                                <select   onChange={(e)=>this.setState({filterKeySubCat:e.target.value})} style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                               
                                 <option >select SubCategory</option>
                              {this.state.subcategoryList.map((row,id) =>(
                                        <option  value={row.id}>{row.sub_name}</option>
                                    ))}
                            </select>

                                {/* <input class="form-control me-2" onChange={(e)=>{this.setState({filterKeyCat:e.target.value})}} type="search" placeholder="Category" aria-label="Search"/> */}
                            </form>
                      
                    </div>


                    <div className="col-sm-1 ">
                        <button type="button" class="btn" onClick={(e)=>{this.searchClick(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                    </div>
                    <div className="col-sm-1">
                         <button type="button"  onClick={this.resateClick}class="btn btn-outline-secondary">reset</button>
                    </div>
                </div>

                </div>
              
                <table className="table ucp-table table-hover mx-2">
                    <thead>
                        <tr>
                            <th style={{ width: 60 }}><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></th>
                            <th scope="col-2">IMAGE</th>
                            <th scope="col-2"  style={{width:'20%'}}>PRODUCT NAME</th>
                            <th scope="col-1">CATEGORY</th>
                            <th scope="col-1">SUB-CATEGORY</th>
                            <th scope="col-1" >VARIENTS</th>
                            <th scope="col-1">SORTING</th>
                            <th scope="col-4"> 
                                <select class="form-select"  style={{width:"80%"}} onChange={(e) =>this.deleteMultyProducts(e)} aria-label="Default select example">
                                    <option value="0" >Action</option>
                                    <option value="1">Delete</option>
                                    <option value="2">Enable</option>
                                    <option value="3">Disable</option>
                                </select></th>
                        </tr>
                    </thead>
                     
                    <tbody>
                          {  this.state.isloaded === true?
                            getList.map((row, index) => (
                            <tr key={index} >
                                  <td style={{ width: 60 }}><input type="checkbox" className="selectsingle" value="{row.id}" checked={this.state.checkedBoxes.find((p) => p.id === row.id)} onChange={(e) => this.multipledelete(e,row)} /></td>
                                    <td scope="col"> 
                                        <div className="cate-img-5 ">
                                            {/* <img  src={row.productphotos[0].imgUrl?row.productphotos[0].imgUrl:row.photo} class="rounded-circle" width={'20px'}height={'40px'} alt="categorys" /> */}
                                            <img  src={row.productphotos[0]?row.productphotos[0].imgUrl: "img"} class="rounded-circle" width={'20px'}height={'40px'} alt="img" />
                                        </div>
                                    </td>
                                    <td scope="col">{row.name}</td>
                                   
                                   <td>{row.category? row.category.name:".."}</td>
                                   <td>{row.SubCategory? row.SubCategory.sub_name :".."}</td>
                                
                                    {/* {row.varientModels.map((vers) =>(
                                     <td scope="col"><span class="dot" value={row.id} style={{paddingLeft:"8px",marginTop:"10px"}} ></span></td>
                                    ))} */}
                                      {row.varientModels && (
                                    
                                        
                                        <td scope="col"><span class="dot" value={row.id} style={{paddingLeft:"8px",marginTop:"10px"}}>{Object.keys(row.varientModels).length}</span></td>
                                        
                                    )}
                                      <td><input type="number" defaultValue={row.id} id={row.id} onChange={(e)=> this.handleChangeIndex(e,row.id)} style={{paddingLeft:"15px",width:"55px",marginTop:"10px"}} /></td>
                                    <td scope="col">
                                        <td scope="col">
                                    <div className="row">
                                        <div className="col">
                                         <Link to={{ pathname: `/admin/mainproduct/edit`,
                                                                state: { row }
                                                            }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt">
                                       </i> </Link></div> |
                                        <div className="col" onClick={(e) => this.handlDeleteById(row.id)}><i style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>|
                                      <div className="col">
                                         {row.status === 'active' ? <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.status)} class="fas fa-check"></i></a>:
                                           <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.status)} class="fa fa-ban"></i></a>
                                           }
                                       </div>
                                    </div>
                                </td>
                                    </td>
                                </tr>
                            ))

                                        : <em className='mx-2'>Loading...</em>

                            }
                       
                       
                        
                    </tbody>
                </table>
                  <div className='mx-4 my-4'>
                      <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                  </div>
            </div>
        )
    }
}
