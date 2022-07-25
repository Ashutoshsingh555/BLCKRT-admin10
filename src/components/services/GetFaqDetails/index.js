import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addFaq = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddFaqList,data,config);
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


const getAllFaqList = async () => {
    try {
        let result = await api.get(Apis.GetFaqList);
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
const getDeleteFaq = async (id) => {
    try {
        let result = await api.delete(Apis.GetFaqdelete,{params: {id}});
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
const getUpdateFaq = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateFaq,data,config);
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
const getUpdateStatus = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateStatus,data,config);
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
    addFaq,
    getAllFaqList,
    getDeleteFaq,
    getUpdateFaq,
    getUpdateStatus
};