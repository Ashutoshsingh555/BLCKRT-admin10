import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addPage = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetSettingPagePost,data,config);
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


const getAllPageList = async () => {
    try {
        let result = await api.get(Apis.GetSettingPageList);
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
const getDeletePage = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteSettingPage,{params: {id}});
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
const getUpdatePage = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateSettingPage,data,config);
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
    addPage,
    getAllPageList,
    getDeletePage,
    getUpdatePage
};