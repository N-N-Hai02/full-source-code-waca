import React, { useEffect } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { listOrdersHome } from "../Redux/Actions/OrderActions";

const HomeScreen = () => {
  window.scrollTo(0, 0);

  // const dispatch = useDispatch();

  // const orderListHome = useSelector((state) => state.orderListHome);
  // const { ordersInfo } = orderListHome;

  // useEffect(() => {
  //   dispatch(listOrdersHome());
  // }, [dispatch]);

  return (
    <div>
      <Header />
      <ShopSection />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
