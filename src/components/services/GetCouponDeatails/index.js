import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addcoupon = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddcouponList,data,config);
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


const getAllcouponList = async () => {
    try {
        let result = await api.get(Apis.GetcouponList);
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
const getDeletecoupon = async (id) => {
    try {
        let result = await api.delete(Apis.Getcoupondelete,{params: {id}});
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
const getUpdatecoupon = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdatecoupon,data,config);
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
const getUpdatecouponstatus = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdatecouponStatus,data,config);
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
    addcoupon,
    getAllcouponList,
    getDeletecoupon,
    getUpdatecoupon,
    getUpdatecouponstatus
};