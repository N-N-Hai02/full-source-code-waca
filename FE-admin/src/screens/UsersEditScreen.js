import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditUser from "../components/users/EditUser";

const UsersEditScreen = ({match}) => {
  const UserId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUser UserId={UserId}/>
      </main>
    </>
  );
};

export default UsersEditScreen;
