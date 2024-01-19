import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentOnDelivery, setPaymentOnDelivery] = useState("OnDelivery");
  const [paymentmethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentmethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
          style={{marginTop:"9rem"}}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="checkbox"
                value={paymentmethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">PayPal Hoặc Thẻ Tín Dụng</label>
            </div>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="checkbox"
                value={paymentOnDelivery}
                onChange={(e) => setPaymentOnDelivery(e.target.value)}
              />
              <label className="form-check-label">Thanh Toán Khi Nhận Hàng</label>
            </div>
          </div>

          <button type="submit">Tiếp Tục</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
