import React, { Component } from 'react';
import GetCategoryDetails  from '../../../services/GetCategoryDetails';




export default class ReccomendedList extends Component {
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
        let list = await GetCategoryDetails.getReccomendedCategoryList();
        this.setState({ getList: list.data,show:false })
    }
    handleSelectChange = (name, selected) => {
        if (name === "category_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectCategory: selected,
            });
            this.props.onSelectCategory(selected.value)
            this.setState({ changed: true });
        }
    };
    toggleRow(e) {
    console.log('toggleRow');
    
    this.setState({open: !this.state.open});
  }
    render() {
        const { getList ,show} = this.state;
    
        let classes = '';
    if (this.state.open) {
      classes = 'open';
    }
        return (
            <div>
             {getList.map((val,i)=>(
                <form key={val.id}>
                    <p>
                        <a  onClick={this.toggleRow.bind(this)} className={classes} data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample" style={{ fontWeight:'bold',color:'gray' ,textDecoration:'none'}}><i class="fas fa-plus-circle mx-2" style={{color:"Tomato"}}></i>{val.name}</a>
                    </p>
                    
                    <div class="collapse"  open={this.state.open} id="collapseExample2">
                        {val.SubCategories.map((subval) => 
                       <div key={subval.id} className="form-check mx-2" >
                          <p  style={{ fontWeight:'bold',color:'black' ,textDecoration:'none'}}>- {subval.sub_name}</p>
                           {subval.products.map((p) => 
                       <div key={p.id} className="form-check mx-2" >
                           <div class="form-check row">
                                <input className="form-check-input col-1" type="checkbox" value="" id="defaultCheck1" />
                                <label class="form-check-label col-11" for="defaultCheck1">
                                    <p> {p.name}</p>
                                </label>
                            </div>
                        
                        </div> )}
                        </div> )}
                        
                    </div>
                    
                    <hr style={{width:"100%"}}></hr>
                    
                </form>
                    ))}
                  
               
              
            </div>


        )
    }
}
