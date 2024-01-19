import axios from "axios";
import {
  CATEGORY_PRODUCT_LIST_FAIL,
  CATEGORY_PRODUCT_LIST_REQUEST,
  CATEGORY_PRODUCT_LIST_SUCCESS,
} from "../Constants/CatePrdContants";
import { URL } from "../Url";
import { logout } from "./userActions";

// all category product
export const listCategoryProducts = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${URL}/api/cateProducts/allClient`);
    dispatch({ type: CATEGORY_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token fails") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};
