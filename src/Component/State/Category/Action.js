import axios from "axios";
import { api } from "../../Config/Api";
import { GET_CATEGORY_ITEMS_FAILURE, GET_CATEGORY_ITEMS_REQUEST, GET_CATEGORY_ITEMS_SUCCESS, GET_CATEGORY_SUCCESS } from "./ActionType";

export const getCategory = ({id}) => {
    return async (dispatch) => {
        try {
            const response = await api.get(
                `/category/restaurant/1/category`
            );
            console.log("get category", response.data);
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload:response.data,
            });
        } catch (error) {
            console.log("error hehe", error);
        }
    };
};

export const getCategoryItems = ({ restaurantId, categoryId }) => {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY_ITEMS_REQUEST }); // Bắt đầu gọi API
        try {
            const response = await api.get(`/category/${categoryId}/${restaurantId}`);
            
            console.log("Products by restaurant and category:", response.data);
            
            // Thành công
            dispatch({
                type: GET_CATEGORY_ITEMS_SUCCESS,
                payload: response.data, // Dữ liệu sản phẩm trả về từ API
            });
        } catch (error) {
            console.error("Error fetching products by restaurant and category:", error);
            
            // Thất bại
            dispatch({
                type: GET_CATEGORY_ITEMS_FAILURE,
                payload: error.message || "Something went wrong",
            });
        }
    };
};