import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/OrderActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";

const OrderMain = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { error: deleteError, success: deleteSuccess } = orderDelete;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, deleteSuccess]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Hóa Đơn</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tình Trạng</option>
                <option>Tích Cực</option>
                <option>Vô Hiệu Hóa</option>
                <option>Hiển Thị Tất Cả</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Hiển Thị 20</option>
                <option>Hiển Thị 30</option>
                <option>Hiển Thị 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {deleteError && (
              <Message variant="alert-danger">{deleteError}</Message>
            )}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders}/>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
