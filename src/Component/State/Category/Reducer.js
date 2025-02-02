import { GET_CATEGORY_ITEMS_FAILURE, GET_CATEGORY_ITEMS_REQUEST, GET_CATEGORY_ITEMS_SUCCESS, GET_CATEGORY_SUCCESS } from "./ActionType";

const initialState = {
    categoryItems: [], // Đổi tên từ categoryItem thành categoryItems để nhất quán
    update: null,
    category: [],
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_CATEGORY_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryItems: action.payload,
            };
        case GET_CATEGORY_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
            };
        default:
            return state;
    }
};