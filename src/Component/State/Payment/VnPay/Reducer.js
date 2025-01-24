import { RESULT_VNPAY_FAILURE, RESULT_VNPAY_REQUEST, RESULT_VNPAY_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: '',
};

export const vnPayReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESULT_VNPAY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case RESULT_VNPAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
            };
        case RESULT_VNPAY_FAILURE:
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