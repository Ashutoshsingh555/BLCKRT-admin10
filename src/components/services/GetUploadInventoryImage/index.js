import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const addinventoryImage = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddInventoryImage,data,config);
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


const getInventoryList = async () => {
    try {
        let result = await api.get(Apis.GetinventoryList);
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

const getDeleteinventory = async (id) => {
    try {
        let result = await api.delete(Apis.GetInventoryDelete,{params: {id}});
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
    addinventoryImage,
    getInventoryList,
    getDeleteinventory

}