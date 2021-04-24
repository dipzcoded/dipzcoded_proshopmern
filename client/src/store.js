import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/products";
import { cartReducer } from "./reducers/cart";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./reducers/order";
import {
  userReducer,
  userDetailsReducer,
  userLogginDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/user";
import Cookie from "js-cookie";

const reducer = combineReducers({
  productList: productReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cartList: cartReducer,
  userData: userReducer,
  userDetails: userDetailsReducer,
  userLoggedinDetails: userLogginDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderListMyReducer,
});

const cartItemsFromStorage = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];

const userDataFromStorage = Cookie.get("userData")
  ? JSON.parse(Cookie.get("userData"))
  : null;

const shippingAddressFromStorage = Cookie.get("shippingAddress")
  ? JSON.parse(Cookie.get("shippingAddress"))
  : null;

const paymentMethodFromStorage = Cookie.get("paymentMethod")
  ? JSON.parse(Cookie.get("paymentMethod"))
  : null;
const initialState = {
  cartList: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
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
