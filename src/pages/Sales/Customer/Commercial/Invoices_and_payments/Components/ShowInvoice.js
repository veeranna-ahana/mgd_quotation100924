import React from "react";
import NavTab from "./ShowInvoice/NavTab";
import Tables from "../../../../../../components/Tables";
import { Data1 } from "./ShowInvoice/Data/Data1";
import { Data2 } from "./ShowInvoice/Data/Data2";

export default function ShowInvoice() {
  const getHeadings1 = () => {
    return Object.keys(Data1[0]);
  };
  const getHeadings2 = () => {
    return Object.keys(Data2[0]);
  };
  return (
    <>
      <div className="row">
        <NavTab />
      </div>

      <div className="row">
        <div className="col-md-6 ">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Tables theadData={getHeadings1()} tbodyData={Data1} />
          </div>
        </div>

        <div className="col-md-6 ">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Tables theadData={getHeadings2()} tbodyData={Data2} />
          </div>
        </div>
      </div>
    </>
  );
}
