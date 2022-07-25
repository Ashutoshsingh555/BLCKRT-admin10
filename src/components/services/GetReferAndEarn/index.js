import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';


const getReferList = async (id) => {
    
    try {
        let result = await api.get(Apis.GetReferUserList,{params:{id}});
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

const GetUpdateList = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateRefer,data,config);
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
    getReferList,
    GetUpdateList
}