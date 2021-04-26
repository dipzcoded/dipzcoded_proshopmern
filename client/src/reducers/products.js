import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  CLEAR_DETAILS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
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
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
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

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        product: payload,
        error: null,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        product: payload,
        error: null,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_UPDATE_RESET:
      return { product: null };

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
