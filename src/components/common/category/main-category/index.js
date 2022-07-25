import React, { Component } from 'react';
import GetCategoryDetails  from '../../../services/GetCategoryDetails';
import AutoSelect from "../../autoselect";

// const Arrays = (data, fieldName, fieldValue) => {
//     let arrayItem = [];
//     if (data && Array.isArray(data)) {
//         data.map((item, key) => {
//             arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
//             return null;
//         });
//     }
//     return arrayItem;
// };

export default class MainCategorylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
             getList:[], selectCategory: '',show:false,    open: false
        }
    }
    
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ getList: list.data,show:false })
    }
  
    toggleRow(e) {
    console.log('toggleRow');
    
    this.setState({open: !this.state.open});
  }
    render() {
        const { getList ,show} = this.state;
        let classes = '';
    if (this.state.open == true) {
      classes = 'open';
    }
        return (
            <div>
             {getList.map((val,i)=>(
                <form key={val.id}>
                    <p>
                        <a  onClick={this.toggleRow.bind(this)} className={classes} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{ fontWeight:'bold',color:'gray' ,textDecoration:'none'}}><i class="fas fa-plus-circle mx-2" style={{color:"Tomato"}}></i>{val.name}</a>
                    </p>
                    
                       {
                        <div class="collapse"  open={this.state.open} id="collapseExample">
                        {val.SubCategories.map((subval) => 
                    
                        <div className="form-check mx-4" >
                        <input className="form-check-input mt-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                            {subval.sub_name}
                        </label>
                    </div>
                    
                    )}
                    
                    
                    </div>
                       }
                    
                        <hr style={{width:"100%"}}></hr>
                    
                </form>
                    ))}
                  
               
                {/* <AutoSelect
                    className="basic-single"
                    value={selectCategory}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="category_id"
                    options={Arrays(getList, "name", "id")}
                /> */}
            </div>


        )
    }
}
