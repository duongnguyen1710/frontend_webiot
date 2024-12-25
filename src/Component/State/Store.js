
//import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import brandReducer from "./Brand/Reducer";
import { categoryReducer } from "./Category/Reducer";
import { productReducer } from "./Product/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Orders/Reducer";
//import restaurantReducer from "./Restaurant/Reducer";
//import menuItemReducer from "./Menu/Reducer";
//import cartReducer from "./Cart/Reducer";
//import { orderReducer } from "./Order/Reducer";
//import { ingredientReducer } from "./Ingredients/Reducer";
//import restaurantsOrderReducer from "./Restaurant Order/Reducer";

const rooteReducer = combineReducers({
   auth:authReducer,
   brand:brandReducer,
   category:categoryReducer,
   product: productReducer,
   cart: cartReducer,
   orders: orderReducer
});

export const store =legacy_createStore(rooteReducer,applyMiddleware(thunk))
