import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteOrders } from "../../Redux/Actions/OrderActions";
import Swal from "sweetalert2";

const Orders = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();

  // const deleteHandlerOrder = (id) => {
  //   if (window.confirm("Bạn chắc muốn Xóa ?? ")) {
  //     dispatch(deleteOrders(id));
  //   }
  // };

  function deleteHandlerOrder(id){
    Swal.fire({
      title: 'Bạn Có Chắc Không ?',
      text: "bạn sẽ Hóa Đơn này nữa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Hóa Đơn đã xóa.',
          'success',
          dispatch(deleteOrders(id)),
        )
      }
    })
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Họ & Tên</th>
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
        {orders.map((order) => (
          <tr key={order._id}>
            <td>
              <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Đã Thanh Toán {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">Chưa Thanh Toán</span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Đã Giao</span>
              ) : (
                <span className="badge btn-dark">Chưa Giao</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link
                to={`/order/${order._id}`}
                className="btn btn-outline-primary pt-2 col-md-6 me-2"
              >
                <i className="fas fa-eye"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deleteHandlerOrder(order._id)}
                className="btn btn-outline-danger pt-2 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </td>
          </tr>
        ))}

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Orders;
