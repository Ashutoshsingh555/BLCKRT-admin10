import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactPaginate from 'react-paginate';
import '../../category/productmainCotegory.css'
import { GetBannerDetails } from '../../../../services';
import { GetCategoryDetails } from '../../../../services';
import swal from 'sweetalert';
import Row from './Row';
import ReactModal from 'react-modal';
import { NotificationManager } from 'react-notifications';







export default class banners extends Component{
     constructor(props) {
        super(props);
        this.state = {
            index:"",
            Id:"",
            name: '',
            photo: '',
            getList: [],
            sub_name: '',
            subphoto:'',
            id:'',
            showModal: false,
            showModalSub:false,
             filterKey:'',
            dataList:'',
            isloaded: false, 
            status: null, 
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0

        
        

        }
           this.handleOpenModal = this.handleOpenModal.bind(this);
           this.handleCloseModal = this.handleCloseModal.bind(this);
        
        
    }
    //model handler
     handleOpenModal () {
    this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }

      //model  sub handler
     handleOpenModalSub (id) {
    this.setState({ showModalSub: true,id:id });
    }
    
    handleCloseModalSub () {
        this.setState({ showModalSub: false });
    }
    
    
    
   
    // retrive the  category list.............
  
    handleBack() {
        this.props.history.goBack();
    }
    async getCategory() {
        let list = await GetBannerDetails.getAllBannerList();
           if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                getList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
    }
    async componentDidMount() {
        this.getCategory();
    }

    sortingIndex = async () =>{
         const config =  {
           Headers: {
                'content-type': 'multipart/form-data',
             }, 
              Id:this.state.Id,
              index:`${this.state.index}`
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update banners Index:- "+ this.state.index,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetBannerDetails.getupdateIndex(config);
                
                    if (list) {
                       NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    

    }


    ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const getList1 = this.state.getList.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(lowercasedValue)
            );
            });
          this.setState({getList:getList1});
        }else  if(this.state.index){
            this.sortingIndex()
        }
        else{
            this.getCategory()
            
            

        }
    }
    //reset function
    resetFunction(e){
        window.location.reload(false)
    }
    //pagenation
    handlePageClick = (e) => {
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
   // the category data ..........
     handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ photo: event.target.files[0] });
    };
    
    handleSubmit = event => {
        event.preventDefault();

        const { name ,photo} = this.state;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('photo', photo);
    
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
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
                    let list = await GetCategoryDetails.createCategoryList(formData, config);
                    if (list) {
                        this.getCategory();
                        this.setState({ showModal: false });
                        window.location.reload(false)
                    }
                }
            });
    }
    
   // the sub-category data ..........
    getButtonId = (e) => {
     this.setState({ id:e.currentTarget.id })
    }
      handleChangesub(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeCategoryList = (value) => {
        this.setState({ selectCategory: value });
    }
    onFileChangesub = event => {
        this.setState({ subphoto: event.target.files[0] });
    };
    
    handleSubmitsub= event => {
     
        event.preventDefault();

        const { sub_name ,subphoto,  id} = this.state;
        const formData = new FormData();

        formData.append('sub_name',sub_name);
        formData.append('photo', subphoto);
        formData.append('categoryId', id)
    
    
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
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
                    let list = await GetCategoryDetails.createSubCategoryList(formData, config);
                    if (list) {
                        this.getCategory();
                        this.handleCloseModalSub()
                        
                    }
                }
            });
    }
  handleChangeIndex = async(e ,id) =>{
       await  this.setState({index:e.target.value,Id:e.target.id})
    }

    //delete category
    async handledelateCategory(id){
       swal({
            title: "Are you sure?",
            text: "You want to delete Banner Type from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value =  await GetBannerDetails.getDeleteBanner(id);
                    console
                    if (value) {
                        this.getCategory();
                        window.location.reload(false)

                    }
                }
            });
    }
    
 render(){
  
     return (
      <div className='mx-4'>
             <ol className="breadcrumb mb-30 mx-2 my-2">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a>Banners</a></li>
                </ol>
                <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1">
                         <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                        
                        <div className="col-sm-8">
                              <a  href="/admin/settings/aebanner" style={{fontSize:"1.3em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>

                        </div>
                   
                        <div className="col-sm-1">
                             <button type="button" class="btn "  onClick={(e)=>{this.SearchClick(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                        </div>
                        <div className="col-sm-2">
                             <button type="button"  onClick={(e)=>this.resetFunction(e)} class="btn btn-outline-secondary">reset</button>
                        </div>
                    </div>
                </div>
                {/* //table */}
                <div className='mx-2 my-2'>
                    <TableContainer component={Paper} className="table ucp-table table-hover">
                        <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                         <TableCell>Sr.No</TableCell>
                            <TableCell >BANNER</TableCell>
                            {/* <TableCell >SORT</TableCell> */}
                             <TableCell>
                                ACTION
                             </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.getList.map((row) => (
                            <Row key={row.name}  
                             deletecategory={(id) =>this.handledelateCategory(id)}
                             row={row} 
                             openSubModal={(id) =>this.handleOpenModalSub(id)}
                             closeSubModal={() =>this.handleCloseModalSub()}
                             subFileChange={(e)=>this.onFileChangesub(e)}
                             subhandleChange={(e)=>this.handleChangesub(e)}
                             submitsub={(e)=>this.handleSubmitsub(e)}
                             open={this.state.showModalSub}
                             idhandler={(idx)=>this.setState({id:idx})}
                             handleChangeIndex={(e,id) =>this.handleChangeIndex(e,id)}
                            />
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
               </div>
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
    
    
     
  );
 }
}
