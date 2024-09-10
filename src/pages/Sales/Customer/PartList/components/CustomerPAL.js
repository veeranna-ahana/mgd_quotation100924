import React from "react";
import Table from "react-bootstrap/Table";
import Tables from "../../../../../components/Tables";
import { data3 } from "../data";
import "../partList.css";

function CustomerPAL() {
  const getHeadings = () => {
    return Object.keys(data3[0]);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row">
              <div className="row">
                <div className="col-md-12 ">
                  <p className="form-title-deco">
                    Part as identified in Customer Drawing
                  </p>
                  <label>Part ID</label>
                  <input className="in-field" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ">
                  <label className="">Part Description</label>
                  <input className="in-field" />
                </div>
              </div>
              <div className="row justify-content-center mt-2">
                <button className="button-style " style={{ width: "120px" }}>
                  Add Part
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div
            className="table-data"
            style={{ height: "250px", overflowY: "scroll" }}
          >
            <Tables theadData={getHeadings()} tbodyData={data3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPAL;
