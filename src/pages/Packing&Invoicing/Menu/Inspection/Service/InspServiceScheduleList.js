import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
const {
  getRequest,
  postRequest,
  request,
} = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");
function InspServiceScheduleList() {
  let navigate = useNavigate();

  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:4001/schedulelist/getallcustomers"
      );
      const customerdata = await response.json();
      console.log("data", data);
      setData(customerdata);
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   async function getTestData() {
  //     request(endpoints.getCustomerData, {}, (custdetdata) => {
  //       console.log("test", custdetdata);
  //       setData(custdetdata);
  //     });
  //   }
  //   getTestData();
  // }, []);

  return (
    <div>
      <h4 className="title">Packing Schedules</h4>
      {/* <hr className="horizontal-line" /> */}
      <div className="row">
        <div className="col-md-4">
          <label className="form-label">Name </label>
          {data.length !== 0 ? (
            <select className="ip-select">
              <option value="" disabled selected>
                {" "}
                Select Customer{" "}
              </option>
              {data.map((customer) => {
                return (
                  <option
                    style={{ fontFamily: "Roboto", fontSize: "12px" }}
                    value={customer["Cust_Code"]}
                  >
                    {customer["Cust_name"]}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
        </div>
        {/* <div className="col-md-4 mt-1">
          <label className="">Find Schedule</label>
          <input type="text" />
        </div> */}
        <div className="col-md-4">
          <button
            className="button-style"
            onClick={() => {
              navigate("/PackingAndInvoices/Service/FindSchedule");
            }}
          >
            {" "}
            Open
          </button>
        </div>
      </div>
      <div className="col-md-4 col-sm-12">
        <div className="row mt-4">
          {" "}
          <div
            style={{ height: "300px", overflowY: "scroll", marginTop: "25px" }}
          >
            <Table bordered>
              <thead
                style={{
                  textAlign: "center",
                  position: "sticky",
                  top: "-1px",
                }}
              >
                <tr>
                  <th>OrdSchNo</th>
                  <th>PO</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr>
                  <td>asdfghj</td>
                  <td>asdfghj</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspServiceScheduleList;
