import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import "../node_modules/slick-carousel/slick/slick.css"; 
import "../node_modules/slick-carousel/slick/slick-theme.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     
    document.getElementById("root")

);