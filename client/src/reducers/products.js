import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_DETAILS,
} from "../types";
const initialState = {
  products: [],
  isLoading: false,
  error: null,
  product: {
    reviews: [],
  },
};
export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        product: { reviews: [] },
        error: null,
      };
    default:
      return state;
  }
};
