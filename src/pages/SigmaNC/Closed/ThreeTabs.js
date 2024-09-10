import React from 'react';
import { Tab } from 'bootstrap';
import { useState } from 'react';
import { Tabs } from 'react-bootstrap';
import ScheduleListForm from './ScheduleList/ScheduleListForm';
import NcTaskForm from './NcTaskList/NcTaskForm';
import NcProgramsForm from './NcProgramTab/NcProgramsForm';

export default function ThreeTabs() {

    const [key, setKey] = useState("scheduleList");
    

  return (
    <div>
       <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-2 tab_font"
    >
      <Tab eventKey="scheduleList" title="Schedule List">
      <ScheduleListForm/>
      </Tab>

<Tab eventKey="ncTaskList" title="NC Task List">
        <NcTaskForm/>
      </Tab>

      <Tab eventKey="ncPrograms" title="NC Programs">
        <NcProgramsForm/>
      </Tab>
    </Tabs>
    </div>
  );
}
