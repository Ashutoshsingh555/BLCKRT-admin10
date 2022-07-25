import React, { Component } from 'react'
import {GetSettingPageDetails} from '../../../../services'
import {Link} from'react-router-dom'
import parse from 'html-react-parser';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default class settingpages extends Component {
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

  async getlistData() {
        this.setState({ isloaded: true })
        let list = await GetSettingPageDetails.getAllPageList();
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
        this.getlistData();
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
     async handlDeleteById(id) {
    
        swal({
            title: "Are you sure?",
            text: "You want to delete  DeliveryAreas from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetSettingPageDetails.getDeletePage(id);
                    if (value) {
                        this.getProductList();
                        window.location.reload(false);
                    }
                }
            });
    }
    render() {
        return (
            <div className='settingbody'>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Pages</li>
                </ol>
                <div>
                     <div className='row mx-4 my-4'>
                        <div  style={{paddingLeft:"80%"}}>
                             <a href='/admin/settings/addpage' className="btntopsc btn text-light px-4">Add New</a>
                            </div>
                        
                    </div>
                </div>
                <div>
                     <table className="table ucp-table mx-4 my-4">
                        <thead>
                            <tr className='mx-'>
                                <th  scope="col" style={{width:'45%'}}>PAGE</th>
                                {/* <th scope="col" style={{width:'35%'}}>MESSAGE</th> */}
                                <th>ACTION</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.getList.map((row,id)=>(
                                <tr key={row.id}>
                                    <td>{row.Page}</td>
                                    {/* <td>{parse(row.Message)}</td> */}
                                    <td scope="col">
                                    <div className="row">
                                        <div className="col-sm-1">
                                              <Link to={{ pathname: `/admin/settings/editpage`,
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
                  <div className='mx-4'>
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
