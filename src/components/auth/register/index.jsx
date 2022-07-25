import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { GetUserLogin } from '../../services';
import"../styl.css"
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "", lastName: "", phoneNo: "", address: "",role:"", email: "", password: "",
            redirectToReferrer: false,
        }
    }
    handleChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const{ firstName, lastName, phoneNo, address, email, password ,role} = this.state;
        let data = { firstName: firstName, lastName: lastName, phoneNo: phoneNo,role:role, address: address, email, password };
        let user = await GetUserLogin.getUserRegister(data);
        if (user) {
            this.setState({ redirectToReferrer: true })
            window.location.reload();
        }

    }
    render() {
        if (this.state.redirectToReferrer || localStorage.getItem('token')) {
            return (<Redirect to={'/auth/login'} />)
        }
        console.log(this.state)

        return (
            // <div className="bg-sign">
             <div className="backGround1">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header card-sign-header">
                                                <h3 className="text-center font-weight-light m-2">Register</h3>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="form-label">First Name*</label>
                                                        <input className="form-control py-3" type="text" placeholder="Enter firstname" name="firstName" value={this.state.firstName} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Last Name*</label>
                                                        <input className="form-control py-3"  type="text" placeholder="Enter lastName" name="lastName" value={this.state.lastName} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Phone*</label>
                                                        <input className="form-control py-3" type="number" placeholder="Enter phone" name="phoneNo" value={this.state.phoneNo} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Address*</label>
                                                        <input className="form-control py-3"  type="text" placeholder="Enter address" name="address" value={this.state.address} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                     <div className="form-group">
                                                        <label className="form-label" >Role*</label>
                                                         <select id="role" name="role" className="custom-select"  onChange={(e) => this.handleChangeUser(e)}>
                                                                <option value="Admin">Admin</option>
                                                                <option value="Backend Supervisor">Backend Supervisor</option>
                                                                <option value="Accounts holder">Accounts holder</option>
                                                        </select>
                                                    </div>

                                                   
                                                          
                                                    <div className="form-group">
                                                        <label className="form-label">Email*</label>
                                                        <input className="form-control py-3" type="email" placeholder="Enter email address" name="email" value={this.state.email} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Password*</label>
                                                        <input className="form-control py-3"  type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>

                                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0" onClick={this.handleSubmit}>
                                                        <a className="btn btn-sign hover-btn">Submit</a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}