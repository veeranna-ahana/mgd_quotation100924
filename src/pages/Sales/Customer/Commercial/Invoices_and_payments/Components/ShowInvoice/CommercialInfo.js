import React from "react";

export default function CommercialInfo() {
  return (
    <>
      <div className="p-3 py-0">
        <div className="row">
          <div className="col-md-3">
            <label className="">Net Value</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Grand Total</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Material Total</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Recieved</label>
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="">Discount</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Balance</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Assessible Value</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Due Days</label>
            <input type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="">Delivery Charges</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Payments Terms</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Total Taxes</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Payment Date</label>
            <input type="date" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="">Invoice Total</label>
            <input type="text" />
          </div>
          <div className="col-md-3">
            <label className="">Round Off</label>
            <input type="text" />
          </div>
          <div className="col-md-6">
            {/* <div className="col-md-6"> */}
            <div className="col-md-12">
              <label className="">Remarks</label>
              <input type="text" />
            </div>
            {/* </div> */}
            {/* <label className="">Remarks</label>
            <textarea
              style={{ height: "110px" }}
              className="form-control"
            ></textarea> */}
            {/* <input type="text" /> */}
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
