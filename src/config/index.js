 //const API_URL =  "https://backend.buluckart.com";
 //const API_URL = "http://ec2-13-126-65-131.ap-south-1.compute.amazonaws.com"
 const API_URL =  "http://localhost:4000";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/rootLogin`,
  GetUserRegsiter: `${API_URL}/api/auth/register`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetAllUserData: `${API_URL}/api/auth/user/userdata`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,



  //Dashboard
  GetOrderByStatus: `${API_URL}/api/order/status`,
  GetAllStatusOrder: `${API_URL}/api/order/count`,



  //Vendor api
  CreateSupplierList: `${API_URL}/api/supplier/create`,
  CreateSupplierProduct: `${API_URL}/api/supplier/product-add`,
  GetAllSellerList: `${API_URL}/api/supplier/list`,
  GetUpdateSellerList: `${API_URL}/api/supplier/update`,
  GetDeleteSellerList: `${API_URL}/api/supplier/delete`,


  //location api
  GetAllLocationCreate: `${API_URL}/api/location/create`,
  GetAllLocationList: `${API_URL}/api/location/list`,
  GetLocationDeleteById: `${API_URL}/api/location/delete`,
  GetLocationUpdate: `${API_URL}/api/location/update`,

  //area api
  CreateAreaList: `${API_URL}/api/location/area/create`,
  GetAllAreaList: `${API_URL}/api/location/area/list`,
  GetAreaDeleteById: `${API_URL}/api/location/area/delete`,
  GetAreaUpdate: `${API_URL}/api/location/area/update`,
  GetAllAreaByLocation: `${API_URL}/api/location/area/getAllAreaList?locationId=`,

  //category api

  CreateCategoryList: `${API_URL}/api/category/create`,
  GetAllCategoryList: `${API_URL}/api/category/main-list`,
  GetUpdateCategoryList: `${API_URL}/api/category/updatecategoryonly`,
  GetRecomendedProductByCategory: `${API_URL}/api/category/rcpcategory`,
  getDeleteMainCotegary: `${API_URL}/api/category/delete`,
  getupdateStatuscat: `${API_URL}/api/category/catstatus`,
  getcatindexUpdate:`${API_URL}/api/category/indexupdate`,

  //Sub category api
  CreateSubCategoryList: `${API_URL}/api/category/create-sub`,
  GEtAllSubCategoryList: `${API_URL}/api/category/sub-list`,
  GetUpdateSubCategoryList: `${API_URL}/api/category/sub-list/update`,
  GetSubDeleteById: `${API_URL}/api/category/deleteSub`,
  GetUpdateSubCategory: `${API_URL}/api/category/updatesubcategoryonly`,
  GetUpdateSubStatus: `${API_URL}/api/category/updatestatus`,


  //Child category api
  GetAllSubCategory: `${API_URL}/api/category/getAllSubCategory?categoryId=`,
  CreateChildCategory: `${API_URL}/api/category/create-sub-child`,
  GetAllChildCategoryList: `${API_URL}/api/category/list`,
  GetChildDeleteById: `${API_URL}/api/category/child/deleteById`,
  GetAllSubChildCategory: `${API_URL}/api/category/getAllSubChildCategory?subcategoryId=`,
  getallsubcategory: `${API_URL}/api/category/allsublist`,

  //product api
  AddProductList: `${API_URL}/api/product/add`,
  GetAllProductList: `${API_URL}/api/product/getAllproductList`,
  GetAllProductPhoto: `${API_URL}/api/product/getAllPhoto`,
  GetUpdateProduct: `${API_URL}/api/product/update`,
  GetUploadProductImage: `${API_URL}/api/product/upload-img`,
  GetDeleteProduct: `${API_URL}/api/product/delete`,
  GetProductById: `${API_URL}/api/product/getProductById`,
  GetProductPhotoDeleteById: `${API_URL}/api/product/aws/delete/photo`,
  updateStatusById: `${API_URL}/api/product/status`,
  updateIndex: `${API_URL}/api/product/sortindex`,
  awsdeleteproduct: `${API_URL}/api/product/aws/delete/photo`,
  multypledelete: `${API_URL}/api/product/multydelete`,
  getdeletercpfhgty: `${API_URL}/api/product/deleterc`,
  getdeletetagName: `${API_URL}/api/product/delatetg`,

  // VARIENT API 
  getoutofvarientList: `${API_URL}/api/product/varientList`,
  deletevarient: `${API_URL}/api/product/vrientdelete`,
  updateVarient: `${API_URL}/api/product/vrientUpdate`,


  //single file upload
  postphoto: `${API_URL}/api/img/add`,
  deletePhoto: `${API_URL}/api/img/awsphoto`,


  //order detail
  GetAllOrderDetails: `${API_URL}/api/order/list`,
  GetOrderStatusUpdate: `${API_URL}/api/order/status/update`,
  GetorderSearchBuIorderId: `${API_URL}/api/order/search`,
  getdailyOrderdetailslist: `${API_URL}/api/order/earn`,

  // customer details
  GetAllCustomerDetails: `${API_URL}/api/authotp/getcustomer`,
  GetCustomerDeleteById: `${API_URL}/api/authotp/delete`,
  getAddCustomer: `${API_URL}/api/authotp/createByadmin`,

  //payment list
  GetAllPaymentList: `${API_URL}/api/payment/getAllPayment`,

  //upload inventory Image
  GetAddInventoryImage: `${API_URL}/api/inventory/add`,
  GetinventoryList: `${API_URL}/api/inventory/getall`,
  GetInventoryById: `${API_URL}/api/inventory/getby/1`,
  GetInventoryDelete: `${API_URL}/api/inventory/delete`,

  // setting banner appi
  GetBannerList: `${API_URL}/api/banner/getall`,
  GetAddBannerList: `${API_URL}/api/banner/add`,
  GetBannerdelete: `${API_URL}/api/banner/delete`,
  GetUpdateBanner: `${API_URL}/api/banner/update`,
  GetDeletebannerPhoto: `${API_URL}/api/banner/deletephoto`,
  GetUpdateBannerPhoto: `${API_URL}/api/banner/updatephoto`,
  GetAddSubBanners:`${API_URL}/api/banner/addbanners`,
  getbannerindexupdate:`${API_URL}/api/banner/indexupdate`,

  //setting faq
  GetFaqList: `${API_URL}/api/faq/getall`,
  GetAddFaqList: `${API_URL}/api/faq/add`,
  GetFaqdelete: `${API_URL}/api/faq/delete`,
  GetUpdateFaq: `${API_URL}/api/faq/update`,
  GetUpdateStatus: `${API_URL}/api/faq/updateStatus`,

  //coupon
  GetcouponList: `${API_URL}/api/coupon/getall`,
  GetAddcouponList: `${API_URL}/api/coupon/add`,
  Getcoupondelete: `${API_URL}/api/coupon/delete`,
  GetUpdatecoupon: `${API_URL}/api/coupon/update`,
  GetUpdatecouponStatus: `${API_URL}/api/coupon/updatestatus`,
  //enquiry
  GetAddEnquiryList: `${API_URL}/api/enquiry/getall`,
  GetDeleteEnquiry: `${API_URL}/api/enquiry/delete`,
  //citymanage 
  GetCityName: `${API_URL}/api/city/getall`,
  GetAddCity: `${API_URL}/api/city/add`,
  GetDeleteCity: `${API_URL}/api/city/delete`,
  GetUpdateCity: `${API_URL}/api/city/update`,
  GetGlobleCityList: `${API_URL}/api/city/globlecity`,
  GetPickupdetailsbyid: `${API_URL}/api/pickup/getby`,
  getpickupUpdatebyId: `${API_URL}/api/pickup/update`,
  getCountryNameList: `${API_URL}/api/city/countryList`,
  getCityFilter: `${API_URL}/api/city/citylistbyname`,

  //deliveries areas
  GetPickupList: `${API_URL}/api/delivery/getall`,
  Createadress: `${API_URL}/api/delivery/add`,
  DeletePickUp: `${API_URL}/api/delivery/delete`,
  getUpdateAreas: `${API_URL}/api/delivery/update`,

  //runner list 
  GetAllRunnerList: `${API_URL}/api/runnerauth/getrunnerauth`,
  updateOrderRunner: `${API_URL}/api/order/runnerstatus`,
  GetAddRunner: `${API_URL}/api/runnerauth/createrunner`,
  getdelete: `${API_URL}/api/runnerauth/delete`,
  //report
  GetSoldReportList: `${API_URL}/api/order/soldreport?status=delieverd`,
  //alertMsg
  GelAlertList: `${API_URL}/api/alert/getall`,
  createAlert: `${API_URL}/api/alert/add`,
  deleteAlert: `${API_URL}/api/alert/delete`,

  //store information
  GetUpdatedInfo: `${API_URL}/api/settinginf/update`,
  getInfoById: `${API_URL}/api/settinginf/getby`,


  //feature settings
  GetSettingDetails: `${API_URL}/api/features/getby`,
  GetSettingUpdate: `${API_URL}/api/features/update`,

  //feature settings
  GetSettingPaymentDetails: `${API_URL}/api/paymentsettings/getby`,
  GetSettingPaymentUpdate: `${API_URL}/api/paymentsettings/update`,

  //Tax settings
  GetSettingTaxDetails: `${API_URL}/api/settingtax/getbyid`,
  GetSettingTaxUpdate: `${API_URL}/api/settingtax/update`,
  GetTaxdelete: `${API_URL}/api/settingtax/delete`,
  //setting page 
  GetSettingPageList: `${API_URL}/api/page/getall`,
  GetSettingPagePost: `${API_URL}/api/page/add`,
  GetDeleteSettingPage: `${API_URL}/api/page/delete`,
  GetUpdateSettingPage: `${API_URL}/api/page/update`,
  //delivery slots
  GetSlotDetailsByid: `${API_URL}/api/deliveryslot/getlistby`,
  GetSlotUpdate: `${API_URL}/api/deliveryslot/update`,
  GetslotDelete: `${API_URL}/api/deliveryslot/delete`,
  GetUpdatetime: `${API_URL}/api/deliveryslot/updatetime`,
  //loyalty oupon
  GetUpdateCoupon: `${API_URL}/api/loylitycoupon/update`,
  GetDeleteCoupon: `${API_URL}/api/loylitycoupon/delete`,
  GetAddCopon: `${API_URL}/api/loylitycoupon/add`,
  GetListCoupon: `${API_URL}/api/loylitycoupon/getall`,
  //configue points 
  getConfigdetails: `${API_URL}/api/configue/getall`,
  getupdateConfige: `${API_URL}/api/configue/update`,
  //refer and earn
  GetReferUserList: `${API_URL}/api/refer/getby`,
  GetUpdateRefer: `${API_URL}/api/refer/update`,
  //inventoryStockManagementsetting
  GetinventoryStocksetting: `${API_URL}/api/inStockRoute/listby`,
  GetinventoryStockUpdate: `${API_URL}/api/inStockRoute/update`,

  // bulk import export
  GetUploadProductexcell: `${API_URL}/api/excel/upload`,
  getdownloadImageinventory: `${API_URL}/api/excel/imgexportInventory`,
  getUploadImgInventory: `${API_URL}/api/excel/uploadimgexcell`,
  getDeleteAllProductInventory: `${API_URL}/api/excel/truncatproduct`,
  updateProductPrice: `${API_URL}/api/excel/updateprice`,
  downloadvarientList: `${API_URL}/api/excel/exportvarient`,
  uploadcustomerdetails:`${API_URL}/api/customerfile/importcustmer`,

  //admin Contact Us
  GetAddMessage: `${API_URL}/api/adminContact/add`,
  //gift offers
   GetAddgift: `${API_URL}/api/giftoffers/add`,
   GetGetGift: `${API_URL}/api/giftoffers/getoffers`,
   GetDeleteGift: `${API_URL}/api/giftoffers/delete`,
   getupdateGift: `${API_URL}/api/giftoffers/update`,

   //recent search
   getrecentsearchlist:`${API_URL}/api/product/getsearchlist`,
   deleterecentsearchlist:`${API_URL}/api/product/deletesearch`





};
export { Apis, API_URL };
