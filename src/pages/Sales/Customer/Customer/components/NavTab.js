import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ContactDetails from "./ContactDetailsTable";
import ContactNumDetailsTable from "./ContactNumDetailsTable";

function NabTab() {
  const [key, setKey] = useState("contact");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="contact" title="Contact Details">
        <ContactNumDetailsTable />
      </Tab>

      <Tab eventKey="contact_num" title="Contact No Details">
        <ContactDetails />
      </Tab>
    </Tabs>
  );
}

export default NabTab;
