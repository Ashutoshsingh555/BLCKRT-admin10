import React, { Component } from 'react'
import {GetVarientDetails} from'../../../../services';
import {Link} from'react-router-dom'
import ReactPaginate from 'react-paginate';
import"./varient.css"

export default class varientstock extends Component {
    constructor(props){
        super(props);
        this.state={
            outOfvarientList:[],
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
    async getlistdata(){
        let list = await GetVarientDetails.getoutofvarient();
              if (list) {
            var tdata = list.data;
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                outOfvarientList:slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
        }
    componentDidMount(){
        this.getlistdata();
    }
 ///search functionality
 SearchClick = async() => {
     if(this.state.filterKey){
        let value =this.state.filterKey
        const lowercasedValue = value.toLowerCase().trim();
        let list = await GetVarientDetails.getoutofvarient();
        const outOfvarientList1 = list.data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(lowercasedValue)
            );
            });
            console.log(outOfvarientList1)
            this.setState({outOfvarientList:outOfvarientList1});
        }else{
            this.getlistdata()
            
            

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
			outOfvarientList:slice
		})
	
    }

    
    render() {
       const {outOfvarientList}=this.state;
        return (
            <div className='varientpage'>
                 <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a>Variants</a></li>
                </ol>
                 
                 <div className="topwraper py-4 mx-2" style={{minHeight:"80%"}}>
                    <div className='row'>
                        <div className="col-sm-1 mx-2">
                        <select class="form-select" onChange={(e)=>this.setState({perPage:e.target.value})}  style={{padding:"5px"}} aria-label="Default select example">
                                <option value="25">20</option>
                                <option value="50">1</option>
                                <option value="100">100</option>
                        </select>
                        </div>
                   <div className="col-sm-5 varienttitle">
                            <h2>List of product variants.</h2>
                        </div>
                        <div className="col-sm-2">
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
              
                    <table className="table ucp-table table-hover mx-2">
                        <thead >
                            <tr className='py-2'>
                                <th scope="col"> PRODUCT IMAGE</th>
                                <th scope='col'>PRODUCT NAME</th>
                                <th scope="col">CATEGORY</th>
                                <th scope="col">VARIANT</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">MIN STOCK ALERT</th>
                                <th scope="col">EDIT</th>
                            
                            </tr>
                         
                            {
                                outOfvarientList.map((row,id)=>(
                                    <tr key={row.id}>
                                        <td scope="col"> 
                                            <div className="cate-img-5 ">
                                                <img  src={row.product.photo} class="rounded-circle" width={'20px'}height={'40px'} alt="categorys" />
                                            </div>
                                        </td>
                                        <td>{row.product.name}</td>
                                        <td>{row.product.category.name}</td>
                                        <td>{row.waightunitno}</td>
                                        <td>{row.stock}</td>
                                        <td>{row.minstock}</td>
                                        <td>
                                            <Link to={{ pathname: `/admin/varient/editvarient`,
                                                state:{row}
                                            }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt"></i>
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                            }
                           
                        </thead>
                    
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
        )
    }
}
