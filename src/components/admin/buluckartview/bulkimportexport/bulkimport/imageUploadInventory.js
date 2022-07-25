import React, { Component } from 'react'
import {getBulkImportExportDetails,GetUploadInventoryImage} from"../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



export default class imageUploadInventory extends Component {
       constructor(props){
        super(props)
        this.state={
            files:"",
            getlist:[],
        }
    }

      async getinventory(){
            let list = await GetUploadInventoryImage.getInventoryList();
            this.setState({getlist:list.data})
            
          
        }
    componentDidMount(){
        this.getinventory();
    }

    // export to excell 
    downloadFile=(datas=this.state.getlist)=>{
         const  fileType= "xlsx"
        const ws= XLSX.utils.json_to_sheet(datas);
        const wb={Sheets:{data:ws},SheetNames:["data"]};
        const excelBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"});
       const data = new Blob([excelBuffer], {type:fileType});
       FileSaver.saveAs(data, "imageinventoriList"+".xlsx")

    }
    onchangehandle(e){
        this.setState({files:e.target.files})
    }
    
   handleSubmit = (e) => {
        
        e.preventDefault();
 
         const formData = new FormData();
           for (const filet of this.state.files) {
            formData.append('file', filet)
        }



         const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
           };
        swal({
            title: "Are you sure?",
            text: "You want to upload ImageInventory excell sheet",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await getBulkImportExportDetails.uploadImageInventory(formData,config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                         NotificationManager.success(list.mesage, 'Status');
                        window.location.reload(false)
                                          
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }

  render() {
    return (
      <div className='mx-4 my-4'>
             <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className='breadcrumb-item'><a href='/admin/bulk/bulkimport'>bulkImportExport</a></li>
                    <li className="breadcrumb-item"><a>Upload Image Inventory</a></li>
                </ol>
                <hr></hr>
                <div className='row mx-2'>
                    <div className='col-sm-8'>
                        <h6 className='text-danger'>please download the product image sheet first before upload new inventory excell sheet</h6>

                    </div>
                     <div className='col-sm-4'>
                         <button onClick={(e)=>this.downloadFile()} className='btntopsc btn text-light'>Download Product image Sheet</button>

                    </div>

                </div>
          <form>
            <table className="table  mx-2 border">
                <thead>
                    <tr className='py-2'>
                    <th className="col-sm-3"><h5>Upload Product Excel File </h5></th>
                        <th scope="col"><h5></h5></th>
                    </tr>
                </thead>
               <tbody>
                    <tr>
                    <td scope="col" style={{paddingTop:"20px",width:"20%"}}>Upload  Excel</td>
                        <td scope="col-sm-2"> 
                        <div className='col-sm-12 '>
                                <div className="form-group">
                                    <input type="file" onChange={(e)=>this.onchangehandle(e)} id="inputPassword5" class="w3-input w3-border form-control" aria-describedby="passwordHelpBlock"/>
                                </div>
                            </div><br></br></td>
                    </tr>
                    <tr className='py-2'>
                        <td>
                            <button className="btntopsc btn text-light mx-2"  onClick={this.handleSubmit} >Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
      </div>
    )
  }
}
