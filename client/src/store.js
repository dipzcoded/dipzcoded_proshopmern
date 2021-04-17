import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/products";
import { cartReducer } from "./reducers/cart";
import {
  userReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/user";
import Cookie from "js-cookie";

const reducer = combineReducers({
  productList: productReducer,
  cartList: cartReducer,
  userData: userReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];

const userDataFromStorage = Cookie.get("userData")
  ? JSON.parse(Cookie.get("userData"))
  : null;
const initialState = {
  cartList: { cartItems: cartItemsFromStorage },
  userData: {
    userInfo: userDataFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
