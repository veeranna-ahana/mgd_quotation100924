import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import QuotationItemList from "./QuotationItemList";
import TermsandCondition from "./TermsandCondition";



function NavTab() {
  const [key, setKey] = useState("quotation");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="quotation" title="Quotation Item List">
        <QuotationItemList/>
      </Tab>

      <Tab eventKey="termsandcondition" title="Terms & Conditions">
        <TermsandCondition/>
      </Tab>
    </Tabs>
  );
}

export default NavTab;
