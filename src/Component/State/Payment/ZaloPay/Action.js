import { api } from "../../../Config/Api";
import { RESULT_ZALOPAY_FAILURE, RESULT_ZALOPAY_REQUEST, RESULT_ZALOPAY_SUCCESS } from "./ActionType";

export const handleZaloPayCallback = (queryParams, jwt) => async (dispatch) => {
    try {
        dispatch({ type: RESULT_ZALOPAY_REQUEST }); // Bắt đầu gọi API

        // Gọi API Backend với Bearer Token
        const response = await api.get("/api/zalopay", {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({
            type: RESULT_ZALOPAY_SUCCESS,
            payload: response.data, // Trả về dữ liệu từ Backend
        });
    } catch (error) {
        dispatch({
            type: RESULT_ZALOPAY_FAILURE,
            payload: error.response?.data || "Lỗi khi xử lý thanh toán ZaloPay",
        });
    }
};