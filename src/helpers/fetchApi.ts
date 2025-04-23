// const host = process.env.REACT_APP_API_URL
const host = "http://192.168.31.144:8000"
// const host = "http://localhost:3002"

const path = host;
export const _ip = path;
export const ip = _ip;

// export const ip_image = "http://sanruk.projectsoft.co.th/api/v1/car_image/";
export const ip_image = "https://icefactory.projectsoft.co.th/customer_image/"

// export function fetchWithAuthentication(url) {
//      const headers = new Headers();
//      headers.set('Authorization', `${window.localStorage.getItem("token_Login")}`);
//      return fetch(url, { headers });
// }

export const GET = (path: string) => {
     return new Promise((resolve, reject) => {
          fetch(ip + path, {
               method: "GET",
               headers: {
                    "Content-Type": "application/json",
               },
          })
               .then((response) => {
                    if (response.status === 401) {
                         // หาก Unauthorized ให้เปลี่ยนเส้นทางไปที่ /login
                         window.localStorage.removeItem("token_Login"); // ลบ token
                         window.location.replace("/");
                    }
                    return response.json();
               })
               .then((json) => resolve(json))
               .catch((err) => reject(err));
     });
};

export const POST = (path: string, obj: any , formData: boolean) => {
     let lang = "th";
     return new Promise((resolve, reject) => {
          fetch(ip + path, {
               method: "POST",
               headers: formData
                    ? {
                         
                    }
                    : {
                         "Content-Type": "application/json",
                    },
               body: formData ? obj : JSON.stringify({ ...obj, lang }),
          })
               .then((response) => {
                    if (response.status === 401) {
                         window.localStorage.removeItem("token_Login");
                         window.location.replace("/");
                    }
                    return response.json();
               })
               .then((json) => resolve(json))
               .catch((err) => reject(err));
     });
};

export const POST_AUTH = (path: string, obj: any, formData: boolean) => {
     let lang = "th";
     return new Promise((resolve, reject) => {
          fetch(ip + path, {
               method: "POST",
               headers: formData
                    ? {}
                    : {
                         "Content-Type": "application/json",
                    },
               body: formData ? obj : JSON.stringify({ ...obj, lang }),
               // credentials: "include",
          })
               .then((response) => {
                    if (response.status === 401) {
                         window.localStorage.removeItem("token_Login");
                         window.location.replace("/");
                    }
                    return response.json();
               })
               .then((json) => resolve(json))
               .catch((err) => reject(err));
     });
};

// AUTH
export const login = "/auth/login";
export const logout = "/auth/logout";

//TRANSACTION 
export const TRANSACTION = "/transaction";

//TRANSACTION 
export const MERCHANT = "/merchant";
export const CREATEMERCHANT = "/merchant/create";
export const MERCHANTBYID = "/merchant/id";
export const MERCHANTEDIT = "/merchant/edit";

//USERADMIN
export const GETUSERADMIN = "/user-admin";
export const CREATEADMIN = "/user-admin/create";
export const EDITPASSWORD = "/user-admin/edit-password";
export const CHANGEPASSWORD = "/user-admin/change-password";

//Car
export const ADDCAR = "/car/add_car";
export const GETCAR = "/car/";
export const GETCARBYID = "/car/by_id/";
export const UPDATECAR = "/car/update_car/";
export const DELETECAR = "/car/delete_car/";
export const SEARCHCAR = "/car/search_car/";
export const UPDATECARIMAGE = "/car/update_car_image";
export const SELLCAR = "/car/sell_car";
export const LISTSELLCAR = "/car/list_sell_car";

//Customer
export const ADDCUSTOMER = "/customer/add_customer";
export const GETCUSTOMER = "/customer/";
export const GETCUSTOMERID = "/customer/getcustomer_id";
export const UPDATECUSTOMER = "/customer/update_customer";
export const UPDATECUSTOMERIMAGE = "/customer/update_customer_image";
export const GETCUSTOMERBYID = "/customer/getcustomer_by_id";
export const SEARCHCUSTOMER = "/customer/search_customer/";
export const DELETECUSTOMER = "/customer/delete_customer";

//Borrow
export const ADDBORROW = "/borrow/add_borrow";
export const GETBORROW = "/borrow/";
export const GETBORROWBYID = "/borrow/by_id/";
export const UPDATEBORROWRETURN = "/borrow/update_borrow_return/";
export const UPDATEBORROW = "/borrow/update_borrow/";
export const SEARCHBORROW = "/borrow/search_borrow/";

//Transaction
export const ADDTRANSACTION = "/transaction/add_transaction";
export const GETRANSACTION = "/transaction/";
export const SEARCHTRANSACTION = "/transaction/search_transaction/";
export const GETRANSACTIONBYID = "/transaction/by_id";
export const UPDATETRANSACTIONBYID = "/transaction/update";
export const DELETETRANSACTIONBYID = "/transaction/delete";
export const TODAYSUMMARY = "/transaction/today_summary";
export const TODAYTABLESUMMARY = "/transaction/today_table_summary";
export const SEARCHSUMMARY = "/transaction/search_summary";
export const DAILYSUMMARY = "/transaction/daily_summary";
export const LISTSUMMARY = "/transaction/list_summary";
export const RESENDDEPOSIT = "/transaction/resend/payso";
export const RESENDWITHDRAW = "/transaction/resend/proxpay";

//Store
export const ADDSTORE = "/store/add_store";
export const GETSTORE = "/store/";
export const ADDSUBSTORE = "/store/add_sub_store";
export const GETSUBSTORE = "/store/get_sub_store";
export const DELETESUBSTORE = "/store/delete_sub_store";
export const SUMDAILYSUBSTORE = "/store/sum_daily_sub_store";
export const SUMTODAYSUBSTORE = "/store/sum_today_sub_store";

//User
export const ADDUSER = "/user/add_User";
export const GETUSER = "/user/";
export const GETAllUSER = "/user/get_all_user";
export const GETUSERBYID = "/user/getuser_by_id";
export const UPDATEUSER = "/user/update_user";
export const UPDATEUSERPASSWORD = "/user/update_user_password";
export const DELETEUSER = "/user/delete_user";
export const SEARCHUSER = "/user/search_user";
export const COMPAREPASSWORD = "/user/compare_password";

//Settlement
export const SETTLEMENTAPI = "/settlement";
export const APPROVESETTLE = "/settlement/approve";

//Provider
export const GETPROVIDER = "/provider";

//Agent
export const GETAGENT = "/agent";
export const CREATEAGENT = "/agent/create";

//TRANSACTIONSCALLBACK
export const TRANSACTIONS = "/transaction/trasactions";
export const TRANSACTIONPROVIDER = "/transaction/callbackTransaction";
export const TRANSACTIONMERCHANT = "/transaction/callbackMerchant";
export const TRANSACTIONSAPPROVE = "/transaction/approve";
export const TRANSACTIONSREJECT = "/transaction/reject";
export const TRANSACTIONSWITHDRAW = "/transaction/withdraw";
export const TRANSACTIONSDEPOSIT = "/transaction/deposit";
export const REFUND = "/transaction/refund";

//WithdrawBroker
export const WITHDRAWBROKER = "/withdraw/broker";
export const WITHDRAWLISTBROKER = "/withdraw/getwithdraw";

//Upload CSV
export const UPLOADCSV ="/upload";