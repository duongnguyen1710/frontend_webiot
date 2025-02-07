import { RESULT_ZALOPAY_FAILURE, RESULT_ZALOPAY_REQUEST, RESULT_ZALOPAY_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    success: false,
    error: null,
    message: '',
};

export const zaloPayReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESULT_ZALOPAY_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case RESULT_ZALOPAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                message: action.payload,
            };
        case RESULT_ZALOPAY_FAILURE:
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