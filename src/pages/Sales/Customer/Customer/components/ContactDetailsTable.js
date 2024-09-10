import React from "react";
import Tables from "../../../../../components/Tables";
import { data1 } from "./constactNoDetailsData";

function ContactDetails() {
  const getHeadings = () => {
    return Object.keys(data1[0]);
  };
  return (
    <div className="row">
      {/* <div className="col-md-6 col-sm-12">
        <div className="ip-box">
          <div className="row">
            <div className="col-md-6 ">
              <label className="">Contact Number </label>
              <input className="" />
            </div>
            <div className="col-md-6">
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
        </div>
      </div> */}
      <div className="col-md-6 col-sm-12">
        <div className="ip-box form-bg">
          <div className="row">
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Contact Number</label>
                <input className="in-field" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="form-label">Type</label>
                <select className="ip-select dropdown-field">
                  <option value="option 1">Create</option>
                  <option value="option 1">Edit</option>
                  <option value="option 1">Locked</option>
                  <option value="option 1">Closed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <button className="button-style " style={{ width: "120px" }}>
              Save
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
          <Tables theadData={getHeadings()} tbodyData={data1} />
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
