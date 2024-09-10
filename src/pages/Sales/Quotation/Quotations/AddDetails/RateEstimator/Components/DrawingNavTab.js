import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Drawing from "./Drawing";
import Details from "./Details";

function DrawingNavTab() {
  const [key, setKey] = useState("drawing");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="drawing" title="Drawing">
        <Drawing/>
      </Tab>

      <Tab eventKey="details" title="Details">
        <Details/>
      </Tab>
    </Tabs>
  );
}

export default DrawingNavTab;
