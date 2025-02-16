import {
    CHANGE_PASSWORD_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "./ActionType";

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",
    user: null,  // ✅ Thêm user vào state để cập nhật ngay sau khi sửa thông tin
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
                message: "",  // ✅ Reset message khi bắt đầu request
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: "Cập nhật thành công!",  // ✅ Thêm thông báo mặc định
                user: action.payload.user || state.user,  // ✅ Nếu API trả về user mới, cập nhật luôn
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                message: "Cập nhật thất bại!",  // ✅ Thêm thông báo lỗi mặc định
            };

        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
                message: "",  // ✅ Reset message khi bắt đầu request
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: "Đổi mật khẩu thành công!",  // ✅ Thêm thông báo mặc định
            };
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                message: "Đổi mật khẩu thất bại!",  // ✅ Thêm thông báo lỗi mặc định
            };

        default:
            return state;
    }
};
