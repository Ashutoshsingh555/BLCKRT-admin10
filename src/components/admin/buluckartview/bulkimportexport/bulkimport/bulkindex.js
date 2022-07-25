import React, { Component } from 'react'
import "./bulkindex.css"
import {getBulkImportExportDetails,GetProductDetails} from"../../../../services"
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import fileexcell from"../sampleFile/Product_UploadSample.xlsx"


export default class bulkindex extends Component {
    constructor(props){
        super(props)
        this.state={
            files:"",
            getlist:[],
           
        }
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
            text: "You want to upload product excell sheet",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await getBulkImportExportDetails.addProductUploadfile(formData,config);
                
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
    async getproductlist(){
         let list = await GetProductDetails.getAllProductList();
      
         let exportlist =[]
 
    for (let i = 0; i <list.product.length; i++) {
            await exportlist.push({ 
            product_Id: list.product[i].id,
            name: list.product[i].name,
            description: list.product[i].description,
            ProductOrigin: list.product[i].originPlace,
            ProductDetails: list.product[i].aboutProduct,
            NutrientsAndProteins: list.product[i].nutrientsDetals,
            StorageAndUses: list.product[i].storeUses,
            VideoThumbnail: list.product[i].photo,
            lable_Type: list.product[i].lableType,
            Active_Status: list.product[i].status,
             isTex: list.product[i].isTex,
            GSTrate: list.product[i].GSTrate,
            GSTtyp: list.product[i].GSTtyp,
            HSNcode: list.product[i].HSNcode,
            videoUpload:list.product[i].videoUpload,
            categoryId:list.product[i].categoryId,
            subCategoryId: list.product[i].subCategoryId,
            varients1_sort:list.product[i].varientModels[0]?list.product[i].varientModels[0].sort:null,
            varients1_sku:list.product[i].varientModels[0]?list.product[i].varientModels[0].sku:null,
            varients1_waightunitno:list.product[i].varientModels[0]?list.product[i].varientModels[0].waightunitno:null,
            varients1_unit:list.product[i].varientModels[0]?list.product[i].varientModels[0].unit:null,
            varients1_mrp:list.product[i].varientModels[0]?list.product[i].varientModels[0].mrp:null,
            varients1_discount:list.product[i].varientModels[0]?list.product[i].varientModels[0].discount:null,
            varients1_price:list.product[i].varientModels[0]?list.product[i].varientModels[0].price:null,
            varients1_stock:list.product[i].varientModels[0]?list.product[i].varientModels[0].stock:null,
            varients1_minstock: list.product[i].varientModels[0]?list.product[i].varientModels[0].minstock:null,
            varients1_outofstock: list.product[i].varientModels[0]?list.product[i].varientModels[0].outofstock:null,
            varients2_sort:list.product[i].varientModels[2]?list.product[i].varientModels[1].sort:null,
            varients2_sku:list.product[i].varientModels[2]?list.product[i].varientModels[1].sku:null,
            varients2_waightunitno:list.product[i].varientModels[2]?list.product[i].varientModels[1].waightunitno:null,
            varients2_unit:list.product[i].varientModels[2]?list.product[i].varientModels[1].unit:null,
            varients2_mrp:list.product[i].varientModels[2]?list.product[i].varientModels[1].mrp:null,
            varients2_discount:list.product[i].varientModels[2]?list.product[i].varientModels[1].discount:null,
            varients2_price:list.product[i].varientModels[2]?list.product[i].varientModels[1].price:null,
            varients2_stock:list.product[i].varientModels[2]?list.product[i].varientModels[1].stock:null,
            varients2_minstock: list.product[i].varientModels[2]?list.product[i].varientModels[1].minstock:null,
            varients2_outofstock: list.product[i].varientModels[2]?list.product[i].varientModels[1].outofstock:null,
            varients3_sort:list.product[i].varientModels[3]?list.product[i].varientModels[2].sort:null,
            varients3_sku:list.product[i].varientModels[3]?list.product[i].varientModels[2].sku:null,
            varients3_waightunitno:list.product[i].varientModels[3]?list.product[i].varientModels[2].waightunitno:null,
            varients3_unit:list.product[i].varientModels[3]?list.product[i].varientModels[2].unit:null,
            varients3_mrp:list.product[i].varientModels[3]?list.product[i].varientModels[2].mrp:null,
            varients3_discount:list.product[i].varientModels[3]?list.product[i].varientModels[2].discount:null,
            varients3_price:list.product[i].varientModels[3]?list.product[i].varientModels[2].price:null,
            varients3_stock:list.product[i].varientModels[3]?list.product[i].varientModels[2].stock:null,
            varients3_minstock: list.product[i].varientModels[3]?list.product[i].varientModels[2].minstock:null,
            varients3_outofstock: list.product[i].varientModels[3]?list.product[i].varientModels[2].outofstock:null,
            varients4_sort:list.product[i].varientModels[4]?list.product[i].varientModels[3].sort:null,
            varients4_sku:list.product[i].varientModels[4]?list.product[i].varientModels[3].sku:null,
            varients4_waightunitno:list.product[i].varientModels[4]?list.product[i].varientModels[3].waightunitno:null,
            varients4_unit:list.product[i].varientModels[4]?list.product[i].varientModels[3].unit:null,
            varients4_mrp:list.product[i].varientModels[4]?list.product[i].varientModels[3].mrp:null,
            varients4_discount:list.product[i].varientModels[4]?list.product[i].varientModels[3].discount:null,
            varients4_price:list.product[i].varientModels[4]?list.product[i].varientModels[3].price:null,
            varients4_stock:list.product[i].varientModels[4]?list.product[i].varientModels[3].stock:null,
            varients4_minstock: list.product[i].varientModels[4]?list.product[i].varientModels[3].minstock:null,
            varients4_outofstock: list.product[i].varientModels[4]?list.product[i].varientModels[3].outofstock:null,
           
            Tag1_name:list.product[i].tagModels[0]?list.product[i].tagModels[0].name:null,
            Tag2_name:list.product[i].tagModels[1]?list.product[i].tagModels[1].name:null,
            Tag3_name:list.product[i].tagModels[2]?list.product[i].tagModels[2].name:null,
            Tag4_name:list.product[i].tagModels[3]?list.product[i].tagModels[3].name:null,
            Tag5_name:list.product[i].tagModels[4]?list.product[i].tagModels[4].name:null,
            productphotos1:list.product[i].productphotos[0]?list.product[i].productphotos[0].imgUrl:null,
            productphotos2:list.product[i].productphotos[1]?list.product[i].productphotos[1].imgUrl:null,
            productphotos3:list.product[i].productphotos[2]?list.product[i].productphotos[2].imgUrl:null,
            productphotos4:list.product[i].productphotos[3]?list.product[i].productphotos[3].imgUrl:null,
            Reccomended_1:list.product[i].reccomendProducts[0]?list.product[i].reccomendProducts[0].reccomendedId :null,
            Reccomended_2:list.product[i].reccomendProducts[1]?list.product[i].reccomendProducts[1].reccomendedId :null,
            Reccomended_3:list.product[i].reccomendProducts[2]?list.product[i].reccomendProducts[2].reccomendedId :null,
            Reccomended_4:list.product[i].reccomendProducts[3]?list.product[i].reccomendProducts[3].reccomendedId :null,
            Reccomended_5:list.product[i].reccomendProducts[4]?list.product[i].reccomendProducts[4].reccomendedId :null,
            Reccomended_6:list.product[i].reccomendProducts[5]?list.product[i].reccomendProducts[5].reccomendedId :null,
            Reccomended_7:list.product[i].reccomendProducts[6]?list.product[i].reccomendProducts[6].reccomendedId :null,
            Reccomended_8:list.product[i].reccomendProducts[7]?list.product[i].reccomendProducts[7].reccomendedId :null,
            Reccomended_9:list.product[i].reccomendProducts[8]?list.product[i].reccomendProducts[8].reccomendedId :null,
            Reccomended_1i:list.product[i].reccomendProducts[9]?list.product[i].reccomendProducts[9].reccomendedId :null,
                   
        
        })
          }
         this.setState({getlist:exportlist})
        //   console.log(exportlist,"exp")

     
    }
    componentDidMount(){
        this.getproductlist()
    }

      // export to excell 
    productdownloadFile=(datas=this.state.getlist)=>{
         const  fileType= "xlsx"
        const ws= XLSX.utils.json_to_sheet(datas);
        const wb={Sheets:{data:ws},SheetNames:["data"]};
        const excelBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"});
       const data = new Blob([excelBuffer], {type:fileType});
       FileSaver.saveAs(data, "Product_List"+".xlsx")
       

    }

     //delete category
    async deleteAllInvenToryTable(){
       swal({
            title: "Are you sure?",
            text: "You want to delete All Product Inventory",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await getBulkImportExportDetails.deleteAllInventory();
                
                    if (value) {
                        NotificationManager.success( 'Status');
                        window.location.reload(false)

                    }
                }
            });
    }
    render() {
       return (
            <div className='bulkimport'>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a>Upload Store Inventory</a></li>
                </ol>
                <hr></hr>
                <div className='row'>
                    <div className='col-sm-3'>
                        <div className=' my-2'>
                            <p className='text-danger'>
                                Please download store data first<br></br> before upload the excel file.
                            </p>
                        </div>
                    </div>
                     <div className='col-sm-8'>
                        <div className=' my-2'>
                            <div className='row'>
                                 <div className='col-sm-4'>
                                    <a href='/admin/bulk/varientUpdate'  className="btntopsc btn text-light">Update Varients Price</a>
                                </div> 
                                 <div className='col-sm-4'>
                                    <button onClick={(e)=>this.productdownloadFile()} className="btntopsc btn text-light">Download Store Inventory</button>
                                </div>
                                 <div className='col-sm-4'>
                                    <button onClick={(e)=>this.deleteAllInvenToryTable(e)} className="btntopsc btn text-light">Delete All Inventory</button>
                                </div>
                               
                            </div>
                            <div className='row my-4'>
                                 <div className='col-sm-4'>
                                    <a href={fileexcell}  className="btntopsc btn text-light">Sample Inventory Sheet</a >
                                </div>
                                 <div className='col-sm-4'>
                                    <a  href='/admin/bulk/imageInventoryUpload' className="btntopsc btn text-light">Upload Product Images</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='uploadstock'>
                    <form>
                        <table className="table  mx-2 border">
                            <thead>
                                <tr className='py-2'>
                                <th scope="col"><h5>Upload Product Excel File </h5></th>
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
            </div>
        )
    }
}
