import React, { Component } from 'react';
import { GetOrderDetails, GetDashboardDetails,GetRunnerDetails } from '../../../../services';
import Moment from 'react-moment';
import Loader from '../../../../loader';
import ReactPaginate from 'react-paginate';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



export default class orderindex extends Component {
      constructor(props) {
        super(props);
        this.state = {
            getList: [],
            filtrtdata:"",
            searchField:"",
            filterGetList:[],
            runnerList:[],
            autoRunner:"",
            intialdate:"",
            Finaldate:"",
            idr:0,
            runerid:0,
            runnersStatus:"",
            isloaded: false, 
            status: null, 
            runners:"",
            statusList: null,
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0
        }
    }

  async getOrderList() {
        this.setState({ isloaded: true })
        let list = await GetOrderDetails.getAllOrderList();
        if (list) {
            var tdata = list.order;
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
     async getStatusList() {
        this.setState({ isloaded: true })
        let list = await GetDashboardDetails.getAllStatusOrder();
        if (list) {
            this.setState({ statusList: list.data, isloaded: false })
        } else {
            this.setState({ isloaded: true })
        }
    }
    async getRunnerList(){
        this.setState({ isloaded: false })
        let runners = await GetRunnerDetails.getAllRunnerList()
       
        this.setState({runnerList:runners.data})
    }

       componentDidMount() {
        this.getOrderList();
        this.getStatusList();
        this.getRunnerList();
        
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
			getList:slice
		})
	
    }
   
    async handleChangeStatus(e) {
        let { value } = e.target;
        this.setState({ isloaded: true })
        let list = await GetDashboardDetails.getOrderByStatus(value);
        if (list) {
            this.setState({ getList: list.order, isloaded: false })
        }
    }
   

    componentWillReceiveProps(){
        this.handleChangeFilter()
    }
  
    async handleChangeRunner(e ,id){
        var idx =  e.target.value
        console.log(idx)
        // let str =  this.state.runnerList.find(ele => ele.id == idx).Name
        await this.setState({runners:idx})
       
     }

