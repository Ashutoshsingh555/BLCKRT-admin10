import api from '../../ApiConfig';
import { Apis } from '../../../config';
import {NotificationManager} from"react-notifications"

 const getFeatureList= async (id) =>{
  try {
        let result = await api.get(Apis.GetSettingDetails,{params:{id}});
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

const getUpdateFeatureDetails = async (data,config) => {
    try {
        let result = await api.post(Apis.GetSettingUpdate,data,config);
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
    getFeatureList,
    getUpdateFeatureDetails

}