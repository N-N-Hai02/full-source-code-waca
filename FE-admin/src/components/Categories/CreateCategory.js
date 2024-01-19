import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategoryProducts } from "../../Redux/Actions/CatePrdActions";
import { CATEGORY_PRODUCT_CREATE_RESET, CATEGORY_PRODUCT_LIST_SUCCESS } from "../../Redux/Constants/CatePrdContants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObject = {
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  autoClose: 3000, //TG: 5s
};
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const cateProductCreate = useSelector((state) => state.cateProductCreate);
  const { loading, error, cateProduct } = cateProductCreate;

  useEffect(() => {
    if (cateProduct) {
      toast.success("Category Product Added", ToastObject);
      dispatch({ type: CATEGORY_PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
    }
  }, [cateProduct, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategoryProducts(name, description));
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-4">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Tên Danh Mục
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="product_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Hình Ảnh</label>
            <input className="form-control" type="file" />
          </div>
          <div className="mb-4">
            <label className="form-label">Miêu Tả</label>
            <textarea
              placeholder="Type here"
              className="form-control"
              rows="4"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary py-3">Tạo Danh Mục</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
