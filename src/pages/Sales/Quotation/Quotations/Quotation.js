import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";


const Quotation = () => {

  let nav=useNavigate();
  const addDetails=()=>{
    nav("addDetails")
  }

  return (
    <div>
      <h4 className="form-title">Create Quotation - Profile</h4>
      <hr className="horizontal-line" />

      <div className="table_top_style">
        {/* <form action=""> */}
        <div className="row mt-3">
          <div className="col-md-6 col-sm-12">
            <label className="form-label">Customer</label>
            <select className="ip-select">
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
              <option value="option 1"> A A Industries</option>
              <option value="option 2">Test Industries</option>
              <option value="option 3">Ahana Systems and solutions</option>
            </select>
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="">Enquiry Date</label>
            <input type="date" className="" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-sm-12">
            <label className="">Enquiry ref</label>
            <input className="" />
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="">Telephone</label>
            <input type="number" className="" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-sm-12">
            <label className="">Contact</label>
            <input className="" />
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="">Email Id</label>
            <input type="email" className="" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-sm-12">
            <label className="">Address</label>
            <input className="" />
          </div>
          <div className="col-md-6 col-sm-12">
            <label className="">Format</label>
            <input className="" name="format" value="Profile" readonly />
          </div>
        </div>

        <div
          className="row "
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-md-4 col-sm-12">
            <button className="button-style">Save</button>
          </div>
          <div className="col-md-4 col-sm-12">
            <button className="button-style" onClick={addDetails}>Add Details</button>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Quotation;
