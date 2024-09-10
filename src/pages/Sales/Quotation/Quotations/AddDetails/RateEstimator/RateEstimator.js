import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";

import { toast, ToastContainer } from "react-toastify";
import TaskList from "./Components/TaskList";
import { useQuotationContext } from "../../../../../../context/QuotationContext";
import { Helper } from 'dxf';
import AlertModal from "../../../../../../pages/components/alert";
import { Typeahead } from "react-bootstrap-typeahead";
import { Next } from "react-bootstrap/esm/PageItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment, { fn } from "moment";
import ModalPrintEstimation from "../../Print Quote/Estimation/Estimate/PrintEstimate";
import { useRateEstimatorContext } from "../../../../../../context/RateEstimatorContext";
//import { parse } from "path";

//import PrfModalPrintQuotation from "../Print Quote/Quotation/Profile/ProfilePrintQuotation";


const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

function arrayBufferToString(buffer, encoding, callback) {
  var blob = new Blob([buffer], { type: 'text/plain' });
  var reader = new FileReader();
  reader.onload = function (evt) { callback(evt.target.result); };
  reader.readAsText(blob, encoding);
}

export default function RateEstimator() {
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let [openEstPrintModal, setOpenEstPrintModal] = useState(false);

  let [profilealertModal, setProfileAlertModal] = useState(false);

  let [impratesalertModal, setImpRatesAlertModal] = useState(false);
  let [alertModal, setAlertModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { profileList, setProfileList } = useRateEstimatorContext();
  const { taskList, setTaskList } = useRateEstimatorContext();
  const { esttaskList, setEstTaskList } = useRateEstimatorContext();

  let [selectedDwgId, setSelectedDwgId] = useState("");
  let [mtrlcode, setMtrlCode] = useState("");
  let [tolerance, setTolerance] = useState("Standard(+/-0.1mm)- 100 Microns");
  let [gradeid, setGradeID] = useState("");
  //let [completetaskdets, setCompleteTaskDets] = useState([]);
  let [createbtn, setCreateBtn] = useState(true);
  let [estimationbtn, setEstimationBtn] = useState(true);
  let [rereadbtn, setReReadBtn] = useState(true);
  let [taskratesbtn, setTaskRatesBtn] = useState(false);
  let [estprintbtn, setEstPrintBtn] = useState(false);

  let [performedgetestimate, setPerformedGetEstimate] = useState(false);
  //let [savebtn, setSaveBtn] = useState(true);
  let [updatebtn, setUpdateBtn] = useState(true);
  let [deletebtn, setDeleteBtn] = useState(true);
  let [createtaskbtn, setCreateTaskBtn] = useState(false);
  let [tasklisttab, setTaskListTab] = useState(true);


  let [inspectionlevel, setInspectionLevel] = useState("Insp1");
  let [operation, setOperation] = useState("");
  let [specificwt, setSpecificWt] = useState(0.000);
  let [qtnformt, setQtnFormt] = useState("");
  let [qtnstatus, setQtnStatus] = useState([]);
  let [custdwgfiles, setCustDwgFiles] = useState([]);
  let [quotationNo, setQuotationNo] = useState("");
  let [enquiryDate, setEnquiryDate] = useState("");
  let [Task_Mtrl_Handling_Charge, setTask_Mtrl_Handling_Charge] = useState(0);
  let [matrldata, setMatrlData] = useState([]);

  // let [qtnProfileData, setQtnProfileData] = useState([]);
  let [lengthOfCut, setLengthOfCut] = useState(0);
  let [noOfPierces, setNoofPierces] = useState(0);
  let [dxffiledata, setDxfFileData] = useState("");
  let [tasklistdata, setTasklistdata] = useState([]);
  let [taskgrpData, setTaskGrpData] = useState([]);
  let [taskdetdata, setTaskDetData] = useState([]);
  let [taskdetailsdata, setTaskDetailsData] = useState([]);
  let [jwchrg, setJWChrg] = useState(0);
  let [estdata, setEstData] = useState([]);

  let [mtrldata, setMtrldata] = useState([]);
  let [procdata, setProcdata] = useState([]);
  let [ttypedata, setTTypedata] = useState([]);
  let [mtrlgrdsdata, setMtrlGradedata] = useState([]);
  let [insplvldata, setInspLvldata] = useState([]);
  let [thickness, setThickness] = useState(0);
  let [grade, setGrade] = useState("");
  let [material, setMaterial] = useState("");
  let { quotation, setQuotationState } = useQuotationContext();
  let [dwgname, setDwgName] = useState("");

  let [rectArea, setRectArea] = useState(0);
  let [rectweight, setRectWeight] = useState(0);
  let [partoutarea, setPartOutArea] = useState(0);
  let [partoutweight, setPartOutWeight] = useState(0);
  let [hasopencontour, setHasOpenContour] = useState(false);
  let [partnetarea, setPartNetArea] = useState(0);
  let [partnetweight, setPartNetWeight] = useState(0);
  let [outopen, setOutOpen] = useState(0);
  let [complexity, setComplexity] = useState(0);
  let [processdescription, setProcessDescription] = useState("");
  let [scount, setSCount] = useState(0);

  //Task List
  let [qtntasklist, setQtnTaskList] = useState([]);
  let [taskdetails, setTaskDetails] = useState([]);
  let [taskAreaWightData, setTaskAreaWightData] = useState([]);
  let [permtrRate, setPerMtrRate] = useState([]);
  let [perkgRate, setPerKgRate] = useState([]);
  let [utilisationpercent, setUtilisationPercent] = useState(0);
  let [scrappercent, setScrapPercent] = useState(0);
  let [nestcount, setNestCount] = useState([]);
  let [dwgstonest, setDwgsToNest] = useState([]);
  let [dwgsnested, setDwgsNested] = useState([]);
  let [partstonest, setPartsToNest] = useState([]);
  let [partsnested, setPartsNested] = useState([]);
  let [estprintdata, setEstPrintData] = useState([]);
  let [taskloc, setTaskLOC] = useState([]);
  let [taskpierces, setTaskPierces] = useState([]);
  let [jwvalue, setJWValue] = useState(0.00);
  let [jwtarget, setJWTarget] = useState(0);
  let [materialvalue, setMaterialValue] = useState(0.00);
  let [materialtarget, setMaterialTarget] = useState([]);
  let [decShLength, setDecShLength] = useState(2500);
  let [decShWidth, setDecShWidth] = useState(1250);
  let [taskqty, setTaskQty] = useState(0);
  let [selectedTaskId, setSelectedTaskId] = useState("");

  let [sumqty, setSumQty] = useState({});
  let [tskNetArea, setTskNetArea] = useState({});
  let [taskNtWt, setTaskNtWt] = useState({});
  let [tskRectArea, setTskRectArea] = useState({});
  let [tskMtrlArea, setTskMtrlArea] = useState({});
  let [tskMtrlWt, setTskMtrlWt] = useState({});
  let [CountOfDwgName, setCountOfDwgName] = useState({});
  let [utilpercentage, setUtilPercentage] = useState({});
  let [scrappercentage, setScrapPercentage] = useState({});
  let [programmingchg, setProgrammingChg] = useState({});
  let [task_perkg_cost, setTask_perkg_cost] = useState({});
  let [tpermtrRate, setTPerMtrRate] = useState({});
  // let [tasksetuploadingchg, setTaskSetupLoadingChg] = useState({});
  let [materialhandlingchg, setMaterialHandlingChg] = useState({});
  let [Task_Basic_Cutting_Costchg, setTask_Basic_Cutting_CostChg] = useState({});
  let [jwchargeschg, setJWChargesChg] = useState({});
  let [materialchargeschg, setMaterialChargesChg] = useState({});
  let [taskdwings, setTaskDwings] = useState({});
  // let [decpermtrRate, setDecPerMtrRate] = useState({});
  // let [decPierceRate, setDecPierceRate] = useState({});

  let [taskno, setTaskNo] = useState(0);
  let [taskNetWt, setTaskNetWt] = useState(0);
  let [taskRectWeight, setTaskRectWeight] = useState(0);
  let [nooftasks, setNoOfTasks] = useState(0);
  let [taskselectedid, setTaskSelectedId] = useState("");
  let [Task_Qtn_JW_Rate, setTask_Qtn_JW_Rate] = useState(0);
  let [Task_Mtrl_Cost, setTask_Mtrl_Cost] = useState(0.00);
  let [programming, setProgramming] = useState(0.00);
  let [tasksetuploading, setTaskSetupLoading] = useState(0.00);
  let [materialhandling, setMaterialHandling] = useState(0.00);
  let [Task_Basic_Cutting_Cost, setTask_Basic_Cutting_Cost] = useState(0.00);
  let [jwcharges, setJWCharges] = useState(0.00);
  let [materialcharges, setMaterialCharges] = useState(0.00);
  let [taskdwgs, setTaskDwgs] = useState(0);

  let [mtrlcost, setMtrlCost] = useState(0.00);
  let [jwcost, setJWCost] = useState(0.00);
  let [quantity, setQuantity] = useState(0);
  let [unitrate, setUnitRate] = useState(0.00);


  let [decpermtrRate, setDecPerMtrRate] = useState("");
  let [decPierceRate, setDecPierceRate] = useState(0.00);
  let [mchsetuprate, setMchSetUpRate] = useState(0);
  let [decSheetLoadingRate, setDecSheetLoadingRate] = useState(0.00);
  let [decMtrl_HandlingRate, setDecMtrl_HandlingRate] = useState(0.00);
  let [mtrlsalerate, setMtrlSaleRate] = useState(0);

  let [decMaterialRate, setDecMaterialRate] = useState(0.00);
  let [decLengthRate, setDecLengthRate] = useState(0.00);
  let [decTaskSetupRate, setDecTaskSetupRate] = useState(0.00);
  let [decContourRate, setDecContourRate] = useState(0.00);
  let [decPartRate, setDecPartRate] = useState(0.00);
  let [decDwgRate, setDecDwgRate] = useState(0.00);
  let [decNestRate, setDecNestRate] = useState(0.00);
  let [decTaskRate, setDecTaskRate] = useState(0.00);
  let [decProgramCharge, setDecProgramCharge] = useState(0.00);
  let [dblThickness, setDblThickness] = useState(0.00);
  let progcost = 0;
  let [tNetWt, setTNetWt] = useState(0);
  let [tRectWt, setTRectWt] = useState(0);

  const [selected, setSelected] = useState([]);

  // Quotation Data
  let [qtndata, setQtndata] = useState([]);
  let [customer, setcustomer] = useState("");
  let [enquiryRef, setEnquiryRef] = useState("");
  let [contact, setContact] = useState([]);
  let [quotationType, setQuotationType] = useState([]);
  let [qtnupd, setQtnUpd] = useState("");

  let [key1, setKey1] = useState("");
  let [key2, setKey2] = useState("");

  //Task Rates
  let [taskRateLOC, setTaskRateLOC] = useState(0);
  let [taskRateHoles, setTaskRateHoles] = useState(0);
  let [TaskRate, setTaskRate] = useState(0);
  let [taskProgrammingCharge, setTaskProgrammingCharge] = useState(0);
  let [taskPartArea, setTaskPartArea] = useState(0);
  let [bs_taskparts, setBS_TaskParts] = useState([]);
  let [recalcscheme, setReCalcScheme] = useState("Default");
  let [taskMtrlArea, setTaskMtrlArea] = useState(0);
  let [taskMtrlWeight, setTaskMtrlWeight] = useState(0);
  let [taskJobWorkCost, setTaskJobWorkCost] = useState(0);
  let [tasksetuprate, setTaskSetupRate] = useState(0);
  let [tasksheethandlingrate, setTaskSheetHandlingRate] = useState(0);
  let [taskmtrlhandlingrate, setTaskMtrlHandlingRate] = useState(0);
  // let [selectedtolerance, setSelectedTolerance] = useState("");

  //*******   button status ****** */
  let [firstbuttontext, setFirstButtonText] = useState("");
  let [importdwgbtn, setImportDwgBtn] = useState(false);

  async function dxfupload(files, destPath, response) {
 //   console.log("DXF Upload files path : " + destPath);
    const data = new FormData();
 //   console.log(files);
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }
  //  console.log(data);
    let API = "http://localhost:4001";
    const rawResponse = await fetch(`${API}/file/uploaddxf`, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        "destinationPath": destPath
        // 'Content-Type': 'multipart/form-data'
      },
      body: data,
    });
    const content = await rawResponse.json();
    response(content);
  }

  useEffect(() => {
    console.log(quotation);
    setQtnUpd(searchParams.get("qtnupdate"));

    async function fetchData() {
      await postRequest(endpoints.getMaterials, {}, (mdata) => {
        console.log(mdata);
        setMtrldata(mdata);
      });

      await getRequest(endpoints.getProcessLists, (pdata) => {
        console.log(pdata);
        setProcdata(pdata);
      });

      await getRequest(endpoints.getToleranceTypes, async (ttdata) => {
        setTTypedata(ttdata);
        tolerance = ttdata[4]["ToleranceType"];
        setTolerance(tolerance);
        setTolerance("Standard(+/-0.1mm)- 100 Microns");
      });

      await getRequest(endpoints.getInspectionLevels, async (ildata) => {
        console.log(ildata);
        setInspLvldata(ildata);
        setInspectionLevel(ildata[1]["InspLevel"]);
        setInspectionLevel("Insp1");
      });

      await postRequest(endpoints.getMtrlGrades, {}, async (mgdata) => {
        setMtrlGradedata(mgdata);
      });

      // Task List Details
      // await postRequest(endpoints.getTaskListData, { QtnNo: quotation['qtnno'] }, async (tldata) => {
      //   console.log(tldata);
      //   setTasklistdata(tldata);
      // });
    }
    fetchData();


    setQtndata(quotation);
    setContact(quotation["contact"]);
    //setStatus(quotation["Status"]);
    setQtnStatus(quotation["qtnStatus"]);
    setcustomer(quotation["customerName"]);
    setQuotationType(quotation["qtntype"]);
    if (quotation["qtnno"] != null) {
      setQuotationNo(quotation['qtnno'])
    } else if (quotation["quoteno"] != null) {
      setQuotationNo(quotation['quoteno'].replaceAll("_", "/"));
    }
    setQtnStatus(quotation["qtnstatus"]);
    console.log(quotation["qtntype"]);
    setEnquiryDate(quotation["enquiryDate"]);
    setEnquiryRef(quotation["enquiryRef"]);
    setQtnFormt(quotation["qtnformat"]);

    if (qtnstatus === "Qtn Sent") {
      setImportDwgBtn(true);
    }
    console.log(esttaskList);
    setTasklistdata(esttaskList);
  }, []);

  const handleEstClose = () => {
    setShow(false);

  }


  const importdrawings = async (e) => {
    e.preventDefault();
    if (firstbuttontext === "Yes") {
      setProfileList([]);
      setFirstButtonText("");
    }

    setShow(true);
    console.log("Import Drawings");
    // console.log(e.target.elements.mtrlcode.value)
    console.log(e.target.elements.material.value);
    let materialcode = "";
    let material = "";
    let grade = "";
    let thickness = "";
    let process = "";
    let quantity = "";
    let files = "";
    let specficWeight = 0.000;
    // setQtnProfileData([]);
    //console.log(document.getElementById("mtrlcode").value);
    materialcode = mtrlcode; // e.target.elements.mtrlcode.value;
    material = e.target.elements.material.value;
    grade = e.target.elements.grade.value;
    thickness = e.target.elements.thickness.value;

    await postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: mtrlcode }, (mdata) => {
      console.log(mdata);
      specficWeight = mdata[0]["Specific_Wt"];

    });

    // console.log("Process : "+processdescription);
    // console.log("Process : "+operation);
    process = operation; //processdescription; //e.target.elements.processdescription.value;
    quantity = e.target.elements.quantity.value;
    files = e.target.elements.files.files;

    setUpdateBtn(false);
    setDeleteBtn(false);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      let drwfname = files[i];

      console.log(drwfname);
      locCalc(drwfname, material, grade, thickness, (output) => {
        console.log(output);


        // setQtnProfileData((olddata) => [...olddata, {
        //   file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut, noOfPierces: output.noOfPierces,
        //   partNetArea: output.partNetArea, complexity: output.complexity, hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
        //   partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
        // }]);
        //    console.log("Qtn Profile Data : ", typeof profileList);

        let olddata = Object.entries(profileList).map(([key, value]) => ({ key, value }));
        //  let olddata = [...profileList];

        console.log("Old Data : " + olddata);
        if (olddata === null || olddata === undefined) {
          // Handle the case where olddata is null
          return;
        } else {
          // setQtnProfileData((olddata) => {
          //   // Append to existing olddata
          //   return [...olddata, {
          //     file: files[i],
          //     operation: process,
          //     material,
          //     grade,
          //     thickness,
          //     quantity,
          //     mtrlcode,
          //     lengthOfCut: output.lengthOfCut,
          //     noOfPierces: output.noOfPierces, // ? 1 : 0,
          //     partNetArea: output.partNetArea,
          //     complexity: output.complexity,
          //     hasOpenContour: output.hasOpenContour,
          //     outOpen: output.outOpen,
          //     partNetWeight: output.partNetWeight,
          //     partOutArea: output.partOutArea,
          //     partOutWeight: output.partOutWeight,
          //     rectArea: output.rectArea,
          //     rectWeight: output.rectWeight,
          //     unitjobworkcost: 0,
          //     unitmtrlcost: 0
          //   }];
          // });
          setProfileList((olddata) => {
            // Append to existing olddata
            return [...olddata, {
              file: files[i],
              operation: process, material, grade,
              thickness, quantity, mtrlcode,
              lengthOfCut: output.lengthOfCut,
              noOfPierces: output.noOfPierces, // ? 1 : 0,
              partNetArea: output.partNetArea,
              complexity: output.complexity,
              hasOpenContour: output.hasOpenContour,
              outOpen: output.outOpen,
              partNetWeight: output.partNetWeight,
              partOutArea: output.partOutArea,
              partOutWeight: output.partOutWeight,
              rectArea: output.rectArea,
              rectWeight: output.rectWeight,
              unitjobworkcost: 0,
              unitmtrlcost: 0
            }];
          });
        }

      });

      console.log("Qtn Profile Data : ", profileList);
      //---------------------------------- end -----------------------------------
      // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: loccalcoutput.lengthOfCut, noOfPierces: loccalcoutput.noOfPierces }]);
    }

    let qno = quotationNo.replaceAll("/", "_");
    let month = qno.split("_")[1]
    let monthName = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

    let destPath = `\\QtnDwg\\` + monthName + "\\" + qno; //quotationNo;
    console.log("line - 599 - Destination Path : " + destPath);
    console.log(destPath);
    console.log(files);
    dxfupload(files, destPath, (res) => {
      console.log(res);
    });

    window.dxffiles = files;
    console.log(materialcode, material, grade, thickness, process, quantity, files);

    setShow(false);

  }


  let selectTType = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let ttype;
    for (let i = 0; i < ttypedata.length; i++) {
      if (ttypedata[i]["ToleranceType"] === e.target.value) {
        ttype = ttypedata[i];
        break;
      }
    }
    setTolerance(ttype["ToleranceType"])
  }

  let selectInspLvl = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let insplvl;
    console.log(insplvldata);
    for (let i = 0; i < insplvldata.length; i++) {
      if (insplvldata[i]["InspLevel"] === e.target.value) {
        insplvl = insplvldata[i];
        break;
      }
    }
    setInspectionLevel(insplvl["InspLevel"]);

  }

  // =========================  OnClick of Save Button in Qtn Profile =========================
  async function submitQtns(e) {
    //const submitQtns = async (e) => {
    //// console.log("Saving Qtn Profile Data");
    updateDwgTable(e)
    console.log(profileList);
    console.log("Saving Qtn Profile Data");
    let modqtndata = profileList.map((item) => {
      return {
        ...item,
        file: {
          name: item.file.name,
        },
      }
    });

    console.log(scount);
    console.log("Modified Qtn Data");
    console.log(modqtndata);

    postRequest(endpoints.saveProfileListdata, {
      quotationNo: quotationNo,
      qtnProfileDat: modqtndata,
      dboperntype: "Save",
      //dboperntype: scount === 0 ? "Save" : "Update",
    }, (resp) => {

      console.log(resp);
      if (resp["status"] === "Saved") {
        clearDetailsForm();
        setSCount(scount + 1);
        setTaskListTab(false);
        //  setCreateBtn(false);
        // setEstimationBtn(true);
        // setRereadBtn(true);
        // setTaskRatesBtn(true);
        // setEstPrintBtn(true);
        // setCreateTaskBtn(false);

      }

    });
    if ((modqtndata.length > 0) && (scount > 0)) {

      //  localStorage.setItem("lsProfileData", JSON.stringify(modqtndata));
      toast.success("Quotation Profile Saved Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    }
  }

  // onClick of "Update" button in "Quotation Profile" tab
  function updateDwgTable(e) {
    //async function updateDwgTable(e) {
    e.preventDefault();
    console.log("Updating Qtn Profile Data");
    console.log(profileList);
    if (selectedDwgId === null) {
      toast.warning("Please select a Drawing/Part Name to edit", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    }
    let oldrecord = "";
    if (profileList !== undefined && profileList !== null)
      oldrecord = profileList[selectedDwgId];
    //  setSaveBtn(false);
    if (oldrecord !== undefined && oldrecord !== null) {
      // let oldrecord = {};
      //let oldrecord = profileList.filter(file => file.file.name === selectedDwgId)[0];
      console.log(profileList);
      console.log(oldrecord);
      console.log(e.target.elements.grade.value);
      // oldrecord["Dwg_Name"] = e.target.elements.file.name;
      oldrecord["grade"] = e.target.elements.grade.value;
      oldrecord["material"] = e.target.elements.material.value;
      oldrecord["materialcode"] = mtrlcode;  // e.target.elements.mtrlcode.value;
      oldrecord['mtrlcode'] = mtrlcode;
      oldrecord["operation"] = operation; //e.target.elements.operation.value;
      oldrecord["quantity"] = e.target.elements.quantity.value;
      oldrecord["thickness"] = e.target.elements.thickness.value;
      oldrecord["tolerance"] = e.target.elements.tolerance.value || "";
      oldrecord["inspectionlevel"] = e.target.elements.inspectionlevel.value || "";
      oldrecord["lengthOfCut"] = e.target.elements.lengthOfCut.value || "";
      oldrecord["noOfPierces"] = e.target.elements.noOfPierces.value || "";
      oldrecord["Task_Qtn_JW_Rate"] = e.target.elements.Task_Qtn_JW_Rate.value || "";
      oldrecord["mtrlcost"] = e.target.elements.mtrlcost.value || "";
      oldrecord["unitrate"] = e.target.elements.unitrate.value || "";
      oldrecord["taskno"] = "";
      oldrecord["SumOfQty"] = 0;

      let olddata = profileList;
      olddata[selectedDwgId] = oldrecord;

      // console.log(olddata[Dwg_Name]);
      // olddata[selectedDwgId] = qtndwgdata;
      // var odata = JSON.parse(localStorage.getItem("lsProfileData"));
      // setQtnProfileData(olddata);
      setProfileList(olddata);
      //setQtnProfileData(odata);

    }
    setSelectedDwgId(null);
    //   setTasklist(true);
    clearDetailsForm();

  }

  let clearDetailsForm = () => {
    let fields = ["dwgname", "operation", "quantity", "material", "grade", "thickness", "tolerance", "inspectionlevel", "lengthOfCut", "noOfPierces", "Task_Qtn_JW_Rate", "mtrlcost", "unitrate"];
    let mtrlcode = "";
    //   let material = "";
    // let grade = "";
    // let thickness = "";
    // let tolerance = "";
    // let inspectionlevel = "";
    // let lengthOfCut = "";
    // let noOfPierces = "";
    // let Task_Qtn_JW_Rate = "";
    // let mtrlcost = "";
    // let unitrate = "";
    setThickness(0);
    setLengthOfCut(0);
    setNoofPierces(0);
    setTolerance("");
    setInspectionLevel("");
    setMtrlCode("");
    setMaterial("");
    setGrade("");


    for (let i = 0; i < fields.length; i++) {
      document.getElementById(fields[i]).value = "";

    }
  }

  let selectProc = (e) => {
    //  e.preventDefault();
    console.log(operation);
    let proc = {};
    for (let i = 0; i < procdata.length; i++) {
      //if (procdata[i]["ProcessDescription"] === e.target.value) {
      if (e.length > 0 && procdata[i]["ProcessDescription"] === e[0].ProcessDescription) {
        //setProcessDescription(e.target.value);
        //  setProcessDescription(processdescription);
        proc = procdata[i];
        break;
      }
    }
    operation = proc.ProcessDescription;
    console.log(proc.ProcessDescription);
    setOperation(proc.ProcessDescription != undefined ? proc.ProcessDescription : operation);
    setOperation(operation);
  }


  let selectedrowItem = async (item, id) => {
    //  console.log(profileList);
    setSelectedDwgId(id);
    //  console.log("Selected Item is : ", item);
    // displaydrawing(item.file)
    // window.dxffile = item.file;
    // document.getElementById("dwgname").value = item.file.name;

    console.log(operation);
    setOperation(operation);
    setProcessDescription(operation);
    setOperation(item.operation);
    setProcessDescription(item.operation);
    setGrade(item.grade);
    //  document.getElementById("operation").value = item.operation;
    document.getElementById("quantity").value = item.quantity;
    //    document.getElementById("mtrlcode").value = item.mtrlcode;
    //  document.getElementById("mtrlcode").value = item.mtrlcode;
    console.log(item);
    displaydrawing(item.file)
    window.dxffile = item.file;
    document.getElementById("dwgname").value = item.file.name;
    setMtrlCode(item.mtrlcode);
    setMaterial(item.material);
    setTolerance("Standard(+/-0.1mm)- 100 Microns");
   // setInspLvldata("Insp1");
    setInspectionLevel("Insp1");
    // console.log(tolerance);
    // console.log(item.tolerance);
    // console.log(inspectionlevel);
    //  document.getElementById("material").value = item.material;
    document.getElementById("operation").value = item.operation;
    document.getElementById("grade").value = item.grade;
    document.getElementById("thickness").value = item.thickness;
    document.getElementById("tolerance").value = tolerance;
    document.getElementById("inspectionlevel").value = inspectionlevel;

    //  console.log(tolerance);

    // setMtrlCode(item.mtrlcode);
    setThickness(item.thickness)
    setLengthOfCut(item.lengthOfCut)
    setNoofPierces(item.noOfPierces)
    //  setTolerance(item.tolerance)
    // setInspectionLevel(item.inspectionlevel)
    //  setTolerance("Standard(+/-0.1mm)- 100 Microns");
    //  setInspectionLevel("Insp1");
  }


  // let selectMtrl = (e) => {
  //   //  e.preventDefault();
  //   console.log("Select Material" + e.target.value);
  //   setMtrlCode(e.target.value);
  //   postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: e.target.value }, (mtrldata) => {
  //     if (mtrldata.length > 0) {
  //       setThickness(mtrldata[0]["Thickness"]);
  //       setGradeID(mtrldata[0]["MtrlGradeID"]);
  //       setMaterial(mtrldata[0]["Mtrl_Type"]);
  //       setGrade(mtrldata[0]["Grade"]);
  //       setSpecificWt(mtrldata[0]["Specific_Wt"]);

  //       locCalc(window.dxffile, mtrldata[0]["Mtrl_Type"], mtrldata[0]["Grade"], mtrldata[0]["Thickness"], (output) => { });
  //     }
  //   })

  // }

  let selectMtrl = async (e) => {
    //   e.preventDefault();
    let mtrl = {};
    for (let i = 0; i < mtrldata.length; i++) {
      if (e.length > 0 && mtrldata[i]["Mtrl_Code"] === e[0].Mtrl_Code) {
        mtrl = mtrldata[i];
        break;
      }
    }
    setMtrlCode(mtrl.Mtrl_Code != undefined ? mtrl.Mtrl_Code : "");

    postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: mtrl.Mtrl_Code }, (mtrldata) => {
      if (mtrldata.length > 0) {
        setMtrlCode(mtrldata[0]["Mtrl_Code"]);
        setMaterial(mtrldata[0]["Mtrl_Type"]);
        setThickness(mtrldata[0]["Thickness"]);
        setGradeID(mtrldata[0]["MtrlGradeID"]);
        //  setMaterial(mtrldata[0]["Mtrl_Type"]);
        setGrade(mtrldata[0]["Grade"]);
        setSpecificWt(mtrldata[0]["Specific_Wt"]);

      }
    })

  }

  let chosenmaterial = (e) => {
    console.log("Chosen Material : " + e.target.value);
    setMtrlCode(e.target.value);
    postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: e.target.value }, (mtrldata) => {
      setMaterial(mtrldata[0]["Mtrl_Type"]);
      setThickness(mtrldata[0]["Thickness"]);
      setGradeID(mtrldata[0]["MtrlGradeID"]);
      setGrade(mtrldata[0]["Grade"]);
      setSpecificWt(mtrldata[0]["Specific_Wt"]);
    });

  }

  let chosenprocess = (e) => {
    // console.log(e);
    // console.log(operation);
    // console.log("Chosen Process : " + e.target.value);
    setProcessDescription(e.target.value);
    setOperation(e.target.value);
    setTolerance("Standard(+/-0.1mm)- 100 Microns");
    setInspectionLevel("Insp1");
  }

  let locCalc = async (drwfile, material, grade, thickness, cb) => {

    const formData = new FormData();
    //  window.dxffiles.forEach(async (dfile) => {
    formData.append("file", drwfile); //files[i]);
    formData.append("thickness", thickness);
    formData.append("specficWeight", specificwt);      // resp[0].Specific_Wt);

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
    setLengthOfCut(res.data.lengthOfCut)
    setNoofPierces(res.data.noOfPierces)
    setPartNetArea(res.data.partNetArea)
    setOutOpen(res.data.outOpen)
    setComplexity(res.data.complexity)
    setHasOpenContour(res.data.hasOpenContour)
    setPartNetWeight(res.data.partNetWeight)
    setPartOutArea(res.data.partOutArea)
    setPartOutWeight(res.data.partOutWeight)
    setRectArea(res.data.rectArea)
    setRectWeight(res.data.rectWeight)

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
    //});
    console.log("Complexity : " + complexity);
  }



  const drawSvg = (text) => {
    // console.log(text);
    setDxfFileData(text);
    //   console.log(String(text));
    const helper = new Helper(text);
    let svg = helper.toSVG();
    let svgContainer = document.getElementById("dxf-content-container");
    svgContainer.innerHTML = svg;
  }

  let displaydrawing = (file) => {
    let reader = new FileReader();
    reader.onload = function (event) {
      let text = event.target.result;
      drawSvg(text);
    }
    //  reader.readAsText(file.asInstanceOf[Blob]);
    reader.readAsText(file);
  }

  let deleteSelected = async () => {
    let prfdata = [];
    await postRequest(endpoints.getProfileDetbyQtnNo, { qtnNo: quotationNo }, (pdata) => {
      console.log(pdata);
      prfdata = pdata;
    });
    console.log(prfdata);
    if ((prfdata.length > 0) && (prfdata[0]['Unit_JobWork_Cost'] > 0)) {
      toast.error("Cannot delete the Drawing as it has been used in Estimation", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    }
    let tdata = [...profileList];
    tdata.splice(selectedDwgId, 1);
    // setQtnProfileData(tdata);
    setProfileList(tdata);
  }



  let profilefstbtnc = () => {

    postRequest(endpoints.saveProfileListdata, { qtnNo: quotationNo, qtnProfileDat: profileList, dboperntype: "Delete" }, (estdata) => {
      console.log(estdata)
      //    alert(estdata);
      setProfileList([]);
      // setQtnProfileData([]);
      setTasklistdata([]);
      //  localStorage.removeItem('lsProfileData');
      // To Call Sigma
    });

    setProfileAlertModal(false);


    handleShow(true);
  }

  let profilesecbtnc = () => {
    setProfileAlertModal(false);


    handleShow(true);
  };

  let profilethdbtnc = () => {
    setProfileAlertModal(false);
  }

  //********************************************************** */
  // Import Rates
  //********************************************************** */
  // let impratessecbtnc = () => {
  //   setImpRatesAlertModal(false);
  // };

  // let impratesfstbtnc = () => {

  //   postRequest(endpoints.saveProfileListdata, { qtnNo: quotationNo, qtnProfileDat: profileList, dboperntype: "Delete" }, (estdata) => {
  //     console.log(estdata)
  //     //    alert(estdata);
  //     setQtnProfileData([]);
  //     setTasklistdata([]);

  //     // To Call Sigma
  //   });

  //   setImpRatesAlertModal(false);


  //   handleShow(true);
  // }

  //********************************************************** */
  // Alert Modal validations
  //********************************************************** */
  let checkNumeric = (e) => {

    switch (e.target.id) {
      case "decpermtrRate":
        if (e.target.value === "" || e.target.value === 0) {
          e.target.value = "";
          toast.error("Per Meter Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        }
        if (isNaN(e.target.value)) {
          toast.error("Per Meter Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
          e.target.value = "";
        }
        setDecPerMtrRate(e.target.value);
        break;
      case "decPierceRate":
        if (e.target.value === "" || e.target.value === 0) {
          e.target.value = "";
          toast.error("Per PierceRate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        }
        if (isNaN(e.target.value)) {
          toast.error("Per PierceRate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
          e.target.value = "";
        }
        setDecPierceRate(e.target.value);
        break;
      case "mchsetuprate":
        if (e.target.value === "" || e.target.value === 0) {
          e.target.value = "";
          toast.error("Machine Setup Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        }
        if (isNaN(e.target.value)) {
          toast.error("Machine Setup Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
          e.target.value = "";
        }
        setMchSetUpRate(e.target.value);
        break;
      case "decSheetLoadingRate":
        if (e.target.value === "" || e.target.value === 0) {
          e.target.value = "";
          toast.error("Sheet Loading Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        }
        if (isNaN(e.target.value)) {
          toast.error("Sheet Loading Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
          e.target.value = "";
        }
        setDecSheetLoadingRate(e.target.value);
        break;
      case "decMtrl_HandlingRate":
        if (e.target.value === "" || e.target.value === null || e.target.value === 0) {
          e.target.value = "";
          toast.error("Material Handling Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        }
        setDecMtrl_HandlingRate(e.target.value);
        break;
      // case "mtrlsalerate":
      //   if (quotationType === "Sales") {
      //     if (e.target.value === "" || e.target.value === 0) {
      //       e.target.value = "";
      //       toast.error("Material Sale Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
      //     }
      //     if (isNaN(e.target.value)) {
      //       toast.error("Material Sale Rate Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
      //       e.target.value = "";
      //     }
      //     setMtrlSaleRate(e.target.value);
      //   }
      //   break;
    }
  }

  const fnmtrlSaleRate = () => {
    console.log(quotationType);
    if (quotationType === "Sales") {
      if (mtrlsalerate === "" || mtrlsalerate === 0 || (isNaN(mtrlsalerate))) {
        mtrlsalerate = "";

        throw toast.error("Per Kg Cost of material Not a Numeric Figure", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
      }
      setMtrlSaleRate(mtrlsalerate);
    } else {
      setMtrlSaleRate(mtrlsalerate);
    }
    console.log(mtrlsalerate);
  }

  const cleartaskdetails = async () => {
    setTaskList([]);
    setEstTaskList([]);
    setTasklistdata([]);
    setNoOfTasks(0);
    setTaskAreaWightData([]);
    setDwgsNested("");
    setDwgsToNest("");
    setPartsToNest("");
    setTaskGrpData("");
    setTask_Mtrl_Handling_Charge("");
    setJWValue(0);
    setJWTarget(0);
    setJWCharges(0);

  }

  const deleteTasks = async () => {

    for (let i = 0; i < profileList.length; i++) {
      profileList[i].Unit_JobWork_Cost = 0;
      profileList[i].Unit_Material_Cost = 0;
      setUnitRate(0);
      setMtrlCost(0);
      setJWCost(0);
      setTask_Qtn_JW_Rate(0);

    }

    setTasklistdata([]);
    setNoOfTasks(0);
    setTaskAreaWightData([]);
    setDwgsNested("");
    setDwgsToNest("");
    setPartsToNest("");
    setTaskGrpData("");
    setTask_Mtrl_Handling_Charge("");
    setJWValue(0);
    setJWTarget(0);
    setJWCharges(0);

    await postRequest(endpoints.deleteQtnTaskDetails, { quotationNo: quotationNo }, async (data) => {
      console.log("QtnTaskListDetails Data Deleted");
      console.log(data);
    });

    // await postRequest(endpoints.deleteQtnTaskList, { quotationNo: quotationNo }, async (data) => {
    //   console.log("QtnTaskList Data Deleted");
    //   console.log(data);
    // });

    console.log(quotationNo);
    await postRequest(endpoints.crdeleteQtnItemData, { quotationNo: quotationNo }, async (data2) => {
      console.log("QtnItemsList Data Deleted");
      console.log(data2);
    });


  }

  const checkDrawings = async () => {

    let qno = quotationNo.replaceAll("/", "_");
    //if file not exist then display alert as "Drawing Does not exist for " + Dwg_Name
  }

  //**************************************************************************************
  // Create Tasks button under Tasklist
  //**************************************************************************************
  const createTask = async () => {
    setEstimationBtn(false);
    setReReadBtn(false);

    if (quotation["qtntype"] === "Sales") {
      setTaskRatesBtn(true);
    } else {
      setTaskRatesBtn(false);
    }

    setPerKgRate(0);
    setPerMtrRate(0);
    deleteTasks();
    checkDrawings();

    console.log("Create Tasks");

    cleartaskdetails();

    // let groups = profileList.reduce((r, qtnProfileObject) => {
    //   r[qtnProfileObject.materialcode] = [...r[qtnProfileObject.materialcode] || [], qtnProfileObject];
    //   return r;
    // }, {});
    console.log(profileList)
    let groups = [];
    let mtrlcodes = [];
    if (profileList.length > 0) {

      groups = profileList.reduce((r, qtnProfileObject) => {
        const key = `${qtnProfileObject.materialcode}-${qtnProfileObject.operation}-${qtnProfileObject.thickness}-${qtnProfileObject.grade}-${qtnProfileObject.tolerance}-${qtnProfileObject.inspectionlevel}`;
        r[key] = [...r[key] || [], qtnProfileObject];
        return r;
      }, {});
    }

    //    console.log("Groups : ");
    //  console.log(groups);
    let sumqty = {};
    let tskNetArea = {};
    let taskNtWt = {};
    let tskRectArea = {};
    let countdwgname = {};
    let tskloc = {};
    let tskpeirces = {};
    let j = 1;
    for (let key in groups) {
      if (groups.hasOwnProperty(key)) {

        if (!sumqty[key]) {
          sumqty[key] = 0;
        }
        if (!tskNetArea[key]) {
          tskNetArea[key] = 0;
        }
        if (!taskNtWt[key]) {
          taskNtWt[key] = 0;
        }
        if (!tskRectArea[key]) {
          tskRectArea[key] = 0;
        }
        if (!countdwgname[key]) {
          countdwgname[key] = 0;
        }
        if (!tskloc[key]) {
          tskloc[key] = 0;
        }
        if (!tskpeirces[key]) {
          tskpeirces[key] = 0;
        }
        countdwgname[key] = groups[key].length;
        for (let m = 0; m < groups[key].length; m++) {
          console.log("Qty :")
          //    console.log(groups[key][m].quantity);

          sumqty[key] += parseInt(groups[key][m].quantity); // assuming quantity is the same for all items in the group
          //   console.log("Sum Qty : " + sumqty[key]);

          tskNetArea[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].partNetArea));

          // console.log(parseFloat(groups[key][m].partNetWeight));
          // console.log("Quantity");
          // console.log(parseInt(groups[key][m].quantity));
          // console.log("loc");
          // console.log(parseFloat(groups[key][m].lengthOfCut));

          tskloc[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].lengthOfCut));

          console.log(" Task LOC : " + tskloc[key] + " Key : " + key);

          tskpeirces[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].noOfPierces));

          taskNtWt[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].partNetWeight));
          tskRectArea[key] += parseFloat(groups[key][m]["rectArea"] * groups[key][m]["quantity"]);
          groups[key][m].taskno = j;
        }
        if (groups[key].length > 0) {
          for (let i = 0; i < groups[key].length; i++) {
            mtrlcodes.push(groups[key][i].mtrlcode);
          }
        }
      }
      j++;
    }

    for (let i = 0; i < mtrlcodes.length; i++) {
      console.log(mtrlcodes[i]);

      postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: mtrlcodes[i] }, (matrldata) => {
        console.log(matrldata);

        if (matrldata.length > 0) {
          setMatrlData(matrldata);
        }

      });
    };

    setSumQty(sumqty);
    setTskNetArea(tskNetArea);
    setTaskNtWt(taskNtWt);
    setTskRectArea(tskRectArea);
    setCountOfDwgName(countdwgname);

    setTaskLOC(tskloc);
    setTaskPierces(tskpeirces);


    setTasklistdata(groups);

    setNoOfTasks(Object.keys(groups).length);
    setEstTaskList(groups);

    console.log(groups);
    // console.log("sumqty: " + JSON.stringify(sumqty));
    // console.log("tasknetarea: " + JSON.stringify(tskNetArea));
    // console.log("tasknetwt: " + JSON.stringify(taskNtWt));
    // console.log("taskrectarea: " + JSON.stringify(tskRectArea));
    // console.log("Count of Dwg Name : " + JSON.stringify(countdwgname));
    // console.log("No of Tasks : " + Object.keys(groups).length);


    await postRequest(endpoints.saveQtnTaskListDetails, {
      quotationNo: quotationNo, tasklistdata: groups, spwt: specificwt, mtrcd: mtrlcodes, cntDwgName: countdwgname, NoOfTasks: Object.keys(groups).length,
      sQty: sumqty, tasknetarea: tskNetArea, tasknetwt: taskNtWt, taskrectarea: tskRectArea, taskloc: taskloc, taskpierces: taskpierces
    }, (data) => {
      if (data.status == 'Success') {
        toast.success("Tasks Created..", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
        setEstimationBtn(false);
      }
    });

    //   console.log(profileList[0].file.name);
    // //   console.log(profileList[0].Dwg_Name);
    //   await postRequest(endpoints.saveProfileListdata, { quotationNo: quotationNo, qtnProfileDat: qtnProfileData, dboperntype: "Save" }, (resp) => {
    //       console.log(resp);

    //   });
    //  toast.success("Tasks Created..", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })

  }

  ///********************************************************************************************************/
  // Task No Selection
  ///********************************************************************************************************/
  const taskselectorv2 = async (tasklistdata, id) => {

    console.log("id : ")
    console.log(id);
    // console.log(tasklistdata);
    // console.log(esttaskList);


    setTasklistdata(esttaskList);

    // esttaskList[id].jwtarget = 0;
    // esttaskList[id].materialtarget = 0;
    setJWTarget(0);
    setMaterialTarget(0);
    setTaskSelectedId(id);
    let taskLOC = 0;
    let taskNoofPierces = 0;
    setTaskLOC(0);
    setTaskPierces(0);



    if (esttaskList.length > 0 ? fnGetestimationData(esttaskList, id) : fnbeforeestimation(tasklistdata, id));
  }
  //===========================================================
  // Function called before estimation task selector
  //===========================================================
  const fnbeforeestimation = async (tasklistdata, id) => {

    console.log("Before Get Estimate ");
    console.log(id + 1);

    console.log(quotationNo);

    await postRequest(endpoints.getTaskListDataByQtnNo, { QtnNo: quotationNo }, async (qtntasklistdata) => {
      console.log("Before Get Estimate ");
      console.log(qtntasklistdata);
      // setTasklistdata(qtntasklistdata);
      setTaskList(qtntasklistdata);
    });

    console.log("Task List : ");
    console.log(taskList);

    console.log(profileList);
    //console.log(taskList);
    console.log("Tasklistdata :  ")
    console.log(tasklistdata);

    setSelectedTaskId(id);
    setTaskNo((id + 1));

    console.log(tasklistdata[0]['taskno']);

    setOperation(tasklistdata[0].operation);
    setMaterial(tasklistdata[0].material);
    setGrade(tasklistdata[0].grade);
    setThickness(tasklistdata[0].thickness);
    setTolerance(tasklistdata[0].tolerance);
    setInspectionLevel(tasklistdata[0].inspectionlevel);
    // Suresh Yes
    // setTaskLOC(taskList[0].TaskLOC);
    // setTaskPierces(taskList[0].TaskHoles);
    console.log(taskloc);
    // Suresh Yes
    let taskNetArea = 0;
    let taskRectArea = 0;
    let taskNetWeight = 0;
    let taskRectWeight = 0;
    let taskMtrlArea = 0;
    let taskMtrlWeight = 0;
    let taskLOC = 0;
    let taskNoofPierces = 0;
    let taskQty = 0;

    let taskmtrlspwt = 0;
    //  taskmtrlspwt = tasklistdata[0].

    await postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: tasklistdata[0].mtrlcode }, async (mtrlspwt) => {
      // console.log(qtntasklistdata);
      taskmtrlspwt = mtrlspwt[0].Specific_Wt;
    });

    console.log("Task list Data : ");


    for (let i = 0; i < tasklistdata.length; i++) {
      // if (tasklistdata[i].TaskNo === selectedTaskId) {
      taskNetArea = taskNetArea + (parseFloat(tasklistdata[i].partNetArea * tasklistdata[i].quantity));
      taskRectArea = taskRectArea + parseFloat(tasklistdata[i].rectArea * tasklistdata[i].quantity);
      //  if (tasklistdata[i].partNetWeight === "" || tasklistdata[i].partNetWeight === null) {
      tasklistdata[i].partNetWeight = (tasklistdata[i].partNetArea * tasklistdata[i].thickness * taskmtrlspwt * 0.0001); // * tasklistdata[i].quantity;
      taskNetWeight += parseFloat(tasklistdata[i].partNetWeight * tasklistdata[i].quantity);
      // } else {
      //   taskNetWeight = taskNetWeight + (parseFloat(tasklistdata[i].partNetWeight * tasklistdata[i]["quantity"]));
      // }
      tasklistdata[i].rectWeight = (tasklistdata[i].rectArea * tasklistdata[i].thickness * taskmtrlspwt * 0.0001); // * tasklistdata[i].quantity;
      taskRectWeight += parseFloat(tasklistdata[i].rectWeight * tasklistdata[i].quantity);
      //  taskRectWeight = taskRectWeight + (tasklistdata[i].rectWeight * tasklistdata[i]["quantity"]);
      taskLOC = taskLOC + (parseFloat(tasklistdata[i]["lengthOfCut"]) * parseFloat(tasklistdata[i]["quantity"]));
      taskNoofPierces = taskNoofPierces + (parseFloat(tasklistdata[i]["noOfPierces"] * tasklistdata[i]["quantity"]));
      taskQty = taskQty + parseInt(tasklistdata[i]["quantity"]);
      //   }
      //  console.log("Task No : " + (i + 1));
      console.log("Part Net Area : " + tasklistdata[i].partNetArea);
      console.log("Part Net Weight : " + tasklistdata[i].partNetWeight);
      console.log("Task Net Area : " + taskNetArea);
      console.log("Task Rect Area : " + taskRectArea);
      console.log("Task Net Weight : " + taskNetWeight);
      console.log("Task Rect Weight : " + taskRectWeight);
    }

    setTaskNetWt(taskNetWeight);
    setTaskRectWeight(taskRectWeight);
    // for (let i = 0; i < profileList.length; i++) {
    //   taskNetArea = taskNetArea + (parseFloat(profileList[id].partNetArea * profileList[id].quantity));
    //   taskRectArea = taskRectArea + parseFloat(profileList[id].rectArea * profileList[id].quantity);
    //   taskNetWeight = taskNetWeight + (parseFloat(profileList[id].partNetWeight * profileList[id]["quantity"]));
    //   taskRectWeight = taskRectWeight + (profileList[id].rectWeight * profileList[id]["quantity"]);
    //   taskLOC = taskLOC + (parseFloat(profileList[id]["lengthOfCut"]) * parseFloat(profileList[id]["quantity"]));
    //   taskNoofPierces = taskNoofPierces + (parseFloat(profileList[id]["noOfPierces"] * profileList[id]["quantity"]));
    //   taskQty = taskQty + parseInt(profileList[id]["quantity"]);
    // }
    fnAreaWeighttable({
      taskNetArea: parseFloat(taskNetArea).toFixed(2), //[Object.keys(tskNetArea)[id]]),
      taskNetWeight: (taskNetWeight).toFixed(3),
      taskRectArea: parseFloat(taskRectArea).toFixed(2),
      taskRectWeight: (taskRectWeight).toFixed(3), taskMtrlArea: taskMtrlArea.toFixed(2), taskMtrlWeight: (taskMtrlWeight).toFixed(3)
    });


    await postRequest(endpoints.UpdateQtnTaskListWts, {
      quotationNo: quotationNo, tskno: (id + 1), taskNetArea, taskRectArea, taskNetWeight,
      taskRectWeight, taskMtrlArea, taskMtrlWeight //, taskLOC, taskpierces
    }, (data) => {
      console.log("Net Table Data Saved");
    });
    // Commented Now till here
    console.log(tasklistdata[0].file.name);
    console.log("Saving in Profile Details the WWCAD wts.");
    console.log(tasklistdata[0]);

    await postRequest(endpoints.UpdateProfileDetails, { quotationno: quotationNo, fname: tasklistdata[0].file.name, tasklst: tasklistdata },
      //  dwgname: tasklistdata[i].file.name,
      //partnetwt: tasklistdata[i].partNetWeight, partrectwt: tasklistdata[i].rectWeight, partoutweight: tasklistdata[i].rectWeight},
      (data) => {
        console.log("Net Table Data Saved");
      });

    console.log("Task LOC : " + parseFloat(taskLOC).toFixed(3));
    setTaskLOC(parseFloat(taskLOC).toFixed(3));
    console.log("Task Pierces : " + taskNoofPierces);
    setTaskPierces(taskNoofPierces);
    // setDwgsToNest(taskList[id].TaskDwgs);
    // setNestCount(taskList[id].TaskNests); //TaskNests);
    // setPartsToNest(taskList[id].taskQty);  //esttaskList[id].TaskDwgs);

    setDecPerMtrRate("");


    console.log("tasklistdetails : ")
    console.log(tasklistdata);
    console.log(tasklistdata.length);
    setDwgsToNest(tasklistdata.length);
    setTaskDwgs(tasklistdata.length);
    setNestCount(tasklistdata[0].TaskNests);
    setPartsToNest(tasklistdata.length);

    await postRequest(endpoints.getTaskDetailsDataByQtnNo, { QtnNo: quotationNo }, async (qtntaskdetailsdata) => {
      console.log("Before Get Estimate ");
      console.log(qtntaskdetailsdata);
      console.log("Task No : " + (id + 1));
      let filtdata = qtntaskdetailsdata.filter((item) => item.TaskNo === (id + 1));
      setTaskGrpData(filtdata);
    //  console.log(" filtdata : ");
     console.log(qtntaskdetailsdata.length);
      //setTaskGrpData(qtntaskdetailsdata);
    });
  }
  //=============================================================================
  // Function called after estimation task selector
  //=============================================================================
  const fnGetestimationData = async (esttaskList, id) => {
    console.log("1. After Get Estimate - fnGetestimationData - Clicked");
    console.log(id);
    setPerformedGetEstimate(true);
    console.log(taskList);
    // console.log(profileList);
    console.log(esttaskList);

    //if (taskList.length == null || taskList.length == 0) {
    await postRequest(endpoints.getTaskDetailsDataByQtnNo, { quotationNo: quotationNo }, (data) => {
      console.log("After Estimate - Reread - Clicked")
      console.log(data);
      setTaskList(data);
    });
    // }

    console.log(taskList);
    console.log("2. After Get Estimate - 123");
    setTaskGrpData(taskList);
    setSelectedTaskId(id);
    setTaskNo(id);

    console.log(esttaskList[id].Operation);
    console.log(esttaskList[id].material);
    console.log(esttaskList[id].MtrlGrade);
    console.log(esttaskList[id].Thickness);
    console.log(esttaskList[id].Tolerance);
    console.log(esttaskList[id].InspLevel);

    console.log(esttaskList);

    setOperation(esttaskList[id].Operation);
    setMaterial(esttaskList[id].material);
    setGrade(esttaskList[id].MtrlGrade);
    setThickness(esttaskList[id].Thickness);
    setTolerance(esttaskList[id].Tolerance);
    setInspectionLevel(esttaskList[id].InspLevel);

    let taskNetArea = 0;
    let taskRectArea = 0;
    let taskNetWeight = 0;
    let taskRectWeight = 0;
    let taskMtrlArea = 0;
    let taskMtrlWeight = 0;
    let taskLOC = 0;
    let taskNoofPierces = 0;
    let taskQty = 0;
    setTPerMtrRate(0);
    setPerKgRate(0);
    setTask_perkg_cost(0);
    setDecPerMtrRate("");
    setPerMtrRate("");
    ///////////////////////////////////////////////////////////////////////////////
    await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, (res) => {

      console.log(res);

      console.log(profileList);

      console.log(res[0].LOC)
      for (let i = 0; i < profileList.length; i++) {
        profileList[i]["lengthOfCut"] = res[i].LOC;
        profileList[i]["complexity"] = res[i].Complexity;
        profileList[i]["noOfPierces"] = res[i].NoofPierces;
        profileList[i]["partNetArea"] = res[i].PartNetArea;
        profileList[i]["partNetWeight"] = res[i].PartNetWeight;
        profileList[i]["Unit_JobWork_Cost"] = res[i].Unit_JobWork_Cost;
        profileList[i]["Unit_Material_Cost"] = res[i].Unit_Material_Cost;
      }
      taskloc = 0;
      taskpierces = 0;
      taskqty = 0;
      let Taskloc = 0;
      let Taskpierces = 0;
      for (let i = 0; i < taskList.length; i++) {
        taskList[i]["lengthOfCut"] = res[i].LOC;
        taskList[i]["complexity"] = res[i]["Complexity"];
        taskList[i]["noOfPierces"] = res[i]["NoofPierces"];
        taskList[i]["partNetArea"] = res[i]["PartNetArea"];
        taskList[i]["partNetWeight"] = (res[i]["PartNetWeight"]);
        taskList[i]["Unit_JobWork_Cost"] = res[i]["Unit_JobWork_Cost"];
        taskList[i]["Unit_Material_Cost"] = res[i]["Unit_Material_Cost"];
        taskList[i]["Qty"] = res[i]["Qty"];

      }
      console.log("taskList : ")
      console.log(taskList);
      // taskloc += (parseFloat(res[i].LOC) * parseFloat(res[i].Qty));
      // taskpierces += (parseFloat(res[i].NoofPierces) * parseFloat(res[i].Qty));
      // taskqty += parseFloat(res[i].Qty);

      let selectedfilteredtask = taskList.filter((item) => item["TaskNo"] === (id + 1));
      selectedfilteredtask.forEach(element => {
        if (element["TaskNo"] === (id + 1)) {
          console.log(element["lengthOfCut"]);
          console.log(element["Qty"]);
          console.log(element["noOfPierces"]);
          Taskloc += parseFloat(element["lengthOfCut"]) * parseFloat(element["Qty"]);
          Taskpierces += parseFloat(element["noOfPierces"]) * parseFloat(element["Qty"]);

          taskqty += parseFloat(element["Qty"]);
        }
      });
      taskloc = Taskloc;
      taskpierces = Taskpierces;
      console.log(Taskloc);
      console.log(Taskpierces);
      // Suresh Newly added 5-6-24
      esttaskList[id].TaskLOC = Taskloc;
      esttaskList[id].TaskHoles = Taskpierces;
      // console.log(taskpierces);
      // Suresh Yes
      // setTaskLOC(parseFloat(Taskloc).toFixed(3));
      setTaskLOC(parseFloat(esttaskList[id].TaskLOC).toFixed(3));
      setTaskPierces(esttaskList[id].TaskHoles);
      // Suresh Yes

      setTaskList(taskList);
      //  setTaskGrpData(res);
    });
    ///////////////////////////////////////////////////////////////////////////////
    //  console.log(esttaskList[id].TaskNetArea);
    //  console.log(esttaskList[id].TaskPartRectArea);

    taskNetArea = (parseFloat(esttaskList[id].TaskNetArea).toFixed(2));
    taskRectArea = parseFloat(esttaskList[id].TaskPartRectArea).toFixed(2);
    taskNetWeight = parseFloat(taskNetArea * esttaskList[id].Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);
    taskRectWeight = parseFloat(esttaskList[id].TaskPartRectArea * esttaskList[id].Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);
    taskMtrlArea = parseFloat(esttaskList[id].TaskMtrlArea).toFixed(2);
    if (esttaskList[id].TaskMtrlArea > 0) {
      taskMtrlWeight = parseFloat(esttaskList[id].TaskMtrlArea * esttaskList[id].Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);
    }
    esttaskList[id].TaskMtrlWeight = taskMtrlWeight;
    taskMtrlWeight = esttaskList[id].TaskMtrlWeight;
    // taskLOC = esttaskList[id].TaskLOC;
    //taskNoofPierces = esttaskList[id].TaskHoles;
    taskQty = esttaskList[id].SumOfQty;

    fnAreaWeighttable({
      taskNetArea: parseFloat(taskNetArea), //[Object.keys(tskNetArea)[id]]),
      taskNetWeight: taskNetWeight,
      taskRectArea: taskRectArea,
      taskRectWeight: taskRectWeight, taskMtrlArea: taskMtrlArea, taskMtrlWeight: taskMtrlWeight
    });


    let utilpercent = 0;
    if (taskAreaWightData.length > 0) {
      if (taskMtrlArea > 0) {
        utilpercent = ((taskNetArea * 100) / taskMtrlArea).toFixed(2);
        //      console.log(" Util Percent : " + utilpercent);
        setUtilisationPercent(parseFloat(utilpercent).toFixed(2));
        setScrapPercent(parseFloat(100 - utilpercent).toFixed(2));
      }
    }

    //  console.log("task LOC : " + taskLOC);

    // console.log(esttaskList[id].TaskLOC);

    setPartsNested(esttaskList[id].SumOfQty);
    // setTaskPierces(parseInt(esttaskList[id].TaskHoles));
    // setTaskLOC(esttaskList[id].TaskLOC);
    setDwgsToNest(esttaskList[id].TaskDwgs);
    setNestCount(esttaskList[id].TaskNests); //TaskNests);
    setDwgsNested(esttaskList[id].TaskDwgs);
    setProgramming(esttaskList[id].Task_Pgme_charge);
    setTask_Basic_Cutting_Cost(parseFloat(esttaskList[id].Task_Basic_Cutting_Cost).toFixed(2));
    setPartsToNest(esttaskList[id].TaskDwgs);

    setMchSetUpRate(esttaskList[id].Task_SettingUpRate);
    setDecSheetLoadingRate(esttaskList[id].Task_SheetHandlingRate);
    //   console.log("Task Sheet Handling Rate : " + esttaskList[id].Task_SheetHandlingRate);

    console.log(esttaskList[id].TotalSheet);

    setTaskSetupLoading(parseFloat(Number(esttaskList[id].Task_SettingUpRate) + (Number(esttaskList[id].TotalSheet) * Number(esttaskList[id].Task_SheetHandlingRate))).toFixed(2));

    setTask_Mtrl_Handling_Charge(parseFloat(esttaskList[id].Task_Mtrl_Handling_Charge).toFixed(2));

    setJWCharges(parseFloat(esttaskList[id].TaskJobWorkCost).toFixed(2));
    setMaterialCharges(esttaskList[id].Task_Mtrl_Cost);
    if (esttaskList[id].Task_Qtn_JW_Rate > 0) {
      setJWValue(esttaskList[id].Task_Qtn_JW_Rate);
      setJWTarget(esttaskList[id].Task_Qtn_JW_Rate);
    } else {
      setJWValue(0);
    }

    setMaterialValue(esttaskList[id].Task_Qtn_Mtrl_Rate);

    setTPerMtrRate(((Number(esttaskList[id].Task_Mtrl_rate) + Number(esttaskList[id].TaskJobWorkCost)) / esttaskList[id].TaskLOC).toFixed(2));
    setTask_perkg_cost(((Number(esttaskList[id].Task_Mtrl_rate) + Number(esttaskList[id].TaskJobWorkCost)) / esttaskList[id].Task_Net_wt).toFixed(2));
    task_perkg_cost = ((Number(esttaskList[id].Task_Mtrl_rate) + Number(esttaskList[id].TaskJobWorkCost)) / esttaskList[id].Task_Net_wt).toFixed(2);
    //  console.log("Task Per Kg Cost : " + task_perkg_cost);
    //   console.log("Task Per Mtr Rate : " + tpermtrRate);

    setEstTaskList(esttaskList);
    //   console.log(profileList);
    setProfileList(profileList);

    //console.log("Task List");
    //console.log(taskList);
    //setTaskList(taskList);


    taskList.forEach((item) => {
      console.log(item);
      if (item.TaskNo === (id + 1)) {
        console.log(item.partNetArea);
        item.PartNetWt = (item.PartNetArea * item.Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);
        item.PartOutWt = (item.PartOutArea * item.Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);
        item.RectWeight = (item.PartRectArea * item.Thickness * esttaskList[id].SpWeight * 0.0001).toFixed(3);

      }

    });

    let tkloc = esttaskList[id].TaskLOC;
    let tkholes = esttaskList[id].TaskHoles;
    await postRequest(endpoints.UpdateQtnTaskListWts, {
      quotationNo: quotationNo, tskno: (id + 1), taskNetArea, taskRectArea, taskNetWeight,
      taskRectWeight, taskMtrlArea, taskMtrlWeight, tkloc, tkholes
    }, (data) => {
      console.log("After Estimate - Updates on wts.");
      //    console.log(data);

    });

    // postRequest(endpoints.updateTaskDetailsData, { quotationno: quotationNo, taskdetsdata: taskList }, (data) => {
    //   console.log(data);
    // });

    await postRequest(endpoints.getTaskDetailsDataByQtnNo, { quotationNo: quotationNo }, (data) => {
      console.log("After Estimate - Reread - Clicked")
      //    console.log(data);
      setTaskList(data);
      setTaskDetData(data);
    });

    let filtereddata = taskdetdata.filter((item) => item.TaskNo === (id + 1));
    //  setTaskGrpData(filtereddata);
    console.log(filtereddata);

    setTaskGrpData(filtereddata);
  }
  //=======================================================================
  ////////  Task Selector End
  ////////////////////////////////////////


  let secbtnc = () => {
    setAlertModal(false);
  };

  ////////////////////////////////////////////////////////////////
  // Get Estimate button under Tasklist
  //////////////////////////////////////////////////////////////////

  let onClickGetEstimator = async () => {
    // DO NOT DELETE BELOW COMMENTED CODE - to be opened after all changes done and working
    // setCreateTaskBtn(true);
    ////////////////////////////////
    if (taskgrpData.length > 0) {
      setTaskRatesBtn(false);
    }
    setPerformedGetEstimate(true);

    let mtaskno = taskselectedid + 1;
    let quoteNo = quotationNo + "-" + mtaskno;
    if (hasopencontour == "True") {
      setAlertModal(true);
      //      toast.warning("Uploaded drawings has Open Contour, please verify the table below")
    } else {
      //quotationNo
      postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation", btntype: "E" }, (estdata) => {
        console.log(estdata)
        console.log(estdata.length);
        // setEstData(estdata);
        setEstTaskList(estdata);
// if (estdata.length > 0) {
//    execute gif;
  //      }

      });

      setEstTaskList(estdata);
      console.log(esttaskList);

      await postRequest(endpoints.getTaskDetailsDataByQtnNo, { quotationNo }, (data) => {
        console.log("Task Details Data");
        console.log(data);
        setTaskList(data);
      });

    }
    console.log("Task List");
    console.log(taskList);
    //      setTaskGrpData(profileList);
  }

  let fnAreaWeighttable = async (data) => {
    console.log(data);
    let taskRectWeight = 0; //let UtilPercent = 0; let ScrapPercent = 0;
    if (specificwt > 0) {
      // Comment removed 
      taskNetWt = parseFloat(data.tskNetArea * thickness * specificwt * 0.01).toFixed(3);
      taskRectWeight = parseFloat(taskPartArea * thickness * specificwt * 0.01).toFixed(3);
      //data.taskNetWeight
      if ((data.tskNetArea > 0) && (data.taskMtrlArea > 0)) {
        utilpercentage = parseFloat(data.tskNetArea * 100 / data.taskMtrlArea).toFixed(2);
        scrappercent = parseFloat(100 - utilpercentage).toFixed(2);
      }
      // 
      setTaskNetWt(data.taskNetWeight);
      console.log(" Task Mtrl Area : " + taskMtrlArea)
      // console.log("Weight : "+taskMtrlWeight);

      setTaskMtrlWeight(data.taskMtrlWeight);
      setTaskRectWeight(data.taskRectWeight);
      // setUtilisationPercent(UtilPercent);
      // setScrapPercent(ScrapPercent);

      // Comment Opend
      // for (let i = 0; i < taskgrpData.length; i++) {
      //   taskPart.PartNetWt = Math.Round(taskPart.PartNetArea * thickness * specificwt * 0.0001, 3)
      //   taskPart.PartOutWt = Math.Round(taskPart.PartOutArea * thickness * specificwt * 0.0001, 3)
      //   taskPart.RectWeight = Math.Round(taskPart.PartRectArea * thickness * specificwt * 0.0001, 3)
      //   Console.WriteLine("PartWt " & taskPart.RectWeight & " -" & Math.Round(taskPart.PartX * taskPart.PartY * thickness * specificwt * 0.000001, 2))
      // }
      // Comment Closed

    }

    setTaskAreaWightData([
      {
        type: "Net",
        area: parseFloat(data.taskNetArea), // .toFixed(2),
        weight: parseFloat(data.taskNetWeight), // .toFixed(3),
        // weight: a.taskNetWeight.toFixed(2),
      },
      {
        type: "Rect",
        area: parseFloat(data.taskRectArea),
        weight: parseFloat(data.taskRectWeight), //.toFixed(3),
      },
      {
        type: "Nested",
        area: parseFloat(data.taskMtrlArea) > 0 ? parseFloat(data.taskMtrlArea) : "0.00",
        weight: parseFloat(data.taskMtrlWeight) > 0 ? parseFloat(data.taskMtrlWeight) : "0.00",

      }
    ])
  }

  let fstbtnc = () => {
    // console.log("Get Estimator fstbtnc Clicked : " + quotationNo);
    // let qno = quotationNo.replaceAll("/", "_");
    postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation", btntype: "E" }, (estdata) => {
      console.log(estdata.length)
      console.log(estdata);
      //  alert(estdata);
      if (estdata.length > 0) {
        setLengthOfCut(estdata[0].LOC)
        setNoofPierces(estdata[0].NoofPierces)
        setPartNetArea(estdata[0].PartNetArea)
        setOutOpen(estdata[0].OutOpen)
        setComplexity(estdata[0].Complexity)
        setHasOpenContour(estdata[0].OpenContour)
        setPartNetWeight(estdata[0].PartNetWt)
        setPartOutArea(estdata[0].PartOutArea)
        setPartOutWeight(estdata[0].PartOutWt)
        setDwgsNested(estdata[0].QtyNested);
        //  setRectWeight(estdata.rectWeight)
        //  setTaskMtrlArea(estdata.taskMtrlArea)
        //  console.log("Task Mtrl Area : " + estdata.taskMtrlArea)
        //tasklist[]
        // To Call Sigma
        //  setRectWeight(parseFloat(tasklist[i]["rectWeight"] * tasklist[i]["quantity"]))

        //  let taskMtrlWeight = (estdata.taskMtrlArea * thickness * specificwt * 0.0001);
        //  fnAreaWeighttable({ taskNetArea: estdata.taskNetArea, taskNetWeight: estdata.taskNetWeight, taskRectArea: estdata.taskRectArea, taskRectWeight: estdata.taskRectWeight, taskMtrlArea: estdata.taskMtrlArea, taskMtrlWeight: taskMtrlWeight })

        console.log("Part Net Wt. : " + estdata[0].PartNetWt)
        console.log("Task Net Wt. : " + estdata[0].Qty)

        let tNetWt, tRectWt = 0;
        if (estdata[0].TaskNetWt == 0) {
          tNetWt = estdata[0].PartNetWt * estdata[0].Qty;
        }
        else {
          tNetWt = (estdata[0].TaskNetWt * 100);
        }
        if (estdata[0].RectWeight == 0) {
          tRectWt = (rectweight * estdata[0].Qty).toFixed(3);
        }
        else {
          tRectWt = (estdata[0].RectWeight * 100).toFixed(3);
        }
        let taskMtrlWeight = (estdata[0].TaskMtrlArea * thickness * specificwt * 0.0001).toFixed(3);
        //  console.log(" Task Mtrl Area : " + taskMtrlArea)
        //  console.log("Weight : " + taskMtrlWeight);
        setTaskMtrlWeight(taskMtrlWeight);
        fnAreaWeighttable({ taskNetArea: estdata[0].TaskNetArea, taskNetWeight: tNetWt, taskRectArea: estdata[0].TaskPartRectArea, taskRectWeight: estdata[0].TaskRectWeight, taskMtrlArea: estdata[0].TaskMtrlArea, taskMtrlWeight: taskMtrlWeight })

        if (taskAreaWightData.length > 0) {
          let utilpercent = ((estdata[0].TaskNetArea * 100) / estdata[0].TaskMtrlArea).toFixed(2);
          console.log("Util Percent : " + utilpercent)
          // setUtilisationPercent((estdata[0].PartNetArea * 100) / taskAreaWightData[0]["PartGrossArea"]);
          setUtilisationPercent(utilpercent);
          setScrapPercent(100 - parseFloat(utilpercent).toFixed(2));
        }
        console.log(estdata[0].QtyNested)

        // if (taskAreaWightData.length > 0) {
        //   let utilpercent = ((taskAreaWightData[0]["TaskNetArea"] * 100) / taskAreaWightData[0]["PartGrossArea"])
        //   console.log("Util Percent : " + utilpercent)
        //   setUtilisationPercent((taskAreaWightData[0]["PartNetArea"] * 100) / taskAreaWightData[0]["PartGrossArea"]);
        //   setScrapPercent(100 - utilpercent);
        // }
      }
    })

    setAlertModal(false);
    //Call SigmaServiceWeb Via API
    //   CreateReadWS(True)
    //  upDateProfilePara()

  }

  let onClickReRead = () => {
    console.log("ReRead Clicked : " + quotationNo);
    //   toast.warning("To Connect to Sigma Nest");
    postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation", btntype: "R" }, (estdata) => {
      //   console.log(estdata)
      // alert(estdata);
      setEstTaskList(estdata);
      // To Call Sigma
    })
    //  CreateReadWS(False)
    //  upDateProfilePara()
  }

  const [taskratesshow, setTaskRatesShow] = useState(false);
  const handleTaskRates = () => setTaskRatesShow(true);
  // for (let i = 0; i < nooftasks; i++) {
  //   const handleTaskRates = () => setTaskRatesShow(true);
  // }
  const handleCloseTaskRates = () => setTaskRatesShow(false);

  //***************************************************************************************  */
  // On Click of Set Task Rates Button
  //***************************************************************************************  */
  let onClickSetTaskRate = async () => {

    console.log("Set Task Rates Clicked : " + quotationNo);

    clearmodalvariables();
    // console.log(tasklistdata);
    // for (let i = 0; i < tasklistdata.length; i++) {
    //   if (tasklistdata[i]["TaskNo"] == taskno) {
    //     console.log("Drawing Nme : " + tasklistdata[i]["Dwg_Name"])

    //   }
    // }
    // console.log(" Line : 1349 - Task Grp Data : " + taskgrpData);
    await postRequest(endpoints.UpdateProfileDetails, { quotationno: quotationNo, tasklst: taskgrpData }, (res) => {
      if (res.status === 200) {
        alert("Task Rates Updated");
      }
    });

    console.log(tasklistdata);
    for (let i = 0; i < tasklistdata.length; i++) {
      if ((taskPartArea <= 0)) { //} || (taskPartWeight <= 0)) {
        if (taskgrpData["QtnType"] = "Sales") {
          toast.info("Sheet Weight for this task is Zero. Check Drawings and Nesting and material Specific Gravity")
          //    setTaskCharges();
        }

      }
    }

    console.log(quotationNo);

    await postRequest(endpoints.getqtnTasklistData, { quotationNo: quotationNo }, (qtntasklstdata) => {
      qtntasklist = qtntasklstdata;
      setQtnTaskList(qtntasklist);
    })

    qtntasklist.forEach(async (task) => {

      setTaskLOC(taskloc);
      setTaskRateHoles(taskpierces);
      setMaterial(material);

      await setMaterialRate(task.material, task.grade);
      await setProcessRate(task.material, task.operation);
      await setHandlingRates(task.material);
      await setProgrammingRate();

    })
    //setRereadBtn(false);
    // setTaskRatesBtn(false);
    // const handleTaskRates = () => setTaskRatesShow(true);
    setTaskRatesShow(true);
  }

  //***************************************************************************************  */
  /////                         Set Task Rates       /////////////////
  //***************************************************************************************  */
  // ******************************************************************************************************************************************************
  const setTaskRates = async () => {
    fnmtrlSaleRate();
    let progcharge = 0;
    let basic_cutting = 0;
    let jwcharges = 0;

    qtntasklist.forEach(async (task) => {

      //If X.Rate Then
      //'******* set the Task Rates for use in calculation
      task.Task_cuttingRate = decLengthRate; //    X.PerMtr
      task.Task_PierceRate = decPierceRate; //  X.perPierce
      task.Task_Mtrl_rate = decMaterialRate
      task.Task_SettingUpRate = decTaskSetupRate; //   X.TaskSetupRate
      task.Task_SheetHandlingRate = decSheetLoadingRate; // X.SheetLoadRate
      task.Task_mtrlHandlingRate = decMtrl_HandlingRate; //  X.HandlingRate


    });

    await setTaskCharges(selectedTaskId);
    await setPartRates(taskgrpData, selectedTaskId);
    setEstPrintBtn(false);
  }

  ////////////////////////////////////////////////////////////////
  // Calculations for Task Charges
  /////////////////////////////////////////////////////////////////////////

  let setTaskCharges = async (selectedTaskId) => {
    console.log("Task Charges : " + selectedTaskId);
    //  setTaskLOC(0);
    let mtaskno = selectedTaskId + 1;

    if (esttaskList.length > 0) {
      //    alert("Task Charges with Estimation");
      await setTaskChargesafterestimation(esttaskList, selectedTaskId, mtaskno);
    } else {
      //   alert("Task Charges without Estimation");
      await setTaskChargeswithoutestimation(tasklistdata, selectedTaskId, mtaskno);
    }

    toast.success("Task Updated Successfully", { position: toast.POSITION.TOP_CENTER });

    console.log(taskList);

    await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, (res) => {

      console.log(res);

      console.log(profileList);

      console.log(res[0].LOC)
      for (let i = 0; i < profileList.length; i++) {
        profileList[i]["lengthOfCut"] = res[i].LOC;
        profileList[i]["complexity"] = res[i].Complexity;
        profileList[i]["noOfPierces"] = res[i].NoofPierces;
        profileList[i]["partNetArea"] = res[i].PartNetArea;
        profileList[i]["partNetWeight"] = res[i].PartNetWeight;
        profileList[i]["Unit_JobWork_Cost"] = res[i].Unit_JobWork_Cost;
        profileList[i]["Unit_Material_Cost"] = res[i].Unit_Material_Cost;
      }
      taskloc = 0;
      for (let i = 0; i < taskList.length; i++) {
        taskList[i]["lengthOfCut"] = res[i].LOC;
        taskList[i]["complexity"] = res[i]["Complexity"];
        taskList[i]["noOfPierces"] = res[i]["NoofPierces"];
        taskList[i]["partNetArea"] = res[i]["PartNetArea"];
        taskList[i]["partNetWeight"] = (res[i]["PartNetWeight"]);
        taskList[i]["Unit_JobWork_Cost"] = res[i]["Unit_JobWork_Cost"];
        taskList[i]["Unit_Material_Cost"] = res[i]["Unit_Material_Cost"];
        taskloc += (parseFloat(res[i].LOC) * parseFloat(res[i].Qty));
      }
      console.log(taskloc);
      setTaskLOC(parseFloat(taskloc).toFixed(3));
      setTaskList(taskList);
      console.log(res);
      setTaskGrpData(res);
      //  setTaskGrpData(taskgrpData);
    });
  }

  //********************************************************** */
  // Task Charges after Estimation
  const setTaskChargesafterestimation = async (esttaskList, selectedTaskId, mtaskno) => {
    console.log("Est Task List : ");
    console.log(selectedTaskId);
    console.log(mtaskno);
    console.log(taskList);
    let taskitemfilter = taskList.filter((item) => item.TaskNo === mtaskno && Number(item.QtyNested) != 0);
    console.log(taskitemfilter);

    console.log("Count of Dwg : " + taskitemfilter.length);

    let CountOfDwg_Name = taskitemfilter.length;

    let progcharge = 0;
    let basic_cutting = 0;
    let tasknest = 0;
    let totalsheet = 1;
    esttaskList[selectedTaskId].TaskDwgs = taskList.length;
    esttaskList[selectedTaskId].CountOfDwg_Name = taskitemfilter.length;
    taskloc = Number(esttaskList[selectedTaskId].TaskLOC);
    console.log(taskloc);
    if (taskloc > 0) {

      setDecContourRate(1);
      setDecNestRate(10);
      setDecDwgRate(10);
      setDecPartRate(0.1);
      setDecTaskRate(10);


      console.log(esttaskList[selectedTaskId].TaskNests);

      progcharge = (CountOfDwg_Name * decDwgRate)
        + (parseFloat(esttaskList[selectedTaskId].SumOfQty) * parseFloat(decPartRate))
        + (esttaskList[selectedTaskId].TaskHoles * decContourRate)
        + ((esttaskList[selectedTaskId].TaskNests * decNestRate)
          + (decTaskRate));

      console.log("Prog Charge : " + progcharge);

      setProgramming(progcharge);
      esttaskList[selectedTaskId].Task_Pgme_charge = progcharge;

      console.log("Dec Per Mtr Rate : " + decpermtrRate);
      console.log("Dec Pierce Rate : " + decPierceRate);
      console.log("Task Pierces : " + taskpierces);

      // taskloc = Number(parseFloat(taskloc).toFixed(3)); //.toFixed(3);
      //console.log("Task Loc : " + parseFloat(taskloc).toFixed(3));

      basic_cutting = (Number(esttaskList[selectedTaskId].TaskLOC) * parseFloat(decpermtrRate) + parseFloat(esttaskList[selectedTaskId].TaskHoles) * parseFloat(decPierceRate));
      console.log("Basic Cutting : " + basic_cutting);
      setTask_Basic_Cutting_Cost(parseFloat(basic_cutting).toFixed(2));
      esttaskList[selectedTaskId].Task_Basic_Cutting_Cost = parseFloat(basic_cutting).toFixed(2);
      esttaskList[selectedTaskId].Task_cuttingRate = decpermtrRate;
      esttaskList[selectedTaskId].Task_PierceRate = decPierceRate;
      if (esttaskList[selectedTaskId].TotalSheet > 0) {
        totalsheet = esttaskList[selectedTaskId].TotalSheet;
      } else {
        totalsheet = 1;
      }
      setTaskNetWt(taskAreaWightData[2]["weight"]);

      taskMtrlWeight = taskAreaWightData[2]["weight"];
      console.log(taskMtrlWeight);

      console.log("Mtrl Hand Rate : ")
      console.log(decMtrl_HandlingRate);
      //  setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
      let tmtrlhndlgrate = parseFloat(decMtrl_HandlingRate);
      if ((Number(decMtrl_HandlingRate) < 10) && (taskMtrlWeight == 0)) {
        decMtrl_HandlingRate = 10;
        setDecMtrl_HandlingRate(10);
        console.log("1960 - Mtrl Handling Rate : " + decMtrl_HandlingRate);
        setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
      }
      // } else if ((Number(decMtrl_HandlingRate) < 10) && (taskMtrlWeight > 0)) {
      //   // decMtrl_HandlingRate = 10;
      //   // setDecMtrl_HandlingRate(10);
      //   console.log("1960 - Mtrl Handling Rate > : " + decMtrl_HandlingRate);
      //   setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
      // }
      else {
        console.log("1963 - Mtrl Handling Rate : " + decMtrl_HandlingRate);
        setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
      }

      // Newly Added Logic for Mtrl Handling Rate
      if (taskMtrlWeight > 0) {
        console.log("1938 - Task Mtrl Weight : " + taskMtrlWeight);
        esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge = parseFloat(Number(taskMtrlWeight) * Number(decMtrl_HandlingRate)).toFixed(2);
      } else {
        console.log("1941 - Task Mtrl Weight : " + taskMtrlWeight);
        esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge = Number(decMtrl_HandlingRate).toFixed(2);
      }
      // /////////////////////////////////////////
      setTaskMtrlHandlingRate(tmtrlhndlgrate);
      esttaskList[selectedTaskId].Task_mtrlHandlingRate = tmtrlhndlgrate;
      setTask_Mtrl_Handling_Charge(parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge).toFixed(2));

      let MtrlWeight = parseFloat(parseFloat((parseFloat(decShLength) * parseFloat(decShWidth) * parseFloat(thickness) * parseFloat(specificwt) * 0.0001) * 0.001)).toFixed(3) // (Width * Length * thickness * Sp Weight)
      esttaskList[selectedTaskId].Task_Mtrl_Weight = MtrlWeight;

      setTaskSetupRate(Number(mchsetuprate));
      setTaskSheetHandlingRate(Number(decSheetLoadingRate));

      esttaskList[selectedTaskId].Task_SettingUpRate = Number(mchsetuprate);

      console.log("Machine Setting Up Rate Rs/Task : " + Number(mchsetuprate));

      console.log("Sheet Loading Rate Rs/Sheet : " + Number(decSheetLoadingRate));

      //esttaskList[selectedTaskId].Task_SheetHandlingRate = Number((esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate)));
      esttaskList[selectedTaskId].Task_SheetHandlingRate = Number((totalsheet * Number(decSheetLoadingRate)));
      //  setTaskSetupLoading(Number(mchsetuprate) + Number(decSheetLoadingRate));
      setTaskSetupLoading(Number(mchsetuprate) + Number(esttaskList[selectedTaskId].Task_SheetHandlingRate));
      //esttaskList[selectedTaskId].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate))).toFixed(2);
      esttaskList[selectedTaskId].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (totalsheet * Number(decSheetLoadingRate))).toFixed(2);

      console.log("Cutting : " + basic_cutting);
      console.log("Setup : " + esttaskList[selectedTaskId].Task_Setup_loading_charge);
      console.log("Programming : " + progcharge);
      console.log("Mtrl Handling : " + esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);

      setJWCharges(0);
      let jwchargecalculation = Number(basic_cutting) + Number(esttaskList[selectedTaskId].Task_Setup_loading_charge) + Number(progcharge) + Number(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);
      setJWCharges(parseFloat(jwchargecalculation).toFixed(2));
      esttaskList[selectedTaskId].Task_JobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

      console.log("JW Charge Calculation : " + jwchargecalculation);

      setJWValue(parseFloat(jwchargecalculation).toFixed(2));
      esttaskList[selectedTaskId].Task_JW_Value = parseFloat(jwchargecalculation).toFixed(2);

      console.log("Sales Condition : " + quotationType)
      if (quotationType == "Sales") {
        console.log("Mtrl sales rate : " + mtrlsalerate);
        setTask_Mtrl_Cost(taskMtrlWeight * mtrlsalerate);
        esttaskList[selectedTaskId].Task_Mtrl_Cost = parseFloat(taskMtrlWeight * mtrlsalerate).toFixed(2);
        esttaskList[selectedTaskId].Task_mtrlHandling_Rate = mtrlsalerate;
        setMtrlSaleRate(mtrlsalerate);
        setMaterialValue(esttaskList[selectedTaskId].Task_Mtrl_Cost);
        setMaterialCharges(esttaskList[selectedTaskId].Task_Mtrl_Cost);  //materialcharges
        esttaskList[selectedTaskId].Task_Mtrl_rate = mtrlsalerate;
        esttaskList[selectedTaskId].Task_Qtn_Mtrl_Rate = esttaskList[selectedTaskId].Task_Mtrl_Cost;

        console.log("Material Cost : " + esttaskList[selectedTaskId].Task_Mtrl_Cost);
      }
      else {
        setTask_Mtrl_Cost(0);
        esttaskList[selectedTaskId].Task_Mtrl_Cost = 0;
      }
      esttaskList[selectedTaskId].Task_Mtrl_rate = mtrlsalerate;
      esttaskList[selectedTaskId].Task_mtrlHandlingRate = taskmtrlhandlingrate;
      esttaskList[selectedTaskId].Task_SheetHandlingRate = decSheetLoadingRate;

      taskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);
      // Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
      jwvalue = parseFloat(jwchargecalculation).toFixed(2);

      esttaskList[selectedTaskId].Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
      esttaskList[selectedTaskId].TaskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

      setTPerMtrRate(parseFloat(Number(decMaterialRate) + Number(taskJobWorkCost) / taskloc).toFixed(2));
      esttaskList[selectedTaskId].Task_Per_Mtr_Rate = parseFloat(taskJobWorkCost / taskloc).toFixed(2);

      setPerMtrRate(parseFloat(Number(decMaterialRate) + Number(taskJobWorkCost) / taskloc).toFixed(2));

      if (taskMtrlWeight > 0) {
        //  console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
        setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
        esttaskList[selectedTaskId].TaskPerKgCost = parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2);

        //   console.log(esttaskList[selectedTaskId].TaskPerKgCost);
        // setPerKgRate(task_perkg_cost);
        setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
      }

      setTaskMtrlWeight(taskMtrlWeight);
      esttaskList[selectedTaskId].Task_Mtrl_Weight = taskMtrlWeight;
      esttaskList[selectedTaskId].Task_Mtrl_rate = mtrlsalerate;
      console.log("Task Mtrl Rate : " + mtrlsalerate);
      //   console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));

      permtrRate = parseFloat((Number(esttaskList[selectedTaskId].Task_Per_Mtr_Rate) + Number(esttaskList[selectedTaskId].Task_Qtn_JW_Rate)) / esttaskList[selectedTaskId].Task_Net_wt).toFixed(2);

      setPerMtrRate(parseFloat(permtrRate).toFixed(2));

      mtaskno = parseInt(taskno + 1);

    }

    setEstTaskList(esttaskList);
    console.log(esttaskList);

    await postRequest(endpoints.UpdateQtnTaskListDetails, {
      quotationno: quotationNo, taskno: taskno, taskgrpData: esttaskList//, //taskgrpData,
      // taskcuttingcost: basic_cutting, taskprogcharge: progcharge, taskcuttingrate: decpermtrRate,
      // Task_PierceRate: decPierceRate, Task_NetWt: taskNetWt, taskrectweight: taskAreaWightData[1].weight, Task_MaterialRate: decMaterialRate,
      // tasksetuprate: mchsetuprate, Task_SheetHandlingRate: decSheetLoadingRate, Task_mtrlHandlingRate: decMtrl_HandlingRate, Task_Mtrl_rate: task_perkg_cost,
      // taskmtrlhndcharge: Task_Mtrl_Handling_Charge, taskjobworkcost: taskJobWorkCost, cntdwgname: CountOfDwg_Name, taskMtrlWeight: taskAreaWightData[2].weight,
      // taskloc: taskloc, taskholes: taskpierces, tasknetarea: taskAreaWightData[0].area, tasksumofqty: taskgrpData.SumOfQty, Task_Qtn_JW_Rate: Task_Qtn_JW_Rate
    }, (res) => {
      //console.log(res);
      if (res.status === 200) {
        alert("Task Rates Updated");
      }
    });

    toast.success("Task Updated Successfully", { position: toast.POSITION.TOP_CENTER });

    console.log(taskList);

    await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, (res) => {
      
      console.log(res);

      console.log(profileList);

      console.log(res[0].LOC)
      for (let i = 0; i < profileList.length; i++) {
        profileList[i]["lengthOfCut"] = res[i].LOC;
        profileList[i]["complexity"] = res[i].Complexity;
        profileList[i]["noOfPierces"] = res[i].NoofPierces;
        profileList[i]["partNetArea"] = res[i].PartNetArea;
        profileList[i]["partNetWeight"] = res[i].PartNetWeight;
        profileList[i]["Unit_JobWork_Cost"] = res[i].Unit_JobWork_Cost;
        profileList[i]["Unit_Material_Cost"] = res[i].Unit_Material_Cost;
      }
      for (let i = 0; i < taskList.length; i++) {
        taskList[i]["lengthOfCut"] = res[i].LOC;
        taskList[i]["complexity"] = res[i]["Complexity"];
        taskList[i]["noOfPierces"] = res[i]["NoofPierces"];
        taskList[i]["partNetArea"] = res[i]["PartNetArea"];
        taskList[i]["partNetWeight"] = (res[i]["PartNetWeight"]);
        taskList[i]["Unit_JobWork_Cost"] = res[i]["Unit_JobWork_Cost"];
        taskList[i]["Unit_Material_Cost"] = res[i]["Unit_Material_Cost"];
        taskList[i]["Qty"] = res[i]["Qty"];

      }
      setTaskList(taskList);
      setTaskGrpData(taskgrpData);
    });

  }

  //*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*/
  // Task Charges without Estimation Only for Job Work - Profile Quotations
  //*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*/
  const setTaskChargeswithoutestimation = async (tasklistdata, selectedTaskId, mtaskno) => {
    //console.log("Task Charges Without Estimation  ")

    let sumquantity = 0; let cnt = 0;
    // let taskloc = 0; 
    let tasknetwt = 0; let taskoutwt = 0; let taskrectwt = 0; let TaskNests = 0;
    ; let taskpierces = 0; let tasknests = 0; let material = ''; let taskloc = 0; let taskqty = 0;
    await postRequest(endpoints.getqtnTasklistData, { quotationNo: quotationNo }, (qtntsklstdata) => {
      setEstTaskList(qtntsklstdata);
    });

    ///////////////////////////////////////////////////////
    await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, (res) => {

      console.log(res);

      console.log(profileList);

      console.log(res[0].LOC)
      for (let i = 0; i < profileList.length; i++) {
        profileList[i]["lengthOfCut"] = res[i].LOC;
        profileList[i]["complexity"] = res[i].Complexity;
        profileList[i]["noOfPierces"] = res[i].NoofPierces;
        profileList[i]["partNetArea"] = res[i].PartNetArea;
        profileList[i]["partNetWeight"] = res[i].PartNetWeight;
        profileList[i]["Unit_JobWork_Cost"] = res[i].Unit_JobWork_Cost;
        profileList[i]["Unit_Material_Cost"] = res[i].Unit_Material_Cost;
      }
      taskloc = 0;
      taskpierces = 0;
      taskqty = 0;
      for (let i = 0; i < taskList.length; i++) {
        taskList[i]["lengthOfCut"] = res[i].LOC;
        taskList[i]["complexity"] = res[i]["Complexity"];
        taskList[i]["noOfPierces"] = res[i]["NoofPierces"];
        taskList[i]["partNetArea"] = res[i]["PartNetArea"];
        taskList[i]["partNetWeight"] = (res[i]["PartNetWeight"]);
        taskList[i]["Unit_JobWork_Cost"] = res[i]["Unit_JobWork_Cost"];
        taskList[i]["Unit_Material_Cost"] = res[i]["Unit_Material_Cost"];
        taskloc += (parseFloat(res[i].LOC) * parseFloat(res[i].Qty));
        taskpierces += (parseFloat(res[i].NoofPierces) * parseFloat(res[i].Qty));
        taskqty += parseFloat(res[i].Qty);
      }
      console.log(taskloc);
      console.log(taskpierces);
      setTaskLOC(parseFloat(taskloc).toFixed(3));
      setTaskPierces(taskpierces);
      // TaskNests(tasknests);
      setTaskList(taskList);
      setTaskGrpData(res);
    });
    ////////////////////////////////////////////////////////////////////

    console.log("task:loc : " + taskloc);
    // console.log(parseFloat(taskloc * esttaskList[selectedTaskId].SumOfQty));
    // taskloc = parseFloat(taskloc * esttaskList[selectedTaskId].SumOfQty);

    let CountOfDwg_Name = cnt; // taskitemfilter.length;
    let progcharge = 0;
    let basic_cutting = 0;

    if (taskloc > 0) {
      console.log("Task LOC : " + taskloc);
      setDecContourRate(1);
      setDecNestRate(10);
      setDecDwgRate(10);
      setDecPartRate(0.1);
      setDecTaskRate(10);

      setTaskPierces(taskpierces);
      ///////

      setCountOfDwgName(CountOfDwg_Name);
      setDwgsToNest(CountOfDwg_Name);
      setDwgsNested(0);

      console.log("Count of Dwg : " + CountOfDwg_Name);
      console.log("Dwg Rate : " + decDwgRate);
      console.log("Sum Qty : " + taskqty);
      console.log("Part Rate : " + decPartRate);
      console.log("Task Pierces : " + taskpierces);
      console.log("Contour Rate : " + decContourRate);
      // console.log(" Tasks Nets : " + esttaskList[selectedTaskId].TaskNests);
      console.log("Nest Rate : " + decNestRate);
      console.log("Task Rate : " + decTaskRate);

      console.log(esttaskList);

      let tasknest = 0;
      if (performedgetestimate) {
        tasknest = esttaskList[selectedTaskId].TaskNests;
      } else {
        tasknest = 0;
      }

      console.log("Task Qty : " + taskqty);
      console.log("Sum of Qty : " + parseFloat(esttaskList[selectedTaskId].SumOfQty));

      progcharge = (CountOfDwg_Name * decDwgRate)
        + (parseFloat(esttaskList[selectedTaskId].SumOfQty) * parseFloat(decPartRate))
        + (taskpierces * decContourRate)
        // + ((esttaskList[selectedTaskId].TaskNests * decNestRate)
        + ((tasknest * decNestRate)
          + (decTaskRate));



      console.log("Prog Charge : " + progcharge);

      setProgramming(progcharge);
      esttaskList[selectedTaskId].Task_Pgme_charge = progcharge;

      basic_cutting = parseFloat(taskloc) * parseFloat(decpermtrRate) + parseFloat(taskpierces) * parseFloat(decPierceRate);
      setTask_Basic_Cutting_Cost(parseFloat(basic_cutting).toFixed(2));
      esttaskList[selectedTaskId].Task_Basic_Cutting_Cost = parseFloat(basic_cutting).toFixed(2);
      esttaskList[selectedTaskId].Task_cuttingRate = decpermtrRate;
      esttaskList[selectedTaskId].Task_PierceRate = decPierceRate;
      let totalsheet = 1;

      setTaskNetWt(taskAreaWightData[2]["weight"]);

      let tmtrlhndlgrate = parseFloat(decMtrl_HandlingRate);
      console.log("Mtrl Hand Rate : " + decMtrl_HandlingRate);
      setTaskMtrlHandlingRate(tmtrlhndlgrate);
      esttaskList[selectedTaskId].Task_mtrlHandlingRate = tmtrlhndlgrate;

      if (decMtrl_HandlingRate < 10) {
        setDecMtrl_HandlingRate(10);
      }

      setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
      esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge = parseFloat(taskMtrlWeight * decMtrl_HandlingRate).toFixed(2);
      setTask_Mtrl_Handling_Charge(parseFloat(taskMtrlWeight * decMtrl_HandlingRate).toFixed(2));

      let MtrlWeight = parseFloat(parseFloat((parseFloat(decShLength) * parseFloat(decShWidth) * parseFloat(thickness) * parseFloat(specificwt) * 0.0001) * 0.001)).toFixed(3) // (Width * Length * thickness * Sp Weight)
      esttaskList[selectedTaskId].Task_Mtrl_Weight = MtrlWeight;


      //   Setup and Sheet Handling:- task.Task_Setup_loading_charge = task.Task_SettingUpRate + task.TotalSheet * task.Task_SheetHandlingRate


      setTaskSetupRate(Number(mchsetuprate));
      setTaskSheetHandlingRate(Number(decSheetLoadingRate));

      esttaskList[selectedTaskId].Task_SettingUpRate = Number(mchsetuprate);

      console.log("Machine Setting Up Rate Rs/Task : " + Number(mchsetuprate));

      console.log("Sheet Loading Rate Rs/Sheet : " + Number(decSheetLoadingRate));

      esttaskList[selectedTaskId].Task_SheetHandlingRate = Number((esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate)));
      setTaskSetupLoading(Number(mchsetuprate) + Number(decSheetLoadingRate));
      setTaskSetupLoading(Number(mchsetuprate) + (1 * Number(decSheetLoadingRate))); //Number(esttaskList[selectedTaskId].Task_SheetHandlingRate));
      esttaskList[selectedTaskId].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate))).toFixed(2);

      // console.log("Cutting : " + basic_cutting);
      // console.log("Setup : " + esttaskList[selectedTaskId].Task_Setup_loading_charge);
      // console.log("Programming : " + progcharge);
      // console.log("Mtrl Handling : " + esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);

      setJWCharges(0);
      let jwchargecalculation = 0;

      // console.log(decMtrl_HandlingRate);
      // if ((parseFloat(decMtrl_HandlingRate) < 10)) {
      //   //  setDecMtrl_HandlingRate(10);
      // decMtrl_HandlingRate = 10;
      // setDecMtrl_HandlingRate(decMtrl_HandlingRate);
      // }

      console.log(basic_cutting);
      console.log(mchsetuprate);
      console.log(decSheetLoadingRate);
      console.log(progcharge);
      console.log(decMtrl_HandlingRate);
      jwchargecalculation = (Number(basic_cutting) + Number(Number(mchsetuprate) + (1 * Number(decSheetLoadingRate))) + Number(progcharge) + Number(decMtrl_HandlingRate)).toFixed(2); //parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);
      //}
      setJWCharges(parseFloat(jwchargecalculation).toFixed(2));
      esttaskList[selectedTaskId].Task_JobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

      console.log("JW Charge Calculation : " + jwchargecalculation);

      setJWValue(parseFloat(jwchargecalculation).toFixed(2));
      esttaskList[selectedTaskId].Task_JW_Value = parseFloat(jwchargecalculation).toFixed(2);


      setTask_Mtrl_Cost(0);
      esttaskList[selectedTaskId].Task_Mtrl_Cost = 0;

      esttaskList[selectedTaskId].Task_Mtrl_rate = decMaterialRate;
      esttaskList[selectedTaskId].Task_mtrlHandlingRate = decMtrl_HandlingRate;
      esttaskList[selectedTaskId].Task_SheetHandlingRate = decSheetLoadingRate;

      taskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);
      Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
      jwvalue = parseFloat(jwchargecalculation).toFixed(2);

      esttaskList[selectedTaskId].Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
      esttaskList[selectedTaskId].TaskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

      setTPerMtrRate(parseFloat(Number(decMaterialRate) + Number(taskJobWorkCost) / taskloc).toFixed(2));
      esttaskList[selectedTaskId].Task_Per_Mtr_Rate = parseFloat(taskJobWorkCost / taskloc).toFixed(2);

      setPerMtrRate(parseFloat(Number(decMaterialRate) + Number(taskJobWorkCost) / taskloc).toFixed(2));

      if (taskMtrlWeight > 0) {
        console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(esttaskList[selectedTaskId].Task_Qtn_JW_Rate)) / taskMtrlWeight).toFixed(2));
        console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
        setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
        esttaskList[selectedTaskId].TaskPerKgCost = parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2);

        //  console.log(esttaskList[selectedTaskId].TaskPerKgCost);
        setPerKgRate(task_perkg_cost);
        setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
      }

      setTaskMtrlWeight(taskMtrlWeight);
      esttaskList[selectedTaskId].Task_Mtrl_Weight = taskMtrlWeight;
      //   console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));

      ////////////////////

      permtrRate = parseFloat((Number(tpermtrRate) + Number(taskJobWorkCost)) / tasknetwt).toFixed(2);

      setPerMtrRate(parseFloat(permtrRate).toFixed(2));

      mtaskno = parseInt(taskno + 1);

    }

    setEstTaskList(esttaskList);
    console.log(esttaskList);

    await postRequest(endpoints.UpdateQtnTaskListDetails, {
      quotationno: quotationNo, taskno: taskno, taskgrpData: esttaskList //, //taskgrpData,
      // taskcuttingcost: basic_cutting, taskprogcharge: progcharge, taskcuttingrate: decpermtrRate,
      // Task_PierceRate: decPierceRate, Task_NetWt: taskNetWt, taskrectweight: taskAreaWightData[1].weight, Task_MaterialRate: decMaterialRate,
      // tasksetuprate: mchsetuprate, Task_SheetHandlingRate: decSheetLoadingRate, Task_mtrlHandlingRate: decMtrl_HandlingRate, Task_Mtrl_rate: task_perkg_cost,
      // taskmtrlhndcharge: Task_Mtrl_Handling_Charge, taskjobworkcost: taskJobWorkCost, cntdwgname: CountOfDwg_Name, taskMtrlWeight: taskAreaWightData[2].weight,
      // taskloc: taskloc, taskholes: taskpierces, tasknetarea: taskAreaWightData[0].area, tasksumofqty: taskgrpData.SumOfQty, Task_Qtn_JW_Rate: Task_Qtn_JW_Rate
    }, (res) => {
      //console.log(res);
      if (res.status === 200) {
        alert("Task Rates Updated");
      }
    });

  }

  //********************************************************************************************* */
  // Clear All Modal Variables
  let clearmodalvariables = () => {
    setDecTaskSetupRate(0);
    setDecPerMtrRate(0);
    setProgramming(0);
    setTask_Basic_Cutting_Cost(0);
    setDecLengthRate(0);
    setTaskSetupLoading(0);
    setMaterialHandling(0);

    setTPerMtrRate(0);
    setTask_perkg_cost(0);
    setJWCharges(0);
    setJWValue(0);
    setJWTarget(0);
    setTask_Qtn_JW_Rate(0);
    setJWChrg(0);
    setTask_Mtrl_Handling_Charge(0);
    setDecPierceRate(0);
    // setMchSetUpRate(200);
    setMchSetUpRate(0);
    setDecSheetLoadingRate(10);
    setDecMtrl_HandlingRate(2);
    setDecMaterialRate(0);
    setDecTaskSetupRate(0);
    setTask_Mtrl_Handling_Charge(0);
  }

  let closeRateEstimator = async () => {
    if (profileList.length == 0) {
      let cfirm = window.confirm("Drawings not Imported, Info shall not be Saved. Do you want to Close Rate Estimator ?");
      if (cfirm) {
        console.log(cfirm);
        await postRequest(endpoints.deleteFromAllTables, { quotationNo: quotationNo }, (data) => {
          console.log(data);
        });
        navigate(-1);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }

  //================================================================================
  // Set Material Rate Calculation
  //================================================================================
  const setMaterialRate = async (material, grade) => {

    console.log("Material Rate Calculation ")
    //  console.log(esttaskList);
    let filter;

    // if (esttaskList.length > 0) {
    //   if ((esttaskList[selectedTaskId].grade == "") || (esttaskList[selectedTaskId].grade == "Basic")) {
    //     filter = 'Basic';
    //   }
    //   else {
    //     filter = esttaskList[selectedTaskId].grade;
    //   }

    if ((grade == "") || (grade == "Basic")) {
      filter = 'Basic';
    }
    else {
      filter = grade;
    }

    let dmtrlrate = 0;
    //postRequest(endpoints.getTaskMaterialRates, { mmatrl: esttaskList[selectedTaskId].material, filter }, (data) => {
    postRequest(endpoints.getTaskMaterialRates, { mmatrl: material, filter }, (data) => {
      if (data.length > 0) {
        //    console.log("Material Rate : " + data[0].Rate);
        dmtrlrate = data[0].Rate;
        setDecMaterialRate(data[0].Rate);
      }
      else {
        //        console.log("Material Rate not found")
        dmtrlrate = 0;
        setDecMaterialRate(0);
      }
    });
    // } else {
    //   console.log(tasklistdata);

    //   console.log(tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['grade']);
    //   console.log(tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['material']);

    //   if ((tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['grade'] == "") || (tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['grade'] == "Basic")) {
    //     filter = 'Basic';
    //   } else {
    //     filter = tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['grade'];
    //   }

    //   let mtrl = tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['material'];
    //   let dmtrlrate = 0;
    //   postRequest(endpoints.getTaskMaterialRates, { mmatrl: mtrl, filter }, (data) => {
    //     if (data.length > 0) {
    //       //    console.log("Material Rate : " + data[0].Rate);
    //       dmtrlrate = data[0].Rate;
    //       setDecMaterialRate(data[0].Rate);
    //     }
    //     else {
    //       //        console.log("Material Rate not found")
    //       dmtrlrate = 0;
    //       setDecMaterialRate(0);
    //     }
    //   });
    // }
  }

  //================================================================================
  // Set Process Rate Calculation
  //================================================================================
  const setProcessRate = async (material, operation) => {
    console.log("set Process Rate Calculation ");
    // console.log(esttaskList[selectedTaskId].material);
    //  console.log(esttaskList[selectedTaskId].Operation);
    let [LastThickness, LastRate, PierceRate, DifThickness, DifRate, DifPierce, AverageRate, AvgPierc] = Array(8).fill(0.00); // decimal
    let opermtrldata = [];

    // console.log(taskgrpData);
    // console.log(taskgrpData[0].material)
    // console.log(taskgrpData[0].operation)
    //postRequest(endpoints.getOperationMtrlRateList, { material: taskgrpData[0].material, process: taskgrpData[0].operation, dblThickness }, async (opdata) => {
    //    postRequest(endpoints.getOperationMtrlRateList, { material: esttaskList[selectedTaskId].Material, process: esttaskList[selectedTaskId].Operation, dblThickness }, async (opdata) => {

    postRequest(endpoints.getOperationMtrlRateList, { material, process: operation, dblThickness }, async (opdata) => {

      if ((opdata !== "") || (opdata != null)) {
        //      console.log("Mtrl Thickness : " + dblThickness)
        opermtrldata = opdata;
        //console.log(opermtrldata);

        //    }
        //  });
        // console.log("Operation Mtrl Rate List : " + opermtrldata.length)
        //  if (opermtrldata.length > 0) {
        //console.log(dblThickness);
        for (let i = 0; i < opermtrldata.length; i++) {
          if (opermtrldata[i].Thickness == dblThickness) {
            setDecPierceRate(opermtrldata[i].Rate_PerPierce)
            setDecLengthRate(opermtrldata[i].Rate_perMtr)
            //  setDecPerMtrRate(opermtrldata[i].Rate_perMtr); // + opermtrldata[i].Rate_PerPierce)
            // decLengthRate = opermtrldata[i].Rate_perMtr;
            //  decPierceRate = opermtrldata[i].Rate_PerPierce;
            console.log("Rate Per Mtr : " + opermtrldata[i].Rate_perMtr);
            console.log("Rate Per Pierce : " + opermtrldata[i].Rate_PerPierce);
          }
          else if (opermtrldata[i].Thickness < dblThickness) {
            LastRate = opermtrldata[i].Rate_perMtr;
            LastThickness = opermtrldata[i].Thickness;
            PierceRate = opermtrldata[i].Rate_PerPierce;
            //   decLengthRate = opermtrldata[i].Rate_perMtr;
            //  decPierceRate = opermtrldata[i].Rate_PerPierce;
          }
          else if (opermtrldata[i].Thickness > dblThickness) {
            //  'SET average rate between the Last and this rate
            DifThickness = opermtrldata[i].Thickness - LastThickness;
            DifRate = opermtrldata[i].Rate_perMtr - LastRate;
            DifPierce = opermtrldata[i].Rate_PerPierce - PierceRate;
            AverageRate = parseFloat(DifRate / DifThickness);
            AvgPierc = parseFloat(DifPierce / DifThickness);

            setDecLengthRate(LastRate + AverageRate * (dblThickness - LastThickness))
            setDecPierceRate(PierceRate + parseFloat(AvgPierc * (dblThickness - LastThickness)))
            // decLengthRate = LastRate + AverageRate * (dblThickness - LastThickness);
            // decPierceRate = PierceRate + parseFloat(AvgPierc * (dblThickness - LastThickness));

            break;
          }
          else {
            setDecLengthRate(0)
            setDecPierceRate(0)
            decLengthRate = 0;
            decPierceRate = 0;
          }
        }

        setDecPerMtrRate(parseFloat(decLengthRate));

        setDblThickness(thickness);
        setDecSheetLoadingRate(9.5 + parseFloat(thickness) * 0.5)

        ///   console.log(taskgrpData[0].Material)

        // switch (tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['material']) {
        //  switch (esttaskList[selectedTaskId].material) {
        switch (material) {
          case "Mild Steel":
            console.log("Thickness : " + thickness);

            if (parseFloat(thickness) <= 5.00) {
              setDecTaskSetupRate(50); // * parseFloat(taskqty)); //taskgrpData["SumOfQty"]));
              decTaskSetupRate = 50; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (parseFloat(thickness) > 5.00 && parseFloat(thickness) <= 10.00) {
              setDecTaskSetupRate(100); // * parseFloat(taskqty));   //parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 100; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);

            }
            else if (thickness > 10.00 && thickness <= 20.00) {
              setDecTaskSetupRate(150); // * parseFloat(taskqty));  // parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 150; //* parseFloat(taskqty);   // parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (thickness > 20) {
              setDecTaskSetupRate(thickness * 20); //* taskqty) // parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = (thickness * 20); //* taskqty; // parseFloat(taskgrpData["SumOfQty"]);
            }
            break;
          case "Stainless Steel":
            if (thickness <= 5) {
              setDecTaskSetupRate(50); // * parseFloat(taskqty));  // parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 50; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (thickness > 5 && thickness <= 10) {
              setDecTaskSetupRate(150); // * parseFloat(taskqty));  //parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 150; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (thickness > 10 && thickness <= 20) {
              setDecTaskSetupRate(200); // * parseFloat(taskqty));  // parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 200; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (thickness > 20) {
              setDecTaskSetupRate(thickness * 20); // * parseFloat(taskqty)); // parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = thickness * 20; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);
            }
            break;
          case "Aluminium":
            if (thickness <= 5) {
              setDecTaskSetupRate(100); // * parseFloat(taskqty));  //parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = 100; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
            }
            else if (thickness > 5 && thickness <= 10) {
              setDecTaskSetupRate(200); // * parseFloat(taskqty));  // parseFloat(taskgrpData["SumOfQty"]));
              decTaskSetupRate = 200; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
            }
            else {
              setDecTaskSetupRate(thickness * 20); // * parseFloat(taskqty));  //parseFloat(taskgrpData["SumOfQty"]))
              decTaskSetupRate = thickness * 20; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
            }
            break;
          // default:
          //   setDecTaskSetupRate(200); // * parseFloat(taskqty));  //parseFloat(taskgrpData["SumOfQty"]));
          //   decTaskSetupRate = 200; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);
          //   break;
        }

        //  }
      }
    });

  }

  //==========================================================================
  // Set Handling rates Calculation
  //==========================================================================

  const setHandlingRates = async (material) => {

    console.log("Handling Rates Calculation")
    //postRequest(endpoints.getMaterialHandlingRates, { material: taskgrpData[0].material }, (handlingRates) => {
    //    postRequest(endpoints.getMaterialHandlingRates, { material: esttaskList[selectedTaskId].material }, (handlingRates) => {
    //postRequest(endpoints.getMaterialHandlingRates, { material: tasklistdata[Object.keys(tasklistdata)[0]][selectedTaskId]['material'] }, (handlingRates) => {
    postRequest(endpoints.getMaterialHandlingRates, { material }, (handlingRates) => {

      console.log(handlingRates)
      if (handlingRates.length > 0) {
        // Update state with the values from the first matching record
        setDecMtrl_HandlingRate(handlingRates[0].Hahndling_Rate);
        setDecSheetLoadingRate(handlingRates[0].Sheet_Loading_rate);
        setMchSetUpRate(decTaskSetupRate + parseFloat(handlingRates[0].Sheet_Loading_rate));
      }
    });

    Task_Mtrl_Handling_Charge = parseFloat(taskMtrlWeight * decMtrl_HandlingRate).toFixed(2);
    setTask_Mtrl_Handling_Charge(Task_Mtrl_Handling_Charge < 10 ? 10 : Task_Mtrl_Handling_Charge);

  }

  //************* Programming Rate Calculation *********************** */
  const setProgrammingRate = async () => {

    setDecContourRate(1);
    setDecNestRate(10);
    setDecDwgRate(10);
    setDecPartRate(0.1);
    setDecTaskRate(10);
    setDecProgramCharge(0);

    await postRequest(endpoints.getTaskProgrammingRates, {}, async (prgratedata) => {
      if (prgratedata.length > 0) {
        setDecContourRate(1);
        setDecNestRate(10);
        setDecDwgRate(10);
        setDecPartRate(0.1);
        setDecTaskRate(10);
        setDecProgramCharge(0);
      } else {
        setDecContourRate(prgratedata[0].perContour);
        setDecNestRate(prgratedata[0].perNest);
        setDecDwgRate(prgratedata[0].perDwg);
        setDecPartRate(prgratedata[0].perPart);
        setDecTaskRate(prgratedata[0].perTask);
        // setDecProgramCharge(prgratedata[0].perProgramCharge);
        // setDecProgramCharge(prgratedata[0].perProgramCharge);

      }
    });
    console.log("Programming Rate : " + decProgramCharge);
    console.log("Contour Rate : " + decContourRate);
    console.log("Nest Rate : " + decNestRate);
    console.log("Dwg Rate : " + decDwgRate);
    console.log("Part Rate : " + decPartRate);
    console.log("Task Rate : " + decTaskRate);
  };

  //*************************************************************************** */
  // ***************** Set Part Rates ******************************************
  //*************************************************************************** */
  let setPartRates = async (taskgrpData, selectedTaskId) => {

    let partdetails = [];
    await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, async (res) => {
      setTaskList(res);
      partdetails = res;
    });
    //let setPartRates = async (taskgrpData) => {
    // console.log("***************** set Part Rates ***********************")
    // console.log("Task Grp Data : ");
    // console.log(partdetails);
    // console.log("Task Grp Data : ");
    // console.log(taskgrpData);
    // console.log("Est Data : ");
    // console.log(esttaskList);

    // console.log("taskList ");
    // console.log(taskList);    // TaskNo
    // console.log("taskselectedid : " + taskList[2].QtyNested);
    // console.log("********************************************** EST DATA FOR PART CALCULATIONS **********************************************");

    // partdetails.forEach((item, index) => {
    //   console.log(item.QtyNested);
    //   let PartToTaskRatio, partWtRation = 0;
    //   // console.log("Selected Task Id : " + selectedTaskId);
    //   // console.log("Task No : " + item.TaskNo);
    //   // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskNo);
    //   // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskPartArea);
    //   // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskPartRectArea);

    //   if (esttaskList[selectedTaskId].TaskNo == item.TaskNo) {
    //     console.log(" Item Qty Nested : " + item.QtyNested);
    //     if (item.QtyNested > 0) {

    //       if (esttaskList[selectedTaskId].TaskPartArea > 0) {
    //         PartToTaskRatio = (item.PartOutArea / esttaskList[selectedTaskId].TaskPartArea);
    //       } else {
    //         PartToTaskRatio = (item.PartRectArea / esttaskList[selectedTaskId].TaskPartRectArea);
    //       }
    //       partWtRation = (item.PartRectArea / esttaskList[selectedTaskId].TaskPartRectArea);
    //       item.Pgm_Charge = parseFloat(Number(esttaskList[selectedTaskId].Task_Pgme_charge) * Number(PartToTaskRatio)).toFixed(2);
    //       item.SetUp_Loading_Charge = parseFloat(Number(esttaskList[selectedTaskId].Task_Setup_loading_charge) * Number(PartToTaskRatio)).toFixed(3);
    //       item.Material_Handling_Charge = parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge * partWtRation).toFixed(2);
    //       item.Cutting_Charge = (item.LOC * esttaskList[selectedTaskId].Task_cuttingRate) + (item.NoofPierces * esttaskList[selectedTaskId].Task_PierceRate);

    //       // console.log("Cutting Charge : " + item.Cutting_Charge);
    //       // console.log("Material Handling Charge : " + item.Material_Handling_Charge);
    //       // console.log("Setup Loading Charge : " + item.SetUp_Loading_Charge);
    //       // console.log("Pgm Charge : " + item.Pgm_Charge);

    //       item.Unit_JobWork_Cost = (parseFloat(item.Cutting_Charge) + parseFloat(item.Material_Handling_Charge) + parseFloat(item.SetUp_Loading_Charge) + parseFloat(item.Pgm_Charge)).toFixed(2);
    //       console.log("Unit Job Work Cost : " + item.Unit_JobWork_Cost);
    //       console.log("Part To Task Ratio : " + PartToTaskRatio);
    //       console.log("Task Mtrl Cost : " + esttaskList[selectedTaskId].Task_Mtrl_Cost);
    //       item.Unit_Material_Cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
    //       item.Unit_Material_cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
    //       item.partRectWeight = parseFloat(Number(item.PartRectArea) * Number(thickness) * Number(specificwt) * 0.0001).toFixed(3);

    //       console.log("Unit Material Cost : " + item.Unit_Material_Cost);
    //       console.log("Unit Material cost : " + item.Unit_Material_cost);

    //     } else {
    //       item.Pgm_Charge = 0;
    //       item.Material_Handling_Charge = 0;
    //       item.Cutting_Charge = 0;
    //       item.Unit_JobWork_Cost = 0;
    //       item.Unit_Material_Cost = 0;
    //       item.Unit_Material_cost = 0;
    //       return;
    //     }
    //   }
    // });
    //  console.log(taskList);

    //   console.log(partdetails);
    //  console.log(partdetails[0].TaskNo);
    // console.log(esttaskList[selectedTaskId].taskno);
    for (let i = 0; i < partdetails.length; i++) {
      // if (partdetails[i].TaskNo == taskselectedid + 1) {
      //   partdetails[i].QtyNested = taskgrpData[i].Qty;
      // }

      let PartToTaskRatio, partWtRation = 0;
      // console.log("Selected Task Id : " + selectedTaskId);
      // console.log("Task No : " + item.TaskNo);
      // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskNo);
      // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskPartArea);
      // console.log("Est Task Part Area : " + esttaskList[selectedTaskId].TaskPartRectArea);

      console.log(" Partdetails taskno : " + partdetails[i].TaskNo);
      //   console.log(" EsttaskList taskno : " + esttaskList[selectedTaskId].taskno);

      // if (esttaskList[selectedTaskId].taskno == partdetails[i].TaskNo) {
      if (partdetails[i].TaskNo == taskselectedid + 1) {
        console.log(" Item Qty Nested : " + partdetails[i].QtyNested);
        if (partdetails[i].QtyNested > 0) {

          // console.log("Task Part Area : " + esttaskList[selectedTaskId].TaskPartArea);
          // console.log("Part Details - Part Out Area : " + partdetails[i].PartOutArea);
          // console.log("Task Part Rect Area : " + esttaskList[selectedTaskId].TaskPartRectArea);
          // console.log("Part Details - Part Rect Area : " + partdetails[i].PartRectArea)


          if (esttaskList[selectedTaskId].TaskPartArea > 0) {
            PartToTaskRatio = (partdetails[i].PartOutArea / esttaskList[selectedTaskId].TaskPartArea);
          } else {
            PartToTaskRatio = (partdetails[i].PartRectArea / esttaskList[selectedTaskId].TaskPartRectArea);
          }
          if (partdetails[i].PartRectArea > 0) {
            partWtRation = (partdetails[i].PartRectArea / esttaskList[selectedTaskId].TaskPartRectArea);
          } else {
            partWtRation = (partdetails[i].PartOutArea / esttaskList[selectedTaskId].TaskPartRectArea);
          }
          partdetails[i].Pgm_Charge = parseFloat(Number(esttaskList[selectedTaskId].Task_Pgme_charge) * Number(PartToTaskRatio)).toFixed(2);
          partdetails[i].SetUp_Loading_Charge = parseFloat(Number(esttaskList[selectedTaskId].Task_Setup_loading_charge) * Number(PartToTaskRatio)).toFixed(3);


          // console.log("Task Mtrl Hld Charges esttaskList : " + esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);  
          // console.log("Part Wt Ratio : " + partWtRation);
          // console.log(parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge) * parseFloat(partWtRation));

          partdetails[i].Material_Handling_Charge = parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge * partWtRation).toFixed(2);
          partdetails[i].Cutting_Charge = (partdetails[i].LOC * esttaskList[selectedTaskId].Task_cuttingRate) + (partdetails[i].NoofPierces * esttaskList[selectedTaskId].Task_PierceRate);

          // console.log("Cutting Charge : " + partdetails[i].Cutting_Charge);
          // console.log("Material Handling Charge : " + partdetails[i].Material_Handling_Charge);
          // console.log("Setup Loading Charge : " + partdetails[i].SetUp_Loading_Charge);
          // console.log("Pgm Charge : " + partdetails[i].Pgm_Charge);

          partdetails[i].Unit_JobWork_Cost = (parseFloat(partdetails[i].Cutting_Charge) +
            parseFloat(partdetails[i].Material_Handling_Charge) +
            parseFloat(partdetails[i].SetUp_Loading_Charge) +
            parseFloat(partdetails[i].Pgm_Charge)).toFixed(2);


          console.log("Unit Job Work Cost : " + partdetails[i].Unit_JobWork_Cost);
          console.log("Part To Task Ratio : " + PartToTaskRatio);
          console.log("Task Mtrl Cost : " + esttaskList[selectedTaskId].Task_Mtrl_Cost);
          partdetails[i].Unit_Material_Cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
          partdetails[i].Unit_Material_cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
          partdetails[i].partRectWeight = parseFloat(Number(partdetails[i].PartRectArea) * Number(thickness) * Number(specificwt) * 0.0001).toFixed(3);

          console.log("Unit Material Cost : " + partdetails[i].Unit_Material_Cost);
          console.log("Unit Material cost : " + partdetails[i].Unit_Material_cost);

        } else {
          partdetails[i].Pgm_Charge = 0;
          partdetails[i].Material_Handling_Charge = 0;
          partdetails[i].Cutting_Charge = 0;
          partdetails[i].Unit_JobWork_Cost = 0;
          partdetails[i].Unit_Material_Cost = 0;
          partdetails[i].Unit_Material_cost = 0;
          return;
        }
      }
    };

    setTaskList(partdetails);

    let tskdetails = partdetails.filter((item) => item.TaskNo === taskselectedid + 1);
    setTaskGrpData(tskdetails);

    console.log(tskdetails);
    console.log("Selected Task Id : ")
    console.log((selectedTaskId + 1));
    console.log("Part Details : ");
    console.log(partdetails);

    await postRequest(endpoints.updateTaskDetailsData, {
      quotationno: quotationNo, tskno: (selectedTaskId + 1), taskdetsdata: partdetails
    }, async (taskdetailsdata) => {

      console.log(taskdetailsdata);
    });

    for (let i = 0; i < tskdetails.length; i++) {
      tskdetails[i].Unit_JobWork_Cost = parseFloat(tskdetails[i].Unit_JobWork_Cost).toFixed(2);
      tskdetails[i].Unit_Material_Cost = parseFloat(tskdetails[i].Unit_Material_Cost).toFixed(2);
      tskdetails[i].Unit_Material_cost = parseFloat(tskdetails[i].Unit_Material_cost).toFixed(2);
    }

    //setTaskGrpData(taskList);
    // setTaskGrpData(tskdetails);
    // console.log(taskList);

  }


  // let tasknetwt = 0;

  // let tdetailsdata = [];
  //
  // console.log("getting Task Details")
  // await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, async (res) => {
  //   //     console.log(res);
  //   tdetailsdata = res;
  // });

  // console.log(tdetailsdata[selectedTaskId].TaskNo);
  // for (let v = 0; v < tdetailsdata.length; v++) {
  //   tasknetwt = tasknetwt + parseFloat(tdetailsdata[v].PartNetWt * tdetailsdata[v].QtyNested);
  // }

  // console.log(esttaskList);

  // for (let m = 0; m < esttaskList.length; m++) {
  //   // let dwg = TaskListdetsdata[m].Dwg_Name;

  //   console.log(tdetailsdata);

  //   for (let n = 0; n < tdetailsdata.length; n++) {
  //     let PartToTaskRatio, partWtRation = 0;

  //     console.log(" Task : " + esttaskList[m].QtnTaskID);
  //     console.log(" T Details : " + tdetailsdata[n].QtnTaskId);

  //     if (esttaskList[m].QtnTaskID == tdetailsdata[n].QtnTaskId) {
  //       tdetailsdata[n].PartNetWt = (tdetailsdata[n].PartNetArea * thickness * specificwt * 0.0001).toFixed(3);
  //       if (tdetailsdata[n].QtyNested > 0) {
  //         if (esttaskList[m].TaskPartArea > 0) {
  //           PartToTaskRatio = (tdetailsdata[n].PartOutArea / esttaskList[m].TaskPartArea);
  //         } else {
  //           PartToTaskRatio = (tdetailsdata[n].PartRectArea / esttaskList[m].TaskPartRectArea);
  //         }

  //         partWtRation = (tdetailsdata[n].PartRectArea / esttaskList[m].TaskPartRectArea);

  //         tdetailsdata[n].Pgm_Charge = parseFloat(Number(esttaskList[m].Task_Pgme_charge) * Number(PartToTaskRatio)).toFixed(2);

  //         //  tdetailsdata[n].SetUp_Loading_Charge = parseFloat(TaskListdetsdata[m].Task_Setup_loading_charge) * parseFloat(PartToTaskRatio * 10).toFixed(3);
  //         tdetailsdata[n].SetUp_Loading_Charge = parseFloat(Number(esttaskList[m].Task_Setup_loading_charge) * Number(PartToTaskRatio)).toFixed(3);

  //         tdetailsdata[n].Material_Handling_Charge = parseFloat(esttaskList[m].Task_Mtrl_Handling_Charge * partWtRation).toFixed(2);
  //         tdetailsdata[n].Cutting_Charge = (tdetailsdata[n].LOC * esttaskList[m].Task_cuttingRate) + (tdetailsdata[n].NoofPierces * esttaskList[m].Task_PierceRate);

  //         tdetailsdata[n].Unit_JobWork_Cost = (parseFloat(tdetailsdata[n].Cutting_Charge) + parseFloat(tdetailsdata[n].Material_Handling_Charge) + parseFloat(tdetailsdata[n].SetUp_Loading_Charge) + parseFloat(tdetailsdata[n].Pgm_Charge)).toFixed(2);
  //         console.log("Unit Job Work Cost : " + tdetailsdata[n].Unit_JobWork_Cost);
  //         console.log("Task Mtrl Cost : " + esttaskList[m].Task_Mtrl_Cost);

  //         tdetailsdata[n].Unit_Material_Cost = parseFloat(Number(esttaskList[m].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);

  //         tdetailsdata[n].partRectWeight = parseFloat(Number(tdetailsdata[n].PartRectArea) * Number(thickness) * Number(specificwt) * 0.0001).toFixed(3);
  /////////////////
  //         // console.log("Unit Job Work Cost : " + tdetailsdata[n].Unit_JobWork_Cost);
  //         console.log("Unit Material Cost : " + tdetailsdata[n].Unit_Material_Cost);

  //       } else {
  //         tdetailsdata[n].Pgm_Charge = 0;
  //         tdetailsdata[n].Material_Handling_Charge = 0;
  //         tdetailsdata[n].Cutting_Charge = 0;
  //         tdetailsdata[n].Unit_JobWork_Cost = 0;
  //         tdetailsdata[n].Unit_Material_Cost = 0;
  //         return;
  //       }

  //     }

  //   }

  // }

  // console.log(tdetailsdata);
  // let tskdetails = tdetailsdata.filter((item) => item.TaskNo === taskselectedid + 1);
  // // console.log(tskdetails);

  // // setTaskGrpData(tdetailsdata);
  // setTaskGrpData(tskdetails);
  // //setTaskGrpData(taskgrpData);
  // console.log(tskdetails);

  // await postRequest(endpoints.updateTaskDetailsData, {
  //   quotationno: quotationNo, taskNetWt: tasknetwt, taskdetsdata: tdetailsdata
  // }, async (taskdetailsdata) => {

  // //  setTaskDetailsData(taskdetailsdata);
  // //   setTaskGrpData(taskdetailsdata);

  //   //    }
  // });

  ///////////////////////////////////////////////////////////////
  // // }
  // //console.log(" Grid Data : " + JSON.stringify(taskgrpData));
  // for (let i = 0; i < tskdetails.length; i++) {
  //   tskdetails[i].Unit_JobWork_Cost = parseFloat(tskdetails[i].Unit_JobWork_Cost).toFixed(2);
  //   tskdetails[i].Unit_Material_Cost = parseFloat(tskdetails[i].Unit_Material_Cost).toFixed(2);
  //   tskdetails[i].Unit_Material_cost = parseFloat(tskdetails[i].Unit_Material_cost).toFixed(2);
  // }
  //}
  //********************* set PArt Rates End */

  //************************* Get Task List data from table for tab click************************************************** */
  const fnGetTaskListFromTable = async (index) => {
    //   alert(" Selected Task List Tab : " + index);
    console.log(index);
    await postRequest(endpoints.getTaskListDataByQtnNo, { QtnNo: quotationNo }, (res) => {
      console.log(res);
      if (res.length > 0) {
        setTasklistdata(res);
      }
      //  setTasklistdata(res);
    });
  }

  // ===== Recalculate =================
  const handlerecalcscheme = (e) => {
    console.log(e.target.value);
    setReCalcScheme(e.target.value);
  };


  //********** ReCalculate **************/
  let reCalcJW = async () => {
    console.log("======== Recalculate JW =======");
    console.log(recalcscheme);
    console.log(taskList);
    // Suresh Commented now
    await postRequest(endpoints.getTaskDetailsByTaskNo, { quotationNo: quotationNo, tskno: (selectedTaskId + 1) }, (tskdetls) => {
      console.log(tskdetls);
      taskdetailsdata = tskdetls;

    });
    //Suresh commented till here now
    console.log(taskdetailsdata);
    console.log(taskList);


    let JwRation = 0;
    let JwCost, taskrate = 0;
    let taskPosition = taskselectedid;
    let locratio = 0;

    let jwvalue = 0;
    jwvalue = esttaskList[selectedTaskId].TaskJobWorkCost;
    let jwtaskloc = esttaskList[selectedTaskId].TaskLOC;
    let jwtaskholes = esttaskList[selectedTaskId].TaskHoles;
    let jwvaluerecalc = 0;
    let TaskRate = 0;

    let originaljwvalue = jwvalue;
    if (jwtarget > 0) {
      jwvalue = jwtarget;
      setJWValue(jwtarget);
    }

    let jwcost = 0;
    switch (recalcscheme) {
      case "Normal":
        TaskRate = 0;

        console.log("JW Value : " + jwvalue);
        console.log("Db JW Rate");
        console.log(esttaskList[selectedTaskId].Task_Qtn_JW_Rate);

        let step1 = parseFloat(jwtarget) - parseFloat(esttaskList[selectedTaskId].TaskJobWorkCost);
        console.log("Step 1 : " + step1);

        let MarkUpPercnet = parseFloat(step1) / parseFloat(esttaskList[selectedTaskId].TaskJobWorkCost);
        console.log("Step 2 : " + MarkUpPercnet);


        //let MarkUpPercnet = ((parseFloat(jwvalue) - parseFloat(esttaskList[selectedTaskId].Task_Qtn_JW_Rate)) / parseFloat(esttaskList[selectedTaskId].Task_Qtn_JW_Rate)); //.toFixed(2);

        console.log("Markup : " + MarkUpPercnet);


        taskdetailsdata.forEach(item => {

          console.log("Unit Job Cost : " + item.Unit_JobWork_Cost);

          //  taskList.forEach(item => {

          jwcost = parseFloat((item.Unit_JobWork_Cost * (1 + MarkUpPercnet)));

          console.log("After Cal. Unit JW Cost : " + jwcost);

          item.Unit_JobWork_Cost = jwcost;

          // item.Unit_JobWork_cost = parseFloat(parseFloat(item.Unit_JobWork_cost) * parseFloat(1 + MarkUpPercnet)).toFixed(2);
          // console.log("After Cal. Unit JW cost : "+item.Unit_JobWork_cost);

          TaskRate += (parseFloat(jwcost) * parseFloat(item.QtyNested))
          //      console.log("Task Rate : " + TaskRate);

        });
        //      console.log("taskdetailsdata[0].Unit_JobWork_Cost : " + jwcost);
        esttaskList[selectedTaskId].Task_Qtn_JW_Rate = TaskRate;
        //      console.log("Final Task Rate : " + TaskRate);
        // (let q = 0; q < taskdetailsdata.length; q++) {
        // taskdetailsdata[q].Unit_JobWork_Cost = taskdetailsdata[q].Unit_JobWork_Cost * (1 + MarkUpPercnet);
        // TaskRate += taskdetailsdata[q].Unit_JobWork_Cost * taskdetailsdata[q].QtyNested
        // taskdetailsdata[q].Task_Qtn_JW_Rate = TaskRate;
        // }


        //////////////////////////////////////
        break;


      case "Default":
        console.log(" ****************  Default *************")

        let JwRation = 0;
        JwCost = 0;

        console.log(taskdetailsdata);

        taskdetailsdata.forEach(item => {
          console.log(item.QtyNested);
          if (item.QtyNested > 0) {
            item.New_Unit_JobWork_Cost = item.Unit_JobWork_Cost;
            console.log(item.Unit_JobWork_Cost);
            console.log(item.QtyNested);
            console.log(jwvalue);

            console.log(esttaskList[selectedTaskId].TaskJobWorkCost);

            JwRation = ((item.New_Unit_JobWork_Cost * item.QtyNested) / originaljwvalue);
            // / item.QtyNested);
            // esttaskList[selectedTaskId].TaskJobWorkCost) / item.QtyNested;

          } else {
            JwRation = 0;
          }
          console.log(JwRation);
          console.log(jwtarget);
          JwCost = (JwRation * jwtarget) / item.QtyNested;
          console.log(JwCost);
          setJWCost(JwCost);
          setJWChrg(JwCost);
          item.Unit_JobWork_Cost = JwCost;
          jwvaluerecalc = jwvaluerecalc + (JwCost * item.QtyNested);
          //   setTaskRate(prevTaskRate => prevTaskRate + (JwCost * item.QtyNested));
        });
        jwvalue = jwvaluerecalc;
        esttaskList[selectedTaskId].Task_Qtn_JW_Rate = jwvaluerecalc;
        setJWValue(parseFloat(jwvalue).toFixed(2));
        break;

      case "LOC":
        JwCost = 0;

        console.log(taskdetailsdata);
        taskdetailsdata.forEach(item => {
          let LocRatio = 0;
          if (item.QtyNested > 0) {
            LocRatio = item.LOC / jwtaskloc; //estdata[i].TaskLOC;
          } else {
            LocRatio = 0
          }
          JwCost = LocRatio * jwtarget
          item.Unit_JobWork_Cost = JwCost
          TaskRate += item.Unit_JobWork_Cost * item.QtyNested;
        });
        esttaskList[selectedTaskId].Task_Qtn_JW_Rate = TaskRate;
        break;

      case "PierceLOC":
        JwCost = 0;

        taskdetailsdata.forEach(item => {
          let LocRatio = 0;
          if (item.QtyNested > 0) {

            console.log("Item Loc : " + item.LOC);
            console.log("Item Pierce : " + item.NoofPierces);
            console.log("Task Loc : " + jwtaskloc);
            console.log("Task Pierce : " + jwtaskholes);

            locratio = ((item.LOC + item.NoofPierces) * 0.01) / ((jwtaskloc + jwtaskholes) * 0.01);

            console.log("Loc Ratio : " + locratio);
          } else {
            locratio = 0;
          }

          console.log("JW Target : " + jwtarget);

          JwCost = parseFloat(locratio * jwtarget);
          console.log("JW Cost : " + JwCost);

          item.Unit_JobWork_Cost = JwCost
          TaskRate += item.Unit_JobWork_Cost * item.QtyNested;
        });
        esttaskList[selectedTaskId].Task_Qtn_JW_Rate = TaskRate;
        break;


    }

    let filteredtlist = taskdetailsdata.filter((item) => item.TaskNo === selectedTaskId + 1);
    // setTaskGrpData(taskdetailsdata);
    setTaskGrpData(filteredtlist);

    console.log(taskdetailsdata);
    await postRequest(endpoints.UpdQtnTaskListJW, { quotationno: quotationNo, taskno: (selectedTaskId + 1), taskjwrate: parseFloat(jwtarget).toFixed(2), taskdets: taskdetailsdata },
      (Qtntask) => {

        //       if (status === "Success") {
        console.log("Job Work Rate Updated Successfully");
        //     }
      });

    console.log("2646 - Task Details : " + JSON.stringify(taskdetailsdata));
    await postRequest(endpoints.UpdateProfileJWCost, { quotationNo: quotationNo, taskdetailsdata }, (tskdetls) => {
      setTaskGrpData(tskdetls);
    });


  }


  // Recalculate Material Cost

  let reCalcMtrl = async () => {
    console.log("======== Recalculate Material =======");
    //***** reaclcualte and Distribute part jw rates to align with target rates
    if (materialtarget > 0) {
      setMaterialValue(materialtarget);
    }

    let materialvalue = 0;
    materialvalue = esttaskList[selectedTaskId].Task_Mtrl_Cost;
    let partwisedata = [];
    await postRequest(endpoints.getTaskDetailsByTaskNo, { quotationNo: quotationNo, tskno: (selectedTaskId + 1) }, (tskdetls) => {
      console.log(tskdetls);
      partwisedata = tskdetls;
    });
    console.log(partwisedata);

    setTaskList(partwisedata);
    let mtrlvaluerecalc = 0;
    let originalmtrlvalue = materialvalue;
    let MtrlRatio = "0.00"
    let MtrlCost = "0.00";

    let TaskRate = 0;


    console.log(taskList);

    //  let filteredtasklist = taskList.filter((item) => item.TaskNo === selectedTaskId + 1);

    switch (recalcscheme) {
      case "Normal":
        //  console.log("Normal Scheme");
        TaskRate = 0;
        //     Dim MarkUpPercnet As Double = (tgtValue - BS_TaskList.Current.item("Task_Qtn_Mtrl_Rate")) / CDbl(BS_TaskList.Current.item("Task_Qtn_Mtrl_Rate"))

        let step1 = parseFloat(materialtarget) - parseFloat(esttaskList[selectedTaskId].Task_Qtn_Mtrl_Rate);

        console.log("Step 1 : " + step1);

        let MarkUpPercnet = parseFloat(step1) / parseFloat(esttaskList[selectedTaskId].Task_Qtn_Mtrl_Rate);

        console.log("Step 2 : " + MarkUpPercnet);

        for (let i = 0; i < taskList.length; i++) {
          //  filteredtasklist.forEach(item => {
          if (taskList[i].TaskNo === selectedTaskId + 1) {
            MtrlCost = (taskList[i].Unit_Material_cost * (1 + MarkUpPercnet));
            console.log("Unit Material Cost : " + MtrlCost);

            taskList[i].Unit_Material_cost = MtrlCost;

            TaskRate += MtrlCost * taskList[i].QtyNested;
          } else { continue; }

        };
        esttaskList[selectedTaskId].Task_Qtn_Mtrl_Rate = parseFloat(TaskRate).toFixed(2);
        setTaskList(taskList);
        // for (let i = 0; i < taskgrpData.length; i++) {
        //   let MarkUpPercnet = ((materialvalue - taskgrpData[i].Task_Mtrl_Cost) / taskgrpData[i].Task_Mtrl_Cost)
        //   taskgrpData[i]["Unit_Material_Cost"] = taskgrpData[i]["Unit_Material_Cost"] * (1 + MarkUpPercnet)
        //   TaskRate += taskgrpData[i]["Unit_Material_Cost"] * taskgrpData[i]["QtyNested"]
        // }
        break;
      default:
        console.log("Default Scheme");
        TaskRate = 0;
        // filtered
        taskList.forEach(item => {

          item.New_Unit_Material_Cost = (item.Unit_Material_cost > 0 ? item.Unit_Material_cost : item.Unit_Material_Cost);

          let MtrlRatio = 0;
          if (item.QtyNested > 0) {

            MtrlRatio = (((item.PartOutArea * item.QtyNested) / esttaskList[selectedTaskId].TaskPartArea) / item.QtyNested);

          } else {
            MtrlRatio = 0;
          }
          MtrlCost = parseFloat(parseFloat(MtrlRatio) * parseFloat(materialtarget)).toFixed(2);
          item.Unit_Material_cost = MtrlCost;
          item.Unit_Material_Cost = MtrlCost;
          TaskRate += MtrlCost * item.QtyNested;
        });
        setMaterialValue(0);
        setMaterialValue(TaskRate);
        esttaskList[selectedTaskId].Task_Qtn_Mtrl_Rate = parseFloat(TaskRate).toFixed(2);
        setMaterialValue(parseFloat(materialvalue).toFixed(2));

        setTaskList(taskList);
        break;
    }

    console.log("taskList Saving ");
    await postRequest(endpoints.UpdQtnTaskListMtrl, { quotationno: quotationNo, taskno: (selectedTaskId + 1), taskmtrlrate: parseFloat(TaskRate).toFixed(2), taskdets: taskList },
      (Qtntask) => {

        //    if (status === "Success") {
        console.log("Job Work Rate Updated Successfully");
        //  }
      });

    let taskmtrlcostlist = [];
    await postRequest(endpoints.UpdateProfileMtrlCost, { quotationNo: quotationNo, taskList }, (tskdetls) => {
      setTaskGrpData(tskdetls);
      // taskmtrlcostlist = tskdetls;

      // console.log(tskdetls);
    });
    //   console.log(taskmtrlcostlist);
    // setTaskGrpData(taskgrpData);
    let filtrecalcmtrl = taskList.filter((item) => item.TaskNo === selectedTaskId + 1);
    setTaskGrpData(filtrecalcmtrl);
    // setTaskGrpData(taskList);

  }

  //*************************************************************************** */
  //*********************************************** */
  // Estimation Printing
  //************************************************* */
  let onClickPrintEstimate = () => {
    if (taskgrpData.length > 0) {
      //   setRereadBtn(false);
    }
    //   navigate(`printestimate/printestimate/${quotationNo}`)
    postRequest(endpoints.getQtnPrintEstmnDets, { quotationno: quotationNo }, (estprintdata) => {
      console.log(estprintdata);
      if (Object.keys(estprintdata).length > 0) {
        setEstPrintData(estprintdata);
        setOpenEstPrintModal(true);
      } else {
        console.log("No Data Found")
      }
    });

  }

  let rendertaskAreaWt = (taskdets) => {
    return (
      <tr>
        <td>{taskdets["type"]}</td>
        <td>{parseFloat(taskdets["area"]).toFixed(2)}</td>
        <td>{parseFloat(taskdets["weight"]).toFixed(3)}</td>
      </tr>
    )
  }

  const funcEditDXF = async () => {

    if (!window.dxffile) return alert("No DXF file selected");
    try {
      const request = await fetch('http://127.0.0.1:21341/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const response = await request.json();
      if (response.status == 'Service is running') {

        let launchservice = await filetoService(window.dxffile);
        console.log(launchservice);
        if (launchservice.status === 200) {
          if (window.confirm("Click OK to Load the edited file.")) {
            const readreq = await fetch('http://127.0.0.1:21341/getFile', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                filename: window.dxffile.name
              })
            })
            const readres = await readreq.json();
            if (readres.status === "File retrived") {
              arrayBufferToString(new Uint8Array(readres.data.data), 'UTF-8', async (filecontentdata) => {
                drawSvg(filecontentdata);
                let newdxf = new File([filecontentdata], window.dxffile.name, { type: "text/plain" });
                console.log(newdxf);
                window.dxffile = newdxf;

                let qno = quotationNo.replaceAll("/", "_");
                let month = qno.split("_")[1]
                let monthName = ["January", "Febraury", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

                let destPath = `\\QtnDwg\\` + monthName + "\\" + qno;
                await dxfupload([newdxf], destPath, (res) => {
                  if (res.status === 'success') {
                    toast.success("DXF file updated successfully");
                  }
                });
              });
            }
          }
        }
        console.log(launchservice);
      }
    } catch (error) {
      console.log(error);
      if (window.confirm("LazerCADService is not installed / running. Do you want to Download the installer ?")) {
        let dwl = document.createElement("a");
        dwl.href = require("../../../../../../lib/LazerCADServiceInstaller.exe");
        dwl.download = "LazerCADServiceInstaller.exe";
        dwl.click();
      } else {
        toast.warning("LazerCADService is not installed / running. Please install it first.");
      }
    }
  }

  const filetoService = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("material", material);
    formData.append("process", operation);
    formData.append("source", "Customer");
    formData.append("qty", profileList[selectedDwgId].quantity);

    console.log(formData);

    const res = await fetch('http://127.0.0.1:21341/editdxf', {
      method: 'POST',
      body: formData,
    });
    return res;
  }
  //****************************************************************** */
  //***** import rates as in task details
  //****************************************************************** */
  let importrates = () => {

    //     If MsgBox("Current Details will be deleted before importing. Continue?", MsgBoxStyle.YesNo) = MsgBoxResult.No Then
    //     Exit Sub
    // End If

    ////////////////////

    alert("Import Rates");

    //     let taskdets = [];
    //     let qtnprofileDetails = [];
    //     postRequest(endpoints.getTaskDetailsDataByQtn, { quotationno: quotationNo }, (taskdetailsdata) => {
    //       taskdets = taskdetailsdata;
    //     });
    //     postRequest(endpoints.getProfileDetbyQtnNo, { quotationno: quotationNo }, (qtnprofiledata) => {
    //       qtnprofileDetails = qtnprofiledata;
    //     });
    //     taskdets.forEach(taskpart => {
    //       const profile = qtnprofileDetails.find(
    //         profile => profile.ProfileId === taskpart.ProfileId
    //       );

    //       if (profile) {
    //         profile.LOC = taskpart.LOC;
    //         profile.NoOfPierces = taskpart.NoofPierces;
    //         profile.Unit_JobWork_Cost = taskpart.Unit_JobWork_Cost;
    //         profile.Unit_Material_cost = taskpart.Unit_Material_Cost;
    //         profile.QtyNested = taskpart.QtyNested;
    //       }
    //     });

    // postRequest(endpoints.UpdateImportedRatesProfileDetails, { quotationno: quotationNo, qtnprofileDetails}, (resp) => {
    //   if (resp.status == "success") {
    //     alert("Imported Rates Successfully");
    //   }
    // });

    // to send a true flag to update the rates in task details in adddetails page and set the same
    //////////////////////////////////
    // for (let i = 0; i < taskdetailsdata.length; i++) {
    //   let taskpart = taskdetailsdata[i];
    //   let profile = profileList.find((x) => x["ProfileId"] == taskpart["ProfileId"]);

    //   if (profile) {
    //     profile.LOC = taskpart.LOC;
    //     profile.NoOfPierces = taskpart.NoofPierces;
    //     profile.Unit_JobWork_Cost = taskpart.Unit_JobWork_Cost;
    //     profile.Unit_Material_cost = taskpart.Unit_Material_Cost;
    //     profile.QtyNested = taskpart.QtyNested;
    //   }
    // }

    // postRequest(endpoints.UpdateImportedRatesProfileDetails, profileList, (resp) => {
    //   if (resp.status == "success") {
    //     alert("Profile Details Updated Successfully");
    //   }
    // });
  }
  //************************************************************************************* */

  let renderTaskDrawdets = (taskdwgdata) => {
    console.log(taskdwgdata)

    return (
      <tr>
        <td>{taskdwgdata.Dwg_Name || taskdwgdata.file.name}</td>
        <td><input type="checkbox" checked /></td>
        <td>{Number(taskdwgdata.partNetArea) > 0 ? Number(taskdwgdata.partNetArea).toFixed(2) : Number(taskdwgdata.PartNetArea).toFixed(2)}</td>
        <td>{Number(taskdwgdata.partNetWeight) > 0 ? Number(taskdwgdata.partNetWeight).toFixed(3) : Number(taskdwgdata.PartNetWt).toFixed(3)}</td>
        <td>{Number(taskdwgdata.rectWeight) > 0 ? Number(taskdwgdata.rectWeight).toFixed(3) : Number(taskdwgdata.RectWeight).toFixed(3)}</td>

        {/* <td>{Number(taskdwgdata.PartNetArea).toFixed(2) || Number(taskdwgdata.partNetArea).toFixed(2)}</td>
        <td>{parseFloat(taskdwgdata.PartNetWt).toFixed(3) || parseFloat(taskdwgdata.partNetWeight).toFixed(3)}</td>
        <td>{parseFloat(taskdwgdata.RectWeight).toFixed(3) || parseFloat(taskdwgdata.rectWeight).toFixed(3) || parseFloat(taskdwgdata.PartRectArea).toFixed(3)}</td>
         */}

        <td>{taskdwgdata.Qty || taskdwgdata.quantity}</td>
        <td>{taskdwgdata.QtyNested || taskdwgdata.Qty || taskdwgdata.quantity}</td>
        <td>{taskdwgdata.LOC || taskdwgdata.lengthOfCut}</td>
        <td>{taskdwgdata.NoofPierces || taskdwgdata.noOfPierces}</td>
        <td>{taskdwgdata.Complexity || taskdwgdata.complexity}</td>
        {/* <td><input type="checkbox" checked={taskdwgdata.OutOpen === "True"} /></td> */}
        <td><input type="checkbox" checked={(taskdwgdata.outOpen === "True")} /></td>
        <td>{parseFloat(taskdwgdata.Unit_JobWork_Cost).toFixed(2)}</td>
        <td>{parseFloat(taskdwgdata.Unit_Material_cost || taskdwgdata.Unit_Material_Cost).toFixed(2)}</td>

        {/* <td>{taskdwgdata.file.name}</td>
        <td><input type="checkbox" checked /></td>
        <td>{taskdwgdata.partNetArea}</td>
        {/* <td>{taskdwgdata.partNetWeight}</td> */}
        {/* <td>{taskdwgdata.PartNetWt}</td>
        <td>{taskdwgdata.rectWeight}</td>
        <td>{taskdwgdata.quantity}</td>
        <td>{taskdwgdata.quantity}</td>
        <td>{taskdwgdata.lengthOfCut}</td>
        <td>{taskdwgdata.noOfPierces}</td>
        <td>{taskdwgdata.complexity}</td>
        <td><input type="checkbox" checked={taskdwgdata.outOpen === "True"} /></td>
        <td>{taskdwgdata.Unit_JobWork_Cost}</td>
        <td>{taskdwgdata.Unit_Material_Cost}</td> */}
      </tr>
    )
  }

  //const [dwgfoldershow, setDwgFolderShow] = useState(false);
  const handleOpenDwgFolder = () => {

    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      console.log(files);
    };
    input.click();

    // setDwgFolderShow(true);
    // //  console.log(quotation.custcode);
    // let month = new Date(Date.now()).toLocaleString('en-US', { month: 'long' })
    // //let qno = new Date().getFullYear().toString() + "_" + (new Date().getMonth() + 1).toString().padStart(2, '0') + '_' + (parseInt(runningno[0]["Running_No"]) + 1).toString().padStart(3, '0')
    // let fpath = `\\QtnDwg\\${month}\\{quotationNo}`;
    // postRequest(endpoints.getDwgFiles, { quoteno: quotationNo, filepath: fpath }, (dwgdata) => {
    //   console.log(dwgdata);
    //   setCustDwgFiles(dwgdata.files);
    // });
  }
  // const handleCloseDwgFolder = () => setDwgFolderShow(false);


  return (

    <div>
      <div className="row">
        <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation No</label>
        </div>
        <div className="col-md-1 mt-1">
          <input type="text" id="formQuotationNo" disabled style={{ fontSize: '13px' }} value={quotationNo} />
        </div>

        <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Type</label>
        </div>
        <div className="col-md-1 mt-1">
          <input type="text" id="formType" style={{ fontSize: '13px' }} disabled value={quotationType} />
        </div>

        <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Status</label>
        </div>
        <div className="col-md-1 mt-1">
          <input type="text" id="formStatus" style={{ fontSize: '13px' }} disabled value={qtnstatus} />
        </div>
        <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Dt.</label>
        </div>
        <div className="col-md-1 mt-1">
          <input type="text" id="formEnqDate" style={{ fontSize: '13px' }} disabled value={quotation["enquiryDate"]} />
        </div>
        <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
        </div>
        <div className="col-md-3 mt-1">
          <input type="text" id="formCustomer" style={{ fontSize: '13px' }} disabled value={customer} />
        </div>
      </div>

      <div className="row">
        {/* <div className="col-md-1">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
        </div>
        <div className="col-md-4">
          <input type="text" id="formCustomer"  style={{ fontSize: '13px'}} disabled value={customer} />
        </div> */}
        <div className="col-md-1 ">
          <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Contact</label>
        </div>
        <div className="col-md-4">
          <input type="text" id="formContact" style={{ fontSize: '13px' }} value={quotation["contact"]} />
        </div>
      </div>

      <div className="row justify-content-center">
        <button
          className="button-style" disabled={importdwgbtn} style={{ width: "170px", fontSize: '13px' }}
          onClick={() => {
            if ((profileList.length > 0)) {
              setProfileAlertModal(true);
            } else {
              handleShow(true);
            }

          }
          }>Import Drawings
        </button>

        <button className="button-style " style={{ width: "150px", fontSize: '13px' }} onClick={handleOpenDwgFolder}>
          Drawing Folder
        </button>
        {/* {qtnformt === "Profile" ?
          <button className="button-style " style={{ width: "150px" }} onClick={importrates}>
            Import Rates
          </button> : null} */}

        <button className="button-style " style={{ width: "120px", fontSize: '13px' }} onClick={funcEditDXF} >
          Edit Dxf
        </button>

        <button className="button-style " style={{ width: "150px", fontSize: '13px' }} onClick={closeRateEstimator}>
          {/* , { state: { qtnprofdata: profileList } })}> */}
          {/* navigate("/quotation")}> */}
          Close
        </button>
      </div>

      <hr className="horizontal-line mt-1" />
      <Tabs defaultActiveKey="profileList" id="profileList" onSelect={(k) => setKey1(k)} className="mb-2 tab_font"
      // <Tabs defaultActiveKey="profileList" id="profileList" onSelect={(k) => fnGetTaskListFromTable(k)} className="mb-2 mt-3 tab_font"
      //activeKey={key1 ?? "profileList"}
      >
        <Tab eventKey="profileList" title="Profile List">
          {/* onClick={() => fnGetTaskListFromTable(0)}> */}
          <>
            <div className="row">
              <div className="col-md-8" style={{ height: "450px", overflowY: "scroll", overflowX: "scroll" }}>
                {" "}
                <Table striped className="table-data border" style={{ overflowY: "scroll", overflowX: "scroll" }}>
                  <thead className="tableHeaderBGColor">
                    <tr style={{ overflowY: "scroll", overflowX: "scroll", }}>
                      <th>Srl</th>
                      <th>Drawing/PartName</th>
                      <th>Operation</th>
                      <th>Material</th>
                      <th>MtrlGrade</th>
                      <th>Thickness</th>
                      <th>Qty</th>
                      <th>JW Cost</th>
                      <th>Mtrl Cost</th>
                      <th>Unit Rate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(profileList != null) || (!!selectedDwgId) ? profileList.map((mat, id) => {
                      return (
                        <tr className="custtr" style={{ backgroundColor: (selectedDwgId === id ? '#5d88fc' : ''), cursor: 'pointer' }} id={id} onClick={() => selectedrowItem(mat, id)}>
                          <td className="custtd">{id + 1}</td>
                          <td className="custtd">{mat.file?.name ?? mat.Dwg_Name}</td>
                          <td className="custtd">{mat.operation ?? mat.Operation}</td>
                          <td className="custtd">{mat.material ?? mat.Material}</td>
                          <td className="custtd">{mat.grade ?? mat.MtrlGrade}</td>
                          <td className="custtd">{mat.thickness ?? mat.Thickness}</td>
                          <td className="custtd">{mat.quantity ?? mat.Qty}</td>
                          <td className="custtd">{mat.Task_Qtn_JW_Rate ?? mat.Unit_JobWork_Cost}</td>
                          <td className="custtd">{mat.mtrlcost ?? mat.Unit_Material_cost}</td>
                          <td className="custtd">{mat.uitrate}</td>
                        </tr>
                      )
                    }) : <tr><td colSpan={7}>No Items Added</td></tr>}
                  </tbody>
                </Table>
              </div>
              <div className="col-md-4">
                <Tabs
                  defaultActiveKey="profiledwg" id="profiledwg"
                  // activeKey={key2 ?? "drawing"}
                  //onSelect={(k) => setKey2(k)}
                  className="mb-1 mt-2 tab_font"
                >
                  <Tab eventKey="profiledwg" title="Drawing">
                    <div id="dxf-content-container" className='dxf-content-container' />
                  </Tab>

                  <Tab eventKey="details" title="Details">
                    <div className="row">
                      <Form onSubmit={submitQtns}>
                        {/* <Form onSubmit={updateDwgTable}> */}
                        <div className="row">
                          <div className='col' >
                            <label className="form-label" style={{ fontSize: '13px' }}>Dwg / Part Name</label>
                            <input type="text" id="dwgname" style={{ fontSize: '13px' }} />
                          </div>
                        </div>
                        <div className="row" style={{ display: 'flex' }}>
                          {/* <div className='col' > */}
                          <label className="form-label row" style={{ fontSize: '13px' }}>Dwg Exists</label>
                          <input className="row" type="checkbox" style={{ fontSize: '13px' }} checked id="dwgexists" />
                          {/* </div> */}
                        </div>
                        <div className="row">
                          <div className='col-md-3' >
                            <label className="form-label" style={{ fontSize: '13px' }}>Operation</label>
                          </div>
                          <div className='col-md-9 mt-2' >
                            {/* <Form.Control type="text" controlId="operation" style={{ height: '30px' }} onChange={(e) => setOperation(e.target.value)} value={operation} /> */}
                            {procdata.length > 0 ?
                              <select className='ip-select' id="operation" style={{ fontSize: '13px' }} onChange={chosenprocess} >
                                <option value="" disabled selected>** Select **</option>
                                {procdata.map((proc) => {
                                  return (
                                    <option value={proc["ProcessDescription"]}> {proc["ProcessDescription"]}</option>
                                  )
                                })}
                              </select>
                              : ""
                            }


                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-3" >
                            <label className="form-label" style={{ fontSize: '13px' }}>Quantity</label>
                          </div>
                          <div className="col-md-9 mt-2" >
                            <input type="text" id="quantity" style={{ fontSize: '13px' }} />
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-md-3'>
                            <label className="form-label" style={{ fontSize: '13px' }}>Mtrl Code</label>
                          </div>
                          <div className='col-md-9 mt-2'>
                            {mtrldata.length > 0 ?
                              <select className='ip-select' id="mtrlcode" style={{ fontSize: '13px' }} value={mtrlcode} onChange={chosenmaterial}>
                                {/* (e) => setMtrlCode(e.target.value)}> */}
                                <option value="" disabled selected>** Select **</option>
                                {mtrldata.map((mtrl) => {
                                  return (
                                    <option value={mtrl["Mtrl_Code"]}> {mtrl["Mtrl_Code"]}</option>
                                  )
                                })}
                              </select>
                              : ""
                            }
                          </div>
                        </div>
                        <div className="row">
                          <div className='col-md-4' >
                            <label className="form-label" style={{ fontSize: '13px' }}>Material</label>
                           <input type="text" id="material" style={{ fontSize: '13px' }} onChange={(e) => setMaterial(e.target.value)} value={material} />
                          </div>
                          <div className='col-md-4' >
                            <label className="form-label" style={{ fontSize: '13px' }} >Grade </label>
                            <input type="text" id="grade" style={{ fontSize: '13px' }} onChange={(e) => setGrade(e.target.value)} value={grade} />
                          </div>
                          <div className='col-md-4' >
                        <label className="form-label" style={{ fontSize: '13px' }}>Thickness </label>
                        <input type="text" id="thickness" style={{ fontSize: '13px' }} disabled onChange={(e) => setThickness(e.target.value)} value={thickness} />
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className='col' >
                        <label className="form-label">Thickness </label>
                        <input type="text" id="thickness" disabled onChange={(e) => setThickness(e.target.value)} value={thickness} />
                      </div> */}
                      <div className='col-md-3 mt-1' >
                        <label className="form-label" style={{ fontSize: '13px' }}>Tolerance  </label>
                        </div>
                        <div className='col-md-9 mt-3' >
                        {ttypedata.length > 0 ?
                          <select className='ip-select' style={{ fontSize: '13px' }} id="tolerance" onChange={selectTType} defaultValue={ttypedata[5]}>
                            {/* <option defaultvalue={"Standard(+/-0.1mm)- 100 Microns"} selected>Standard(+/-0.1mm)- 100 Microns</option> */}
                            {ttypedata.map((ttype) => {
                              return (
                                <option selected={ttype["ToleranceType"] == tolerance} value={ttype["ToleranceType"]}>{ttype["ToleranceType"]}</option>
                              )
                            })}
                          </select>
                          : ""
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className='col-md-4' >
                        <label className="form-label" style={{ fontSize: '13px' }}>Insptn Level</label>
                        {/* <Form.Control type="text" size="sm" style={{ fontFamily: 'Roboto', fontSize: '14px' }} /> */}
                        {
                          insplvldata.length > 0 ?
                          <select id="inspectionlevel" style={{ fontSize: '13px' }} className="ip-select" onChange={selectInspLvl} defaultValue={insplvldata[0]}>
                            {/* value={inspectionlevel}> */}

                            {insplvldata.map((insplvl) => {
                              return (
                                <option value={insplvl["InspLevel"]}>{insplvl["InspLevel"]}</option>
                              )
                            })}
                          </select>
                          : ""
                        }
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" style={{ fontSize: '13px' }}>LOC</label>
                        <input type="text" style={{ fontSize: '13px' }} id="lengthOfCut" value={lengthOfCut} />
                      </div>

                      <div className='col-md-4' >
                        <label className="form-label" style={{ fontSize: '13px' }}>No of Pierces</label>
                        <input type="text" style={{ fontSize: '13px' }} id="noOfPierces" value={noOfPierces} />
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className='col' >
                        <label className="form-label">No of Pierces</label>
                        <input type="text" id="noOfPierces" value={noOfPierces} />
                      </div> */}

                      <div className='col-md-4'>
                        <label className="form-label" style={{ fontSize: '13px' }}>JW Cost</label>
                        <input type="text" style={{ fontSize: '13px' }} id="Task_Qtn_JW_Rate" value={jwcost} />
                      </div>
                    {/* </div>
                    <div className="row"> */}
                      <div className="col-md-4">
                        <label className="form-label" style={{ fontSize: '13px' }} >Mtrl Cost</label>
                        <input className="in-Fields" style={{ fontSize: '13px' }} type="text" id="mtrlcost" value={mtrlcost} />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" style={{ fontSize: '13px' }}>Unit Rate</label>
                        <input className="in-Fields" style={{ fontSize: '13px' }} type="text" id="unitrate" />
                      </div>
                    </div>

                    <div className="row mb-3 mt-2">

                      <button id="btnsave" type="submit" className="button-style" style={{ width: '110px', fontSize: '13px' }}>Save</button>

                      {/* <button id="btnUpdate" type="submit" className="button-style" disabled={updatebtn} style={{ width: '110px' }} >Update</button> */}

                      {/* <button id="btnsave" type="button" className="button-style" disabled={savebtn} style={{ width: '110px' }} onClick={() => { submitQtns() }}>Save</button>

                          <button id="btnUpdate" type="submit" className="button-style" disabled={updatebtn} style={{ width: '110px' }} >Update</button> */}

                      <button id="btndelete" className="button-style" disabled={deletebtn} style={{ width: '110px', fontSize: '13px' }} 
                      onClick={() => { deleteSelected() }}>Delete</button>
                    </div>

                  </Form>
              </div>

            </Tab>
          </Tabs>
        </div>
    </div>
          </>
        </Tab >

    <Tab eventKey="tasklist" title="Task List">
      {/* onClick={() => fnGetTaskListFromTable(1)}> */}
      {/* disabled={tasklisttab}> */}
      <div className='row' style={{ overflowY: "scroll" }}>
        <ToastContainer />
        <>

          <div className="row">
            <div className="row justify-content-center mt-1 mb-3">
              <button
                className="button-style" style={{ width: "150px" }} disabled={createtaskbtn} onClick={() => createTask()} >
                Create Tasks
              </button>
              <button className="button-style  " style={{ width: "150px" }}
                //  onClick={onClickGetEstimator}
                onClick={() => onClickGetEstimator()} disabled={estimationbtn}>
                {/* disabled={taskgrpData.length === 0 && estimationbtn}> */}
                Get Estimate
              </button>
              <button className="button-style  " style={{ width: "150px" }} onClick={() => onClickReRead()}>
                {/* disabled={taskgrpData.length === 0 && rereadbtn}> */}
                ReRead
              </button>
              <button
                className="button-style  "
                style={{ width: "150px" }} onClick={() => onClickSetTaskRate()} disabled={taskratesbtn}>
                {/* taskgrpData.length === 0 && taskratesbtn} */}
                {/* onClick={handleTaskRates} disabled={taskgrpData.length === 0} */}

                Set Task Rates
              </button>
              <button
                className="button-style  "
                style={{ width: "150px" }}
                onClick={onClickPrintEstimate} disabled={estprintbtn}>
                {/* taskgrpData.length === 0 && estprintbtn}> */}
                Print Estimate
              </button>
            </div>
            <div className="col-md-1"
              style={{ height: "180px", overflowY: "scroll" }}
            >
              {/* {" "} */}
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th style={{ fontSize: '12px', fontWeight: 'bold' }}>Task No</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tasklistdata).map((tasklist, id) => {
                    return (
                      <tr style={{ backgroundColor: selectedTaskId === id ? "#98A8F8" : "", cursor: "pointer" }} id={id} onClick={() => { taskselectorv2(tasklistdata[tasklist], id) }}>
                        <td>{id + 1}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <div className="col-md-3 ms-2">
              {" "}
              <div
                style={{
                  padding: "10px",
                  height: "160px",
                  cursor: "pointer",
                  width: "300px",
                  borderRadius: "8px",
                  boxShadow: "",
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <span>
                  <div className="row">
                    <label style={{ color: 'white' }}>Task No. : {taskno + 1}</label>
                  </div>
                  <div>
                    <label style={{ color: 'white' }}>{operation} </label>
                  </div>
                  <div>
                    <label style={{ color: 'white' }}>{material} {grade} {thickness} mm  </label>
                  </div>
                  <div>
                    <label style={{ color: 'white' }}>Tolerance : {tolerance}  </label>
                  </div>
                  <div>
                    <label style={{ color: 'white' }}>Inspection Level: {inspectionlevel} </label>
                  </div>
                  {" "}
                </span>
              </div>
            </div>

            <div
              className="col-md-3" style={{ height: "180px", fontSize: '12px', overflowY: "scroll" }}>
              {" "}
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor" style={{ fontSize: '14px' }}>
                  <tr>
                    <th>Type</th>
                    <th>Area (Sq. Cms)</th>
                    <th>Weight (Kgs)</th>
                  </tr>
                </thead>
                <tbody>
                  {taskAreaWightData != null ? taskAreaWightData.map((taskdets) => rendertaskAreaWt(taskdets)) : ""}
                </tbody>
              </Table>
            </div>
            <div className="col-md-4">
              {" "}
              <div className="row">
                <div className="col">
                  <label className="">Eff./ Per Mtr Rate</label>
                  <input style={{ marginTop: "5px", textAlign: 'right' }} value={tpermtrRate} />
                </div>
                <div className="col">
                  <label className="" style={{ whiteSpace: "nowrap" }}>
                    Per Kg Rate
                  </label>
                  <input style={{ marginTop: "5px" }} value={task_perkg_cost} />
                  {/* <input style={{ marginTop: "5px" }} onChange={(e) => setPerKgRate(e.target.value)} value={task_perkgRate} /> */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="">Utilisation %</label>
                  <input style={{ marginTop: "5px" }} onChange={(e) => setUtilisationPercent(e.target.value)} value={utilisationpercent} />
                </div>
                <div className="col">
                  <label className="" style={{ whiteSpace: "nowrap" }}>
                    Scrap %
                  </label>
                  <input style={{ marginTop: "5px" }} onChange={(e) => setScrapPercent(e.target.value)} value={scrappercent} />
                </div>
              </div>
            </div>
          </div>
          <hr className="horizontal-line mt-1" />
          <div className="row">
            {/* {" "} */}
            <div className="col-md-1">
              <label className="" style={{fontSize:'13px',fontWeight:'bold'}}>Nest Count</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={nestcount} />
            </div>
            <div className="col-md-1">
              <label className="" style={{ whiteSpace: "nowrap" }}>Dwgs to Nest</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={dwgstonest} />
            </div>
            <div className="col-md-1">
              <label className="">Dwgs Nested</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={dwgsnested} />
            </div>
            <div className="col-md-1">
              <label className="" style={{ whiteSpace: "nowrap" }}>Parts to Nest</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={partstonest} />
            </div>
            <div className="col-md-1">
              <label className="" style={{ whiteSpace: "nowrap" }}>Parts Nested</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={partsnested} />
            </div>
            <div className="col-md-1">
              <label className="">Task LOC (mtr) </label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={parseFloat(taskloc).toFixed(3)} />
            </div>
            <div className="col-md-1">
              <label className="">Pierces</label>
            </div>
            <div className="col-md-1">
              <input style={{ marginTop: "5px" }} type="text" disabled value={taskpierces} />
            </div>
          </div>
          <hr className="horizontal-line " />
          <div className="row " style={{ paddingLeft: "10px" }}>
            <div
              className="col-md-5 "
              style={{ marginLeft: "20px", marginTop: "30px" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ marginTop: "20px" }}>
                    <label
                      className="form-label"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Job Work
                    </label>
                    <br />
                    <label className="form-label " style={{ marginTop: "20px" }}>
                      Material
                    </label>
                  </div>
                  <div></div>

                  <div className="col-md-4" style={{ width: "100px", marginTop: "-30px", display: "flex", gap: "10px", }}>
                    <div>
                      <h6 style={{ marginLeft: "20px" }}> Value</h6>
                      <input style={{ width: "110px", marginTop: "30px", textAlign: 'right' }} value={jwvalue}></input>
                      <input style={{ width: "110px", marginTop: "30px", textAlign: 'right' }} onChange={(e) => setMaterialValue(e.target.value)} value={materialvalue}></input>
                    </div>
                    <div>
                      <h6 style={{ marginLeft: "20px" }}>Target</h6>
                      {/* <input
                            style={{ width: "110px", marginTop: "30px", textAlign: 'right' }} id="jwtarget" onChange={(e) => {
                              if (parseFloat(e.target.value) > 0) {
                                setJWValue(parseFloat(e.target.value))
                              }
                              setJWTarget(e.target.value)

                            }} value={jwtarget}></input> */}
                      <input style={{ width: "110px", marginTop: "30px", textAlign: 'right' }} id="jwtarget" onChange={(e) => { setJWTarget(e.target.value) }} value={jwtarget} />
                      <input style={{ width: "110px", marginTop: "30px", textAlign: 'right' }} onChange={(e) => setMaterialTarget(e.target.value)} value={materialtarget} />
                    </div>
                    <div>
                      <button className="button-style group-button" style={{ width: "100px", marginTop: "47px", }} onClick={() => reCalcJW()}>
                        Recalculate
                      </button>
                      <button className="button-style  group-button" style={{ width: "100px", marginTop: "19px", }} onClick={() => reCalcMtrl()}>
                        Recalculate
                      </button>
                    </div>
                  </div>
                </div>

              </div>
              <div className=" col-md -6 mt-2  mb-1">
                <div className="row">
                  <h8>
                    <h6>Recalc Scheme</h6>
                  </h8>
                  {/* <div className="row"> */}
                  <div
                    className="col-md-3 mt-1"
                    style={{ display: "flex", gap: "10px" }}>

                    <label className="form-label" style={{ paddingRight: "2px" }}>
                      {" "}
                      Default
                    </label>
                    <input
                      className="form-check-input" name="recalcscheme" style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("Default")}
                      type="radio" checked={recalcscheme === "Default"}
                    />
                  </div>

                  <div
                    className="col-md-3 mt-1"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <label className="form-label"> Normal</label>
                    <input
                      className="form-check-input" name="recalcscheme"
                      style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("Normal")}
                      type="radio"
                    />
                  </div>

                  <div
                    className="col-md-2 mt-1"
                    style={{ display: "flex", gap: "7px" }}
                  >
                    <label className="form-label" style={{ paddingRight: "3px" }}>
                      LOC
                    </label>
                    <input
                      className="form-check-input" name="recalcscheme"
                      style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("LOC")}
                      type="radio"
                    />
                  </div>

                  <div
                    className="col-md-4 mt-1"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <label className="form-label" style={{ paddingRight: "3px" }}>
                      PierceLOC
                    </label>
                    <input
                      className="form-check-input" name="recalcscheme"
                      style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("PierceLOC")}
                      type="radio"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 mt-2">
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div style={{ marginLeft: "10px" }}>
                    <label className=" form-label mt-3">Programming</label>
                    <label
                      className="form-label mt-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Task Setup Loading
                    </label>
                    <label className="form-label mt-2">Material Handling</label>
                  </div>
                  <div></div>
                  <div
                    className="col-md-4 "
                    style={{ width: "120px", marginTop: "-20px" }}
                  >
                    <h6 style={{ marginLeft: "20px" }}>Charges</h6>

                    <input className="mt-2" style={{ textAlign: 'right' }} value={programming}></input>
                    <input className="mt-2" style={{ marginTop: "35px", textAlign: 'right' }} value={tasksetuploading}></input>
                    <input className="mt-2" style={{ marginTop: "25px", textAlign: 'right' }} value={Task_Mtrl_Handling_Charge}></input>
                    {/* <input className="mt-3" style={{ marginTop: "25px", textAlign: 'right' }} value={decMtrl_HandlingRate}></input> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-2">
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ marginLeft: "45px" }}>
                  <label className="form-label mt-2">Cutting</label>
                  <br />
                  <label className="form-label mt-2">Job Work</label>
                  <br />
                  <label className="form-label mt-2">Material</label>
                </div>
                <div></div>
                <div
                  className="col-md-4 "
                  style={{ width: "120px", marginTop: "-20px" }}
                >
                  <h6 style={{ marginLeft: "20px" }}>Charges</h6>

                  <input className="mt-2" style={{ textAlign: 'right' }} value={Task_Basic_Cutting_Cost}></input>
                  <input className="mt-2" style={{ marginTop: "35px", textAlign: 'right' }} value={jwcharges}></input>
                  <input className="mt-2" style={{ marginTop: "25px", textAlign: 'right' }} value={materialcharges}></input>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2" style={{ height: "250px", fontSize: "10px", overflowY: "scroll" }}>
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Part/Dwg Name</th>
                  <th>Drawing Exists</th>
                  <th>Part NetArea (Sq. Cms)</th>
                  <th>Part NetWt (Kgs)</th>
                  <th>Rect Weight (Kgs)</th>
                  <th>To Quote Quantity</th>
                  <th>Nested Quantity</th>
                  <th>LOC (mtr)</th>
                  <th>Pierces</th>
                  <th>Complexity</th>
                  <th>Out Open</th>
                  <th>JW Cost</th>
                  <th>Material Cost</th>
                </tr>
              </thead>
              <tbody>
                {
                  (taskgrpData != null && taskgrpData.length > 0) ? taskgrpData.map((taskdwgdata) => renderTaskDrawdets(taskdwgdata)) : ""}
              </tbody>
            </Table>
          </div>
        </>
      </div>
    </Tab >
      </Tabs >

    {/* Import Drawings */ }

    < div className = "row mt-3 mt-3" style = {{ maxHeight: '600px' }
}>
  <Modal show={show}>
    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
      <Modal.Title >Enter Default Parameters for Import</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-style">
        <Form onSubmit={importdrawings} style={{ overflowY: 'scroll' }}>
          <div className="row mb-1">
            {/* <div className="col-md-2"> */}
            {/* <div className='row'> */}
            {/* <Form.Group controlId="mtrlcode"> */}
            <div className="col-md-3">
              <label className="form-label">Mtrl Code</label>
            </div>
            <div className="col-md-9">
              {mtrldata.length > 0 ? (
                <Typeahead
                  // id="basic-example"
                  id={mtrlcode}
                  labelKey="Mtrl_Code"
                  onChange={selectMtrl}
                  options={mtrldata}
                  placeholder="Choose a Material...">
                </Typeahead>
              ) : (
                ""
              )}

            </div>
            {/* </Form.Group> */}
          </div>
          <div className='row mt-2'>
            <div className="col-md-3" >
              <label className="form-label">Material</label>
            </div>
            <div className="col-md-9">
              <input type="text" id="material" onChange={(e) => setMaterial(e.target.value)} value={material} />
            </div>
          </div>
          <div className='row mt-1'>
            <div className="col-md-3" >
              <label className="form-label">Grade </label>
            </div>
            <div className="col-md-9">
              <input type="text" id="grade" value={grade} />
            </div>
          </div>

          <div className='row mt-1'>
            <div className="col-md-3" >
              <label className="form-label">Length </label>
            </div>
            <div className="col-md-9">
              <input type="text" onChange={(e) => setDecShLength(e.target.value)} value={decShLength} />
            </div>
          </div>
          <div className='row mt-1'>
            <div className="col-md-3" >
              <label className="form-label">Width </label>
            </div>
            <div className="col-md-9">
              <input type="text" onChange={(e) => setDecShWidth(e.target.value)} value={decShWidth} />
            </div>
          </div>

          <div className='row mt-1'>
            <div className="col-md-3" >
              <label className="form-label">Thickness </label>
            </div>
            <div className="col-md-9">
              <input type="text" id="thickness" onChange={(e) => setThickness(e.target.value)} value={thickness} />
            </div>
          </div>
          <div className='row mt-1'>
            {/* <Form.Group controlId="processdescription"> */}
            <div className="col-md-3">
              <label className="form-label">Process</label>
            </div>
            <div className="col-md-9">
              {procdata.length > 0 ? (
                <Typeahead
                  // id="basic-example"
                  id={operation}
                  labelKey="ProcessDescription"
                  onChange={selectProc}
                  options={procdata}
                  value={operation}
                  placeholder="Choose an Operation...">
                </Typeahead>
              ) : (
                ""
              )}

            </div>
            {/* </Form.Group> */}
          </div>
          <div className='row mt-1'>
            <div className="col-md-3">
              <label className="form-label">Quantity </label>
            </div>
            <div className="col-md-9">
              <input type="text" id="quantity" />
            </div>
          </div>
          <div className='row mt-1'>
            {/* <Form.Group controlId="files"> */}
            <div className="col-md-3">
              <label className="form-label">Select Files </label>
            </div>
            <div className="col-md-9">
              {/* <Form.Control type="file" id="files" multiple="multiple" accept=".dxf" /> */}
              <input type="file" id="files" multiple="multiple" accept=".dxf" />
            </div>
            {/* </Form.Group> */}
          </div>
          <div className='row mt-2'>
            <div className="col">
              <button className="button-style" type="submit" style={{ width: '120px' }}>Ok</button>
            </div>
            <div className="col">
              <button className="button-style" style={{ width: '120px' }} variant="secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Form>
      </div>
    </Modal.Body>
  </Modal>
      </div >

  {/* Drawing Folder */ }
{/* <div className="row mt-6 mt-3">
        <Modal show={dwgfoldershow}>
          <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
            <Modal.Title style={{ fontFamily: 'Roboto', fontSize: '18px' }}>Drawing Folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <ol style={{ padding: '0px 0px 0px 10px', fontFamily: 'Roboto', fontSize: '12px' }}>
                {custdwgfiles.map(files => (
                  <li>{files}</li>
                ))}
              </ol>
            </div>
            <div className="row">

              <button onClick={handleCloseDwgFolder} className="button-style">Close</button>

            </div>
          </Modal.Body>
        </Modal >
      </div> */}

{/* Set Task Rates Modal */ }

      <div className="row">
        <Modal show={taskratesshow}>

          <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
            <Modal.Title>Basic Rates for Quotation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 col-sm-12">
              <div >
                <div className="row">
                  {/* {(operation !== "" && material !== "") ? */}
                  <div className="col-md-12 mb-2">
                    <label className="form-label">{operation + ' - ' + material + ' ' + thickness}</label>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Eff. Rate / Mtr</label>
                  </div>
                  <div className="col-md-5">
                    {/* <input className='in-fields' id="tpermtrRate" onChange={(e) => setDecPerMtrRate(e.target.value)} value={decpermtrRate} /> */}
                    <input className='in-fields' id="decpermtrRate" onChange={checkNumeric} required value={decpermtrRate} />
                    {/* onChange={(e) => setDecPerMtrRate(e.target.value)} */}
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Per Pierce Rates</label>
                  </div>
                  <div className="col-md-5">
                    <input className='in-fields' id="decPierceRate" onChange={checkNumeric} required value={decPierceRate} />
                    {/* onChange={(e) => setDecPierceRate(e.target.value)} */}
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Machine Setting Up Rate Rs/Task</label>
                  </div>
                  <div className="col-md-5">
                    <input className='in-fields' id="mchsetuprate" onChange={checkNumeric} required value={mchsetuprate} />
                    {/* onChange={(e) => setMchSetUpRate(e.target.value)} */}
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Sheet Loading Rate Rs/Sheet</label>
                  </div>
                  <div className="col-md-5">
                    <input className='in-fields' id="decSheetLoadingRate" onChange={checkNumeric} required value={decSheetLoadingRate} />
                    {/* onChange={(e) => setDecSheetLoadingRate(e.target.value)} */}
                  </div>
                </div>
                <div className="row mt-1">

                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Material Handling Rate Rs/Kg</label>
                  </div>
                  <div className="col-md-5">
                    <input className='in-fields' id="decMtrl_HandlingRate" onChange={checkNumeric} required value={decMtrl_HandlingRate} />
                    {/* onChange={(e) => setDecMtrl_HandlingRate(e.target.value)} */}
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-7">
                    <label className="form-label" style={{ textAlign: 'right' }}>Material Sales Rate Rs/Kg</label>
                  </div>
                  <div className="col-md-5">
                    <input className='in-fields' id="mtrlsalerate" onChange={(e) => setMtrlSaleRate(e.target.value)} required value={mtrlsalerate} />
                    {/* onChange={(e) => setMtrlSaleRate(e.target.value)} */}
                  </div>

                </div>
              </div>
              <div className="row mt-1">
                <button className="button-style" style={{ backgroundColor: "#2b3a55", border: "#2b3a55", width: "100px" }} onClick={() => setTaskRates()}>
                  Accept
                </button>
                <button className="button-style" style={{ width: "100px" }} variant='secondary' onClick={() => handleCloseTaskRates()}>
                  Close
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
      <div>
        <ModalPrintEstimation openEstPrintModal={openEstPrintModal} EstData={estprintdata} handleClose={setOpenEstPrintModal} />
      </div>

      <AlertModal
        show={alertModal}
        onHide={(e) => setAlertModal(e)}
        firstbutton={fstbtnc}
        secondbutton={secbtnc}
        title="Alert !"
        message="Uploaded drawings has Open Contour, please verify table below. Do you wish to Continue ?"
        firstbuttontext="Yes"
        secondbuttontext="No"
      />

{/* <AlertModal
        show={alertSaveModal}
        onHide={(e) => setAlertSaveModal(e)}
        firstbutton={fstsvbtnc}
        secondbutton={secsvbtnc}
        title="Alert !"
        message="Not Imported any drawings data shall be saved. Do you wish to Continue ?"
        firstbuttontext="Yes"
        secondbuttontext="No"
      /> */}

<AlertModal
  show={profilealertModal}
  onHide={(e) => setProfileAlertModal(e)}
  firstbutton={() => profilefstbtnc()}
  secondbutton={() => profilesecbtnc()}
  thirdbutton={() => profilethdbtnc()}
  title="Alert !"
  message="This Quotation has Drawings, Delete Them ? Yes to Delete, No to Import & Cancel to Exit"
  firstbuttontext="Yes"
  secondbuttontext="No"
  thirdbuttontext="Cancel"
/>


{/* <AlertModal
        show={impratesalertModal}
        onHide={(e) => setImpRatesAlertModal(e)}
        firstbutton={() => impratesfstbtnc()}
        secondbutton={() => impratessecbtnc()}
        title="Alert !"
        message="Current Details will be deleted before importing. Continue?"
        firstbuttontext="Yes"
        secondbuttontext="No"
      /> */}



    </div >
  );
}
