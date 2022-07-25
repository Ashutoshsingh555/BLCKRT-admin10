import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {GetCouponDeatails} from'../../../../services';
import swal from 'sweetalert';
import {Link} from'react-router-dom'
import { NotificationManager } from 'react-notifications';




export default class coupon extends Component {
      constructor(props) {
        super(props);
        this.state = {
            CouponList: [],
            active:"",
            hideAction:"",
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
      async getCoupondata(){
        this.setState({ isloaded: false })
        let list = await GetCouponDeatails.getAllcouponList();
       
       
         if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                CouponList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
    }

    async componentDidMount() {
        this.getCoupondata();
    }
  
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete Coupon from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCouponDeatails.getDeletecoupon(id);
                    if (value) {
                         NotificationManager.success("Success")
                        this.getProductList();
                    }
                }
            });
    }

    
    ///search functionality
    SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        const CouponList1 = this.state.CouponList.filter(item => {
            return Object.keys(item).some(key =>
                item[key] == value
            );
            });
           this.setState({CouponList:CouponList1});
        }else{
          this.getCoupondata();
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
			CouponList:slice
		})
	
    }
     handleChangeStatus = async (id,active)=>{
      if(active === true){
           var data= { 
                "couponId":id,
                "active":"0",
        }
        }else{
           var data= { 
                "couponId":id,
                "active":"1"
           }
        }

        const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update Coupon Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCouponDeatails.getUpdatecouponstatus(data,config);
                
                    if (list) {
                          NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        

    }

    render() {
        const {CouponList}=this.state
       return (
           <div className='mx-4 my-2'>
               <ol className="breadcrumb mb-30 mx-2 my-2">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active"><a>Discount Offers</a></li>
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
                     <div className="col-sm-5 ">
                       <a  href="/admin/marketing/addeditcoupon"style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
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
              
                <table className="table ucp-table  mx-2">
                    <thead>
                        <tr>
                            <th scope="col">OFFER NAME</th>
                            <th scope='col'>COUPON CODE</th>
                            <th scope="col">DISCOUNT UPTO</th>
                            <th scope="col">DATE VALID</th>
                             <th scope="col">COUPON USE</th>
                            <th scope="col">TOTAL SALES	</th>
                            <th scope="col">ACTION</th>

                          
                           </tr>
                    </thead>
                    <tbody>
                    {
                        CouponList.map((row,id) =>(
                            <tr key={row.id}>
                                <td>{row.offerName}</td>
                                <td>{row.couponcode}</td>
                                <td>{row.discountupto}</td>
                                <td>{row.dateTo}</td>
                                <td>{row.useType}</td>
                                <td>{Object.keys(row.Orders).length}</td>
                                 <td scope="col">
                                    <div className="row">
                                             <div className="col-sm-2">
                                              <Link to={{ pathname: `/admin/marketing/editcoupon`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} className="fas fa-pencil-alt">
                                                </i> 
                                            </Link>
                                            </div>||
                                             <div className="col-sm-2">
                                                    {row.active === true ? <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.active)} className="fas fa-check"></i></a>:
                                                    <a><i style={{fontSize:'18px'}}  onClick={(e) =>this.handleChangeStatus(row.id,row.active)} className="fa fa-ban"></i></a>
                                                    }
                                                </div> ||
                                        <div className="col-sm-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>
                                    </div>
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
    