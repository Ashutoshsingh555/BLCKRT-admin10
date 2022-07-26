import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const addProductList = async (data,config) => {
    
    try {
        let result = await api.post(Apis.AddProductList,data,config);
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
const deleteAwwsproductPhoto = async (data,config) =>{
    try{
        let result = await api.post(Apis.awsdeleteproduct,data,config);
        if(result.data.error){
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;

    }catch(err){
        return null;
    }
}
const deletevarientbyid = async (data,config) =>{
    try{
        let result = await api.post(Apis.deletevarient,data,config);
        if(result.data.error){
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;

    }catch(err){
        return null;
    }
}



const updateStatus = async (data,config) => {
    
    try {
        let result = await api.post(Apis.updateStatusById,data,config);
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


const getAllProductList = async (page,limit) => {
    try {
        let result = await api.get(Apis.GetAllProductList);
        //   let result = await api.get(Apis.GetAllProductList,{params:{page ,limit}});
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
const getAllProductPhoto = async () => {
    try {
        let result = await api.get(Apis.GetAllProductPhoto);
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
const getUpdateProduct = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdateProduct,data,config);
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
const getUploadProductImage = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUploadProductImage,data,config);
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
const getDeleteProduct = async (id) => {
    try {
        let result = await api.delete(Apis.GetDeleteProduct,{params: {id}});
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
const getProductById = async (id) => {
    try {
        let result = await api.get(Apis.GetProductById,{params: {id}});
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

const getProductPhotoDeleteById = async (data) => {
    try {
        let result = await api.post(Apis.GetProductPhotoDeleteById,{
            id: data.id, imgUrl: data.imgUrl
        });
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

const multiDeletproduct = async (data,config) => {
    try{
        let result = await api.post(Apis.multypledelete,data,config);
        if(result.data.error){
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;

    }catch(err){
        return null;
    }
}
const getupdateIndex = async (data,config) => {
    try {
        let result = await api.post(Apis.updateIndex,data,config);
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

const getdeleteRct = async(data,config) => {
    try {
        let result = await api.post(Apis.getdeletercpfhgty,data,config);
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


const getDeleteTagName = async(data,config) => {
    try {
        let result = await api.post(Apis.getdeletetagName,data,config);
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
    addProductList,
    getAllProductList,
    getUpdateProduct,
    getDeleteProduct,
    getUploadProductImage,
    getAllProductPhoto,
    getProductById,
    getProductPhotoDeleteById,
    updateStatus,
    getupdateIndex,
    deleteAwwsproductPhoto,
    deletevarientbyid,
    multiDeletproduct,
    getdeleteRct,
    getDeleteTagName
};