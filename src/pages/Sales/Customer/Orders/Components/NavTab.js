import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderDetailStatus from "./OrderDetailStatus";
import InvoiceList from "./InvoiceList";
import ScheduleDetails from "./ScheduleDetails";
import TaskPartDetails from "./TaskPartDetails";
// import ContactDetails from "./ContactDetailsTable";
// import ContactNumDetailsTable from "./ContactNumDetailsTable";

export default function NavTab() {
  const [key, setKey] = useState("OrderDetailStatus");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1 tab_font"
    >
      <Tab eventKey="OrderDetailStatus" title="Order Detail Status">
        <OrderDetailStatus />
      </Tab>
      <Tab eventKey="InvoiceList" title="Invoice List">
        <InvoiceList />
      </Tab>
      <Tab eventKey="ScheduleDetails" title="Schedule Details">
        <ScheduleDetails />
      </Tab>
      <Tab eventKey="TaskPartDetails" title="Task Part Details">
        <TaskPartDetails />
      </Tab>
      {/* <Tab eventKey="contact" title="Contact Details">
        <ContactNumDetailsTable />
      </Tab>

      <Tab eventKey="contact_num" title="Contact No Details">
        <ContactDetails />
      </Tab> */}
    </Tabs>
  );
}
