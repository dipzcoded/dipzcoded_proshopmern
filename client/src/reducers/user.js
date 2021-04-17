import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../types";
const initialState = {
  isLoading: false,
  error: null,
  userInfo: null,
};
export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
        userInfo: null,
        error: null,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { user: null, isLoading: false, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
        error: null,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        userInfo: payload,
        error: null,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    default:
      return state;
  }
};
