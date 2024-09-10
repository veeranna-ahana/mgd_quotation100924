import React, { useEffect, useRef } from 'react';
//import ScheduleListForm from './ScheduleList/ScheduleListForm';
import NcTaskForm from './NcTaskList/NcTaskForm';
import NcProgramsForm from './NcProgramTab/NcProgramsForm';
import { Tab } from 'bootstrap';
import { useState } from 'react';
import { Table, Tabs, Modal } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typeahead } from "react-bootstrap-typeahead";
import { Helper } from 'dxf';
import { toast, ToastContainer } from "react-toastify";
import moment from 'moment';

import ProgramSaveModal from './NcTaskList/ProgramSaveModal';
//import MaterialIssueModal from './NcTaskList/MaterialIssueModal';
import DeleteModal from './NcTaskList/DeleteModal';

const { getRequest, postRequest } = require("../../api/apiinstance");
const { endpoints } = require("../../api/constants");

export default function ProcessingSigmaForm() {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [schstatus, setSchStatus] = useState(searchParams.get("schstatus"));

    //Handles for Modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [taskmaterialallotment, setTaskMaterialAllotment] = useState(false);

    const [materialIssuemodal, setMaterialIssueModal] = useState(false);

    const [handleAddStock, sethandleAddStock] = useState(false);

    const fileInputRef = useRef(null);
    const [key, setKey] = useState("scheduleList");
    const [key1, setKey1] = useState("programs");
    let [dxffiledata, setDxfFileData] = useState("");
    let [quotationNo, setQuotationNo] = useState("");
    let [material, setMaterial] = useState("");
    let [operation, setOperation] = useState("");
    let [qtnProfileData, setQtnProfileData] = useState([]);
    let [selectedDwgId, setSelectedDwgId] = useState(0);
    let [BS_Schedule, setBS_Schedule] = useState([]);
    let [bs_mtrlavailability, setBS_MtrlAvailability] = useState([]);
    let [BS_taskparts, setBS_TaskParts] = useState([]);


    // NCTaskList variables start
    const [saveProgram, setSaveProgram] = useState(false);
    //   const [materialIssue, setMaterialIssue] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    let [nctaskid, setNcTaskId] = useState("");
    let [taskDwg, setTaskDwg] = useState("");
    let [dwgsNested, setDwgsNested] = useState("");
    let [machine, setMachine] = useState("");
    let [tstatus, setTStatus] = useState("");
    let [tpriority, setTPriority] = useState("");
    let [taskparts, setTaskParts] = useState("");
    let [nestedparts, setNestedParts] = useState("");
    // NCTaskList variables end

    // NcPrograms variables start
    let [ncprogramno, setNcProgramNo] = useState("");
    let [ncpstatus, setNcPStatus] = useState("");
    let [ncoperation, setNcOperation] = useState("");
    let [ncmachine, setNcMachine] = useState("");
    let [ncdwgs, setNcDwgs] = useState("");
    let [ncpara1, setNcPara1] = useState("");
    let [ncpara2, setNcPara2] = useState("");
    let [ncqty, setNcQty] = useState("");
    let [nctotalparts, setNcTotalParts] = useState("");
    let [ncestimatedtime, setNcEstimatedTime] = useState("");
    let [ncpriority, setNcPriority] = useState("");
    let [nctotalloc, setNcTotalLOC] = useState("");
    let [nccustmtrl, setNcCustMtrl] = useState("");
    let [nctaskno, setNcTaskNo] = useState("");
    let [ncmtrl_code, setNcMtrl_Code] = useState("");
    let [nctotalholes, setNcTotalHoles] = useState("");
    let [ncremarks, setNcRemarks] = useState("");
    // NcPrograms variables end

    console.log(searchParams.get("schstatus"));

    //    let navigate = useNavigate();
    //const [searchParams] = useSearchParams();

    let [estData, setEstData] = useState([]);
    //  let [quotationNo, setQuotationNo] = useState("");
    let [SigmaID, setSigmaID] = useState(0);
    let [SchId, setSchId] = useState(0);
    //let [schstatus, setSchStatus] = useState(searchParams.get("schstatus"));

    const [machinedata, setMachineData] = useState([]);
    const [BS_taskList, setBS_taskList] = useState([]);
    const [BS_programList, setBS_programList] = useState([]);
    const [BS_taskMtrlList, setBS_taskMtrlList] = useState([]);
    const [BS_TaskPgmList, setBS_TaskPgmList] = useState([]);
    const [BS_materialforissue, setBS_MaterialForIssue] = useState([]);
    const [BS_dxfFilesList, setBS_DxfFilesList] = useState([]);

    let [selectedScheduleID, setSelectedScheduleID] = useState("");
    let [selectedTaskID, setSelectedTaskID] = useState("");
    let [selectedPrgID, setSelectedPrgID] = useState("");

    let [ordschno, setOrdSchNo] = useState(0);
    let [order_No, setOrder_No] = useState(0);
    let [customernm, setCustomerNm] = useState("");
    let [cust_code, setCustCode] = useState("");
    let [dxfFolderShow, setDxfFolderShow] = useState(false);
    //let [dxfFileData, setDxfFileData] = useState("");


    console.log(searchParams.get("schstatus"));

    useEffect(() => {
        async function fetchData() {
            await postRequest(endpoints.getScheduleList, { schStatus: searchParams.get("schstatus") }, async (bs_schedule) => {
                console.log(bs_schedule);
                setBS_Schedule(bs_schedule);
            });

            await postRequest(endpoints.getMachineDetails, {}, async (machinedetails) => {
                console.log(machinedetails);
                setMachineData(machinedetails);
            });
            //  await getRequest(endpoints.getQuotationProfile, (qtnProfile) => {});


            // '**** TaskStatus Table
            // SQL = "SELECT * FROM magodmis.nctaskstatuslist n ORDER BY n.`StatusNo`;"

            // '**** ProgramStatus Table
            // SQL = "SELECT * FROM magod_setup.2d_programstatus d;"



        }
        fetchData();

    }, []);

    let selectMachine = (e) => {
        setMachine(e[0].MachineID);

    }

    const btnAllotPgmNo = () => {
        if (SchId == 0) {
            toast.success("Select Schedule to Process", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        postRequest(endpoints.tasks, { schId: SchId }, (taskdata) => {

        });
        //AllotProgramNo();

    }

    const btnReadWs = () => {

        if (SchId == 0) {
            toast.success("Select Schedule to Process", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        // Pass Schedule No to API via quotationNo
        //ordNo: order_No,cust:customernm,
        postRequest(endpoints.getEstimateList, { ordNo: order_No, doctype: "Order", btntype: "R" }, (estdata) => {
            console.log(estdata)
            console.log(estdata.length);
            setEstData(estdata);
        });

        // If updateSchPara_New() Then
        // MsgBox("Schedule Details Saved")
        // End If
        // Exit Sub
        ////
    }

    const btnCreateDxfWS = async () => {
        // await postRequest(endpoints.getCreateDxfWS, { ordNo: order_No, cust: customernm, doctype: "SigmaNC", btntype: "E" }, async (crtdxfwsdata) => {
        await postRequest(endpoints.getCreateDxfWS, { ordNo: order_No, cust: customernm, doctype: "SigmaNC", btntype: "E" }, async (crtdxfwsdata) => {
            console.log(crtdxfwsdata)
            console.log(crtdxfwsdata.length);
            //  setEstData(estdata);

        });
        // Private Function createDXFWS() As Boolean
        //     Dim SigmaTask As magod.SigmaNest.SigmaNestData.TaskListRow
        //     Dim SigmaPart As magod.SigmaNest.SigmaNestData.TaskPartsRow

        //     With Ms
        //         .DxfPath = WOPath & "\" & BS_taskList.Current.Item("Order_no") & "\DXF\"
        //         .WSPath = WsPath
        //         .WO = SchNo
        //         .Customer = BS_schedule.Current.item("Cust_name")
        //     End With


        //     '  End If
        //     Ms.ClearOldData()
        //     With Ms.getData
        //         For Each task As magod.NCProgramming.TaskListRow In NcProgramming1.TaskList.Rows
        //             SigmaTask = Ms.getData.TaskList.NewTaskListRow
        //             With SigmaTask
        //                 .TaskId = task.NcTaskId
        //                 .TaskNo = task.TaskNo
        //                 .MTRL = task.MTRL
        //                 .Thickness = task.Thickness
        //                 .Process = task.MProcess
        //                 If task.IsMachineNull Then
        //                     .MachineName = Nothing
        //                 Else
        //                     .MachineName = task.Machine
        //                 End If

        //                 .Mtrl_Code = task.Mtrl_Code
        //                 .Mtrl_source = task.CustMtrl

        //             End With
        //             Ms.getData.TaskList.AddTaskListRow(SigmaTask)
        //         Next

        //         For Each part As magod.NCProgramming.Task_PartsListRow In NcProgramming1.Task_PartsList.Rows
        //             SigmaPart = Ms.getData.TaskParts.NewTaskPartsRow
        //             With SigmaPart
        //                 .DwgName = part.DwgName
        //                 .DwgPattern = ".DXF"
        //                 .PartUid = part.Task_Part_ID
        //                 .QtyToNest = part.QtyToNest
        //                 .TaskId = part.NcTaskId
        //                 .DwgExists = True

        //             End With
        //             Ms.getData.TaskParts.AddTaskPartsRow(SigmaPart)
        //         Next

        //         For Each mtrl As magod.NCProgramming.Task_MtrlListRow In NcProgramming1.Task_MtrlList.Rows
        //             Dim SigmaSheet = Ms.getData.TaskMtrlList.NewTaskMtrlListRow
        //             With SigmaSheet
        //                 .TaskId = mtrl.NcTaskId
        //                 .TaskNo = mtrl.TaskNo
        //                 .Length = mtrl.Length
        //                 .Width = mtrl.Width
        //                 .NoOfSheets = mtrl.Quantity
        //                 .MagodTaskId = mtrl.NcTaskId
        //             End With
        //         Next
        //     End With

        //     Try

        //         With Ms
        //             .PO_No = BS_schedule.Current.item("PO")
        //             .WO = BS_schedule.Current.item("OrdSchNo")
        //             .Customer = BS_schedule.Current.item("Cust_name")
        //             .CreateWS()
        //         End With

        //         saveSchChanges()

        //         Return True

        //     Catch ex As Exception
        //         MsgBox(ex.Message)
        //         Return False

        //     End Try
        //     End Function

    }

    const btn_pgmComplete = () => {
        if (SchId = 0) {
            toast.success("Select Schedule to Process", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        setTaskWeight()
        //'****** Update QtyProgrammed in orderschedule
        // Get Data from API and then do the below


        // For Each part As magod.NCProgramming.Task_PartsListRow In NcProgramming1.Task_PartsList.Rows
        //     Dim schPart As magod.NCProgramming.orderscheduledetailsRow = NcProgramming1.orderscheduledetails.FindBySchDetailsID(part.SchDetailsId)
        //     If Not schPart Is Nothing Then
        //         schPart.QtyProgrammed = part.QtyNested
        //     End If
        // Next
        // For Each task As magod.NCProgramming.TaskListRow In NcProgramming1.TaskList.Rows
        //     If Not task Is Nothing Then
        //         task.TStatus = "Programmed"
        //     End If
        // Next
        // Dim sch As magod.NCProgramming.orderscheduleRow = NcProgramming1.orderschedule.FindByScheduleId(
        // NcProgramming1.orderscheduledetails.Rows(0).Item("ScheduleId"))
        // If Not sch Is Nothing Then
        //     sch.Schedule_Status = "Programmed"
        // End If
        // DA_Task.Update(NcProgramming1.TaskList)
        // DA_SchDetails.Update(NcProgramming1.orderscheduledetails)
        // Da_SchList.Update(NcProgramming1.orderschedule)
        toast.success("Status updated", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    }

    const setTaskWeight = () => {
        // '***** This sets the weight parameters for the task and task parts
        // '***** Area, thickness and material are required parameters
        // '**** The function fetches the corresponding specific weight for t the grade of material from DB if 0 then fetches spwt base material

        //call Sigmanest
        //     For Each task As magod.NCProgramming.TaskListRow In NcProgramming1.TaskList.Rows

        //         With task

        //             If Not task.IsMtrl_CodeNull Then
        //                 NCPgm.getMaterial.MtrlCode = task.Mtrl_Code
        //                 If NCPgm.getMaterial.IsMtrlOK Then
        //                     task.SpWeight = NCPgm.getMaterial.Density
        //                 Else
        //                     task.SpWeight = getSpWt(task)
        //                 End If
        //             Else
        //                 task.SpWeight = getSpWt(task)
        //             End If

        //             If task.SpWeight > 0 Then
        //                 task.Task_Net_wt = Math.Round(task.TaskNetArea * task.Thickness * task.SpWeight * 0.0001, 2)
        //                 task.Task_Mtrl_Weight = Math.Round(task.TaskMtrlArea * task.Thickness * task.SpWeight * 0.0001, 2)
        //                 For Each taskPart As magod.NCProgramming.Task_PartsListRow In NcProgramming1.Task_PartsList.Select(String.Format("NCTaskId={0}", task.NcTaskId))
        //                     taskPart.Unit_Wt = Math.Round(taskPart.Part_Area * task.Thickness * task.SpWeight * 0.0001, 3)
        //                 Next
        //             End If


        //         End With
        // NextTask:
        //     Next
        //     '***** Update Schedule Parts Para
        //     For Each taskPart As magod.NCProgramming.Task_PartsListRow In NcProgramming1.Task_PartsList.Rows
        //         '  Dim schPart As magod.NCProgramming.orderscheduledetailsRow = NcProgramming1.orderscheduledetails.FindBySchDetailsID(taskPart.SchDetailsId)
        //         Dim schPart As magod.NCProgramming.orderscheduledetailsRow = NcProgramming1.orderscheduledetails.FindBySchDetailsID(taskPart.SchDetailsId)

        //         schPart.UnitWt = taskPart.Unit_Wt
        //         schPart.LOC = taskPart.LOC
        //         schPart.Part_Area = taskPart.Part_Area
        //         schPart.Holes = taskPart.Pierces
        //     Next
    }

    const btn_estTime = () => {
        //   postRequest(endpoints.updateTaskProgramList, { schId: SchId }, (estTime) => {});

        if (!(BS_Schedule === null || BS_Schedule.Current === null)) {
            const result = BS_TaskPgmList.reduce((count, pgm) => count + (pgm.IsNCProgramNoNull || pgm.EstimatedTime === 0 ? 1 : 0), 0);

            if (result > 0) {
                toast.info("Either Program No Not allotted to all programs Or estimated time not entered", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                return;
            } else {
                const totalTime = BS_TaskPgmList.reduce((sum, pgm) => sum + pgm.EstimatedTime, 0);
                const msg = `Estimated Cutting Time for ${BS_Schedule.Current.item("OrdSchNo")} :- ${getTimeInHours(totalTime)}`;
                toast.info(msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            }
        }
    };

    const getTimeInHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const min = Math.floor((minutes % 60));
        return `${hours} hours and ${min} minutes`;
    };


    const fnOrderDxf = () => {
        if (ordschno == "") {
            toast.success("Select Schedule to Process", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        //     fileInputRef.current.click();
        setDxfFolderShow(true);
        let schNo = ordschno.substring(0.6);
        let destPath = `\\Wo\\` + schNo + "\\DXF\\";
        console.log(destPath);

        postRequest(endpoints.getDwgFiles, { schNo, destPath }, (fileslist) => {
            console.log(fileslist);
            setBS_DxfFilesList(fileslist);
        });
    }

    const handleCloseDwgFolder = () => setDxfFolderShow(false);

    const materialIssue = () => {
        setMaterialIssueModal(true);
    }

    const materialIssueClose = () => {
        setMaterialIssueModal(false);
    }

    const materialpopup = () => {
        setTaskMaterialAllotment(true);
    }

    const materialpopupclose = () => {
        setTaskMaterialAllotment(false);
    }

    const handleFileChange = (e) => {
        // To open the Dxf File selected by the user
    }

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


    function arrayBufferToString(buffer, encoding, callback) {
        var blob = new Blob([buffer], { type: 'text/plain' });
        var reader = new FileReader();
        reader.onload = function (evt) { callback(evt.target.result); };
        reader.readAsText(blob, encoding);
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
                dwl.href = require("../../../lib/LazerCADServiceInstaller.exe");
                // dwl.href = require("../../../../../../lib/LazerCADServiceInstaller.exe");
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
        formData.append("qty", qtnProfileData[selectedDwgId].quantity);

        const res = await fetch('http://127.0.0.1:21341/editdxf', {
            method: 'POST',
            body: formData,
        });
        return res;
    }




    // const allowedExtensions = ['prs'];
    // const fileExtension = file.name.split('.').pop().toLowerCase();


    // const handleOpenCustPartsFolder = async () => {

    //     let input = document.createElement('input');
    //     input.type =  'file';  //'Parts files (*.prs)|*.Prs' ;
    //     input.onchange = _ => {
    //         // you can use this method to get file and perform respective operations
    //         let files = Array.from(input.files);
    //         console.log(files);
    //     };
    //     input.click();

    // }

    const handleOpenCustPartsFolder = async () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.prs'; // Set the accept attribute to filter "*.prs" files
        input.onchange = (event) => {
            let files = Array.from(event.target.files);
            console.log(files);
            // Perform your respective operations with the files here
        };
        input.click();
    };

    // NC Task List start

    const addStock = () => {
        // Click on Add button inside Material Popup
        sethandleAddStock(true);
    }

    const materialIssueSubmit = () => {
        if (BS_materialforissue == "" || BS_materialforissue == undefined) {
            toast.error("Select Rows to Send for material issue");
            return;
        }
        console.log(BS_materialforissue);
        for (let i = 0; i < BS_materialforissue.length; i++) {
            if (checkProgramMaterialSize(BS_materialforissue[i].Ncid)) {
                BS_materialforissue[i].PStatus = "Mtrl Issue";
            }
        }
        //  setMaterialIssueModal(true);

    }

    const checkProgramMaterialSize = async (ncId) => {
        let pgm = BS_programList.find((pgm) => pgm.Ncid === ncId);
        if (pgm === undefined) {
            toast.error("Error in Checking");
            return false;
        } else {
            if (pgm.PStatus !== "Created") {
                toast.error("Cannot ProgramNo :" + pgm.NCProgramNo + " for Material Issue");
            } else if (pgm.EstimatedTime <= 0) {
                toast.error("Enter Time for :" + pgm.NCProgramNo + " for Material Issue");
            } else if (pgm.Mtrl_Code.includes("Tube") || pgm.Mtrl_Code.includes("Unit")) {
                //**** Tubes and units are not nested hence once programmed can go for
                return true;
            } else if (pgm.NetNestArea <= 0) {
                toast.error("Enter NestArea for :" + pgm.NCProgramNo + " for Material Issue");
            } else if (pgm.NetNestArea * 100 > pgm.Para1 * pgm.Para2) {
                toast.error("Material Size Mismatch :" + pgm.NCProgramNo + " for Material Issue");
            } else {
                const result = await postRequest(endpoints.getMaterialNestArea, { NCProgramNo: pgm.NCProgramNo });
                if (!result) {
                    toast.error("Material Nest Area Mismatch :" + pgm.NCProgramNo + " for Material Issue");
                }
                return true;
            }
        }
    }


    const saveSubmit = () => {
        setSaveProgram(true);

        // try{
        //     BS_taskList.EndEdit()
        //     BS_TaskPgmList.EndEdit()
        //     DA_Ncpgm.Update(NcProgramming1.TaskProgramList)
        //     DA_Task.Update(NcProgramming1.TaskList)
        //     toast.success("Task and Program details Saved");
        // } catch (ex) {
        //     toast.error(ex.message);
        // }
    }

    const deleteSubmit = async () => {
        try {
            if (BS_materialforissue == "" || BS_materialforissue == undefined) {
                toast.error("Select Rows to Delete");
                return;
            }
            console.log(BS_materialforissue);
            for (let i = 0; i < BS_materialforissue.length; i++) {
                if (BS_materialforissue[i].PStatus !== "Created") {
                    toast.error("Cannot delete ProgramNo :" + BS_materialforissue[i].NCProgramNo);
                } else {
                    await postRequest(endpoints.deleteProgram, { NCid: BS_materialforissue[i].Ncid }, (res) => {
                        console.log(res);
                    });
                }
            }
            //   setDeleteData(true);
        } catch (ex) {
            toast.error(ex.message);
            return;
        } finally {
            // NcProgramming1.NCProgramPartsList.Clear()
            // NcProgramming1.TaskProgramList.Clear()
            // DA_Ncpgm.Fill(NcProgramming1.TaskProgramList)
        }
        //  setDeleteData(true);
    }

    ////////////////////////////// 


    // Private Sub btnDelete_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnDelete.Click
    // Dim cmd As MySql.Data.MySqlClient.MySqlCommand = NCPgm.getDBLink.getCommand
    // Try
    //     With cmd
    //         .Parameters.Add("@NCid", MySql.Data.MySqlClient.MySqlDbType.Int32)
    //         .CommandText = "DELETE FROM Magodmis.NcPrograms WHERE NCid=@NCid;"
    //         .Connection.Open()
    //     End With

    //     With Me.Dgv_TaskPgm
    //         If .SelectedRows.Count = 0 Then
    //             MsgBox("Select Rows to Delete")
    //             Exit Sub
    //         End If
    //         Dim gr As DataGridViewRow
    //         For Each gr In .SelectedRows
    //             If gr.Cells("pstatus").Value <> "Created" Then
    //                 MsgBox("Cannot delete ProgramNo :" & gr.Cells("NcProgramNo").Value)
    //             Else
    //                 cmd.Parameters("@NCid").Value = gr.Cells("NcID").Value
    //                 cmd.CommandText = "DELETE FROM magodmis.ncprogram_partslist WHERE NCid=@NCid;"
    //                 cmd.ExecuteNonQuery()
    //                 cmd.CommandText = "DELETE FROM Magodmis.NcPrograms WHERE NCid=@NCid;"
    //                 cmd.ExecuteNonQuery()
    //             End If
    //         Next
    //     End With
    // Catch ex As Exception
    //     MsgBox(ex.Message)
    // Finally
    //     If cmd.Connection.State <> ConnectionState.Closed Then
    //         cmd.Connection.Close()
    //     End If
    //     NcProgramming1.NCProgramPartsList.Clear()
    //     NcProgramming1.TaskProgramList.Clear()
    //     DA_Ncpgm.Fill(NcProgramming1.TaskProgramList)
    //     DA_NcPgmParts.Fill(NcProgramming1.NCProgramPartsList)
    //     For Each part As magod.NCProgramming.Task_PartsListRow In NcProgramming1.Task_PartsList
    //         If IsDBNull(NcProgramming1.NCProgramPartsList.Compute("Sum([QtyNested])", String.Format("Task_Part_Id={0}", part.Task_Part_ID))) Then
    //             part.QtyNested = 0
    //         Else
    //             part.QtyNested = NcProgramming1.NCProgramPartsList.Compute("Sum([QtyNested])", String.Format("Task_Part_Id={0}", part.Task_Part_ID))
    //         End If
    //         'part.QtyNested = NcProgramming1.NCProgramPartsList.Compute("Sum([QtyNested])", String.Format("Task_Part_Id={0}", part.Task_Part_ID))
    //     Next
    //     For Each task As magod.NCProgramming.TaskListRow In NcProgramming1.TaskList
    //         If IsDBNull(NcProgramming1.Task_PartsList.Compute("Sum([QtyNested])", String.Format("NcTaskId={0}", task.NcTaskId))) Then
    //             task.PartsNested = 0
    //             task.DwgsNested = 0
    //         Else
    //             task.PartsNested = NcProgramming1.Task_PartsList.Compute("Sum([QtyNested])", String.Format("NcTaskId={0}", task.NcTaskId))
    //             task.DwgsNested = NcProgramming1.Task_PartsList.Compute("Count([NcTaskId])", String.Format("NcTaskId={0} AND [QtyNested]>0", task.NcTaskId))
    //         End If

    //         'part.QtyNested = NcProgramming1.NCProgramPartsList.Compute("Sum([QtyNested])", String.Format("Task_Part_Id={0}", part.Task_Part_ID))
    //     Next

    //     DA_TaskParts.Update(NcProgramming1.Task_PartsList)
    //     DA_Task.Update(NcProgramming1.TaskList)

    // End Try

    // End Sub


    ///////////////////////////////////////////////

    const btnSigmaNest = () => {

    }




    // NCTaskList end 


    const ScheduleDetails = async (id, bs_sch) => {
        console.log(bs_sch);
        setSelectedScheduleID(id);
        console.log(bs_sch);
        let schno = bs_sch["OrdSchNo"].substring(0, 6);
        setOrder_No(schno);
        setCustomerNm(bs_sch["cust_name"]);
        setCustCode(bs_sch["cust_Code"]);
        setOrdSchNo(bs_sch["OrdSchNo"]);
        setSchId(bs_sch["ScheduleID"]);
        //await postRequest(endpoints.getTaskScheduleDetails, { scheduleno: bs_sch["OrdSchNo"] }, (schDetails) => {
        await postRequest(endpoints.getTaskScheduleDetails, { scheduleid: bs_sch["ScheduleID"] }, (schDetails) => {
            console.log(schDetails);
            //   setSchId(schDetails.ScheduleId);
            setBS_taskList(schDetails);
            setNcTaskNo(schDetails[0].TaskNo)
            setNcMtrl_Code(schDetails[0].Mtrl_Code)
        });

        console.log("sending schedule id : " + bs_sch["ScheduleID"]);
        await postRequest(endpoints.getTaskProgramList, { scheduleid: bs_sch["ScheduleID"] }, async (programList) => {
            console.log(programList);
            setBS_programList(programList);
            console.log(BS_programList);

            await postRequest(endpoints.getNCTaskPartslist, { ncprogramnos: BS_programList }, async (taskparts) => {
                console.log(taskparts);
                setBS_TaskParts(taskparts);


                await postRequest(endpoints.getTaskMtrlList, { scheduleid: bs_sch["ScheduleID"] }, async (taskmtrlList) => {
                    console.log(taskmtrlList);
                    setBS_taskMtrlList(taskmtrlList);

                    //          console.log("sending nctaskid : " + BS_programList[0].NcTaskId)
                    // await postRequest(endpoints.getMtrlAvailability, { nctaskid: BS_programList[0].NcTaskId }, async (bs_mtrlavailable) => {
                    //     console.log(bs_mtrlavailable);
                    //     setBS_MtrlAvailability(bs_mtrlavailable);
                    // });

                });

            });
        });


    }

    const SelectedNCPrg = async (id, bs_programList) => {
        console.log(bs_programList);
        setSelectedPrgID(id);
        setNcProgramNo(bs_programList.NCProgramNo);
        // setNcTaskId(bs_programList[id].NCId);
        await postRequest(endpoints.getNCTaskPartslist, { ncprogramnos: bs_programList.NCProgramNo }, async (taskparts) => {
            console.log(taskparts);
            setBS_TaskParts(taskparts);
            setNcProgramNo(bs_programList.NCProgramNo);
            setNcPStatus(bs_programList.PStatus);
            setNcOperation(bs_programList.Operation);
            setNcMachine(bs_programList.Machine);
            setNcDwgs(bs_programList.NoOfDwgs);
            setNcCustMtrl(bs_programList.CustMtrl);
            setNcPara1(bs_programList.Para1);
            setNcPara2(bs_programList.Para2);
            setNcTaskNo(bs_programList.TaskNo);
            setNcMtrl_Code(bs_programList.Mtrl_Code);
            setNcQty(bs_programList.Qty);
            setNcPriority(bs_programList.Priority);
            setNcTotalParts(bs_programList.TotalParts);
            setNcEstimatedTime(bs_programList.EstimatedTime);
            setNcTotalLOC(bs_programList.TotalLOC);
            setNcTotalHoles(bs_programList.TotalHoles);
            setNcRemarks(bs_programList.Remarks);

            // let [ncmachine, ] = useState("");
            // let [ncdwgs, setNcDwgs] = useState("");
            // let [ncpara1, setNcPara1] = useState("");
            // let [ncpara2, setNcPara2] = useState("");
            // let [ncqty, setNcQty] = useState("");
            // let [nctotalparts, setNcTotalParts] = useState("");
            // let [ncestimatedtime, setNcEstimatedTime] = useState("");

            // let [nctotalloc, setNcTotalLOC] = useState("");
            // let [nctotalholes, setNcTotalHoles] = useState("");
            // let [ncremarks, setNcRemarks] = useState("");

        });
    }

    let selectedNCPrograms = async (bs_prglist, value) => {

        let selectedPrograms = [];
        if (value) {
            selectedPrograms.push(bs_prglist);
        } else {
            selectedPrograms = selectedPrograms.filter((item) => item !== bs_prglist);
        }
        //     let olddata = BS_programList[id];
        setBS_MaterialForIssue(selectedPrograms);
        console.log(selectedPrograms);

    }

    // Schedule List Tab - Table -1
    const renderScheduleList = (bs_sch, id) => {
        //      console.log(bs_sch);
        return (
            <tr style={{ backgroundColor: selectedScheduleID === id ? "#98A8F8" : "", cursor: "pointer" }} id={id} onClick={() => { ScheduleDetails(id, bs_sch) }}>
                <td hidden>{bs_sch.ScheduleId}</td>
                <td>{bs_sch.OrdSchNo}</td>
                <td style={{ textAlign: 'left' }}>{bs_sch.cust_name}</td>
                <td>{bs_sch.Schedule_Status}</td>
                <td>{moment(bs_sch.Delivery_Date).format("DD/MM/YYYY")}</td>
                <td>{bs_sch.Special_Instructions}</td>
            </tr>
        );
    }

    // Schedule List Tab - Table -2
    const renderTaskList = (bs_taskList, id) => {
        //     console.log(bs_taskList);

        // if //((bs_taskList.NoOfDwgs != bs_taskList.DwgsNested) || 
        //    // (( bs_taskList.PartsTasked != bs_taskList.PartsNested) || 
        //     (bs_taskList.QtyNested < bs_taskList.QtyToNest)  { 
        return (
            <tr style={{ backgroundColor: selectedTaskID === id ? "#98A8F8" : "", cursor: "pointer" }} id={id} onClick={() => { SchTaskList(id, bs_taskList) }}>
                {/* style={{ backgroundColor : "LightCoral" }}> */}
                <td>{bs_taskList.MProcess}</td>
                <td>{bs_taskList.Mtrl_Code}</td>
                <td>{bs_taskList.CustMtrl}</td>
                <td>{bs_taskList.Machine}</td>
                <td>{bs_taskList.NoOfDwgs}</td>
                <td>{bs_taskList.DwgsNested}</td>
                <td>{bs_taskList.TotalParts}</td>
                <td>{bs_taskList.PartsNested}</td>
                <td>{bs_taskList.Priority}</td>
                <td>{bs_taskList.TStatus}</td>
            </tr>
        )
    }

    // Schedule List Tab - Table -3
    const renderTaskProgramList = (bs_programList) => {
        console.log(bs_programList);
        return (
            <tr>
                {/* key={bs_programList.NCId}> */}
                <td>{bs_programList["NCProgramNo"]}</td>
                <td>{bs_programList["Machine"]}</td>
                <td>{bs_programList.MProcess}</td>
                <td>{bs_programList.Para1}</td>
                <td>{bs_programList.Para2}</td>
                <td>{bs_programList.Qty}</td>
                <td>{bs_programList.NoOfDwgs}</td>
                <td>{bs_programList.TotalParts}</td>
                <td>{bs_programList.Priority}</td>
                <td>{bs_programList.PStatus}</td>
                <td>{bs_programList.EstimatedTime}</td>
                <td>{bs_programList.TotalLOC}</td>
                <td>{bs_programList.TotalHoles}</td>
                <td>{bs_programList.Remarks}</td>
            </tr>
        );
    }

    const SchTaskList = (id, bs_taskList) => {
        console.log(bs_taskList);
        setSelectedTaskID(id);
        setTaskDwg(bs_taskList.NoOfDwgs);
        setDwgsNested(bs_taskList.DwgsNested);
        setMachine(bs_taskList.Machine);
        setTStatus(bs_taskList.TStatus);
        setTPriority(bs_taskList.Priority);
        setTaskParts(bs_taskList.TotalParts);
        setNestedParts(bs_taskList.PartsNested);
    }

    //Nc Task List Tab
    // const renderNCTaskList = (bs_taskList) => {
    const renderTaskMtrlAvailTable = (bs_taskmtrl) => {
        console.log(bs_taskmtrl)
        return (
            <tr key={bs_taskmtrl.id}>
                <td>{bs_taskmtrl.Length}</td>
                <td>{bs_taskmtrl.Width}</td>
                <td>{bs_taskmtrl.Quantity}</td>
            </tr>
        );

    }

    const renderNCTaskProgram = (bs_programList, id) => {
        console.log(bs_programList);
        return (
            <tr>
                {/* style={{ backgroundColor: selectedPrgID === id ? "#98A8F8" : "", cursor: "pointer" }} id={id} onClick={() => { SelectedNCPrg(id, bs_programList) }}> */}
                <td><input type="checkbox" id={id} onChange={(e) => { selectedNCPrograms(bs_programList, e.target.checked) }} /></td>
                <td>{bs_programList.NCProgramNo}</td>
                <td>{bs_programList.PStatus}</td>
                <td>{bs_programList.Machine}</td>
                <td>{bs_programList.NoOfDwgs}</td>
                <td>{bs_programList.Para1}</td>
                <td>{bs_programList.Para2}</td>
                <td>{bs_programList.Qty}</td>
                <td>{bs_programList.TotalParts}</td>
                <td>{bs_programList.EstimatedTime}</td>
                <td>{bs_programList.NetNestArea}</td>
                <td>{bs_programList.TotalLOC}</td>
                <td>{bs_programList.TotalHoles}</td>
                <td>{bs_programList.Remarks}</td>
            </tr>
        );
    }

    const renderNCTaskParts = (bs_taskparts) => {
        console.log(bs_taskparts);
        return (
            <tr>
                {/* key={bs_taskparts.id}> */}
                <td style={{ width: "200px", textAlign: 'left' }}>{bs_taskparts.DwgName}</td>
                <td>{bs_taskparts.QtyToNest}</td>
                <td>{bs_taskparts.QtyNested}</td>
                <td>{bs_taskparts.LOC}</td>
                <td>{bs_taskparts.Pierces}</td>
                <td>{bs_taskparts.Part_Area}</td>
                <td>{bs_taskparts.Unit_Wt}  </td>
                <td>{bs_taskparts.Task_Part_ID}</td>
                <td>{bs_taskparts.NcTaskId}</td>
                <td>{bs_taskparts.TaskNo}</td>
                <td>{bs_taskparts.SchDetailsId}</td>
                <td>{bs_taskparts.PartID}</td>
                {/* <td></td> */}
                {/* <td>{bs_taskparts.QtyToNest}</td>
                <td>{bs_taskparts.QtyNested}</td>

                <td>{bs_taskparts.Part_Area}</td> */}


                {/* <td>{bs_taskparts.Unit_Wt}</td> */}

                <td>{bs_taskparts.Remarks}</td>
                <td></td>
            </tr>
        );

    }

    const renderNCProgramDwgsList = (bs_taskparts) => {
        console.log(bs_taskparts);
        return (
            <tr>
                <td>{bs_taskparts.DwgName}</td>
                <td>{bs_taskparts.QtyNested}</td>
                <td>{bs_taskparts.TotQtyNested}</td>
            </tr>
        )
    }

    return (
        <div>
            <div className="col-md-12">
                <div className="row">
                    <h4 className="title">Programing Manager</h4>
                </div>
            </div>

            <div className='row mb-3'>

                <div className="col-md-12 col-sm-12" style={{ marginLeft: '0px' }}  >
                    <div className="ip-box  mt-2" >
                        <div className='row' >

                            <div className=" row col-md-4">
                                {/* <label className="form-label">Magod Laser Maching Pvt Ltd </label> */}
                                <label className="form-label">2D NC Programming Manager </label>
                            </div>
                            <div className='row col-md-8'>
                                {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} /> */}
                                <button className="button-style  group-button col-md-2" onClick={fnOrderDxf} >
                                    Order DXF
                                </button>

                                {/* <input type="file" onChange={handleFileChange} accept=".prs" ref={fileInputRef} style={{ display: 'none' }} /> */}
                                <button className="button-style  group- col-md-2" onClick={handleOpenCustPartsFolder}>
                                    Cust Parts
                                </button>

                                <button className="button-style  group-button col-md-2" onClick={btnSigmaNest}>
                                    Sigma Nest
                                </button>
                                <button className="button-style  group-button col-md-2"
                                    onClick={e => nav("/home")} >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <hr className="horizontal-line" />
            <div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 mt-1 tab_font">
                    {/* <ScheduleListForm /> */}
                    <Tab eventKey="scheduleList" title="Schedule List">
                        {/* <ScheduleListForm /> */}
                        <div>
                            {/* {
            <AllotProgramModal  setAllotProgram={setAllotProgram} allotProgram={allotProgram}/>
          } */}

                            <div className='row mb-2'>
                                <div className="col-md-12 col-sm-12"    >
                                    <div className="ip-box form-bg mt-1"   >
                                        <div className="  col-md-12">
                                            <h6> Schedule Manager</h6>

                                        </div>
                                        <div className='row mb-1' >
                                            <button className="button-style  group-button col-md-2" onClick={btnCreateDxfWS}>
                                                Create DXF WS
                                            </button>
                                            <button className="button-style  group- col-md-2">
                                                Create Part WS
                                            </button>

                                            <button className="button-style  group-button col-md-2" onClick={btnReadWs}>
                                                Update Schedule
                                            </button>
                                            <button className="button-style  group-button col-md-2" onClick={btn_pgmComplete}>
                                                Program Complete
                                            </button>
                                            <button className="button-style   group-button col-md-2" onClick={btnAllotPgmNo}>
                                                Allot Program
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-1 ">
                                    <label className="form-label ">Find</label>
                                </div>
                                <div className="col-md-3">
                                    <input type='search'></input>
                                </div>
                                <div className="col-md-3">
                                    <button className="button-style  group-button" onClick={btn_estTime}>Estimated Time</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6 mt-1  col-sm-12">
                                    <div className='mb-3' style={{ height: "500px", overflowX: "scroll", overflowY: "scroll", }}>
                                        <Table striped className="table-data border" >
                                            <thead className="tableHeaderBGColor">
                                                <tr>
                                                    <th style={{ whiteSpace: "nowrap" }}>Schedule No</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Customer</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Status</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Target Date</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Instructions</th>
                                                    {/* <th style={{ whiteSpace: "nowrap" }}>Status</th> */}
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {(BS_Schedule != null && BS_Schedule.length > 0) ? BS_Schedule.map((bs_sch, id) => renderScheduleList(bs_sch, id)) : ""}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="col-md-6 mt-1  col-sm-12">
                                    <div className="col-md-12 mt-1 mb-3 col-sm-12">
                                        <div style={{ height: "250px", overflowX: "scroll", overflowY: "scroll", }}>
                                            <Table striped className="table-data border" style={{ marginLeft: "5px", border: "1px" }}>
                                                <thead className="tableHeaderBGColor">
                                                    <tr>
                                                        <th style={{ whiteSpace: "nowrap" }}>Process</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Material</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Source</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Machine</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Task Drawings</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Drawings Nested</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Parts Tasked</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Parts Nested</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Priority</th>
                                                        <th style={{ whiteSpace: "nowrap" }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tablebody">
                                                    {(BS_taskList != null && BS_taskList.length > 0) ? BS_taskList.map((bs_taskList, id) => renderTaskList(bs_taskList, id)) : ""}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className='mb-3' style={{ height: "250px", overflowX: "scroll", overflowY: "scroll", }}>
                                        <Table striped className="table-data border" style={{
                                            marginLeft: "5px", border: "1px",
                                            overflowX: "scroll", overflowY: "scroll",
                                        }}>
                                            <thead className="tableHeaderBGColor">
                                                <tr>
                                                    <th style={{ whiteSpace: "nowrap" }}>Program No</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Machine</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>MProcess</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Para1</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Para2</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Qty</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Dwgs</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Parts</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Priority</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Status</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Time</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>LOC</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Pierces</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {(BS_programList != null && BS_programList.length > 0) ? BS_programList.map((bs_programList) => renderTaskProgramList(bs_programList)) : ""}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Tab>

                    <Tab eventKey="ncTaskList" title="NC Task List">
                        {/* <NcTaskForm /> */}
                        <div>
                            {
                                saveProgram &&
                                <ProgramSaveModal setSaveProgram={setSaveProgram} saveProgram={saveProgram} />
                            }
                            {/* {
                                <MaterialIssueModal setMaterialIssue={setMaterialIssue} materialIssue={materialIssue} />
                            } */}
                            {
                                <DeleteModal setDeleteData={setDeleteData} deleteData={deleteData} />
                            }
                            <div className=' row col-md-12 '>
                                <div className='row col-md-8 '>
                                    <div className="col-md-12 mt-1 mb-2 col-sm-12">
                                        {BS_taskList.length > 0 ?
                                            <label className="form-label">{BS_taskList[0].TaskNo} - {BS_taskList[0].Mtrl_Code} / {BS_taskList[0].MProcess} / {BS_taskList[0].CustMtrl}</label>
                                            : ""}
                                    </div>
                                    <div className=' row '>
                                        <div className=' col-md-2 '>
                                            <label className='form-label col-md-2  '>Drawings</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class="  " type="text" disabled value={taskDwg} />
                                        </div>
                                        <div className=' col-md-2 '>
                                            <label className='form-label col-md-2  '>Machine</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class=" " type="text" disabled value={machine} />
                                        </div>
                                    </div>
                                    <div className=' row mt-1'>
                                        <div className=' col-md-2 '>
                                            <label className='form-label col-md-2  '>Status</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class="" type="text" disabled value={tstatus} />
                                        </div>

                                        <div className='col-md-2'>
                                            <label className='form-label col-md-2  '>Nested</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class="" type="text" disabled value={dwgsNested} />
                                        </div>
                                    </div>
                                    <div className=' row mt-1'>
                                        <div className='col-md-2'>
                                            <label className='form-label col-md-2  '>Priority</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class=" " type="text" disabled value={tpriority} />
                                        </div>
                                        <div className='col-md-2'>
                                            <label className='form-label col-md-3  '>Parts</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class="" type="text" disabled value={taskparts} />
                                        </div>
                                    </div>
                                    <div className=' row mt-1'>
                                        <div className=' col-md-2'>
                                            <label className='form-label col-md-2  '>Nested</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            <input class=" " type="text" disabled value={nestedparts} />
                                        </div>
                                        <div className='col-md-2 '>
                                            <label className='form-label col-md-2'>Select</label>
                                        </div>
                                        <div className=' col-md-4 '>
                                            {machinedata.length > 0 ? (
                                                <Typeahead
                                                    id="selected-machine"
                                                    // id={material}
                                                    labelKey="MachineID"
                                                    onChange={selectMachine}
                                                    options={machinedata}
                                                    placeholder="Choose a Machine...">
                                                </Typeahead>
                                            ) : (
                                                ""
                                            )}
                                            {/* 

                                            ABCD
                                            <select className="ip-select ">
                                                <option value="option 1"> Laser2</option>
                                                <option value="option 2">Name2</option>
                                                <option value="option 3">Name3</option>
                                            </select> */}
                                        </div>
                                    </div>

                                    <div className='row mt-2'>
                                        <button className="button-style  group-button col-md-2 " onClick={saveSubmit} >Save</button>
                                        <button className="button-style  group- col-md-2" onClick={materialpopup} >Material</button>
                                        <button className="button-style  group-button col-md-2" onClick={deleteSubmit}>
                                            Delete
                                        </button>
                                        <button className="button-style  group- col-md-4 " onClick={materialIssueSubmit}>
                                            Send To Material Issue
                                        </button>
                                    </div>
                                </div >

                                <div className=' row col-md-4'>
                                    <div style={{ overflowX: "scroll", overflowY: "scroll", }}>
                                        <Table striped className="table-data border" >
                                            <thead className="tableHeaderBGColor">
                                                <tr>
                                                    <th style={{ whiteSpace: "nowrap" }}>Length</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Width</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">

                                                {(BS_taskMtrlList != null && BS_taskMtrlList.length > 0) ? BS_taskMtrlList.map((bs_taskmtrl) => renderTaskMtrlAvailTable(bs_taskmtrl)) : ""}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                            </div>
                            {/* <NCTaskTwoTabs /> */}

                            <div>
                                <Tabs id="controlled-tab-example" activeKey={key1} onSelect={(k) => setKey1(k)} className="mb-3 mt-2 tab_font">
                                    <Tab eventKey="programs" title="Programs">
                                        {/* <ProgramsTable /> */}

                                        <div>
                                            <div style={{ height: '350px', overflowX: "scroll", overflowY: "scroll", }} >
                                                <Table striped className="table-data border">
                                                    <thead className="tableHeaderBGColor">
                                                        <tr>
                                                            <th style={{ whiteSpace: "nowrap" }}>Select</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Nc Program No</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Status</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Machine</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Dwgs</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>NestX</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>NestY</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Qty</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Parts</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Time</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Net Area</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>LOC</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Pierces</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="tablebody">
                                                        {(BS_programList != null && BS_programList.length > 0) ? BS_programList.map((bs_programList, id) => renderNCTaskProgram(bs_programList, id)) : ""}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="parts" title="Parts">
                                        {/* <PartsTabTable /> */}

                                        <div>
                                            <div className='mb-3' style={{ height: '250px', overflowX: "scroll", overflowY: "scroll", }}>
                                                <Table striped className="table-data border">
                                                    <thead className="tableHeaderBGColor">
                                                        <tr>
                                                            <th style={{ whiteSpace: "nowrap", width: "200px" }}>Drawing</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>To Nest</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Nested</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>LOC</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Piercers</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Parts Area</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Unit Wt</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Task_Part_Id</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Nc Task Id</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>SchDetailsId</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>PartId</th>

                                                            {/* <th style={{ whiteSpace: "nowrap" }}>Dwg Name</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Qty To Nest</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Qty Nested</th> */}
                                                            <th style={{ whiteSpace: "nowrap" }}>Remarks</th>
                                                            {/* <th style={{ whiteSpace: "nowrap" }}>LOC</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Pierces</th> */}

                                                            {/* <th style={{ whiteSpace: "nowrap" }}>Part_Area</th>
                                                            <th style={{ whiteSpace: "nowrap" }}>Unit_Wt</th> */}
                                                            <th style={{ whiteSpace: "nowrap" }}>Qtn Detail Id</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="tablebody">
                                                        {(BS_taskparts != null && BS_taskparts.length > 0) ? BS_taskparts.map((bs_taskparts) => renderNCTaskParts(bs_taskparts)) : ""}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </Tab>


                                </Tabs>
                            </div>


                        </div>
                    </Tab>

                    <Tab eventKey="ncPrograms" title="NC Programs">
                        {/* <NcProgramsForm /> */}

                        <div>
                            <div className=' row col-md-12 '>
                                <div className='row '>

                                    <div className='col-md-1 '>
                                        <label className='form-label col-md-3 ' style={{ whiteSpace: 'nowrap' }}>Program No</label>
                                    </div>
                                    <div className='col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={ncprogramno} />
                                    </div>

                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '>Process</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncoperation} />
                                    </div>
                                    <div className=' col-md-1'>
                                        <label className='form-label col-md-3  '>LOC</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={nctotalloc} />
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '>Priority</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncpriority} />
                                    </div>

                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Task No</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={nctaskno} />
                                    </div>
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Mtrl Source</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={nccustmtrl} />
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '>Pierces</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={nctotalholes} />
                                    </div>

                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '  >Status</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncpstatus} />
                                    </div>
                                    <div className=' col-md-1'>
                                        <label className='form-label col-md-3  '  >Machine</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={ncmachine} />
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '>Para1</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncpara1} />
                                    </div>

                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Est. Time</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={ncestimatedtime} />
                                    </div>

                                    <div className='col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Material </label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncmtrl_code} />
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  '>Para2</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={ncpara2} />
                                    </div>

                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Dwgs</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={ncdwgs} />
                                    </div>
                                    {/* <div className='col-md-4 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Machine </label>
                                        <input class="  " type="text" placeholder=" " />
                                    </div> */}
                                    <div className=' col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Sheets</label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class=" " type="text" placeholder=" " value={ncqty} />
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className='col-md-1 '>
                                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Parts </label>
                                    </div>
                                    <div className=' col-md-3 '>
                                        <input class="  " type="text" placeholder=" " value={nctotalparts} />
                                    </div>

                                    <div className=" col-md-1">
                                        <label className="form-label">Remarks</label>
                                    </div>
                                    <div className=" col-md-7">
                                        <textarea className="form-control sticky-top" rows='1' id=" " style={{ height: '60px', resize: 'none' }} value={ncremarks}></textarea>
                                    </div>

                                </div >
                                <div className=' row col-md-12 mt-2'>
                                    <div style={{ height: '350px', overflowX: "scroll", overflowY: "scroll", }}>
                                        <Table striped className="table-data border">
                                            <thead className="tableHeaderBGColor">
                                                <tr>
                                                    <th style={{ whiteSpace: "nowrap" }}>Dwg Name</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>Qty Nested</th>
                                                    <th style={{ whiteSpace: "nowrap" }}>TotQtyNested</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {(BS_taskparts != null && BS_taskparts.length > 0) ? BS_taskparts.map((bs_taskparts) => renderNCProgramDwgsList(bs_taskparts)) : ""}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>

            {/* Displaying Dxf Files from respective folder on Click of Order Dxf Button */}
            <div className="row">
                <Modal show={dxfFolderShow}>
                    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
                        <Modal.Title style={{ fontFamily: 'Roboto', fontSize: '18px' }}>Drawing Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ol style={{ padding: '0px 0px 0px 10px', fontFamily: 'Roboto', fontSize: '12px' }}>
                                {BS_dxfFilesList.length > 0 ? BS_dxfFilesList.map(files => (
                                    <li>{files}</li>
                                ))
                                    : "No Folder or Files Found"}

                            </ol>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button onClick={handleCloseDwgFolder} className="button-style " style={{ width: "120px" }}>Close</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal >

            </div>

            {/* Material Issue Modal -> Send To Material Issue Button Click */}

            <div>
                <Modal show={materialIssuemodal} onHide={handleClose}>

                    <Modal.Header >

                        <Modal.Title>magod_NC_Sigma_Programmer</Modal.Title>

                    </Modal.Header>

                    <Modal.Body> Enter Time For: 38841  0 for Material  Issue
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="primary" onClick={materialIssueClose}> Ok </button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Task Material Allotment Form - > On Click of Material Button */}

            <div>
                <Modal show={taskmaterialallotment} style={{ width: '700px' }}>
                    {/* // onHide={handleClose}  > */}

                    <Modal.Header >

                        <Modal.Title>Task Material Allotment Form</Modal.Title>

                    </Modal.Header>

                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Task No</label>
                                {/* </div>
                            <div className='col-md-5'> */}
                                <input type='text' className='form-control' value={nctaskno} />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Material</label>
                                {/* </div>
                            <div className='col-md-5'> */}
                                <input type='text' className='form-control' value={ncmtrl_code} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Available</label>
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Alloted</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <Table striped className="table-data border">
                                    <thead className="tableHeaderBGColor">
                                        <tr>
                                            <th style={{ whiteSpace: "nowrap" }}>Length</th>
                                            <th style={{ whiteSpace: "nowrap" }}>Width</th>
                                            <th style={{ whiteSpace: "nowrap" }}>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tablebody">
                                        {(BS_taskMtrlList != null && BS_taskMtrlList.length > 0) ? BS_taskMtrlList.map((bs_taskmtrl) => renderTaskMtrlAvailTable(bs_taskmtrl)) : ""}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='col-md-6'>
                                <Table striped className="table-data border">
                                    <thead className="tableHeaderBGColor">
                                        <tr>
                                            <th style={{ whiteSpace: "nowrap" }}>Length</th>
                                            <th style={{ whiteSpace: "nowrap" }}>Width</th>
                                            <th style={{ whiteSpace: "nowrap" }}>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tablebody">
                                        {/* {(BS_taskMtrlList != null && BS_taskMtrlList.length > 0) ? BS_taskMtrlList.map((bs_taskmtrl) => renderTaskMtrlAvailTable(bs_taskmtrl)) : ""} */}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="primary" > Save </button>
                        <button variant="primary" onClick={addStock} > Add </button>
                        <button variant="primary" onClick={materialpopupclose} > Close </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                {/* handleAddStock */}
                <Modal show={handleAddStock} onHide={handleClose}>

                    <Modal.Header >

                        <Modal.Title>magod_NC_Sigma_Programmer</Modal.Title>

                    </Modal.Header>

                    <Modal.Body> Enter Time For: 38841  0 for Material  Issue
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="primary" onClick={materialIssueClose}> Ok </button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>

    );
}
