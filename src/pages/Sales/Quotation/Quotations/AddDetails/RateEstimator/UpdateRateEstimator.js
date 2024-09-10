import React, { useEffect, useState } from "react";
import { Form, Modal, Tab, Tabs, Table } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import TaskList from "./Components/TaskList";
import { useQuotationContext } from "../../../../../../context/QuotationContext";
import { Helper } from 'dxf';
import AlertModal from "../../../../../../pages/components/alert";
import { Typeahead } from "react-bootstrap-typeahead";
import { Next } from "react-bootstrap/esm/PageItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRateEstimatorContext } from "../../../../../../context/RateEstimatorContext";

import moment from "moment";

import ModalPrintEstimation from "../../Print Quote/Estimation/Estimate/PrintEstimate";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");



function arrayBufferToString(buffer, encoding, callback) {
    var blob = new Blob([buffer], { type: 'text/plain' });
    var reader = new FileReader();
    reader.onload = function (evt) { callback(evt.target.result); };
    reader.readAsText(blob, encoding);
}

export default function UpdRateEstimator() {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let [openEstPrintModal, setOpenEstPrintModal] = useState(false);

    const { profileList, setProfileList } = useRateEstimatorContext();
    const { taskList, setTaskList } = useRateEstimatorContext();
    const { esttaskList, setEstTaskList } = useRateEstimatorContext();

    let [alertModal, setAlertModal] = useState(false);
    //const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [selectedDwgId, setSelectedDwgId] = useState("");
    let [recalcscheme, setReCalcScheme] = useState("Default");
    let [mtrlcode, setMtrlCode] = useState("");
    let [tolerance, setTolerance] = useState("Standard(+/-0.1mm)- 100 Microns");
    let [gradeid, setGradeID] = useState("");
    let [estprintdata, setEstPrintData] = useState([]);

    let [createbtn, setCreateBtn] = useState(true);
    let [estimationbtn, setEstimationBtn] = useState(true);
    let [rereadbtn, setReReadBtn] = useState(true);
    let [taskratesbtn, setTaskRatesBtn] = useState(false);
    let [estprintbtn, setEstPrintBtn] = useState(false);

    let [matrldata, setMatrlData] = useState([]);
    let [jwcost, setJWCost] = useState(0.00);

    let [inspectionlevel, setInspectionLevel] = useState("Insp1");
    let [operation, setOperation] = useState("");
    let [specificwt, setSpecificWt] = useState(0);
    let [qtnformt, setQtnFormt] = useState("");
    let [status, setStatus] = useState([]);
    let [custdwgfiles, setCustDwgFiles] = useState([]);
    let [quotationNo, setQuotationNo] = useState("");
    let [enquiryDate, setEnquiryDate] = useState("");

    let [qtnProfileData, setQtnProfileData] = useState([]);
    let [lengthOfCut, setLengthOfCut] = useState(0);
    let [noOfPierces, setNoofPierces] = useState(0);
    let [dxffiledata, setDxfFileData] = useState("");
    let [tasklistdata, setTasklistdata] = useState([]);
    let [tasksumqty, setTaskSumQty] = useState("");
    let [Task_Mtrl_Handling_Charge, setTask_Mtrl_Handling_Charge] = useState(0);

    let [mtrldata, setMtrldata] = useState([]);
    let [procdata, setProcdata] = useState([]);
    let [ttypedata, setTTypedata] = useState([]);
    let [mtrlgrdsdata, setMtrlGradedata] = useState([]);
    let [insplvldata, setInspLvldata] = useState([]);
    let [thickness, setThickness] = useState(0);
    let [grade, setGrade] = useState("");
    let [material, setMaterial] = useState("");
    let { quotation, setQuotationState } = useQuotationContext();
    let [taskgrpData, setTaskGrpData] = useState([]);

    let [profilealertModal, setProfileAlertModal] = useState(false);
    let [show, setShow] = useState(false);

    let [updatebtn, setUpdateBtn] = useState(true);
    let [deletebtn, setDeleteBtn] = useState(true);
    let [createtaskbtn, setCreateTaskBtn] = useState(false);
    let [tasklisttab, setTaskListTab] = useState(true);

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

    //Task List
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
    let [taskloc, setTaskLOC] = useState([]);
    let [pierces, setPierces] = useState([]);
    let [jwvalue, setJWValue] = useState(0.00);
    let [jwtarget, setJWTarget] = useState(0);
    let [materialvalue, setMaterialValue] = useState(0.00);
    let [materialtarget, setMaterialTarget] = useState([]);

    let [taskno, setTaskNo] = useState(0);
    let [taskNetWt, setTaskNetWt] = useState(0);
    let [nooftasks, setNoOfTasks] = useState(0);
    let [Task_Qtn_JW_Rate, setTask_Qtn_JW_Rate] = useState(0);
    let [programming, setProgramming] = useState(0.00);
    let [tasksetuploading, setTaskSetupLoading] = useState(0.00);
    let [materialhandling, setMaterialHandling] = useState(0.00);
    let [Task_Basic_Cutting_Cost, setTask_Basic_Cutting_Cost] = useState(0.00);
    let [jwcharges, setJWCharges] = useState(0.00);
    let [materialcharges, setMaterialCharges] = useState(0.00);
    let [estdata, setEstData] = useState([]);
    let [taskselectedid, setTaskSelectedId] = useState("");
    let [taskMtrlArea, setTaskMtrlArea] = useState(0);
    let [taskpierces, setTaskPierces] = useState([]);
    //    let [selectedTaskId, setSelectedTaskId] = useState("");
    //let [quotationNo, setQuotationNo] = useState("");

    let [sumqty, setSumQty] = useState({});
    let [tskNetArea, setTskNetArea] = useState({});
    let [taskNtWt, setTaskNtWt] = useState({});
    let [tskRectArea, setTskRectArea] = useState({});
    let [tskMtrlArea, setTskMtrlArea] = useState({});
    let [tskMtrlWt, setTskMtrlWt] = useState({});
    let [CountOfDwgName, setCountOfDwgName] = useState({});
    let [utilpercentage, setUtilPercentage] = useState({});
    let [scrappercentage, setScrapPercentage] = useState({});
    let [task_perkg_cost, setTask_perkg_cost] = useState({});
    let [tpermtrRate, setTPerMtrRate] = useState({});

    let [programmingchg, setProgrammingChg] = useState({});
    //  let [tasksetuploadingchg, setTaskSetupLoadingChg] = useState({});
    let [materialhandlingchg, setMaterialHandlingChg] = useState({});
    let [Task_Basic_Cutting_Costchg, setTask_Basic_Cutting_CostChg] = useState({});
    let [jwchargeschg, setJWChargesChg] = useState({});
    let [materialchargeschg, setMaterialChargesChg] = useState({});
    let [taskdwings, setTaskDwings] = useState({});
    let [taskRectWeight, setTaskRectWeight] = useState(0);

    let [decpermtrRate, setDecPerMtrRate] = useState(0);
    let [decPierceRate, setDecPierceRate] = useState(0.00);
    let [mchsetuprate, setMchSetUpRate] = useState(200);
    let [decSheetLoadingRate, setDecSheetLoadingRate] = useState(10.00);
    let [decMtrl_HandlingRate, setDecMtrl_HandlingRate] = useState(2.00);
    let [mtrlsalerate, setMtrlSaleRate] = useState(0);
    // let [task_perkg_cost, setTask_perkg_cost] = useState(0.00);
    let [taskMtrlWeight, setTaskMtrlWeight] = useState(0);
    let [taskdwgs, setTaskDwgs] = useState(0);
    let [selectedTaskId, setSelectedTaskId] = useState("");

    let [decMaterialRate, setDecMaterialRate] = useState(0.00);
    let [decLengthRate, setDecLengthRate] = useState(0.00);
    let [decTaskSetupRate, setDecTaskSetupRate] = useState(0.00);
    let [decContourRate, setDecContourRate] = useState(0.00);
    let [decPartRate, setDecPartRate] = useState(0.00);
    let [decDwgRate, setDecDwgRate] = useState(0.00);
    let [decNestRate, setDecNestRate] = useState(0.00);
    let [decTaskRate, setDecTaskRate] = useState(0.00);
    let [dblThickness, setDblThickness] = useState(0.00);
    let progcost = 0;

    // Quotation Data
    let [qtndata, setQtndata] = useState([]);
    let [customer, setcustomer] = useState("");
    let [enquiryRef, setEnquiryRef] = useState("");
    let [contact, setContact] = useState([]);
    let [quotationType, setQuotationType] = useState([]);
    let [qtnupd, setQtnUpd] = useState("");

    let [key1, setKey1] = useState("");
    let [key2, setKey2] = useState("");
    let [firstbuttontext, setFirstButtonText] = useState("");

    let [decShLength, setDecShLength] = useState(2500);
    let [decShWidth, setDecShWidth] = useState(1250);
    let [taskqty, setTaskQty] = useState(0);
    //Task Rates
    let [taskRateLOC, setTaskRateLOC] = useState(0);
    let [taskRateHoles, setTaskRateHoles] = useState(0);
    let [taskProgrammingCharge, setTaskProgrammingCharge] = useState(0);
    let [taskPartArea, setTaskPartArea] = useState(0);
    let [bs_taskparts, setBS_TaskParts] = useState([]);
    //let [MtrlCost, setMtrlCost] = useState(0);
    let [taskJobWorkCost, setTaskJobWorkCost] = useState(0);
    let [taskdetailsdata, setTaskDetailsData] = useState([]);
    let [qtnstatus, setQtnStatus] = useState([]);
    let [Task_Mtrl_Cost, setTask_Mtrl_Cost] = useState(0.00);
    let [mtrlcost, setMtrlCost] = useState(0.00);
    let [NoOfPierces, setNoOfPierces] = useState(0);
    let [UnitJobWorkRate, setUnitJobRate] = useState(0);
    let [unitrate, setUnitRate] = useState(0);
    let [tasksetuprate, setTaskSetupRate] = useState(0);
    let [tasksheethandlingrate, setTaskSheetHandlingRate] = useState(0);
    let [taskmtrlhandlingrate, setTaskMtrlHandlingRate] = useState(0);
    let [jwchrg, setJWChrg] = useState(0);
    let [qtntasklist, setQtnTaskList] = useState([]);
    let [taskdetails, setTaskDetails] = useState([]);

    useEffect(() => {
        //setQtnUpd(searchParams.get("qtnupdate"));

        quotationNo = searchParams.get("QtnNo");
        console.log(searchParams.get("QtnNo"));
        //   qtnformat = searchParams.get("qtnformat");
        async function fetchData() {
            await postRequest(endpoints.getMaterials, {}, (mdata) => {
                setMtrldata(mdata);
            });
            getRequest(endpoints.getProcessLists, (pdata) => {
                setProcdata(pdata);
            });

            getRequest(endpoints.getToleranceTypes, (ttdata) => {
                setTTypedata(ttdata);
                setTolerance("Standard(+/-0.1mm)- 100 Microns");
            });
            getRequest(endpoints.getInspectionLevels, (ildata) => {
                setInspLvldata(ildata);
                setInspectionLevel("Insp1");
            });

            // Profile List Details
            console.log(quotation['QtnNo']);
            await postRequest(endpoints.getQtnProfileDetails, { QtnNo: searchParams.get("QtnNo") }, (qtnprofdata) => {

                // quotation['QtnNo'] }, (qtnprofdata) => {
                //         console.log(qtnprofdata);
                qtnprofdata.map((item) => {
                    item.file = new File([item.filedata], item.Dwg_Name, { type: "plain/text" });
                });
                setQtnProfileData(qtnprofdata);
                setTaskGrpData(qtnprofdata);
            });

            // Task List Details
            await postRequest(endpoints.getTaskListData, { QtnNo: searchParams.get("QtnNo") }, (tldata) => {
                //quotation['QtnNo'] }, (tldata) => {
                //        console.log(tldata);
                setTasklistdata(tldata);
            });
        }
        fetchData();

        postRequest(endpoints.getMtrlGrades, {}, mgdata => {
            setMtrlGradedata(mgdata);
        });

        //    if (quotation !== undefined) {
        console.log(quotation);

        setQtndata(quotation);
        console.log(quotation["Contact"]);

        setContact(quotation["Contact"]);
        setStatus(quotation["status"]);

        console.log(quotation);
        console.log(quotation['QtnNo']);

        setcustomer(quotation["CustomerName"]);
        setQuotationType(quotation["QtnType"]);
        console.log(quotation["QtnType"]);
        //  console.log(quotation["contact"]);

        setQuotationNo(quotation['QtnNo'] ?? quotation['quoteno'] ?? searchParams.get("QtnNo"));
        setEnquiryDate(moment(quotation["enquiryDate"]).format("DD/MM/YYYY"));
        setEnquiryRef(quotation["enquiryRef"]);
        setQtnFormt(quotation["qtnformat"]);

        // setQtndata(quotation);
        // setContact(quotation["contact"]);
        // //setStatus(quotation["Status"]);
        // setQtnStatus(quotation["qtnStatus"]);
        // setcustomer(quotation["customerName"]);
        // setQuotationType(quotation["qtntype"]);
        // if (quotation["qtnno"] != null) {
        //   setQuotationNo(quotation['qtnno'])
        // } else if (quotation["quoteno"] != null) {
        //   setQuotationNo(quotation['quoteno'].replaceAll("_", "/"));
        // }
        setQtnStatus(quotation["qtnstatus"]);
        console.log(quotation["qtntype"]);
        //  setEnquiryDate(quotation["enquiryDate"]);
        setEnquiryRef(quotation["enquiryRef"]);
        setQtnFormt(quotation["qtnformat"]);

        // if (qtnstatus === "Qtn Sent") {
        //   setImportDwgBtn(true);
        // }
        console.log(esttaskList);
        setTasklistdata(esttaskList);

    }, []);


    async function dxfupload(files, destPath, response) {
        const data = new FormData();
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            data.append("files", files[i]);
        }
        console.log(data);
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



    const importdrawings = async (e) => {
        e.preventDefault();
        console.log("Import Drawings");
        console.log(qtnProfileData);
        if (firstbuttontext === "Yes") {
            //  qtnProfileData
            setQtnProfileData([]);
            setFirstButtonText("");
        }
        setShow(true);
        //    ResetQtn();
        console.log("Import Drawings");
        //console.log(document.getElementById("mtrlcode").value);
        let materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
        let material = e.target.elements.material.value;
        let grade = e.target.elements.grade.value;
        let thickness = e.target.elements.thickness.value;

        let process = operation; // processdescription; //e.target.elements.processdescription.value;
        let quantity = e.target.elements.quantity.value;
        let files = e.target.elements.files.files;

        console.log(files.length);
        console.log(process);
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            let drwfname = files[i];

            console.log(drwfname);
            locCalc(drwfname, material, grade, process, thickness, tolerance, inspectionlevel, (output) => {
                console.log(output);


                // setQtnProfileData((olddata) => [...olddata, {
                //   file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut, noOfPierces: output.noOfPierces,
                //   partNetArea: output.partNetArea, complexity: output.complexity, hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
                //   partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
                // }]);
                let olddata = qtnProfileData;
                console.log(olddata);


                if (olddata === null || olddata === undefined || olddata.length === 0) {
                    console.log("old data is null");
                    setQtnProfileData((olddata) => {
                        return [...olddata, {
                            file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut, noOfPierces: output.noOfPierces,
                            partNetArea: output.partNetArea, complexity: output.complexity, hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
                            partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
                        }]
                    });

                    console.log(qtnProfileData);

                } else {
                    setQtnProfileData((olddata) => {
                        // Append to existing olddata
                        return [...olddata, {
                            file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut,
                            noOfPierces: output.noOfPierces, partNetArea: output.partNetArea, complexity: output.complexity,
                            hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
                            partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
                        }];

                    });
                }

                console.log(qtnProfileData);

            });

            postRequest(endpoints.updSaveProfileListdata, { quotationNo: quotationNo, qtnProfileDat: qtnProfileData, dboperntype: "Save" }, (resp) => {
                setTaskGrpData(resp);

            });
            //---------------------------------- end -----------------------------------
            // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: loccalcoutput.lengthOfCut, noOfPierces: loccalcoutput.noOfPierces }]);
        }

        let qno = quotationNo.replaceAll("/", "_");
        let month = qno.split("_")[1]
        let monthName = ["January", "Febraury", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

        let destPath = `\\QtnDwg\\` + monthName + "\\" + qno; //quotationNo;

        dxfupload(files, destPath, (res) => {
            console.log(res);
        });

        window.dxffiles = files;
        console.log(materialcode, material, grade, thickness, process, quantity, files);
        setShow(false);



        // e.preventDefault();
        // //    ResetQtn();
        // console.log("Import Drawings");
        // //console.log(document.getElementById("mtrlcode").value);
        // let materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
        // let material = e.target.elements.material.value;
        // let grade = e.target.elements.grade.value;
        // let thickness = e.target.elements.thickness.value;
        // let process = processdescription; //e.target.elements.processdescription.value;
        // let quantity = e.target.elements.quantity.value;
        // let files = e.target.elements.files.files;

        // for (let i = 0; i < files.length; i++) {
        //     console.log(files[i]);
        //     let drwfname = files[i];
        //     console.log(drwfname);
        //     locCalc(drwfname, material, grade, thickness, (output) => {
        //         console.log(output);
        //         setQtnProfileData((olddata) => [...olddata, {
        //             file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut, noOfPierces: output.noOfPierces = true ? 1 : 0,
        //             partNetArea: output.partNetArea, complexity: output.complexity, hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
        //             partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
        //         }]);
        //         // if (output.hasOpenContour) {
        //         //   setHasOpenContour(output.hasOpenContour);
        //         // }
        //     });
        //     //---------------------------------- end -----------------------------------
        //     // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: loccalcoutput.lengthOfCut, noOfPierces: loccalcoutput.noOfPierces }]);
        // }
        // console.log(files);

        // // postRequest(endpoints.dxfupload, { files }, (res) => {
        // //   console.log(res);
        // // })

        // console.log(quotationNo);
        // let month = quotationNo.split("_")[1]
        // let monthName = ["January", "Febraury", "March", "April", "May", "June",
        //     "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]
        // let destPath = `\\QtnDwg\\` + monthName + "\\" + quotationNo;

        // dxfupload(files, destPath, (res) => {
        //     console.log(res);
        // })

        // // postRequest(endpoints.dxfupload, { files, destPath }, (res) => {
        // //   console.log(res);
        // // })

        // window.dxffiles = files;

        // // console.log(quotationNo);
        // // let month = quotationNo.split("_")[1]
        // // let monthName = ["January", "Febraury", "March", "April", "May", "June",
        // //   "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]
        // // let destPath = `\\QtnDwg\\` + monthName + "\\" + quotationNo;
        // // console.log(files);
        // // for (let i = 0; i < files.length; i++) {

        // //   let drwfname = files[i];

        // //   cpfile(drwfname, destPath, (msgdata) => {
        // //     console.log(msgdata);
        // //   })

        // // postRequest(endpoints.dxfCopy, { drwfname, destPath }, (msgdata) => {
        // //   console.log(msgdata);
        // // });
        // //}
        // console.log(materialcode, material, grade, thickness, process, quantity, files);
        // setShow(false);
    }

    // const importdrawings = async (e) => {
    //     e.preventDefault();
    //     setProfileList([]);
    //     setShow(true);
    //     console.log("Import Drawings");

    //     let materialcode = "";
    //     let material = "";
    //     let grade = "";
    //     let thickness = "";
    //     let process = "";
    //     let quantity = "";
    //     let files = "";
    //     // setQtnProfileData([]);
    //     //console.log(document.getElementById("mtrlcode").value);
    //     materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
    //     material = e.target.elements.material.value;
    //     grade = e.target.elements.grade.value;
    //     thickness = e.target.elements.thickness.value;

    //     // console.log("Process : "+processdescription);
    //     // console.log("Process : "+operation);
    //     process = operation; //processdescription; //e.target.elements.processdescription.value;
    //     quantity = e.target.elements.quantity.value;
    //     files = e.target.elements.files.files;

    //     setUpdateBtn(false);
    //     setDeleteBtn(false);

    //     for (let i = 0; i < files.length; i++) {
    //       console.log(files[i]);
    //       let drwfname = files[i];

    //       console.log(drwfname);
    //       console.log(material);
    //       locCalc(drwfname, material, grade, thickness, (output) => {
    //         console.log(output);

    //         let olddata = Object.entries(profileList).map(([key, value]) => ({ key, value }));
    //         //  let olddata = [...profileList];

    //         console.log("Old Data : " + olddata);
    //         if (olddata === null || olddata === undefined) {
    //           // Handle the case where olddata is null
    //           return;
    //         } else {
    //           // setQtnProfileData((olddata) => {
    //           //   // Append to existing olddata
    //           //   return [...olddata, {
    //           //     file: files[i],
    //           //     operation: process,
    //           //     material,
    //           //     grade,
    //           //     thickness,
    //           //     quantity,
    //           //     mtrlcode,
    //           //     lengthOfCut: output.lengthOfCut,
    //           //     noOfPierces: output.noOfPierces, // ? 1 : 0,
    //           //     partNetArea: output.partNetArea,
    //           //     complexity: output.complexity,
    //           //     hasOpenContour: output.hasOpenContour,
    //           //     outOpen: output.outOpen,
    //           //     partNetWeight: output.partNetWeight,
    //           //     partOutArea: output.partOutArea,
    //           //     partOutWeight: output.partOutWeight,
    //           //     rectArea: output.rectArea,
    //           //     rectWeight: output.rectWeight,
    //           //     unitjobworkcost: 0,
    //           //     unitmtrlcost: 0
    //           //   }];
    //           // });
    //           setProfileList((olddata) => {
    //             // Append to existing olddata
    //             return [...olddata, {
    //               file: files[i],
    //               operation: process, material, grade,
    //               thickness, quantity, mtrlcode,
    //               lengthOfCut: output.lengthOfCut,
    //               noOfPierces: output.noOfPierces, // ? 1 : 0,
    //               partNetArea: output.partNetArea,
    //               complexity: output.complexity,
    //               hasOpenContour: output.hasOpenContour,
    //               outOpen: output.outOpen,
    //               partNetWeight: output.partNetWeight,
    //               partOutArea: output.partOutArea,
    //               partOutWeight: output.partOutWeight,
    //               rectArea: output.rectArea,
    //               rectWeight: output.rectWeight,
    //               unitjobworkcost: 0,
    //               unitmtrlcost: 0
    //             }];
    //           });
    //         }

    //       });

    //       console.log("Qtn Profile Data : ", profileList);
    //       //---------------------------------- end -----------------------------------
    //       // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: loccalcoutput.lengthOfCut, noOfPierces: loccalcoutput.noOfPierces }]);
    //     }

    //     let qno = quotationNo.replaceAll("/", "_");
    //     let month = qno.split("_")[1]
    //     let monthName = ["January", "February", "March", "April", "May", "June",
    //       "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]

    //     let destPath = `\\QtnDwg\\` + monthName + "\\" + qno; //quotationNo;
    //     console.log("line - 599 - Destination Path : " + destPath);
    //     console.log(destPath);
    //     console.log(files);
    //     dxfupload(files, destPath, (res) => {
    //       console.log(res);
    //     });

    //     window.dxffiles = files;
    //     console.log(materialcode, material, grade, thickness, process, quantity, files);

    //     setShow(false);

    //   }

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
        for (let i = 0; i < insplvldata.length; i++) {
            if (insplvldata[i]["InspLevel"] === e.target.value) {
                insplvl = insplvldata[i];
                break;
            }
        }
        setInspectionLevel(insplvl["InspLevel"]);

    }

    const submitQtns = async (e) => {
        updateDwgTable(e);
        //  e.preventDefault();
        console.log("Saving Qtn Profile Data");
        let modqtndata = [...qtnProfileData];
        for (let i = 0; i < qtnProfileData.length; i++) {
            console.log(typeof modqtndata[i].file);
            modqtndata[i].file = new File([modqtndata[i].file], modqtndata[i].file.name, { type: "plain/text" })
            if (qtnProfileData[i].Tolerance === undefined) {
                modqtndata[i].Tolerance = "Standard(+/-0.1mm)- 100 Microns";
            }
            if (qtnProfileData[i].InspLevel === undefined) {
                modqtndata[i].InspLevel = "Insp1";
            }
            modqtndata[i].Dwg_Name = modqtndata[i].file.name;
        }
        console.log(modqtndata);
        console.log(modqtndata[0].file.name);

        setQtnProfileData(modqtndata);
        // Save Profile List Date
        //   if (qtnupd == "S") {
        postRequest(endpoints.updSaveProfileListData, {
            quotationNo: quotationNo,
            qtnProfileDat: modqtndata,
            dboperntype: "Save"
        }, (resp) => {
            console.log(resp);

            toast.success("Profile Detaile Saved");
        });
        // } else {
        //     postRequest(endpoints.saveProfileListdata, {
        //         quotationNo: quotationNo,
        //         qtnProfileDat: modqtndata,
        //         dboperntype: "Update"
        //     }, (resp) => {
        //         console.log(resp);

        //         toast.success("Profile Detaile Updated", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
        //     });
        // }
    }

    let profilefstbtnc = () => {

        postRequest(endpoints.updSaveProfileListData, { qtnNo: quotationNo, qtnProfileDat: profileList, dboperntype: "Delete" }, (estdata) => {
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


    // onClick of "Update" button in "Quotation Profile" tab
    async function updateDwgTable(e) {
        e.preventDefault();
        if (selectedDwgId === null) {
            toast.info("Please select a Drawing/Part Name to edit", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
            return;
        }
        let oldrecord = qtnProfileData[selectedDwgId];
        // let oldrecord = {};
        //let oldrecord = qtnProfileData.filter(file => file.file.name === selectedDwgId)[0];
        // console.log(qtnProfileData);
        // console.log(oldrecord);
        // console.log(oldrecord[e].quantity);

        oldrecord["grade"] = e.target.elements.grade.value;
        oldrecord["material"] = e.target.elements.material.value;
        oldrecord["materialcode"] = e.target.elements.mtrlcode.value;
        oldrecord["operation"] = e.target.elements.operation.value;
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
        let olddata = qtnProfileData;
        olddata[selectedDwgId] = oldrecord;
        // olddata[selectedDwgId] = qtndwgdata;
        setQtnProfileData(olddata);

        setSelectedDwgId(null);
        //   setTasklist(true);
        clearDetailsForm();

    }

    let clearDetailsForm = () => {
        let fields = ["dwgname", "operation", "quantity", "mtrlcode", "material", "grade", "thickness", "tolerance", "inspectionlevel", "lengthOfCut", "noOfPierces", "Task_Qtn_JW_Rate", "mtrlcost", "unitrate"];
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

    let chosenprocess = (e) => {
        // console.log(e);
        // console.log(operation);
        // console.log("Chosen Process : " + e.target.value);
        setProcessDescription(e.target.value);
        setOperation(e.target.value);
        setTolerance("Standard(+/-0.1mm)- 100 Microns");
        setInspectionLevel("Insp1");
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

    let selectItem = (item, id) => {
        console.log("Item Selected ")
        console.log(item);
        //   console.log(item.file.name);
        setSelectedDwgId(id);

        displaydrawing(item.file)
        window.dxffile = item.file;
        setTolerance("Standard(+/-0.1mm)- 100 Microns");
        setInspectionLevel("Insp1");
        document.getElementById("dwgname").value = item.file.name;
        document.getElementById("operation").value = item.operation;
        document.getElementById("quantity").value = item.quantity;
        //document.getElementById("mtrlcode").value = item.materialcode;
        document.getElementById("mtrlcode").value = item.mtrlcode;
        document.getElementById("material").value = item.material;
        document.getElementById("grade").value = item.grade;
        document.getElementById("thickness").value = item.thickness;
        document.getElementById("tolerance").value = tolerance;
        document.getElementById("inspectionlevel").value = inspectionlevel;
        setThickness(item.thickness)
        setLengthOfCut(item.lengthOfCut)
        setNoofPierces(item.noOfPierces)
        //  setTolerance(item.tolerance)
        // setInspectionLevel(item.inspectionlevel)
        setMaterial(item.material)
        setGrade(item.grade)



        /////////////////////////////////////////////////////

        //   if (item.file.name.includes(".dxf")) {
        //     console.log("Selected Item is : ", item.file);

        //  displaydrawing(item.file);
        //  window.dxffile = item.file;

        // setTolerance("Standard(+/-0.1mm)- 100 Microns");
        // setInspectionLevel("Insp1");
        // document.getElementById("dwgname").value = item.file.name;
        // document.getElementById("operation").value = item.operation;
        // document.getElementById("quantity").value = item.quantity;
        // //document.getElementById("mtrlcode").value = item.materialcode;
        // document.getElementById("mtrlcode").value = item.mtrlcode;
        // document.getElementById("material").value = item.material;
        // document.getElementById("grade").value = item.grade;
        // document.getElementById("thickness").value = item.thickness;
        // document.getElementById("tolerance").value = tolerance;
        // document.getElementById("inspectionlevel").value = inspectionlevel;
        // setThickness(item.thickness)
        // setLengthOfCut(item.lengthOfCut)
        // setNoofPierces(item.noOfPierces)
        // //  setTolerance(item.tolerance)
        // // setInspectionLevel(item.inspectionlevel)
        // setMaterial(item.material)
        // setGrade(item.grade)


        /////////////////////////////////////////////////////////
        // displaydrawing(item.file)
        // window.dxffile = item.file;
        // document.getElementById("dwgname").value = item.file.name;
        // document.getElementById("operation").value = item.operation;
        // document.getElementById("quantity").value = item.quantity;
        // document.getElementById("mtrlcode").value = item.materialcode;
        // document.getElementById("material").value = item.material;
        // document.getElementById("grade").value = item.grade;
        // document.getElementById("thickness").value = item.thickness;
        // } else {
        //     setMaterial(item.Material);
        //     setGrade(item.MtrlGrade);
        //     document.getElementById("dwgname").value = item.Dwg_Name;
        //     document.getElementById("operation").value = item.Operation;
        //     document.getElementById("quantity").value = item.Qty;
        //     document.getElementById("mtrlcode").value = item.mtrl_code;
        //     document.getElementById("material").value = item.Material;
        //     document.getElementById("grade").value = item.MtrlGrade;
        //     document.getElementById("thickness").value = item.Thickness;
        //     setLengthOfCut(item.LOC);
        //     setNoOfPierces(item.NoOfPierces);
        //     setUnitJobRate(item.UnitJobRate);
        //     setMtrlCost(item.MtrlCost);
        //     setUnitRate(item.UnitRate);
        //     setTolerance(item.Tolerance)
        //     setInspectionLevel(item.InspLevel)
        // }
    }

    // let selectItem = (item, id) => {
    //     console.log(id);
    //     console.log("operation : " + item.Operation);
    //     setSelectedDwgId(id);
    //     let file = item.Path + "\\" + item.Dwg_Name;

    //         let month = quotationNo.split("_")[1]
    //         let monthName = ["January", "Febraury", "March", "April", "May", "June",
    //             "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]
    //        let destPath = `\\QtnDwg\\` + monthName + "\\" + quotationNo;
    //         let srcPath = `\\QtnDwg\\` + monthName + "\\" + quotationNo + "\\" + file;     
    //     displaydrawing(file); //item.Dwg_Name)
    //     window.dxffile = file; //item.Dwg_Name;
    //     console.log(item);
    //      document.getElementById("dwgname").value = item.file.name;
    //     document.getElementById("dwgname").value = item.Dwg_Name;
    //     document.getElementById("operation").value = item.Operation;
    //     document.getElementById("quantity").value = item.Qty;
    //     document.getElementById("mtrlcode").value = item.mtrl_code;
    //     document.getElementById("material").value = item.Material;
    //     document.getElementById("grade").value = item.MtrlGrade;
    //     document.getElementById("thickness").value = item.Thickness;

    //     setLengthOfCut(item.LOC)
    //     setNoofPierces(item.NoofPierces)
    //     setTolerance(item.Tolerance)
    //     setInspectionLevel(item.InspectionLevel)
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
        console.log(mtrl.Mtrl_Code);
        setMtrlCode(mtrl.Mtrl_Code != undefined ? mtrl.Mtrl_Code : "");
        // setMtrlCode(mtrl.Mtrl_Code);

        postRequest(endpoints.getmtrldetsbymtrlcode, { mtrlcode: mtrl.Mtrl_Code }, (mtrldata) => {
            if (mtrldata.length > 0) {
                setMtrlCode(mtrldata[0]["Mtrl_Code"]);
                setMaterial(mtrldata[0]["Mtrl_Type"]);
                setThickness(mtrldata[0]["Thickness"]);
                setGradeID(mtrldata[0]["MtrlGradeID"]);
                //  setMaterial(mtrldata[0]["Mtrl_Type"]);
                setGrade(mtrldata[0]["Grade"]);
                setSpecificWt(mtrldata[0]["Specific_Wt"]);

                //     console.log("Grade Id : " + mtrldata[0]["MtrlGradeID"]);

                //      locCalc(window.dxffile, mtrldata[0]["Mtrl_Type"], mtrldata[0]["Grade"], mtrldata[0]["Thickness"], (output) => { });
            }
        })

    }


    // new one below

    let locCalc = async (drwfile, material, grade, process, thickness, tolerance, inspectionlevel, cb) => {
        // let loc = window.location.pathname;

        // console.log("Getting Sp Wt");
        postRequest(endpoints.getMaterialSpWt, { material, grade }, async (resp) => {

            const formData = new FormData();
            //  window.dxffiles.forEach(async (dfile) => {
            formData.append("file", drwfile); //files[i]);
            formData.append("inspectionlevel", inspectionlevel);
            formData.append("process", process);
            formData.append("tolerance", tolerance);
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
            console.log(res.data);
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

    // Old original function below

    // let locCalc = async (drwfile, material, grade, thickness, cb) => {
    //     // let loc = window.location.pathname;

    //     // console.log("Getting Sp Wt");
    //     postRequest(endpoints.getMaterialSpWt, { material, grade }, async (resp) => {

    //         const formData = new FormData();
    //         //  window.dxffiles.forEach(async (dfile) => {
    //         formData.append("file", drwfile); //files[i]);
    //         formData.append("thickness", thickness);
    //         formData.append("specficWeight", resp[0].Specific_Wt);
    //         setSpecificWt(resp[0].Specific_Wt);
    //         console.log("Sending to Service");
    //         // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
    //         const getCalcReq = await fetch('http://localhost:21341/getCalc', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //             },
    //             body: formData,
    //         });
    //         const res = await getCalcReq.json();
    //         //   const data = await res.json();
    //         //    console.log("Get Calc Response");
    //         console.log(res.data);
    //         setLengthOfCut(res.data.lengthOfCut)
    //         setNoofPierces(res.data.noOfPierces)
    //         setPartNetArea(res.data.partNetArea)
    //         setOutOpen(res.data.outOpen)
    //         setComplexity(res.data.complexity)
    //         setHasOpenContour(res.data.hasOpenContour)
    //         setPartNetWeight(res.data.partNetWeight)
    //         setPartOutArea(res.data.partOutArea)
    //         setPartOutWeight(res.data.partOutWeight)
    //         setRectArea(res.data.rectArea)
    //         setRectWeight(res.data.rectWeight)
    //         //  setSpecificWt(res.Specific_Wt)
    //         cb({
    //             lengthOfCut: res.data.lengthOfCut, noOfPierces: res.data.noOfPierces,
    //             partNetArea: res.data.partNetArea, complexity: res.data.complexity,
    //             hasOpenContour: res.data.hasOpenContour, outOpen: res.data.outOpen,
    //             partNetWeight: res.data.partNetWeight, partOutArea: res.data.partOutArea,
    //             partOutWeight: res.data.partOutWeight, rectArea: res.data.rectArea,
    //             rectWeight: res.data.rectWeight
    //         });
    //         //, spWeight: res.data.Specific_Wt
    //         // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode,loc }]);
    //     });
    // }

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
        console.log("Display Drawing : " + file);
        let reader = new FileReader();
        reader.onload = function (event) {
            let text = event.target.result;
            console.log(text);
            drawSvg(text);
        }
        //  reader.readAsText(file.asInstanceOf[Blob]);
        reader.readAsText(file);
    }

    let deleteSelected = () => {
        let tdata = [...qtnProfileData];
        tdata.splice(selectedDwgId, 1);
        setQtnProfileData(tdata);
    }

    const cleartaskdetails = async () => {
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

        for (let i = 0; i < qtnProfileData.length; i++) {
            qtnProfileData[i].Unit_JobWork_Cost = 0;
            qtnProfileData[i].Unit_Material_Cost = 0;
            setUnitRate(0);
            setMtrlCost(0);
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

        postRequest(endpoints.deleteQtnTaskDetails, { quotationNo: quotationNo }, (data) => {
            console.log("QtnTaskListDetails Data Deleted");
            console.log(data);
        });

        postRequest(endpoints.deleteQtnTaskList, { quotationNo: quotationNo }, (data) => {
            console.log("QtnTaskList Data Deleted");
            console.log(data);
        });

        console.log(quotationNo);
        postRequest(endpoints.crdeleteQtnItemData, { quotationNo: quotationNo }, (data2) => {
            console.log("QtnItemsList Data Deleted");
            console.log(data2);
        });


    }

    const checkDrawings = async () => {

        let qno = quotationNo.replaceAll("/", "_");
        //if file not exist then display alert as "Drawing Does not exist for " + Dwg_Name
    }

    //***********************************************************************************
    // Create Tasks button under Tasklist
    //***********************************************************************************

    const createTask = async () => {


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

        let groups = [];
        // new code below added on 6-6-24
        //  console.log(profileList);
        console.log(qtnProfileData);
        let mtrlcodes = [];
        if (qtnProfileData.length > 0) {

            groups = qtnProfileData.reduce((r, qtnProfileObject) => {
                //console.log(qtnProfileObject.mtrlcode);                
                const key = `${qtnProfileObject.mtrlcode}-${qtnProfileObject.grade}-${qtnProfileObject.thickness}-${qtnProfileObject.operation}-${qtnProfileObject.tolerance}-${qtnProfileObject.inspectionlevel}`;
                r[key] = [...r[key] || [], qtnProfileObject];
                return r;
            }, {});
        }

        console.log("Groups : ");
        console.log(groups);
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
                    console.log(groups[key][m]);
                    // console.log("Qty :")
                    // console.log(groups[key][m].quantity);

                    sumqty[key] += parseInt(groups[key][m].quantity); // assuming quantity is the same for all items in the group
                    tskNetArea[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].PartNetArea));
                    taskNtWt[key] += (parseInt(groups[key][m].quantity) * (parseFloat(groups[key][m].partNetWeight ?? groups[key][m].PartNetWt)));
                    // tskRectArea[key] += parseFloat(groups[key][m]["rectArea"] * groups[key][m]["quantity"]);
                    tskRectArea[key] += parseFloat(groups[key][m]["partoutarea"] * groups[key][m]["quantity"]);
                    tskloc[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].lengthOfCut));
                    tskpeirces[key] += (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].noOfPierces));

                    //   console.log("Sum Qty : " + sumqty[key]);
                    console.log("Net Area : " + (parseInt(groups[key][m].quantity) * parseFloat(groups[key][m].PartNetArea)));
                    console.log(parseFloat(groups[key][m].partNetWeight ?? groups[key][m].PartNetWt));
                    console.log("loc");
                    console.log(parseFloat(groups[key][m].lengthOfCut));
                    console.log(" Task LOC : " + tskloc[key] + " Key : " + key);

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

        console.log("Task LOC : " + tskloc);
        console.log("Task Pierces : " + JSON.stringify(tskpeirces));

        setTasklistdata(groups);

        setNoOfTasks(Object.keys(groups).length);
        setEstTaskList(groups);

        console.log("Task List Data : ");
        console.log(groups);
        console.log(specificwt);
        console.log("sumqty: " + JSON.stringify(sumqty));
        console.log("tasknetarea: " + JSON.stringify(tskNetArea));
        console.log("tasknetwt: " + JSON.stringify(taskNtWt));
        console.log("taskrectarea: " + JSON.stringify(tskRectArea));
        console.log("Count of Dwg Name : " + JSON.stringify(countdwgname));
        console.log("No of Tasks : " + Object.keys(groups).length);



        await postRequest(endpoints.saveQtnTaskListDetails, {
            quotationNo: quotationNo, tasklistdata: groups, spwt: specificwt, mtrcd: mtrlcodes, cntDwgName: countdwgname, NoOfTasks: Object.keys(groups).length,
            sQty: sumqty, tasknetarea: tskNetArea, tasknetwt: taskNtWt, taskrectarea: tskRectArea, taskloc: taskloc, taskpierces: taskpierces
        }, (data) => {
            if (data.status == 'Success') {
                toast.success("Tasks Created..", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                setEstimationBtn(false);
            }
        });

        ///////////////////////////////////
        // Earlier Code below commented on 6-6-24
        // if (qtnProfileData.length > 0) {

        //     groups = qtnProfileData.reduce((r, qtnProfileObject) => {
        //         const key = `${qtnProfileObject.materialcode}-${qtnProfileObject.grade}-${qtnProfileObject.thickness}-${qtnProfileObject.operation}-${qtnProfileObject.tolerance}-${qtnProfileObject.inspectionlevel}`;
        //         r[key] = [...r[key] || [], qtnProfileObject];
        //         return r;
        //     }, {});
        // }
        // console.log(groups);
        // for (let key in groups) {
        //     for (let i = 0; i < groups[key].length; i++) {
        //         groups[key][i].taskno = Object.keys(groups).indexOf(key) + 1;
        //     }
        // }
        // console.log("Groups Created")
        // let sumqty = {};
        // let tskNetArea = {};
        // let taskNtWt = {};
        // let tskRectArea = {};

        // for (let key in groups) {
        //     if (groups.hasOwnProperty(key)) {

        //         if (!sumqty[key]) {
        //             sumqty[key] = 0;
        //         }
        //         if (!tskNetArea[key]) {
        //             tskNetArea[key] = 0;
        //         }
        //         if (!taskNtWt[key]) {
        //             taskNtWt[key] = 0;
        //         }
        //         if (!tskRectArea[key]) {
        //             tskRectArea[key] = 0;
        //         }

        //         sumqty[key] = sumqty[key] || 0;
        //         tskNetArea[key] = tskNetArea[key] || 0;
        //         taskNtWt[key] = taskNtWt[key] || 0;
        //         tskRectArea[key] = tskRectArea[key] || 0;

        //         sumqty[key] += parseInt(groups[key].quantity);
        //         tskNetArea[key] += (parseInt(groups[key].quantity) * parseFloat(groups[key].partNetArea));
        //         taskNtWt[key] += (parseInt(groups[key].quantity) * parseFloat(groups[key].partNetWeight));
        //         tskRectArea[key] += parseFloat(groups[key]["rectArea"] * groups[key]["quantity"]);

        //     }

        // }
        // setSumQty(sumqty);
        // setTskNetArea(tskNetArea);
        // setTaskNtWt(taskNtWt);
        // setTskRectArea(tskRectArea);

        // setTasklistdata(groups);
        // setNoOfTasks(Object.keys(groups).length);
        // console.log(groups)
        // await postRequest(endpoints.saveQtnTaskListDetails, {
        //     // quotationNo: quotationNo, tasklistdata: groups,
        //     // sQty: sumqty, tasknetarea: tskNetArea, tasknetwt: taskNtWt, taskrectarea: tskRectArea
        //     quotationNo: quotationNo, tasklistdata: groups, spwt: specificwt, mtrcd: mtrlcodes, cntDwgName: countdwgname, NoOfTasks: Object.keys(groups).length,
        //     sQty: sumqty, tasknetarea: tskNetArea, tasknetwt: taskNtWt, taskrectarea: tskRectArea, taskloc: taskloc, taskpierces: taskpierces
        // }, (data) => { });

        // toast.success("Tasks Created..", { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })

    }


    ///********************************************************************************************************/
    // Task No Selection
    ///********************************************************************************************************/
    let taskselector = async (tasklistdata, id) => {
        console.log("Task Selector");
        setSelectedTaskId(id);
        let estflag = false;
        let taskflag = false;
        // console.log("Task Selector estdata length : " + estdata.length);

        console.log("Qtn No : " + quotationNo);
        postRequest(endpoints.getTaskListDataByQtnNo, { QtnNo: quotationNo }, (data) => {
            console.log("Task List Details");
            console.log(data);
            setEstData(data);
        });
        if (estdata.length > 0) {
            console.log("Est Data...");
            estflag = true;
            taskflag = false;
        } else {
            console.log("TaskList Data...");
            estflag = false;
            taskflag = true;
        }
        console.log(id);
        console.log(estdata);
        //  console.log(tasklistdata);

        setTaskSelectedId(id);
        setTaskNo(id);

        let displaydata = estdata.length > 0 ? estdata : tasklistdata;

        let taskNetArea = 0;
        let taskRectArea = 0;
        let taskNetWeight = 0;
        let taskRectWeight = 0;
        // let taskMtrlArea = 0;
        let taskMtrlWeight = 0;
        let taskLOC = 0;
        let taskNoofPierces = 0;
        let taskQty = 0;

        // console.log("Task Selector displaydata selected id : " + id)
        // console.log(displaydata[id])

        // if (!estflag && taskflag) {
        //     // **********************************************************************
        //     // ******  Task Data
        //     // **********************************************************************
        //     console.log("Task Flag");
        //     console.log(" Task Flag : " + JSON.stringify(displaydata));
        //     setOperation(displaydata[0].operation);
        //     console.log("After setting Operation : " + displaydata[0].operation);
        //     setMaterial(displaydata[0].material);
        //     setGrade(displaydata[0].grade);
        //     setThickness(displaydata[0].thickness);
        //     console.log("After setting Thickness : " + displaydata[0].thickness);
        //     setTolerance(displaydata[0].tolerance);
        //     setInspectionLevel(displaydata[0].inspectionlevel);
        //     console.log("setting group variables");

        //     for (let i = 0; i < displaydata.length; i++) {

        //         taskNetArea = taskNetArea + (parseFloat(displaydata[i].partNetArea * displaydata[i].quantity));
        //         taskRectArea = taskRectArea + parseFloat(displaydata[i]["rectArea"] * displaydata[i]["quantity"]);
        //         taskNetWeight = taskNetWeight + parseFloat(displaydata[i]["partNetWeight"] * displaydata[i]["quantity"]);
        //         taskRectWeight = taskRectWeight + parseFloat(displaydata[i]["rectWeight"] * displaydata[i]["quantity"]);
        //         if (taskMtrlArea > 0 && taskMtrlWeight == 0) {
        //             taskMtrlWeight = (taskMtrlArea * thickness * specificwt * 0.0001);
        //         }

        //         taskLOC = taskLOC + (parseFloat(displaydata[i]["lengthOfCut"]) * parseFloat(displaydata[i]["quantity"]));
        //         taskNoofPierces = taskNoofPierces + (parseFloat(displaydata[i]["noOfPierces"] * displaydata[i]["quantity"]));
        //         taskQty = taskQty + parseInt(displaydata[i]["quantity"]);
        //     }

        //     fnAreaWeighttable({
        //         taskNetArea: parseFloat(taskNetArea), //[Object.keys(tskNetArea)[id]]),
        //         taskNetWeight: taskNetWeight,
        //         taskRectArea: taskRectArea,
        //         taskRectWeight: taskRectWeight, taskMtrlArea: taskMtrlArea, taskMtrlWeight: taskMtrlWeight
        //     });
        //     console.log("after Net Table Calculation Mtrl Wt : " + taskMtrlWeight);
        // }
        // else {
        // **********************************************************************
        // ******  Estimation Data
        // **********************************************************************
        //id = id + 1;
        console.log(displaydata);

        setOperation(displaydata[id].Operation ?? displaydata[id].operation);
        console.log("After setting Operation : " + displaydata[id].Operation);
        setMaterial(displaydata[id].material);
        setGrade(displaydata[id].MtrlGrade);
        setThickness(displaydata[id].Thickness);
        console.log("After setting Thickness : " + displaydata[id].Thickness);
        setTolerance(displaydata[id].Tolerance);
        setInspectionLevel(displaydata[id].InspLevel);
        console.log("setting group variables");
        setTaskLOC(displaydata[id].TaskLOC);
        taskNetArea = displaydata[id].TaskNetArea;
        taskRectArea = displaydata[id].TaskPartRectArea;
        console.log("Task Net Area : " + taskNetArea);

        console.log(" Thickness : " + displaydata[id].Thickness);
        console.log(" Specific Wt : " + displaydata[id].SpWeight);

        taskNetWeight = (taskNetArea * displaydata[id].Thickness * displaydata[id].SpWeight * 0.0001).toFixed(3);
        console.log("Task Net Weight : " + taskNetWeight);
        displaydata[id].Task_Net_wt = taskNetWeight;
        displaydata[id].TaskRectWeight = (displaydata[id].TaskPartRectArea * displaydata[id].Thickness * displaydata[id].SpWeight * 0.0001).toFixed(3);
        taskRectWeight = displaydata[id].TaskRectWeight;
        taskMtrlArea = displaydata[id].TaskMtrlArea;
        if (displaydata[id].TaskMtrlArea > 0) {
            taskMtrlWeight = (displaydata[id].TaskMtrlArea * displaydata[id].Thickness * displaydata[id].SpWeight * 0.0001).toFixed(3);
        }
        displaydata[id].TaskMtrlWeight = taskMtrlWeight;
        taskMtrlWeight = displaydata[id].TaskMtrlWeight;
        taskLOC = displaydata[id].TaskLOC;
        taskNoofPierces = displaydata[id].TaskHoles;
        taskQty = displaydata[id].Qty;

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
                console.log(" Util Percent : " + utilpercent);
                setUtilisationPercent(parseFloat(utilpercent).toFixed(2));
                setScrapPercent(parseFloat(100 - utilpercent).toFixed(2));
            }
        }
        setPartsNested(displaydata[id].SumOfQty);
        setTaskPierces(parseInt(displaydata[id].TaskHoles));
        setDwgsToNest(displaydata[id].TaskDwgs);
        setNestCount(displaydata[id].TaskDwgs); //TaskNests);
        setDwgsNested(displaydata[id].SumOfQty);
        setProgramming(parseFloat(displaydata[id].Task_Pgme_charge).toFixed(2));
        setTask_Basic_Cutting_Cost(parseFloat(displaydata[id].Task_Basic_Cutting_Cost).toFixed(2));
        setPartsToNest(displaydata[id].SumOfQty);

        setMchSetUpRate(displaydata[id].Task_SettingUpRate);
        setDecSheetLoadingRate(displaydata[id].Task_SheetHandlingRate);
        setTaskSetupLoading(parseFloat(displaydata[id].Task_Setup_loading_charge).toFixed(2));
        setTask_Mtrl_Handling_Charge(parseFloat(displaydata[id].Task_Mtrl_Handling_Charge).toFixed(2));
        setTask_Basic_Cutting_Cost(parseFloat(displaydata[id].Task_Basic_Cutting_Cost).toFixed(2));
        setJWCharges(parseFloat(displaydata[id].TaskJobWorkCost).toFixed(2));
        setMaterialCharges(parseFloat(displaydata[id].Task_Mtrl_Cost).toFixed(2));
        setJWValue(parseFloat(displaydata[id].TaskJobWorkCost).toFixed(2));
        setMaterialValue(parseFloat(displaydata[id].Task_Qtn_Mtrl_Rate).toFixed(2));

        setJWTarget(parseFloat(displaydata[id].Task_Qtn_JW_Rate).toFixed(2));

        setTask_perkg_cost(((displaydata[id].Task_Qtn_Mtrl_Rate + displaydata[id].TaskJobWorkCost) / displaydata[id].Task_Net_wt).toFixed(2));
        setPerKgRate((Number(displaydata[id].Task_Qtn_Mtrl_Rate) + Number(displaydata[id].TaskJobWorkCost) / displaydata[id].Task_Net_wt).toFixed(2));

        console.log("Rate / Kg Calculation : " + parseFloat((Number(displaydata[id].Task_Qtn_Mtrl_Rate) + Number(displaydata[id].Task_Qtn_JW_Rate)) / taskMtrlWeight).toFixed(2));
        console.log(Number(displaydata[id].Task_Qtn_Mtrl_Rate) + Number(displaydata[id].TaskJobWorkCost));
        console.log(displaydata[id].Task_Net_wt);
        console.log("Task Per Kg Cost : " + task_perkg_cost);
        // setPerKgRate((displaydata[id].Task_Qtn_Mtrl_Rate + displaydata[id].TaskJobWorkCost) / displaydata[id].TaskNetWt);
        //setTPerMtrRate((displaydata[id].Task_Mtrl_rate + displaydata[id].TaskJobWorkCost)/ displaydata[id].TaskLOC);
        setTPerMtrRate(((displaydata[id].Task_Qtn_Mtrl_Rate + displaydata[id].TaskJobWorkCost) / displaydata[id].TaskLOC).toFixed(2));
        console.log("Task Job Work Cost : " + displaydata[id].TaskJobWorkCost);
        console.log("Task Material Cost : " + displaydata[id].Task_Mtrl_Cost);
        console.log("Task Qtn Material Rate : " + displaydata[id].Task_Qtn_Mtrl_Rate);
        console.log("Task Qtn Job Work Rate : " + displaydata[id].Task_Qtn_JW_Rate);
        console.log("Task Per Kg Cost : " + displaydata[id].task_perkg_cost);
        console.log("Task Per Mtr Rate : " + displaydata[id].tpermtrRate);
        // }
        // **********************************************************************
        // ******  Estimation Data calculation end above
        // **********************************************************************

        console.log("Task Net Area - after table : " + taskNetArea);

        setTaskMtrlArea(taskMtrlArea);
        setTaskMtrlWeight(taskMtrlWeight);
        setTaskDwgs(taskdwgs);
        setCountOfDwgName(CountOfDwgName);
        setTskNetArea(taskNetArea);
        setTaskNetWt(taskNetWeight);
        setTskRectArea(taskRectArea);
        setTaskRectWeight(taskRectWeight);

        await postRequest(endpoints.UpdateQtnTaskListWts, {
            quotationNo: quotationNo, tskno: (id + 1), taskNetArea, taskRectArea, taskNetWeight,
            taskRectWeight, taskMtrlArea, taskMtrlWeight
        }, (data) => {
            console.log("After Estimate - Updates on wts.");
            //    console.log(data);

        });

        // if (estdata.length > 0) {
        //     console.log(qtnProfileData);
        //     if (qtnProfileData.Dwg_Name === displaydata[id].Dwg_Name) {
        //         setQtnProfileData({ ...qtnProfileData, complexity: displaydata[id].Complexity })
        //     }
        // }

        //  setTaskGrpData(tasklistdata);
        // setTaskGrpData(qtnProfileData);
        //setTaskGrpData(displaydata);
        console.log(quotationNo);

        await postRequest(endpoints.getTaskDetailsDataByQtnNo, { QtnNo: quotationNo }, (data) => {
            console.log("Task Details Data");
            console.log(data);
            setTaskDetailsData(data);
        });

        console.log("task list data : " + JSON.stringify(taskdetailsdata));

        // if (!estflag && taskflag) {
        //     console.log("Display Data : " + JSON.stringify(displaydata));
        //     setTaskGrpData(displaydata);
        //   } else {
        //let taskedgrpdata = taskdetailsdata["taskdetlist"].filter((item) => item.TaskNo === (taskselectedid+1));
        console.log(id + 1);
        let taskedgrpdata = taskdetailsdata.filter((item) => item.TaskNo === (id + 1));
        //  console.log("" + JSON.stringify(taskedgrpdata));
        //  console.log("task selected id : " + taskselectedid);
        setTaskGrpData(taskedgrpdata);
        // }
        // console.log(taskdetailsdata);
        //  setTaskGrpData(taskdetailsdata);
    }
    //************************************************************ */
    //  Task No Selection End
    //************************************************************ */


    let recalculationjw = (evt) => {
        setReCalcScheme(evt.target.value);
        console.log("recaluclation : " + evt.target.value);
    }

    let secbtnc = () => {
        setAlertModal(false);
    };

    let onClickGetEstimator = () => {
        console.log("Estimation Button Clicked")
        if (hasopencontour) {
            setAlertModal(true);
            //      toast.warning("Uploaded drawings has Open Contour, please verify the table below")
        }
        postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation", btntype: "E" }, (estdata) => {
            console.log(estdata)
            //   alert(estdata);

            setTaskAreaWightData("")
            setLengthOfCut((estdata.lengthOfCut))
            setNoofPierces(estdata.noOfPierces)
            setPartNetArea(estdata.partNetArea)
            setOutOpen(estdata.outOpen)
            setComplexity(estdata.complexity)
            setHasOpenContour(estdata.hasOpenContour)
            setPartNetWeight(estdata.partNetWeight)
            setPartOutArea(estdata.partOutArea)
            setPartOutWeight(estdata.partOutWeight)
            setRectArea(estdata.rectArea)
            setRectWeight((estdata.rectWeight))
            //   setTaskMtrlArea(taskAreaWightData, ,,estdata.taskRectArea,estdata.taskRectWeight,estdata.taskMtrlArea,estdata.taskMtrlWeight)
            let taskMtrlWeight = parseFloat(estdata.taskMtrlArea * thickness * specificwt).toFixed(3);
            fnAreaWeighttable({ taskNetArea: estdata.taskNetArea, taskNetWeight: (estdata.taskNetWeight), taskRectArea: estdata.taskRectArea, taskRectWeight: estdata.taskRectWeight, taskMtrlArea: estdata.taskMtrlArea, taskMtrlWeight: taskMtrlWeight })

            // To Call Sigma
        })
    }

    let fnAreaWeighttable = (data) => {
        // let fnAreaWeighttable = (a) => {
        setTaskAreaWightData([]);

        setTaskAreaWightData([
            {
                type: "Net",
                area: (data.taskNetArea).toFixed(2),
                weight: data.taskNetWeight,
                // weight: a.taskNetWeight.toFixed(2),
            },
            {
                type: "Rect",
                area: (data.taskRectArea),
                weight: data.taskRectWeight,
            },
            {
                type: "Nested",
                area: data.taskMtrlArea > 0 ? (data.taskMtrlArea).toFixed(2) : "0.00",
                weight: data.taskMtrlWeight > 0 ? (data.taskMtrlWeight) : "0.00",

            }
        ])
    }


    let fstbtnc = () => {
        console.log("Sending data to Estimation API Call")
        postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation" }, (estdata) => {
            console.log(estdata)
            //    alert(estdata);

            setLengthOfCut(estdata.lengthOfCut)
            setNoofPierces(estdata.noOfPierces)
            setPartNetArea(estdata.partNetArea)
            setOutOpen(estdata.outOpen)
            setComplexity(estdata.complexity)
            setHasOpenContour(estdata.hasOpenContour)
            setPartNetWeight(estdata.partNetWeight)
            setPartOutArea(estdata.partOutArea)
            setPartOutWeight(estdata.partOutWeight)
            setRectArea(estdata.rectArea)
            setRectWeight(estdata.rectWeight)
            // setTaskMtrlArea(estdata.taskMtrlArea)
            //tasklist[]
            // To Call Sigma
            let taskMtrlWeight = (estdata.taskMtrlArea * thickness * specificwt);
            fnAreaWeighttable({ taskNetArea: estdata.taskNetArea, taskNetWeight: estdata.taskNetWeight, taskRectArea: estdata.taskRectArea, taskRectWeight: estdata.taskRectWeight, taskMtrlArea: estdata.taskMtrlArea, taskMtrlWeight: taskMtrlWeight })
            if (taskAreaWightData.length > 0) {
                let utilpercent = ((taskAreaWightData[0]["TaskNetArea"] * 100) / taskAreaWightData[0]["PartGrossArea"])
                console.log("Util Percent : " + utilpercent)
                setUtilisationPercent((taskAreaWightData[0]["PartNetArea"] * 100) / taskAreaWightData[0]["PartGrossArea"]);
                setScrapPercent(100 - utilpercent);
            }
            // To Call Sigma
        })
        setAlertModal(false);
        //Call SigmaServiceWeb Via API
        //   CreateReadWS(True)
        //  upDateProfilePara()

    }

    const [taskratesshow, setTaskRatesShow] = useState(false);
    const handleTaskRates = () => setTaskRatesShow(true);

    const handleCloseTaskRates = () => setTaskRatesShow(false);

    // **********************************************************************************************
    //   Setting Task Rates, Accept Task Rates
    // ******************************************************************************************

    // let calculateProgrammingCharges = () => {
    //     console.log("fetching Programming Rates");

    //     // console.log("prg contour rates : "+prgratedata[0].perContour);
    //     setDecContourRate(1)
    //     setDecNestRate(10)
    //     setDecDwgRate(10)
    //     setDecPartRate(0.1)
    //     setDecTaskRate(10)

    //     postRequest(endpoints.getTaskProgrammingRates, {}, (prgratedata) => {
    //         console.log("fetched prg rates : ");
    //         console.log(prgratedata);
    //         if (prgratedata.length > 0) {
    //             setDecContourRate(prgratedata[0].perContour)
    //             setDecNestRate(prgratedata[0].perNest)
    //             setDecDwgRate(prgratedata[0].perDwg)
    //             setDecPartRate(prgratedata[0].perPart)
    //             setDecTaskRate(prgratedata[0].perTask)
    //         }
    //     });
    // }

    // Estimation Printing

    // Estimation Printing

    let onClickPrintEstimate = () => {
        console.log("Estimation Button Clicked")
        //   navigate(`printestimate/printestimate/${quotationNo}`)
        postRequest(endpoints.getQtnPrintEstmnDets, { quotationno: quotationNo }, (estprintdata) => {
            console.log(estprintdata);
            if (Object.keys(estprintdata).length > 0) {
                //if (estprintdata.length > 0) {
                setEstPrintData(estprintdata);
                console.log(estprintdata);
                setOpenEstPrintModal(true);
            } else {
                console.log("No Data Found")
            }
        });

    }

    const handleCloseEstPrintModal = () => setOpenEstPrintModal(false);

    //***************************************************************************************  */
    // On Click of Set Task Rates Button
    //***************************************************************************************  */
    let onClickSetTaskRate = async () => {
        console.log("Set Task Rates Clicked : " + quotationNo);

        clearmodalvariables();
        console.log(tasklistdata);
        for (let i = 0; i < tasklistdata.length; i++) {
            if (tasklistdata[i]["TaskNo"] == taskno) {
                console.log("Drawing Nme : " + tasklistdata[i]["Dwg_Name"])

            }
        }
        console.log(" Line : 1349 - Task Grp Data : " + taskgrpData);
        console.log("Selected Task Id : " + selectedTaskId);
        console.log("Task No : " + taskno);
        await postRequest(endpoints.UpdateProfileDetails, { quotationno: quotationNo, tskno: selectedTaskId, tasklst: taskgrpData }, (res) => {
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

        await postRequest(endpoints.getqtnTasklistData, { quotationNo: quotationNo }, (qtntasklstdata) => {
            qtntasklist = qtntasklstdata;
        })

        qtntasklist.forEach(async (task) => {

            setTaskRateLOC(taskloc);
            setTaskRateHoles(taskpierces);
            setMaterial(material);

            await setMaterialRate();
            await setProcessRate();
            await setHandlingRates();
            await setProgrammingRate();

        })
        // const handleTaskRates = () => setTaskRatesShow(true);
        setTaskRatesShow(true);
    }

    //***************************************************************************************  */
    /////                         Set Task Rates       /////////////////
    //***************************************************************************************  */
    // ******************************************************************************************************************************************************
    const setTaskRates = async () => {

        let progcharge = 0;
        let basic_cutting = 0;
        let jwcharges = 0;

        qtntasklist.forEach(async (task) => {

            task.Task_cuttingRate = decLengthRate; //    X.PerMtr
            task.Task_PierceRate = decPierceRate; //  X.perPierce
            task.Task_Mtrl_rate = decMaterialRate
            task.Task_SettingUpRate = decTaskSetupRate; //   X.TaskSetupRate
            task.Task_SheetHandlingRate = decSheetLoadingRate; // X.SheetLoadRate
            task.Task_mtrlHandlingRate = decMtrl_HandlingRate; //  X.HandlingRate

        });

        // await setTaskCharges();
        // await setPartRates(taskgrpData);
        await setTaskCharges(selectedTaskId);
        await setPartRates(taskgrpData);
        //   setEstPrintBtn(false);
    }

    ////////////////////////////////////////////////////////////////
    // Calculations for Task Charges
    /////////////////////////////////////////////////////////////////////////

    // let setTaskCharges = async () => {
    //     console.log("******************************* Set Task Charges Clicked : " + quotationNo);

    //     //  let displaydata = estdata.length > 0 ? estdata : tasklistdata;
    //     console.log("Display Data : " + JSON.stringify(estdata));

    //     let mtaskno = taskselectedid + 1;

    //     // let oldTaskLstData = { ...estdata };

    //     let CountOfDwg_Name = taskgrpData.length;
    //     let taskdets = [];
    //     postRequest(endpoints.getTaskDetailsByTaskNo, { quotationNo: quotationNo, tskno: mtaskno }, (taskdetdata) => {
    //         taskdets = taskdetdata;
    //     });

    //     let progcharge = 0;
    //     let basic_cutting = 0;

    //     if (taskloc > 0) {

    //         setDecContourRate(1);
    //         setDecNestRate(10);
    //         setDecDwgRate(10);
    //         setDecPartRate(0.1);
    //         setDecTaskRate(10);

    //       //  taskqty = estdata[taskselectedid+1].SumOfQty;
    //         // console.log("Count of Dwg Name : " + CountOfDwg_Name);
    //         // console.log("Dwg Rate : " + decDwgRate);
    //          console.log("Task Qty : " + estdata[taskselectedid].SumOfQty);
    //         // console.log("Part Rate : " + decPartRate);
    //         // console.log("Task Pierces : " + taskpierces);
    //         // console.log("Contour Rate : " + decContourRate);

    //         // console.log("Nest Rate : " + decNestRate);
    //         // console.log("Task Rate : " + decTaskRate);

    //         // console.log("Dwg Cost : " + (CountOfDwg_Name * decDwgRate));
    //         // console.log("Part Cost : " + (taskqty * decPartRate));
    //         // console.log("Contour Cost : " + (taskpierces * decContourRate));
    //         // console.log("Nest Cost : " + (estdata[taskselectedid].TaskNests * decNestRate));
    //         // console.log("Task Rate : " + (decTaskRate));

    //         //progcharge = (CountOfDwg_Name * decDwgRate) + (taskqty * decPartRate) + ((taskpierces) * decContourRate) + ((estdata[taskselectedid].TaskNests * decNestRate) + (decTaskRate));
    //         progcharge = (CountOfDwg_Name * decDwgRate)
    //         + (parseFloat(estdata[taskselectedid].SumOfQty) * parseFloat(decPartRate))
    //         + ( estdata[taskselectedid].TaskHoles * decContourRate)
    //       //  + (taskpierces * decContourRate)
    //         + ((estdata[taskselectedid].TaskNests * decNestRate)
    //           + (decTaskRate));

    //         setProgramming(progcharge);
    //         estdata[taskselectedid].Task_Pgme_charge = progcharge;

    //         console.log(progcharge);
    //         // console.log(oldTaskLstData);

    //         basic_cutting = parseFloat(taskloc) * parseFloat(decpermtrRate) + parseFloat(taskpierces) * parseFloat(decPierceRate);
    //         setTask_Basic_Cutting_Cost(parseFloat(basic_cutting).toFixed(2));
    //         estdata[taskselectedid].Task_Basic_Cutting_Cost = parseFloat(basic_cutting).toFixed(2);
    //         estdata[taskselectedid].Task_cuttingRate = decpermtrRate;
    //         estdata[taskselectedid].Task_PierceRate = decPierceRate;
    //         let totalsheet = 1;

    //         setTaskNetWt(taskAreaWightData[2]["weight"]);
    //         setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));
    //         estdata[taskselectedid].Task_Mtrl_Handling_Charge = parseFloat(taskMtrlWeight * decMtrl_HandlingRate).toFixed(2);
    //         setTask_Mtrl_Handling_Charge(parseFloat(estdata[taskselectedid].Task_Mtrl_Handling_Charge).toFixed(2));

    //         setTPerMtrRate(parseFloat(parseFloat(decpermtrRate) + parseFloat(decPierceRate) + parseFloat(mchsetuprate) + parseFloat(decSheetLoadingRate) + parseFloat(decMtrl_HandlingRate)).toFixed(2))
    //         estdata[taskselectedid].Task_Per_Mtr_Rate = parseFloat(parseFloat(decpermtrRate) + parseFloat(decPierceRate) + parseFloat(mchsetuprate) + parseFloat(decSheetLoadingRate) + parseFloat(decMtrl_HandlingRate)).toFixed(2);

    //         let MtrlWeight = parseFloat(parseFloat((parseFloat(decShLength) * parseFloat(decShWidth) * parseFloat(thickness) * parseFloat(specificwt) * 0.0001) * 0.001)).toFixed(3) // (Width * Length * thickness * Sp Weight)
    //         estdata[taskselectedid].Task_Mtrl_Weight = MtrlWeight;
    //         setTaskSetupRate(Number(mchsetuprate));
    //         setTaskSheetHandlingRate(Number(decSheetLoadingRate));

    //         estdata[taskselectedid].Task_SettingUpRate = Number(mchsetuprate);
    //         //estdata[taskselectedid].Task_SheetHandlingRate = Number(decSheetLoadingRate);
    //         estdata[taskselectedid].Task_SheetHandlingRate = Number((estdata[taskselectedid].TotalSheet * Number(decSheetLoadingRate)));
    //         //  setTaskSetupLoading(Number(mchsetuprate) + Number(decSheetLoadingRate));
    //         setTaskSetupLoading(Number(mchsetuprate) + Number(estdata[taskselectedid].Task_SheetHandlingRate));
    //         estdata[taskselectedid].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (estdata[taskselectedid].TotalSheet * Number(decSheetLoadingRate))).toFixed(2);

    //         console.log("Cutting : " + basic_cutting);
    //         console.log("Setup : " + estdata[taskselectedid].Task_Setup_loading_charge);
    //         console.log("Programming : " + progcharge);
    //         console.log("Mtrl Handling : " + estdata[taskselectedid].Task_Mtrl_Handling_Charge);

    //         setJWCharges(0);
    //         let jwchargecalculation = parseFloat(basic_cutting) + parseFloat(estdata[taskselectedid].Task_Setup_loading_charge) + parseFloat(progcharge) + parseFloat(estdata[taskselectedid].Task_Mtrl_Handling_Charge);
    //         setJWCharges(parseFloat(jwchargecalculation).toFixed(2));
    //         estdata[taskselectedid].Task_JobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

    //         console.log("JW Charge Calculation : " + jwchargecalculation);

    //         setJWValue(parseFloat(jwchargecalculation).toFixed(2));
    //         estdata[taskselectedid].Task_JW_Value = parseFloat(jwchargecalculation).toFixed(2);

    //         console.log("Sales Condition : " + quotationType)
    //         if (quotationType == "Sales") {
    //             console.log(taskMtrlWeight);
    //             console.log(mtrlsalerate);
    //             console.log(taskMtrlWeight * mtrlsalerate);
    //             setMtrlCost(taskMtrlWeight * mtrlsalerate);
    //             estdata[taskselectedid].Task_Mtrl_Cost = parseFloat(taskMtrlWeight * mtrlsalerate).toFixed(2);
    //             estdata[taskselectedid].Task_mtrlHandling_Rate = mtrlsalerate;
    //             setMtrlSaleRate(mtrlsalerate);
    //             setMaterialValue(estdata[taskselectedid].Task_Mtrl_Cost);
    //             setMaterialCharges(estdata[taskselectedid].Task_Mtrl_Cost);  //materialcharges
    //             estdata[taskselectedid].Task_Mtrl_rate = mtrlsalerate;
    //             estdata[taskselectedid].Task_Qtn_Mtrl_Rate = estdata[taskselectedid].Task_Mtrl_Cost;

    //             console.log("Material Cost : " + estdata[taskselectedid].Task_Mtrl_Cost);
    //         }
    //         else {
    //             setMtrlCost(0);
    //             estdata[taskselectedid].Task_Mtrl_Cost = 0;

    //         }
    //         estdata[taskselectedid].Task_Mtrl_rate = decMaterialRate;
    //         estdata[taskselectedid].Task_mtrlHandlingRate = decMtrl_HandlingRate;
    //         estdata[taskselectedid].Task_SheetHandlingRate = decSheetLoadingRate;

    //         taskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);
    //         // Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
    //         jwvalue = parseFloat(jwchargecalculation).toFixed(2);

    //         estdata[taskselectedid].Task_Qtn_JW_Rate = parseFloat(jwchargecalculation).toFixed(2);
    //         estdata[taskselectedid].TaskJobWorkCost = parseFloat(jwchargecalculation).toFixed(2);


    //         if (taskMtrlWeight > 0) {
    //             setTask_perkg_cost(parseFloat((decMaterialRate + taskJobWorkCost) / taskMtrlWeight).toFixed(0));
    //             // task_perkg_cost = parseFloat((decMaterialRate + taskJobWorkCost) / taskMtrlWeight).toFixed(0);
    //             estdata[taskselectedid].TaskPerKgCost = parseFloat((decMaterialRate + taskJobWorkCost) / taskMtrlWeight).toFixed(0);
    //             // task_perkg_cost = parseFloat(task_perkg_cost).toFixed(0)
    //             // TODO 
    //         }
    //         console.log("Task Per Kg Cost : " + task_perkg_cost);
    //         setTaskMtrlWeight(taskMtrlWeight);
    //         estdata[taskselectedid].Task_Mtrl_Weight = taskMtrlWeight;
    //         permtrRate = parseFloat((estdata[taskselectedid].Task_Qtn_Mtrl_Rate + estdata[taskselectedid].Task_Qtn_JW_Rate) / estdata[taskselectedid].TaskLOC).toFixed(2);
    //         //Sur-6
    //         //   permtrRate = (oldTaskLstData[Object.keys(oldTaskLstData)[taskselectedid]]["Task_Qtn_Mtrl_Rate"] + taskJobWorkCost) / taskloc
    //         setPerMtrRate(parseFloat(permtrRate).toFixed(0));

    //         console.log(" line 1920- Task Grp Data : " + JSON.stringify(taskgrpData));
    //         let newdatask = taskgrpData;
    //         // let jwchrg = 0;
    //         setJWChrg(0);
    //         for (let i = 0; i < newdatask.length; i++) {

    //             if (jwtarget > 0) {
    //                 jwchrg = (parseFloat(jwtarget) / parseFloat(newdatask[i].quantity)).toFixed(2);
    //                 newdatask[i].Task_Qtn_JW_Rate = jwchrg;
    //             }
    //             else {
    //                 jwchrg = (parseFloat(jwchargecalculation) / parseFloat(newdatask[i].quantity)).toFixed(2);
    //                 //  newdatask[i].Task_Qtn_JW_Rate = jwchrg;
    //                 newdatask[i].Unit_JobWork_Cost = jwchrg;
    //                 //  jwchargecalculation = jwchargecalculation + parseFloat(jwchrg);
    //             }
    //         }

    //         //   setTaskGrpData(newdatask);
    //         mtaskno = parseInt(taskno + 1);

    //         console.log(JSON.stringify(taskgrpData));

    //     }
    //     /////////////////////////////////////////////////////////////////////
    //     console.log("Task Charges bfr Update : " + JSON.stringify(estdata));

    //     await postRequest(endpoints.UpdateQtnTaskListDetails, {
    //         quotationno: quotationNo, taskno: taskno, taskgrpData: estdata, //taskgrpData,
    //         taskcuttingcost: basic_cutting, taskprogcharge: progcharge, taskcuttingrate: decpermtrRate,
    //         Task_PierceRate: decPierceRate, Task_NetWt: taskNetWt, taskrectweight: taskAreaWightData[1].weight, Task_MaterialRate: decMaterialRate,
    //         tasksetuprate: mchsetuprate, Task_SheetHandlingRate: decSheetLoadingRate, Task_mtrlHandlingRate: decMtrl_HandlingRate, Task_Mtrl_rate: task_perkg_cost,
    //         taskmtrlhndcharge: Task_Mtrl_Handling_Charge, taskjobworkcost: taskJobWorkCost, cntdwgname: CountOfDwg_Name, taskMtrlWeight: taskAreaWightData[2].weight,
    //         taskloc: taskloc, taskholes: taskpierces, tasknetarea: taskAreaWightData[0].area, tasksumofqty: taskgrpData["SumOfQty"], Task_Qtn_JW_Rate: Task_Qtn_JW_Rate
    //     }, (res) => {
    //         //console.log(res);
    //         if (res.status === 200) {
    //             alert("Task Rates Updated");
    //         }
    //     });

    //     toast.success("Task Updated Successfully", { position: toast.POSITION.TOP_CENTER });

    //     await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, (res) => {
    //         console.log("1434 - Task Group Details Data : ");
    //         console.log(res);
    //         console.log(taskgrpData)
    //         //  setTaskGrpData(res);
    //         console.log("Task Group Data - LOC : " + taskgrpData[0].lengthOfCut);
    //         for (let i = 0; i < taskgrpData.length; i++) {

    //             taskgrpData[i]["lengthOfCut"] = res[i]["LOC"];
    //             taskgrpData[i]["complexity"] = res[i]["Complexity"];
    //             taskgrpData[i]["noOfPierces"] = res[i]["NoofPierces"];
    //             taskgrpData[i]["partNetArea"] = res[i]["PartNetArea"];
    //             taskgrpData[i]["partNetWeight"] = (res[i]["PartNetWeight"]);
    //             taskgrpData[i]["Unit_JobWork_Cost"] = res[i]["Unit_JobWork_Cost"];
    //             taskgrpData[i]["Unit_Material_Cost"] = res[i]["Unit_Material_Cost"];

    //         }
    //         // setTaskGrpData(taskgrpData);
    //     });

    // }

    let setTaskCharges = async (selectedTaskId) => {
        console.log("Task Charges : " + selectedTaskId);
        //  setTaskLOC(0);
        let mtaskno = selectedTaskId + 1;

        if (esttaskList.length > 0) {
            alert("Task Charges with Estimation");
            await setTaskChargesafterestimation(esttaskList, selectedTaskId, mtaskno);
        } else {
            alert("Task Charges without Estimation");
            await setTaskChargeswithoutestimation(tasklistdata, selectedTaskId, mtaskno);
        }
        //********************************************************** */


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

    // Task Charges after Estimation
    const setTaskChargesafterestimation = async (esttaskList, selectedTaskId, mtaskno) => {
        console.log("Est Task List : ");
        //    let taskitemfilter = profileList.filter((item) => item.taskno === mtaskno);
        //  console.log(taskitemfilter);
        let taskitemfilter = taskList.filter((item) => item.TaskNo === mtaskno && Number(item.QtyNested) != 0);
        console.log(taskitemfilter);

        console.log("Count of Dwg : " + taskitemfilter.length);

        esttaskList[selectedTaskId].TaskDwgs = taskList.length;
        esttaskList[selectedTaskId].CountOfDwg_Name = taskitemfilter.length;
        taskloc = Number(esttaskList[selectedTaskId].TaskLOC);

        let CountOfDwg_Name = taskitemfilter.length;
        let progcharge = 0;
        let basic_cutting = 0;
        let totalsheet = 1;
        console.log(taskloc);
        if (taskloc > 0) {

            setDecContourRate(1);
            setDecNestRate(10);
            setDecDwgRate(10);
            setDecPartRate(0.1);
            setDecTaskRate(10);

            // console.log(selectedTaskId);
            // //  console.log(esttaskList[selectedTaskId].TaskNests);

            // // taskqty = estdata[taskselectedid].SumOfQty;
            // console.log("Count of Dwg : " + CountOfDwg_Name);
            // console.log("Dwg Rate : " + decDwgRate);
            // //    console.log("Task Qty : " + esttaskList[selectedTaskId].SumOfQty);
            // console.log("Part Rate : " + decPartRate);
            // console.log("Task Pierces : " +  esttaskList[selectedTaskId].TaskHoles);
            // console.log("Contour Rate : " + decContourRate);
            //    console.log(" Tasks Nets : " + esttaskList[selectedTaskId].TaskNests);
            // console.log("Nest Rate : " + decNestRate);
            // console.log("Task Rate : " + decTaskRate);

            progcharge = (CountOfDwg_Name * decDwgRate)
                + (parseFloat(esttaskList[selectedTaskId].SumOfQty) * parseFloat(decPartRate))
                + (esttaskList[selectedTaskId].TaskHoles * decContourRate)
                //  + (taskpierces * decContourRate)
                + ((esttaskList[selectedTaskId].TaskNests * decNestRate)
                    + (decTaskRate));

            console.log("Prog Charge : " + progcharge);

            setProgramming(progcharge);
            esttaskList[selectedTaskId].Task_Pgme_charge = progcharge;

            // console.log("Dec Per Mtr Rate : " + decpermtrRate);
            // console.log("Dec Pierce Rate : " + decPierceRate);
            // console.log("Task Pierces : " + taskpierces);

            taskloc = Number(parseFloat(taskloc).toFixed(3)); //.toFixed(3);
            //     console.log("Task Loc : " + parseFloat(taskloc).toFixed(3));

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
            //   console.log(taskMtrlWeight);

            // console.log("Mtrl Hand Rate : ")
            // console.log(decMtrl_HandlingRate);
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

            //  setDecMtrl_HandlingRate(parseFloat(decMtrl_HandlingRate));


            // Newly Added Logic for Mtrl Handling Rate
            if (taskMtrlWeight > 0) {
                //  console.log("1938 - Task Mtrl Weight : " + taskMtrlWeight);        
                esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge = parseFloat(Number(taskMtrlWeight) * Number(decMtrl_HandlingRate)).toFixed(2);
            } else {
                //    console.log("1941 - Task Mtrl Weight : " + taskMtrlWeight);
                esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge = Number(decMtrl_HandlingRate).toFixed(2);
            }

            // /////////////////////////////////////////
            setTaskMtrlHandlingRate(tmtrlhndlgrate);
            esttaskList[selectedTaskId].Task_mtrlHandlingRate = tmtrlhndlgrate;
            setTask_Mtrl_Handling_Charge(parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge).toFixed(2));

            let MtrlWeight = parseFloat(parseFloat((parseFloat(decShLength) * parseFloat(decShWidth) * parseFloat(thickness) * parseFloat(specificwt) * 0.0001) * 0.001)).toFixed(3) // (Width * Length * thickness * Sp Weight)
            esttaskList[selectedTaskId].Task_Mtrl_Weight = MtrlWeight;


            //   Setup and Sheet Handling:- task.Task_Setup_loading_charge = task.Task_SettingUpRate + task.TotalSheet * task.Task_SheetHandlingRate


            setTaskSetupRate(Number(mchsetuprate));
            setTaskSheetHandlingRate(Number(decSheetLoadingRate));

            esttaskList[selectedTaskId].Task_SettingUpRate = Number(mchsetuprate);

            //   esttaskList[selectedTaskId].Task_SheetHandlingRate = Number((esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate)));

            esttaskList[selectedTaskId].Task_SheetHandlingRate = Number((totalsheet * Number(decSheetLoadingRate)));
            //  setTaskSetupLoading(Number(mchsetuprate) + Number(decSheetLoadingRate));
            setTaskSetupLoading(Number(mchsetuprate) + Number(esttaskList[selectedTaskId].Task_SheetHandlingRate));
            esttaskList[selectedTaskId].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (totalsheet * Number(decSheetLoadingRate))).toFixed(2);
            //esttaskList[selectedTaskId].Task_Setup_loading_charge = parseFloat(Number(mchsetuprate) + (esttaskList[selectedTaskId].TotalSheet * Number(decSheetLoadingRate))).toFixed(2);


            setJWCharges(0);
            let jwchargecalculation = parseFloat(basic_cutting) + parseFloat(esttaskList[selectedTaskId].Task_Setup_loading_charge) + parseFloat(progcharge) + parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);
            setJWCharges(parseFloat(jwchargecalculation).toFixed(2));
            esttaskList[selectedTaskId].Task_JobWorkCost = parseFloat(jwchargecalculation).toFixed(2);

            console.log("JW Charge Calculation : " + jwchargecalculation);

            setJWValue(parseFloat(jwchargecalculation).toFixed(2));
            esttaskList[selectedTaskId].Task_JW_Value = parseFloat(jwchargecalculation).toFixed(2);

            console.log("Sales Condition : " + quotationType)
            if (quotationType == "Sales") {
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
            esttaskList[selectedTaskId].Task_mtrlHandlingRate = decMtrl_HandlingRate;
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
                console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
                setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
                esttaskList[selectedTaskId].TaskPerKgCost = parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2);

                console.log(esttaskList[selectedTaskId].TaskPerKgCost);
                // setPerKgRate(task_perkg_cost);
                setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
            }

            setTaskMtrlWeight(taskMtrlWeight);
            esttaskList[selectedTaskId].Task_Mtrl_Weight = taskMtrlWeight;
            esttaskList[selectedTaskId].Task_Mtrl_rate = mtrlsalerate;
            //   console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));

            permtrRate = parseFloat((Number(esttaskList[selectedTaskId].Task_Per_Mtr_Rate) + Number(esttaskList[selectedTaskId].Task_Qtn_JW_Rate)) / esttaskList[selectedTaskId].Task_Net_wt).toFixed(2);

            setPerMtrRate(parseFloat(permtrRate).toFixed(2));

            mtaskno = parseInt(taskno + 1);

        }

        setEstTaskList(esttaskList);
        console.log(esttaskList);

        await postRequest(endpoints.UpdateQtnTaskListDetails, {
            quotationno: quotationNo, taskno: taskno, taskgrpData: esttaskList, //taskgrpData,
            taskcuttingcost: basic_cutting, taskprogcharge: progcharge, taskcuttingrate: decpermtrRate,
            Task_PierceRate: decPierceRate, Task_NetWt: taskNetWt, taskrectweight: taskAreaWightData[1].weight, Task_MaterialRate: decMaterialRate,
            tasksetuprate: mchsetuprate, Task_SheetHandlingRate: decSheetLoadingRate, Task_mtrlHandlingRate: decMtrl_HandlingRate, Task_Mtrl_rate: task_perkg_cost,
            taskmtrlhndcharge: Task_Mtrl_Handling_Charge, taskjobworkcost: taskJobWorkCost, cntdwgname: CountOfDwg_Name, taskMtrlWeight: taskAreaWightData[2].weight,
            taskloc: taskloc, taskholes: taskpierces, tasknetarea: taskAreaWightData[0].area, tasksumofqty: taskgrpData.SumOfQty, Task_Qtn_JW_Rate: Task_Qtn_JW_Rate
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

            console.log("Task List : ");
            console.log(taskList);

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
        console.log("Task Charges Without Estimation  ")

        let sumquantity = 0; let cnt = 0;
        // let taskloc = 0; 
        let tasknetwt = 0; let taskoutwt = 0; let taskrectwt = 0; let TaskNests = 0;
        ; let taskpierces = 0; let tasknests = 0; let material = ''; let taskloc = 0; let taskqty = 0;
        await postRequest(endpoints.getqtnTasklistData, { quotationNo: quotationNo }, (qtntsklstdata) => {
            setEstTaskList(qtntsklstdata);
        });

        console.log(esttaskList);
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
            //  setTaskLOC(parseFloat(taskloc).toFixed(3));
            // setTaskPierces(taskpierces);
            setTaskList(taskList);
            setTaskGrpData(res);
        });
        ////////////////////////////////////////////////////////////////////


        fnAreaWeighttable(
            {
                tskNetArea: (esttaskList[selectedTaskId].TaskNetArea).toFixed(3),
                tskNetWeight: (esttaskList[selectedTaskId].TaskNetWeight).toFixed(3),
                // tskRectArea: esttaskList[selectedTaskId].TaskPartRectArea,
                // tskRectWeight: esttaskList[selectedTaskId].TaskRectWeight,
                // tskMtrlArea: esttaskList[selectedTaskId].TaskMtrlArea,
                // tskMtrlWeight: esttaskList[selectedTaskId].TaskMtrlWeight
            }
        )
        console.log("task:loc : " + taskloc);
        console.log(parseFloat(taskloc * esttaskList[selectedTaskId].SumOfQty));
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
            console.log("Nest Rate : " + decNestRate);
            console.log("Task Rate : " + decTaskRate);


            progcharge = (CountOfDwg_Name * decDwgRate)
                + (parseFloat(esttaskList[selectedTaskId].SumOfQty) * parseFloat(decPartRate))
                + (taskpierces * decContourRate)
                + ((esttaskList[selectedTaskId].TaskNests * decNestRate)
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
            if (decMtrl_HandlingRate < 10) {
                setDecMtrl_HandlingRate(10);
            }
            setTaskMtrlHandlingRate(tmtrlhndlgrate);
            esttaskList[selectedTaskId].Task_mtrlHandlingRate = tmtrlhndlgrate;
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
            jwchargecalculation = (parseFloat(basic_cutting) + parseFloat(Number(mchsetuprate) + (1 * Number(decSheetLoadingRate))) + parseFloat(progcharge) + parseFloat(decMtrl_HandlingRate)).toFixed(2); //parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge);
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
                console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
                setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
                esttaskList[selectedTaskId].TaskPerKgCost = parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2);

                //  console.log(esttaskList[selectedTaskId].TaskPerKgCost);
                setPerKgRate(task_perkg_cost);
                setTask_perkg_cost(parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));
            }

            setTaskMtrlWeight(taskMtrlWeight);
            esttaskList[selectedTaskId].Task_Mtrl_Weight = taskMtrlWeight;
            esttaskList[selectedTaskId].Task_Mtrl_rate = decMaterialRate;
            //   console.log("Rate / Kg Calculation : " + parseFloat((Number(Task_Mtrl_Cost) + Number(taskJobWorkCost)) / taskMtrlWeight).toFixed(2));

            ////////////////////

            permtrRate = parseFloat((Number(tpermtrRate) + Number(taskJobWorkCost)) / tasknetwt).toFixed(2);

            setPerMtrRate(parseFloat(permtrRate).toFixed(2));

            mtaskno = parseInt(taskno + 1);

        }

        setEstTaskList(esttaskList);
        console.log(esttaskList);

        await postRequest(endpoints.UpdateQtnTaskListDetails, {
            quotationno: quotationNo, taskno: taskno, taskgrpData: esttaskList, //taskgrpData,
            taskcuttingcost: basic_cutting, taskprogcharge: progcharge, taskcuttingrate: decpermtrRate,
            Task_PierceRate: decPierceRate, Task_NetWt: taskNetWt, taskrectweight: taskAreaWightData[1].weight, Task_MaterialRate: decMaterialRate,
            tasksetuprate: mchsetuprate, Task_SheetHandlingRate: decSheetLoadingRate, Task_mtrlHandlingRate: decMtrl_HandlingRate, Task_Mtrl_rate: task_perkg_cost,
            taskmtrlhndcharge: Task_Mtrl_Handling_Charge, taskjobworkcost: taskJobWorkCost, cntdwgname: CountOfDwg_Name, taskMtrlWeight: taskAreaWightData[2].weight,
            taskloc: taskloc, taskholes: taskpierces, tasknetarea: taskAreaWightData[0].area, tasksumofqty: taskgrpData.SumOfQty, Task_Qtn_JW_Rate: Task_Qtn_JW_Rate
        }, (res) => {
            //console.log(res);
            if (res.status === 200) {
                alert("Task Rates Updated");
            }
        });

    }

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

    //================================================================================
    // Set Material Rate Calculation
    //================================================================================
    const setMaterialRate = async () => {

        console.log("Material Rate Calculation ")
        console.log(taskgrpData);
        let filter;

        // if (taskgrpData[0]["grade"] == "" || taskgrpData[0]["grade"] == "Basic") {
        //   filter = "Material='" + taskgrpData[0]["material"] + "' AND Grade = 'Basic'";
        // }
        // else {
        //   filter = "Material='" + taskgrpData[0]["material"] + "' AND Grade ='" + taskgrpData[0]["grade"] + "'";
        // }

        if (taskgrpData[0].grade == "" || taskgrpData[0].grade == "Basic") {
            filter = 'Basic';
        }
        else {
            filter = taskgrpData[0].grade;
        }

        console.log(taskgrpData[0].material);
        console.log(filter);

        let dmtrlrate = 0;
        postRequest(endpoints.getTaskMaterialRates, { mmatrl: taskgrpData[0].material, filter }, (data) => {
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
        //   console.log("Material Rate : " + dmtrlrate);
        //   console.log(mchsetuprate);
        //let totalsheet = 1;

        // Commented for Testing
        // let tsksetupload = parseFloat(mchsetuprate) + parseFloat(decSheetLoadingRate) + (parseFloat(totalsheet) * parseFloat(dmtrlrate));
        // setTaskSetupLoading(tsksetupload);
        //////////
    }

    //================================================================================
    // Set Process Rate Calculation
    //================================================================================
    const setProcessRate = async () => {
        console.log("set Process Rate Calculation ");
        let [LastThickness, LastRate, PierceRate, DifThickness, DifRate, DifPierce, AverageRate, AvgPierc] = Array(8).fill(0.00); // decimal
        let opermtrldata = [];

        console.log(taskgrpData);
        console.log(taskgrpData[0].material)
        console.log(taskgrpData[0].operation)
        postRequest(endpoints.getOperationMtrlRateList, { material: taskgrpData[0].material, process: taskgrpData[0].operation, dblThickness }, async (opdata) => {
            if ((opdata !== "") || (opdata != null)) {
                //      console.log("Mtrl Thickness : " + dblThickness)
                opermtrldata = opdata;
                console.log(opermtrldata);

                //    }
                //  });
                // console.log("Operation Mtrl Rate List : " + opermtrldata.length)
                //  if (opermtrldata.length > 0) {
                console.log(dblThickness);
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

                switch (taskgrpData[0].Material) {
                    case "Mild Steel":
                        console.log("Thickness : " + thickness);

                        if (parseFloat(thickness) <= 5.00) {
                            setDecTaskSetupRate(50); // * parseFloat(taskqty)); //taskgrpData["SumOfQty"]));
                            decTaskSetupRate = 50; // * parseFloat(taskqty);  //parseFloat(taskgrpData["SumOfQty"]);
                        }
                        else if (parseFloat(thickness) > 5.00 && parseFloat(thickness) <= 10.00) {
                            setDecTaskSetupRate(100); // * parseFloat(taskqty));   //parseFloat(taskgrpData["SumOfQty"]))
                            decTaskSetupRate = 100; // * parseFloat(taskqty);  // parseFloat(taskgrpData["SumOfQty"]);
                            console.log("Task Setup Rate 10 mm : " + decTaskSetupRate);
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
        console.log("Task Setup Rate - after all comp : " + decTaskSetupRate);
        console.log("Task Material : " + taskgrpData[0].material);
        console.log("Task Setup Rate - 1 : " + parseFloat(decTaskSetupRate));

        // let tmptasksetuprate = parseFloat(decTaskSetupRate); // + parseFloat(decSheetLoadingRate);
        // setMchSetUpRate(tmptasksetuprate);

        //console.log("Task Setup Rate -2 : " + tmptasksetuprate);

    }

    //==========================================================================
    // Set Handling rates Calculation
    //==========================================================================

    const setHandlingRates = async () => {

        console.log("Handling Rates Calculation")
        postRequest(endpoints.getMaterialHandlingRates, { material: taskgrpData[0].material }, (handlingRates) => {
            console.log(handlingRates)
            if (handlingRates.length > 0) {
                // Update state with the values from the first matching record
                setDecMtrl_HandlingRate(handlingRates[0].Hahndling_Rate);
                setDecSheetLoadingRate(handlingRates[0].Sheet_Loading_rate);
                setMchSetUpRate(decTaskSetupRate + parseFloat(handlingRates[0].Sheet_Loading_rate));
            }
        });
        console.log("Material Handling Rate : " + decMtrl_HandlingRate);
        console.log("Sheet Loading Rate : " + decSheetLoadingRate);

        // let mtrlhand_charge = taskMtrlWeight * parseFloat(decMtrl_HandlingRate)

        // let MtrlWeight = 0;
        // MtrlWeight = parseFloat(parseFloat((parseFloat(decShLength) * parseFloat(decShWidth) * parseFloat(thickness) * parseFloat(specificwt) * 0.0001) * 0.001)).toFixed(3) // (Width * Length * thickness * Sp Weight)
        Task_Mtrl_Handling_Charge = parseFloat(taskMtrlWeight * decMtrl_HandlingRate).toFixed(2);
        setTask_Mtrl_Handling_Charge(Task_Mtrl_Handling_Charge < 10 ? 10 : Task_Mtrl_Handling_Charge);

    }

    //==========================================================================
    // Set Programming rates Calculation
    //==========================================================================
    const setProgrammingRate = async () => {

        await postRequest(endpoints.getTaskProgrammingRates, {}, async (prgratedata) => {
            if (prgratedata.length > 0) {
                setDecContourRate(1);
                setDecNestRate(10);
                setDecDwgRate(10);
                setDecPartRate(0.1);
                setDecTaskRate(10);
                console.log("per Contour : " + decContourRate);
                console.log("per Nest : " + decNestRate);
                console.log("per DWG : " + decDwgRate);
                console.log("per Part : " + decPartRate);
                console.log("per Task : " + decTaskRate);

            } else {
                setDecContourRate(prgratedata[0].perContour);
                setDecNestRate(prgratedata[0].perNest);
                setDecDwgRate(prgratedata[0].perDwg);
                setDecPartRate(prgratedata[0].perPart);
                setDecTaskRate(prgratedata[0].perTask);

                console.log("db per Contour : " + decContourRate);
                console.log("db per Nest : " + decNestRate);
                console.log("db per DWG : " + decDwgRate);
                console.log("db per Part : " + decPartRate);
                console.log("db per Task : " + decTaskRate);

            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////
    //*************************************************************************** */
    // ***************** Set Part Rates ******************************************
    //*************************************************************************** */
    let setPartRates = async (taskgrpData) => {

        let partdetails = [];
        await postRequest(endpoints.getTaskDetailsDataByQtn, { quotationNo: quotationNo }, async (res) => {
            setTaskList(res);
            partdetails = res;
        });

        for (let i = 0; i < partdetails.length; i++) {
            let PartToTaskRatio, partWtRation = 0;
            //    console.log(" Partdetails taskno : " + partdetails[i].TaskNo);
            if (partdetails[i].TaskNo == taskselectedid + 1) {
                //          console.log(" Item Qty Nested : " + partdetails[i].QtyNested);
                if (partdetails[i].QtyNested > 0) {
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

                    partdetails[i].Material_Handling_Charge = parseFloat(esttaskList[selectedTaskId].Task_Mtrl_Handling_Charge * partWtRation).toFixed(2);
                    partdetails[i].Cutting_Charge = (partdetails[i].LOC * esttaskList[selectedTaskId].Task_cuttingRate) + (partdetails[i].NoofPierces * esttaskList[selectedTaskId].Task_PierceRate);
                    partdetails[i].Unit_JobWork_Cost = (parseFloat(partdetails[i].Cutting_Charge) +
                        parseFloat(partdetails[i].Material_Handling_Charge) +
                        parseFloat(partdetails[i].SetUp_Loading_Charge) +
                        parseFloat(partdetails[i].Pgm_Charge)).toFixed(2);


                    //                    console.log("Unit Job Work Cost : " + partdetails[i].Unit_JobWork_Cost);
                    //                   console.log("Part To Task Ratio : " + PartToTaskRatio);
                    //                  console.log("Task Mtrl Cost : " + esttaskList[selectedTaskId].Task_Mtrl_Cost);
                    partdetails[i].Unit_Material_Cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
                    partdetails[i].Unit_Material_cost = parseFloat(Number(esttaskList[selectedTaskId].Task_Mtrl_Cost) * Number(PartToTaskRatio)).toFixed(2);
                    partdetails[i].partRectWeight = parseFloat(Number(partdetails[i].PartRectArea) * Number(thickness) * Number(specificwt) * 0.0001).toFixed(3);

                    //                  console.log("Unit Material Cost : " + partdetails[i].Unit_Material_Cost);
                    //                console.log("Unit Material cost : " + partdetails[i].Unit_Material_cost);

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

        console.log(partdetails);

        let tskdetails = partdetails.filter((item) => item.TaskNo === taskselectedid + 1);
        setTaskGrpData(tskdetails);

        console.log(tskdetails);

        await postRequest(endpoints.updateTaskDetailsData, {
            quotationno: quotationNo, tskno: tskdetails[0].TaskNo, taskdetsdata: partdetails
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

    // ===== Recalculate =================
    const handlerecalcscheme = (e) => {
        console.log(e.target.value);
        setReCalcScheme(e.target.value);
    };


    //********** ReCalculate **************/
    let reCalcJW = async () => {
        console.log("======== Recalculate JW =======");
        console.log(recalcscheme);

        await postRequest(endpoints.getTaskListDataByQtnNo, { QtnNo: quotationNo }, (qtntasklistdetls) => {
            console.log("EST Task List Data : ");
            setEstTaskList(qtntasklistdetls);
        });

        await postRequest(endpoints.getTaskDetailsByTaskNo, { quotationNo: quotationNo, tskno: (selectedTaskId + 1) }, (tskdetls) => {
            console.log(tskdetls);
            taskdetailsdata = tskdetls;

        });

        console.log(selectedTaskId);
        console.log(esttaskList);
        // console.log(esttaskList[selectedTaskId].TaskJobWorkCost);
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

                taskdetailsdata.forEach(item => {

                    console.log("Unit Job Cost : " + item.Unit_JobWork_Cost);
                    jwcost = parseFloat((item.Unit_JobWork_Cost * (1 + MarkUpPercnet)));

                    console.log("After Cal. Unit JW Cost : " + jwcost);

                    item.Unit_JobWork_Cost = jwcost;

                    TaskRate += (parseFloat(jwcost) * parseFloat(item.QtyNested))
                });
                esttaskList[selectedTaskId].Task_Qtn_JW_Rate = TaskRate;
                console.log("Task Rate : " + TaskRate);
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
        await postRequest(endpoints.UpdQtnTaskListJW, { quotationno: quotationNo, taskno: (selectedTaskId + 1), taskjwrate: parseFloat(TaskRate).toFixed(2), taskdets: taskdetailsdata },
            (Qtntask) => {

                //       if (status === "Success") {
                console.log("Job Work Rate Updated Successfully");
                //     }
            });

        //     console.log("2646 - Task Details : " + JSON.stringify(taskdetailsdata));
        await postRequest(endpoints.UpdateProfileJWCost, { quotationNo: quotationNo, taskdetailsdata }, (tskdetls) => {
            //    setTaskGrpData(tskdetls);
            //  setTaskGrpData(filteredtlist);
        });


    }



    let reCalcMtrl = () => {
        //***** reaclcualte and Distribute part jw rates to align with target rates
        if (materialvalue < 0) {
            alert("Requires a Positve Numeric value")
            return
        }

        // let MtrlValue = e.target.value;
        let MtrlRatio = "0.00"
        let MtrlCost, TaskRate = "0.00";

        if (recalcscheme == "Normal") {
            // if (RadNormal.Checked) {
            //*** By Percent

            let MarkUpPercnet = ((materialvalue - taskgrpData[0].Task_Qtn_Mtrl_Rate) / taskgrpData[0].Task_Qtn_Mtrl_Rate)

            for (let i = 0; i < taskgrpData.length; i++) {      // taskgrpData.forEach(task => {
                // task["Unit_Material_Cost"] = task["Unit_Material_Cost"] * (1 + MarkUpPercnet)
                // TaskRate += task["Unit_Material_Cost"] * task["QtyNested"]
                taskgrpData[i]["Unit_Material_Cost"] = taskgrpData[i]["Unit_Material_Cost"] * (1 + MarkUpPercnet)
                TaskRate += taskgrpData[i]["Unit_Material_Cost"] * taskgrpData[i]["QtyNested"]
            }  //)
        }
        else {
            for (let i = 0; i < taskgrpData.length; i++) {
                let MtrlRatio = 0
                if (taskgrpData[i]["QtyNested"] > 0) {
                    MtrlRatio = (taskgrpData[i]["PartOutArea"] * taskgrpData[i]["QtyNested"] / taskgrpData[i]["TaskPartArea"]) / taskgrpData[i]["QtyNested"]
                }
                else {
                    MtrlRatio = 0
                }

                MtrlCost = MtrlRatio * materialtarget

                taskgrpData[i]["Unit_Material_Cost"] = MtrlCost
                TaskRate += taskgrpData[i]["Unit_Material_Cost"] * taskgrpData[i]["QtyNested"]

            }
        }
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
            console.log(response);
            if (response.status == 'Service is running') {

                let launchservice = await filetoService(window.dxffile);
                console.log("Edit DXF Clicked -1 ")
                console.log(launchservice);
                if (launchservice.status === 200) {
                    console.log("Edit DXF Clicked -2 ")
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
                        console.log("Edit DXF Clicked - 3")
                        const readres = await readreq.json();
                        if (readres.status === "File retrived") {
                            arrayBufferToString(new Uint8Array(readres.data.data), 'UTF-8', async (filecontentdata) => {
                                drawSvg(filecontentdata);
                                let newdxf = new File([filecontentdata], window.dxffile.name, { type: "text/plain" });
                                console.log(newdxf);
                                window.dxffile = newdxf;
                                console.log("Edit DXF Clicked - 4")
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
        // console.log(profileList);
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

    let onClickReRead = () => {
        console.log("ReRead Clicked : " + quotationNo);
        //   toast.warning("To Connect to Sigma Nest");
        postRequest(endpoints.getEstimateList, { qtnNo: quotationNo, doctype: "Quotation", btntype: "R" }, (estdata) => {
            //   console.log(estdata)
            // alert(estdata);
            setEstTaskList(estdata);

            // To Call Sigma
        })
    }

    // let renderProfileDrawdets = (profiledwgdata) => {
    //     return (
    //         <tr>
    //             <td>{profiledwgdata.file.name}</td>
    //             <td><input type="checkbox" checked /></td>
    //             <td>{profiledwgdata.partnetarea}</td>
    //             <td>{profiledwgdata.partnetwt}</td>
    //             <td>{profiledwgdata.rectweight}</td>
    //             <td>{profiledwgdata.quantity}</td>
    //             <td>{profiledwgdata.quantity}</td>
    //             <td>{profiledwgdata.lengthOfCut}</td>
    //             <td>{profiledwgdata.noOfPierces}</td>
    //             <td>{profiledwgdata.complexity}</td>
    //             <td><input type="checkbox" checked={profiledwgdata.outOpen === "True"} /></td>
    //             <td>{profiledwgdata.Task_Qtn_JW_Rate}</td>
    //             <td>{profiledwgdata.mtrlcost}</td>
    //         </tr>
    //     )
    // }

    let renderTaskDrawdets = (taskdwgdata) => {
        //  console.log(taskdwgdata)
        return (
            <tr>
                <td>{taskdwgdata.QtnSrl}</td>
                <td>{taskdwgdata.Dwg_Name}</td>
                <td><input type="checkbox" checked /></td>
                <td>{parseFloat(taskdwgdata.PartNetArea) || parseFloat(taskdwgdata.partNetArea)}</td>
                <td>{Number(taskdwgdata.PartNetWt).toFixed(3) || Number(taskdwgdata.partNetWeight).toFixed(3)}</td>
                <td>{Number(taskdwgdata.RectWeight).toFixed(3) || Number(taskdwgdata.rectWeight).toFixed(3)}</td>
                <td>{taskdwgdata.Qty || taskdwgdata.quantity}</td>
                <td>{taskdwgdata.QtyNested || taskdwgdata.quantity}</td>
                <td>{taskdwgdata.LOC || taskdwgdata.lengthOfCut}</td>
                <td>{taskdwgdata.NoofPierces || taskdwgdata.noOfPierces}</td>
                <td>{taskdwgdata.Complexity || taskdwgdata.complexity}</td>
                <td><input type="checkbox" checked={taskdwgdata.OutOpen === "True"} /></td>
                <td>{taskdwgdata.Unit_JobWork_Cost}</td>
                <td>{taskdwgdata.Unit_Material_cost}</td>

                {/* <td>{taskdwgdata.Dwg_Name || taskdwgdata.file.name}</td>
                <td><input type="checkbox" checked /></td>
                <td>{parseFloat(taskdwgdata.PartNetArea) || parseFloat(taskdwgdata.partNetArea)}</td>
                <td>{taskdwgdata.PartNetWt || taskdwgdata.partNetWeight}</td>
                <td>{taskdwgdata.RectWeight || taskdwgdata.rectWeight}</td>
                <td>{taskdwgdata.Qty || taskdwgdata.quantity}</td>
                <td>{taskdwgdata.QtyNested || taskdwgdata.quantity}</td>
                <td>{taskdwgdata.LOC || taskdwgdata.lengthOfCut}</td>
                <td>{taskdwgdata.NoofPierces || taskdwgdata.noOfPierces}</td>
                <td>{taskdwgdata.Complexity || taskdwgdata.complexity}</td>
                <td><input type="checkbox" checked={taskdwgdata.OutOpen === "True"} /></td>
                <td>{taskdwgdata.Unit_JobWork_Cost}</td>
                <td>{taskdwgdata.Unit_Material_cost}</td> */}

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


    //  const [dwgfoldershow, setDwgFolderShow] = useState(false);
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
        //     console.log(dwgdata);
        //     setCustDwgFiles(dwgdata.files);
        // });
    }
    //const handleCloseDwgFolder = () => setDwgFolderShow(false);


    return (

        <div>
            <div className="row">
                <div className="col-md-1">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation No</label>
                </div>
                <div className="col-md-1  mt-1">
                    <input type="text" id="formQuotationNo" style={{ fontSize: '13px' }} disabled value={searchParams.get("QtnNo")} />
                    {/* quotationNo} /> */}
                </div>

                <div className="col-md-1">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Type</label>
                </div>
                <div className="col-md-1  mt-1">
                    <input type="text" id="formType" style={{ fontSize: '13px' }} disabled value={quotationType} />
                </div>

                <div className="col-md-1">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Status</label>
                </div>
                <div className="col-md-1 mt=1">
                    <input type="text" id="formStatus" style={{ fontSize: '13px' }} disabled value={'Created'} />
                </div>
                <div className="col-md-1">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Date</label>
                </div>
                <div className="col-md-1 mt-1">
                    <input type="text" id="formEnqDate" style={{ fontSize: '13px' }} disabled value={enquiryDate} />
                </div>
                <div className="col-md-1">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
                </div>
                <div className="col-md-3 mt-1">
                    <input type="text" id="formCustomer" style={{ fontSize: '13px' }} disabled value={customer} />
                </div>
            </div>

            <div className="row">
                {/* <div className="col-md-3">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
                    <input type="text" id="formCustomer" disabled value={customer} />
                </div> */}
                <div className="col-md-1 ">
                    <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Contact</label>
                </div>
                <div className="col-md-3 mt-1">
                    <input type="text" id="formContact" style={{ fontSize: '13px' }} value={contact} />
                </div>
            </div>

            <div className="row justify-content-center">
                <button
                    className="button-style  " style={{ width: "170px", fontSize: '13px', fontWeight: 'bold' }}
                    onClick={() => {
                        // if ((profileList.length > 0)) {
                        //     setProfileAlertModal(true);
                        // } else {
                        //     handleShow(true);
                        // }
                        if (qtnProfileData.length > 0) {
                            setProfileAlertModal(true);
                        } else {
                            handleShow(true);
                        }
                    }}>
                    Import Drawings
                </button>

                <button className="button-style " style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={handleOpenDwgFolder}>
                    Drawing Folder
                </button>

                {/* <button className="button-style " style={{ width: "150px" }}>
          Import Rates
        </button> */}

                <button className="button-style " style={{ width: "120px", fontSize: '13px', fontWeight: 'bold' }} onClick={funcEditDXF}>
                    Edit Dxf
                </button>

                <button className="button-style " style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => navigate(-1)}>
                    Close
                </button>
            </div>

            <hr className="horizontal-line mt-1" />

            <Tabs defaultActiveKey="profileList" id="profileList" onSelect={(k) => setKey1(k)}
                className="mb-3 tab_font"
            //activeKey={key1 ?? "profileList"}
            >
                <Tab eventKey="profileList" title="Profile List">
                    {/* <> */}
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
                                    {(qtnProfileData.length > 0) || (!!selectedDwgId) ? qtnProfileData.map((mat, id) => {
                                        return (
                                            // <tr className="custtr" style={{ backgroundColor: (selectedDwgId === id ? '#5d88fc' : ''), cursor: 'pointer' }} id={id} onClick={() => selectItem(mat, id)}>
                                            //     <td className="custtd">{mat.Dwg_Name}</td>
                                            //     <td className="custtd">{mat.Operation}</td>
                                            //     <td className="custtd">{mat.Material}</td>
                                            //     <td className="custtd">{mat.Grade}</td>
                                            //     <td className="custtd">{mat.Thickness}</td>
                                            //     <td className="custtd">{mat.Qty}</td>
                                            //     <td className="custtd">{mat.Task_Qtn_JW_Rate}</td>
                                            //     <td className="custtd">{mat.mtrlcost}</td>
                                            //     <td className="custtd">{mat.uitrate}</td>
                                            // </tr>

                                            <tr className="custtr" style={{ backgroundColor: (selectedDwgId === id ? '#5d88fc' : ''), cursor: 'pointer' }} id={id} onClick={() => selectItem(mat, id)}>
                                                <td className="custtd">{id + 1}</td>
                                                <td className="custtd">{mat.file.name}</td>
                                                <td className="custtd">{mat.operation}</td>
                                                <td className="custtd">{mat.material}</td>
                                                <td className="custtd">{mat.grade}</td>
                                                <td className="custtd">{mat.thickness}</td>
                                                <td className="custtd">{mat.quantity}</td> 
                                                {/*<td className="custtd"><input id="quantity" type="text" onChange={mat.quantity} value={mat.quantity}></input></td>*/}
                                                <td className="custtd">{mat.Task_Qtn_JW_Rate}</td>
                                                <td className="custtd">{mat.mtrlcost}</td>
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
                                className="mb-3 tab_font"
                            >
                                <Tab eventKey="profiledwg" title="Drawing">
                                    <div id="dxf-content-container" className='dxf-content-container' />
                                </Tab>

                                <Tab eventKey="details" title="Details">
                                    <div className="row">
                                        <Form onSubmit={submitQtns}>
                                            <div className="row">
                                                <div className='col' >
                                                    <label className="form-label">Dwg / Part Name</label>
                                                    <input type="text" id="dwgname" />
                                                </div>
                                            </div>
                                            <div className="row" style={{ display: 'flex' }}>
                                                {/* <div className='col' > */}
                                                <label className="form-label row">Dwg Exists</label>
                                                <input className="row" type="checkbox" checked id="dwgexists" />
                                                {/* </div> */}
                                            </div>
                                            <div className="row">
                                                <div className='col' >
                                                    <label className="form-label">Operation</label>
                                                    {/* <Form.Control type="text" controlId="operation" style={{ height: '30px' }} onChange={(e) => setOperation(e.target.value)} value={operation} /> */}
                                                    {/* {procdata.length > 0 ?
                                                        <select className='ip-select' id="operation" onChange={(e) => setOperation(e.target.value)} value={operation} >
                                                            <option value="" disabled selected>** Select **</option>
                                                            {procdata.map((proc) => {
                                                                return (
                                                                    <option value={proc["ProcessDescription"]}> {proc["ProcessDescription"]}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        : ""
                                                    } */}
                                                    {procdata.length > 0 ?
                                                        <select className='ip-select' id="operation" onChange={chosenprocess} >
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
                                                <div className="col" >
                                                    <label className="form-label">Quantity</label>
                                                    <input type="text" id="quantity" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className='col'>
                                                    <label className="form-label">Mtrl Code</label>
                                                    {/* {mtrldata.length > 0 ?
                                                        <select className="ip-select" id="mtrlcode" onChange={selectMtrl} value={mtrlcode}>
                                                            <option value="" disabled selected>** Select **</option>
                                                            {mtrldata.map((mtrl) => {
                                                                return (
                                                                    <option value={mtrl["Mtrl_Code"]}>{mtrl["Mtrl_Code"]}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        : ""
                                                    } */}
                                                    {mtrldata.length > 0 ?
                                                        <select className='ip-select' id="mtrlcode" value={mtrlcode} onChange={chosenmaterial}>
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
                                                <div className='col' >
                                                    <label className="form-label">Material</label>
                                                    <input type="text" id="material" onChange={(e) => setMaterial(e.target.value)} value={material} />
                                                </div>
                                                <div className='col' >
                                                    <label className="form-label" >Grade </label>
                                                    <input type="text" id="grade" onChange={(e) => setGrade(e.target.value)} value={grade} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className='col' >
                                                    <label className="form-label">Thickness </label>
                                                    <input type="text" id="thickness" onChange={(e) => setThickness(e.target.value)} value={thickness} />
                                                </div>
                                                <div className='col' >
                                                    <label className="form-label">Tolerance  </label>
                                                    {ttypedata.length > 0 ?
                                                        <select className='ip-select' id="tolerance" onChange={selectTType} value={tolerance}>
                                                            <option value="" disabled selected>** Select **</option>
                                                            {ttypedata.map((ttype) => {
                                                                return (
                                                                    <option value={ttype["ToleranceType"]}>{ttype["ToleranceType"]}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        : ""
                                                    }
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className='col' >
                                                    <label className="form-label" >Insptn Level</label>
                                                    {/* <Form.Control type="text" size="sm" style={{ fontFamily: 'Roboto', fontSize: '14px' }} /> */}
                                                    {insplvldata.length > 0 ?
                                                        <select id="inspectionlevel" className="ip-select" onChange={selectInspLvl} value={inspectionlevel}>
                                                            <option value="" disabled selected>** Select **</option>
                                                            {insplvldata.map((insplvl) => {
                                                                return (
                                                                    <option value={insplvl["InspLevel"]}>{insplvl["InspLevel"]}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        : ""
                                                    }
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">LOC</label>
                                                    <input type="text" id="lengthOfCut" value={lengthOfCut} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className='col' >
                                                    <label className="form-label">No of Pcs</label>
                                                    <input type="text" id="noOfPierces" value={noOfPierces} />
                                                </div>

                                                <div className='col'>
                                                    <label className="form-label">JW Cost</label>
                                                    <input type="text" id="Task_Qtn_JW_Rate" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label" >Mtrl Cost</label>
                                                    <input className="in-Fields" type="text" id="mtrlcost" />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Unit Rate</label>
                                                    <input className="in-Fields" type="text" id="unitrate" />
                                                </div>
                                            </div>

                                            <div className="row mb-3 mt-2">

                                                <button id="btnsave" type="submit" className="button-style" style={{ width: '110px' }} >Save</button>
                                                {/* onClick={() => { submitQtns() }} */}
                                                {/* <button id="btnUpdate"  className="button-style" style={{ width: '110px' }} onClick={(e) => {updateDwgTable(e)}} >Update</button> */}

                                                <button id="btndelete" className="button-style" style={{ width: '110px' }} onClick={() => { deleteSelected() }}>Delete</button>
                                            </div>


                                        </Form>
                                    </div>

                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    {/* </> */}
                </Tab>

                <Tab eventKey="tasklist" title="Task List">
                    <div className='row' style={{ overflowY: "scroll" }}>
                        <ToastContainer />
                        <>

                            <div className="row">
                                <div className="row justify-content-center mt-1 mb-1">
                                    <button
                                        className="button-style"
                                        style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }}
                                        onClick={createTask}>
                                        Create Tasks
                                    </button>
                                    <button className="button-style  " style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }}
                                        //  onClick={onClickGetEstimator}
                                        onClick={() => onClickGetEstimator()} disabled={qtnProfileData.length === 0}
                                    >
                                        Get Estimate
                                    </button>
                                    <button className="button-style  " style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => onClickReRead()}>
                                        {/* disabled={rereadbtn}> */}
                                        ReRead
                                    </button>
                                    <button
                                        className="button-style  "
                                        style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }}
                                        onClick={() => onClickSetTaskRate()} disabled={taskgrpData.length === 0}
                                    >
                                        Set Task Rates
                                    </button>
                                    <button
                                        className="button-style  "
                                        style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }}
                                        onClick={onClickPrintEstimate} disabled={qtnProfileData.length === 0}
                                    >
                                        Print Estimate
                                    </button>
                                </div>
                                <div className="col-md-1"
                                    style={{ height: "150px", overflowY: "scroll" }}
                                >
                                    {" "}
                                    <Table striped className="table-data border">
                                        <thead className="tableHeaderBGColor">
                                            <tr>
                                                <th style={{ fontSize: '12px', fontWeight: 'bold' }}>Task No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(tasklistdata).map((tasklist, id) => {
                                                return (
                                                    <tr style={{ backgroundColor: selectedTaskId === id ? "#98A8F8" : "", cursor: "pointer" }} id={id} onClick={() => { taskselector(tasklistdata[tasklist], id) }}>
                                                        <td>
                                                            {id + 1}
                                                        </td>
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
                                            height: "130px",
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
                                    className="col-md-3" style={{ height: "150px", overflowY: "scroll" }}>
                                    {" "}
                                    <Table striped className="table-data border">
                                        <thead className="tableHeaderBGColor">
                                            <tr>
                                                <th>Type</th>
                                                <th>Area</th>
                                                <th>Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {taskAreaWightData != null ? taskAreaWightData.map((taskdets) => (
                                                <tr>
                                                    <td>{taskdets["type"]}</td>
                                                    <td>{taskdets["area"]}</td>
                                                    <td>{taskdets["weight"]}</td>
                                                </tr>
                                            )
                                            ) : ""}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="col-md-4">
                                    {" "}
                                    <div className="row">
                                        <div className="col">
                                            <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Eff./ Per Mtr Rate</label>
                                            <input style={{ marginTop: "5px", textAlign: 'right', fontSize: '13px' }} value={tpermtrRate} />
                                        </div>
                                        <div className="col">
                                            <label className="" style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>
                                                Per Kg Rate
                                            </label>
                                            <input style={{ marginTop: "5px", fontSize: '13px' }} onChange={(e) => setTask_perkg_cost(e.target.value)} value={task_perkg_cost} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Utilisation %</label>
                                            <input style={{ marginTop: "5px", fontSize: '13px' }} onChange={(e) => setUtilisationPercent(e.target.value)} value={utilisationpercent} />
                                        </div>
                                        <div className="col">
                                            <label className="" style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>
                                                Scrap %
                                            </label>
                                            <input style={{ marginTop: "5px", fontSize: '13px' }} onChange={(e) => setScrapPercent(e.target.value)} value={scrappercent} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="horizontal-line mt-1" />
                            <div className="row">
                                {/* {" "} */}
                                <div className="col-md-1">
                                    <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Nest Count</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={nestcount} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>Dwgs to Nested</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={dwgstonest} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Dwgs Nested</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px", fontSize: '13px', fontWeight: 'bold' }} type="text" disabled value={dwgstonest} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>Parts to Nest</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={partstonest} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>Parts Nested</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={partsnested} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Task LOC</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={taskloc} />
                                </div>
                                <div className="col-md-1">
                                    <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Pierces</label>
                                </div>
                                <div className="col-md-1">
                                    <input style={{ marginTop: "5px" }} type="text" disabled value={taskpierces} />
                                </div>
                            </div>
                            <hr className="horizontal-line mt-1" />
                            <div className="row" style={{ paddingLeft: "10px" }}>
                                <div
                                    className="col-md-5 "
                                    style={{ marginLeft: "20px", marginTop: "30px" }}
                                >
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <div style={{ marginTop: "-15px" }}>
                                                <label
                                                    className="form-label"
                                                    style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>
                                                    Job Work
                                                </label>
                                                <br />
                                                <label className="form-label " style={{ marginTop: "10px", fontSize: '13px', fontWeight: 'bold' }}>
                                                    Material
                                                </label>
                                            </div>
                                            <div></div>


                                            <div className="col-md-4" style={{ width: "100px", marginTop: "-35px", display: "flex", gap: "10px", }}>
                                                <div>
                                                    <h5 style={{ marginLeft: "20px", fontSize: '13px', fontWeight: 'bold' }}> Value</h5>
                                                    <input style={{ width: "110px", marginTop: "10px", fontSize: '13px', textAlign: 'right' }} value={jwvalue}></input>
                                                    <input style={{ width: "110px", marginTop: "10px", fontSize: '13px', textAlign: 'right' }} onChange={(e) => setMaterialValue(e.target.value)} value={materialvalue}></input>
                                                </div>
                                                <div>
                                                    <h5 style={{ marginLeft: "20px", fontSize: '13px', fontWeight: 'bold' }}>Target</h5>
                                                    <input style={{ width: "110px", marginTop: "10px", fontSize: '13px', textAlign: 'right' }} id="jwtarget" onChange={(e) => { setJWTarget(e.target.value) }} value={jwtarget} />
                                                    <input style={{ width: "110px", marginTop: "10px", fontSize: '13px', textAlign: 'right' }} onChange={(e) => setMaterialTarget(e.target.value)} value={materialtarget} />
                                                </div>
                                                <div>
                                                    <button className="button-style group-button" style={{ width: "100px", fontSize: '13px', marginTop: "17px", }} onClick={() => reCalcJW()}>
                                                        Recalculate
                                                    </button>
                                                    <button className="button-style  group-button" style={{ width: "100px", fontSize: '13px', marginTop: "9px", }}>
                                                        Recalculate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-md - mt-1  mb-1">
                                        <div className="row">
                                            <div className="col-md-3 mt-1"
                                                style={{ display: "flex", gap: "10px" }}>
                                                {/* <h6> */}
                                                <h6>Recalc Scheme</h6>
                                                {/* </h6> */}
                                            </div>
                                            {/* <div className="row"> */}
                                            <div className="col-md-2" style={{ display: "flex", gap: "10px" }}>
                                                <label className="form-label" style={{ paddingRight: "2px", fontSize: '13px', fontWeight: 'bold' }}>
                                                    {" "}
                                                    Default
                                                </label>
                                                <input className="form-check-input" style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("Default")}
                                                    type="radio" checked={recalcscheme === "Default"}
                                                />
                                            </div>

                                            <div className="col-md-2" style={{ display: "flex", gap: "10px" }}>
                                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}> Normal</label>
                                                <input
                                                    className="form-check-input"
                                                    style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("Normal")}
                                                    type="radio" checked={recalcscheme === "Normal"}
                                                />
                                            </div>

                                            <div
                                                className="col-md-2"
                                                style={{ display: "flex", gap: "7px" }}
                                            >
                                                <label className="form-label" style={{ paddingRight: "3px", fontSize: '13px', fontWeight: 'bold' }}>
                                                    LOC
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("LOC")}
                                                    type="radio" checked={recalcscheme === "LOC"}
                                                />
                                            </div>

                                            <div
                                                className="col-md-3"
                                                style={{ display: "flex", gap: "10px" }}
                                            >
                                                <label className="form-label" style={{ paddingRight: "3px", fontSize: '13px', fontWeight: 'bold' }}>
                                                    PierceLOC
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    style={{ marginTop: "12px" }} onChange={() => setReCalcScheme("PierceLOC")}
                                                    type="radio" checked={recalcscheme === "PierceLOC"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 mt-1">
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <div style={{ marginLeft: "10px" }}>
                                                <label className=" form-label mt-1 " style={{ fontSize: '13px', fontWeight: 'bold' }}>Programming</label>
                                                <label
                                                    className="form-label mt-1"
                                                    style={{ whiteSpace: "nowrap", fontSize: '13px', fontWeight: 'bold' }}>
                                                    Task Setup Loading
                                                </label>
                                                <label className="form-label mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>Material Handling</label>
                                            </div>
                                            <div></div>
                                            <div
                                                className="col-md-4" style={{ width: "120px", marginTop: "-10px" }}>
                                                <h5 style={{ marginLeft: "20px", fontSize: '13px', fontWeight: 'bold' }}>Charges</h5>

                                                <input className="mt-1" style={{ textAlign: 'right', fontSize: '13px' }} value={programming}></input>
                                                <input className="mt-1" style={{ marginTop: "35px", fontSize: '13px', textAlign: 'right' }} value={tasksetuploading}></input>
                                                <input className="mt-1" style={{ marginTop: "25px", fontSize: '13px', textAlign: 'right' }} value={Task_Mtrl_Handling_Charge}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div style={{ marginLeft: "45px" }}>
                                            <label className="form-label mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>Cutting</label>
                                            <br />
                                            <label className="form-label mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>Job Work</label>
                                            <br />
                                            <label className="form-label mt-1" style={{ fontSize: '13px', fontWeight: 'bold' }}>Material</label>
                                        </div>
                                        <div></div>
                                        <div
                                            className="col-md-4 "
                                            style={{ width: "120px", marginTop: "-20px" }}>
                                            <h5 style={{ marginLeft: "20px", fontSize: '13px', fontWeight: 'bold' }}>Charges</h5>

                                            <input className="mt-1" style={{ textAlign: 'right', fontSize: '13px' }} value={Task_Basic_Cutting_Cost}></input>
                                            <input className="mt-1" style={{ marginTop: "35px", fontSize: '13px', textAlign: 'right' }} value={jwcharges}></input>
                                            <input className="mt-1" style={{ marginTop: "25px", fontSize: '13px', textAlign: 'right' }} value={materialcharges}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-1" style={{ height: "250px", overflowY: "scroll" }}>
                                <Table striped className="table-data border">
                                    <thead className="tableHeaderBGColor">
                                        <tr>
                                            <td>Srl</td>
                                            <th>Part/Dwg Name</th>
                                            <th>Drawing Exists</th>
                                            <th>Part NetArea</th>
                                            <th>Part NetWt</th>
                                            <th>Rect Weight</th>
                                            <th>To Quote Quantity</th>
                                            <th>Nested Quantity</th>
                                            <th>LOC</th>
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

            {/* Import Drawings */}

            <div className="row mt-3 mt-3">
                <Modal show={show}>
                    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
                        <Modal.Title >Enter Default Parameters for Import</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-style">
                            <Form onSubmit={importdrawings}>
                                <div className="row mb-1">
                                    {/* <div className="col">
                                        <div className='row'>
                                            <Form.Group controlId="mtrlcode"> */}
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


                                            {/* {procdata.length > 0 ?
                      <select className='ip-select' id="processdescription" onChange={selectProc} defaultValue="Laser Cutting Oxygen" value={processdescription}>
                        <option value="" disabled selected>** Select **</option>
                        {procdata.map((proc) => {
                          return (
                            <option value={proc["ProcessDescription"]}>{proc["ProcessDescription"]}</option>
                          )
                        })}
                      </select>
                      : ""
                    } */}
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
                                    {/* <div className="md-col-4">
                                                    <Form.Label className="form-label">Material Code</Form.Label>
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
                                                </div> */}
                                    {/* </Form.Group>
                                        </div> */}
                                    {/* <div className='row mt-1'>
                                            <div className="md-col-4" >
                                                <label className="form-label">Material</label>
                                                <input type="text" id="material" onChange={(e) => setMaterial(e.target.value)} value={material} />
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className="md-col-4" >
                                                <label className="form-label">Grade </label>
                                                <input type="text" id="grade" value={grade} />
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className="md-col-4" >
                                                <label className="form-label">Thickness </label>
                                                <input type="text" id="thickness" onChange={(e) => setThickness(e.target.value)} value={thickness} />
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <Form.Group controlId="processdescription">
                                                <div className="md-col-4">
                                                    <label className="form-label">Process</label>
                                                    {procdata.length > 0 ?
                                                        <select className='ip-select' onChange={selectProc}>
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
                                            </Form.Group>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className="md-col-4">
                                                <label className="form-label">Quantity </label>
                                                <input type="text" id="quantity" />
                                            </div>
                                        </div>
                                        <div className='row mt-1'>
                                            <Form.Group controlId="files">
                                                <div className="md-col-4">
                                                    <Form.Label className="form-label">Select Files </Form.Label>
                                                    <Form.Control type="file" multiple="multiple" accept=".dxf" />
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className='row mt-2'>
                                            <div className="col">
                                                <button className="button-style" type="submit" style={{ width: '120px' }}>Ok</button>
                                            </div>
                                            <div className="col">
                                                <button className="button-style" style={{ width: '120px' }} variant="secondary" onClick={handleClose}>Close</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            {/* Drawing Folder */}
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

            {/* Set Task Rates Modal */}

            <div className="row">
                <Modal show={taskratesshow}>

                    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
                        <Modal.Title>Basic Rates for Quotation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-md-12 col-sm-12">
                            <div >
                                <div className="row">

                                    <div className="col-md-12 mb-2">
                                        <label className="form-label">{operation + ' - ' + material + ' ' + thickness}</label>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label" style={{ textAlign: 'right' }}>Eff. Rate / Mtr</label>
                                        </div>
                                        <div className="col-md-5">
                                            {/* <input className='in-fields' id="tpermtrRate" onChange={(e) => setDecPerMtrRate(e.target.value)} value={decpermtrRate} /> */}
                                            <input className='in-fields' id="decpermtrRate" onChange={(e) => setDecPerMtrRate(e.target.value)} required value={decpermtrRate} />
                                            {/* onChange={(e) => setDecPerMtrRate(e.target.value)} */}
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label">Per Piece Rates</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className='in-fields' id="perpiercerate" onChange={(e) => setDecPierceRate(e.target.value)} value={decPierceRate} />
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label">Machine Setting Up Rate Rs/Task</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className='in-fields' id="mchsetuprate" onChange={(e) => setMchSetUpRate(e.target.value)} value={mchsetuprate} />
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label">Sheet Loading Rate Rs/Sheet</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className='in-fields' id="shtloadrate" onChange={(e) => setDecSheetLoadingRate(e.target.value)} value={decSheetLoadingRate} />
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label">Material Handling  Rate Rs/KG</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className='in-fields' id="mtrlhdlgrate" onChange={(e) => setDecMtrl_HandlingRate(e.target.value)} value={decMtrl_HandlingRate} />
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-md-7">
                                            <label className="form-label">Material Sales Rate Rs/KG</label>
                                        </div>
                                        <div className="col-md-5">
                                            <input className='in-fields' id="mtrlsalerate" onChange={(e) => setMtrlSaleRate(e.target.value)} value={mtrlsalerate} />
                                        </div>
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
                    {/*     <Modal.Footer>
            <button className="button-style" style={{ backgroundColor: "#2b3a55", border: "#2b3a55", width: "100px" }} onClick={settingRates()}>
              Accept
            </button>
            <button className="button-style" style={{ width: "100px" }} variant='secondary' onClick={() => handleCloseTaskRates()}>
              Close
            </button>
          </Modal.Footer>*/}
                </Modal>

            </div>
            <div>
                <ModalPrintEstimation openEstPrintModal={openEstPrintModal} EstData={estprintdata} handleClose={setOpenEstPrintModal} />
            </div>
            {/* <div>
                <ModalPrintEstimation openEstPrintModal={openEstPrintModal} QtnNo={quotationNo} handleClose={setOpenEstPrintModal} />
            </div> */}

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
        </div >

    )
}