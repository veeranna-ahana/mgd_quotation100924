import React from "react";
import Tables from "../../../../../components/Tables";

import { SDData } from "./Data/SDData";

export default function ScheduleDetails() {
  const getHeadings = () => {
    return Object.keys(SDData[0]);
  };

  //   const getHeadings2 = () => {
  //     return Object.keys(ILData2[0]);
  //   };

  return (
    <>
      <div className="row  ">
        <div className="col-md-12 ">
          <div style={{ height: "300px", overflowY: "scroll" }}>
            <Tables theadData={getHeadings()} tbodyData={SDData} />
          </div>
        </div>

        {/* <div className="col-md-4 ">
          <div>
            <Tables theadData={getHeadings2()} tbodyData={ILData2} />
          </div>
        </div> */}
      </div>
    </>
  );
}
