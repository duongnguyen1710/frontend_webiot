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
    VERIFY_USER_FAILURE, 
    VERIFY_USER_REQUEST,
    VERIFY_USER_SUCCESS
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null,
};

export const authReducer = (state = initialState, action) => {
    try {
        switch (action.type) {
            case REGISTER_REQUEST:
            case LOGIN_REQUEST:
            case GET_USER_REQUEST:
            case VERIFY_USER_REQUEST:
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
                    favorites: action.payload?.favorites || [], // Sửa lỗi typo và kiểm tra null
                };
            
                case VERIFY_USER_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        success: "Email verification successful",
                    };

            case LOGOUT:
                // Xóa jwt khi logout
                localStorage.removeItem("jwt");
                return initialState;

            case REGISTER_FAILURE:
            case LOGIN_FAILURE:
            case GET_USER_FAILURE:
                case VERIFY_USER_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload || "Unknown Error",
                    success: null,
                };

            default:
                return state;
        }
    } catch (error) {
        console.error("Reducer error:", error);
        return state; // Giữ nguyên trạng thái hiện tại nếu lỗi xảy ra
    }
};
