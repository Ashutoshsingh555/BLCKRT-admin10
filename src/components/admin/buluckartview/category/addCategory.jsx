import React, { Component } from 'react'
import { GetCategoryDetails } from '../../../services';
import swal from 'sweetalert';

export default class addCategory extends Component {
     constructor(props) {
        super(props);
        this.state = {
            name: '',
            photo: '',
         }
      }
       // the category data ..........
     handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ photo: event.target.files[0] });
    };
    
    handleSubmit = event => {
        event.preventDefault();

        const { name ,photo} = this.state;
        const formData = new FormData();

        formData.append('name', name);
        formData.append('photo', photo);
    
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.createCategoryList(formData, config);
                    if (list) {
                        this.getCategory();
                        this.props.history.push("/admin/maincotegory/create")
                    }
                }
            });
    }
    
     handleBack() {
            this.props.history.goBack();
        }
  render() {
    return (
     <div className="bg-light" style={{ minHeight:"100%"}}>
            {/* //  <div className="backGround"> */}
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                               
                                <div className="row justify-content-center">
                                    <div className="col-lg-5 py-4">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header card-sign-header">
                                                <h3 className="text-center font-weight-light my-4">Add Category</h3>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="form-label">Title*</label>
                                                        <input type="text" className="form-control" placeholder="Category name"  value={this.state.name} onChange={(e) => this.handleChange(e)} name="name"  />
                                                    </div>
                                                    <div class="file-area">
                                                          <div class="form-group">
                                                              <label className="form-label">Select Image*</label>
                                                            <input type="file" className="form-control"  onChange={this.onFileChange} name="photo"  />
                                                              <div class="file-dummy">
                                                                  <span class="default">Click to select a file, or drag it here</span>
                                                                  <span class="success">Great, your file is selected</span>
                                                              </div>
                                                          </div>
                                                      </div>
                                                        <button className="btn btn-primary hover-btn mx-2" onClick={this.handleSubmit}type="submit">Save</button>
                                                        <button  class="btn btn-outline-primary" onClick={this.handleBack}>Close</button>
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
    )
  }
}


