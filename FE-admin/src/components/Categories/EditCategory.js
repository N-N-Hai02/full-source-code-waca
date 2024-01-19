import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editCategoryProduct,
  updateCategoryProducts,
} from "../../Redux/Actions/CatePrdActions";
import { CATEGORY_PRODUCT_UPDATE_RESET } from "../../Redux/Constants/CatePrdContants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Link } from "react-router-dom";

const ToastObject = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000, //TG: 3s
};
const EditCategory = (props) => {
  const { CateProductId } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const cateProductEdit = useSelector((state) => state.cateProductEdit);
  const { loading, error, cateProduct } = cateProductEdit;
  
  const cateProductUpdate = useSelector((state) => state.cateProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = cateProductUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_PRODUCT_UPDATE_RESET });
      toast.success("Update Category Producted", ToastObject);
    } else {
      if (!cateProduct.name || cateProduct._id !== CateProductId) {
        dispatch(editCategoryProduct(CateProductId));
      } else {
        setName(cateProduct.name);
        setDescription(cateProduct.description);
      }
    }
  }, [cateProduct, dispatch, CateProductId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategoryProducts({
        _id: CateProductId,
        name,
        description,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <Link to="/categorys" className="btn btn-primary text-white">
            Quay Lại Trang Danh Mục
          </Link>
          <h2 className="content-title">Cập Nhật Danh Mục</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-12">
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
                        <button className="btn btn-primary py-3">
                          Cập Nhật
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

export default EditCategory;
