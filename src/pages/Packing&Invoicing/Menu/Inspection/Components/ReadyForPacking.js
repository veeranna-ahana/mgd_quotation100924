import React from "react";
import Table from "react-bootstrap/Table";

function ReadyForPacking() {
  return (
    <div>
      {" "}
      <div className="row">
        <div className="col-md-2 col-sm-12">
          <div className="row justify-content-center m-2">
            <button className="button-style">Create Draft Pin</button>
          </div>
          <div className="row">
            {" "}
            <div style={{ height: "400px", overflowY: "scroll" }}>
              <Table bordered>
                <thead
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "-1px",
                  }}
                >
                  <tr>
                    <th>Select</th>
                    <th>Dwg Name</th>

                  </tr>
                </thead>

                <tbody className="tablebody">
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>asdfghj</td>

                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
          <div className="row justify-content-center m-2">
            <button className="button-style " style={{ width: "120px" }}>
              Print Draft Pin
            </button>
            <button className="button-style " style={{ width: "120px" }}>
              Delet Draft Pin
            </button>
            <button className="button-style " style={{ width: "120px" }}>
              Save Draft Pin
            </button>
            <button className="button-style " style={{ width: "120px" }}>
              Preapare Pin
            </button>
            <button className="button-style " style={{ width: "120px" }}>
              Print Pin
            </button>
            <button className="button-style " style={{ width: "120px" }}>
              Open Invoice
            </button>
          </div>
          <div className="row">
            {" "}
            <div style={{ height: "200px", overflowY: "scroll" }}>
              <Table bordered>
                <thead
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: "-1px",
                  }}
                >
                  <tr>
                    <th>type</th>
                    <th>PN No</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  <tr>
                    <td>asdfghj</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            {" "}
            <div
              style={{ height: "200px", width: "400px", overflowY: "scroll" }}
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
                    <th>Dwg No</th>
                    <th>Mtrl</th>
                    <th>Qty</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  <tr>
                    <td>asdfghj</td>
                    <td>asdfghj</td>
                    <td>asdfghj</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadyForPacking;
