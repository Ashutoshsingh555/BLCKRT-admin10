import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addBanner = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddBannerList,data,config);
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

const addBanner2 = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddSubBanners,data,config);
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

const getAllBannerList = async () => {
    try {
        let result = await api.get(Apis.GetBannerList);
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
const getDeleteBanner = async (id) => {
    try {
        let result = await api.delete(Apis.GetBannerdelete,{params: {id}});
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

const getDeletephoto = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeletebannerPhoto,{params: {id}});
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
const getupdateIndex = async (data,config) => {
    try {
        let result = await api.post(Apis.getbannerindexupdate,data,config);
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
const getUpdateBanner = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateBanner,data,config);
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
const getUpdatePhoto = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateBannerPhoto,data,config);
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
    addBanner,
    getAllBannerList,
    getDeleteBanner,
    getDeletephoto,
    getUpdateBanner,
    getUpdatePhoto,
    addBanner2,
    getupdateIndex
};