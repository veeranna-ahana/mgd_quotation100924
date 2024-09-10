import React from "react";
import { Table } from "react-bootstrap";
import { CUSTOMER_DATA } from "../Mockdata";

function CustomerInfoTable() {
  return (
    <div className="test">
      <Table responsive bordered striped hover>
        <thead>
          <tr>
            <th className="table-header">Customer</th>
            <th className="table-header">Total Dues </th>
            <th className="table-header">30 Days</th>
            <th className="table-header">60 Days</th>
            <th className="table-header">3 Months</th>
            <th className="table-header">6 Months</th>
            <th className="table-header">1 Year</th>
            <th className="table-header">&gt;1 Year</th>
          </tr>
        </thead>
        <tbody>
          {CUSTOMER_DATA.map((customer, i) => (
            <tr key={i}>
              <td className={i === 0 ? " maxDue" : "customerNameRow"}>
                {customer.name}
              </td>
              <td className={i === 0 ? "maxDue" : ""}>{customer.totalDues}</td>
              <td className={i === 0 ? " maxDue" : "day30"}>
                {customer.day30}
              </td>
              <td className={i === 0 ? "maxDue " : "day60"}>
                {customer.day60}
              </td>
              <td className={i === 0 ? "maxDue " : "day90"}>
                {customer.day90}
              </td>
              <td className={i === 0 ? "maxDue " : "day120"}>
                {customer.day120}
              </td>
              <td className={i === 0 ? "maxDue " : "day365"}>
                {customer.day365}
              </td>
              <td className={i === 0 ? "maxDue " : "years"}>{customer.year}</td>
            </tr>
          ))}

          {/* <tr>
              <td colSpan={4}>No Contact Added</td>
            </tr> */}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerInfoTable;
