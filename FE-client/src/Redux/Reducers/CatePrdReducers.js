import {
  CATEGORY_PRODUCT_LIST_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
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
