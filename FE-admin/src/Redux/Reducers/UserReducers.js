import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
    USER_CREATE_RESET,
    USER_CREATE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../Constants/UserContants";

// LOGIN
export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
// ALL USER
export const userListReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// CREATE USER IN ADMIN
export const userCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true, userCreateAd: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT USER IN ADMIN
export const userEditReducers = (
  state = { users: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true };
    case USER_EDIT_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE USER IN ADMIN
export const userUpdateReducers = (state = { userUpdate: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userUpdate:action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { userUpdate: {} };
    default:
      return state;
  }
};
// DELETE USER IN ADMIN
export const userDeleteReducers = (state = { }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
