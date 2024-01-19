import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable:false,
    pauseOnHover:false,
    autoClose:3000, // means 2s
  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading} = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setPassword(user.password);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Passwords do not match", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password}));
      if(!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };

  return (
    <>
    <Toast/>
    {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading />}
    {updateLoading && <Loading />}
      <form className="row form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Họ & Tên</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Địa Chỉ</label>
            <input
              className="form-control"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Tạo Mật Khẩu Mới</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Nhập Lại Mật Khẩu</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary"><b>Cập Nhật Hồ Sơ</b></button>
      </form>
    </>
  );
};

export default ProfileTabs;
