import React from "react"


const VarientDetails = (props) => {
  
  return (
    props.varientDetails.map((val, idx) => {
      let sort=`sort-${idx}`, sku=`sku-${idx}`, waightunitno=`waightunitno-${idx}`, unit=`unit-${idx}`, mrp=`mrp-${idx}`, discount=`discount-${idx}`, price=`price-${idx}`, stock=`stock-${idx}`, minstock=`minstock-${idx}`, outofstock=`outofstock-${idx}`
  
      return (
        <div>
             <div style={{float:"right"}}>
             {
              idx ?
              <button  style={{paddingLeft:"10px"}} className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button> : null
              }
          </div> 
          <div><br></br><br></br>
            
          <div key={val.index} className='row'>
            <div class="form-group col-sm-4">
              <label>Sort:</label>
              <input type="number"  name="sort" data-id={idx} id={sort} className="form-control " />
           </div>
           <div class="form-group col-sm-4">
              <label>SKU</label>
              <input type="text"  name="sku"  data-id={idx} id={sku} className="form-control " />
            </div>
            <div class="form-group col-sm-4">
              <label>Weight/Quantity</label>
              <input type="text"  name="waightunitno" id={waightunitno} data-id={idx} className="form-control " />
            </div>
          </div>
          <div  className='row'>
             <div class="form-group col-sm-4">
               <label>Unit</label>
               <input type="text"  name="unit" id={unit} data-id={idx} className="form-control " />
            </div>
            <div class="form-group col-sm-4">
              <label>MRP <em style={{color:"tomato"}}>*</em></label>
              <input type="number"  name="mrp" id={mrp} data-id={idx} className="form-control " />
            </div>
            <div class="form-group col-sm-4">
              <label>Discount(%) <em style={{color:"tomato"}}>*</em></label>
              <input type="number"  name="discount" id={discount} data-id={idx} className="form-control " />
            </div>
          </div>
          <div  className='row'>
             <div class="form-group col-sm-4">
                <label>Price <em style={{color:"tomato"}}>*</em></label>
                <input type="number"  name="price" id={price} data-id={idx} className="form-control "  value={val.price} />
             </div>
              <div class="form-group col-sm-4">
                  <label>Stock  <em style={{color:"tomato"}}>*</em></label>
                  <input type="number"  name="stock" id={stock} data-id={idx} className="form-control " />
              </div>
              <div class="form-group col-sm-4">
                  <label>Min Stock Alert <em style={{color:"tomato"}}>*</em></label>
                  <input type="number"  name="minstock" id={minstock} data-id={idx} className="form-control " />
              </div>
              <div className='col-sm-4'>
                <div className="form-group">
                    <label className="form-label">Variant Out of Stock Status <em style={{color:"tomato"}}>*</em></label>
                    <select name="outofstock" id={outofstock} data-id={idx} className="form-control" >
                         <option value="Continew selling after out of stock">Continew selling after out of stock </option>
                        <option value="Show out of stock on minimum quantity">Show out of stock on minimum quantity</option>
                        <option value="Show out of stock on thurshold quantity">Show out of stock on thurshold quantity</option>
                    </select>
                </div>
            </div>
             <hr className="my-4"></hr>
        </div>
          </div>
       
        </div>
      )
    })
  )
}
export default VarientDetails
                                                   
                                              
                                          