import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
// import products from "./../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const [selectCategory, setSelectCategory] = useState(0);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const producDelete = useSelector((state) => state.producDelete);
  const { error: deleteError, success: deleteSuccess } = producDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, deleteSuccess]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản Phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Tạo Mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                type="number"
                className="form-select"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value={(0)}>Watch</option>
                <option value={(1)}>Cameras</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {deleteError && (
            <Message variant="alert-danger">{deleteError}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products.map((product) =>
                selectCategory == 0 ? (
                  product.category === 0 ? (
                    <Product product={product} key={product._id} />
                  ) : (
                    <></>
                  )
                ) : product.category === 1 ? (
                  <Product product={product} key={product._id} />
                ) : (
                  <></>
                )
              )}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
