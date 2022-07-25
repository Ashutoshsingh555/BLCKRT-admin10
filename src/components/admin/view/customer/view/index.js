import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { GetCustomerDetails,getBulkImportExportDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';




export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exportData:[],
            getList: [],
            filterKey:'',
            dataList:'',
            isloaded: false, 
            status: null, 
            files:[],
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
        this.getCustomer();
    }
    async getCustomer() {
        let list = await GetCustomerDetails.getAllCustomerList();
          if (list) {
            var tdata = list.data;
            this.setState({exportData:tdata})
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
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Customer from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCustomerDetails.getCustomerDeleteById(id);
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
           
            this.setState({getList:getList1});
        }else{
          this.getCustomer()
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
  async onchangehandle(e){
         e.preventDefault();
 
          const formData = new FormData();
          
           await formData.append('file', e.target.files[0])
       

        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
           };
        swal({
            title: "Are you sure?",
            text: "You want to upload Customer excell sheet Details",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await getBulkImportExportDetails.uploadCustomerDetails(formData,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                         NotificationManager.success(list.mesage, 'Status');
                        window.location.reload(false)
                                          
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            })
    }
       // export to excell 
    downloadFile=(datas=this.state.exportData)=>{
         const  fileType= "xlsx"
        const ws= XLSX.utils.json_to_sheet(datas);
        const wb={Sheets:{data:ws},SheetNames:["data"]};
        const excelBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"});
       const data = new Blob([excelBuffer], {type:fileType});
       FileSaver.saveAs(data, "Customer_List"+".xlsx")

    }
     
    render() {
        const{ getList } = this.state;
        console.log(this.state.files)
        return (
            <div className="container-fluid">
                <div className=' my-4'>
                    <div className='row'>
                        <div className="col-sm-1">
                        <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                        </select>
                   
                        </div>
                     <div className="col-sm-2 ">
                       <a  href="/admin/customer/add"style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i className="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
                    </div>
                  
                        <div className="col-sm-1">
                           
                           <button onClick={(e)=>this.downloadFile()} className='btntopsc btn text-light'>Exports</button>
                        </div>
                        <div className='col-sm-1 mx-2'>
                            <div class="image-upload">
                                <label for="file-input" className='btntopsc btn text-light'>
                                  Imports
                                </label>

                                <input id="file-input"  type="file" onChange={(e)=>this.onchangehandle(e)}  style={{display:"none"}}  />
                                </div>

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
               <table className="table ucp-table table-hover"  id="table-to-xls">
                    <thead>
                        <tr>
                         
                            <th>ENROLLMENT DATE</th>
                            <th>FULL NAME</th>
                            <th>PHONE NO</th>
                            <th>EMAIL</th>
                            <th>TOTAL ORDERS</th>
                            <th>TOTAL ORDERS AMOUNTS</th>
                            <th>LOYALITY POINTS</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getList.map((row, index) => (
                                <tr key={index}>
                                   
                                    <td style={{ width: "160px" }} >{row.createdAt}</td>
                                    <td>{row.Name?row.Name:null}</td>
                                    <td>{row.phone?row.phone:null}</td>
                                    <td>
                                        {row.email?row.email:null}
                                    </td>
                                    <td>{row.Orders?Object.keys(row.Orders).length:null}</td>
                                    <td>{row.LoyaltyPointModel?row.Orders.map(ele =>ele.grandtotal).reduce((crt,aty) =>{return crt+aty},0).toFixed(2):null}</td>
                                    <td>{row.LoyaltyPointModel? 
                                       ((row.Orders.map(ele =>ele.grandtotal).reduce((crt,aty) =>{return crt+aty},0))/(row.LoyaltyPointModel.Amounts)).toFixed(2):null
                                
                                
                                
                                }</td>
                                    <td>{row.activated == true? "Active":"InActive"}</td>
                                    <td className="action-btns">
                                        {/* <Edit state={row} /> */}
                                        <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
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
