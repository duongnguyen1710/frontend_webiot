import { api } from "../../Config/Api";
import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_RATING_FAILURE, GET_RATING_REQUEST, GET_RATING_SUCCESS } from "./ActionType";

export const getRatingsByProductId = (productId) => async (dispatch) => {
    dispatch({ type: GET_RATING_REQUEST });
  
    try {
      const response = await api.get(`/ratings/${productId}`);
      dispatch({
        type: GET_RATING_SUCCESS,
        payload: response.data, // Dữ liệu danh sách đánh giá
      });
    } catch (error) {
      dispatch({
        type: GET_RATING_FAILURE,
        payload: error.response ? error.response.data : "Có lỗi xảy ra!",
      });
    }
  };

  export const createRating = (productId, ratingData, jwt) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`, // ✅ Thêm lại 'Bearer' trước JWT
                'Content-Type': 'application/json',
            },
        };

        const response = await api.post(
            `/api/ratings/${productId}`, // Endpoint chính xác
            ratingData, // Gửi stars và comment
            config
        );

        dispatch({
            type: CREATE_RATING_SUCCESS,
            payload: response.data, // API trả về `RatingResponse`
        });

    } catch (error) {
        dispatch({
            type: CREATE_RATING_FAILURE,
            payload: error.response?.data || 'Có lỗi xảy ra khi tạo đánh giá!',
        });
    }
};
