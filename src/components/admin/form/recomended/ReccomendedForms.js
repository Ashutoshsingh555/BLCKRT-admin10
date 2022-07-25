import React, { Component } from 'react'
import GetCategoryDetails  from '../../../services/GetCategoryDetails';

export default class ReccomendedForms extends Component {
    constructor(props){
        super(props);
        this.state ={
             data:[],
             selectCategory: '',
             checked:false,
             productId:[],
             reccomendedProduct:[],
              expandedRows : []
        }
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        
        let list = await GetCategoryDetails.getReccomendedCategoryList();
        this.setState({ data: list.data })
    }
    handleChangesub = async (event,index) =>{
    let checkid = event.target.value
    console.log(checkid+"hyg")
    this.state.productId.push(checkid)
    this.setState({reccomendedProduct:this.state.productId})
    let Id=this.state.productId
    this.props.setStaterecomended(Id)
  
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
              <a onClick={clickCallback} key={"row-data-" + item.id} role="button" aria-expanded="false" aria-conpols="collapseExample" style={{ fontWeight:'bold',color:'gray' ,textDecoration:'none'}}><i class="fas fa-plus-circle mx-2" style={{color:"Tomato"}}></i>{item.name}</a>
            </p>
      ];
       if(this.state.expandedRows.includes(item.id)) {
          itemRows.push(
            <div key={"row-expanded-" + item.id}>
                 {item.SubCategories.map((subval,i) => 
                       <div key={subval.id} className="form-check mx-2" >
                          <p  style={{ fontWeight:'bold',color:'black' ,textDecoration:'none'}}>- {subval.sub_name}</p>
                           {subval.products.map((p) => 
                       <div key={p.id} className="form-check mx-2" >
                           <div class="form-check row">
                                <input className="form-check-input mt-1" 
                                    key={i}
                                    type="checkbox"
                                    value={p.id}
                                    checked={p.isChecked}
                                   
                                    onChange={(event) => this.handleChangesub(event, i)}
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
