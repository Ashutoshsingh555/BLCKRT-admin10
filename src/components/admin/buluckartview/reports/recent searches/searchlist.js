import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";

import { GetRecentSearchDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import parse from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import {Link} from'react-router-dom'



export default class searchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchlist: [],
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
    handleBack() {
        this.props.history.goBack();
    }
      async callsearchinglist(){
        this.setState({ isloaded: false })
        let list = await GetRecentSearchDetails.getsearchList()
       
         if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                searchlist:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        
    }

    async componentDidMount() {
        this.callsearchinglist();
    }
  
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
         
                    let value = await GetRecentSearchDetails.deletesearchList(id);
                    if (value) {
                        this.getProductList();
                        window.location.reload(false);
                    }
                }
            });
    }

      

    ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const searchlist1 = this.state.searchlist.filter(item => {
            return Object.keys(item).some(key =>
              item[key] == value
            );
            });
          
            this.setState({searchlist:searchlist1});
        }else{
          this.callsearchinglist();
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
			searchlist:slice
		})
	
    }
    render() {
        const{ searchlist } = this.state;
        console.log(searchlist)
      
        return (
            <div className="container-fluid">
                  <div className='mx-2 my-4'>
                      <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                        <li className="breadcrumb-item"><a>Recent Searches List</a></li>
                    </ol>
                  </div>
                <hr></hr>
                <div className=' my-4'>
                    <div className='row'>
                        <div className="col-sm-1">
                       <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                     <div className="col-sm-5 ">
                    
                    </div>
                        <div className="col-sm-3">
                        <form className="d-flex">
                               <input class="form-control me-2" onChange={(e)=>{this.setState({filterKey:e.target.value})}} type="search" placeholder="Search" aria-label="Search"/>
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
               <table className="table ucp-table table-hover">
                    <thead>
                        <tr>
                          
                            <th>DATE TIME</th>
                            <th  style={{ width: "20%"}}>RECENT SEARCHES</th>
                            <th>CUSTOMER NAME</th>
                            <th>PHONE NO.</th>
                            <th>LOCATIONS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchlist.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.createdAt}</td>
                                    <td>{row.search}</td>
                                    <td>{row.customerModel?row.customerModel.Name:null}</td>
                                    <td>{row.customerModel?row.customerModel.phone:null}</td>
                                    <td>{row.customerModel.mapcustomeradresses[0]?row.customerModel.mapcustomeradresses[0].city:null}</td>
                                    
                                   
                                   
                                    
                                    <td>
                                       <td scope="col">
                                         
                                               <div className="col-sm-2 mx-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} className="far fa-trash-alt"></i></div>
                                               
                                        </td>
                                    </td>
                                   
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
               
                  <div className='mx-2 my-4'>
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
