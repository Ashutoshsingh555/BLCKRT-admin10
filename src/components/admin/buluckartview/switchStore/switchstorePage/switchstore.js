import React, { Component } from 'react'
import "./switchstore.css"
import ReactPaginate from 'react-paginate';

export default class switchstore extends Component {
    render() {
        return (
            <div className='switchstore'>
                 <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Store User Management</li>
                </ol>
                
                <div>
                    <table className="table ucp-table table-hover mx-2">
                        <thead>
                            <tr>
                                <th scope="col">STORE NAME</th>
                                <th scope="col">CURRENT LOGGED STORE</th>
                                <th scope="col">ORDERS</th>
                                <th scope="col">CUSTOMERS</th>
                                <th scope='col'>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                              <tr>
                                <td scope="col">Buluckart</td>
                                <td scope="col">Active</td>
                                <td scope="col"><a href='#'>1946</a></td>
                                <td scope="col"><a href="#">14699</a></td>
                                <td scope='col'><a href='#'>Switch Store</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='py-4'>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        // pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        // onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                 
            </div>
        )
    }
}
