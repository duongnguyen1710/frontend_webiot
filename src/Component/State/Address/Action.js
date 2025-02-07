import { api } from "../../Config/Api";
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, DELETE_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ALL_ADDRESS_USER_FAILURE, GET_ALL_ADDRESS_USER_REQUEST, GET_ALL_ADDRESS_USER_SUCCESS, UPDATE_ADDRESS_FAILURE, UPDATE_ADDRESS_REQUEST, UPDATE_ADDRESS_SUCCESS } from "./ActionType";

export const fetchAddresses = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ADDRESS_REQUEST });
        try {
            const response = await api.get('/api/addresses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched addresses", response.data);
            dispatch({ type: GET_ADDRESS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("Error fetching addresses", error);
            dispatch({ type: GET_ADDRESS_FAILURE, payload: error.message });
        }
    };
};

export const createAddress1 = (addressData, token) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ADDRESS_REQUEST });
        try {
            const response = await api.post(`/api/addresses/add`, addressData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log("Address created successfully", response.data);
            dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response.data });
        } catch (error) {
            console.error("Error creating address", error);
            dispatch({ 
                type: CREATE_ADDRESS_FAILURE, 
                payload: error.response?.data?.message || error.message
            });
        }
    };
};

// export const createAddress = (addressData, jwt) => async (dispatch) => {
//     dispatch({ type: CREATE_ADDRESS_REQUEST });
//     try {
//         const response = await api.post('/api/address/add', addressData, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             },
//         });
//         dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response.data });
//     } catch (error) {
//         dispatch({
//             type: CREATE_ADDRESS_FAILURE,
//             payload: error.response?.data || 'Something went wrong',
//         });
//     }
// };

export const getUserAddresses = (jwt, page = 0) => async (dispatch) => {
    try {
      dispatch({ type: GET_ADDRESS_REQUEST });
  
      // Cấu hình header với JWT token
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
  
      // Gọi API
      const { data } = await api.get(`/api/address?page=${page}`, config);
  
      // Dispatch thành công
      dispatch({
        type: GET_ADDRESS_SUCCESS,
        payload: data, // API trả về Page<Address>
      });
    } catch (error) {
      // Dispatch thất bại
      dispatch({
        type: GET_ADDRESS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createAddress = (addressData, jwt) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ADDRESS_REQUEST });
  
      // Cấu hình header với JWT token
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      };
  
      // Gọi API để thêm mới địa chỉ
      const { data } = await api.post('/api/address', addressData, config);
  
      // Dispatch thành công
      dispatch({
        type: CREATE_ADDRESS_SUCCESS,
        payload: data, // API trả về đối tượng Address mới
      });
    } catch (error) {
      // Dispatch thất bại
      dispatch({
        type: CREATE_ADDRESS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getAllUserAddresses = (jwt) => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ADDRESS_USER_REQUEST });
  
      // Cấu hình header với JWT token
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
  
      // Gọi API lấy danh sách tất cả địa chỉ
      const { data } = await api.get('/api/address/all', config);
  
      // Dispatch thành công
      dispatch({
        type: GET_ALL_ADDRESS_USER_SUCCESS,
        payload: data, // API trả về danh sách địa chỉ
      });
    } catch (error) {
      // Dispatch thất bại
      dispatch({
        type: GET_ALL_ADDRESS_USER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const deleteAddress = (id, jwt) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
  
      // Gọi API xóa địa chỉ
      await api.delete(`/api/address/${id}`, config);
  
      dispatch({
        type: DELETE_ADDRESS_SUCCESS,
        payload: id, // Truyền ID của địa chỉ đã xóa để xử lý
      });
    } catch (error) {
      dispatch({
        type: DELETE_ADDRESS_FAILURE,
        payload: error.response?.data?.message || 'Error deleting address',
      });
    }
  };

  export const updateAddress = (id, addressData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      };
  
      // Gọi API cập nhật địa chỉ
      const response = await api.put(`/api/address/${id}`, addressData, config);
  
      dispatch({
        type: UPDATE_ADDRESS_SUCCESS,
        payload: response.data, // Địa chỉ đã được cập nhật trả về từ API
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ADDRESS_FAILURE,
        payload: error.response?.data?.message || 'Error updating address',
      });
    }
  };