import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomerBOMList from "./CustomerBOMList";
import CustomerPAL from "./CustomerPAL";

function NavTab() {
  const [key, setKey] = useState("customer");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
      // style={{ fontWeight: "600" }}
    >
      <Tab eventKey="customer" title="Customer BOM List">
        <CustomerBOMList />
      </Tab>

      <Tab eventKey="customer list" title="Customer Part Assembly List">
        <CustomerPAL />
      </Tab>
    </Tabs>
  );
}

export default NavTab;
