import React from "react";

export default function ConsigneeAddress() {
  return (
    <>
      <div>
        <div className="row">
              <div className="col-md-3">
                <label className="">Invoice Type</label>
                <input type="text" />
              </div>
              <div className="col-md-3">
                <label className="">Invoice No</label>
                <input type="text" />
              </div>
              <div className="col-md-3">
                <label className="">Date</label>
                <input type="date" />
              </div>
              <div className="col-md-3">
                <label className="">PN No</label>
                <input type="text" />
              </div>
          </div>


        <div className="row">
          <div className="col-md-3">
            <label className="">Date</label>
            <input type="date" />
          </div>

          <div className="col-md-3">
            <label className="">PO No</label>
            <input type="text" />
          </div>

          <div className="col-md-3">
            <label className="">Consignee</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Dispatch Date</label>
            <input type="date" />
          </div>
        </div>

        <div className="row">
        <div className="col-md-3">
            <label className="">Dispatch Mode</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Vehicle No</label>
            <input type="text" />
          </div>
          <div className="col-md-6">
            <label className="">City</label>
            <input type="text" />
          </div>
        </div>


        <div className="row">
        <div className="col-md-6">
            <label className="">Delivery</label>
            <input type="text" />
          </div>
          <div className="col-md-6">
            <label className="">Adress</label>
            <input type="text" />
          </div>
        </div>

        <div className="row justify-content-center mt-3 mb-3">
          <button className="button-style" style={{ width: "150px" }}>
            Close
          </button>
        </div>
      </div>
      <hr className="horizontal-line" />
    </>
  );
}
