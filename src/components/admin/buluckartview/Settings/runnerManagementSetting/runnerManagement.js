import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";

import { GetRunnerDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';



export default class RunnerManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runnerList: [],
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
      async getRunnerList(){
        this.setState({ isloaded: false })
        let list = await GetRunnerDetails.getAllRunnerList()
       
       if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                runnerList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        
    }

    async componentDidMount() {
        this.getRunnerList();
    }
      ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const runnerList1 = this.state.runnerList.filter(item => {
            return Object.keys(item).some(key =>
               item[key] == value
            );
            });
            this.setState({runnerList:runnerList1});
        }else{
          this.getRunnerList()
        }
    }
   
    resetFunction(e){
        window.location.reload(false)
    }
    
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
			runnerList:slice
		})
	
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete runner from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetRunnerDetails.getDeleteRunner(id);
                    if (value) {
                        NotificationManager.success(value.msg, 'Status');
                        setTimeout(
                            async function () {
                                window.location.reload();
                            },
                            1000
                        );
                    }
                }
            });
    }
    render() {
        const{ runnerList } = this.state;
        return (
            <div className="container-fluid">
                  <div className='mx-4 my-4'>
                      <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                        <li className="breadcrumb-item"><a>Runner Management</a></li>
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
                       <a  href="/admin/settings/addRunner" style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
                    </div>
                        <div className="col-sm-3">
                        <form class="d-flex">
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
                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                            <th>PROFILE IMAGE</th>
                            <th>FULL NAME</th>
                            <th>MOBILE</th>
                            <th>EMAIL</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            runnerList.map((row, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                    <td style={{ width: "160px" }}>
                                        <div>
                                            <img  src={row.avatar}  width="100px"  height ="80px" alt="avatar" />
                                        </div>
                                    </td>
                                    <td>{row.Name}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.email}</td>
                                    <td>{row.status == '0' ? "active": "InActive"}</td>
                                    <td>
                                       <div className="col-sm-2 mx-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} className="far fa-trash-alt"></i></div>
                                    </td>
                                   
                                </tr>
                            ))
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
