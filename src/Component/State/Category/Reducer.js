import { GET_CATEGORY_SUCCESS } from "./ActionType";


const initialState = {
    categoryItem: [],
    update: null,
    category: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
            };
        

        default:
            return state;
    }
};