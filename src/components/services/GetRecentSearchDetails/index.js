import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';



const getsearchList = async () => {
    try {
        let result = await api.get(Apis.getrecentsearchlist);
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
const deletesearchList = async (id) => {
    try {
        let result = await api.delete(Apis.deleterecentsearchlist,{params: {id}});
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
  
    getsearchList,
    deletesearchList,


};