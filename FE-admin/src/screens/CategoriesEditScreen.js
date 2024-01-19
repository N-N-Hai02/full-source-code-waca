import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditCategory from "../components/Categories/EditCategory";
import CreateCategory from "../components/Categories/CreateCategory";

const CategoriesEditScreen = ({match}) => {
  const CateProductId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditCategory CateProductId={CateProductId}/>
        {/* <CreateCategory CateProductId={CateProductId}/> */}
      </main>
    </>
  );
};

export default CategoriesEditScreen;
