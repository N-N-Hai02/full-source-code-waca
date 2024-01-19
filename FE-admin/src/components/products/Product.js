import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts } from "../../Redux/Actions/ProductActions";
import Swal from "sweetalert2";

const Product = (props) => {
  const { product } = props;

  const dispatch = useDispatch();

  // const deleteHandler = (id) => {
  //   if(window.confirm("you are sure ?? ")) {
  //     dispatch(deleteProducts(id));
  //   }
  // }
  function deleteHandler(id) {
    Swal.fire({
      title: "Bạn Có Chắc Không ?",
      text: "bạn sẽ không thấy sản phẩm này nữa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Đã Xóa Sản Phẩm.",
          "success",
          dispatch(deleteProducts(id))
        );
      }
    });
  }

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="card-body">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-outline-warning pt-2 col-md-3 mx-2"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deleteHandler(product._id)}
                className="btn btn-outline-danger pt-2 col-md-3 mx-2"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
              <Link
                to="#"
                className="btn btn-outline-primary pt-2 col-md-3 mx-2"
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
