import React from "react";
import Tables from "../../../../../components/Tables";

import { ILData1 } from "./Data/ILData1";
import { ILData2 } from "./Data/ILData2";

export default function InvoiceList() {
  const getHeadings1 = () => {
    return Object.keys(ILData1[0]);
  };

  const getHeadings2 = () => {
    return Object.keys(ILData2[0]);
  };

  return (
    <>
      <div className="row  ">
        <div className="col-md-7 ">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Tables theadData={getHeadings1()} tbodyData={ILData1} />
          </div>
        </div>

        <div className="col-md-5 ">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Tables theadData={getHeadings2()} tbodyData={ILData2} />
          </div>
        </div>
      </div>
    </>
  );
}
