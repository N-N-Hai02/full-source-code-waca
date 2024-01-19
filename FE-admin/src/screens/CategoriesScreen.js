import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCategories from "./../components/Categories/MainCategories";
import EditCategory from "../components/Categories/EditCategory";

const CategoriesScreen = () => {;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCategories />
      </main>
    </>
  );
};

export default CategoriesScreen;
