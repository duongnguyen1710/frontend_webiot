import {
  GET_NEWPRODUCT_SUCCESS,
  GET_PRODUCTBYCATEGORY_SUCCESS,
  GET_PRODUCTBYID_REQUEST,
  GET_PRODUCTBYID_SUCCESS,
  GET_PRODUCTBYID_FAILURE,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  FILTER_PRODUCTBYCATEGORYITEM_REQUEST,
  FILTER_PRODUCTBYCATEGORYITEM_SUCCESS,
  FILTER_PRODUCTBYCATEGORYITEM_FAILURE,
} from "./ActionType";

const initialState = {
  products: [], // Danh sách sản phẩm
  productDetails: null, // Chi tiết sản phẩm
  isLoading: false, // Trạng thái tải dữ liệu
  error: null, // Lỗi (nếu có)
  pagination: {
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
  },
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
        products: action.payload,
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

      case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null, // Xóa lỗi cũ (nếu có)
        };
  
      // Thành công lấy sản phẩm theo nhà hàng và danh mục
      case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS:
        return {
          ...state,
          isLoading: false,
          products: action.payload.content, // Dữ liệu sản phẩm (nội dung trang)
          pagination: {
            currentPage: action.payload.pageable.pageNumber,
            pageSize: action.payload.pageable.pageSize,
            totalPages: action.payload.totalPages,
            totalElements: action.payload.totalElements,
          },
        };
  
      // Thất bại lấy sản phẩm theo nhà hàng và danh mục
      case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload, // Cập nhật lỗi
        };
  

    case SEARCH_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case SEARCH_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FILTER_PRODUCTBYCATEGORYITEM_REQUEST:
      return { ...state, loading: true, products: [], error: null };

    case FILTER_PRODUCTBYCATEGORYITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case FILTER_PRODUCTBYCATEGORYITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



