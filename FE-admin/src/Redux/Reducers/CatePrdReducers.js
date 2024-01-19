import {
  CATEGORY_PRODUCT_CREATE_FAIL,
  CATEGORY_PRODUCT_CREATE_REQUEST,
  CATEGORY_PRODUCT_CREATE_RESET,
  CATEGORY_PRODUCT_CREATE_SUCCESS,
  CATEGORY_PRODUCT_DELETE_FAIL,
  CATEGORY_PRODUCT_DELETE_REQUEST,
  CATEGORY_PRODUCT_DELETE_SUCCESS,
  CATEGORY_PRODUCT_EDIT_FAIL,
  CATEGORY_PRODUCT_EDIT_REQUEST,
  CATEGORY_PRODUCT_EDIT_SUCCESS,
  CATEGORY_PRODUCT_LIST_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
  CATEGORY_PRODUCT_UPDATE_FAIL,
  CATEGORY_PRODUCT_UPDATE_REQUEST,
  CATEGORY_PRODUCT_UPDATE_RESET,
  CATEGORY_PRODUCT_UPDATE_SUCCESS,
} from "../Constants/CatePrdContants";

// ALL CATEGORY PRODUCT
export const catePrdListReducers = (state = { cateProducts: [] }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_PRODUCT_LIST_SUCCESS:
      return { loading: false, cateProducts: action.payload };
    case CATEGORY_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE CATEGORY PRODUCT
export const catePrdCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, cateProduct: action.payload };
    case CATEGORY_PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT CATEGORY PRODUCT 
export const catePrdEditReducers = (
  state = { cateProduct: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_PRODUCT_EDIT_SUCCESS:
      return { loading: false, cateProduct: action.payload };
    case CATEGORY_PRODUCT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// DELETE CATEGORY PRODUCT
export const catePrdDeleteReducers = (state = { }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE CATEGORY PRODUCT
export const cateprdUpdateReducers = (state = { cateProduct: {} }, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, cateProduct:action.payload };
    case CATEGORY_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_PRODUCT_UPDATE_RESET:
      return { cateProduct: {} };
    default:
      return state;
  }
};
