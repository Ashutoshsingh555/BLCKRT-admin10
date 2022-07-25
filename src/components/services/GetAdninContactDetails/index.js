import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAddMessage = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddMessage,data,config);
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
    getAddMessage

}