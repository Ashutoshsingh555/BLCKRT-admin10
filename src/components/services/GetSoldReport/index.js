import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const getAllSoldList = async () => {
    try {
        let result = await api.get(Apis.GetSoldReportList);
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
const getdailyreports = async () => {
    try {
        let result = await api.get(Apis.getdailyOrderdetailslist);
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

export default{
    getAllSoldList,
    getdailyreports
}