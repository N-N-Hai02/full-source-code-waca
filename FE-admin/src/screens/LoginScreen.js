import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";

const Login = ({ history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <Toast />
      <a target="_blank" href="https://waca-fontend.herokuapp.com/">
        <button className="btn btn-outline-dark mt-5 mx-2">
          <b>Quay Lại Shop 👈</b>
        </button>
      </a>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4
            className="card-title mb-4 text-center"
            style={{fontWeight:"bold", fontFamily: "'Brush Script MT', cursive" }}
          >
            Đăng Nhập
          </h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
