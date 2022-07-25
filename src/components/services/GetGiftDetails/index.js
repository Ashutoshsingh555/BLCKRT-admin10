import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addGiftOffers = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddgift,data,config);
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


const getAllGiftOffersList = async () => {
    try {
        let result = await api.get(Apis.GetGetGift);
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
const getDeleteGiftOffers = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteGift,{params: {id}});
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
const getUpdateGiftOffers = async (data,config) => {
    try {
        let result = await api.post(Apis.getupdateGift,data,config);
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
    addGiftOffers,
    getAllGiftOffersList,
    getDeleteGiftOffers,
    getUpdateGiftOffers,

};