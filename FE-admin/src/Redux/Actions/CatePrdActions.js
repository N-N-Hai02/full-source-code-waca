import {
  CATEGORY_PRODUCT_CREATE_FAIL,
  CATEGORY_PRODUCT_CREATE_REQUEST,
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
  CATEGORY_PRODUCT_UPDATE_SUCCESS,
} from "../Constants/CatePrdContants";
import axios from "axios";
import { logout } from "./userActions";
import { URL } from "../Url";

// all category product
export const listCategoryProducts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${URL}/api/cateProducts/all`, config);
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

// Create Category prodcuts
export const createCategoryProducts =
  (name, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${URL}/api/cateProducts`,
        { name, description },
        config
      );
      dispatch({ type: CATEGORY_PRODUCT_CREATE_SUCCESS, payload: data });
      setTimeout(function(){
        window.location.reload(1);
      }, 3000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token fails") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
// Edit Category Product
export const editCategoryProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`${URL}/api/cateProducts/${id}`);
    dispatch({ type: CATEGORY_PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token fails") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// delete category prodcuts
export const deleteCategoryProducts = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${URL}/api/cateProducts/${id}`, config);
    dispatch({ type: CATEGORY_PRODUCT_DELETE_SUCCESS });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token fails") {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// update category prodcuts
export const updateCategoryProducts =
  (cateProduct) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/api/cateProducts/${cateProduct._id}`,
        cateProduct,
        config
      );
      dispatch({ type: CATEGORY_PRODUCT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: CATEGORY_PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token fails") {
        dispatch(logout());
      }
      dispatch({
        type: CATEGORY_PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };