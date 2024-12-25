

import {GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        
            return { ...state, isLoading: true, error: null, success: null, };


        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("jwt", action.payload);
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Register Success",
            };

            case GET_USER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    user: action.payload,
                    favorites: action.payload.favories,
                };
                
        case LOGOUT:
            return initialState;
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        
            return {
                 ...state, 
                 isLoading: false, 
                 error: action.payload, 
                 success: null,
                 };

        default:
            return state;
    }
}