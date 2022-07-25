import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import { GetSoldReport } from '../../../../services'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class soldItemReport extends Component {
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
        let list = await GetSoldReport.getAllSoldList();
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
        const { getList, isloaded, filterKey, status, statusList } = this.state;
   
        return (
            <div>
                <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Daily Sold Items Report</li>
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
                        {/* <a  href=""style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}><i class="far fa-folder mx-2" style={{color:"Tomato",fontSize:"25px"}}></i>Export Data</a> */}
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
                    <table className="table ucp-table table-hover mx-4" id="table-to-xls">
                        <thead>
                            <tr className='mx-'>
                                <th scope="col">DATE</th>
                                <th scope="col">HSN/SKU</th>
                                <th scope="col">PRODUCT ID</th>
                                <th scope="col">NAME</th>
                                <th scope='col'>VARIANT ID</th>
                                <th scope='col'>SALE QUANTITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getList === 'undefined' ? <p>Loading</p> :
                                    getList.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.createdAt ? row.createdAt : ""}</td>
                                            {
                                                row.orderCarts.map((ele, id) => (
                                                    <td key={ele.id}>{ele.varientModel ? ele.varientModel.sku : null}</td>
                                                ))
                                            }
                                            {
                                                row.orderCarts.map((ele, id) => (
                                                    <td key={ele.id}>{ele.productId ? ele.productId : ""}</td>
                                                ))
                                            }
                                            {
                                                row.orderCarts.map((ele, id) => (
                                                    <td key={ele.id}>{ele.productName ? ele.productName : ""}</td>
                                                ))
                                            }
                                            {
                                                row.orderCarts.map((ele, id) => (
                                                    <td key={ele.id}>{ele.varientModel ? ele.varientModel.id : ""}</td>
                                                ))
                                            }
                                            {
                                                row.orderCarts.map((ele, id) => (
                                                    <td key={ele.id}>{ele.qty ? ele.qty : ""}</td>
                                                ))
                                            }
                                        </tr>
                                    ))}
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
