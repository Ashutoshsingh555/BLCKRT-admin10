import React, { Component } from 'react'
import "../setting.css"
import { GetDeliveryAreas } from'../../../../services'
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class editCity extends Component {
    
    constructor(props){
        super(props);
          let self = this.props.location.state.row;
        this.state={
            IndiaCityList:[],
            City:self.City,
            cityId:self.id
        }
    }

 async getAllCityGlobel(){
      let result = await GetDeliveryAreas.getIndiaCityList()
      this.setState({IndiaCityList:result.data})

    }

    componentDidMount(){
        this.getAllCityGlobel()
    }


    handleChange =async (e) =>{
        let value = e.target.value
        this.setState({City:value})

    }


      async submit(e){
        const config = {
          
            Headers: {
                'content-type': 'multipart/form-data',
             }, 
            City:this.state.City,
            cityId:this.state.cityId
           };
        swal({
            title: "Are you sure?",
            text: "You want to Update New city",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetDeliveryAreas.getUpdatecityManage(config);
                
                    if (list) {
                        this.setState({ isLoaded: false })
                        setTimeout(()=>{
                              this.props.history.push("/admin/settings/managearea")

                        },3000)
                      
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });
    }

     handleBack() {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className='settingbody'>
                 <ol className="breadcrumb mb-30 mx-4 my-4">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href='/admin/settings/managearea'>Delivery Cities</a></li>
                    <li className="breadcrumb-item active"><a>Edit City</a></li>
                </ol>
                <h3 className='my-2 mx-4'>Add City</h3>
                <hr className='mx-4'></hr>
                <div className='formbody'>
                   <form >
                       <div className="form-group col-sm-8">
                                <label for="inputPassword5" className="form-label">City Name*</label>
                                <select id="status"  name="status" onChange={(e)=>this.handleChange(e)} className=" w3-input w3-border form-control">
                                    <option value={0}>{this.state.City}</option>
                                    <option  value="Hyderabad">Hyderabad</option>
                                    <option value="Hyderabad">--Other City --</option>
                                    {this.state.IndiaCityList.map((row,id) =>(
                                        <option value={row.name}>{row.name}</option>
                                    ))}
                                </select>
                            </div>
                    </form>
                
                    <div className='row mx-4 my-4'>
                        <div className='col-sm-2'>
                            <button  onClick={(e)=>{this.handleBack(e)}} className="btntopsc btn text-light px-4">close</button>
                        </div>
                            <div className='col-sm-2'>
                            <button onClick={(e)=>{this.submit(e)}} className="btntopsc btn text-light px-4">Save</button>
                        </div>
                    </div>
                </div>
                <hr className="mx-4 my-2"></hr>
            </div>
        )
    }
}
