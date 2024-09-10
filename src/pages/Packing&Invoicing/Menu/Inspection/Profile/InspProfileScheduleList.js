import React from "react";
import Table from "react-bootstrap/Table";

function InspProfileScheduleList() {
  return (
    <div>
      <h4 className="form-title">Packing Schedules</h4>
      <hr className="horizontal-line" />
      <div className="row">
        <div className="col-md-4">
          <label className="">Find Schedule</label>
          <input type="text" />
        </div>
        <div className="col-md-4">
          <button className="button-style"> Open</button>
        </div>
      </div>
      <div className="col-md-4 col-sm-12">
        <div className="row mt-4">
          {" "}
          <div style={{ height: "300px", overflowY: "scroll" }}>
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

export default InspProfileScheduleList;
