import React from "react";
import { Table } from "react-bootstrap";
import { INVOICE_DATA } from "../Mockdata";

function CustomerInvoicesTable() {
  return (
    <div className="">
      <div className="outstanding-sum-container">
        <h4 className="title">Outstanding Invoices</h4>
        <div className=" d-sm-flex flex-sm-column align-items-sm-center d-md-flex flex-md-row  align-items-md-start info ">
          <img
            className="m-logo"
            src={require("../../../../../../../src/ML-LOGO.png")}
          />
          <div className="address mt-2 p-0-md">
            <h5>Magod Laser Machining Pvt. Ltd.</h5>
            <div className="address-sub">
              <div className="row">
                <div className="col-sm-12">
                  <p>
                    {" "}
                    72. KIADB Industrial Area, Phase II Jigani, Anekal Taluk,
                    Bangalore -560106 <br />
                    Outstanding Invoices Report for ANDRITZ HYDRO PRIVATE
                    LIMITED
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Table responsive striped bordered>
          <thead>
            <tr>
              <th className="table-header">Inv No</th>
              <th className="table-header">Inv Date </th>
              <th className="table-header">Amount</th>
              <th className="table-header">Received</th>
              <th className="table-header">Balance</th>
              <th className="table-header">GRN No</th>
              <th className="table-header">Due Days</th>
              <th className="table-header">Po Number</th>
            </tr>
          </thead>
          <tbody>
            {INVOICE_DATA.map((item, i) => (
              <tr key={i}>
                <td className="inv-table-data">{item.invNo}</td>
                <td className="inv-table-data">{item.invDate}</td>
                <td className="inv-table-data">{item.amount}</td>
                <td className="inv-table-data">{item.received}</td>
                <td className="inv-table-data">{item.balance}</td>
                <td className="inv-table-data">{item.grNum}</td>
                <td className="inv-table-data">{item.dueDays}</td>
                <td className="inv-table-data">{item.poNum}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CustomerInvoicesTable;
