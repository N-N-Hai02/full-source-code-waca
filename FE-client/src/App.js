import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./privateRouter";
import Watches from "./screens/Watch";
import Cameras from "./screens/Camera";
import ALLProduct from "./screens/AllProduct";
import InfoShop from "./screens/InfoShop";
import ContactScreen from "./screens/ContactScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/AllProduct/search/:keyword" component={ALLProduct} exact />
        <Route path="/AllProduct/page/:pagenumber" component={ALLProduct} exact />
        <Route
          path="/AllProduct/search/:keyword/page/:pageNumber"
          component={ALLProduct}
          exact
        />
        <Route path="/InfoShop" component={InfoShop} />
        <Route path="/ContactScreen" component={ContactScreen} />
        <Route path="/Watches" component={Watches} />
        <Route path="/Cameras" component={Cameras} />
        <Route path="/AllProduct" component={ALLProduct} />
        <Route path="/products/:id" component={SingleProduct} />
        
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
