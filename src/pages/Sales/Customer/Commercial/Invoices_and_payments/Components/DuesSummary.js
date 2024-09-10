import React from "react";
import Tables from "../../../../../../components/Tables";



function DuesSummary() {
  const dues_summary = [
    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },

    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },


    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },



    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },



    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },


    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },



    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },



    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },

    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },



    {
      "30 days": "0",
      "60 days": "0",
      "3 Months": "0",
      "6 Months": "0",
      "1 Year": "0",
      "> 1 Year": "0",
    },
  ];

  const getHeadings = () => {
    return Object.keys(dues_summary[0]);
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div
          className="table-data"
          style={{ height: "350px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings()} tbodyData={dues_summary} />
        </div>
      </div>
    </div>
  );

}



export default DuesSummary;

