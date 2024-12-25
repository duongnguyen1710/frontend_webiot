import { api } from "../../Config/Api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({type: CREATE_ORDER_REQUEST});
        try {
            const {data} = await api.post(`/api/orders`, reqData.order,{
                headers:{
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            if (data.vnpay_url) {
                window.location.href = data.vnpay_url;
            } else if (data.stripe_url) {
                window.location.href = data.stripe_url;
            } else if (data.paypal_url) {
                window.location.href = data.paypal_url;
            } else if (data.zalopay_url) {
                window.location.href = data.zalopay_url;
            } else if (data.momo_url) {
                window.location.href = data.momo_url;
            } else if (data.onepay_url) { 
                window.location.href = data.onepay_url;
            } else {
                console.log("No payment URL returned from backend", data);
            }
            console.log("created order data", data);
            dispatch({type:CREATE_ORDER_SUCCESS, payload:data});
        } catch (error) {
            console.log("error", error);
            dispatch({type:CREATE_ORDER_FAILURE, payload:error});
        }
    };
};
    

export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({type: GET_USERS_ORDERS_REQUEST});
        try {
            const {data} = await api.get(`/api/orders/user`, {
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("users order", data);
            dispatch({type: GET_USERS_ORDERS_SUCCESS, payload:data});
        } catch (error) {
            dispatch({type: GET_USERS_ORDERS_FAILURE, payload:error});
        }
    }
}