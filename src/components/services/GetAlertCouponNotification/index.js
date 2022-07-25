import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAllalertListdata = async () => {
    try {
        let result = await api.get(Apis.GelAlertList);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const addalert = async (data,config) => {
    
    try {
        let result = await api.post(Apis.createAlert,data,config);
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

const getDeletealert = async (id) => {
    try {
        let result = await api.delete(Apis.deleteAlert,{params: {id}});
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
    getAllalertListdata,
    getDeletealert,
    addalert
}