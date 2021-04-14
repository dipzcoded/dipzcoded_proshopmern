import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../types";
const initialState = { cartItems: [] };
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

    default:
      return state;
  }
};
