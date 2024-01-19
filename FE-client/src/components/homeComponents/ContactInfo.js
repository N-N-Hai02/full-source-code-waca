import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo">
      <div className="container">
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
            Liên Hệ Với Chúng Tôi
          </h2>
          <div class="flex-fill jazzy_jon_lines_warm"></div>
        </div>
        {/*  */}
        <div className="row">
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h5>Call Phone</h5>
              <p>0999 912 345</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h5>Trụ Sở Chính</h5>
              <p>Tòa Nhà WACA - P2-Q.Bình Thạnh-TPHCM</p>
            </div>
          </div>
          <div className="col-12 col-md-4 contact-Box">
            <div className="box-info">
              <div className="info-image">
                <i className="fas fa-envelope"></i>
              </div>
              <h5>Email</h5>
              <p>wacastore@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
