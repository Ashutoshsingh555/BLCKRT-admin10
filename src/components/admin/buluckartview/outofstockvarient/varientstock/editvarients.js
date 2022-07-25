import React, { Component } from 'react'
import {GetVarientDetails} from'../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';


export default class editvarients extends Component {
    constructor(props){
        super(props);
        let self= this.props.location.state.row
        this.state={
                varientid:self.id,
                sort:self.sort,
                sku: self.sku,
                waightunitno: self.waightunitno,
                unit:self.unit,
                mrp:self.mrp,
                discount:self.discount,
                price:self.price,
                stock:self.stock,
                minstock:self.minstock,
                outofstock: self.outofstock

        }
    }
     handleBack() {
        this.props.history.goBack();
    }
    handlechange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    async submit(e){
      e.preventDefault();
   const {   sort, sku, unit, mrp, discount,waightunitno, price, stock, minstock,outofstock,varientid}= this.state;

      if(this.state.imageCaption === '' || this.state.imagBannerType ==='')
        {
            NotificationManager.error(" Error -Please Fill up  all Required Field!!!");
            return false;
        }
       const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
                varientid:varientid,
                sort: sort,
                sku: sku,
                waightunitno: waightunitno,
                unit: unit,
                mrp:mrp,
                discount:discount,
                price:price,
                stock:stock,
                minstock:minstock,
                outofstock:outofstock,
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update varient",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetVarientDetails.getUpdatevarient(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/varient/varientstock")

                        },1000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }


  render() {
    return (
      <div className='mx-2 my-2'>
          <div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/varient/varientstock">Out of varient List</a></li>
                    <li className="breadcrumb-item active">Edit varient</li>
                </ol>
          </div>
          <hr></hr>
            <div className="col" style={{fontSize:"30px",fontWeight:"500", textAlign:"center"}}>
                <h2>Update out of varient </h2>
            </div>
                <hr></hr>
          <div className='mx-4 my-4'>
                <form onChange={(e)=>{this.handlechange(e)}}>
                    <div className='row'>
                        <div class="form-group col-sm-4">
                        <label>Sort:</label>
                        <input type="text"  name="sort"  value={this.state.sort} className="form-control " />
                    </div>
                    <div class="form-group col-sm-4">
                        <label>SKU</label>
                        <input type="text"  name="sku" value={this.state.sku} className="form-control " />
                        </div>
                        <div class="form-group col-sm-4">
                        <label>Weight/Quantity</label>
                        <input type="text"  name="waightunitno" value={this.state.waightunitno}  className="form-control " />
                        </div>
                    </div>
                    <div  className='row'>
                        <div class="form-group col-sm-4">
                        <label>Unit</label>
                        <input type="text"  name="unit" value={this.state.unit} className="form-control " />
                        </div>
                        <div class="form-group col-sm-4">
                        <label>MRP <em style={{color:"tomato"}}>*</em></label>
                        <input type="text"  name="mrp" value={this.state.mrp} className="form-control " />
                        </div>
                        <div class="form-group col-sm-4">
                        <label>Discount(%) <em style={{color:"tomato"}}>*</em></label>
                        <input type="text"  name="discount"  value={this.state.discount} className="form-control " />
                        </div>
                    </div>
                    <div  className='row'>
                        <div class="form-group col-sm-4">
                            <label>Price <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  name="price"value={this.state.price}  className="form-control " />
                        </div>
                        <div class="form-group col-sm-4">
                            <label>Stock  <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  name="stock" value={this.state.stock}  className="form-control " />
                        </div>
                        <div class="form-group col-sm-4">
                            <label>Min Stock Alert <em style={{color:"tomato"}}>*</em></label>
                            <input type="text"  name="minstock" value={this.state.minstock} className="form-control " />
                        </div>
                        <div className='col-sm-4'>
                            <div className="form-group">
                                <label className="form-label">Variant Out of Stock Status <em style={{color:"tomato"}}>*</em></label>
                                <select name="outofstock" value={this.state.outofstock} className="form-control" >
                                    <option value="Continew selling after out of stock">Continew selling after out of stock </option>
                                    <option value="Show out of stock on minimum quantity">Show out of stock on minimum quantity</option>
                                    <option value="Show out of stock on thurshold quantity">Show out of stock on thurshold quantity</option>
                                </select>
                            </div>
                        </div>
                    </div>
              </form>
              </div>
          <hr></hr>
           <div className='filebtndiv mx-4'>
                          <buton  onClick={(e) => this.handleBack()} className="btn btntop text-light col mx-2 my-2">Cancle</buton>
                          <buton   onClick={(e)=> this.submit(e)} className="btn btntop text-light col mx-2 my-2">Add</buton>
                    </div>
          
      
          
      </div>
    )
  }
}
