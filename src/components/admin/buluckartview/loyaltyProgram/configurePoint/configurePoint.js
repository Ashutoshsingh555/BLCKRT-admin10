import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import {Link} from'react-router-dom'
import { GetConfigLoyalityDetails} from "../../../../services"

export default class configurePoint extends Component {
    constructor(props){
        super(props)
        this.state={
             getList: [],
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
          async getListConFig(){
        this.setState({ isloaded: false })
        let list = await GetConfigLoyalityDetails.getConfigList()
       
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

    async componentDidMount() {
        this.getListConFig();
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
        return (
            <div className='mx-4'>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Loyalty Point</li>
                </ol>
                <hr className='mx-4'></hr>
                <div>
                    <table className="table">
                        <thead className='py-4'>
                            <tr>
                                <th scope="col-5">POINTS</th>
                                <th scope="col-4">ORDER AMOUNT</th>
                                <th scope="col-3">ACTION</th>
                             </tr>
                        </thead>
                        <tbody>
                            {this.state.getList.map((row,id)=>(
                                 <tr className='my-4'>
                                <td scope="col-5">{row.Points}</td>
                                <td scope="col-4">{row.Amounts}</td>
                                <td scope="col-3"> 
                                <div className="row">
                                       <div className="col-sm-2">
                                              <Link to={{ pathname: `/admin/loyalty/editConfig`,
                                                                            state: { row }
                                                                        }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt">
                                                                  </i> 
                                            </Link>
                                            </div>
                                    </div>
                                </td>
                             </tr>

                            ))}
                           
                        </tbody>
                    </table>
                </div>
                  <div className=' mx-4' style={{paddingTop:"20%"}}>
                      <hr className='mx-4'></hr>
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
