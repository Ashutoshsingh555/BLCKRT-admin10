import React, { Component } from 'react'
import { GetFaqDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import RichTextEditor from '../../../../RichTextEditor';
import swal from 'sweetalert';


export default class addFaq extends Component {
    constructor(props){
        super(props);
        this.state={
             Category : "",
             Question  :"",
             AnswerText :""
        }
    }
     handleBack() {
        this.props.history.goBack();
    }
      //description handler
    handleContentChange = contentHtml => {
        this.setState({
            AnswerText: contentHtml
        });
    };
      handlechange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    async submit(e){
      e.preventDefault();
    const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
             Category : this.state.Category,
             Question  :this.state.Question,
             AnswerText :this.state.AnswerText
           };
        swal({
            title: "Are you sure?",
            text: "You want to add",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetFaqDetails.addFaq(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/faq")

                        },1000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }
  render() {
  return (
      <div className='mx-2 my-4'>
          <div>
               <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/faq'>Faqs List</a></li>
                    <li className="breadcrumb-item active"><a>Add Faq</a></li>
                </ol>
          </div>
          <form onChange={(e)=>{this.handlechange(e)}}>
             <div className="form-group col-sm-2">
                <label for="inputPassword5" className="form-label">Category*</label>
                <select id="status"  name="Category" className=" w3-input w3-border form-control">
                    <option >-select Category-</option>
                    <option value="Ordering">Ordering</option>
                    <option value="Order Processin">Order Processing</option>
                    <option value="Account Management">Account Management</option>
                    <option value="Product">Product</option>
                    <option value="Refund & Returns">Refund & Returns</option>
                    <option value="Security Privacy">Security Privacy</option>
                    <option value="Discount & Coupons">Discount & Coupons</option>
                    <option value="Pickup">Pickup</option> 
                    <option value="Delivery">Delivery</option> 
                    <option value="OutOfStock">OutOfStock</option> 
                    <option value="Complaints & FeedBacks">Complaints & FeedBacks</option> 
                 </select>
            </div>
             <div className="form-group col-sm-8">
                <label for="imageCaption" clasName="form-label">Question<em style={{color:"tomato"}}>*</em></label>
            
                <textarea type="text"  style={{ minHeight: "10em"}} name="Question" class=" w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
            </div>
             <div className="col-lg-10 col-md-10">
                <div className="form-group">
                    <label className="form-label">Answer Text*</label>
                    <RichTextEditor
                    
                        className="w3-input w3-border"
                        content={this.state.AnswerText}
                        handleContentChange={this.handleContentChange}
                        placeholder="insert text here..." />
                </div>
            </div>
            <hr></hr>
            <div className='row mx-4 my-4'>
                <div className='col-sm-1'>
                    <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light">Submit</button>
                </div>
                    <div className='col-sm-1'>
                    <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light">Cancel</button>
                </div>
            </div>

          </form>
          
      </div>
    )
  }
}
