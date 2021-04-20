import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
} from "../types";

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        success: true,
        order: payload,
        error: null,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { isLoading: false, orderItems: [], shippingAddress: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: payload,
        error: null,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        error: payload,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};
