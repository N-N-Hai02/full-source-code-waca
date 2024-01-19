import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CONTACT_ADD_RESET } from "../Redux/Constants/ContactContant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddContact } from "../Redux/Actions/ContactActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import Toast from "../components/LoadingError/Toast";

const ToastObject = {
  position: "bottom-right",
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  autoClose: 3000, //TG: 3s
};
const ContactScreen = () => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const contactAdd = useSelector((state) => state.contactAdd);
  const { loading, error, contactAdds } = contactAdd;

  useEffect(() => {
    if (contactAdds) {
      toast.success("CONTACT ADD SUCCESS", ToastObject);
      dispatch({ type: CONTACT_ADD_RESET });
      setName("");
      setPhone("");
      setEmail("");
      setContent("");
    }
  }, [contactAdds, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(AddContact(name, phone, email, content));
  };
  return (
    <div style={{ background: "#d7d8de" }}>
      <Header />
      <div className="container">
        <div className="section">
          {/* đường ngăn Cách */}
          <div className="d-flex align-items-baseline my-4">
            <div className="flex-fill jazzy_jon_lines_warm"></div>
            <h2
              className="mx-4 mb-0 text-center"
              style={{
                fontWeight: "600",
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              Liên Hệ Với Chúng Tôi
            </h2>
            <div className="flex-fill jazzy_jon_lines_warm"></div>
          </div>
          {/*  */}
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              {error && <Message variant="alert-danger">{error}</Message>}
              {loading && <Loading />}
              <Toast />
              <div className="shopcontainer row">
                <div className="mt-5 mb-5">
                  <form className="col-lg-12" onSubmit={submitHandler}>
                    <div className="row">
                      <div className="col-lg-6 mt-2 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Họ Và Tên.. .. .."
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-6 mt-2 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Số Điện Thoại.. .. .."
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 mt-2 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Địa Chỉ Email.. .. .."
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-12 mt-2 mb-2">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Nội Dung Liên Hệ.. .. .."
                          required
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="col-lg-12">
                        <button className="btn btn-md btn-warning">
                          <b>Gữi Đi</b>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 contact-Box">
              <div className="box-info">
                <div className="info-image">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h5>Call Phone</h5>
                <p>0999 912 345</p>
              </div>
            </div>
            <div className="col-12 col-md-4 contact-Box">
              <div className="box-info">
                <div className="info-image">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h5>Trụ Sở Chính</h5>
                <p>Tòa Nhà WACA - P2-Q.Bình Thạnh-TPHCM</p>
              </div>
            </div>
            <div className="col-12 col-md-4 contact-Box">
              <div className="box-info">
                <div className="info-image">
                  <i className="fas fa-envelope"></i>
                </div>
                <h5>Email</h5>
                <p>wacastore@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactScreen;
