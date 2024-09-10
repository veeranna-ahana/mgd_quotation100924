import React, { useEffect, useState } from 'react';
//import { tcdata } from "./DataList";
import Tables from "../../../../../../components/Tables";
import Table from "react-bootstrap/Table";
import "../../../quotation.css"
import { useQuotationContext } from "../../../../../../context/QuotationContext";
import { useQuotationTandCContext } from "../../QuotationTandCContext";
import SelectTableComponent from "../Components/selectgrid";


const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

export default function TermsandCondition() {
  let { quotationtandc, setQuotationTandCState } = useQuotationTandCContext();
  let [tcdata, setTCData] = useState([]);
  let [tandcdata, setTandCdata] = useState([]);
  let [selectedtcdata, setSelectedTCData] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let { quotation, setQuotationState } = useQuotationContext();

  let [addnotes, setAddNotes] = useState(false);
  let [addnotesentry, setAddNotesEntry] = useState("");

  useEffect(() => {
    postRequest(endpoints.getTermsConditions, {}, (tdata) => {
      setTCData(tdata);
      setLoaded(true);
    });
  });

  // const getHeadings = () => {
  //   if (tcdata != null && tcdata[0] != undefined) return Object.keys(tcdata[0]);
  //   return [];
  // };

  let setHighlight = async (index, value) => {
    let olddata = selectedtcdata;
    olddata[index].highlight = value;
    setSelectedTCData(olddata);
    setQuotationTandCState(olddata);
  }

  return (
    <div className='row'>
      {/* <div className='col-md-5 col-sm-12 mt-3'> */}

      <div className='col-md-5 mb-5'>
        <div style={{ maxheight: '250px', overflowY: 'scroll' }}>
          <button className="button-style" style={{ width: '120px' }} onClick={() => setAddNotes(true)}>Add Notes</button>
          {addnotes ? <input type="text" style={{width: '400px', height:'30px', padding: '0px 0px 0px 10px' }} placeholder="Enter Notes" onChange={setAddNotesEntry} /> : ""}
          {loaded ? <SelectTableComponent tcdata={tcdata} selection={(data) => { setSelectedTCData(data) }} tablename="Terms" style={{maxHeight:'250px', overflowY: 'scroll' }} /> : ""}
        </div>
      </div>
      
      <div className='col-md-5'>
        <div style={{ overflowY: 'scroll', maxHeight: '250px' }}>
          <table striped className="table-data border ">
            <thead className="tableHeaderBGColor">
              <tr>
                <th style={{width:'15px'}}>Bold</th>
                <th style={{width:'420px'}}>Terms</th>
              </tr>
            </thead>
            <tbody>
              {selectedtcdata.length > 0 ? selectedtcdata.map((tc, id) => {
                return (
                  <tr className="custtr" key={id} onClick={() => console.log(tc)}>
                    <td className="custth" style={{ width: '60px', height: '20px' }}><input type="checkbox" id={id} onChange={(e) => { setHighlight(id, e.target.checked) }} /></td>
                    <td className="custth" style={{ width: '50px', height: '20px' }}>{tc["Terms"]}</td>
                  </tr>
                )
              }) : <tr><td colSpan={2}>No Items Selected</td></tr>}
            </tbody>
          </table>
        </div>
        <div className='col-md-2'></div>
        {/* 
        <Table bordered>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th>Select</th>
              <th>Terms</th>
            </tr>
          </thead>

          <tbody className='tablebody'>
           
            {loaded ? <SelectTableComponent tcdata={tcdata} selection={(data) => { setSelectedTCData(data) }} tablename="Terms" style={{ fontSize: '14px', maxHeight: '500px', maxWidth: '600px', overflowY: 'scroll' }} /> : ""}
          </tbody>
        </Table>

        <div className="row justify-content-end  mt-4 mb-2">
          <button className="button-style " style={{ width: "150px" }}>
            Add Notes
          </button>
        </div>

      </div>


      <div className="col-md-7 col-sm-12 mt-3">
        <div className="table-data"
          style={{ height: "800px", overflowY: "scroll" }}>
          <table style={{ border: '1px', fontfamily: 'Roboto', fontSize: '14px', width: '100%' }}>
            <thead>
              <tr style={{ fontFamily: 'Roboto', fontSize: '14px' }} className="custtr">
                <th className="custth" style={{ width: '60px', height: '20px' }}>Bold</th>
                <th className="custth" style={{ width: '60px', height: '20px' }}>Terms</th>
              </tr>
            </thead>
            <tbody>
              {selectedtcdata.length > 0 ? selectedtcdata.map((tc, id) => {
                return (
                  <tr className="custtr" key={id} onClick={() => console.log(tc)}>
                    <td className="custth" style={{ width: '60px', height: '20px' }}><input type="checkbox" id={id} onChange={(e) => { setHighlight(id, e.target.checked) }} /></td>
                    <td className="custth" style={{ width: '300px', height: '20px' }}>{tc["Terms"]}</td>
                  </tr>
                )
              }) : <tr><td colSpan={2}>No Items Selected</td></tr>}
            </tbody>
            </table>*/}



        {/*  {selectedtcdata.length > 0 ? selectedtcdata.map((tc, id) => {
            return (
              <tr className="custtr" key={id} onClick={() => console.log(tc)}>
                <td className="custth" style={{ width: '60px', height: '20px' }}><input type="checkbox" id={id} onChange={(e) => { setHighlight(id, e.target.checked) }} /></td>
                <td className="custth" style={{ width: '300px', height: '20px' }}>{tc["Terms"]}</td>
              </tr>
            )
          }) : <tr><td colSpan={2}>No Items Selected</td></tr>} */}
      </div>
    
    </div >

  )
}
