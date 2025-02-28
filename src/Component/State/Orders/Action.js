import { api } from "../../Config/Api";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_INVOICE_FAILURE, GET_ORDER_INVOICE_REQUEST, GET_ORDER_INVOICE_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, REORDERS_FAILURE, REORDERS_REQUEST, REORDERS_SUCCESS, REPAY_FAILURE, REPAY_REQUEST, REPAY_SUCCESS, UPDATE_ORDERS_FAILURE, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS } from "./ActionType";

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
            } else if (data.payUrl) {
                window.location.href = data.payUrl;
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

export const retryPayment = (orderId, paymentMethod, addressId, jwt) => {
    return async (dispatch) => {
        dispatch({ type: REPAY_REQUEST });

        try {
            const { data } = await api.post(
                `/api/orders/retry-payment/${orderId}`,
                { paymentMethod, addressId }, // Gửi phương thức thanh toán và địa chỉ mới
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            console.log("Thanh toán lại thành công:", data);
            dispatch({ type: REPAY_SUCCESS, payload: data });

            // Nếu có URL thanh toán, tự động chuyển hướng
            if (data.vnpay_url) {
                window.location.href = data.vnpay_url;
            } else if (data.stripe_url) {
                window.location.href = data.stripe_url;
            } else if (data.orderUrl) {
                window.location.href = data.orderUrl;
            } else if (data.momo_url) {
                window.location.href = data.momo_url;
            } else {
                console.log("Không có URL thanh toán từ backend", data);
            }

            return data; // Trả về kết quả để UI có thể xử lý tiếp (nếu cần)
        } catch (error) {
            console.error("Lỗi khi thanh toán lại:", error);
            dispatch({
                type: REPAY_FAILURE,
                payload: error.response?.data?.message || "Có lỗi xảy ra khi thanh toán lại!",
            });

            throw error; // Ném lỗi để UI xử lý hiển thị thông báo
        }
    };
};

export const updateOrderStatus = (jwt, orderId, newStatus) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDERS_REQUEST });
        try {
            const { data } = await api.put(
                `/api/${orderId}/status`,
                null,
                {
                    params: { status: newStatus },
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Trạng thái đơn hàng đã cập nhật:', data);
            dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: UPDATE_ORDERS_FAILURE,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    };
};