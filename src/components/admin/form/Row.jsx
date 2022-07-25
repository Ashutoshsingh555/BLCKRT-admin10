import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import '../buluckartview/category/productmainCotegory.css'
import ReactModal from 'react-modal';
import { GetCategoryDetails } from '../../services';
import swal from 'sweetalert';
import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';



const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [sub_name, setSub_name] = React.useState("");
  const [subphoto, setSubphoto] = React.useState("");
  const [thumbNailphoto, setThumbNailphoto] = React.useState("");
  const [msgThumb, setMsgThumb] = React.useState("");
  const [catId, setCatId] = React.useState("");
   const classes = useRowStyles();
  ///edit category
  const [categoryId, setCategoryId] =React.useState("")
  const [photo, setPhoto] =React.useState("")
  const [openModel, setOpenModel] =React.useState(false)
  const [name, setName] =React.useState("")
   ///edit sub category
  const [sub_catId, setSub_catId] =React.useState("")
  const [subcategoryId, setSubcategoryId] = React.useState("");
  const [subCatPhoto, setSubCatPhoto] =React.useState("")
  const [opensubModal, setOpensubModal] =React.useState(false)
  const [subCatName, setsubCatName] =React.useState("")


  function onFileChangesub(event) {
        setSubphoto( event.target.files[0]);
    };

    const   onFileChange = event => {
        this.setState({ photo: event.target.files[0] });
    };

    function catgoryIdhandler(id){
      if(!catId){
       setCatId(id)
      }else(
        setCatId(catId)
      )
      }
      
  //photo
    const   subimageHandler = ({ target: { files } }) =>{
         console.log( files[0] +"ytytyt")
         let data = new FormData();
         data.append( 'photo', files[0] )
        
        api.post(Apis.postphoto, data).then(res => { 
            console.log(res)
             setSubCatPhoto(res.data.photo)
       
         
             })
            
        }
        
  //sub photo
    const   imageHandler = ({ target: { files } }) =>{
         console.log( files[0] +"ytytyt")
         let data = new FormData();
         data.append( 'photo', files[0] )
        
        api.post(Apis.postphoto, data).then(res => { 
            console.log(res)
             setPhoto(res.data.photo)
       
         
             })
            
        }



   //delete subcategory
    const  handledelateSubCategory = async(id) =>{
       swal({
            title: "Are you sure?",
            text: "You want to delete Sub category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCategoryDetails.getSubDeleteById(id);
                    console
                    if (value) {
                        this.getCategory();
                        window.location.reload(false)

                    }
                }
            });
    }
    
//edit model category
    function editcatOpenModel(row){
       setCategoryId(row.id)
       setPhoto(row.photo)
       setOpenModel(true)
       setName(row.name)
      
    }
    function closeeditModel(){
      setOpenModel(false)
    }

    //edit cat submitt
    async function  editcategorysubmit(e){
   
       e.preventDefault();
       const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            name: name,
            photo: photo,
            categoryId: categoryId
        };
        swal({
            title: "Are you sure?",
            text: "You want to  Edit",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdateCategoryList(config);
                    if (list) {
                     setOpenModel(false)
                       this.props.history.push("/admin/maincotegory/create")
                        window.location.relode(false)
                      
                    }
                }
            });
    }
      
