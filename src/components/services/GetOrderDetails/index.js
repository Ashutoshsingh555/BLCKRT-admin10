import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAllOrderList = async () => {
    try {
        let result = await api.get(Apis.GetAllOrderDetails);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
            
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getOrderStatusUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderStatusUpdate,data);
        if (result.errors) {
            NotificationManager.error(result.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const updateOrderRunners = async (data,config) => {
    
    try {
        let result = await api.post(Apis.updateOrderRunner,data,config);
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


const getAllRunnerList = async () => {
    try {
        let result = await api.get(Apis.GetAllRunnerList);
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


export default {
    getAllOrderList,
    getOrderStatusUpdate,
    getAllRunnerList,
    updateOrderRunners
};