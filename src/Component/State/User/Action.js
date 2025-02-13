import { api } from "../../Config/Api";
import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

export const updateUserProfile = (userId, fullName, avatar) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const token = localStorage.getItem("jwt"); 

        const requestData = {};
        if (fullName) requestData.fullName = fullName;
        if (avatar) requestData.avatar = avatar;

        const response = await api.put(`/api/users/update-profile/${userId}`, requestData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: response.data, 
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error.response?.data || "Lỗi khi cập nhật thông tin",
        });
    }
};

export const changePassword = (currentPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_PASSWORD_REQUEST });

        const token = localStorage.getItem("jwt"); // Lấy JWT từ localStorage

        const response = await api.post("/api/users/change-password", {
            currentPassword,
            newPassword
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: CHANGE_PASSWORD_SUCCESS,
            payload: response.data, // Thông báo từ API
        });

    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_FAILURE,
            payload: error.response?.data || "Lỗi khi đổi mật khẩu",
        });
    }
};