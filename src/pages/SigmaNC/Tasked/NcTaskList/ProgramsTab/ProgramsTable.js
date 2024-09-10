import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgramsTable() {
    return (
        <div>
            <div style={{

                height: '350px',
                overflowX: "scroll",
                overflowY: "scroll",

            }}
            >
                <Table
                    striped
                    className="table-data border"

                >
                    <thead className="tableHeaderBGColor">
                        <tr>
                            <th style={{ whiteSpace: "nowrap" }}>Nc Program No</th>
                            <th style={{ whiteSpace: "nowrap" }}>Status</th>
                            <th style={{ whiteSpace: "nowrap" }}>Machine</th>
                            <th style={{ whiteSpace: "nowrap" }}>Dwgs</th>
                            <th style={{ whiteSpace: "nowrap" }}>NestX</th>
                            <th style={{ whiteSpace: "nowrap" }}>NestY</th>
                            <th style={{ whiteSpace: "nowrap" }}>Qty</th>
                            <th style={{ whiteSpace: "nowrap" }}>Parts</th>
                            <th style={{ whiteSpace: "nowrap" }}>Time</th>
                            <th style={{ whiteSpace: "nowrap" }}>Net Area</th>
                            <th style={{ whiteSpace: "nowrap" }}>LOC</th>
                            <th style={{ whiteSpace: "nowrap" }}>Pierces</th>
                            <th style={{ whiteSpace: "nowrap" }}>Remarks</th>





                        </tr>
                    </thead>
                    <tbody className="tablebody">



                    </tbody>
                </Table>
            </div>
        </div>
    );
}
