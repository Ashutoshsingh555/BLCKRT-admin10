import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { GetLoyaltyCouponDetails } from '../../../../services';
import swal from 'sweetalert';
import {Link} from'react-router-dom'

export default class loyaltycoupon extends Component {
        constructor(props) {
        super(props);
        this.state = {
            couponList: [],
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
      async getListdata(){
        this.setState({ isloaded: false })
        let list = await GetLoyaltyCouponDetails.getAllLoyaltyCouponList()
       if (list) {
             var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData : tdata,
                    couponList:slice,
                    isloaded: false
                })
            } else {
                this.setState({ isloaded: true })
            }
    }

    async componentDidMount() {
        this.getListdata();
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
			couponList:slice
		})
	
    }
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to coupon from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
         
                    let value = await GetLoyaltyCouponDetails.getDeleteLoyaltyCoupon(id);
                    if (value) {
                        this.getListdata();
                        window.location.reload(false);
                    }
                }
            });
    }
    render() {
        const{ couponList } = this.state;
        return (
            <div>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Loyalty Point Coupon</li>
                </ol>
                <div  style={{paddingLeft:"80%"}}>
                       <a  href='/admin/loyalty/addlc' className="btn btntop text-light">Add New</a>
                </div><br></br>
                <br></br>
                <div>
                    <table className="table ucp-table table-hover mx-4">
                        <thead>
                            <tr className='mx-'>
                                <th scope="col">DISCOUNT AMOUNT</th>
                                <th scope="col">LOYALITY POINT</th>
                                <th scope="col">COUPON CODE</th>
                                <th scope="col">STATUS</th>
                                <th scope='col'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                couponList.map((row,id) =>(
                                    <tr key={row.id}>
                                        <td>{row.AmountsOff}</td>
                                        <td>{row.loyaltyPoints}</td>
                                        <td>{row.couponCode}</td>
                                        <td>{row.status==false?"InActive":"Active"}</td>
                                          <td scope="col">
                                            <div className="row">
                                                 <div className="col-sm-2">
                                              <Link to={{ pathname: `/admin/loyalty/editlc`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt">
                                                </i> 
                                            </Link>
                                            </div>|
                                               <div className="col-sm-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>
                                             </div>
                                        </td>
                                     </tr>

                                ))
                            }
                          
                              
                            
                        </tbody>
                    </table>
                </div>
              <div className='py-4 mx-4'>
                  .  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={".."}
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
