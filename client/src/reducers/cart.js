import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../types";
const initialState = {
  cartItems: [],
  shippingAddress: null,
  paymentMethod: null,
};
export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload.item;
      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === existItem.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((el) => el.product !== payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    default:
      return state;
  }
};
