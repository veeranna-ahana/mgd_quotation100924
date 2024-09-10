import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DueList from "./DueList";
import DuesSummary from "./DuesSummary";
import OverDue from "./OverDue";
import PartPaymentReceived from "./PartPaymentReceived";
import ReceiptsInfo from "./ReceiptsInfo";

export default function MainNavTab() {
    const [key, setKey] = useState("due_list");

    return (
      <div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-5 mt-3 tab_font"
        >
  
          <Tab eventKey="due_list" title="Due List">
            <DueList />
          </Tab>
  
          <Tab eventKey="over_due" title="Over Due">
            <OverDue />
          </Tab>
  

          <Tab eventKey="part_payment" title="Part Payment Received">
            <PartPaymentReceived />
          </Tab>
  
  
  
          <Tab eventKey="dues_summary" title="Dues Summary">
            <DuesSummary />
          </Tab>
  
  
  
          <Tab eventKey="receipts_info" title="Receipts Info">
            <ReceiptsInfo />
          </Tab>
  
        </Tabs>
      </div>
    );
  }

