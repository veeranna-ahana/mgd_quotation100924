import React from "react";
import Tables from "../../../../../../components/Tables";

function PartPaymentReceived() {
  const part_payment = [
    {
      "Inv Type": "ASWERTY",
      "PN No": "1234567",
      "Inv No": "1234",
      Date: "1/1/2023",
      "PO No": "1234567",
      "Inv Value": "123",
      "Payment Reed": "12345",
      Balance: "9000",
      "Payment Date": "5/5/2023",
    },

    {
      "Inv Type": "ASWERTY",
      "PN No": "98765432",
      "Inv No": "3456",
      Date: "9/1/2023",
      "PO No": "1234509",
      "Inv Value": "765",
      "Payment Reed": "98765",
      Balance: "8000",
      "Payment Date": "9/5/2023",
    },

    {
      "Inv Type": "GFDGGJSJ",
      "PN No": "7654389",
      "Inv No": "7654",
      Date: "8/2/2023",
      "PO No": "9876549",
      "Inv Value": "765",
      "Payment Reed": "46678",
      Balance: "6000",
      "Payment Date": "9/10/2023",
    },

    {
      "Inv Type": "MNHGFRT",
      "PN No": "9875709",
      "Inv No": "9876",
      Date: "8/1/2023",
      "PO No": "765439",
       "Inv Value": "908",
      "Payment Reed": "876589",
      Balance: "7000",
      "Payment Date": "9/4/2023",
    },

    {
      "Inv Type": "AFSDHIOP",
      "PN No": "09635522",
      "Inv No": "9876",
      Date: "3/1/2023",
      "PO No": "9873210",
      "Inv Value": "908",
      "Payment Reed": "67805",
      Balance: "7000",
      "Payment Date": "12/3/2023",
    },

    {
      "Inv Type": "SWOPIUY",
      "PN No": "87654321",
      "Inv No": "09876",
      Date: "19/1/2023",
      "PO No": "0999982",
      "Inv Value": "876",
      "Payment Reed": "09876",
      Balance: "9000",
      "Payment Date": "19/5/2023",
    },

    {
      "Inv Type": "WYJNHGOP",
      "PN No": "7654890",
      "Inv No": "7654",
      Date: "2/1/2023",
      "PO No": "1234567",
      "Inv Value": "123",
      "Payment Reed": "12345",
      Balance: "9000",
      "Payment Date": "5/5/2023",
      "Due Days": "100",
    },

    {
      "Inv Type": "JKLIUOP",
      "PN No": "9087654",
      "Inv No": "9980",
      Date: "1/1/2023",
      "PO No": "0987890",
      "Inv Value": "456",
      "Payment Reed": "9987",
      Balance: "2000",
      "Payment Date": "5/9/2023",
    },

    {
      "Inv Type": "HYUIOPKS",
      "PN No": "8987890",
      "Inv No": "2789",
      Date: "7/1/2023",
      "PO No": "89007655",
      "Inv Value": "765",
      "Payment Reed": "987654",
      Balance: "8000",
      "Payment Date": "8/3/2023",
    },
  ];

  const getHeadings = () => {
    return Object.keys(part_payment[0]);
  };

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div
          className="table-data"
          style={{ height: "350px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings()} tbodyData={part_payment} />
        </div>
      </div>
    </div>
  );

}



export default PartPaymentReceived;