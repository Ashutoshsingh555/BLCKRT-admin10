import React, { Component } from 'react'
import {
    Typography,Button
} from "@material-ui/core";

import { GetFaqDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import parse from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import {Link} from'react-router-dom'



export default class faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqList: [],
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
      async getFaqdata(){
        this.setState({ isloaded: false })
        let list = await GetFaqDetails.getAllFaqList()
       
         if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                faqList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        
    }

    async componentDidMount() {
        this.getFaqdata();
    }
  
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete FAQ from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
         
                    let value = await GetFaqDetails.getDeleteFaq(id);
                    if (value) {
                        this.getProductList();
                        window.location.reload(false);
                    }
                }
            });
    }

       handleChangeStatus = async (id,statusrow)=>{
    
        if(statusrow === true){
           var data= { 
                "faqid":id,
                "Status":"0",
        }
        }else{
           var data= { 
                "faqid":id,
                "Status":"1"
           }
        }

        const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update Faq Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetFaqDetails.getUpdateStatus(data,config);
                
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
        const faqList1 = this.state.faqList.filter(item => {
            return Object.keys(item).some(key =>
              item[key] == value
            );
            });
          
            this.setState({faqList:faqList1});
        }else{
          this.getFaqdata();
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
			faqList:slice
		})
	
    }
    render() {
        const{ faqList } = this.state;
      
        return (
            <div className="container-fluid">
                  <div className='mx-4 my-4'>
                      <ol className="breadcrumb mb-30">
                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                        <li className="breadcrumb-item"><a>Faqs</a></li>
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
                       <a  href="/admin/settings/addfaq" style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i className="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
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
                          
                            <th>DATE TIME (LAST MODIFIED)</th>
                            <th>CATEGORY</th>
                            <th style={{ width: "20%"}}>QUESTION</th>
                            <th style={{ width: "20%"}}>ANSWER</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            faqList.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.createdAt}</td>
                                    <td>{row.Category}</td>
                                    <td>{row.Question}</td>
                                    <td>{parse(row.AnswerText)}</td>
                                   
                                    
                                    <td>
                                       <td scope="col">
                                            <div className="row">
                                                 <div className="col">
                                              <Link to={{ pathname: `/admin/settings/editfaq`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} className="fas fa-pencil-alt">
                                                </i> 
                                            </Link>
                                            </div>||
                                               <div className="col-sm-2 mx-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} className="far fa-trash-alt"></i></div>||
                                                <div className="col">
                                                    {row.Status === true ? <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.Status)} className="fas fa-check"></i></a>:
                                                    <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.Status)} className="fa fa-ban"></i></a>
                                                    }
                                                </div>
                                                
                                            </div>
                                        </td>
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
