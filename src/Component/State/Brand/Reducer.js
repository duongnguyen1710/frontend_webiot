import { GET_BRAND_REQUEST, GET_BRAND_SUCCESS, GET_BRAND_FAILURE } from './ActionType';

const initialState = {
  loading: false,
  error: null,
  brand: [],
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Đảm bảo error là null khi bắt đầu tải
      };
    case GET_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brand: action.payload, // Gán danh sách thương hiệu
      };
    case GET_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Lỗi trả về từ backend hoặc lỗi hệ thống
      };
    default:
      return state;
  }
};

export default brandReducer;

