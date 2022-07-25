import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const addProductUploadfile = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetUploadProductexcell,data,config);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;

    } catch (error) {
        console.log(error);
        return null;
        
    }
}
const uploadImageInventory = async (data,config) => {
    
    try {
        let result = await api.post(Apis.getUploadImgInventory,data,config);
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

const uploadCustomerDetails = async (data,config) => {
    
    try {
        let result = await api.post(Apis.uploadcustomerdetails,data,config);
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
const updateProductPrice = async (data,config) => {
    
    try {
        let result = await api.post(Apis.updateProductPrice,data,config);
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
const deleteAllInventory = async () => {
    try {
        let result = await api.delete(Apis.getDeleteAllProductInventory);
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
const  exportvarients = async () => {
    try {
        let result = await api.get(Apis.downloadvarientList);
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

}
export default{
    addProductUploadfile,
    uploadImageInventory,
    deleteAllInventory,
    uploadCustomerDetails,
    updateProductPrice,
    exportvarients
    
}