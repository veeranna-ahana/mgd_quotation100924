import React from "react";
import Tables from "../../../../../../components/Tables";
import { data3 } from "./data3";

function MaterialStockPositionTab() {
  // for accessing object keys
  const getHeadings = () => {
    return Object.keys(data3[0]);
  };

  return (
    <div
      className="mat-stockposi-table table-data"
      style={{ height: "300px", overflowY: "scroll" }}
    >
      <Tables theadData={getHeadings()} tbodyData={data3} />
    </div>
  );
}

export default MaterialStockPositionTab;
