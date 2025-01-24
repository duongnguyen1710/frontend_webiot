import { GET_ORDER_INVOICE_FAILURE, GET_ORDER_INVOICE_REQUEST, GET_ORDER_INVOICE_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionType";


const initialState = {
    loading: false,
    orders: [],         // Dữ liệu đơn hàng trên trang hiện tại
    totalPages: 0,      // Tổng số trang
    totalElements: 0,   // Tổng số đơn hàng
    currentPage: 0,     // Trang hiện tại
    pageSize: 10,
    invoice: null,       // Số lượng đơn hàng mỗi trang
    error: null,
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

        default:
            return state;
    }
};