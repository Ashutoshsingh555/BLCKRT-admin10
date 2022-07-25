import React,{Component} from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import ReactDOM from "react-dom";

// import html2canvas from "html2canvas";


export default class GstPrint extends Component {
    constructor(props){
        super(props);
        this.state={
            getlist:"",
            intialdate:"",
            Finaldate:""
        }
    }
//  printPDF = () => {
//     const domElement = document.getElementById("root");
//     html2canvas(domElement, {
//       onclone: document => {
//         document.getElementById("print").style.visibility = "hidden";
//       }
//     }).then(canvas => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPdf();
//       pdf.addImage(imgData, "JPEG", 10, 10);
//       pdf.save(`${new Date().toISOString()}.pdf`);
//     });
//   };

  render() {
           const self =this.props.location.state
      console.log(this.props.location.state,"ggfggg")

    return (
      <div className="mx-4 my-4">
      
         <div className="col-sm-2">
                 <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Exports GSTR1"/>
            </div>
             
      
                  <div className="row">
                <div className="col-sm-2">
                {/* <a  href=""style={{fontSize:"1em",color:"blue", fontWeight:'bold'}}>Date From<i class="fas fa-calendar-alt mx-2" style={{fontSize:"25px"}}></i></a> */}
                  <div className="input-group">
                    <input className="custom-select" onChange={(e)=>{this.setState({intialdate:e.target.value})}} type="date" />
                </div>
            </div>
            <div className="col-sm-2">
                <div className="input-group">
                    <input className="custom-select" type="date"  onChange={(e)=>{this.setState({Finaldate:e.target.value})}} />
                </div>
            </div>

            </div>
           
            <table className="table ucp-table table-hover"  id="table-to-xls">
           <thead>
         <tr>
           <h3  className="text-dark">GST Annual Computional-HSN/SAC Summary(Outward) </h3> 
          </tr> <tr>
              <h6>{this.state.intialdate}  {this.state.Finaldate}</h6>
             </tr>
               <tr>
                 <th>HSN/SAC </th>
                 <th>Type of Supply</th>
                 <th>UQC</th>
                 <th>Total Quantity</th>
                 <th>Total Value</th>
                 <th>Taxable Amount</th>
                <th>Rate of Tax  </th>
                <th>Itegrated Tax Amount</th>
                <th>Central Tax Amount</th>
                <th>State Tax Amount </th>
                <th>Cess Amount</th>
                <th>Tax Amount</th>
          </tr>
           </thead>
          <tbody>
             {self.orderCarts.map(ele =>
            <tr key={ele.id}>
              <td>1000</td>
              <td>Goods</td> 
              <td>NOS-NUMBER</td>
              <td>{ele.qty}</td>
              <td>{ele.total}</td>
              <td>{(ele.total*ele.GSTrate)/100}</td>
              <td>{ele.GSTrate}%</td>
              <td></td>
              <td>{2*(ele.total*ele.GSTrate)/100}</td>
              <td>{(ele.total*ele.GSTrate)/100}</td>
              <td></td>
              <td>{2*(ele.total*ele.GSTrate)/100}</td>

            </tr>
              
              )}
          
            {/* <tr>
              <td>Grand Total</td>
              <td>2825252</td>
              <td>85855</td> 
              <td>5252252</td>
              <td>8525</td>
              <td>787</td>
              <td>656</td>
             

            </tr> */}
          </tbody>

            </table>
        
    
    
    
      </div>
    )
  }
}
