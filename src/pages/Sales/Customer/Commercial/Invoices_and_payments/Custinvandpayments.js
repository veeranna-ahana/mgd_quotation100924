import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Table,
  Row,
  Col,
  FormLabel,
  Button,
  Tabs,
  Tab,
  FormControl,
} from "react-bootstrap";
import moment from "moment";
// import CmpLogo from "../../../images/ML-LOGO.png";
import CmpLogo from "../../../../../images/ML-LOGO.png";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../../../pages/components/alert";
// import Breadcrumbscomponent from "../../components/BreadCumbsComponent";

import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function Custinvandpayments() {
  // let nav = useNavigate();
  // const showInvoice = () => {
  //   nav("showinvoice");
  // };

  let navigate = useNavigate();
  let [alertModal, setAlertModal] = useState(false);
  let [firstbuttontext, setFirstbuttontext] = useState("");
  let [secondbuttontext, setSecondbuttontext] = useState("");

  // let [CustName, setCustName] = useState("");
  let [custdata, setCustdata] = useState("");
  let [custcode, setCustCode] = useState("");
  let [custname, setCustName] = useState("");

  let [dueAmount, setDueAmount] = useState(0);
  let [overDue, setOverDue] = useState(0);

  let [dlinvformdata, setDLInvFormdata] = useState([]);
  let [duelistdata, setDueListdata] = useState([]);
  let [overduelistdata, setOverDueListdata] = useState([]);
  let [pprduelistdata, setPPRDueListdata] = useState([]);
  let [dlinvformtaxdetsdata, setDLInvFormTaxDetsdata] = useState([]);
  let [dueAgeingdata, setDueAgeingdata] = useState([]);
  let [receiptsdata, setReceiptsdata] = useState([]);
  let [receiptdetsdata, setReceiptDetsdata] = useState([]);

  let [selectedInvoiceId, setSelectedInvoiceId] = useState(false);
  let [selectedInvoice, setSelectedInvoice] = useState(null);

  let [selectedReceiptId, setSelectedReceiptId] = useState(false);
  let [selectedReceipt, setSelectedReceipt] = useState(null);

  let [paymentandReceipts, setPaymentandReceipts] = useState(true);
  let [showInvoiceState, setShowInvoice] = useState(false);
  let [showDueReportState, setShowDueReport] = useState(false);

  let [selectedCustomer, setSelectedCustomer] = useState("");
  let [duereportdata, setDueReportData] = useState([]);

  let [duesamount, setDuesAmount] = useState("");

  // Invoice details
  let [invtype, setInvType] = useState("");
  let [dcinvno, setDCInvNo] = useState("");
  let [invdate, setInvDate] = useState("");
  let [pnno, setPNNO] = useState("");
  let [recpvid, setRecdPVID] = useState("");
  let [crdays, setCrDays] = useState(0);
  let [selectedODInvoiceId, setSelectedODInvoiceId] = useState(0);
  let [selectedODInvoice, setSelectedODInvoice] = useState(null);

  useEffect(() => {
    async function fetchCustData() {
      postRequest(endpoints.getCustomers, {}, (data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].label = data[i].Cust_name;
        }
        setCustdata(data);
      });
    }
    fetchCustData();
  }, []);

  // To Check Customer CreditTime field data from API and
  // calculate the dueamount and overdue amount to display in the front end on selecting the Customer

  let selectCust = async (evt) => {
    //  e.preventDefault();
    //   console.log(e.target.value);
    // let custdet = evt.target.value.replace(/[^A-Za-z0-9. ]/gi, "");
    // if ((custdet.includes("..")) || (custdet == null) || (custdet == "")) {
    //     alert('Please enter Customer Name ..');
    //     return;
    // }
    // //    e.preventDefault();
    // let cdet = custdet.substring(0, 4)
    // console.log(cdet);
    // setCustCode(custdet.substring(0, 4));
    // custcode = custdet.substring(0, 4);
    console.log("cust data = ", evt);
    console.log("cust code = ", evt[0].Cust_Code);
    console.log("table customer = ", custdata);
    let cust;
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i]["Cust_Code"] === evt[0].Cust_Code) {
        //custdet.substring(0, 4)) {
        cust = custdata[i];
        break;
      }
    }
    console.log(cust.Cust_name);
    setCustName(cust.Cust_name);
    setCustCode(cust.Cust_Code);
    setCrDays(cust.CreditTime);

    //  console.log(cust.CreditTime)
    postRequest(
      endpoints.getCustDuesOverdues,
      { custcode: cust.Cust_Code },
      (oddata) => {
        // custdet.substring(0, 4) }, (oddata) => {
        console.log(oddata);
        setOverDue(oddata[0]["overDue"]);
        setDueAmount(oddata[0]["dueAmount"]);
        console.log(oddata[0]["overDue"]);
        console.log(oddata[0]["dueAmount"]);
        setDuesAmount(oddata[0]["dueAmount"]);
      }
    );

    // Duelist
    //  postRequest(endpoints.dueListCustomer, { custcode: custdet.substring(0, 4), crdays: crdays }, (data) => {
    postRequest(
      endpoints.dueListCustomer,
      { custcode: cust.Cust_Code, crdays: crdays },
      (data) => {
        console.log(data);
        setDueListdata(data);
        setDueReportData(data);
      }
    );

    // OverDueList
    postRequest(
      endpoints.overdueListCustomer,
      { custcode: cust.Cust_Code, crdays: crdays },
      (data) => {
        console.log(data);
        setOverDueListdata(data);
      }
    );
    // Part Payment Receipts
    postRequest(
      endpoints.pprDueListCustomer,
      { custcode: cust.Cust_Code },
      (pprdata) => {
        console.log(pprdata);
        setPPRDueListdata(pprdata);
      }
    );

    postRequest(
      endpoints.dueSummaryCustomer,
      { custcode: cust.Cust_Code },
      (data) => {
        console.log(data);
        setDueAgeingdata(data);
      }
    );

    postRequest(
      endpoints.receiptsinfoCustomer,
      { custcode: cust.Cust_Code },
      (data) => {
        console.log(data);
        setReceiptsdata(data);
      }
    );
  };

  let dateconv = (da) => {
    let cdate = new Date(da);
    return (
      cdate.getDay().toString().padStart(2, "0") +
      "/" +
      (cdate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      cdate.getFullYear()
    );
  };

  let invselector = (id, duelist) => {
    setSelectedInvoiceId(id);
    setSelectedInvoice(duelist);
    setDCInvNo(duelist["DC_Inv_No"]);
    postRequest(
      endpoints.dLInvFormCustomer,
      { dcinvno: duelist["DC_Inv_No"] },
      (data) => {
        console.log(data);
        setDLInvFormdata(data);
      }
    );
    postRequest(
      endpoints.dLInvFormTaxDetsCustomer,
      { dcinvno: duelist["DC_Inv_No"] },
      (data) => {
        console.log(data);
        setDLInvFormTaxDetsdata(data);
      }
    );
  };

  let invodselector = (id, odduelist) => {
    setSelectedODInvoiceId(id);
    setSelectedODInvoice(odduelist);
    setDCInvNo(odduelist["DC_Inv_No"]);
    postRequest(
      endpoints.dLInvFormCustomer,
      { dcinvno: odduelist["DC_Inv_No"] },
      (data) => {
        console.log(data);
        setDLInvFormdata(data);
      }
    );
    postRequest(
      endpoints.dLInvFormTaxDetsCustomer,
      { dcinvno: odduelist["DC_Inv_No"] },
      (data) => {
        console.log(data);
        setDLInvFormTaxDetsdata(data);
      }
    );
  };

  async function printDueReport() {
    let printContents = document.getElementById("showduereport").innerHTML;
    let newWindow = window.open(
      "",
      "Due List",
      "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=700"
    );
    newWindow.document.body.innerHTML = printContents;
    newWindow.print();
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //    document.body.innerHTML = originalContents;
  }

  async function showDueReport() {
    setShowDueReport(true);
    setPaymentandReceipts(false);
  }
  async function closeDueReport() {
    setShowInvoice(false);
    setShowDueReport(false);
    setPaymentandReceipts(true);

    //    navigate('/customer');
    setAlertModal(true);
  }

  let secbtnc = () => {
    setAlertModal(false);
  };

  let fstbtnc = () => {
    // postRequest(endpoints.printDueReport, { custcode: custcode }).then((data) => {
    //     console.log(data);
    //     if (data.status === 200) {
    //         window.open(data.data);
    //     }
    // });
    // let [dueAmount, setDueAmount] = useState(0);
    // let [overDue, setOverDue] = useState(0);

    console.log(" Due : " + dueAmount);
    console.log(" Over Due : " + overDue);

    let newDate = moment(new Date()).format("DD MMM YY");
    let msubjct = Buffer.from(
      `Magod Laser List of Invoices Due for Payment as on ${newDate}`
    ).toString("base64");
    let mbody = Buffer.from(
      `Dear Sir,\n

        The details of outstanding invoice that are overdue for payment as of date is attached. Total out standing amount as per our records is Rs/- ${dueAmount} and total amount over due for payment is Rs/- ${overDue}.\n
        We request you to release the payment that is due at the earliest. \n
        
        Looking forward to receiving payment at the earliest. We assure you best of service in quality and timely delivery\n
        
        With warm regards\n
        
        Yours Sincerely\n
        
        Magod Laser Machining Pvt Ltd :\n
        Unit: Jigani`
    ).toString("base64");
    console.log(mbody);
    // Content Changing option
    window.open(`/mailer?mlbody=${mbody}&mlsubjct=${msubjct}`, "_blank");
    setAlertModal(false);
  };

  let recselector = (id, receiptdets) => {
    setSelectedReceiptId(id);
    setSelectedReceipt(receiptdets);
    setRecdPVID(receiptdets["RecdPVID"]);
    postRequest(
      endpoints.receiptDetsCustomer,
      { recdpvid: receiptdets["RecdPVID"] },
      (data) => {
        console.log(data);
        setReceiptDetsdata(data);
      }
    );
    // receiptDetsCustomer({
    //     recdpvid: receiptdets["RecdPVID"],
    // }, async (resp) => {
    //     console.log(resp)
    //     setReceiptDetsdata(resp)
    // })
  };

  let rendertable = (duelist, id, grdtype) => {
    return (
      <tr
        // className="custtr"
        style={{
          // border: "1px",
          // borderColor: "black",
          // borderWidth: "1px",
          // backgroundColor: selectedInvoiceId === id ? "#5d88fc" : "",
          backgroundColor: selectedInvoiceId === id ? "#98A8F8" : "",
          // fontFamily: "Roboto",
          // fontSize: "12px",
          // cursor: "pointer",
        }}
        id={id}
        onClick={() => {
          invselector(id, duelist);
        }}
      >
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {duelist["DC_InvType"]}
        </td>
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {duelist["DC_No"]}
        </td>
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {duelist["Inv_No"]}
        </td>
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(duelist["DespatchDate"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {duelist["PO_No"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {duelist["GrandTotal"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {duelist["PymtAmtRecd"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {(duelist["GrandTotal"] - duelist["PymtAmtRecd"]).toFixed(2)}
        </td>
        <td
          className="custtd"
          // style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(duelist["DespatchDate"])
            .add(crdays, "days")
            .format("DD/MM/YYYY")}
        </td>
        {grdtype === "DUE" ? (
          <td
            className="custtd"
            style={{
              borderLeft: "1px",
              fontFamily: "Roboto",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            {duelist["DueDays"]}
          </td>
        ) : (
          ""
        )}
      </tr>
    );
  };

  let rendertableod = (oduelist, id, grdtype) => {
    return (
      <tr
        className="custtr"
        style={{
          borderLeft: "1px",
          borderBottom: "1px",
          borderColor: "black",
          borderWidth: "1px",
          // backgroundColor: selectedODInvoiceId === id ? "#5d88fc" : "",
          backgroundColor: selectedODInvoiceId === id ? "#98A8F8" : "",
          fontFamily: "Roboto",
          fontSize: "12px",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => {
          invodselector(id, oduelist);
        }}
      >
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {oduelist["DC_InvType"]}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {oduelist["DC_No"]}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {oduelist["Inv_No"]}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(oduelist["DespatchDate"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {oduelist["PO_No"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {oduelist["GrandTotal"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {oduelist["PymtAmtRecd"]}
        </td>
        <td
          className="custtd"
          style={{
            borderLeft: "1px",
            fontFamily: "Roboto",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {(oduelist["GrandTotal"] - oduelist["PymtAmtRecd"]).toFixed(2)}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(oduelist["DespatchDate"])
            .add(crdays, "days")
            .format("DD/MM/YYYY")}
        </td>
      </tr>
    );
  };

  let rendertblduerep = (duerepinv, id) => {
    return (
      <tr
        className="custtr"
        style={{ borderColor: "black", borderWidth: "1px", border: "1px" }}
      >
        <td className="custtd" style={{ borderLeft: "1px" }}>
          {id + 1}
        </td>
        <td className="custtd" style={{ borderLeft: "1px" }}>
          {duerepinv["Inv_No"]}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(duerepinv["DespatchDate"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ borderLeft: "1px", fontFamily: "Roboto", fontSize: "12px" }}
        >
          <b>{duerepinv["PO_No"]}</b>
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {duerepinv["GrandTotal"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {duerepinv["PymtAmtRecd"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {(duerepinv["GrandTotal"] - duerepinv["PymtAmtRecd"]).toFixed(2)}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(duerepinv["DespatchDate"])
            .add(crdays, "days")
            .format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {duerepinv["DueDays"]}
        </td>
      </tr>
    );
  };

  let rendertableppr = (pprduelist, id) => {
    return (
      <tr
        className="custtr"
        style={{
          // backgroundColor: selectedInvoiceId === id ? "#5d88fc" : "",
          backgroundColor: selectedInvoiceId === id ? "#98A8F8" : "",
          fontFamily: "Roboto",
          fontSize: "12px",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => {
          invselector(id, pprduelist);
        }}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["DC_InvType"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["DC_No"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["Inv_No"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(pprduelist["DespatchDate"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["PO_No"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["GrandTotal"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["PymtAmtRecd"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {pprduelist["GrandTotal"] - pprduelist["PymtAmtRecd"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {moment(pprduelist["DespatchDate"])
            .add(crdays, "days")
            .format("DD/MM/YYYY")}
        </td>
      </tr>
    );
  };

  let rendertbldwg = (dldwgrec) => {
    return (
      <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {dldwgrec["Dwg_No"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {dldwgrec["Material"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {dldwgrec["Qty"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dldwgrec["Mtrl_rate"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dldwgrec["JW_Rate"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dldwgrec["DC_Srl_Amt"]}
        </td>
      </tr>
    );
  };

  let rendertbltax = (dlinvtaxrec) => {
    return (
      <tr
        className="custtr"
        style={{
          fontFamily: "Roboto",
          borderWidth: "1px",
          borderColor: "black",
          fontSize: "12px",
        }}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {dlinvtaxrec["Tax_Name"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dlinvtaxrec["TaxableAmount"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {dlinvtaxrec["TaxPercent"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dlinvtaxrec["TaxAmt"]}
        </td>
      </tr>
    );
  };

  let renderduessummtable = (dueAgeing) => {
    return (
      <tr
        className="custtr"
        style={{ borderWidth: "1px", borderColor: "black" }}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmt30"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmt60"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmt90"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmt180"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmt365"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {dueAgeing["DueAmtAbv365"]}
        </td>
      </tr>
    );
  };

  let rendertblrcpts = (receipts, id) => {
    return (
      <tr
        className="custtr"
        style={{
          borderWidth: "1px",
          borderColor: "black",
          // backgroundColor: selectedReceiptId === id ? "#5d88fc" : "",
          backgroundColor: selectedReceiptId === id ? "#98A8F8" : "",
          fontFamily: "Roboto",
          fontSize: "12px",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => {
          recselector(id, receipts);
        }}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {receipts["Recd_PVNo"]}
        </td>
        {/* <td className="custtd" style={{ fontFamily: 'Roboto', fontSize: '12px' }}>{receipts["RecdPVID"]}</td> */}
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "left" }}
        >
          {moment(receipts["Recd_PV_Date"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {receipts["TxnType"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {receipts["Amount"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {receipts["On_account"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "left" }}
        >
          {receipts["Description"]}
        </td>
      </tr>
    );
  };
  let rendertblrcptdets = (receiptdets) => {
    return (
      <tr
        className="custtr"
        style={{ borderWidth: "1px", borderColor: "black" }}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {receiptdets["Inv_No"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "left" }}
        >
          {moment(receiptdets["Inv_date"]).format("DD/MM/YYYY")}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {receiptdets["Inv_Type"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {receiptdets["Inv_Amount"]}
        </td>
        <td
        // className="custtd"
        // style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {receiptdets["Amt_received"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "right" }}
        >
          {receiptdets["Receive_Now"]}
        </td>
      </tr>
    );
  };

  async function showPaymentandReceipts(id) {
    setShowInvoice(false);
    setShowDueReport(false);
    setPaymentandReceipts(true);
  }

  async function showInvoice(id) {
    console.log("Selected Id : " + selectedInvoiceId);
    if (selectedInvoiceId == false && selectedInvoiceId != 0) {
      toast.error("Please Select an Invoice from Due List..");
      return;
    } else {
      setShowInvoice(true);
      setPaymentandReceipts(false);
    }
    // setSelectedReceiptId(id);
    // let invoicedets = await receiptDetsCustomer(id);
    // setReceiptDets(invoicedets);
  }

  return (
    <div>
      {/* <div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" style={{ marginTop: "20px" }}>
              Name
            </label>
            <select className="ip-select ">
              <option value="option 1"> A A Industries</option>
              <option value="option 1">Test Industries</option>
              <option value="option 1">Ahana Systems and solutions</option>
            </select>
          </div>

          <div className="col-sm-12 col-md-2" style={{ marginRight: "2rem" }}>
            <div>
              <label className="form-label">Code</label>
              <span
                className="outstanding-sum-value"
                style={{ backgroundColor: "lightgray", color: "white" }}
              ></span>
            </div>
          </div>

          <div className="col-sm-12 col-md-2" style={{ marginRight: "2rem" }}>
            <div>
              <label className="form-label">Due</label>
              <span
                className="outstanding-sum-value"
                style={{ backgroundColor: "orange", color: "white" }}
              >
                0
              </span>
            </div>
          </div>

          <div className="col-sm-12 col-md-2">
            <div>
              <label className="form-label">Over Due</label>
              <span
                className="outstanding-sum-value"
                style={{ backgroundColor: "Red", color: "white" }}
              >
                0
              </span>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-4"></div>
          <div className="col-sm-12 col-md-2">
            <div className="row justify-content-center mt-2 ">
              <button
                className="button-style"
                style={{ width: "150px" }}
                onClick={showInvoice}
              >
                Show Invoice
              </button>
            </div>
          </div>

          <div className="col-sm-12 col-md-1">
            <div className="row justify-content-center mt-2 ">
              <button className="button-style " style={{ width: "150px" }}>
                Due Report
              </button>
            </div>
          </div>

          <div className="col-sm-12 col-md-2">
            <div className="row justify-content-center mt-2 ">
              <button className="button-style " style={{ width: "150px" }}>
                Close
              </button>
            </div>
          </div>
        </div>
        <MainNavTab />
      </div> */}

      <h4 className="title">Customer Payment Receipt Info</h4>
      {/* <hr className="horizontal-line" /> */}

      <div>
        {paymentandReceipts ? (
          <>
            <div className="addquotecard" id="PaymentandReceipts">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">Name </label>
                  <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                  {custdata.length > 0 ? (
                    // <Form.Select
                    //   className="ip-select "
                    //   id="custname"
                    //   onChange={selectCust}
                    //   value={custcode}
                    // >
                    //   <option value="" disabled selected>
                    //     {" "}
                    //     Select Customer{" "}
                    //   </option>
                    //   {custdata.map((cust) => {
                    //     return (
                    //       <option value={cust["Cust_Code"]}>
                    //         {cust["Cust_name"]}
                    //       </option>
                    //     );
                    //   })}
                    // </Form.Select>
                    <Typeahead
                id="basic-example"
                // onChange={selectCust}
                options={custdata}
                placeholder="Select Customer"
                // selected={selected}
                /*onInputChange={(label) => {
                  console.log("input change :", label);
                }}
                onChange={(label) => {
                  console.log("onchange :", label);
                }}*/
                onChange={(label) => selectCust(label)}
              />
                  ) : (
                    ""
                  )}
                </div>
                <div className=" col-md-2" style={{ marginRight: "2rem" }}>
                  <div>
                    <label className="form-label">Code</label>
                    <span
                      className="outstanding-sum-value"
                      style={{ backgroundColor: "lightgray", color: "white" }}
                    >
                      {custcode}
                    </span>
                  </div>
                </div>
                <div className=" col-md-2" style={{ marginRight: "2rem" }}>
                  <div>
                    <label className="form-label">Due</label>
                    <input
                      className="outstanding-sum-value"
                      id="dueAmount"
                      style={{ backgroundColor: "orange", color: "white" }}
                      value={parseFloat(dueAmount + overDue).toFixed(2)}
                    />
                    {/* <span
                      className="outstanding-sum-value"
                      style={{ backgroundColor: "orange", color: "white" }}
                    >
                      {parseFloat(dueAmount + overDue).toFixed(2)}
                    </span> */}
                  </div>
                </div>
                <div className=" col-md-2">
                  <div>
                    <label className="form-label">Over Due</label>
                    <input
                      className="outstanding-sum-value"
                      id="overDueAmt"
                      style={{ backgroundColor: "Red", color: "white" }}
                      value={overDue}
                    />
                    {/* <span
                      className="outstanding-sum-value"
                      style={{ backgroundColor: "Red", color: "white" }}
                    >
                      {overDue}
                    </span> */}
                  </div>
                </div>
              </div>

              <div className=" row mt-2">
                <div
                  style={{
                    paddingLeft: "520px",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button
                    id="btnshowInvoice"
                    className="button-style"
                    style={{}}
                    onClick={() => showInvoice(0)}
                  >
                    Show Invoice{" "}
                  </button>
                  <button
                    id="btndueReport"
                    className="button-style"
                    style={{}}
                    onClick={() => showDueReport()}
                  >
                    Due Report{" "}
                  </button>
                  <button
                    id="btncustdwgclose"
                    className="button-style"
                    style={{}}
                    onClick={() => navigate("/customer")}
                  >
                    Close{" "}
                  </button>
                  <label style={{ flex: "2.5" }}></label>
                </div>
              </div>

              <div className="row mt-4">
                <Tabs
                  defaultActiveKey="duedets"
                  id="custinvdetails"
                  className="mb-1  tab_font mt-3"
                >
                  <Tab eventKey="duedets" title="Due List">
                    <div className="row">
                      <div style={{ overflowY: "scroll" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Inv Type",
                                "PN No",
                                "Inv No",
                                "Date",
                                "PO No",
                                "Inv Value",
                                "Payment Recd",
                                "Balance",
                                "Payment Date",
                                "Due Days",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody className="tbody">
                            {duelistdata != null
                              ? duelistdata.map((duelist, id) =>
                                  rendertable(duelist, id, "DUE")
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="overduedets" title="Over Due">
                    <div classnName=" row mt-2">
                      <div style={{ overflowY: "scroll", height: "250px" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Inv Type",
                                "PN No",
                                "Inv No",
                                "Date",
                                "PO No",
                                "Inv Value",
                                "Payment Recd",
                                "Balance",
                                "Payment Date",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {overduelistdata != null
                              ? overduelistdata.map((oduelist, id) =>
                                  rendertableod(oduelist, id, "OD")
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="partpayrecd" title="Part Payment Received">
                    <div classnName=" row mt-2">
                      <div style={{ overflowY: "scroll" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Inv Type",
                                "PN No",
                                "Inv No",
                                "Date",
                                "PO No",
                                "Inv Value",
                                "Payment Recd",
                                "Balance",
                                "Payment Date",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          {pprduelistdata != null
                            ? pprduelistdata.map((pprduelist, id) =>
                                rendertableppr(pprduelist, id)
                              )
                            : ""}
                        </Table>
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="duesSummary" title="Dues Summary">
                    <div classnName=" row mt-2">
                      <div style={{ overflowY: "scroll" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "30 days",
                                "60 days",
                                "3 Months",
                                "6 Months",
                                "1 Year",
                                "> 1 Year",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {dueAgeingdata != null
                              ? dueAgeingdata.map((dueAge) =>
                                  renderduessummtable(dueAge)
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="receiptsinfo" title="Receipts Info">
                    <div className="row">
                      <div
                        className="col-md-7"
                        style={{
                          overflowY: "scroll",
                        }}
                      >
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Receipt No",
                                "Date",
                                "Type",
                                "Amount",
                                "On Account",
                                "Description",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {receiptsdata != null
                              ? receiptsdata.map((receipts, id) =>
                                  rendertblrcpts(receipts, id)
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                      <div
                        className="col-md-5"
                        style={{
                          overflowY: "scroll",
                        }}
                      >
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Inv. No",
                                "Inv Date",
                                "Type",
                                "Inv Amount",
                                "Received",
                                "Received Now",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {receiptdetsdata != null
                              ? receiptdetsdata.map((receiptdets) =>
                                  rendertblrcptdets(receiptdets)
                                )
                              : ""}
                          </tbody>
                        </Table>
                        {/* </Col>
                                        </Row> */}
                        {/* </Container> */}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </>
        ) : null}
        {showInvoiceState ? (
          <div id="ShowInvoice">
            <h4 className="form-title  mt-2">Consignee Address</h4>
            <hr className="horizontal-line" />
            <Form>
              <div className="row">
                <div className="row">
                  <div className="col-md-3">
                    <FormLabel>Inv Type</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="invtype"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["DC_InvType"]
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <FormLabel>Invoice No</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dcinvno"
                      value={
                        selectedInvoice == null ? "" : selectedInvoice["Inv_No"]
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <FormLabel>Date</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="invdate"
                      disabled
                      value={
                        selectedInvoice["Inv_Date"] == null
                          ? ""
                          : selectedInvoice["Inv_Date"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>PN No</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="pnno"
                      value={
                        selectedInvoice == null ? "" : selectedInvoice["DC_No"]
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <FormLabel>Date</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="pndate"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["DC_Date"]
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <FormLabel>Consignee</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="consignee"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Cust_Name"]
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <FormLabel>PO No</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="pono"
                      value={
                        selectedInvoice == null ? "" : selectedInvoice["PO_No"]
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <FormLabel>Address</FormLabel>
                    <textarea
                      type="textarea"
                      controlId="address"
                      rows={3}
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Cust_Address"]
                      }
                      style={{
                        width: "250px",
                        height: "60px",
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Delivery</FormLabel>
                    <textarea
                      type="textarea"
                      controlId="address"
                      rows={3}
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Del_Address"]
                      }
                      style={{
                        width: "250px",
                        height: "60px",
                      }}
                    />
                  </div>

                  <div className="col-md-2">
                    <FormLabel>Dispatch Date</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dispatchdate"
                      value={
                        selectedInvoice == null
                          ? ""
                          : dateconv(selectedInvoice["DespatchDate"])
                      }
                    />
                  </div>
                  <div className="col-md-1">
                    {" "}
                    <FormLabel> Mode</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dispatchmode"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["TptMode"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Vehicle No</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dispatchdate"
                      value={
                        selectedInvoice == null ? "" : selectedInvoice["VehNo"]
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <FormLabel>City</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="custcity"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Cust_Place"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Pincode</FormLabel>

                    <Form.Control
                      type="text"
                      controlId="pincode"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["PIN_Code"]
                      }
                    />
                  </div>

                  <div className="col-md-3">
                    <FormLabel>State</FormLabel>

                    <Form.Control
                      type="text"
                      controlId="cstate"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Cust_State"]
                      }
                    />
                  </div>
                  <div className="col-md-3 mt-4 ">
                    <button
                      className="button-style"
                      style={{ marginLeft: "65px" }}
                      onClick={() => showPaymentandReceipts(true)}
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* </Tab>
                                <Tab eventKey="commercialinfo" title="Commercial Info" style={{ height: '200px', fontFamily: 'Roboto', fontSize: '12px', fontWeight: 'bold' }}>
                    
                    <Col xs={12}> */}
                <h4 className="form-title  mt-5">Commercial Info</h4>
                <hr className="horizontal-line" />

                <div className="row">
                  <div className="col-md-3">
                    <FormLabel>Net Value</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dispatchdate"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Net_Total"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Grand Total</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="dispatchmode"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["GrandTotal"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Mtrl Value</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="mtrlchg"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["MtrlChg"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Received</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="received"
                      value={
                        selectedInvoice == null ? "" : selectedInvoice["0.00"]
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <FormLabel>Discount</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="discount"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Discount"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Balance</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="grandtotal"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["GrandTotal"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Assessible Value</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="assesiblevalue"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["AssessableValue"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Due Days</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="duedays"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["DueDays"]
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Delivery Charges</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="delchg"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Del_Chg"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Payment Terms</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="paymentterms"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["PaymentTerms"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Total Taxes</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="delchg"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["TaxAmount"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Payment Date</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="paymentdate"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["PaymentDate"]
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    {" "}
                    <FormLabel>Invoice Total</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="invtotal"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["InvTotal"]
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <FormLabel>Round Off</FormLabel>
                    <Form.Control
                      type="text"
                      controlId="roundoff"
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Round_Off"]
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <FormLabel>Remarks</FormLabel>
                    <Form.Control
                      type="textarea"
                      controlId="remarks"
                      rows={1}
                      value={
                        selectedInvoice == null
                          ? ""
                          : selectedInvoice["Remarks"]
                      }
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="row">
                    <div className="col-md-7">
                      <div style={{ height: "280px", overflowY: "scroll" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Dwg No / Part No",
                                "Material",
                                "Qty",
                                "Mtrl Rate",
                                "JW Rate",
                                "Total",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody className="tablebody">
                            {dlinvformdata != null
                              ? dlinvformdata.map((dldwgrec) =>
                                  rendertbldwg(dldwgrec)
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="col-md-5">
                      {" "}
                      <div style={{ height: "280px", overflowY: "scroll" }}>
                        <Table striped className="table-data border ">
                          <thead className="tableHeaderBGColor">
                            <tr>
                              {[
                                "Tax Name",
                                "Taxable Amount",
                                "Tax Percent",
                                "Tax Amount",
                              ].map((h) => {
                                return <th>{h}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody className="tablebody">
                            {dlinvformtaxdetsdata != null
                              ? dlinvformtaxdetsdata.map((dlinvtaxrec) =>
                                  rendertbltax(dlinvtaxrec)
                                )
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        ) : (
          ""
        )}
        {showDueReportState ? (
          <div id="ShowDueReport">
            <h4 className="form-title mt-2 ">
              {" "}
              List of Invoices Due for Payment
            </h4>
            <hr className="horizontal-line" />
            <div className="row justify-content-end mb-3  ">
              <button
                className="button-style"
                style={{ width: "150px" }}
                onClick={() => printDueReport()}
              >
                Print
              </button>
              <button
                className="button-style"
                style={{ width: "150px" }}
                onClick={() => closeDueReport()}
              >
                Close
              </button>
            </div>

            <Col
              className="vscroll"
              style={{ width: "100%", maxHeight: "500px" }}
            >
              <div id="showduereport">
                <Table responsive striped bordered style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <td rowspan="2" style={{ width: "50px", height: "50px" }}>
                        <img className="logo" src={CmpLogo} />
                      </td>
                      <td colSpan="8">
                        <h5>
                          <b>Magod Laser Machining Pvt. Ltd.</b>
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8">
                        72, KIADB Industrial Area, Phase II Jigani, Anekal
                        Taluk, Bangalore -560106
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        <h6>
                          List of Invoices Due for Payment as on{" "}
                          {moment(new Date()).format("DD/MM/YYYY")}
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8">
                        <b>Customer Name : {custname}</b>
                      </td>
                      <td colSpan="2">
                        <b>Due Amount : {overDue}</b>
                      </td>
                    </tr>

                    <tr>
                      {[
                        "Srl",
                        "Inv No",
                        "Inv Date",
                        "PO No",
                        "Amount",
                        "Received",
                        "Balance",
                        "Due Date",
                        "Over Due Days",
                      ].map((h) => {
                        return <th>{h}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {duereportdata != null
                      ? duereportdata.map((duerepinv, id) =>
                          rendertblduerep(duerepinv, id)
                        )
                      : ""}
                    {custname == "" ? (
                      <tr>
                        <td colSpan={8}>No Customer Selected</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {custname != "" && duereportdata.length == 0 ? (
                      <tr>
                        <td colSpan={8}>No Data Found for {custname}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </Table>
              </div>
              {/* </Col>
                        </Row>
                    </Container> */}
            </Col>
          </div>
        ) : (
          ""
        )}
        <AlertModal
          show={alertModal}
          onHide={(e) => setAlertModal(e)}
          firstbutton={fstbtnc}
          secondbutton={secbtnc}
          title="Alert !"
          message="Do you wish to Send a Copy through E-Mail ?"
          firstbuttontext="Yes"
          secondbuttontext="No"
        />
      </div>
    </div>
  );
}

export default Custinvandpayments;
