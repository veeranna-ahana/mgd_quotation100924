import React from "react";
import Tables from "../../../../../../components/Tables";

function ReceiptsInfo() {
  const rep_info_1 = [
    {
      "Receipt No": "0001",
      Date: "1/1/2023",
      Type: "sdtghui",
      Amount: "12000",
      "On Account": "23434",
      Description: "sdfghjklxcvb",
    },

    {
      "Receipt No": "9807",
      Date: "9/1/2023",
      Type: "hytriop",
      Amount: "1000",
      "On Account": "98765",
      Description: "hgfklop",
    },

    {
      "Receipt No": "8970",
      Date: "8/1/2023",
      Type: "yghjkio",
      Amount: "10000",
      "On Account": "87654",
      Description: "qwefgnkl",
    },

    {
      "Receipt No": "0086",
      Date: "02/1/2023",
      Type: "hgfde",
      Amount: "1000",
      "On Account": "65497",
      Description: "fdjkiopm",
    },

    {
      "Receipt No": "7689",
      Date: "7/1/2023",
      Type: "hgfrop",
      Amount: "yuiop",
      "On Account": "76549",
      Description: "guwyetgbdd",
    },

    {
      "Receipt No": "8765",
      Date: "8/2/2023",
      Type: "hgfdy",
      Amount: "6000",
      "On Account": "76543",
      Description: "wedrftgyhjn",
    },
  ];



  const rep_info_2 = [
    {
      "Inv No": "1234",
      "Inv Date": "2/2/2023",
      Type: "dfghjk",
      "Inv Amount": "200000",
      Received: "150000",
      "Received No": "5678",
    },

    {
      "Inv No": "98777",
      "Inv Date": "8/1/2023",
      Type: "hgoipw",
      "Inv Amount": "5000",
      Received: "1000",
      "Received No": "8765",
    },

    {
      "Inv No": "876542",
      "Inv Date": "1/1/2023",
      Type: "kilopd",
      "Inv Amount": "200000",
      Received: "10000",
      "Received No": "8765",
    },


    {
      "Inv No": "234567",
      "Inv Date": "8/2/2023",
      Type: "liophe",
      "Inv Amount": "98777",
      Received: "6540",
      "Received No": "0977",
    },

    {
      "Inv No": "98765",
      "Inv Date": "21/2/2023",
      Type: "hfdjk",
      "Inv Amount": "30000",
      Received: "25000",
      "Received No": "8970",
    },


    {
      "Inv No": "98765",
      "Inv Date": "15/1/2023",
      Type: "ewrelk",
      "Inv Amount": "70000",
      Received: "12000",
      "Received No": "1209",
    },

  ];



  const getHeadings1 = () => {
    return Object.keys(rep_info_1[0]);
  };



  const getHeadings2 = () => {
    return Object.keys(rep_info_2[0]);
  };

  return (

    <div className="row">
      <div className="col-md-6 col-sm-12">
        <div
          className="table-data"
          style={{ height: "250px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings1()} tbodyData={rep_info_1} />
        </div>
      </div>

      <div className="col-md-6 col-sm-12">

       <div
          className="table-data"
          style={{ height: "250px", overflowY: "scroll" }}
        >
          <Tables theadData={getHeadings2()} tbodyData={rep_info_2} />
        </div>
      </div>
    </div>
  );

}



export default ReceiptsInfo;

