import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ConsigneeAddress from "./ConsigneeAddress";
import CommercialInfo from "./CommercialInfo";

// import ContactDetails from "./ContactDetailsTable";
// import ContactNumDetailsTable from "./ContactNumDetailsTable";

export default function NavTab() {
  const [key, setKey] = useState("ConsigneeAddress");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1 tab_font"
    >
      <Tab eventKey="ConsigneeAddress" title="Consignee Address">
        <ConsigneeAddress />
      </Tab>
      <Tab eventKey="CommercialInfo" title="Commercial Info">
        <CommercialInfo />
      </Tab>
    </Tabs>
  );
}
