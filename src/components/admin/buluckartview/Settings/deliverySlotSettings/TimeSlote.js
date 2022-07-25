import React from "react"
const TimeSlote = (props) => {
  

  return (
    props.timeSlote.map((val, idx) => {
      let timeSlotfrom=`timeSlotfrom-${idx}`, timeSlotTo=`timeSlotTo-${idx}`, Mon=`Mon-${idx}`, Tue=`Tue-${idx}`, Wed=`Wed-${idx}`, Thu=`Thu-${idx}`, Fri=`Fri-${idx}`, Sat=`Sat-${idx}`, Sun=`Sun-${idx}`
      return (
        <div>
             <div style={{float:"right"}}>
               
             {
              idx == 0 ||idx?
              <button  style={{paddingLeft:"10px"}} className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button> : null
              }
          </div> 
          <div><br></br><br></br>
            
          <div key={val.Sort} className='row'>
                <label style={{fontWeight:800}}>Time Slot:-{idx+1}<em style={{color:"tomato"}}>*</em> </label>
            <div class="form-group col-sm-3">
             <select  value={val.timeSlotfrom} name="timeSlotfrom"  data-id={idx} id={timeSlotfrom}  style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                         
                        <option>~Select The Time~</option>
                        <option value="00:00">00:00</option>
                        <option value="00:30">00:30</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                        <option value="24:00">24:00</option>
                </select>
           </div>
           <div className="col-sm-1">
                     <label>To</label>
           </div>
           <div class="form-group col-sm-3">
               <select  value={val.timeSlotTo} name="timeSlotTo"  data-id={idx} id={timeSlotTo}  style={{padding:"4px",borderRadius:"2px", width:"100%"}} >                         
                        <option>~Select The Time~</option>
                        <option value="00:00">00:00</option>
                        <option value="00:30">00:30</option>
                        <option value="01:00">01:00</option>
                        <option value="02:00">02:00</option>
                        <option value="03:00">03:00</option>
                        <option value="04:00">04:00</option>
                        <option value="05:00">05:00</option>
                        <option value="06:00">06:00</option>
                        <option value="07:00">07:00</option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="21:00">21:00</option>
                        <option value="22:00">22:00</option>
                        <option value="23:00">23:00</option>
                        <option value="24:00">24:00</option>
                </select>
            </div>
            <div className="row">
                <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox" defaultChecked={val.Mon == 'Mon'? true:null} name="Mon"  data-id={idx} id={Mon} value={val.Mon == 'Mon'? null:'Mon'} /> Mon <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox" defaultChecked={val.Tue == 'Tue'?true:null} name="Tue"   data-id={idx} id={Tue} value={val.Tue == 'Tue'? null:'Tue'}  /> Tue <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox"  defaultChecked={val.Wed == 'Wed'?true:null}  name="Wed"  data-id={idx} id={Wed} value={val.Wed == 'Wed'? null:'Wed'}  /> Wed <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox" defaultChecked={val.Thu == 'Thu'?true:null}   name="Thu"  data-id={idx} id={Thu} value={val.Thu == 'Thu'? null:'Thu'} /> Thu <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox" defaultChecked={val.Fri == 'Fri'?true:null}   name="Fri"  data-id={idx} id={Fri} value={val.Fri == 'Fri'? null:'Fri'}  /> Fri <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox" defaultChecked={val.Sat =='Sat'?true:null}  name="Sat"  data-id={idx} id={Sat} value={val.Sat == 'Sat'? null:'Sat'}  /> Sat <br />
                </a>
                  <a className=" btn bg-success col-sm-1 mx-2 text-light">
                    <input type="checkbox"  defaultChecked={val.Sun == 'Sun'?true:null} name="Sun"  data-id={idx} id={Sun}value={val.Sun == 'Sun'? null:'Sun'}  /> Sun <br />
                </a>
                
               
            </div>
          </div>

       </div>
       
        </div>
      )
    })
  )
}
export default TimeSlote
                                                   
                                              
                                          