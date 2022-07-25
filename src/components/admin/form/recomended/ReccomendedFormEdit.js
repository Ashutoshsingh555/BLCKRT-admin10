import React, { Component } from 'react'
import GetCategoryDetails  from '../../../services/GetCategoryDetails';
import { GetProductDetails } from '../../../services';
import swal from 'sweetalert';


export default class ReccomendedFormList extends Component {
    constructor(props){
        let rc = props.rowRcData
        super(props);
        this.state ={
             data:[],
             selectCategory: '',
             pData:[],
             checked:false,
             productId:[],
             reccomendedProduct:rc,
             expandedRows : [],
             ids:[1,2,3]
        }
    }

     getdata(a){
  for(let i=0; i<a.length; i++){
      return i
  }
 }

    getrecomended =async() => {
      const data =await this.props.rowRcData
      // this.setState({reccomendedProduct:data})
        
    }
    async componentDidMount() {
        this.getLocation();
        this.getrecomended();
    }
    async getLocation() {
        let list = await GetCategoryDetails.getReccomendedCategoryList();
        this.setState({ data: list.data })
    }
    handleChangesub = async (event,index, p) =>{
     let checkid = event.target.value
    this.state.productId.push(checkid)
    this.setState({reccomendedProduct:this.state.productId})
    let Id=this.state.productId
    this.props.setStaterecomended(Id)
    let data = this.props.rowRcData
    for(let i=0; i<data.length; i++){
    if(data[i] == checkid){
      this.props.checksetIddel(checkid)
    }
  }
   
  }
    handleId(i){
      console.log()
          
        }

       

    handleRowClick(rowId) {
      const currentExpandedRows = this.state.expandedRows;
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
      const newExpandedRows = isRowCurrentlyExpanded ? 
			currentExpandedRows.filter(id => id !== rowId) : 
			currentExpandedRows.concat(rowId);
      this.setState({expandedRows : newExpandedRows});
    }
    
    renderItem(item) {
      const clickCallback = () => this.handleRowClick(item.id);
      const itemRows = [
            <p>
              <a onClick={clickCallback} key={"row-data-" + item.id} role="button" aria-expanded="false" aria-conpols="collapseExample" style={{ fontWeight:'bold',color:'gray' ,textDecoration:'none'}}><i className="fas fa-plus-circle mx-2" style={{color:"Tomato"}}></i>{item.name}</a>
            </p>
      ];
       if(this.state.expandedRows.includes(item.id)) {
         
            itemRows.push(
            <div key={"row-expanded-" + item.id}>
                 {item.SubCategories.map((subval,i) => 
                       <div key={subval.id} className="form-check mx-2" >
                          <p  style={{ fontWeight:'bold',color:'black' ,textDecoration:'none'}}>- {subval.sub_name}</p>
                           {subval.products.map((p,index) => 
                           
                       <div key={p.id} className="form-check mx-2" >
                         {
                             console.log(this.props.rowRcData[index],"ytt")
                           }
                           <div className="form-check row"  onChange={(e)=>this.handleId(p.id,)}>
                           
                               <input className="form-check-input mt-1" 
                                    key={i}
                                    type="checkbox"
                                    value={p.id}
                                        // defaultChecked={this.props.rowRcData? this.props.rowRcData[index]:null}
                                    defaultChecked={p.id == this.props.rowRcData[index] || p.id == this.props.rowRcData[i]?true:false}
                                    onChange={(event) => this.handleChangesub(event, i, p)}
                                />
                              <label className='label-brand mx-4 ml-4'>{p.name}</label>
                            </div>
                        
                            </div> )}
                        </div> )}
                </div>
            );
        }
        return itemRows;    
    }
    render() {
      // console.log("cat:"+this.state.categoryId +"sub:"+this.state.subcategoryId)
      console.log(this.props.rowRcData,this.state,"edit data")
     


       let allItemRows = [];
       this.state.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });

       
        
        return (
			     <div>{allItemRows}</div>
        );
    }
}
