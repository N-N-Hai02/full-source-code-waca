import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Link } from "react-router-dom";
import {
  createUserProducts,
  editUsers,
  updateUsers,
} from "../../Redux/Actions/userActions";
import {
  USER_CREATE_RESET,
  USER_UPDATE_RESET,
} from "../../Redux/Constants/UserContants";

const ToastObject = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000, //TG: 3s
};
const AddUserMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState();

  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, userCreateAd } = userCreate;

  useEffect(() => {
    if (userCreateAd) {
      toast.success("USER ADD SUCCESS", ToastObject);
      dispatch({ type: USER_CREATE_RESET });
      setName("");
      setEmail("");
      setPassword("");
      setAdmin();
    }
  }, [userCreateAd, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUserProducts(name, email, password, isAdmin));
  };

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <Link to="/users" className="btn btn-primary text-white">
            Quay Lại Trang Admin & User
          </Link>
          <h2 className="content-title">Thêm Người Dùng Mới</h2>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <form onSubmit={submitHandler}>
                  <div className="mb-4">
                    <label htmlFor="User_name" className="form-label">
                      Họ & Tên
                    </label>
                    <input
                      type="text"
                      placeholder="Type name"
                      className="form-control py-3"
                      id="User_name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="User_email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Type email here"
                      className="form-control py-3"
                      id="User_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="User_email" className="form-label">
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      placeholder="Type password"
                      className="form-control py-3"
                      id="User_password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="User_chooseAdmin" className="form-label">
                      Chọn Làm Admin
                    </label>
                    <select
                      type="Boolean"
                      className="form-select"
                      value={isAdmin}
                      onChange={(e) => setAdmin(e.target.value)}
                    >
                      <option value={false}>không làm Admin</option>
                      <option value={true}>làm Admin</option>
                    </select>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary py-3">
                      Tạo Mới Người Dùng
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

export default AddUserMain;
