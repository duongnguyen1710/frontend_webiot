import { api } from "../../Config/Api";
import { GET_CATEGORY_SUCCESS } from "./ActionType";

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