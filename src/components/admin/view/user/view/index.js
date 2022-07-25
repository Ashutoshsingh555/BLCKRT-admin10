import React, { Component } from 'react'
import {
    Typography, Button
} from "@material-ui/core";
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Loader from '../../../../loader';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], isLoaded: false,
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
    async componentDidMount() {
        this.setState({ isLoaded: true })
        this.getCustomer();
    }
    async getCustomer() {
        let list = await GetUserLogin.getAllUserList();
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

     ///search functionality
     SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const getList1 = this.state.getList.filter(item => {
            return Object.keys(item).some(key =>
                item[key]  === value
            );
            });
           this.setState({getList:getList1});
        }else{
            this.getCustomer();
            
            

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
            text: "You want to delete User from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetUserLogin.getDeleteUserList(id);
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
    handlEditRow(row) {
        this.props.history.push({ pathname: `/admin/user/edit/${row.id}`, state: row })
    }
    handleAddNewUser(){
        this.props.history.push({ pathname: `/admin/user/create`})

    }
    render() {
        const { getList, isLoaded } = this.state;
        console.log(this.state)
        return (
            <div className="container-fluid">
                 <ol className="breadcrumb mb-30 mx-2 my-2">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active"><a>Admin User List</a></li>
                </ol>
                <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1 mx-2">
                        <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                     <div className="col-sm-4 ">
                       <a  href="/admin/user/create" style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New User</a>
                    </div>
                        <div className="col-sm-3">
                        <form class="d-flex">
                                <input class="form-control me-2" onChange={(e)=>{this.setState({filterKey:e.target.value})}} type="search" placeholder="Search" aria-label="Search"/>
                                {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                            </form>
                        </div>
                        <div className="col-sm-1">
                            <button type="button" class="btn "  onClick={(e)=>{this.SearchClick(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                        </div>
                        <div className="col-sm-2">
                            <button type="button"  onClick={(e)=>this.resetFunction(e)} class="btn btn-outline-secondary">reset</button>
                        </div>
                    </div>
                </div>
           
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                {/* <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th> */}
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>First Name</th>
                                                <th>First Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        {/* <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td> */}
                                                        <td>{++index}</td>
                                                        <td>{row.firstName}</td>
                                                        <td>{row.lastName}</td>
                                                        <td>{row.email}</td>
                                                        <td>{row.role}</td>
                                                        <td>{row.verify ? <span className="text-success">Verified</span> : <span className="text-danger">Pending</span>}</td>
                                                        <td className="action-btns">
                                                            <a onClick={(e) => this.handlEditRow(row)} ><i className="fas fas fa-edit" /></a>
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
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
                            </div>
                        </div>
                 
        )
    }
}
