import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { listSelectProduct } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Slider from "react-slick";
import "./ShopSection.css";
import { listOrdersHome } from "../../Redux/Actions/OrderActions";

const ShopSection = () => {
  const dispatch = useDispatch();

  const productSelect = useSelector((state) => state.productSelect);
  const { loading, error, products } = productSelect;

  const orderListHome = useSelector((state) => state.orderListHome);
  const { ordersInfo } = orderListHome;

  useEffect(() => {
    dispatch(listSelectProduct());
    dispatch(listOrdersHome());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingsHeader = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    beforeChange: function (currentSlide, nextSlide) {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      console.log("after change", currentSlide);
    },
  };
  const settingsBanner = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  const settingsHeaderBottom = {
    dots: false,
    infinite: true,
    speed: 1024,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 3000,
          cssEase: "linear",
        },
      },
    ],
  };
  let number_select = 1;
  return (
    <>
      <div className="section-bg">
        <div className="container" style={{ marginTop: "7rem" }}>
          <div className="row">
            <div className="col-lg-8 pr-2 hidden-xs">
              <div
                className="owl-carousel owl-theme owl-slider owl-loaded owl-drag"
                style={{
                  width: "auto",
                  height: "299px",
                }}
              >
                <Slider {...settingsBanner}>
                  <div className="banner-slider">
                    <img
                      src={
                        "https://res.cloudinary.com/nnhai-system/image/upload/v1651336273/waca-image/banner/banner3_mou169.jpg"
                      }
                    />
                  </div>
                  <div className="banner-slider">
                    <img
                      src={
                        "https://res.cloudinary.com/nnhai-system/image/upload/v1651336274/waca-image/banner/banner5_goymtf.jpg"
                      }
                    />
                  </div>
                  <div className="banner-slider">
                    <img
                      src={
                        "https://res.cloudinary.com/nnhai-system/image/upload/v1651336274/waca-image/banner/banner6_gyml8x.jpg"
                      }
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div
              className="col-12 col-lg-4 right pl-2 d-lg-block d-none"
              style={{
                flex: "0 0 33.333333%",
                maxWidth: "33.333333%",
                fontSize: "15px",
              }}
            >
              <div
                className="owl-carousel-header-right owl-theme owl-slider-right mb-2 owl-loaded owl-drag"
                style={{
                  display: "block",
                  width: "100%",
                  zIndex: "1",
                  marginBottom: "5rem!important",
                  width: "auto",
                  height: "152px",
                }}
              >
                <Slider {...settingsHeader}>
                  {ordersInfo?.map((orders) => {
                    if (orders.isPaid === true) {
                      return (
                        <>
                          <div className="text-center" key={orders._id}>
                            <div style={{ backgroundColor: "#d7d8de" }}>
                              <h3>{number_select++}</h3>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="header-info">
                              <b>☘️🤣{orders.user.name}🤣☘️</b>
                              <p>
                                Vừa Đặt ({orders.orderItems.length}){" "}
                                {orders.orderItems[0].name}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <Message variant="alert-warning">
                          <div className="text-center">
                            (🥦 {orders.user.name} 🥦) ,, Chưa Thanh Toán..
                          </div>
                        </Message>
                      );
                    }
                  })}
                </Slider>
              </div>
              <div
                className="policy row no-gutters"
                style={{
                  width: "auto",
                  height: "139px",
                }}
              >
                <div className="col-6 d-flex items">
                  <div
                    className="text-center"
                    style={{
                      width: "202px",
                      height: "68px",
                      background: "rgb(202 203 208)",
                      padding: "10px",
                    }}
                  >
                    <div class="info pl-1">
                      <p class="d-block mb-0 text-uppercase">
                        {" "}
                        🏕️ HÀNG CHẤT LƯỢNG
                      </p>
                      <div className="category mb-0">Cam kết chính hãng</div>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex items">
                  <div
                    className="text-center"
                    style={{
                      width: "202px",
                      height: "68px",
                      background: "rgb(189 190 196)",
                      padding: "10px",
                    }}
                  >
                    <div className="info pl-1">
                      <p className="d-block mb-0 text-uppercase">
                        🚟 GIAO HÀNG free
                      </p>
                      <div className="category mb-0">Theo địa chỉ</div>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex items">
                  <div
                    className="text-center"
                    style={{
                      width: "202px",
                      height: "68px",
                      background: "rgb(189 190 196)",
                      padding: "10px",
                    }}
                  >
                    <div className="info pl-1">
                      <p className="d-block mb-0 text-uppercase"> ❇️ Đổi trả</p>
                      <div className="category mb-0">Có đảm bảo điều kiện</div>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex items">
                  <div
                    className="text-center"
                    style={{
                      width: "202px",
                      height: "68px",
                      background: "rgb(202 203 208)",
                      padding: "10px",
                    }}
                  >
                    <div className="info pl-1">
                      <p className="d-block mb-0 text-uppercase">
                        {" "}
                        ⏰ HỖ TRỢ 24/7
                      </p>
                      <div className="category mb-0">Đáp ứng mọi yêu cầu</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 article"
              style={{ marginBottom: "-2rem" }}
            >
              <Slider {...settingsHeaderBottom}>
                <div className="text-center col-lg-4 col-md-6 col-sm-6">
                  <Link to="/Watches">
                    <div
                      style={{
                        borderRadius: "19px",
                        width: "auto",
                        height: "159px",
                        border: "1px solid black",
                        margin: "49px 10px",
                        background: `url('https://res.cloudinary.com/nnhai-system/image/upload/v1651337283/waca-image/banner/banner_bottom7_zbfqbv.jpg')`,
                      }}
                    >
                      <div
                        className="sliderHeaderBottom"
                        style={{
                          border: "1px solid blue",
                          margin: "25px 42px",
                          height: "105px",
                          background: "rgb(6 20 241 / 43%)",
                        }}
                      >
                        <div className="info pl-1" style={{ color: "#ffc107" }}>
                          <p className="d-block mt-4 text-uppercase">
                            Đồng Hồ Hiệu Ứng LED
                          </p>
                          <div className="category mb-0">
                            Đáp ứng mọi yêu cầu
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="text-center col-lg-4 col-md-6 col-sm-6">
                  <Link to="/Cameras">
                    <div
                      style={{
                        borderRadius: "19px",
                        width: "auto",
                        height: "159px",
                        border: "1px solid black",
                        margin: "49px 10px",
                        background: `url('https://res.cloudinary.com/nnhai-system/image/upload/v1651336421/waca-image/banner/banner4_kizfxm.jpg')`,
                      }}
                    >
                      <div
                        className="sliderHeaderBottom"
                        style={{
                          border: "1px solid blue",
                          margin: "25px 42px",
                          height: "105px",
                          background: "rgb(6 20 241 / 43%)",
                        }}
                      >
                        <div className="info pl-1" style={{ color: "#ffc107" }}>
                          <p className="d-block mt-4 text-uppercase">
                            Máy Ảnh Hiện Đại
                          </p>
                          <div className="category mb-0">
                            Đáp ứng mọi yêu cầu
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="text-center col-lg-4 col-md-6 col-sm-6">
                  <Link to="/Watches">
                    <div
                      style={{
                        borderRadius: "19px",
                        width: "auto",
                        height: "159px",
                        border: "1px solid black",
                        margin: "49px 10px",
                        background: `url('https://res.cloudinary.com/nnhai-system/image/upload/v1651337188/waca-image/banner/banner_bottom6_ivo71a.jpg')`,
                      }}
                    >
                      <div
                        className="sliderHeaderBottom"
                        style={{
                          border: "1px solid blue",
                          margin: "25px 42px",
                          height: "105px",
                          background: "rgb(6 20 241 / 43%)",
                        }}
                      >
                        <div className="info pl-1" style={{ color: "#ffc107" }}>
                          <p className="d-block mt-4 text-uppercase">
                            Đồng Hồ ROLEX
                          </p>
                          <div className="category mb-0">
                            Đáp ứng mọi yêu cầu
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="section-bg active">
        <div className="container">
          <div className="section" style={{ marginTop: "0rem" }}>
            <div className="row">
              <div
                style={{ marginBottom: "9rem" }}
                className="col-12 article"
              >
                <div className="section-share section-Handbook">
                  <div className="section-container">
                    <div className="section-header">
                      <div class="d-flex align-items-baseline container">
                        <span className="title-section">
                          Máy Ảnh & Máy Quay
                        </span>
                        <div class="flex-fill jazzy_header mx-4"></div>
                        <button className="btn-section">
                          <Link to="/Cameras">Xem Thêm</Link>
                        </button>
                      </div>
                    </div>
                    {loading ? (
                      <div className="mb-5">
                        <Loading />
                      </div>
                    ) : error ? (
                      <Message variant="alert-danger">{error}</Message>
                    ) : (
                      <div className="section-body mt-3">
                        <Slider {...settings}>
                          {products.map((item) => {
                            if (item.category === 1) {
                              return (
                                <div
                                  className="section-customize shop col-lg-4 col-md-6 col-sm-6"
                                  key={item._id}
                                >
                                  <div className="border-product">
                                    <Link to={`/products/${item._id}`}>
                                      <div className="shopBack">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                        />
                                      </div>
                                    </Link>
                                    <div className="shoptext">
                                      <p>
                                        <Link to={`/products/${item._id}`}>
                                          {item.name}
                                        </Link>
                                      </p>

                                      <Rating
                                        value={item.rating}
                                        text={`${item.numReviews} reviews`}
                                      />
                                      <h3 style={{ color: "red", fontWeight: "600" }}>${item.price}</h3>
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              <Message
                                variant="alert-danger"
                                className="text-center"
                              >
                                No Product Slider..
                              </Message>;
                            }
                          })}
                        </Slider>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-bg">
        <div className="container">
          <div className="section" style={{ marginTop: "0rem" }}>
            <div className="row">
              <div
                style={{ marginBottom: "9rem" }}
                className="col-12 article"
              >
                <div className="section-share section-Handbook">
                  <div className="section-container">
                    <div className="section-header">
                      <div class="d-flex align-items-baseline container">
                        <span className="title-section">
                          Đồng Hồ Thời Trang
                        </span>
                        <div class="flex-fill jazzy_header mx-4"></div>
                        <button className="btn-section">
                          <Link to="/Watches">Xem Thêm</Link>
                        </button>
                      </div>
                    </div>
                    {loading ? (
                      <div className="mb-5">
                        <Loading />
                      </div>
                    ) : error ? (
                      <Message variant="alert-danger">{error}</Message>
                    ) : (
                      <>
                        <div className="section-body mt-3">
                          <Slider {...settings}>
                            {products.map((item) => {
                              if (item.category === 0) {
                                return (
                                  <div
                                    className="section-customize shop col-lg-4 col-md-6 col-sm-6"
                                    key={item._id}
                                  >
                                    <div className="border-product">
                                      <Link to={`/products/${item._id}`}>
                                        <div className="shopBack">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                          />
                                        </div>
                                      </Link>
                                      <div className="shoptext">
                                        <p>
                                          <Link to={`/products/${item._id}`}>
                                            {item.name}
                                          </Link>
                                        </p>

                                        <Rating
                                          value={item.rating}
                                          text={`${item.numReviews} reviews`}
                                        />
                                        <h3>${item.price}</h3>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                <Message
                                  variant="alert-danger"
                                  className="text-center"
                                >
                                  No Product Slider..
                                </Message>;
                              }
                            })}
                          </Slider>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-bg active">
        <div className="container">
          <div className="section" style={{ marginTop: "0rem" }}>
            <div className="row">
              <div
                style={{ marginBottom: "9rem" }}
                className="col-12 article"
              >
                <div className="section-share section-Handbook">
                  <div className="section-container">
                    <div className="section-header">
                      <div class="d-flex align-items-baseline container">
                        <span className="title-section">
                          Máy Ảnh & Máy Quay
                        </span>
                        <div class="flex-fill jazzy_header mx-4"></div>
                        <button className="btn-section">
                          <Link to="/Cameras">Xem Thêm</Link>
                        </button>
                      </div>
                    </div>
                    {loading ? (
                      <div className="mb-5">
                        <Loading />
                      </div>
                    ) : error ? (
                      <Message variant="alert-danger">{error}</Message>
                    ) : (
                      <>
                        <div className="section-body mt-3">
                          <Slider {...settings}>
                            {products.map((item) => {
                              if (item.category === 1) {
                                return (
                                  <div
                                    className="section-customize shop col-lg-4 col-md-6 col-sm-6"
                                    key={item._id}
                                  >
                                    <div className="border-product">
                                      <Link to={`/products/${item._id}`}>
                                        <div className="shopBack">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                          />
                                        </div>
                                      </Link>
                                      <div className="shoptext">
                                        <p>
                                          <Link to={`/products/${item._id}`}>
                                            {item.name}
                                          </Link>
                                        </p>

                                        <Rating
                                          value={item.rating}
                                          text={`${item.numReviews} reviews`}
                                        />
                                        <h3>${item.price}</h3>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                <Message
                                  variant="alert-danger"
                                  className="text-center"
                                >
                                  No Product Slider..
                                </Message>;
                              }
                            })}
                          </Slider>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
