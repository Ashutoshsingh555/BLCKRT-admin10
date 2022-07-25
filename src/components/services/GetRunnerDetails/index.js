import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';



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
const addRunner = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddRunner,data,config);
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


const getDeleteRunner = async (id) => {
    try {
        let result = await api.delete(Apis.getdelete,{params: {id}});
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
    getAllRunnerList,
    updateOrderRunners,
    addRunner,
    getDeleteRunner
};