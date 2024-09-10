import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProfileList from "./ProfileList";
import TaskList from "./TaskList";

function NavTab() {
  const [key, setKey] = useState("profileList");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="profileList" title="Profile List">
        <ProfileList/>
      </Tab>

      <Tab eventKey="tasklist" title="Task List">
        <TaskList/>
      </Tab>
    </Tabs>
  );
}

export default NavTab;
