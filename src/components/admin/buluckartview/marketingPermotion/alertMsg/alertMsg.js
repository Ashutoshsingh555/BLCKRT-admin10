import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { GetAlertCouponNotification } from"../../../../services"
import swal from 'sweetalert';


export default class alertMsg extends Component {
     constructor(props) {
        super(props);
        this.state = {
            getList: [],
            isloaded: false, 
            status: null, 
            offset: 0,
            perPage: 10,
            orgtableData: [], 
            currentPage: 0
        }
    }

  async getAlertsList() {
        this.setState({ isloaded: true })
        let list = await GetAlertCouponNotification.getAllalertListdata();
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
        this.getAlertsList();
    }
     
 
     async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete Alert from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetAlertCouponNotification.getDeletealert(id);
                    if (value) {
                        this.getAlertsList();
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
         this.getAlertsList()
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

    render() {
          const { getList } = this.state;
        return (
           <div className='mx-4 my-2'>
              <ol className="breadcrumb mb-30 mx-2 my-2">
                     <li className="breadcrumb-item"><a href="/">Home</a></li>
                     <li className="breadcrumb-item active"><a>Alert Messages</a></li>
                </ol>
                <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1">
                       <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="1">50</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                     <div className="col-sm-5 ">
                       <a  href="/admin/marketing/addeditmsg"style={{fontSize:"1.5em",color:"blue", fontWeight:'bold'}}><i class="fas fa-plus-circle" style={{color:"Tomato"}}></i>Add New</a>
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
              
                <table className="table ucp-table table-hover mx-2">
                    <thead>
                        <tr>
                            <th scope="col">DATE TIME</th>
                            <th scope='col'>TITLE</th>
                            <th scope="col">ALERT TEXT</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getList.map((row) =>(
                            <tr key={row.id}>
                                <td>{row.createdAt}</td>
                                <td>{row.title}</td>
                                <td>{row.alerttext}</td>
                                <td><div className="col-sm-2"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div></td>

                            </tr>
                        ))}
                    </tbody>
                  
                </table>
                       <div className=' py-4 mx-2'>
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
    