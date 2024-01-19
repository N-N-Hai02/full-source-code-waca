import React, { useState } from "react";

const TopTotal = (props) => {
  let totalSale = 0
  const { orders, products } = props;
  if (orders) {
    orders.map((order) => {
      return order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null;
    });
  }

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng Doanh Số Bán Hàng</h6>{" "}
              {/* <span>${totalSale.toFixed(0)}</span> */}
              <div class="progress">
                <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: `${totalSale.toFixed(0)/100}%`}} aria-valuenow={totalSale.toFixed(0)/100} aria-valuemin="0" aria-valuemax="100">{totalSale.toFixed(0)/100} %</div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng Số Đơn Hàng</h6>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{orders ? <span>{orders.length} %</span> : <span>0 %</span>}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng Số Sản Phẩm</h6>
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{products ? <span>{products.length} %</span> : <span>0 %</span>}</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