    async handleRunnerStaus(e,runner,id){
        let { value } = e.target;
        console.log(value,)
         e.preventDefault();
       this.setState({runnersStatus:value,autoRunner:runner,idr:id})
       
    }
     resateClick =(e) =>{
      window.location.reload(false);
    }
   //all button handler
    async onclickRunner(){
        if(this.state.searchField){
              let data=this.state.searchField
                let list = await GetOrderDetails.getAllOrderList();
                 let strst= await list.order.filter(ele =>{
                    if(ele.id == data){
                        return ele.id == data
                      }
                  })
               this.setState({getList:strst})
         }else if(this.state.Finaldate && this.state.intialdate){
                let list = await GetOrderDetails.getAllOrderList();
              let filterdata = await list.order.filter(item => (item.createdAt >= this.state.intialdate && item.createdAt <= this.state.Finaldate))
            
            //  console.log(filterdata,"ggh")
            this.setState({getList:filterdata})

                    
         }else{
        
         let data ={ id:this.state.idr, 
                    runners:this.state.runners?this.state.runners:this.state.autoRunner,
                    runnersStatus:this.state.runnersStatus?this.state.runnersStatus:"pending"
                    }
            console.log(data)
        swal({
            title: "Are you sure?",
            text: "You want to update Runner Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetRunnerDetails.updateOrderRunners(data);
                
                    if (list) {
                       // this.props.history.push("/admin/mainproduct/list")
                        NotificationManager.success(list.mesage, 'Status');
                        window.location.reload(false);
                        this.setState.runners({ isLoaded: false })
                        this.setState.runerid({isloaded:false})
                        this.setState.runnersStatus({isloaded:false})
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        }

    }

 
 

  
    render() {
         const { getList, isloaded, filterGetList, status, statusList } = this.state;
         console.log(this.state)
       
         
      
        return (
            <div className='mx-4'>
                <ol className="breadcrumb mb-30 my-4">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                  
                    <li className="breadcrumb-item active">Order</li>
                </ol>
               <div className="container">
                        {
                            isloaded ? <Loader /> : ''
                        }
                       <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-report-card bg-dark">
                                    <div className="card-content"style={{minHeight:'75px'}}>
                                        <span className="card-title">Order Shipping</span>
                                        {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "shipping" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        }
                                    </div>
                                    <div className="card-media">
                                        <i className="fab fa-rev" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-report-card bg-dark">
                                    <div className="card-content" style={{minHeight:'75px'}}>
                                        <span className="card-title">Order Cancel</span>
                                        {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "cancel" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        }
                                    </div>
                                    <div className="card-media">
                                        <i className="far fa-times-circle" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-report-card bg-dark">
                                    <div className="card-content"style={{minHeight:'75px'}}>
                                        <span className="card-title">Order Process</span>
                                        {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "processing" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        }
                                    </div>
                                    <div className="card-media">
                                        <i className="fas fa-sync-alt rpt_icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="dashboard-report-card bg-dark">
                                    <div className="card-content"style={{minHeight:'75px'}}>
                                        <span className="card-title">Order Delivered</span>
                                        {
                                            statusList ? statusList.map((row, index) => (
                                                <span className="card-count" key={index} style={row.status === "delieverd" ? { display: 'block' } : { display: 'none' }}>{row.total}</span>
                                            )) : ''
                                        }
                                    </div>
                                    <div className="card-media">
                                        <i className="fas fa-money-bill rpt_icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                         {/* <div  style={{paddingLeft:"80%"}}>
                                <buton  className="btn btntop text-light">Refunds Order</buton>
                            </div><br></br> */}
                            <br></br>
                            <div className='row mx-4 py-2'>
                                <div className="col-sm-2">
                                   
                                     <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-success mb-3"
                                        table="table-to-xls"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Exports Data"/>
                                {/* <a  href=""style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}><i class="far fa-folder mx-2" style={{color:"Tomato",fontSize:"25px"}}></i>Export Data</a> */}
                                </div>
                            <div className="col-sm-2">
                                <form className="d-flex">
                                        <input className="form-control me-2" type="search" onChange={(e)=>this.setState({searchField:e.target.value})} placeholder="Search" value={this.state.searchField} aria-label="Search"/>
                                    </form>
                                </div>
                                <div className="col-sm-2">
                                    <select className="form-select"  style={{width:"80%"}}  name="status" value={status} onChange={(e) => this.handleChangeStatus(e)} aria-label="Default select example">
                                        <option selected>Select Status</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="delieverd">Delivered</option>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                </div>
                                
                                <div className="col-sm-2">
                                        {/* <a  href=""style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}>Date From<i class="fas fa-calendar-alt mx-2" style={{fontSize:"25px"}}></i></a> */}
                                         <div className="input-group">
                                            <input className="custom-select" onChange={(e)=>{this.setState({intialdate:e.target.value})}} type="date" />
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div className="input-group">
                                            <input className="custom-select" type="date"  onChange={(e)=>{this.setState({Finaldate:e.target.value})}} />
                                        </div>
                                    </div>
                                <div className="col-sm-1">
                                        <button type="button" class="btn " onClick={(e) =>{this.onclickRunner(e)}} style={{background:"#393575",color:"white"}}>Go</button>
                                    </div>
                                    <div className="col-sm-1">
                                        <button type="button" class="btn btn-outline-secondary"  onClick={this.resateClick}>reset</button>
                                    </div>
                                </div>
                                <div>
                                
                                </div>
                            </div>
                            <main>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover"  id="table-to-xls">
                                        <thead>
                                            <tr className='mx-'>
                                                <th scope="col">ORDER ID<br></br></th>
                                                <th scope="col">CUSTOMER/<br></br>CONTACT NUMBER</th>
                                                <th scope="col">ADDRESS<br></br></th>
                                                <th scope="col">TOTAL<br></br> (₹)</th>
                                                <th scope='col'>ORDER RECEIVED<br></br></th>
                                                <th scope='col'>DELIVERY DATE</th>
                                                <th scope='col'>DELIVERY <br></br>TIME SLOTE</th>
                                                <th scope='col'>ORDER <br></br>STATUS</th>
                                                <th scope='col'>RUNNERS<br></br></th>
                                                <th scope='col'>RUNNER ORDER <br></br>STATUS</th>
                                              
                                                
                                                <th scope='col'>PAYMENT STATUS <br></br>(CLICK TO CHANGE)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    getList === 'undefined' ? <p>Loading</p> :
                                                        getList.map((row, index) => (
                                                            <tr key={index}>
                                                                <td onChange={(e)=>this.setState({runners:row.runners})}>{row.id}</td>
                                                                <td>{row.Addresses[0].fullname}/<br></br>{row.Addresses[0].phone}</td>
                                                                <td>{row.Addresses[0].area},<br></br>{row.Addresses[0].discrict},{row.Addresses[0].city},{row.Addresses[0].states}</td>
                                                                <td>&#8377;{row.grandtotal}/<br></br>{row.paymentmethod}</td>
                                                                <td>
                                                                    <span className="delivery-time"><Moment format='MMMM Do YYYY'>{row.createdAt}</Moment></span>
                                                                    <span className="delivery-time"><Moment format=' h:mm:ss a'>{row.createdAt}</Moment></span>
                                                                </td>
                                                                <td>
                                                                    {row.deliverydate ?
                                                                        <span className="delivery-time"><Moment format='MMMM Do YYYY'>{row.deliverydate}</Moment></span> : ''}

                                                                </td>
                                                                <td>
                                                                    {row.timeSlot?row.timeSlot:null}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        row.status === "processing" ? <span className="badge-item badge-primary">{row.status}</span> : row.status === "shipping" ? <span className="badge-item badge-warning">{row.status}</span> : row.status === "delieverd" ? <span className="badge-item badge-success">{row.status}</span> : <span className="badge-item badge-danger" >{row.status}</span>
                                                                    }

                                                                </td>
                                                                {/* <td> {row.status === "shipping"  && (row.runnersStatus === 'pending' || row.runnersStatus === 'reject') ? */}
                                                                  <td> {(row.status === "shipping" || row.status === "AssignToDeliveryBoy") && (row.runnersStatus === 'pending' || row.runnersStatus === 'reject') ?
                                                                   
                                                                    <div onChange={(e) => this.setState({idr:row.id})}>
                                                                       <form>
                                                                            <select  className="form-select"  style={{width:"100%"}}  name="runners"  defaultValue={row.runners} onChange={(e) => this.handleChangeRunner(e ,row.id)}>
                                                                               <option>Assign Runner</option>
                                                                             {this.state.runnerList.map((element, index) => (
                                                                                <option key={index}  value={element.Name}>{element.Name}</option>
                                                                                ))}
                                                                            </select>
                                                                         
                                                                            </form>
                                                                       </div>
                                                                   :<p>{row.runners}</p>}</td>
                                                                     {/* <td> {row.status === "shipping" && (row.runnersStatus === 'pending' || row.runnersStatus === 'reject') ? */}
                                                                    <td> {(row.status === "shipping" || row.status === "cancel")?
                                                                    <div >
                                                                       <form>
                                                                            <select className="form-select"  defaultValue={row.runnersStatus}   onChange={(e) => this.handleRunnerStaus(e,row.runners,row.id)}  style={{width:"100%"}}  name="status"  aria-label="Default select example">
                                                                               <option>select runners</option>
                                                                                <option value="Pending" >Pending</option>
                                                                                <option value="accepted">Accepted</option>
                                                                                <option value="reject">Rejected</option>
                                                                            </select>
                                                                         </form>
                                                                       </div>
                                                                   :<p>{row.runnersStatus?row.runnersStatus:"N/A"}</p>}</td>
                                                                   
                                                                
                                                                <td className="action-btns">
                                                                    <Link className="views-btn" to={{
                                                                        pathname: `/admin/orders/view/${row.id}`,
                                                                        state: row
                                                                    }}>
                                                                        <i className="fas fa-eye" />
                                                                    </Link>
                                                                    <Link className="edit-btn" to={{
                                                                        pathname: `/admin/orders/edit/${row.id}`,
                                                                        state: { row }
                                                                    }}><i className="fas fa-edit" /></Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
                        
                </main>
            </div>
            
        )
    }
}