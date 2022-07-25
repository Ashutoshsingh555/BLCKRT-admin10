import React from "react"
const FixedRate = (props) => {
  

  return (
    props.fixedRate.map((val, idx) => {
      let Sort=`Sort-${idx}`, FixedChargeLabel=`FixedChargeLabel-${idx}`, FixedChargeAmount=`FixedChargeAmount-${idx}`
      return (
        <div>
             <div style={{float:"right"}}>
               
             {
              idx ?
              <button  style={{paddingLeft:"10px"}} className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button> : null
              }
          </div> 
          <div><br></br><br></br>
            
          <div key={val.Sort} className='row'>
            <div class="form-group col-sm-4">
              <label>Sort:-</label><br></br>
             <input type="number" defaultValue={val.Sort || ''} name="Sort" data-id={idx} id={Sort} tyle={{height:"45px",padding:"5px",width:"100%"}}  />
           </div>
           <div class="form-group col-sm-4">
              <label>FixedChargeLabel:-</label><br></br>
              <input type="number" defaultValue={val.FixedChargeLabel || ''} name="FixedChargeLabel"  data-id={idx} id={FixedChargeLabel} tyle={{height:"45px",padding:"5px",width:"100%"}}  />
            </div>
            <div class="form-group col-sm-4">
              <label>FixedChargeAmount:-</label><br></br>
              <input type="number" defaultValue={val.FixedChargeAmount || ''} name="FixedChargeAmount" id={FixedChargeAmount} data-id={idx} tyle={{height:"45px",padding:"5px",width:"100%"}}  />
            </div>
          </div>
       </div>
       
        </div>
      )
    })
  )
}
export default FixedRate
                                                   
                                              
                                          