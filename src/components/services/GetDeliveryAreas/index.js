import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';




const addcityManage = async (data,config) => {
    
    try {
        let result = await api.post(Apis.GetAddCity,data,config);
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


const getAllcityManageList = async () => {
    try {
        let result = await api.get(Apis.GetCityName);
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
//fetch globaly city and countary
const getIndiaCityList = async () => {
    try {
        let result = await api.get(Apis.GetGlobleCityList);
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

const getIndiaCountryList = async () => {
    try {
        let result = await api.get(Apis.getCountryNameList);
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
//pickupdetails by id and update
const getCityFilterlist = async (name) => {
    
    try {
        let result = await api.get(Apis.getCityFilter,{params:{name}});
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
const getDeletecityManage = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteCity,{params: {id}});
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
const getUpdatecityManage = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateCity,data,config);
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

//deliveryareas

const addadress = async (data,config) => {
    
    try {
        let result = await api.post(Apis.Createadress,data,config);
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

const getUpdatdeliverysArea = async (data,config) => {
    try {
        let result = await api.post(Apis.getUpdateAreas,data,config);
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



const GetPickUpList = async() =>{
    try{
        let result = await api.get(Apis.GetPickupList);
        if(result.data.error){
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    }catch(error){
        console.log(error);
        return null;
    }
}

const getDeletePickupZone = async (id) => {
    try {
        let result = await api.delete(Apis.DeletePickUp,{params: {id}});
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

//pickupdetails by id and update
const getpickupdetaillist = async (id) => {
    
    try {
        let result = await api.get(Apis.GetPickupdetailsbyid,{params:{id}});
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

const getUpdatePickupDetails = async (data,config) => {
    try {
        let result = await api.post(Apis.getpickupUpdatebyId,data,config);
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
    addcityManage,
    getAllcityManageList,
    getDeletecityManage,
    getUpdatecityManage,
    GetPickUpList,
    getDeletePickupZone,
    addadress,
    getIndiaCityList,
    getpickupdetaillist,
    getUpdatePickupDetails,
    getUpdatdeliverysArea,
    getIndiaCountryList,
    getCityFilterlist
};