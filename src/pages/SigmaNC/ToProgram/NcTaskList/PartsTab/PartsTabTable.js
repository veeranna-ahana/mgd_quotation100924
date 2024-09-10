import React from 'react';
import { Table } from 'react-bootstrap';

export default function PartsTabTable() {
  return (
    <div>
      <div style={{overflowX: "scroll",overflowY: "scroll", height:'350px'}}
>
<Table
    striped
    className="table-data border"

>
    <thead className="tableHeaderBGColor">
        <tr>
            <th style={{ whiteSpace: "nowrap" }}>Drawing</th>
            <th style={{ whiteSpace: "nowrap" }}>To Nest</th>
            <th style={{ whiteSpace: "nowrap" }}>Nested</th>
            <th style={{ whiteSpace: "nowrap" }}>LOC</th>
            <th style={{ whiteSpace: "nowrap" }}>Piercers</th>
            <th style={{ whiteSpace: "nowrap" }}>Parts Area</th>
            <th style={{ whiteSpace: "nowrap" }}>Unit Wt</th>
            <th style={{ whiteSpace: "nowrap" }}>Task_Part_Id</th>
            <th style={{ whiteSpace: "nowrap" }}>Nc Task Id</th>
            <th style={{ whiteSpace: "nowrap" }}>Task No</th>
            <th style={{ whiteSpace: "nowrap" }}>SchDetailsId</th>
            <th style={{ whiteSpace: "nowrap" }}>PartId</th>

            <th style={{ whiteSpace: "nowrap" }}>Dwg Name</th>
            <th style={{ whiteSpace: "nowrap" }}>Qty To Nest</th>
            <th style={{ whiteSpace: "nowrap" }}>Qty Nested</th>
            <th style={{ whiteSpace: "nowrap" }}>Remarks</th>
            <th style={{ whiteSpace: "nowrap" }}>LOC</th>
            <th style={{ whiteSpace: "nowrap" }}>Pierces</th>

            <th style={{ whiteSpace: "nowrap" }}>Part_Area</th>
            <th style={{ whiteSpace: "nowrap" }}>Unit_Wt</th>
            <th style={{ whiteSpace: "nowrap" }}>Qtn Detail Id</th>



        </tr>
    </thead>
    <tbody className="tablebody">



    </tbody>
</Table>
</div>
    </div>
  );
}
