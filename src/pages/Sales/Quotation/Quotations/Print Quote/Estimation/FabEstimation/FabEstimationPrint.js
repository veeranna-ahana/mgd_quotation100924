import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import FabEstimationTable from "../FabEstimation/FabEstimationTable"
//"../Fabrication/FabEstimationTable";

//import { useLocation } from 'react-router-dom';

const { getRequest, postRequest } = require("../../../../../../api/apiinstance");
  //"../../../../../api/apiinstance");
const { endpoints } = require("../../../../../../api/constants");

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

export default function FabEstimationPrint({ FabEstData }) {
    // const location = useLocation();
  //API 
 
  let [newData, setNewdata] = useState({});

  // const getFabEstimatePrint = () => {
  //   postRequest(endpoints.getQtnPrintDetails, { qtnno: QtnNo }, async (qtnidchk) => {
  //     console.log(qtnidchk);
  //     setNewdata(qtnidchk);
  //   });
  // }
console.log("FabEstData",FabEstData);
  useEffect(() => {
    setNewdata(FabEstData);
  }, []);

  return (

    <Fragment>
      <PDFViewer width="1200" height="600" filename="somename.pdf">
        {Object.keys(newData).length > 0 &&
          <FabEstimationTable //data={data}
            newData={newData}
          />
        }
      </PDFViewer>
    </Fragment>
  );

}
