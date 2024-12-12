import { api } from "../../Config/Api";
import { GET_BRAND_FAILURE, GET_BRAND_REQUEST, GET_BRAND_SUCCESS } from "./ActionType";

export const getListBrand = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_BRAND_REQUEST }); 
    try {
      const res = await api.get(`/api/admin/brand/listAll`, {
        headers: {
          Authorization: `Bearer ${jwt}`, 
        },
      });

      // Kiểm tra response từ API
      if (res.data && res.data.code === 0 && Array.isArray(res.data.result)) {
        dispatch({
          type: GET_BRAND_SUCCESS,
          payload: res.data.result, // Gửi mảng kết quả
        });
      } else {
        dispatch({
          type: GET_BRAND_FAILURE,
          payload: res.data?.message || "Lỗi khi lấy danh sách thương hiệu", // Hiển thị thông báo lỗi từ backend
        });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách brand:", error);
      dispatch({
        type: GET_BRAND_FAILURE,
        payload: error.message || "Có lỗi xảy ra",
      });
    }
  };
};

