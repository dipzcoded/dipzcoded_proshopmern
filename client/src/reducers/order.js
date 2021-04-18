import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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
