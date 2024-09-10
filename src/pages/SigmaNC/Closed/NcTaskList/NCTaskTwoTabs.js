import React from 'react';
import { Tab } from 'bootstrap';
import { useState } from 'react';
import { Tabs } from 'react-bootstrap';
import ProgramsTable from './ProgramsTab/ProgramsTable';
import PartsTabTable from './PartsTab/PartsTabTable';

export default function NCTaskTwoTabs() {
    const [key, setKey] = useState("programs");
  return (
    <div>
       <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-2 tab_font"
    >
      <Tab eventKey="programs" title="Programs">
      <ProgramsTable/>
      </Tab>

<Tab eventKey="parts" title="Parts">
        <PartsTabTable/>
      </Tab>

      
    </Tabs>
    </div>
  );
}
