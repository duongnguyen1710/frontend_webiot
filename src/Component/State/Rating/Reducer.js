import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_RATING_FAILURE, GET_RATING_REQUEST, GET_RATING_SUCCESS } from "./ActionType";

const initialState = {
    ratings: [],
    loading: false,
    error: null,
  };
  
  export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RATING_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_RATING_SUCCESS:
        return { ...state, loading: false, ratings: action.payload };
      case GET_RATING_FAILURE:
        return { ...state, loading: false, error: action.payload };
        case CREATE_RATING_REQUEST:
            return { ...state, loading: true, error: null };
          case CREATE_RATING_SUCCESS:
            return { ...state, loading: false }; // Thành công, bạn có thể cập nhật lại trạng thái nếu cần
          case CREATE_RATING_FAILURE:
            return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };