import axios from "axios";
import {
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
} from "../Constants/ContactContant";
import { URL } from "../Url";
import { logout } from "./userActions";

// ALL contacts
export const listContact = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/contacts`, config);
    dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token fails") {
      dispatch(logout());
    }
    dispatch({
      type: CONTACT_LIST_FAIL,
      payload: message,
    });
  }
};

// delete contact
export const deleteContacts = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONTACT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`${URL}/api/contacts/${id}`, config);
    dispatch({ type: CONTACT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token fails") {
      dispatch(logout());
    }
    dispatch({
      type: CONTACT_DELETE_FAIL,
      payload: message,
    });
  }
};
