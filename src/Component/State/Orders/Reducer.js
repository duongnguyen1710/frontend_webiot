import { 
    GET_ORDER_INVOICE_FAILURE, 
    GET_ORDER_INVOICE_REQUEST, 
    GET_ORDER_INVOICE_SUCCESS, 
    GET_USERS_ORDERS_FAILURE, 
    GET_USERS_ORDERS_REQUEST, 
    GET_USERS_ORDERS_SUCCESS, 
    REORDERS_REQUEST, 
    REORDERS_SUCCESS, 
    REORDERS_FAILURE,
    REPAY_REQUEST,
    REPAY_SUCCESS,
    REPAY_FAILURE
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],         // Dữ liệu đơn hàng trên trang hiện tại
    totalPages: 0,      // Tổng số trang
    totalElements: 0,   // Tổng số đơn hàng
    currentPage: 0,     // Trang hiện tại
    pageSize: 10,       // Số lượng đơn hàng mỗi trang
    invoice: null,      
    error: null,
    reorderSuccess: false, // Trạng thái mua lại đơn hàng
    repaySuccess: false, // Trạng thái thanh toán lại đơn hàng
};

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.content,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
                currentPage: action.payload.number,
                pageSize: action.payload.size,
            };
        case GET_USERS_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case GET_ORDER_INVOICE_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ORDER_INVOICE_SUCCESS:
            return { ...state, loading: false, invoice: action.payload };
        case GET_ORDER_INVOICE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case REORDERS_REQUEST:
            return { ...state, loading: true, reorderSuccess: false, error: null };
        case REORDERS_SUCCESS:
            return { ...state, loading: false, reorderSuccess: true };
        case REORDERS_FAILURE:
            return { ...state, loading: false, reorderSuccess: false, error: action.payload };

        case REPAY_REQUEST:
            return { ...state, loading: true, repaySuccess: false, error: null };
        case REPAY_SUCCESS:
            return { ...state, loading: false, repaySuccess: true };
        case REPAY_FAILURE:
            return { ...state, loading: false, repaySuccess: false, error: action.payload };

        default:
            return state;
    }
};
