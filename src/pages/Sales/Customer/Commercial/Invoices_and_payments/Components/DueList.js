import React from "react";
import Tables from "../../../../../../components/Tables";



function DueList() {
  const due_list = [
    {
      "Inv Type": "ABCDEFG",
      "PN No": "1234567",
      "Inv No": "1234",
      Date: "1/1/2023",
      "Inv Value": "123",
      "Payment Reed": "12345",
      Balance: "9000",
      "Payment Date": "5/5/2023",
      "Due Days": "100",
    },

    {
      "Inv Type": "KJLOPDS",
      "PN No": "908765",
      "Inv No": "1111",
      Date: "3/1/2023",
      "Inv Value": "111",
      "Payment Reed": "12345",
      Balance: "8000",
      "Payment Date": "10/5/2023",
      "Due Days": "200",
    },

    {
      "Inv Type": "QWERTI",
      "PN No": "987654",
      "Inv No": "1230",
      Date: "5/1/2023",
      "Inv Value": "654",
      "Payment Reed": "78951",
      Balance: "2000",
      "Payment Date": "12/5/2023",
      "Due Days": "100",
    },

    {
      "Inv Type": "DFGHJKI",
      "PN No": "876596",
      "Inv No": "1641",
      Date: "18/1/2023",
      "Inv Value": "432",
      "Payment Reed": "87654",
      Balance: "4000",
      "Payment Date": "7/5/2023",
      "Due Days": "60",
    },

    {
      "Inv Type": "WERTGHA",
      "PN No": "9865310",
      "Inv No": "4567",
      Date: "1/7/2023",
      "Inv Value": "762",
      "Payment Reed": "07568",
      Balance: "5000",
      "Payment Date": "11/5/2023",
      "Due Days": "200",
    },

    {
      "Inv Type": "SADSFSGD",
      "PN No": "8790654",
      "Inv No": "1234",
      Date: "9/1/2023",
      "Inv Value": "435",
      "Payment Reed": "87654",
      Balance: "1000",
      "Payment Date": "13/2/2023",
      "Due Days": "90",
    },

    {

      "Inv Type": "YHJKLIO",
      "PN No": "987623",
      "Inv No": "9093",
      Date: "2/1/2023",
      "Inv Value": "123",
      "Payment Reed": "87654",
      Balance: "7000",
      "Payment Date": "9/5/2023",
      "Due Days": "100",
    },

    {
      "Inv Type": "AHYDEO",
      "PN No": "09856782",
      "Inv No": "1234",
      Date: "1/1/2023",
      "Inv Value": "123",
      "Payment Reed": "12345",
      Balance: "9000",
      "Payment Date": "5/5/2023",
      "Due Days": "60",
    },

    {
      "Inv Type": "GTRYUIOP",
      "PN No": "434678900",
      "Inv No": "9876",
      Date: "2/2/2023",
      "Inv Value": "876",
      "Payment Reed": "1234",
      Balance: "5000",
      "Payment Date": "5/5/2023",
      "Due Days": "60",
    },

  ];


  const getHeadings = () => {
    return Object.keys(due_list[0]);
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div
          className="table-data"
          style={{ height: "350px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings()} tbodyData={due_list} />
        </div>
      </div>
    </div>
  );

}



export default DueList;

