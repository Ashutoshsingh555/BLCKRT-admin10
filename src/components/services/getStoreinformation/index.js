import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';


const getStoreDetails = async (id) => {
    
    try {
        let result = await api.get(Apis.getInfoById,{params:{id}});
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

const getUpdateStoredetails = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdatedInfo,data,config);
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
    getStoreDetails,
    getUpdateStoredetails
}