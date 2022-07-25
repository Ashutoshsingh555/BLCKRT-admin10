import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import {GetUserLogin} from"../../../../services";
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
import {Link} from'react-router-dom'

export default class userindex extends Component {
       constructor(props) {
        super(props);
        this.state = {
            getUserList: [],
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
      async getlistdata(){
        this.setState({ isloaded: false })
        let list = await GetUserLogin.getAllUserData()
       
         if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                getUserList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        
    }

    async componentDidMount() {
        this.getlistdata();
    }
  
      async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to user from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
         
                    let value = await GetUserLogin.getDeleteUserList(id);
                    if (value) {
                        this.getProductList();
                        window.location.reload(false);
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
			getUserList:slice
		})
	
    }
    render() {
        return (
            <div className='mx-4 my-2'>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Store User Management</li>
                </ol>
                 <div  className='px-4 py-2' style={{ float:"right",display:"flex",paddingRight:"5%"}}>
                       <a href="admin/user/create"  className="btn btntop text-light  mx-4 py-2">Add New</a>
                </div><br></br>
                <br></br> 
                <div>
                    <table className="table ucp-table table-hover mx-2">
                        <thead>
                            <tr className='mx-2'>
                                <th scope="col">FIRST NAME</th>
                                <th scope="col">LAST NAME</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">PHONE NUMBER</th>
                                <th scope="col">Email</th>
                                <th scope='col'>ROLE</th>
                                <th scope='col'>ACTION</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.getUserList.map((row ,id) =>(
                                    <tr key={row.id}>
                                        <td>{row.firstName}</td>
                                        <td>{row.lastName}</td>
                                        <td>{row.address}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.email}</td>
                                        <td>{row.role}</td>
                                        <td>
                                             <td scope="col">
                                    <div className="row">
                                             <div className="col-sm-3 mx-2">
                                              <Link to={{ pathname: `/admin/marketing/editcoupon`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} className="fas fa-pencil-alt">
                                                </i> 
                                            </Link>
                                           </div>||
                                        <div className="col-sm-3"><i  onClick={(e) => this.handlDeleteById(row.id)} style={{fontSize:'18px'}} class="far fa-trash-alt"></i></div>
                                    </div>
                                </td>
                                        </td>
                                    </tr>
                                ))
                            }
                             
                        </tbody>
                    </table>
                </div>
                <div className='py-4 mx-4'>
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
