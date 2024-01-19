import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProducts } from "../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listCategoryProducts } from "../../Redux/Actions/CatePrdActions";

const ToastObject = {
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  autoClose: 3000, //TG: 3s
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const producCreate = useSelector((state) => state.producCreate);
  const { loading, error, product } = producCreate;
  const cateProductList = useSelector((state) => state.cateProductList);
  const { cateProducts } = cateProductList;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObject);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setPrice(0);
      setCategory(0);
      setImage("");
      setCountInStock(0);
      setDescription("");
    }
    dispatch(listCategoryProducts());
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProducts(name, price, category, description, image, countInStock));
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
            <h2 className="content-title">Thêm Sản Phẩm</h2>
          </div>
          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <form onSubmit={submitHandler}>
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
                        Số lượng SP trong kho
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
                      <label className="form-label">Miêu Tả SP</label>
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
                        placeholder="Enter Image URL"
                        required
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
                          <option value={(number++)}>{prdCate.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary py-3">
                        Thêm Mới Sản Phẩm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default AddProductMain;
