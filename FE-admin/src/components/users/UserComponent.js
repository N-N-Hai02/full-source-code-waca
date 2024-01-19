import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Swal from "sweetalert2";

const UserComponent = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { error: deleteError, success: deleteSuccess } = userDelete;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, deleteSuccess]);

  function deleteHandler(id) {
    Swal.fire({
      title: "Bạn Có Chắc Không ?",
      text: "bạn sẽ ko thấy người dùng này nữa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Người dùng đã xóa.",
          "success",
          dispatch(deleteUsers(id))
        );
      }
    });
  }

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Admin & Khách Hàng</h2>
        <div>
          <Link to="/adduser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo Mới
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Hiển Thị 20</option>
                <option>Hiển Thị 30</option>
                <option>Hiển Thị 40</option>
                <option>Hiển Thị all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tình Trạng: Tất Cả</option>
                <option>Chỉ Đang Hoạt Động</option>
                <option>Vô Hiệu Hóa</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {deleteError && (
            <Message variant="alert-danger">{deleteError}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-titlee mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p
                            className="m-0"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            Admin
                          </p>
                        ) : (
                          <p className="m-0">Khách Hàng</p>
                        )}

                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                      </div>
                      <Link
                        to="#"
                        onClick={() => deleteHandler(user._id)}
                        className="btn btn-outline-danger pt-2 col-md-3 mx-2"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Link>
                      <Link
                        to={`/user/${user._id}/edit`}
                        className="btn btn-outline-warning pt-2 col-md-3 mx-2"
                      >
                        <i className="fas fa-pen"></i>
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-outline-success pt-2 col-md-3 mx-2"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
