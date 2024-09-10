import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import AllotProgramModal from './AllotProgramModal';

export default function ScheduleListForm() {
  const[allotProgram, setAllotProgram]=useState(false);

  const allotProgramSubmit=()=>{
setAllotProgram(true);
  }
    return (
        <div>
          {
            <AllotProgramModal  setAllotProgram={setAllotProgram} allotProgram={allotProgram}/>
          }

            <div className='row mb-3'>
                <div className="col-md-12 col-sm-12"    >
                    <div className="ip-box form-bg mt-2"   >



                        <div className="  col-md-12">

                            <h5> Schedule Manager</h5>


                        </div>
                        <div className='row mb-3' >





                            <button className="button-style  group-button col-md-2"
                            >
                                Create DFX WS
                            </button>

                            <button className="button-style  group- col-md-2"
                            >
                                Create Part WS
                            </button>

                            <button className="button-style  group-button col-md-2"
                            >
                                Update Schedule
                            </button>
                            <button className="button-style  group-button col-md-2"
                            >
                                Program Complete
                            </button>
                            <button className="button-style   group-button col-md-2"
                            onClick={allotProgramSubmit}
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
                    <button className="button-style mt-2 group-button"
                       >Estimated Time
                    
                    </button>
        </div>

    </div>



            <div className='row'>

<div className="col-md-6 mt-1  col-sm-12">


          <div
            style={{
             
              height: "700px",
              overflowX: "scroll",
              overflowY: "scroll",
              
            }}
          >
            <Table
              striped
              className="table-data border"
              
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{whiteSpace:"nowrap"}}>Schedule No</th>
                  <th style={{whiteSpace:"nowrap"}}>Customer</th>
                  <th style={{whiteSpace:"nowrap"}}>Status</th>
                  <th style={{whiteSpace:"nowrap"}}>Target Date</th>
                  <th style={{whiteSpace:"nowrap"}}>Instructions</th>
                  <th style={{whiteSpace:"nowrap"}}>Status</th>
                </tr>
              </thead>
              <tbody className="tablebody">



              </tbody>
            </Table>
          </div>
        </div>




        <div className="col-md-6 mt-1  col-sm-12">



        <div className="col-md-12 mt-1  col-sm-12">
          <div
            style={{
             
              height: "350px",
              overflowX: "scroll",
              overflowY: "scroll",
              
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ marginLeft: "5px", border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{whiteSpace:"nowrap"}}>Process</th>
                  <th style={{whiteSpace:"nowrap"}}>Material</th>
                  <th style={{whiteSpace:"nowrap"}}>Source</th>
                  <th style={{whiteSpace:"nowrap"}}>Machine</th>
                  <th style={{whiteSpace:"nowrap"}}>Task Drawings</th>
                  <th style={{whiteSpace:"nowrap"}}>Drawings Nested</th>
                  <th style={{whiteSpace:"nowrap"}}>Parts Tasked</th>
                  <th style={{whiteSpace:"nowrap"}}>Parts Nested</th>
                  <th style={{whiteSpace:"nowrap"}}>Priority</th>
                  <th style={{whiteSpace:"nowrap"}}>Status</th>
                </tr>
              </thead>
              <tbody className="tablebody"></tbody>
            </Table>
          </div>
        </div>







          <div
            style={{
             
              height: "350px",
              overflowX: "scroll",
              overflowY: "scroll",
              
            }}
          >
            <Table
              striped
              className="table-data border"
              style={{ marginLeft: "5px", border: "1px" }}
            >
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{whiteSpace:"nowrap"}}>Program No</th>
                  <th style={{whiteSpace:"nowrap"}}>Machine</th>
                  <th style={{whiteSpace:"nowrap"}}>MProcess</th>
                  <th style={{whiteSpace:"nowrap"}}>Para1</th>
                  <th style={{whiteSpace:"nowrap"}}>Para2</th>
                  <th style={{whiteSpace:"nowrap"}}>Qty</th>
                  <th style={{whiteSpace:"nowrap"}}>Dwgs</th>
                  <th style={{whiteSpace:"nowrap"}}>Parts</th>
                  <th style={{whiteSpace:"nowrap"}}>Priority</th>
                  <th style={{whiteSpace:"nowrap"}}>Status</th>
                  <th style={{whiteSpace:"nowrap"}}>Time</th>
                  <th style={{whiteSpace:"nowrap"}}>LOC</th>
                  <th style={{whiteSpace:"nowrap"}}>Pierces</th>
                  <th style={{whiteSpace:"nowrap"}}>Remarks</th>
                  
                 
                </tr>
              </thead>
              <tbody className="tablebody">


              </tbody>
            </Table>
          </div>
        </div>

</div>

        </div>
    );
}
