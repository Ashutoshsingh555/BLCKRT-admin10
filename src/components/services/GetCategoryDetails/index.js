import api from '../../ApiConfig';
import { Apis } from '../../../config';
import { NotificationManager } from 'react-notifications';

const createCategoryList = async (data,config) => {
    try {
        let result = await api.post(Apis.CreateCategoryList,data,config);
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
        let result = await api.post(Apis.getcatindexUpdate,data,config);
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


const getCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetAllCategoryList);
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

const getsubcategorydata = async () => {
    try {
        let result = await api.get(Apis.getallsubcategory);
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

const getReccomendedCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetRecomendedProductByCategory);
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


const getUpdateCategoryList = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateCategoryList,data);
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

const getUpdateCategoryStatus = async (data) => {
    try {
        let result = await api.post(Apis.getupdateStatuscat,data);
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
const getUpdatesubCategoryStatus = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateSubStatus,data);
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

// sub categorylist
const createSubCategoryList = async (data ,config) => {
    try {
        let result = await api.post(Apis.CreateSubCategoryList,data,config);
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

const getSubCategoryList = async () => {
    try {
        let result = await api.get(Apis.GEtAllSubCategoryList);
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

const getUpdateSubList = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateSubCategoryList,data);
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


const getUpdateSubCat = async (data) => {
    try {
        let result = await api.post(Apis.GetUpdateSubCategory,data);
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
const getSubDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetSubDeleteById,{params: {id}});
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

// child category list
const getSelectSubCategory = async (id) => {
    try {
        let result = await api.get(Apis.GetAllSubCategory+ `${id}`);
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
const createChildCategory = async (data) => {
    try {
        let result = await api.post(Apis.CreateChildCategory,data);
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

const getChildCategoryList = async () => {
    try {
        let result = await api.get(Apis.GetAllChildCategoryList);
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
const getChildDeleteById = async (id) => {
    try {
        let result = await api.delete(Apis.GetChildDeleteById,{params: {id}});
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
const getAllSubChildCategory = async (id) => {
    try {
        let result = await api.get(Apis.GetAllSubChildCategory+ `${id}`);
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

const getDeleteMainCotegory = async (id) => {
    try {
        let result = await api.delete(Apis.getDeleteMainCotegary,{params: {id}});
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
    createCategoryList,
    getCategoryList,
    getReccomendedCategoryList ,
    getUpdateCategoryList,
    createSubCategoryList,
    getSubCategoryList,
    getUpdateSubList,
    getSubDeleteById,
    getSelectSubCategory,
    getDeleteMainCotegory,
    createChildCategory,
    getChildCategoryList,
    getChildDeleteById,
    getAllSubChildCategory,
    getUpdateSubCat,
    getUpdateCategoryStatus,
    getsubcategorydata,
    getUpdatesubCategoryStatus,
    getupdateIndex
};