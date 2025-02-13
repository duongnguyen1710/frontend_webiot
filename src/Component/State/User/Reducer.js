import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: "",
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
            case CHANGE_PASSWORD_REQUEST:
                return {
                    ...state,
                    loading: true,
                    success: false,
                    error: null,
                };
            case CHANGE_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    success: true,
                    message: action.payload,
                };
            case CHANGE_PASSWORD_FAILURE:
                return {
                    ...state,
                    loading: false,
                    success: false,
                    error: action.payload,
                };
        default:
            return state;
    }
};