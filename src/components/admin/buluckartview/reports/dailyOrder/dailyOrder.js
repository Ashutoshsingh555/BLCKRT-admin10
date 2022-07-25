import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { GetSoldReport } from '../../../../services'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class dailyOrder extends Component {
      constructor(props) {
        super(props);
        this.state = {
            getList: [],
            isloaded: false,
            status: null,
            filterKey: '',
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0,
            Finaldate:"",
            intialdate:""
        }
    }

    async getOrderList() {
        this.setState({ isloaded: true })
        let list = await GetSoldReport.getdailyreports();
        if (list) {
            var tdata = list.order;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
    }
    componentDidMount() {
        this.getOrderList();
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
            getList: slice
        })

    }

    ///search functionality
    SearchClick = async () => {
        if (this.state.filterKey) {
            let value = this.state.filterKey
            const lowercasedValue = value.toLowerCase().trim();
            const getList1 = this.state.getList.filter(item => {
                return Object.keys(item).some(key =>
                  item[key] == value
                );
            });
            this.setState({ getList: getList1 });
        }
        if(this.state.Finaldate && this.state.intialdate){
              let filterdata = this.state.getList.filter(item => (item.createdAt >= this.state.intialdate && item.createdAt <= this.state.Finaldate))
              this.setState({getList:filterdata})
        }
    }
    //reset function
    resetFunction(e) {
        window.location.reload(false)
    }
    render() {
        console.log(this.state.getList,"list")
       return (
            <div className='mx-4'>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Daily Sales Report</li>
                </ol>
               
               
                
                <div className='row mx-2 py-4'>
                    <div className="col-sm-3">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success mb-3"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Exports Data" />
                    </div>
                    <div className="col-sm-2">
                        <form class="d-flex">
                            <input class="form-control me-2" onChange={(e) => { this.setState({ filterKey: e.target.value }) }} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>

                    <div className="col-sm-2">
                         <input className="custom-select" onChange={(e)=>{this.setState({intialdate:e.target.value})}} type="date" />
                    </div>
                    <div className="col-sm-2">
                        <input className="custom-select" type="date"  onChange={(e)=>{this.setState({Finaldate:e.target.value})}} />
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn " onClick={(e) => { this.SearchClick(e) }} style={{ background: "#393575", color: "white" }}>Go</button>
                    </div>
                    <div className="col-sm-1">
                        <button type="button" onClick={(e) => this.resetFunction(e)} className="btn btn-outline-secondary">reset</button>

                    </div>
                </div>
                <div>
                    <table className="table ucp-table table-hover mx-4"  id="table-to-xls">
                        <thead>
                            <tr className='mx-'>
                                <th style={{ width: 100 }}>DATE</th>
                                <th scope="col">COUNT OF ORDER</th>
                                <th scope="col">TOTAL PAYMENT</th>
                                <th scope="col">DISCOUNT</th>
                                {/* <th scope='col'>PAYMENT IN CASH</th>
                                <th scope='col'>ONLINE PAYMENT</th>
                                <th scope='col'>ANDROID PAYMENT</th>
                                <th scope='col'>IOS PAYMENT</th>
                                <th scope='col'>WEBSITE PAYMENT</th> */}
                                {/* <th scope='col'>VIEW</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.getList.map((row,id) =>(
                                    <tr key={row.id}>
                                        <td>{row.createdAt?row.createdAt:null}</td>
                                        <td>{row.TotalOrder?row.TotalOrder:null}</td>
                                        <td>{row.TotalAmount?row.TotalAmount:null}</td>
                                        <td>{row.totalDiscount?row.totalDiscount:null}</td>
                                        {/* <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td> */}

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
