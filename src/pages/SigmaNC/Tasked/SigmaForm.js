import React, { useState } from 'react';
//import ThreeTabs from './ThreeTabs';
import { useNavigate } from 'react-router-dom';

export default function SigmaForm(order_No, setOrder_No) {
  const nav = useNavigate();
 // const [custcode, setCustcode] = useState("");
  const [key, setKey] = useState("scheduleList");

  const btnorderdxf = () => {
    console.log("btnorderdxf")
    let fpath = `\\Wo\\${order_No}\\DXF\\`;
    window.open(fpath);

  }
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Programing Manager</h4>
        </div>
      </div>
      <div className='row mb-3'>
        <div className="col-md-12 col-sm-12"    >
          <div className="ip-box  mt-2" >
            <div className='row' >
              <div className=" row col-md-4">
                {/* <h5> Magod Laser Maching Pvt Ltd</h5> */}
                <p>20 NC Programming Manager</p>
              </div>
              <div className='row col-md-8'>
                <button className="button-style  group-button col-md-3" onClick={btnorderdxf}>Order DXF</button>
                <button className="button-style  group- col-md-3">Cust Parts</button>
                <button className="button-style  group-button col-md-3">Sigma Nest</button>
                <button className="button-style  group-button col-md-2" onClick={nav("/home")}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="horizontal-line" />
      {/* <ThreeTabs /> */}
      <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-2 tab_font"
      >
        <Tab eventKey="scheduleList" title="Schedule List">
          <ScheduleListForm />
        </Tab>

        <Tab eventKey="ncTaskList" title="NC Task List">
          <NcTaskForm />
        </Tab>

        <Tab eventKey="ncPrograms" title="NC Programs">
          <NcProgramsForm />
        </Tab>
      </Tabs>
    </div>
      
    </div>
  );
}
