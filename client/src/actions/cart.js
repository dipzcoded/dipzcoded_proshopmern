import axios from "axios";
import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../types";
import Cookie from "js-cookie";

export const addToCart = (id, qty, history) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        item: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          slug: data.slug,
          qty,
        },
      },
    });
    Cookie.set("cartItems", JSON.stringify(getState().cartList.cartItems));
    history.push("/cart");
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_DELETE_ITEM, payload: id });
  Cookie.set("cartItems", JSON.stringify(getState().cartList.cartItems));
};
