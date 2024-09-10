import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import TaskRateModal from './TaskRateModal';
import { useQuotationContext } from "../../../../../../../context/QuotationContext";

const { getRequest, postRequest } = require("../../../../../../api/apiinstance");
const { endpoints } = require("../../../../../../api/constants");

export default function TaskList() {

  let { quotation, setQuotationState } = useQuotationContext();
  
  let [qtnProfileData, setQtnProfileData] = useState([]);
  let [tasklistdata, setTasklistdata] = useState([]);

  let [nooftasks, setNoOfTasks] = useState("");
  let [taskloc, setTaskLOC] = useState("");
  let [pierces, setPierces] = useState("");
  let [taskNetWt, setTaskNetWt] = useState("");
  let [taskareawightdata, setTaskAreaWightData] = useState([]);
  let [dwgsnested, setDwgsNested] = useState("");
  let [dwgstonest, setDwgsToNest] = useState("");
  let [partsnested, setPartsNested] = useState("");
  let [partstonest, setPartsToNest] = useState("");
  let [quotationNo, setQuotationNo] = useState("");
  
  let [tasklstdata, setTaskLstData] = useState([]);
  let [taskno, setTaskNo] = useState("");
  let [operation, setOperation] = useState("");
  let [thickness, setThickness] = useState("");
  let [tolerance, setTolerance] = useState("");
  let [inspectionlevel, setInspectionLevel] = useState("");
  let [nestcount, setNestCount] = useState("");


  const createTask = () => {

    console.log("Create Tasks");
    console.log(qtnProfileData);
    let groups = qtnProfileData.reduce((r, qtnProfileObject) => {
      r[qtnProfileObject.materialcode] = [...r[qtnProfileObject.materialcode] || [], qtnProfileObject];
      return r;
    }, {});

    console.log(groups);
    for (let key in groups) {
      for (let i = 0; i < groups[key].length; i++) {
        groups[key][i].taskno = Object.keys(groups).indexOf(key) + 1;
      }
    }
    console.log("Groups Created")
    let i = 1;
    let sumqty = {};
    let taskNetAra = {};
    let taskNtWt = {};

    for (let key in groups) {
      for (let j = 0; j < groups[key].length; j++) {

        if (sumqty[key] == undefined || sumqty[key] == null) {
          sumqty[key] = parseInt(groups[key][j].quantity);
          taskNetAra[key] = (parseInt(groups[key][j].quantity) * parseFloat(groups[key][j].partNetArea));
          taskNtWt[key] = (parseInt(groups[key][j].quantity) * parseFloat(groups[key][j].partNetWeight));
        } else {
          sumqty[key] += parseInt(groups[key][j].quantity);
          taskNetAra[key] += (parseInt(groups[key][j].quantity) * parseFloat(groups[key][j].partNetArea));
          taskNtWt[key] += (parseInt(groups[key][j].quantity) * parseFloat(groups[key][j].partNetWeight));
        }

      }
      groups[key].SumOfQty = sumqty[key];
      groups[key].TaskNetArea = taskNetAra[key];
      groups[key].TaskNetWt = taskNtWt[key];

    }

    console.log("Group wise Summed Qty and Areas")

    setTasklistdata(groups);
    setNoOfTasks(Object.keys(groups).length);

    console.log("Sending Data to QtnTask List Details")
    //Save Profile TaskList Details      materialcode
    postRequest(endpoints.saveQtnTaskListDetails, {
      quotationNo: quotationNo, tasklistdata: groups
      //, tskdwgs: dwgstonest, tskloc: parseFloat(taskloc),
      // tskholes: pierces, tsknetarea: parseFloat(taskNetArea) //, tskbasiccutcost : Task_Basic_Cutting_Cost
    }, (data) => {
      console.log("QtnTaskList Data Saved");
      console.log(data);
    });

    console.log("Sending Data to Task Details")
    //Save Task Details
    postRequest(endpoints.saveTaskDetails, { quotationNo: quotationNo }, (data) => {
      console.log("Task details Data Saved");
      console.log(data);
    });


    toast.success("Quotation Saved", {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  // Task No Selected after create task

  let taskselector = (tasklist, id) => {
    console.log("Task Selector");
    console.log(tasklist);
    setTaskLstData(tasklist);
    setTaskNo(id);
    setOperation(tasklist[0]["operation"]);
    setThickness(tasklist[0]["thickness"]);
    setTolerance(tasklist[0]["tolerance"]);
    setInspectionLevel(tasklist[0]["inspectionlevel"]);

    console.log(tasklist);
    // console.log(tasklist["SumOfQty"]);
    // console.log("piereces  : " + pierces)

    let taskNetArea = 0;
    let taskRectArea = 0;
    let taskNetWeight = 0;
    let taskRectWeight = 0;

    let taskLOC = 0;
    let taskNoofPierces = 0;

    for (let i = 0; i < tasklist.length; i++) {
      taskNetArea = taskNetArea + parseFloat(tasklist[i]["partNetArea"]);
      taskRectArea = taskRectArea + parseFloat(tasklist[i]["rectArea"]);
      taskNetWeight = taskNetWeight + parseFloat(tasklist[i]["partNetWeight"]);
      taskRectWeight = taskRectWeight + parseFloat(tasklist[i]["rectWeight"]);
      // Task_Mtrl_Weight = Task_Mtrl_Weight 
      taskLOC = taskLOC + parseFloat(tasklist[i]["lengthOfCut"]);
      taskNoofPierces = taskNoofPierces + parseFloat(tasklist[i]["noOfPierces"]);
    }
    setNestCount("0");
    setDwgsNested(tasklist.length);
    setDwgsToNest(tasklist.length);
    setPartsNested(parseInt(tasklist["SumOfQty"]));
    setPartsToNest(tasklist.length);
    setTaskLOC(parseFloat(taskLOC) * parseInt(tasklist["SumOfQty"]));
    setPierces(parseInt(taskNoofPierces) * parseInt(tasklist["SumOfQty"]));
    // settaskpierces(taskpierces * taskLstData[0])

    setTaskAreaWightData([
      {
        type: "Net",
        area: taskNetArea.toFixed(2),
        weight: taskNetWeight.toFixed(2),
      },
      {
        type: "Rect",
        area: taskRectArea.toFixed(2),
        weight: taskRectWeight.toFixed(2),
      },
      {
        type: "Nested",
        area: taskNetArea.toFixed(2), //  "0.00",
        weight: taskNetWt.toFixed(2), //"0.00",
      }
    ])

    postRequest(endpoints.SaveQtnDetails, { qtnId: quotation.quotationNo }, (qtndetdata) => {

    })
  }


  const onClickGetEstimator = () => {
    console.log("Button Clicked")
  }

  const [openTaskRate, setOpenTaskRate] = useState('')
  const onClickSetTaskRate = () => {
    setOpenTaskRate(true);
  }

  const onClickPrintEstimate = () => {

  }

  return (
    <div className='row' style={{ overflowY: "scroll" }}>
      <ToastContainer />
      <TaskRateModal openTaskRate={openTaskRate}
        setOpenTaskRate={setOpenTaskRate} />
      {/* col-1 */}
      <div className='col-md-12'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='row'>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='row'>
              <Table striped className="table-data border" style={{ marginLeft: "-30px" }}>
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>Task No</th>
                    {/* <th>Drawing/PartName</th>
                        <th>Operation</th> */}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(tasklistdata).map((tasklist, id) => {
                    return (
                      <tr>
                        <td style={{ backgroundColor: '#5f99f5' }} onClick={() => { taskselector(tasklistdata[tasklist], id) }}>{id + 1}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='row ms-5'>
              <div className='row ms-5'>
                <div className="col-md-12 ms-4">
                  <label className="">Per ms Rates</label>
                  <input style={{ marginTop: "-5px" }} />
                </div>
              </div>
              <div className='row ms-5'>
                <div className="col-md-12 ms-4">
                  <label className="" style={{ whiteSpace: "nowrap" }}>Per Kg Rates</label>
                  <input style={{ marginTop: "-5px" }} />
                </div>
              </div>
              <div className='row ms-5'>
                <div className="col-md-12 ms-4">
                  <label className="">Utilisation %</label>
                  <input style={{ marginTop: "-5px" }} />
                </div>
              </div>
              <div className='row ms-5'>
                <div className="col-md-12 ms-4">
                  <label className="" style={{ whiteSpace: "nowrap" }}>Scrap %</label>
                  <input style={{ marginTop: "-5px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COL-2 */}
      <div className='col-md-12 mt-4'>
        <div className='row'>

          {/*  */}

          <div className='col-md-4 mt-4' style={{ marginLeft: "-50px" }}>
            <div className='row'>
              <div className='row'>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="">Nest Count</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="" style={{ whiteSpace: "nowrap" }}>Dwgs to Nested</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="">Dwgs Nested</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="" style={{ whiteSpace: "nowrap" }}>Parts to Nested</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="">Task LOC</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <label className="">Places</label>
                    <input style={{ marginTop: "-5px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className='col-md-4 mt-4'>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div >
                  <label className='mt-2' style={{ whiteSpace: "nowrap" }}>Job Work</label><br />
                  <label className='mt-2'>Material</label>
                </div>
                <div>
                </div>
                <div className='col-md-4 ' style={{ width: "100px", marginTop: "-30px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ width: "300px" }}>
                      <h8 className='mt-2'>Value</h8>
                      <input className='mt-2'></input>
                      <input></input>
                    </div>
                    <div style={{ width: "300px" }}>
                      <h8 className='mt-2'>Taret</h8>
                      <input className='mt-2'></input>
                      <input></input>
                    </div>
                  </div>

                </div>
              </div>
              <div>
                <button
                  className="button-style group-button"
                  style={{ width: "120px", marginTop: "-5px" }}
                >
                  Recalculation
                </button>
                <button
                  className="button-style  group-button"
                  style={{ width: "120px" }}
                >
                  Recalculation
                </button>
              </div>
            </div>
            <div
              className=" col-md -3 mt-4  mb-2"
            >
              <h8>
                <b>Recalc Scheme</b>
              </h8>
              <div style={{ display: "flex" }}>
                <div
                  className="col-md-12 mt-1"
                  style={{ display: "flex", gap: "25px" }}
                >
                  <label className="" style={{ paddingRight: "4px" }}>
                    {" "}
                    DataList
                  </label>
                  <input className="form-check-input mt-2" type="radio" />
                </div>
                <div
                  className="col-md-12 mt-1"
                  style={{ display: "flex", gap: "40px" }}
                >
                  <label className=""> Normal</label>
                  <input className="form-check-input mt-2" type="radio" />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className="col-md-12 mt-1"
                  style={{ display: "flex", gap: "50px" }}
                >
                  <label className="" style={{ paddingRight: "3px" }}>
                    LOC
                  </label>
                  <input className="form-check-input mt-2" type="radio" />
                </div>

                <div
                  className="col-md-12 mt-1"
                  style={{ display: "flex", gap: "22px" }}
                >
                  <label className="" style={{ paddingRight: "3px" }}>
                    PiecelLOC
                  </label>
                  <input className="form-check-input mt-2" type="radio" />
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          <div className='col-md-4 mt-4 ms-5'>
            <div style={{ display: "flex", gap: "10px" }} className='ms-5'>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ marginLeft: "100px" }} >
                  <label className='mt-2'>Proramming</label>
                  <label className='mt-2' style={{ whiteSpace: "nowrap" }}>Task Setup Loading</label>
                  <label className='mt-2'>Material Handling</label>
                  <label className='mt-2'>Cutting</label><br />
                  <label className='mt-2'>Job Work</label><br />
                  <label className='mt-2'>Material</label>
                </div>
                <div>
                </div>
                <div className='col-md-4 ' style={{ width: "100px", marginTop: "-30px" }}>
                  <h6 className='mt-2'>Charges</h6>
                  <input className='mt-1'></input>
                  <input></input>
                  <input className='mt-1'></input>
                  <input className='mt-1'></input>
                  <input></input>
                  <input className='mt-1'></input>
                </div>
              </div>
              <div>
                <button
                  className="button-style group-button"
                  style={{ width: "150px" }} onClick={createTask}
                >
                  Create Tasks
                </button>
                <button
                  className="button-style  group-button"
                  style={{ width: "150px" }} onClick={onClickGetEstimator}
                >
                  Get Estimate
                </button>
                <button
                  className="button-style  group-button"
                  style={{ width: "150px" }}
                >
                  ReRead
                </button>
                <button
                  className="button-style  group-button"
                  style={{ width: "150px" }} onClick={onClickSetTaskRate}
                >
                  Set Task Rates
                </button>
                <button
                  className="button-style  group-button"
                  style={{ width: "150px" }} onClick={onClickPrintEstimate}
                >
                  Print Estimate
                </button>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>


      {/* col-3 */}
      <div className='col-md-12 mt-2'>
        <div className='row'>
          <div className='col-md-6'>
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Part/Dwg Name</th>
                  <th>Drawing Exists</th>
                  <th>Part NetArea</th>
                  <th>Part NetWt</th>
                  <th>Rect Weight</th>
                  <th>To Quote Quantity</th>
                  <th>Nested of Quantity</th>
                  <th>LOC</th>
                  <th>Price</th>
                  <th>Complexity</th>
                  <th>Out Open</th>
                  <th>JW Cost</th>
                  <th>Material Cost</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

    </div>
  )
}
