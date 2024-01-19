import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { listCategoryProducts } from "../../Redux/Actions/CatePrdActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainCategories = () => {
  const dispatch = useDispatch();
  const cateProductList = useSelector((state) => state.cateProductList);
  const { loading, error, cateProducts } = cateProductList;
  const cateProductDelete = useSelector((state) => state.cateProductDelete);
  const { error: deleteError, success: deleteSuccess } = cateProductDelete;

  useEffect(() => {
    dispatch(listCategoryProducts());
  }, [dispatch,deleteSuccess]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh Mục Sản Phẩm</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory />
            {/* Categories table */}
            {deleteError && (
              <Message variant="alert-danger">{deleteError}</Message>
            )}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <CategoriesTable cateProducts={cateProducts} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
