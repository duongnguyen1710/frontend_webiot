import { api } from "../../Config/Api";
import {
  GET_NEWPRODUCT_FAILURE,
  GET_NEWPRODUCT_REQUEST,
  GET_NEWPRODUCT_SUCCESS,
  GET_PRODUCTBYCATEGORY_SUCCESS,
  GET_PRODUCTBYID_FAILURE,
  GET_PRODUCTBYID_REQUEST,
  GET_PRODUCTBYID_SUCCESS,
} from "./ActionType";

export const getProductByCategory = ({ categoryId }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/product/category`, {
        params: { categoryId },
      });

      console.log("get product by category", response.data);

      dispatch({
        type: GET_PRODUCTBYCATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };
};

export const getNewProduct = ({ id }) => {
  return async (dispatch) => {
    dispatch({ type: GET_NEWPRODUCT_REQUEST });
    try {
      const { data } = await api.get(`/product/newProduct/1`);
      dispatch({ type: GET_NEWPRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_NEWPRODUCT_FAILURE, payload: error });
    }
  };
};

export const getProductById = (productId) => {
    return async (dispatch) => {
      dispatch({ type: GET_PRODUCTBYID_REQUEST }); // Bắt đầu gọi API
      try {
        // Gọi API
        const response = await api.get(`/product/${productId}`);
        console.log("Product details:", response.data);
        // Thành công
        dispatch({
          type: GET_PRODUCTBYID_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        // Thất bại
        dispatch({
          type: GET_PRODUCTBYID_FAILURE,
          payload: error.message || "Something went wrong",
        });
      }
    };
  };