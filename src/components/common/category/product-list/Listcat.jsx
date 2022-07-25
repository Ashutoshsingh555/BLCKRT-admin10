import React from "react";
import GetCategoryDetails  from '../../../services/GetCategoryDetails';

export default class Listcat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: 0,
            getList:[],
            categoryId:"",
            subcategoryId:""
        };
     
    }
 async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ getList: list.data,show:false })
    }
    handleChangesub = (event, index,idx) => {
      let value = event.target.value ;
          if(!value === 0){
            let x= this.state.getList[index].SubCategories[0].id;
              this.setState({subcategoryId: x, categoryId:cat, checked: idx})
          }
         let cat = this.state.getList[index].id;
        this.setState({subcategoryId: value, categoryId:cat, checked: index})
        this.props.setStateOfCategory(value,cat);
    };
   
    render() {
      const {subcategoryId,categoryId} =this.state;
      console.log(subcategoryId)
      console.log(categoryId +"category")
        return (
            <div>
                <section className='radio-content-brand'>
                {this.state.getList.map((type, i) => (
                       <div className='div-brand' key={type.id}>
                           <p>
                             <a   data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style={{ fontWeight:'bold',color:'gray' ,textDecoration:'none'}}><i class="fas fa-plus-circle mx-2" style={{color:"Tomato"}}></i>{type.name}</a>
                           </p>
                            
                      <div class="collapse"  id="collapseExample">
                        {type.SubCategories.map((subval,idx) => 
                            <div className="size-box-brand">
                               <label className='label-brand'>{subval.name}
                                </label>
                               {subval.sub_name}
                                <input className="form-check-input bg-outlin-danger mx-2 mt-1 my-2" 
                                    key={idx}
                                    type="radio"
                                    value={subval.id}
                                    checked={this.state.checked === idx && this.state.checked === i}
                                    onClick={(event) => this.handleChangesub(event, i)}
                                />
                               
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </section>
            </div>
        );
    }
}