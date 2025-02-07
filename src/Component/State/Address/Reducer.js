import { 
    GET_ADDRESS_FAILURE, 
    GET_ADDRESS_REQUEST, 
    GET_ADDRESS_SUCCESS,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    GET_ALL_ADDRESS_USER_REQUEST,
    GET_ALL_ADDRESS_USER_SUCCESS,
    GET_ALL_ADDRESS_USER_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE
} from "./ActionType";

const initialState = {
    addresses: [], // Danh sách địa chỉ
    loading: false, // Trạng thái đang tải
    error: null, // Thông báo lỗi nếu có
    page: 0, // Trang hiện tại
    totalPages: 0, // Tổng số trang
    totalElements: 0, // Tổng số địa chỉ
  };
  
  const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ADDRESS_REQUEST:
        return {
          ...state,
          loading: true, // Đang tải dữ liệu
          error: null, // Xóa lỗi trước đó (nếu có)
        };
  
      case GET_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false, // Dừng trạng thái tải
          addresses: action.payload.content, // Lấy danh sách địa chỉ từ API
          page: action.payload.number, // Trang hiện tại
          totalPages: action.payload.totalPages, // Tổng số trang
          totalElements: action.payload.totalElements, // Tổng số địa chỉ
        };
  
      case GET_ADDRESS_FAILURE:
        return {
          ...state,
          loading: false, // Dừng trạng thái tải
          error: action.payload, // Lưu thông báo lỗi
        };

        case CREATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Xóa lỗi trước đó (nếu có)
      };

    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, action.payload], // Thêm địa chỉ mới vào danh sách
      };

    case CREATE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Lưu lỗi vào state
      };

      case GET_ALL_ADDRESS_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_ALL_ADDRESS_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: action.payload, // Cập nhật danh sách địa chỉ
        };
  
      case GET_ALL_ADDRESS_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter(address => address.id !== action.payload), // Loại bỏ địa chỉ đã xóa
      };

    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case UPDATE_ADDRESS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null, // Xóa lỗi trước đó (nếu có)
        };

    case UPDATE_ADDRESS_SUCCESS:
        return {
            ...state,
            loading: false,
            addresses: state.addresses.map(address =>
                address.id === action.payload.id ? action.payload : address
            ), // Cập nhật địa chỉ
        };

    case UPDATE_ADDRESS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload, // Lưu lỗi vào state
        };

  
      default:
        return state; // Giữ nguyên state nếu không khớp action
    }
  };
  
  export default addressReducer;