//edit model category
    function editSubcatOpenModel(row,historyRow){
      setSub_catId(row.id)
      setSubcategoryId(historyRow.id)
      setSubCatPhoto(historyRow.photo)
      setsubCatName(historyRow.sub_name)
     setOpensubModal(true)
      
    }
    function closeeditSubModel(){
      setOpenModel(false)
    }
      //edit sub cat
   async function EditsubSubmitClick(e){
        e.preventDefault();
      const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
              sub_name:subCatName,
              photo: subCatPhoto,
              categoryId: sub_catId,
              subcategoryId:subcategoryId,
        };
        swal({
            title: "Are you sure?",
            text: "You want to Add New SubCategory",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdateSubCat(config);
                    if (list) {
                       NotificationManager.success(list.mesage, 'Status');
                         setOpensubModal(false)
                          this.props.history.push("/admin/maincotegory/create")
                        window.location.relode(false)

                        
                    }
                }
            });
  }
 ///category status
    const  handleChangeStatus = async (id,statusrow)=>{
     
     
        console.log(id,statusrow)
        if(statusrow === true){
           var datas= { 
               "categoryId":id,
               "status":"0"
        }
        }else{
           var datas= { 
               "categoryId":id,
               "status":"1"
           }
        }

        const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update category Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdateCategoryStatus(datas,config);
                
                    if (list) {
                          NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        

    }
     ///category status
    const  handleChangeSubStatus = async (id,statusrows)=>{
     
     
        console.log(id,statusrows)
        if(statusrows === true){
           var datass= { 
              "subcategoryId":id ,
              "status":"0"
        }
        }else{
           var datass= { 
                 "subcategoryId":id ,
                 "status":"1"
           }
        }

        const config =  {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            
           };
        swal({
            title: "Are you sure?",
            text: "You want to update category Status",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdatesubCategoryStatus(datass,config);
                
                    if (list) {
                          NotificationManager.success(list.mesage, 'Status');
                          window.location.reload(false);
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
        

    }



  return (
    <React.Fragment>
      <TableRow className={classes.root} key={props.key} >
        {/* <TableCell><input type="checkbox" className="check-all"  /></TableCell> */}
        <TableCell component="th" scope="row">
          <div className="cate-img-5 ">
            <img  src={row.photo} class="rounded-circle" width={'20px'}height={'40px'} alt="categorys" />
        </div>
        </TableCell>
          <TableCell onClick={(e)=>catgoryIdhandler(row.id)}>
            
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{row.name}<br></br>
            
          </IconButton><br></br>
          
             <a  type="button" class="btn" onClick={(e)=>props.openSubModal(row.id)}  style={{color:"blue"}}><i  class="fas fa-plus mr-2"></i>SUB CATEGORY</a>
         
          
              <ReactModal 
                  isOpen={props.open}
                  contentLabel="Minimal Modal Example"
                  className="Modal"
                  overlayClassName="Overlay"
                    onRequestClose={()=>props.closeSubModal()}
                  >
                  <div >
                        <div >
                          <div  className='my-4' style={{textAlign:"center"}}>
                              <h5 class="modal-title" id="exampleModalLabel">Add SubCategory</h5>
                          </div>
                          <div  className='py-2'>
                              <form>
                                    <div className="form-group">
                                        <label className="form-label">Sub Title*</label>
                                        <input  type="text" className="form-control" onChange={(e)=>props.subhandleChange(e)} name="sub_name" placeholder="Category name"    />
                                    </div>
                                    <div class="file-area">
                                        <div class="form-group">
                                            <label className="form-label">Select Image*</label>
                                            <input type="file" onChange={(e)=>props.subFileChange(e)} className="form-control"   name="photo"  />
                                            <div class="file-dummy">
                                                <span class="default">Click to select a file, or drag it here</span>
                                                <span class="success">Great,Please select your Image</span>
                                            </div>
                                        </div>
                                    </div>
                                      <button className="btn btn-primary hover-btn mx-2" onClick={(e)=>props.submitsub(e)} type="submit">Add</button>
                                      <button  class="btn btn-outline-primary" onClick={()=>props.closeSubModal()}>Close</button>
                                  </form>
                          </div>
                      </div>
                  </div>
                  
              </ReactModal>

        </TableCell>
        <td><input type="number" defaultValue={row.id} id={row.id} onChange={(e)=> props.handleChangeIndex(e,row.id)} style={{paddingLeft:"15px",width:"55px",marginTop:"10px"}} /></td>
       {/* <TableCell >{row.id}</TableCell> */}
        <TableCell>
            <div className="row">
                <div className="col"><i style={{fontSize:'18px'}} onClick={(e)=>editcatOpenModel(row)} class="fas fa-pencil-alt"></i>
                
                   <ReactModal 
                                isOpen={openModel}
                                contentLabel="Minimal Modal Example"
                                className="Modal"
                                overlayClassName="Overlay"
                                 onRequestClose={()=>closeeditModel()}
                                >
                                  <div>
                                     <div >
                                        <div  className='my-4' style={{textAlign:"center"}}>
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
                                        </div>
                                        <div  className='py-2'>
                                            <form>
                                                <div className="form-group">
                                                    <label className="form-label">Title*</label>
                                                    <input type="text" className="form-control" placeholder="Category name"  defaultValue={name} onChange={(e)=>setName(e.target.value)} name="name"  />
                                                </div>
                                                 <div class="file-area">
                                                     {
                                                       row.photo? <div class="form-group">
                                                          <label className="form-label">Select Image*</label>
                                                          <input type="file" onChange={(e)=>imageHandler(e)} className="form-control"  name="photo"  />
                                                          <div class="file-dummy">
                                                              <img  src={photo}   width={'80px'}height={'50px'} alt="categorys" />
                                                          </div>
                                                      </div>:
                                                       <div class="form-group">
                                                          <label className="form-label">Select Image*</label>
                                                          <input type="file"  onChange={(e)=>imageHandler(e)} className="form-control"   />
                                                          <div class="file-dummy">
                                                              <span class="default">Click to select a file, or drag it here</span>
                                                              <span class="success">Great,Please select your Image</span>
                                                          </div>
                                                      </div>
                                                     }
                                                     </div>
                                                    <button className="btn btn-primary hover-btn mx-2" onClick={(e)=>editcategorysubmit(e)}type="submit">Add</button>
                                                    <button  class="btn btn-outline-primary" onClick={()=>closeeditModel()}>Close</button>
                                                </form>
                                        </div>
                                    </div>
                                </div> 
                                
                            </ReactModal>
                </div>|
                <div className="col"><i style={{fontSize:'18px'}} onClick={(e) => props.deletecategory(row.id)} class="far fa-trash-alt"></i></div>|
                <div className="col">
                
                    {row.status === true ? <a><i style={{fontSize:'18px'}}  onClick={(e) =>handleChangeStatus(row.id,row.status)} className="fas fa-check"></i></a>:
                    <a><i style={{fontSize:'18px'}}  onClick={(e) =>handleChangeStatus(row.id,row.status)} className="fa fa-ban"></i></a>
                    }
                </div>
                {/* <div className="col"><i style={{fontSize:'18px'}}  class="fab fa-product-hunt"></i></div> */}
            </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Category
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell><input type="checkbox" className="check-all"  /></TableCell> */}
                    <TableCell>IMAGE</TableCell>
                    <TableCell>SUB CATEGORY</TableCell>
                    <TableCell >SORT</TableCell>
                    <TableCell>
                      ACTIONS
                    </TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.SubCategories.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                    {/* <TableCell><input type="checkbox" className="check-all"  /></TableCell> */}
                      <TableCell component="th" scope="row">
                        <div className="cate-img-5 ">
                            <img  src={historyRow.photo} class="rounded-circle" width={'20px'}height={'40px'} alt="categorys" />
                        </div>
                     </TableCell>
                      <TableCell>{historyRow.sub_name}</TableCell>
                      <TableCell>{historyRow.id}</TableCell>
                       <TableCell>
                            <div className="row" >
                              <div className="col"><i style={{fontSize:'18px'}} onClick={()=>editSubcatOpenModel(row,historyRow)} class="fas fa-pencil-alt"></i>
                              <ReactModal 
                                isOpen={opensubModal}
                                contentLabel="Minimal Modal Example"
                                className="Modal"
                                overlayClassName="Overlay"
                                 onRequestClose={()=>closeeditSubModel()}
                                >
                                <div>
                                     <div >
                                        <div  className='my-4' style={{textAlign:"center"}}>
                                            <h5 class="modal-title" id="exampleModalLabel">Edit SubCategory</h5>
                                        </div>
                                        <div  className='py-2'>
                                            <form>
                                                  <div className="form-group">
                                                      <label className="form-label">Sub Title*</label>
                                                      <input type="text" defaultValue={subCatName}  className="form-control" onChange={(e)=>setsubCatName(e.target.value)} placeholder="Category name"    />
                                                  </div>

                                                  <div class="file-area">
                                                     {
                                                       historyRow.photo? <div class="form-group">
                                                           <label className="form-label">Select Image*</label>
                                                          <input type="file" onChange={(e)=>subimageHandler(e)} className="form-control"  name="photo"  />
                                                          <div class="file-dummy">
                                                              <img  src={subCatPhoto}   width={'80px'}height={'50px'} alt="categorys" />
                                                          </div>
                                                      </div>:
                                                       <div class="form-group">
                                                          <label className="form-label">Select Image*</label>
                                                          <input type="file"  onChange={(e)=>subimageHandler(e)} className="form-control"   />
                                                          <div class="file-dummy">
                                                              <span class="default">Click to select a file, or drag it here</span>
                                                              <span class="success">Great,Please select your Image</span>
                                                          </div>
                                                      </div>
                                                     }
                                                  </div>
                                                  <p>{msgThumb?msgThumb:null}</p>
                                                    <button className="btn btn-primary hover-btn mx-2" onClick={(e)=>EditsubSubmitClick(e)} type="submit">Add</button>
                                                    <button  class="btn btn-outline-primary" onClick={()=>closeeditSubModel()}>Close</button>
                                                </form>
                                        </div>
                                    </div>
                                </div>
                                
                            </ReactModal> 
                                
                                </div>|
                                <div className="col"><i style={{fontSize:'18px'}}  onClick={(e)=>handledelateSubCategory(historyRow.id)} class="far fa-trash-alt"></i></div>|
                                <div className="col">
                
                                      {historyRow.status === true ? <a><i style={{fontSize:'18px'}}  onClick={(e) =>handleChangeSubStatus(historyRow.id,historyRow.status)} className="fas fa-check"></i></a>:
                                      <a><i style={{fontSize:'18px'}}  onClick={(e) =>handleChangeSubStatus(historyRow.id,historyRow.status)} className="fa fa-ban"></i></a>
                                      }
                                  </div>
                                {/* <div className="col"><i style={{fontSize:'18px'}}  class="fab fa-product-hunt"></i></div> */}
                            </div>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default Row