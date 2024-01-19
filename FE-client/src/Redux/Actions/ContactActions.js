import {
    CONTACT_ADD_FAIL,
    CONTACT_ADD_REQUEST,
    CONTACT_ADD_SUCCESS,
} from "../Constants/ContactContant";
import axios from "axios";
import { URL } from "../Url";

// Add Contact
export const AddContact = (name, phone, email, content) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_ADD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${URL}/api/contacts`,
      { name, phone, email, content },
      config
    );
    dispatch({ type: CONTACT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONTACT_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
