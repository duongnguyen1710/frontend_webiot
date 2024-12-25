import { api } from "../../Config/Api";
import { GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from "./ActionType";

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