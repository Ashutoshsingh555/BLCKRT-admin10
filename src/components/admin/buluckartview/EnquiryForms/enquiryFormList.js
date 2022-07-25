import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import "./enquiry.css"
import {GetEnquirydetails} from'../../../services';
import swal from 'sweetalert';

export default class enquiryFormList extends Component {
        constructor(props) {
        super(props);
        this.state = {
            enquiryList: [],
            webcount:[],
            isocount:[],
            androidCount:[],

            filterKey:'',
            dataList:'',
            isloaded: false, 
            status: null, 
            offset: 0,
            perPage: 5,
            orgtableData: [], 
            currentPage: 0
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
      async getCoupondata(){
        
        let list = await GetEnquirydetails.getAllEnquiryList();
        if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                enquiryList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        }

    async wecoundfunction(){
        let list = await GetEnquirydetails.getAllEnquiryList();
        const getinventoryList1 =list.data.filter(item => item.plateform == 'WEB');
        const counts= Object.keys(getinventoryList1).length
        this.setState({webcount:counts})
     }

       async androidCountsff(){
        let list = await GetEnquirydetails.getAllEnquiryList();
        const getinventoryList1 =list.data.filter(item => item.plateform == 'ANDROID');
        const counts= Object.keys(getinventoryList1).length
        this.setState({androidCount:counts})
     }

         async isoscountsFunction(){
        let list = await GetEnquirydetails.getAllEnquiryList();
        const getinventoryList1 =list.data.filter(item => item.plateform == 'IOS');
        const counts= Object.keys(getinventoryList1).length
        this.setState({isocount:counts})
     }

    async componentDidMount() {
        this.getCoupondata();
        this.wecoundfunction();
        this.androidCountsff();
        this.isoscountsFunction()
     
    }
  
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to Enquiry details from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetEnquirydetails.getDeleteEnquiry(id);
                    if (value) {
                        this.getCoupondata();
                        window.location.reload(false)
                    }
                }
            });
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
			enquiryList:slice
		})
	
    }
    render() {
        const {enquiryList} = this.state;
     
        return (
            <div className='mx-3 my-4'>
                  <ol className="breadcrumb mb-30  my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Enquires</li>
                </ol>
                <div className='container my-4'>
                    <div className='row'>
                        <div className='col-sm-3'>
                            <div className='blockquotes'>
                                <div className='row'>
                                    <div className='col-sm-4 '>

                                    </div>
                                    <div className='col-sm-8  py-2'>
                                        <h5 style={{paddingTop:"25px"}}>TOTAL ENQUIRES</h5>
                                        <h2>{Object.keys(this.state.enquiryList).length}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className='col-sm-3'>
                            <div className='blockquotes'>
                                <div className='row'>
                                    <div className='col-sm-4'>

                                    </div>
                                    <div className='col-sm-8 py-4 py-4'>
                                        <h5 style={{paddingTop:"25px"}}>ANDROID</h5>
                                        <h2>{this.state.androidCount}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className='col-sm-3'>
                            <div className='blockquotes'>
                                <div className='row'>
                                    <div className='col-sm-4'>

                                    </div>
                                    <div className='col-sm-8 py-4 py-4'>
                                        <h5 style={{paddingTop:"25px"}}>IOS</h5>
                                        <h2>{this.state.isocount}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className='col-sm-3'>
                            <div className='blockquotes'>
                                <div className='row'>
                                    <div className='col-sm-4'>

                                    </div>
                                    <div className='col-sm-8 py-4 py-4'>
                                        <h5 style={{paddingTop:"25px"}}>WEB</h5>
                                        <h2>{this.state.webcount}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                  
                    <table className="table ucp-table table-hover mx-2 ">
                        <thead>
                            <tr className='mx-'>
                                <th scope="col">PLATFORM</th>
                                <th scope="col">NAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">PHONE</th>
                                <th scope='col'>RECEIVED ON</th>
                                <th scope='col'>ACTION</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                enquiryList.map((row,id) =>(
                                    <tr key={row.id}>
                                        <td>{row.plateform}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phoneno}</td>
                                        <td>{row.createdAt}</td>
                                        <td>
                                              <div className="col-sm-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>
                                        </td>
                                    </tr>
                                  
                                ))
                            }
                             
                        </tbody>
                    </table>
            
                <div className='py-4 mx-2'>
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
