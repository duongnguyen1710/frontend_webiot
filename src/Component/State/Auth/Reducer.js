import { 
    GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    RESEND_EMAIL_FAILURE, 
    RESEND_EMAIL_REQUEST, 
    RESEND_EMAIL_SUCCESS, 
    VERIFY_USER_FAILURE, 
    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS,
    SEND_OTP_FORGOT_PASSWORD_REQUEST,
    SEND_OTP_FORGOT_PASSWORD_SUCCESS,
    SEND_OTP_FORGOT_PASSWORD_FAILURE,
    VERIFY_OTP_FORGOT_PASSWORD_REQUEST,
    VERIFY_OTP_FORGOT_PASSWORD_SUCCESS,
    VERIFY_OTP_FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null,
    isOtpVerified: false, // Trạng thái xác thực OTP
    isPasswordReset: false, // Trạng thái đặt lại mật khẩu
};

export const authReducer = (state = initialState, action) => {
    try {
        switch (action.type) {
            case REGISTER_REQUEST:
            case LOGIN_REQUEST:
            case GET_USER_REQUEST:
            case VERIFY_USER_REQUEST:
            case RESEND_EMAIL_REQUEST:
            case SEND_OTP_FORGOT_PASSWORD_REQUEST:
            case VERIFY_OTP_FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST: // Xử lý khi đặt lại mật khẩu
                return { 
                    ...state, 
                    isLoading: true, 
                    error: null, 
                    success: null 
                };

            case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
                if (action.payload) {
                    localStorage.setItem("jwt", action.payload);
                }
                return {
                    ...state,
                    isLoading: false,
                    jwt: action.payload,
                    success: action.type === REGISTER_SUCCESS 
                        ? "Register Successful" 
                        : "Login Successful",
                };

            case GET_USER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    user: action.payload,
                    favorites: action.payload?.favorites || [],
                };
            
            case VERIFY_USER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    success: "Email verification successful",
                };

            case RESEND_EMAIL_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    success: "OTP resent successfully",
                };

            case SEND_OTP_FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    success: "OTP gửi thành công! Kiểm tra email của bạn.",
                };

            case VERIFY_OTP_FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    success: "Mã OTP hợp lệ! Bạn có thể đặt lại mật khẩu.",
                    isOtpVerified: true, // Đánh dấu OTP đã được xác thực
                };

            case RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    success: "Mật khẩu đã được đặt lại thành công!",
                    isPasswordReset: true, // Đánh dấu đã đặt lại mật khẩu thành công
                    isOtpVerified: false, // Reset trạng thái OTP sau khi đặt lại mật khẩu
                };

            case LOGOUT:
                localStorage.removeItem("jwt");
                return initialState;

            case REGISTER_FAILURE:
            case LOGIN_FAILURE:
            case GET_USER_FAILURE:
            case VERIFY_USER_FAILURE:
            case RESEND_EMAIL_FAILURE:
            case SEND_OTP_FORGOT_PASSWORD_FAILURE:
            case VERIFY_OTP_FORGOT_PASSWORD_FAILURE:
            case RESET_PASSWORD_FAILURE: // Đặt lại mật khẩu thất bại
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload || "Unknown Error",
                    success: null,
                    isOtpVerified: false, // Nếu OTP sai, đặt lại trạng thái xác thực
                    isPasswordReset: false, // Nếu đặt lại mật khẩu thất bại, không cập nhật trạng thái
                };

            default:
                return state;
        }
    } catch (error) {
        console.error("Reducer error:", error);
        return state; 
    }
};
