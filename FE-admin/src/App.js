import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./privateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import CategoriesEditScreen from "./screens/CategoriesEditScreen";
import UsersEditScreen from "./screens/UsersEditScreen";
import AddUser from "./screens/AddUser";
import ContactScreen from "./screens/ContactScreen";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/home" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/categorys" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/adduser" component={AddUser} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/contact" component={ContactScreen} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <PrivateRouter
            path="/category/:id/edit"
            component={CategoriesEditScreen}
          />
          <PrivateRouter
            path="/user/:id/edit"
            component={UsersEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
