import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { orders, loading, error } = props;

  return (
    <div className="card-body">
      <h5 className="card-title">Đơn Hàng Mới</h5>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Tổng Tiền</th>
              <th scope="col">Thanh Toán</th>
              <th scope="col">Ngày/Tháng</th>
              <th>Tình Trạng</th>
              <th scope="col" className="text-end">
                Hành Động
              </th>
            </tr>
          </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user.name}</b>
                  </td>
                  <td>{order.user.email}</td>
                  <td>{order.totalPrice} <b>VNĐ</b></td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge rounded-pill alert-success">
                        Paid At {moment(order.paidAt).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).calendar()}</td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge btn-success">Delivered</span>
                    ) : (
                      <span className="badge btn-dark">Not Delivered</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link
                      to={`/order/${order._id}`}
                      className="btn btn-outline-primary col-md-12"
                    >
                      <i className="fas fa-eye mt-1"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
