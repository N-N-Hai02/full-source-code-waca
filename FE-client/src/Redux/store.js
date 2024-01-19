import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension"
import {
  ProductCreateReviewReducers,
  ProductDetailsReducers,
  ProductListReducers,
  ProductListSelectReducers,
} from "./Reducers/ProductReducers"
import { cartReducer } from "./Reducers/CartReducers"
import {
  userDetailsReducers,
  userLoginReducers,
  userRegisterReducers,
  userUpdateProfileReducers,
} from "./Reducers/UserReducers"
import {
  orderCreateReducers,
  orderDetailsReducers,
  orderListHomeReducers,
  orderListMyReducers,
  orderPayReducers,
} from "./Reducers/OrderReducers"
import { catePrdListReducers } from "./Reducers/CatePrdReducers"
import { contactAddReducers } from "./Reducers/ContactReducers"

const reducer = combineReducers({
  contactAdd:contactAddReducers,
  
  productList: ProductListReducers,
  productSelect: ProductListSelectReducers,
  productDetails: ProductDetailsReducers,
  productReviewCreate: ProductCreateReviewReducers,

  cart: cartReducer,

  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,

  catePrdList: catePrdListReducers,
  
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  orderListMy: orderListMyReducers,
  orderListHome: orderListHomeReducers,

});

// cart
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
