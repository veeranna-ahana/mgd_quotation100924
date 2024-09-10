import React from "react";
import Table from "react-bootstrap/Table";
import Tables from "../../../../../components/Tables";
import { data1, data2 } from "../data";

import "../partList.css";

function CustomerBOMList() {
  const getHeadings1 = () => {
    return Object.keys(data1[0]);
  };

  const getHeadings2 = () => {
    return Object.keys(data2[0]);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row">
              <div className="row">
                <p className="form-title-deco">Part / Assembly Details</p>
                <div className="col-md-6 ">
                  <label className="">Magod ID</label>
                  <input className="in-field" />
                </div>
                <div className="col-md-6 ">
                  <label className="">Assembly ID</label>
                  <input className="in-field" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <textarea
                    style={{ height: "80px" }}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ marginTop: "20px" }}>
                    Status
                  </label>
                  <select className="ip-select dropdown-field">
                    <option value="option 1">Create</option>
                    <option value="option 1">Edit</option>
                    <option value="option 1">Locked</option>
                    <option value="option 1">Closed</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <label className="">Mtrl Cost</label>
                  <input className="in-field" />
                </div>
                <div className="col-md-6 ">
                  <label className="">JW Cost</label>
                  <input className="in-field" />
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-2">
              <button className="button-style " style={{ width: "120px" }}>
                Add Part
              </button>
              <button
                className="button-style "
                style={{ width: "120px", marginLeft: "4px" }}
              >
                Save All
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div
            className="table-data"
            style={{ height: "360px", overflowY: "scroll" }}
          >
            <Tables theadData={getHeadings1()} tbodyData={data1} />
          </div>
        </div>
      </div>

      <hr className="horizontal-line mt-4 mb-4" />

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="ip-box form-bg">
            <div className="row">
              <div className="row">
                <div className="col-md-12">
                  <p className="form-title-deco">Part Details</p>
                  <label className="form-label">Part ID</label>
                  <select className="ip-select dropdown-field">
                    <option value="option 1"> A A Industries</option>
                    <option value="option 1">Test Industries</option>
                    <option value="option 1">
                      Ahana Systems and solutions
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="row">
                <div className="col-md-12 ">
                  <label className="">Qty</label>
                  <input className="in-field" />
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-2">
              <button className="button-style " style={{ width: "150px" }}>
                Add BOM New
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div
            className="table-data"
            style={{ height: "250px", overflowY: "scroll" }}
          >
            <Tables theadData={getHeadings2()} tbodyData={data2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerBOMList;
