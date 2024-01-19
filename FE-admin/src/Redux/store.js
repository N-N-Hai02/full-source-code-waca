import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userCreateReducers, userDeleteReducers, userEditReducers, userListReducers, userLoginReducers, userUpdateReducers } from "./Reducers/UserReducers";
import {
  productCreateReducers,
  productDeleteReducers,
  ProductEditReducers,
  productListReducers,
  productUpdateReducers,
} from "./Reducers/ProductReducers";
import {
  orderDeleteReducers,
  orderDeliveredReducers,
  orderDetailsReducers,
  orderListReducers,
} from "./Reducers/OrderReducers";
import {
  catePrdCreateReducers,
  catePrdDeleteReducers,
  catePrdEditReducers,
  catePrdListReducers,
  cateprdUpdateReducers,
} from "./Reducers/CatePrdReducers";
import { contactDeleteReducers, contactListReducers } from "./Reducers/ContactReducers";

const reducer = combineReducers({
  contactList:contactListReducers,
  contactDelete:contactDeleteReducers,

  userLogin: userLoginReducers,
  userCreate: userCreateReducers,
  userList: userListReducers,
  userEdit: userEditReducers,
  userUpdate: userUpdateReducers,
  userDelete: userDeleteReducers,

  productList: productListReducers,
  producDelete: productDeleteReducers,
  producCreate: productCreateReducers,
  productEdit: ProductEditReducers,
  productUpdate: productUpdateReducers,

  cateProductCreate: catePrdCreateReducers,
  cateProductList: catePrdListReducers,
  cateProductEdit: catePrdEditReducers,
  cateProductUpdate: cateprdUpdateReducers,
  cateProductDelete: catePrdDeleteReducers,

  orderList: orderListReducers,
  orderDelete: orderDeleteReducers,
  orderDetails: orderDetailsReducers,
  orderDeLiver: orderDeliveredReducers,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
