import React, { useEffect, useState } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editProduct,
  updateProducts,
} from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listCategoryProducts } from "../../Redux/Actions/CatePrdActions";

const ToastObject = {
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  autoClose: 3000, //TG: 3s
};
const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;
  const cateProductList = useSelector((state) => state.cateProductList);
  const { cateProducts } = cateProductList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Update Producted", ToastObject);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
    dispatch(listCategoryProducts());
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProducts({
        _id: productId,
        name,
        price,
        category,
        description,
        image,
        countInStock,
      })
    );
  };
  let number = 0;
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <div className="content-header">
          <Link to="/products" className="btn btn-dark text-white">
            Quay Lại Trang Sản Phẩm
          </Link>
          <h2 className="content-title">Cập Nhật Sản Phẩm</h2>
        </div>
        <div className="row mb-4">
          <div className="col-xl-12 col-lg-12">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Tên Sản Phẩm
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá Bán
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Số Lượng SP Trong Kho
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Miêu Tả</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Hình Ảnh</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Danh Mục Sản Phẩm</label>
                        <select
                          type="number"
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {cateProducts?.map((prdCate) => (
                            <option value={number++}>{prdCate.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary py-3">
                          Cập Nhật Sản Phẩm
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProductMain;
