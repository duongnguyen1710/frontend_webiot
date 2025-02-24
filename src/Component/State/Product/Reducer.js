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
  GET_ALLPRODUCT_REQUEST,
  GET_ALLPRODUCT_SUCCESS,
  GET_ALLPRODUCT_FAILURE,
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
    // Lấy toàn bộ sản phẩm có phân trang
    case GET_ALLPRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_ALLPRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.content, // Lưu danh sách sản phẩm từ API
        pagination: {
          currentPage: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        },
      };

    case GET_ALLPRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // Lấy sản phẩm theo danh mục
    case GET_PRODUCTBYCATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload,
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
        error: null,
      };

    // Thành công lấy sản phẩm theo ID
    case GET_PRODUCTBYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetails: action.payload,
      };

    // Thất bại lấy sản phẩm theo ID
    case GET_PRODUCTBYID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.content,
        pagination: {
          currentPage: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        },
      };

    case GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SEARCH_PRODUCT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case SEARCH_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, products: action.payload };

    case SEARCH_PRODUCT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case FILTER_PRODUCTBYCATEGORYITEM_REQUEST:
      return { ...state, isLoading: true, products: [], error: null };

    case FILTER_PRODUCTBYCATEGORYITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        error: null,
      };

    case FILTER_PRODUCTBYCATEGORYITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
