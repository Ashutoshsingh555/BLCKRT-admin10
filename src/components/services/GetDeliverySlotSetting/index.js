import api from '../../ApiConfig';
import { Apis } from '../../../config';
import {NotificationManager} from"react-notifications"

 const GetSlotlistById= async (id) =>{
  try {
        let result = await api.get(Apis.GetSlotDetailsByid,{params:{id}});
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

const updateSlotSetting = async (data,config) => {
    try {
        let result = await api.post(Apis.GetSlotUpdate,data,config);
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

const updateTimeSetting = async (data,config) => {
    try {
        let result = await api.post(Apis.GetUpdatetime,data,config);
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
const deletebyid = async (id) =>{
   try {
        let result = await api.delete(Apis.GetslotDelete,{params: {id}});
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

export default{
    GetSlotlistById,
    updateSlotSetting,
    deletebyid,
    updateTimeSetting

}