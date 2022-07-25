import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addLoyaltyCoupon = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddCopon,data,config);
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


const getAllLoyaltyCouponList = async () => {
    try {
        let result = await api.get(Apis.GetListCoupon);
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
const getDeleteLoyaltyCoupon = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteCoupon,{params: {id}});
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
const getUpdateLoyaltyCoupon = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateCoupon,data,config);
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
    addLoyaltyCoupon,
    getAllLoyaltyCouponList,
    getDeleteLoyaltyCoupon,
    getUpdateLoyaltyCoupon
};