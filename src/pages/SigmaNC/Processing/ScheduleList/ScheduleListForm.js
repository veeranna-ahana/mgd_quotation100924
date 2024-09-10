import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
//import AllotProgramModal from './AllotProgramModal';
const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");


export default function ScheduleListForm() {
  //const[allotProgram, setAllotProgram]=useState(false);

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let [estData, setEstData] = useState([]);
//  let [quotationNo, setQuotationNo] = useState("");
  let [SigmaID, setSigmaID] = useState(0);
  let [SchId, setSchId] = useState(0);
  let [schstatus, setSchStatus] = useState(searchParams.get("schstatus"));

  const [BS_Schedule, setBS_Schedule] = useState([]);
  const [BS_taskList, setBS_taskList] = useState([]);
  const [BS_programList, setBS_programList] = useState([]);
  const [BS_taskMtrlList, setBS_taskMtrlList] = useState([]);

  let [selectedScheduleID, setSelectedScheduleID] = useState("");
  let [ordschno, setOrdSchNo] = useState(0);
  let [order_No, setOrder_No] = useState(0);
  let [customernm, setCustomerNm] = useState("");
  let [cust_code, setCustCode] = useState("");

  console.log(searchParams.get("schstatus"));
  useEffect(() => {
    async function fetchData() {
      await postRequest(endpoints.getScheduleList, { schStatus: searchParams.get("schstatus") }, (bs_schedule) => {
        console.log(bs_schedule);
        setBS_Schedule(bs_schedule);
      });
    }
    fetchData();
  }, []);



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

  //   Private Function updateSchPara_New() As Boolean
  // Private Function updateSchPara_New() As Boolean
  // Try

  //     '****** Check If NagodSigma isloaded
  //     If checkMagodSigma() Then
  //         Ms.WSPath = WsPath
  //         ' Read the WS and Store data in tables
  //         Ms.ReadSigmaWS()
  //     Else
  //         MsgBox("Try Again")
  //     End If


  // Catch ex As Exception
  //     MsgBox(ex.Message)
  // End Try
  // Try
  //     '***** for Each Part in TaskPartTable
  //     For Each SigmaTask As magod.SigmaNest.SigmaNestData.TaskListRow In Ms.getData.TaskList.Rows
  //         'Console.WriteLine(String.Format("TaskId={0} ******** ", SigmaTask.TaskId))
  //         Dim task As magod.NCProgramming.TaskListRow = NcProgramming1.TaskList.FindByNcTaskId(SigmaTask.TaskId)
  //         If Not task Is Nothing Then
  //             task.TotalLOC = SigmaTask.TaskLOC
  //             task.TotalHoles = SigmaTask.TaskPierces
  //             task.NestCount = SigmaTask.NestCount
  //             task.NoOfSheets = SigmaTask.TaskSheetCount
  //             task.DwgsNested = SigmaTask.TaskDwgs
  //             task.PartsNested = SigmaTask.PartsNested
  //             task.TaskNetArea = SigmaTask.TaskNetArea
  //             task.TaskMtrlArea = SigmaTask.TaskMtrlArea
  //         End If

  //         For Each snTaskNest As magod.SigmaNest.SigmaNestData.TaskNestsRow In Ms.getData.TaskNests.Rows
  //             If snTaskNest.NCId <> 0 Then ' **** it has alreddy been saved
  //                 Dim nest As magod.NCProgramming.TaskProgramListRow = NcProgramming1.TaskProgramList.FindByNcid(snTaskNest.NCId)
  //                 With snTaskNest
  //                     nest.TotalLOC = .NestLOC
  //                     nest.TotalHoles = .NestPierces
  //                     nest.NoOfDwgs = .DwgsInNest
  //                     nest.TotalParts = .PartsInNest
  //                     nest.Machine = .Machine
  //                     nest.Para1 = .NestX
  //                     nest.Para2 = .NestY
  //                     nest.NCProgramNo = .NcProgramNo
  //                     nest.Qty = .NoOfSheets
  //                     nest.Machine = .Machine
  //                     MsgBox(String.Format("Sheet Size {0} X {1} : Parts {2}", nest.Para1, nest.Para2, nest.TotalParts))
  //                 End With

  //             End If
  //         Next

  //         For Each part As magod.SigmaNest.SigmaNestData.TaskPartsRow
  //             In Ms.getData.TaskParts.Select(String.Format("TaskId={0}", SigmaTask.TaskId))

  //             Dim taskPart As magod.NCProgramming.Task_PartsListRow = NcProgramming1.Task_PartsList.FindByTask_Part_ID(part.PartMagodUid)
  //             If Not taskPart Is Nothing Then
  //                 taskPart.QtyNested = part.QtyNested
  //                 taskPart.LOC = part.PartLOC
  //                 taskPart.Pierces = part.PartPierces
  //                 taskPart.Part_Area = part.NetArea
  //             End If

  //         Next

  //     Next
  //     setTaskWeight()

  //     DA_Task.Update(NcProgramming1.TaskList)
  //     DA_Ncpgm.Update(NcProgramming1.TaskProgramList)
  //     DA_TaskParts.Update(NcProgramming1.Task_PartsList)
  //     DA_SchDetails.Update(NcProgramming1.orderscheduledetails)
  //     Return True


  // Catch ex As Exception
  //     MsgBox("Error updating Part Parameters")
  // End Try
  // End Function
  ////////////////////////////////


  const btnCreateDxfWS = () => {
    postRequest(endpoints.getCreateDxfWS, { ordNo: order_No,cust:customernm, doctype: "Order", btntype: "C" }, (crdxfwsdata) => {
      console.log(crdxfwsdata)
      console.log(crdxfwsdata.length);
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
    //BS_TaskPgmList.EndEdit()
    //  DA_Ncpgm.Update(NcProgramming1.TaskProgramList)

    // if((BS_schedule != null) || (BS_schedule.Current != null)) {
    //     let result = Aggregate pgm In NcProgramming1.TaskProgramList Into Count(pgm.IsNCProgramNoNull OrElse pgm.EstimatedTime = 0)
    //     If result > 0 Then
    //         '**** All programs for the Schedule are not allotted program no and time not recorded
    //         MsgBox("Either Program No Not allotted to all programs Or estimated time not entered")
    //         Exit Sub
    //     Else
    //         Dim totalTime = Aggregate pgm In NcProgramming1.TaskProgramList Into Sum(pgm.EstimatedTime)
    //         Dim msg = String.Format("Estimated Cutting Time for {0} :-  {1}", BS_schedule.Current.item("OrdSchNo"), magod.Util.util.getTimeInHours(totalTime))
    //         MsgBox(msg, MsgBoxStyle.Information, "Schedule Estimated Time")
    //     End If

    // }
  }

  const ScheduleDetails = async (id, bs_sch) => {
    console.log(bs_sch);
    setSelectedScheduleID(id);
    console.log("ScheduleDeatails : " + bs_sch["id"]);
    console.log(bs_sch[id]);
    setOrder_No(bs_sch["Order_No"]);
    setCustomerNm(bs_sch["cust_name"]);
    setCustCode(bs_sch["cust_Code"]);
    setOrdSchNo(bs_sch["OrdSchNo"]);
    setSchId(bs_sch["ScheduleID"]);
    await postRequest(endpoints.getTaskScheduleDetails, { scheduleid: bs_sch["ScheduleID"] }, (schDetails) => {
      console.log(schDetails);
      //   setSchId(schDetails.ScheduleId);
      setBS_taskList(schDetails);
    });

    // await postRequest(endpoints.getTaskMtrlList, { scheduleid: bs_sch["ScheduleID"] }, (taskmtrlList) => {
    //   console.log(taskmtrlList);
    //   setBS_taskMtrlList(taskmtrlList);

    //   // Send this taskmtrlList to NcTaskForm.js

    // });
   
    await postRequest(endpoints.getTaskProgramList, { scheduleid: bs_sch["ScheduleID"] }, (programList) => {
      console.log(programList);
      setBS_programList(programList);
    });
  }

  const renderScheduleList = (bs_sch, id) => {
    console.log(bs_sch);
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

  const renderTaskList = (bs_taskList) => {
    console.log(bs_taskList);
 
    // if //((bs_taskList.NoOfDwgs != bs_taskList.DwgsNested) || 
    //    // (( bs_taskList.PartsTasked != bs_taskList.PartsNested) || 
    //     (bs_taskList.QtyNested < bs_taskList.QtyToNest)  { 
      return (
        <tr key={bs_taskList.TaskId}> 
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
    //  } else if(bs_taskList.QtyNested == bs_taskList.QtyToNest) {
    //   return (
    //     <tr key={bs_taskList.TaskId} style={{ backgroundColor : "LightGreen" }}>
    //     <td>{bs_taskList.MProcess}</td>
    //     <td>{bs_taskList.Mtrl_Code}</td>
    //     <td>{bs_taskList.CustMtrl}</td>
    //     <td>{bs_taskList.Machine}</td>
    //     <td>{bs_taskList.NoOfDwgs}</td>
    //     <td>{bs_taskList.DwgsNested}</td>
    //     <td>{bs_taskList.TotalParts}</td>
    //     <td>{bs_taskList.PartsNested}</td>
    //     <td>{bs_taskList.Priority}</td>
    //     <td>{bs_taskList.TStatus}</td>
    //   </tr>
    //   )
    //  } else {
    //   return (
    //     <tr key={bs_taskList.TaskId} style={{ backgroundColor : "Coral" }}>
    //     <td>{bs_taskList.MProcess}</td>
    //     <td>{bs_taskList.Mtrl_Code}</td>
    //     <td>{bs_taskList.CustMtrl}</td>
    //     <td>{bs_taskList.Machine}</td>
    //     <td>{bs_taskList.NoOfDwgs}</td>
    //     <td>{bs_taskList.DwgsNested}</td>
    //     <td>{bs_taskList.TotalParts}</td>
    //     <td>{bs_taskList.PartsNested}</td>
    //     <td>{bs_taskList.Priority}</td>
    //     <td>{bs_taskList.TStatus}</td>
    //   </tr>
    //   )
   //  }
  //   if (bs_taskList.QtyNested == bs_taskList.QtyToNest){parts1 = true;}
  //   else if(bs_taskList.QtyNested < bs_taskList.QtyToNest){parts2 = true;}
  //   else {parts3 = true;}
  //   return (
  //     //  <tr key={bs_taskList.TaskId} style={{ backgroundColor : dwgs = true ? "LightCoral" : parts1 = true ? "LightGreen" : parts2 = true ? "LightCoral" : "Coral" }}>
  //     <tr key={bs_taskList.TaskId} style={{ backgroundColor : parts1 = true ? "LightGreen" : parts2 = true ? "LightCoral" : "Coral" }}>
  //       <td>{bs_taskList.MProcess}</td>
  //       <td>{bs_taskList.Mtrl_Code}</td>
  //       <td>{bs_taskList.CustMtrl}</td>
  //       <td>{bs_taskList.Machine}</td>
  //       <td>{bs_taskList.NoOfDwgs}</td>
  //       <td>{bs_taskList.DwgsNested}</td>
  //       <td>{bs_taskList.TotalParts}</td>
  //       <td>{bs_taskList.PartsNested}</td>
  //       <td>{bs_taskList.Priority}</td>
  //       <td>{bs_taskList.TStatus}</td>
  //     </tr>
  //   );
 //  }

  const renderTaskProgramList = (bs_programList) => {
    console.log(bs_programList);
    return (
      <tr key={bs_programList.NCId}>
        <td>{bs_programList.NCProgramNo}</td>
        <td>{bs_programList.Machine}</td>
        <td>{bs_programList.MProcess}</td>
        <td>{bs_programList.Para1}</td>
        <td>{bs_programList.Para2}</td>
        <td>{bs_programList.Qty}</td>
        <td>{bs_programList.Dwgs}</td>
        <td>{bs_programList.Parts}</td>
        <td>{bs_programList.Priority}</td>
        <td>{bs_programList.Status}</td>
        <td>{bs_programList.Time}</td>
        <td>{bs_programList.LOC}</td>
        <td>{bs_programList.Pierces}</td>
        <td>{bs_programList.Remarks}</td>
      </tr>
    );
  }

  return (
    <div>
      {/* {
            <AllotProgramModal  setAllotProgram={setAllotProgram} allotProgram={allotProgram}/>
          } */}

      <div className='row mb-3'>
        <div className="col-md-12 col-sm-12"    >
          <div className="ip-box form-bg mt-2"   >

            <div className="  col-md-12">

              <h5> Schedule Manager</h5>

            </div>
            <div className='row mb-3' >
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
              <button className="button-style   group-button col-md-2"
                onClick={btnAllotPgmNo}
              >
                Allot Program
              </button>


            </div>
          </div>
        </div>
      </div>



      <div className='row mt-1'>

        <div className="col-md-3 ">
          <label className="form-label ">Find</label>
          <input type='search'></input>
        </div>

        <div className="col-md-3">
          <button className="button-style mt-2 group-button" onClick={btn_estTime}
          >Estimated Time
          </button>
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

          <div className="col-md-12 mt-1  col-sm-12">
            <div
              style={{ height: "250px", overflowX: "scroll", overflowY: "scroll", }}>
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
                  {(BS_taskList != null && BS_taskList.length > 0) ? BS_taskList.map((bs_taskList) => renderTaskList(bs_taskList)) : ""}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='mb-3' tyle={{ height: "250px", overflowX: "scroll", overflowY: "scroll", }}>
            <Table striped className="table-data border" style={{ marginLeft: "5px", border: "1px" }}>
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
  );
}
