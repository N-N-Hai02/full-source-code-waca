import React from "react";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const InfoShop = () => {
  window.scrollTo(0, 0);

  return (
    <div style={{background: "#d7d8de"}}>
      <Header />
      <div className="container">
        <div className="section">
          {/* đường ngăn Cách */}
          <div class="d-flex align-items-baseline my-4">
            <div class="flex-fill jazzy_jon_lines_warm"></div>
            <h2
              class="mx-4 mb-0 text-center"
              style={{
                fontWeight: "600",
                fontFamily: "'Brush Script MT', cursive",
              }}
            >
              Thông Tin Cửa Hàng
            </h2>
            <div class="flex-fill jazzy_jon_lines_warm"></div>
          </div>
          {/*  */}
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
              <div className="mt-5 mb-5">
                <p>
                    Hệ thống camera quan sát hiện là một công cụ hữu ích bảo vệ an ninh, tính mạng, tài sản và quản lý công việc một cách tốt nhất. Không chỉ các công ty, Doanh nghiệp. Cửa hàng kinh doanh mà ngay cả Các hộ giá đình cũng tăng cường bảo vệ an ninh cho mình bằng cách lắp đặt camera quan sát. Có thể nói sự ra đời của camera chính là một bước phát triển mới nhằm bảo vệ con người, tài sản và an ninh khu vực.
                    Một hệ thống camera hoàn chỉnh thông thường cần phải có những thiết bị như sau tài sản và quản lý công việc một cách tốt nhất:
                    <br/>
                    Hệ thống camera quan sát hiện là một công cụ hữu ích bảo vệ an ninh, tính mạng, tài sản và quản lý công việc một cách tốt nhất. Không chỉ các công ty, Doanh nghiệp. Cửa hàng kinh doanh mà ngay cả Các hộ giá đình cũng tăng cường bảo vệ an ninh cho mình bằng cách lắp đặt camera quan sát. Có thể nói sự ra đời của camera chính là một bước phát triển mới nhằm bảo vệ con người, tài sản và an ninh khu vực.
                    Một hệ thống camera hoàn chỉnh thông thường cần phải có những thiết bị như sau hiện là một công cụ hữu ích bảo vệ an ninh:<br/>
                    Hệ thống camera quan sát hiện là một công cụ hữu ích bảo vệ an ninh, tính mạng, tài sản và quản lý công việc một cách tốt nhất. Không chỉ các công ty, Doanh nghiệp. Cửa hàng kinh doanh mà ngay cả Các hộ giá đình cũng tăng cường bảo vệ an ninh cho mình bằng cách lắp đặt camera quan sát. Có thể nói sự ra đời của camera chính là một bước phát triển mới nhằm bảo vệ con người, tài sản và an ninh khu vực.
                    Một hệ thống camera hoàn chỉnh thông thường cần phải có những thiết bị như sau hoàn chỉnh hoàn chỉnh thông thường cần phải:
                    <br/>
                </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoShop;
