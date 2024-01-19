import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listCategoryProducts } from "../Redux/Actions/CatePrdActions";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const [keyword, setkeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const catePrdList = useSelector((state) => state.catePrdList);
  const { cateProducts } = catePrdList;

  useEffect(() => {
    dispatch(listCategoryProducts());
  },[dispatch]);
  
  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/AllProduct/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {/* Top Header */}
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-md-flex align-items-center">
            <i className="bi bi-phone d-flex align-items-center d-lg-block d-none">
              <span>+1 5589 55488 55</span>
            </i>
            <i className="bi bi-clock d-flex align-items-center ms-4 d-lg-block d-none">
              <span> Time: 11AM - 23PM</span>
            </i>
          </div>
          <div className="languages d-flex align-items-center">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-phone d-flex align-items-center">
                <a target="_blank" href="https://waca-doashboard-hai.netlify.app/">
                  <b style={{ color: "#80808069" }}>Admin</b>
                </a>
              </i>
              <div style={{ borderRight: "2px solid orange", padding: "10px" }}>
                |
              </div>
              <i className="bi bi-clock d-flex align-items-center ms-4">
                {userInfo ? (
                  <span style={{ color: "orange" }}>
                    Xin chào, {userInfo.name}
                  </span>
                ) : (
                  <span>Xin chào, No No no..</span>
                )}
              </i>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header id="header" className="fixed-top">
        <nav
          className="navbar navbar-expand-lg bg-dark navbar-light sticky-top py-lg-0 px-lg-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <Link to="/">
            <h1 
            class="text-warning logo me-auto me-lg-0 fs-4" 
            style={{ fontFamily:"'Brush Script MT', cursive",marginLeft: "0.5rem", fontSize: "25px" }}>
              Watches Camers Store
            </h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler me-4 btn btn-outline-warning"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0 text-warning">
              <Link to="/" className="nav-item nav-link nav_marginRight">
                Trang Chủ
              </Link>
              <Link to="/InfoShop" className="nav-item nav-link nav_marginRight">
                Thông Tin
              </Link>
              <div className="nav-item dropdown">
                <a href="#" className="nav-link nav_marginRight" data-bs-toggle="dropdown">
                  Sản Phẩm 🔻
                </a>
                <div className="dropdown-menu m-0">
                  <Link to="/AllProduct" className="nav-item nav-link">
                    all
                  </Link>
                  {cateProducts?.map((catePrd) => (
                    <Link to={catePrd.name} className="nav-item nav-link">
                      {catePrd.name}
                    </Link>
                  ))}
                  
                  {/* <Link to="/camera" className="nav-item nav-link">
                    Cameras
                  </Link> */}
                </div>
              </div>
              <div className="nav-item dropdown">
                <Link to="/" className="nav-link nav_marginRight" data-bs-toggle="dropdown">
                  Hỗ Trợ 🔻
                </Link>
                <div className="dropdown-menu m-0">
                  {userInfo ? (
                    <>
                      <Link className="nav-item nav-link" to="/profile">
                        xem Tài khoản
                      </Link>
                      <Link
                      style={{color:"red"}}
                        className="nav-item nav-link"
                        to="#"
                        onClick={logoutHandler}
                      >
                        đăng xuất
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="nav-item nav-link">
                        Dăng Nhập
                      </Link>
                      <Link to="/register" className="nav-item nav-link">
                        Đăng Ký
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <Link to="/ContactScreen" className="nav-item nav-link nav_marginRight">
                Liên Hệ
              </Link>
            </div>
            <form onSubmit={submitHandler} className="d-flex">
              <button className="btn btn-outline-warning mx-2" type="submit">
                Search
              </button>
              <input
                className="form-control me-2"
                type="text"
                placeholder="Tìm Kiếm"
                aria-label="Search"
                onChange={(e) => setkeyword(e.target.value)}
              />
            </form>
            <div className="d-flex mx-2 my-2 align-items-center">
              <Link to="/cart">
                <div className="badge bg-warning">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="number">{cartItems.length}</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
