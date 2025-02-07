
//import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import brandReducer from "./Brand/Reducer";
import { categoryReducer } from "./Category/Reducer";
import { productReducer } from "./Product/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Orders/Reducer";
import { blogReducer } from "./Blog/Reducer";
import { vnPayReducer } from "./Payment/VnPay/Reducer";
import addressReducer from "./Address/Reducer";
import { ratingReducer } from "./Rating/Reducer";
import authenticationReducer from "./Authentication/Reducer";
import { zaloPayReducer } from "./Payment/ZaloPay/Reducer";
//import restaurantReducer from "./Restaurant/Reducer";
//import menuItemReducer from "./Menu/Reducer";
//import cartReducer from "./Cart/Reducer";
//import { orderReducer } from "./Order/Reducer";
//import { ingredientReducer } from "./Ingredients/Reducer";
//import restaurantsOrderReducer from "./Restaurant Order/Reducer";

const rooteReducer = combineReducers({
   auth:authReducer,
   authentication:authenticationReducer,
   brand:brandReducer,
   category:categoryReducer,
   product: productReducer,
   cart: cartReducer,
   orders: orderReducer,
   blog: blogReducer,
   vnpay: vnPayReducer,
   address:addressReducer,
   rating: ratingReducer,
   zaloPay: zaloPayReducer
});

export const store =legacy_createStore(rooteReducer,applyMiddleware(thunk))
