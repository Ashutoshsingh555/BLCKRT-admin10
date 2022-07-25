import api from '../../ApiConfig';
import { Apis } from '../../../config';
import {NotificationManager} from"react-notifications"

 const getOnlinPaymentList= async (id) =>{
  try {
        let result = await api.get(Apis.GetSettingPaymentDetails,{params:{id}});
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

const getUpdateOnlinPaymentDetails = async (data,config) => {
    try {
        let result = await api.post(Apis.GetSettingPaymentUpdate,data,config);
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

export default{
    getOnlinPaymentList,
    getUpdateOnlinPaymentDetails

}