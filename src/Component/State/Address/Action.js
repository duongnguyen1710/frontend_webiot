import { api } from "../../Config/Api";
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from "./ActionType";

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

export const createAddress = (addressData, token) => {
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