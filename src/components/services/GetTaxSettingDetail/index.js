import api from '../../ApiConfig';
import { Apis } from '../../../config';
import {NotificationManager} from"react-notifications"

 const GetTesListById= async (id) =>{
  try {
        let result = await api.get(Apis.GetSettingTaxDetails,{params:{id}});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
        
    }
};

const getUpdateTax = async (data,config) => {
    try {
        let result = await api.post(Apis.GetSettingTaxUpdate,data,config);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const deletebyid = async (id) =>{
   try {
        let result = await api.delete(Apis.GetTaxdelete,{params: {id}});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default{
    GetTesListById,
    getUpdateTax,
    deletebyid

}