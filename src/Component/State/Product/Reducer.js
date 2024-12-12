import { 
    GET_NEWPRODUCT_SUCCESS, 
    GET_PRODUCTBYCATEGORY_SUCCESS, 
    GET_PRODUCTBYID_REQUEST, 
    GET_PRODUCTBYID_SUCCESS, 
    GET_PRODUCTBYID_FAILURE 
} from "./ActionType";

const initialState = {
    products: [],          // Danh sách sản phẩm
    productDetails: null,  // Chi tiết sản phẩm
    isLoading: false,      // Trạng thái tải dữ liệu
    error: null            // Lỗi (nếu có)
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy sản phẩm theo danh mục
        case GET_PRODUCTBYCATEGORY_SUCCESS:
            return {
                ...state,
                products: action.payload, // Cập nhật danh sách sản phẩm
            };

        // Lấy sản phẩm mới
        case GET_NEWPRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload
            };

        // Bắt đầu gọi API lấy sản phẩm theo ID
        case GET_PRODUCTBYID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null, // Xóa lỗi cũ (nếu có)
            };

        // Thành công lấy sản phẩm theo ID
        case GET_PRODUCTBYID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productDetails: action.payload, // Cập nhật chi tiết sản phẩm
            };

        // Thất bại lấy sản phẩm theo ID
        case GET_PRODUCTBYID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload, // Cập nhật lỗi
            };

        default:
            return state;
    }
};
