import React, { Component } from 'react'
import { GetUploadInventoryImage } from '../../../../services'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default class uploadInventory extends Component {
    constructor(props){
        super(props)
        this.state={
            getinventoryList:[],
            filterKey:'',
            dataList:'',
            isloaded: false, 
            status: null, 
            copied:false,
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0


        }
    }

    async coppyHandel(){
        NotificationManager.success("Copied")

    }
      async getinventory(){
            let list = await GetUploadInventoryImage.getInventoryList();
            if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                getinventoryList:slice,
                isloaded: true
            })
        } else {
            this.setState({ isloaded: true })
        }
        }
    componentDidMount(){
        this.getinventory();
    }
 ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        let list = await GetUploadInventoryImage.getInventoryList();
        const getinventoryList1 = list.data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(lowercasedValue)
            );
            });
           this.setState({getinventoryList:getinventoryList1});
        }else{
            this.getinventory()
            
            

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
			getinventoryList:slice
		})
	
    }

    async handlDeleteById(id) {
       swal({
            title: "Are you sure?",
            text: "You want to delete inventory image from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetUploadInventoryImage.getDeleteinventory(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }

    render() {
       const { getinventoryList }=this.state
      return (
           <div>
               <ol className="breadcrumb mb-30 mx-2 my-2">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active"><a>Image List</a></li>
                </ol>
                <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1 mx-2">
                        <select className="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                     <div className="col-sm-4 ">
                       <a  href="/admin/upload/addimage"style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i className="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add Image</a>
                    </div>
                        <div className="col-sm-3">
                        <form className="d-flex">
                                <input className="form-control me-2" onChange={(e)=>{this.setState({filterKey:e.target.value})}} type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                        <div className="col-sm-1">
                            <button type="button" className="btn "  onClick={(e)=>{this.SearchClick(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                        </div>
                        <div className="col-sm-2">
                            <button type="button"  onClick={(e)=>this.resetFunction(e)} className="btn btn-outline-secondary">reset</button>
                        </div>
                    </div>
                </div>
              
                <table className="table ucp-table table-hover mx-4">
                    <thead>
                        <tr>
                            <th scope="col">IMAGE</th>
                            <th   style={{ width: 450 }}>IMAGE NAME</th>
                            <th  style={{ width: 180 }}>URL</th>
                            <th scope="col">DELETE</th>
                          
                           </tr>
                    </thead>
                    {
                        this.state.isloaded === false?<tr><em>Loading...</em></tr>:
                    
                    <tbody>
                        { getinventoryList.map((row, index) => (
                            <tr key={index} >
                                  <td scope="col-3"> 
                                        <div className="cate-img-5 ">
                                            <img  src={row.photoUrl} className="rounded-circle" width={'20px'}height={'40px'} alt="categorys" />
                                        </div>
                                    </td>
                                    <td scope="col-3">{row.name}</td>

                                    <td scope="col-3">
                                            <CopyToClipboard text={row.photoUrl} 
                                            onCopy={() => this.setState({copied: true})}>
                                            <i className="fa fa-copy"onClick={(e)=>this.coppyHandel(e)} aria-hidden="true"></i> 
                                            </CopyToClipboard>
                                           
                                    
                                        
                                    </td>
                                    <td scope="col-3"><i   onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} className="far fa-trash-alt"></i></td>
                                </tr>
                        ))}
                    </tbody>
    }
                  
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
