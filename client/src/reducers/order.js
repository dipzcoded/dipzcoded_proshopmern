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
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_RESET,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
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

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        error: payload,
      };
    case ORDER_DELIVER_RESET:
      return {};

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

export const orderListMyReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
        error: null,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export const orderListAllReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_LIST_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
        error: null,
      };

    case ORDER_LIST_ALL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_LIST_ALL_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};
