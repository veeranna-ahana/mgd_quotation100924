import React from "react";
import Tables from "../../../../../components/Tables";
import { data2 } from "./constactNoDetailsData";
const ContactNumDetailsTable = () => {
  const getHeadings = () => {
    return Object.keys(data2[0]);
  };
  return (
    <div className="row">
      <div className="col-md-6 col-sm-12">
        {/* <div className="ip-box">
          <div className="row">
            <div className="col-md-4 ">
              <label className="">Name</label>
              <input className="" />
            </div>
            <div className="col-md-4 ">
              <label className="">Contact Number </label>
              <input className="" />
            </div>
            <div className="col-md-4">
              <label className="">Type</label>
              <input className="" />
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <button className="button-style " style={{ width: "120px" }}>
              Save{" "}
            </button>
            <button
              className="button-style "
              style={{ width: "120px", marginLeft: "4px" }}
            >
              Delete
            </button>
          </div>
        </div> */}
        <div className="ip-box form-bg">
          <div className="row">
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Contact Number</label>
                <input className="in-field" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Designation</label>
                <input className="in-field" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Dept</label>
                <input className="in-field" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Email</label>
                <input className="in-field" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <button className="button-style " style={{ width: "120px" }}>
              New
            </button>
            <button
              className="button-style "
              style={{ width: "120px", marginLeft: "4px" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div
          className="table-data"
          style={{ height: "200px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings()} tbodyData={data2} />
        </div>
      </div>
    </div>
  );
};

export default ContactNumDetailsTable;