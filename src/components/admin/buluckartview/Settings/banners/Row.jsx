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
import {Link} from'react-router-dom'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import '../../category/productmainCotegory.css'
import ReactModal from 'react-modal';
import { GetBannerDetails, GetCategoryDetails } from '../../../../services';
import swal from 'sweetalert';
import api from '../../../../ApiConfig';
import { Apis } from '../../../../../config';
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
  const [productId,setProductId] = React.useState("")
  const [index,setIndex] = React.useState("")



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
    const  deletebannerphotos = async(id) =>{
       swal({
            title: "Are you sure?",
            text: "You want to delete banner photo  from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetBannerDetails.getDeletephoto(id);
                    console
                    if (value) {
                      NotificationManager.success(value.mesage, 'Status');
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
    function handleSubmit(e){
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
            text: "You want to Add Edit",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdateCategoryList(config);
                    if (list) {
                        this.getCategory();
                        setOpenModel(false)
                        window.location.reload(false)
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
      <TableCell component="th" scope="row"><h5 className='p-2'>{row.id}</h5></TableCell>
          <TableCell onClick={(e)=>catgoryIdhandler(row.id)}>
            
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{row.BannerType}<br></br>
            
          </IconButton><br></br>
          <Link to={{ pathname: "/admin/settings/addPhotoBanner",
                                                  state: { row }
                                              }} ><i  class="fas fa-plus mx-1"></i><em>Banners</em>
                                            </Link>
         

        </TableCell>
       
        <TableCell>
            <div className="row">

                <div className="col-sm-2"><i style={{fontSize:'18px'}} onClick={(e) => props.deletecategory(row.id)} class="far fa-trash-alt"></i></div>
              
            </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Banner Photos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell>IMAGE</TableCell>
                    <TableCell scope="col" style={{width:'25%'}}>CAPTION</TableCell>
                    <TableCell >CATEGORY.ID</TableCell>
                    <TableCell >SORT</TableCell>
                    <TableCell>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.bannerPhotosSettings.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                   <TableCell component="th" scope="row">
                        <div className="cate-img-5 ">
                            <img  src={historyRow.photoUrl} class="rounded-circle" width={'20px'}height={'40px'} alt="categorys" />
                        </div>
                     </TableCell>
                    
                      <TableCell>{historyRow.imageCaption}</TableCell>
                      <TableCell>{historyRow.categoryId}</TableCell>
                       <td><input type="number" defaultValue={historyRow.id} id={historyRow.id} onChange={(e)=> props.handleChangeIndex(e,historyRow.id)} style={{paddingLeft:"15px",width:"55px",marginTop:"10px"}} /></td> 
                      
                       <TableCell>
                            <div className="row" >
                              <div className="col-sm-3">
                           <Link to={{ pathname: `/admin/settings/editPhotoBanner`,
                                                          state: { historyRow }
                                                      }} ><i style={{fontSize:'18px'}} class="fas fa-pencil-alt">
                              </i> 
                          </Link>
                                
                                </div>|
                                <div className="col-sm-2"><i style={{fontSize:'18px'}}  onClick={(e)=>deletebannerphotos(historyRow.id)} class="far fa-trash-alt"></i></div>
                              
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