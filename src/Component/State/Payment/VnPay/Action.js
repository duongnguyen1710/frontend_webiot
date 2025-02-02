import { api } from "../../../Config/Api";
import { RESULT_VNPAY_FAILURE, RESULT_VNPAY_REQUEST, RESULT_VNPAY_SUCCESS } from "./ActionType";

export const handleVNPayCallback = (queryParams, jwt) => async (dispatch) => {
    try {
        dispatch({ type: RESULT_VNPAY_REQUEST }); // Bắt đầu gọi API

        // Gọi API Backend với Bearer Token
        const response = await api.get('/api/payment/success', {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({
            type: RESULT_VNPAY_SUCCESS,
            payload: response.data, // Trả về dữ liệu từ Backend
        });
    } catch (error) {
        dispatch({
            type: RESULT_VNPAY_FAILURE,
            payload: error.response?.data || 'Lỗi khi xử lý thanh toán VNPAY',
        });
    }
};