import {
  CONTACT_DELETE_FAIL,
  CONTACT_DELETE_REQUEST,
  CONTACT_DELETE_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_RESET,
  CONTACT_LIST_SUCCESS,
} from "../Constants/ContactContant";

// ALL Contact
export const contactListReducers = (state = { contants: [] }, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { loading: true };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contants: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
// DELETE contact
export const contactDeleteReducers = (state = { }, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
