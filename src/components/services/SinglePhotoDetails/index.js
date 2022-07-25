import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const createSinglephoto = async (data) => {
    try {
        let result = await api.post(Apis.postphoto,data);
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

const deleteAwwssinglePhoto = async (data,config) =>{
    try{
        let result = await api.post(Apis.deletePhoto,data,config);
        if(result.data.error){
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;

    }catch(err){
        return null;
    }
}

export default {
    createSinglephoto,
    deleteAwwssinglePhoto
   
};