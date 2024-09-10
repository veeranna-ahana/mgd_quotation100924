import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

export default function ImportDrawings({ openImportDwgs, setOpenImportDwgs }) {

  let [thickness, setThickness] = useState("");
  let [procdata, setProcdata] = useState([]);
  let [mtrldata, setMtrlData] = useState([]);
  let [material, setMaterial] = useState([]);
  let [grade, setGrade] = useState("");
  let [mtrlcode, setMtrlCode] = useState([]);
  let [gradeid, setGradeID] = useState("");

  let [processdescription, setProcessDescription] = useState("");
  let [operation, setOperation] = useState("");
  let [specificwt, setSpecificWt] = useState("");
  let [lengthofcut, setLengthOfCut] = useState("");
  let [noofpierces, setNoOfPierces] = useState("");
  let [partnetarea, setPartNetArea] = useState("");
  let [outOpen, setOutOpen] = useState("");
  let [complexity, setComplexity] = useState("");
  let [hasOpenContour, setHasOpenContour] = useState("");
  let [partNetWeight, setPartNetWeight] = useState("");
  let [partOutArea, setPartOutArea] = useState("");
  let [partOutWeight, setPartOutWeight] = useState("");
  let [rectarea, setRectArea] = useState("");
  let [rectWeight, setRectWeight] = useState("");


  let [ttypedata, setTTypedata] = useState([]);
  let [mtrlgrdsdata, setMtrlGradedata] = useState([]);
  let [insplvldata, setInspLvldata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      getRequest(endpoints.getMaterials, (mdata) => {
        setMtrlData(mdata);
      });
      getRequest(endpoints.getProcessLists, (pdata) => {
        setProcdata(pdata);
      });

      getRequest(endpoints.getToleranceTypes, (ttdata) => {
        setTTypedata(ttdata);
      });
      getRequest(endpoints.getInspectionLevels, (ildata) => {
        setInspLvldata(ildata);
      });
    }
    fetchData();

  })

  const handleClose = () => {
    setOpenImportDwgs(false);
  }

  let selectProc = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let proc;
    for (let i = 0; i < procdata.length; i++) {
      if (procdata[i]["ProcessDescription"] === e.target.value) {
        setProcessDescription(e.target.value);
        proc = procdata[i];
        break;
      }
    }
    setOperation(e.target.value);
  }

  let selectMtrl = (e) => {
    //  e.preventDefault();
    let mtrl;
    for (let i = 0; i < mtrldata.length; i++) {
      if (mtrldata[i]["Mtrl_Code"] === e.target.value) {
        setMtrlCode(e.target.value);
        mtrl = mtrldata[i];
        break;
      }
    }
    setMaterial(mtrl["Mtrl_Type"])
    setGradeID(mtrl["MtrlGradeID"])
    setThickness(mtrl["Thickness"])

    postRequest(endpoints.getMtrlGrade, { grdid: mtrl["MtrlGradeID"] }, (resp) => {
      setGrade(resp[0]["Grade"])
      for (let i = 0; i < resp.length; i++) {
        if ((resp[i]["Material"] == mtrl["Mtrl_Type"]) && (resp[i]["Thickness"] == mtrl["Thickness"])) {
          locCalc(window.dxffile, mtrl["Mtrl_Type"], resp[i]["Grade"], mtrl["Thickness"], resp[i]["Specific_Wt"], (output) => { });
          // locCalc(window.dxffile, mtrl["Mtrl_Type"], resp[i]["Grade"], mtrl["Thickness"], (output) => { });
        }

      }
      //     setSpecificWt(resp[0]["Specific_Wt"])
      //     locCalc(window.dxffile, mtrl["Mtrl_Type"], resp[0]["Grade"], mtrl["Thickness"], (output) => { });
    });
  }

  let locCalc = async (drwfile, material, grade, thickness, cb) => {
    // let loc = window.location.pathname;

    // console.log("Getting Sp Wt");
    postRequest(endpoints.getMaterialSpWt, { material, grade }, async (resp) => {
      //     console.log("Specific Wt : ");
      //     console.log(resp1[0]);
      //     console.log(resp1[0].Specific_Wt);
      //     console.log(drwfile);
      const formData = new FormData();
      //  window.dxffiles.forEach(async (dfile) => {
      formData.append("file", drwfile); //files[i]);
      formData.append("thickness", thickness);
      formData.append("specficWeight", resp[0].Specific_Wt);
      setSpecificWt(resp[0].Specific_Wt);
      console.log("Sending to Service");
      // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
      const getCalcReq = await fetch('http://localhost:21341/getCalc', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });
      const res = await getCalcReq.json();
      //   const data = await res.json();
      //    console.log("Get Calc Response");
      //   console.log(res.data);
      setLengthOfCut(res.data.lengthOfCut)
      setNoOfPierces(res.data.noOfPierces)
      setPartNetArea(res.data.partNetArea)
      setOutOpen(res.data.outOpen)
      setComplexity(res.data.complexity)
      setHasOpenContour(res.data.hasOpenContour)
      setPartNetWeight(res.data.partNetWeight)
      setPartOutArea(res.data.partOutArea)
      setPartOutWeight(res.data.partOutWeight)
      setRectArea(res.data.rectArea)
      setRectWeight(res.data.rectWeight)
      //  setSpecificWt(res.Specific_Wt)
      cb({
        lengthOfCut: res.data.lengthOfCut, noOfPierces: res.data.noOfPierces,
        partNetArea: res.data.partNetArea, complexity: res.data.complexity,
        hasOpenContour: res.data.hasOpenContour, outOpen: res.data.outOpen,
        partNetWeight: res.data.partNetWeight, partOutArea: res.data.partOutArea,
        partOutWeight: res.data.partOutWeight, rectArea: res.data.rectArea,
        rectWeight: res.data.rectWeight
      });
      //, spWeight: res.data.Specific_Wt
      // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode,loc }]);
    });
  }


  const onClickOK = () => {
    document.getElementById('file-selector').click();
  }

  return (
    <div>
      <Modal show={openImportDwgs} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the default parameters for Import</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-sm-12">
            <div >
              <div className="row">
                <div className="col-md-12 mb-2">
                  <label className="form-label">Material Code</label>
                  {mtrldata.length > 0 ?
                    <select className='ip-select' onChange={selectMtrl}>
                      <option value="" disabled selected>** Select **</option>
                      {mtrldata.map((mtrl) => {
                        return (
                          <option value={mtrl["Mtrl_Code"]}>{mtrl["Mtrl_Code"]}</option>
                        )
                      })}
                    </select>
                    : ""
                  }

                </div>

                <div className="col-md-12">
                  <label className="form-label">Material</label>
                  <input className='in-fields' type="text" id="material" onChange={(e) => setMaterial(e.target.value)} value={material} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Grade</label>
                  <input className='in-fields' type="text" id="grade" value={grade} />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Thickness</label>
                  <input className='in-fields' type="text" id="thickness" onChange={(e) => setThickness(e.target.value)} value={thickness} />
                </div>

                <div className="col-md-12 mb-2">
                  <label className="form-label">Process</label>
                  {procdata.length > 0 ?
                    <select className='ip-select' style={{ fontFamily: 'Roboto', fontSize: '14px', flex: 4 }} onChange={selectProc}>
                      <option value="" disabled selected>** Select **</option>
                      {procdata.map((proc) => {
                        return (
                          <option value={proc["ProcessDescription"]}>{proc["ProcessDescription"]}</option>
                        )
                      })}
                    </select>
                    : ""
                  }
                </div>
                <div className="col-md-12">
                  <label className="form-label">Quantity</label>
                  <input className='in-fields' id="quantity" type="text" />
                </div>

              </div>
              <div className='col-md-12'>
                    <label className="form-label">Select Files </label>
                    <input type="file" id="files" className='in-fields' multiple="multiple" accept=".dxf" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#2b3a55", border: "#2b3a55", width: "100px" }}
            onClick={onClickOK}>
            OK
          </Button>
          <input id='file-selector' type='file' style={{ display: "none" }}></input>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
