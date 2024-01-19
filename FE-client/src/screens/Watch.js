import React, { useEffect } from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listProduct, listSelectProduct } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { Link } from "react-router-dom";
import Rating from "../components/homeComponents/Rating";
import Pagination from "../components/homeComponents/pagination";

const Watches = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const productSelect = useSelector((state) => state.productSelect);
  const { loading, error, products } = productSelect;

  useEffect(() => {
    dispatch(listSelectProduct());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="section">
          {/* đường ngăn Cách */}
          <div class="d-flex align-items-baseline my-4">
            <div class="flex-fill jazzy_jon_lines_warm"></div>
            <h2
              class="mx-4 mb-0 text-center"
              style={{
                fontWeight: "600",
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              ALL <br/> Đồng Hồ Thời Trang
            </h2>
            <div class="flex-fill jazzy_jon_lines_warm"></div>
          </div>
          {/*  */}
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) =>
                      product.category === 0 ? (
                        <div
                          className="shop col-lg-4 col-md-6 col-sm-6"
                          key={product._id}
                        >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                <img src={product.image} alt={product.name} />
                              </div>
                            </Link>

                            <div className="shoptext">
                              <p>
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              </p>

                              <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                              />
                              <h3>${product.price}</h3>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Watches;
