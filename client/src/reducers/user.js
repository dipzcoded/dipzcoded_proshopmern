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
  USER_LOGGEDIN_DETAILS_FAIL,
  USER_LOGGEDIN_DETAILS_REQUEST,
  USER_LOGGEDIN_DETAILS_RESET,
  USER_LOGGEDIN_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
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

    case USER_DETAILS_RESET:
      return { user: null };

    default:
      return state;
  }
};

export const userLogginDetailsReducer = (
  state = { user: null, isLoading: false, error: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGGEDIN_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOGGEDIN_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
        error: null,
      };
    case USER_LOGGEDIN_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_LOGGEDIN_DETAILS_RESET:
      return { user: null };

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

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };

    case USER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
        error: null,
      };
    case USER_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_LIST_RESET:
      return {
        ...state,
        user: [],
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case USER_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_UPDATE_RESET:
      return {
        user: null,
      };

    default:
      return state;
  }
};
