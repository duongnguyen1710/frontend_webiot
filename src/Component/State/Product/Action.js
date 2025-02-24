import { api } from "../../Config/Api";
import {
  FILTER_PRODUCTBYCATEGORYITEM_FAILURE,
  FILTER_PRODUCTBYCATEGORYITEM_REQUEST,
  FILTER_PRODUCTBYCATEGORYITEM_SUCCESS,
  GET_ALLPRODUCT_FAILURE,
  GET_ALLPRODUCT_REQUEST,
  GET_ALLPRODUCT_SUCCESS,
  GET_NEWPRODUCT_FAILURE,
  GET_NEWPRODUCT_REQUEST,
  GET_NEWPRODUCT_SUCCESS,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST,
  GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS,
  GET_PRODUCTBYCATEGORY_SUCCESS,
  GET_PRODUCTBYID_FAILURE,
  GET_PRODUCTBYID_REQUEST,
  GET_PRODUCTBYID_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from "./ActionType";

export const getProductByCategory = ({ categoryId }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/product`, {
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

  export const getProductByRestaurantAndCategory = ({ restaurantId, categoryId }) => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST }); // Bắt đầu gọi API
        try {
            const response = await api.get(`/product/${categoryId}/${restaurantId}`);
            
            console.log("Products by restaurant and category:", response.data);
            
            // Thành công
            dispatch({
                type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS,
                payload: response.data, // Dữ liệu sản phẩm trả về từ API
            });
        } catch (error) {
            console.error("Error fetching products by restaurant and category:", error);
            
            // Thất bại
            dispatch({
                type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE,
                payload: error.message || "Something went wrong",
            });
        }
    };
};

export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_REQUEST });

    // Gọi API tìm kiếm sản phẩm
    const response = await api.get(`/product/search?query=${query}`);
    
    dispatch({
      type: SEARCH_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAILURE,
      payload: error.response?.data?.message || "Something went wrong!",
    });
  }
};

export const getProductByRestaurantAndCategory1 = ({ restaurantId, categoryId, page = 0, size = 8 }) => {
  return async (dispatch) => {
      dispatch({ type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_REQUEST }); // Bắt đầu gọi API
      try {
          const response = await api.get(`/product/page/${categoryId}/${restaurantId}?page=${page}&size=${size}`);
          
          console.log("Products by restaurant and category with pagination:", response.data);
          
          // Thành công
          dispatch({
              type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_SUCCESS,
              payload: response.data, // Dữ liệu trả về từ API
          });
      } catch (error) {
          console.error("Error fetching products by restaurant and category with pagination:", error);
          
          // Thất bại
          dispatch({
              type: GET_PRODUCT_BY_RESTAURANT_AND_CATEGORY_FAILURE,
              payload: error.message || "Something went wrong",
          });
      }
  };
};


// export const filterProductsByCategoryItem = (categoryItemId) => async (dispatch) => {
//   try {
//     console.log(`👉 [Action] Filter với categoryItemId: ${categoryItemId}`);
      
//     dispatch({ type: FILTER_PRODUCTBYCATEGORYITEM_REQUEST });

//     // Gọi API chính xác
//     const { data } = await api.get(`/product/filterByCategoryItem?categoryItemId=${categoryItemId}`);
    
//     console.log('✅ [Action] API Response:', data);

//     dispatch({
//       type: FILTER_PRODUCTBYCATEGORYITEM_SUCCESS,
//       payload: data,
//     });

//   } catch (error) {
//     console.error('❌ [Action] FILTER_PRODUCTBYCATEGORYITEM_FAILURE:', error.response?.data?.message || error.message);

//     dispatch({
//       type: FILTER_PRODUCTBYCATEGORYITEM_FAILURE,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };

export const filterProductsByCategoryItem = ({ categoryItemId, minPrice, maxPrice }) => async (dispatch) => {
  try {
    console.log(`👉 [Action] Filter với categoryItemId: ${categoryItemId}, minPrice: ${minPrice}, maxPrice: ${maxPrice}`);
    dispatch({ type: 'FILTER_PRODUCTBYCATEGORYITEM_REQUEST' });

    let url = `/product/filter?categoryItemId=${categoryItemId}`;
    if (minPrice !== null && maxPrice !== null) {
      url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    }

    const { data } = await api.get(url);

    console.log('✅ [Action] API Response:', data);

    dispatch({
      type: 'FILTER_PRODUCTBYCATEGORYITEM_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error('❌ [Action] FILTER_PRODUCTBYCATEGORYITEM_FAILURE:', error.message);
    dispatch({
      type: 'FILTER_PRODUCTBYCATEGORYITEM_FAILURE',
      payload: error.message,
    });
  }
};

export const getAllProducts = (page = 0, size = 10) => async (dispatch) => {
  try {
      dispatch({ type: GET_ALLPRODUCT_REQUEST });

      const { data } = await api.get(`/product/all?page=${page}&size=${size}`);

      dispatch({
          type: GET_ALLPRODUCT_SUCCESS,
          payload: data
      });
  } catch (error) {
      dispatch({
          type: GET_ALLPRODUCT_FAILURE,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message
      });
  }
};