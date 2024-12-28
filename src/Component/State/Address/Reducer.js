import { 
    GET_ADDRESS_FAILURE, 
    GET_ADDRESS_REQUEST, 
    GET_ADDRESS_SUCCESS,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    addresses: [],
    error: '',
    creating: false, // Trạng thái riêng cho việc tạo địa chỉ
    createError: '', // Lưu lỗi khi tạo địa chỉ
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        // --- FETCH ADDRESSES ---
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload,
                error: ''
            };
        case GET_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                addresses: [],
                error: action.payload
            };
        
            case CREATE_ADDRESS_REQUEST:
                return { ...state, creating: true, createError: null };
            case CREATE_ADDRESS_SUCCESS:
                return { 
                    ...state, 
                    creating: false, 
                    addresses: [...state.addresses, action.payload],
                    createError: null
                };
            case CREATE_ADDRESS_FAILURE:
                return { ...state, creating: false, createError: action.payload };
        
        // --- DEFAULT ---
        default:
            return state;
    }
};

export default addressReducer;
