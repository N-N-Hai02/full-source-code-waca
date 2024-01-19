import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeformcart } from "../Redux/Actions/cartActions";
import Footer from "../components/Footer";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  }

  const removeFromCartHandle = (id) => {
    dispatch(removeformcart(id))
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container" style={{marginTop:"9rem"}}>
        {/* đường ngăn Cách */}
        <div class="d-flex align-items-baseline my-4">
            <h2
              class="mx-0 mb-0 text-center"
              style={{
                fontWeight: "600",
                fontFamily: "'Brush Script MT', cursive",
                borderBottom:"8px solid #0d6efd"
              }}
            >
              Giở Hàng Của Bạn
            </h2>
            <div class="flex-fill jazzy_jon_lines_warm"></div>
          </div>
          {/*  */}
        {cartItems.length === 0 ? (
          <div className="alert alert-warning text-center">
            Giở Hàng Của Bạn Trống Trơn
            <Link
              className="btn btn-outline-primary mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              <h5><b>Quay Lại Cửa Hàng 👈</b></h5>
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center">
              Tổng Sản Phẩm Trong Giỏ Hàng
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center">
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>SỐ LƯỢNG</h6>
                  <select 
                    value={item.qty} 
                    onChange={(e) => 
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>GIÁ BÁN</h6>
                  <h4>${item.price}</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">tổng tiền:</span>
              <span className="total-price">${total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp Tục Mua Hàng</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Tiếp Tục Thanh Toán</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;
