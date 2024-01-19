import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import ContactMain from "../components/Contact/ContactMain";

const ContactScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ContactMain />
      </main>
    </>
  );
};

export default ContactScreen;
