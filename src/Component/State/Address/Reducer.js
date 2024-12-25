import { GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    addresses: [],
    error: ''
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ADDRESS_SUCCESS:
            return {
                loading: false,
                addresses: action.payload,
                error: ''
            };
        case GET_ADDRESS_FAILURE:
            return {
                loading: false,
                addresses: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default addressReducer;