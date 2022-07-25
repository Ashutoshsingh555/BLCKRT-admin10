import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addEnquiry = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddEnquiryList,data,config);
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


const getAllEnquiryList = async () => {
    try {
        let result = await api.get(Apis.GetAddEnquiryList);
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
const getDeleteEnquiry = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteEnquiry,{params: {id}});
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
    addEnquiry,
    getAllEnquiryList,
    getDeleteEnquiry,
  
};