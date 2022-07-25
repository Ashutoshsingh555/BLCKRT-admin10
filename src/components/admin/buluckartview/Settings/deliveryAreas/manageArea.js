import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { GetDeliveryAreas } from'../../../../services'
import {Link} from'react-router-dom'
import swal from 'sweetalert';


export default class manageArea extends Component {
       constructor(props) {
        super(props);
        this.state = {
            getList: [],
            filterKey:'',
            dataList:'',
            isloaded: false, 
            status: null, 
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0
        }
    }

  async getOrderList() {
        this.setState({ isloaded: true })
        let list = await GetDeliveryAreas.getAllcityManageList();
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
    componentDidMount() {
        this.getOrderList();
    }
     
     
 ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const getList1 = this.state.getList.filter(item => {
            return Object.keys(item).some(key =>
              item[key] == value
            );
            });
            console.log(getList1)
            this.setState({getList:getList1});
        }else{
             this.getOrderList();
            
            

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

     async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete  DeleteCity from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetDeliveryAreas.getDeletecityManage(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }
    render() {
           const { getList, isloaded, status, statusList } = this.state;
           console.log(getList)
        return (
           <div className='mx-4'>
               <ol className="breadcrumb mb-30 my-2">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active"><a>Delivery Cities</a></li>
                </ol>
                <div className="topwraper py-4" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1">
                           <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                    <option value="25">20</option>
                                    <option value="1">50</option>
                                    <option value="100">100</option>
                            </select>
                        </div>
                
                    <div className="col-sm-4 my-2">
                       <a  href="/admin/settings/city"style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
                    </div>
                    <div className="col-sm-2 my-2 ">
                       <a  href="/admin/settings/dareas" style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}>Manage Cities</a>
                    </div>
                        <div className="col-sm-3">
                            <form class="d-flex">
                                   <input class="form-control me-2" onChange={(e)=>{this.setState({filterKey:e.target.value})}} type="search" placeholder="Search" aria-label="Search"/>
                                </form>
                            </div>
                        <div className="col-sm-1">
                            <button type="button" class="btn "  onClick={(e)=>{this.SearchClick(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                        </div>
                        <div className="col-sm-1">
                           <button type="button"  onClick={(e)=>this.resetFunction(e)} class="btn btn-outline-secondary">reset</button>
                        </div>
                    </div>
                </div>
              
                <table className="table ucp-table table-hover">
                    <thead>
                        <tr>
                            <th  style={{ width: 700 }}>CITY</th>
                           <th style={{ width: 200 }} >ACTION</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {getList.map((row,id) =>(
                            <tr key={row.id}>
                                <td>{row.City}</td>
                                  <td scope="col">
                                    <div className="row">
                                        <div className="col-sm-2">
                                              <Link to={{ pathname: `/admin/settings/editcity`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt">
                                                </i> 
                                            </Link>
                                            </div>|
                                        <div className="col-sm-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>
                                    </div>
                                </td>

                            </tr>

                        ))}
                    </tbody>
                  
                </table>
                 <div className='py-4 mx-4'>
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
