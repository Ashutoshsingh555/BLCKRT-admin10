import React from "react";
import GetCategoryDetails  from '../../services/GetCategoryDetails';

export default class CategoryListform extends React.Component {
   constructor() {
        super();
         this.state = {
            data : [],
            expandedRows : [],
            categoryId:"",
            subcategoryId:"" ,
             checked: 0,
        };
    }
 

   async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ data: list.data,show:false })
    }
    handleChangesub = (event, index,idx) => {
       let value = event.target.value ;
       let cat = event.target.id;
       this.setState({subcategoryId: value, categoryId:cat, checked: index})
       this.props.setStateOfCategory(value,cat);
    };

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
                {item.SubCategories.map((subval,idx) => 
                        <div className="size-box-brand mx-4">
                          <input className="form-check-input bg-outlin-danger px-4 mt-1 my-2" 
                                key={idx}
                                type="radio"
                                value={subval.id}
                                id={item.id}
                                checked={this.state.checked === idx  && this.state.checked === item.id }
                                onClick={(event) => this.handleChangesub(event, item.id)}
                              />
                              <label className='label-brand mx-4 ml-4'>{subval.sub_name}</label>
                          </div>
                      )}
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