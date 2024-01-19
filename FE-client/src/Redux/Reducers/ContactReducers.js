import {
  CONTACT_ADD_FAIL,
  CONTACT_ADD_REQUEST,
  CONTACT_ADD_RESET,
  CONTACT_ADD_SUCCESS,
} from "../Constants/ContactContant";

// Add contact
export const contactAddReducers = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_ADD_REQUEST:
      return { loading: true };
    case CONTACT_ADD_SUCCESS:
      return { loading: false, success: true, contactAdds: action.payload };
    case CONTACT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_ADD_RESET:
      return {};
    default:
      return state;
  }
};
