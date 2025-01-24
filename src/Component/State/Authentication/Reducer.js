import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SET_JWT } from "./ActionType";

const initialState = {
    loading: false,
    user: null,
    error: null,
    message: "",
    jwt: null, // Thêm trường để lưu JWT
  };
  
  const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload, // Lưu thông tin người dùng
          message: action.payload.message, // Thông báo thành công
          error: null,
        };
  
      case REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Lưu lỗi trả về
          message: "",
        };
  
      case SET_JWT:
        return {
          ...state,
          jwt: action.payload, // Lưu JWT vào state
        };
  
      default:
        return state;
    }
  };
  
  export default authenticationReducer;