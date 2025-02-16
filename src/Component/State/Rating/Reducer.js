import { 
  CREATE_RATING_FAILURE, 
  CREATE_RATING_REQUEST, 
  CREATE_RATING_SUCCESS, 
  GET_RATING_FAILURE, 
  GET_RATING_REQUEST, 
  GET_RATING_SUCCESS 
} from "./ActionType";

const initialState = {
    ratings: [],  // Danh sách đánh giá
    loading: false,
    error: null,
    ratingStatus: null, // ✅ Thêm trạng thái đánh giá
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
            return { ...state, loading: true, error: null, ratingStatus: null };
        case CREATE_RATING_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                ratings: [...state.ratings, action.payload], // ✅ Cập nhật danh sách đánh giá mới
                ratingStatus: action.payload.status // ✅ Lưu trạng thái đánh giá từ API
            };
        case CREATE_RATING_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
