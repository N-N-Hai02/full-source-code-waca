import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Link } from "react-router-dom";
import { editUsers, updateUsers } from "../../Redux/Actions/userActions";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";

const ToastObject = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000, //TG: 3s
};
const EditUser = (props) => {
  const { UserId } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState();

  const dispatch = useDispatch();
  const userEdit = useSelector((state) => state.userEdit);
  const { loading, error, users } = userEdit;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("Update User Success", ToastObject);
    } else {
      if (!users.name || users._id !== UserId) {
        dispatch(editUsers(UserId));
      } else {
        setName(users.name);
        setEmail(users.email);
        setPassword(users.password);
        setAdmin(users.isAdmin);
      }
    }
  }, [users, dispatch, UserId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUsers({
        _id: UserId,
        name,
        email,
        password,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <Link to="/users" className="btn btn-primary text-white">
            Quay Lại Trang Admin & User
          </Link>
          <h2 className="content-title">Cận Nhật Người Dùng</h2>
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
                        <label htmlFor="User_name" className="form-label">
                          Tên
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
                          <option value={true}>Làm Admin</option>
                          <option value={false}>không Làm Admin</option>
                        </select>
                      </div>
                      <div className="d-grid">
                        <button className="btn btn-primary py-3">
                          Cập Nhật Người Dùng
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

export default EditUser;
