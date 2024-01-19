import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategoryProducts } from "../../Redux/Actions/CatePrdActions";
import Swal from "sweetalert2";

const CategoriesTable = (props) => {
  const { cateProducts } = props;
  const dispatch = useDispatch();

  // const deleteHandler = (id) => {
  //   if (window.confirm("you are sure ?? ")) {
  //     dispatch(deleteCategoryProducts(id));
  //   }
  // };
  let number = 0;

  function deleteHandler(id){
    Swal.fire({
      title: 'Bạn Có Chắc Không ?',
      text: "bạn sẽ không thấy danh mục này nữa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'file của bạn đã deleted.',
          'success',
          dispatch(deleteCategoryProducts(id)),
        )
      }
    })
  }

  return (
    <>
      <div className="col-md-12 col-lg-8">
        {/* <button onClick={handleClick}>
            Open
        </button> */}
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </th>
              <th>ID</th>
              <th>Tên Danh Mục</th>
              <th>Miêu Tả</th>
              <th className="text-end">Hành Động</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {cateProducts.map((prdCate) => (
              <tr key={prdCate._id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                    />
                  </div>
                </td>
                <td>{number++}</td>
                <td>
                  <b>{prdCate.name}</b>
                </td>
                <td>{prdCate.description}</td>
                <td className="text-end">
                  <div className="dropdown">
                    <Link
                      to="#"
                      data-bs-toggle="dropdown"
                      className="btn btn-light"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link
                        className="dropdown-item"
                        to={`/category/${prdCate._id}/edit`}
                      >
                        Sửa Thông Tin
                      </Link>
                      <Link
                        className="dropdown-item text-danger"
                        to="#"
                        onClick={() => deleteHandler(prdCate._id)}
                      >
                        Xóa bỏ
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesTable;
