import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';





const getConfigList = async () => {
    try {
        let result = await api.get(Apis.getConfigdetails);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUpdatesConfig = async (data,config) => {
    try {
        let result = await api.post(Apis.getupdateConfige,data,config);
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



export default {

    getConfigList,
   
    getUpdatesConfig,
   
};