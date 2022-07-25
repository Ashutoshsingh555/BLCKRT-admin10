import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';


const getInventorySetting = async (id) => {
    
    try {
        let result = await api.get(Apis.GetinventoryStocksetting,{params:{id}});
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

const GetUpdateStock = async (data,config) => {
    try {
        let result = await api.post(Apis.GetinventoryStockUpdate,data,config);
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
    getInventorySetting,
    GetUpdateStock
}