import { api } from "../../Config/Api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_INVOICE_FAILURE, GET_ORDER_INVOICE_REQUEST, GET_ORDER_INVOICE_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, REORDERS_FAILURE, REORDERS_REQUEST, REORDERS_SUCCESS } from "./ActionType";

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
            } else if (data.orderUrl) {
                window.location.href = data.orderUrl;
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
    

export const getUsersOrders = (jwt, page = 0, size = 10) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDERS_REQUEST });
        try {
            const { data } = await api.get(`/api/orders/userss?page=${page}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("User's orders with pagination:", data);
            dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.error("Error fetching orders:", error);
            dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: error.message || "Failed to fetch orders" });
        }
    };
};

export const getOrderInvoice = (jwt, orderId) => {
    return async (dispatch) => {
        dispatch({ type: GET_ORDER_INVOICE_REQUEST });

        try {
            const response = await fetch(`/api/${orderId}/invoice`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Order Invoice Data:", data);

            dispatch({
                type: GET_ORDER_INVOICE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.error("Error fetching invoice:", error);
            dispatch({
                type: GET_ORDER_INVOICE_FAILURE,
                payload: error.message || 'Đã xảy ra lỗi khi lấy hóa đơn',
            });
        }
    };
};


export const reorderOrder = (orderId, paymentMethod, addressId, jwt) => {
    return async (dispatch) => {
        dispatch({ type: REORDERS_REQUEST });

        try {
            const { data } = await api.post(
                `/api/orders/reorder/${orderId}`, 
                { paymentMethod, addressId }, // Body request có thêm addressId
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            console.log("Mua lại đơn hàng thành công:", data);
            dispatch({ type: REORDERS_SUCCESS, payload: data });

            // Chuyển hướng đến trang thanh toán nếu có link
            if (data.vnpay_url) {
                window.location.href = data.vnpay_url;
            } else if (data.stripe_url) {
                window.location.href = data.stripe_url;
            } else if (data.paypal_url) {
                window.location.href = data.paypal_url;
            } else if (data.orderUrl) {
                window.location.href = data.orderUrl;
            } else if (data.momo_url) {
                window.location.href = data.momo_url;
            } else if (data.onepay_url) { 
                window.location.href = data.onepay_url;
            } else {
                console.log("Không có URL thanh toán từ backend", data);
            }

            return data; // Trả về kết quả để xử lý tiếp trong UI (nếu cần)
        } catch (error) {
            console.error("Lỗi khi mua lại đơn hàng:", error);
            dispatch({ 
                type: REORDERS_FAILURE, 
                payload: error.response?.data?.message || "Có lỗi xảy ra khi mua lại đơn hàng!" 
            });

            throw error; // Ném lỗi để UI xử lý hiển thị thông báo
        }
    };
};
