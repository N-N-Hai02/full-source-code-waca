import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteContacts } from "../../Redux/Actions/ContactActions";

const Contact = (props) => {
  const { contants } = props;
  const dispatch = useDispatch();

  function deleteHandlerContact(id) {
    Swal.fire({
      title: "Bạn Có Chắc Không ?",
      text: "bạn sẽ ko thấy liên hệ này nữa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "liên hệ đã xóa.",
          "success",
          dispatch(deleteContacts(id))
        );
      }
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Họ & Tên</th>
          <th scope="col">Số Điện Thoại</th>
          <th scope="col">Email</th>
          <th scope="col">Nội Dung Khách Hàng Hỏi ??</th>
          <th scope="col" className="text-end">
            Hành Động
          </th>
        </tr>
      </thead>
      <tbody>
        {contants?.map((contact) => (
          <tr key={contact._id}>
            <td>
              <b>{contact.name}</b>
            </td>
            <td>{contact.phone}</td>
            <td>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </td>
            <td>
              <p>{contact.content}</p>
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link
                to="#"
                onClick={() => deleteHandlerContact(contact._id)}
                className="btn btn-outline-danger col-md-12"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Contact;
