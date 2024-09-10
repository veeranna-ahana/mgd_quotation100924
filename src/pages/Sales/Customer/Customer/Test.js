import NabTab from "../Customer/components/NavTab";
import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Form,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import { Typeahead } from "react-bootstrap-typeahead";

//import { useAlert } from 'react-alert'
// import moment from "moment";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const { postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

const ExistedCustomerInfo = () => {
  let navigate = useNavigate();
  //   const alert = useAlert();
  let [statedata, setStatedata] = useState([]);
  let [crtermsdata, setCrTermsdata] = useState([]);
  let [mtrlsourcedata, setMtrlSourcedata] = useState([]);
  let [custContactData, setCustContactData] = useState([]);
  let [custContTeleData, setCustContTeleData] = useState([]);
  let [customerdata, setCustomerdata] = useState([]);
  let [custdata, setCustdata] = useState([]);
  let [CustName, setCustName] = useState("");
  let [selectedRecord, setSelectedRecord] = useState("");

  // Form data
  let [newCustName, setNewCustName] = useState("");
  let [branchName, setBranchName] = useState("");
  let [custcode, setCustCode] = useState("");
  let [pincode, setPinCode] = useState("");
  let [country, setCountry] = useState("");
  let [custcity, setCustCity] = useState("");
  let [custstate, setCustState] = useState("");
  let [gstdisabled, setGSTDisabled] = useState(true);
  let [pandisabled, setPANDisabled] = useState(true);

  let [custaddress, setCustAddress] = useState("");
  let [compemail, setCompEmail] = useState("");
  let [crterms, setCrTerms] = useState("");
  let [maxcredit, setMaxCredit] = useState("");
  let [creditdays, setCreditDays] = useState("");
  let [avepaydays, setAvePayDays] = useState("");
  let [firstbillingdt, setFirstBillingDt] = useState("");
  let [lastbillingdt, setLastBillingDt] = useState("");
  let [gstno, setGSTNO] = useState("");
  let [panno, setPANNO] = useState("");
  let [custfoldername, setCustFolderName] = useState("");
  let [delivery, setDelivery] = useState("");
  let [govtorg, setGovtOrg] = useState(false);
  let [isexport, setIsExport] = useState(false);
  let [custcurrent, setCustCurrent] = useState(false);
  let [statecd, setStateCd] = useState("");
  let [custstateid, setCustStateId] = useState("");

  // Contact Details
  let [conName, setContactName] = useState([]);
  let [conDept, setDept] = useState([]);
  let [conDesignation, setDesignation] = useState([]);
  let [conE_mail, setCEmail] = useState([]);
  let [conTele_Office, setTele_Office] = useState([]);
  let [conTele_Mobile, setTele_Mobile] = useState([]);
  let [btnnew, setBtnNew] = useState(false);
  let [btnupd, setBtnUpd] = useState(true);
  let [btndel, setBtnDel] = useState(true);

  let [rawCustState, setRawCustState] = useState({});
  let [selected, setSelected] = useState();

  let customerMenu = () => {
    window.location.href = "/customer";
  };

  useEffect(() => {
    setBtnNew(false);
    async function fetchData() {
      postRequest(endpoints.getCustomers, {}, (custdetdata) => {
        setCustdata(custdetdata);
        console.log("custdetdata", custdetdata);
        // setLoaded(true);
      });
      postRequest(endpoints.getStates, {}, (data) => {
        console.log("states", data);
        setStatedata(data);
      });
      postRequest(endpoints.getCreditTerms, {}, (crdata) => {
        console.log("crdata", crdata);
        setCrTermsdata(crdata);
      });
      postRequest(endpoints.getMtrlSources, {}, (mtlsrcdata) => {
        console.log("mtlsrcdata", mtlsrcdata);
        setMtrlSourcedata(mtlsrcdata);
      });
    }
    fetchData();
  }, []);

  let selectCust = async (e) => {
    let cust;
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i]["Cust_Code"] === e.target.value) {
        cust = custdata[i];
        break;
      }
    }
    setCustCode(cust.Cust_Code);

    postRequest(
      endpoints.getCustomerDetails,
      {
        //     custcode: custdet.substring(0, 4),
        custcode: cust.Cust_Code,
      },
      (resp) => {
        console.log(resp);
        let excustdata = resp[0];
        setCustCode(cust.Cust_Code);
        setNewCustName(excustdata.customerName);
        //
        //    console.log("After postRequesy : "+custdet);
        //  setCustCode(custdet.substring(0, 4));
        // setNewCustName(excustdata.substring(6, custdet.length));
        //            console.log(excustdata.Branch);
        setBranchName(excustdata.Branch);
        setAvePayDays("");
        setAvePayDays(
          excustdata.AveragePymtPeriod ? excustdata.AveragePymtPeriod : ""
        );
        if (excustdata.EMail != null || excustdata.EMail != "undefined") {
          setCompEmail(excustdata.EMail);
        } else {
          setCompEmail("");
        }
        setCountry(excustdata.Country);
        setCrTerms(excustdata.CreditTerms);
        setCreditDays(excustdata.CreditTime);
        setCustAddress(excustdata.Address);
        setCustCity(excustdata.City);
        setCustCurrent(excustdata.CURRENT);
        setCustFolderName(excustdata.DWG ? excustdata.DWG : custcode);

        //  console.log(excustdata.StateId, excustdata.State)

        if (excustdata.StateId != null && excustdata.State == "undefined") {
          postRequest(
            endpoints.getStateName,
            { statecd: excustdata.StateId },
            (stnmdata) => {
              setCustState(stnmdata.State);
              setCustStateId(excustdata.StateId);
            }
          );
        } else if (
          (excustdata.StateId == null || excustdata.StateId == "") &&
          (excustdata.State != null || excustdata.State != "undefined")
        ) {
          console.log("State Name Present");
          postRequest(
            endpoints.getStateCode,
            { statenm: excustdata.State },
            (stdata) => {
              setCustState(excustdata.State);
              setCustStateId(stdata.StateCode);
            }
          );
        } else {
          setCustState(excustdata.State);
          setCustStateId(excustdata.StateId);
        }
        setDelivery(excustdata.Delivery);
        setFirstBillingDt("");
        setFirstBillingDt(
          excustdata.FirstBilling
            ? moment(excustdata.FirstBilling).format("DD/MM/YYYY")
            : ""
        );
        setLastBillingDt("");
        setLastBillingDt(
          excustdata.LastBilling
            ? moment(excustdata.LastBilling).format("DD/MM/YYYY")
            : ""
        );
        setMaxCredit(excustdata.CreditLimit);

        // if ((excustdata.GSTNO).substr(0, 2) != custstateid) {
        setGSTNO(custstateid + excustdata.GSTNo);
        // }
        //else {
        //   setGSTNO(excustdata.GSTNo);
        // }
        setGovtOrg(excustdata.IsGovtOrg);
        setIsExport(excustdata.IsForiegn);
        setCustCurrent(excustdata.CURRENT);
        setPANNO(excustdata.PAN_No);
        setPinCode(excustdata.Pin_Code);
        setCustomerdata(resp);
      }
    );
    postRequest(
      endpoints.getCustomerContactDets,
      {
        // custcode: custdet.substring(0, 4),
        custcode: cust.Cust_Code,
      },
      async (custcontacts) => {
        console.log("customer contacts", custcontacts);
        setCustContactData(custcontacts);
      }
    );
  };

  let selectState = async (e) => {
    //  for (let i = 0; i < statedata.length; i++) {
    //     if (statedata[i]["Id"] == e.target.value) {
    // stat = statedata[i];
    //        console.log(statedata[i]["Id"]);
    setCustStateId(e.target.value);

    postRequest(
      endpoints.getStateName,
      { statecd: e.target.value },
      (stnmdata) => {
        console.log(stnmdata[0]["State"]);
        setCustState(stnmdata[0]["State"]);
      }
    );

    //  setStateCd(statedata[i]["StateCode"]);
    if (gstno == null) {
      setGSTNO(e.target.value);
    } else {
      if (gstno.substr(0, 2) != e.target.value) {
        setGSTNO(e.target.value);
      } else {
        setGSTNO(gstno);
      }
    }
    console.log(statedata["State"]);
    //       break;
    // }
    // }
  };

  let selectCrTerms = async (e) => {
    console.log(e.target.value);
    for (let i = 0; i < crtermsdata.length; i++) {
      if (crtermsdata[i]["PaymentTerm"] === e.target.value) {
        setCrTerms(crtermsdata[i]["PaymentTerm"]);
        setCreditDays(crtermsdata[i]["CreditDays"]);
        break;
      }
    }
  };

  let selectMtrlSource = async (e) => {
    //    console.log(e.target.elements.MtrlSource.value);
    let mtlsrc;
    for (let i = 0; i < mtrlsourcedata.length; i++) {
      if (mtrlsourcedata[i]["MtrlSource"] === e.target.value) {
        mtlsrc = mtrlsourcedata[i];
        break;
      }
    }
    setDelivery(mtlsrc["MtrlSource"]);
  };

  let updateCustomerData = (e) => {
    e.preventDefault();

    if (custContactData.length <= 0) {
      alert("Contact Details are required");
      return;
    }

    console.log("updateCustomerData" + custaddress);
    let custAddress = custaddress;
    // debugger;
    let city = e.target.elements.city.value;
    let pincode = 0;
    if (e.target.elements.pincode.value > 0)
      pincode = e.target.elements.pincode.value;
    else alert("Pincode should be numeric");

    let cstate = custstate;
    //        console.log("stateCD  ", statecd.length);
    let stateid = custstateid; //.substring(0, 2); // custstateid;
    //   let statecd = statecd;
    let country = e.target.elements.country.value;

    let compemail = e.target.elements.compemail.value;
    // let crterms = crterms; //e.target.elements.crterms.value;
    let maxcredit = e.target.elements.maxcredit.value;
    let creditdays = e.target.elements.creditdays.value;
    let avepaydays = e.target.elements.avepaydays.value;
    let firstbillingdt = e.target.elements.firstbillingdt.value
      ? e.target.elements.firstbillingdt.value
      : "";
    let lastbillingdt = e.target.elements.lastbillingdt.value
      ? e.target.elements.lastbillingdt.value
      : "";
    let gstno = e.target.elements.gstno.value;
    if (gstno.includes("~!@#$%^&*().,`[]{}|?><")) {
      alert("Special Characters are not allowed..");
      return;
    }
    if (
      e.target.elements.gstno.value.length < 3 ||
      (e.target.elements.gstno.value = "")
    ) {
      gstno = "UnRegistered";
    } else {
      //  gstno = custstateid + e.target.elements.gstno.value.substr(2, 15);
      //gstno = e.target.elements.gstno.value;
      setGSTNO(gstno);
    }
    let panno = e.target.elements.panno.value;
    // if ((gstno.length < 15) || (panno.length < 10)) {
    //     alert('Enter correct GST or PAN number');
    //     return;
    // }
    // if (gstno.substring(2,12) != panno){
    //     alert('Either GST or PAN is not correct');
    //     return;
    // }
    //let govtorg = govtorg;
    //let isexport = isexport;
    let custfoldername = e.target.elements.custfoldername.value;
    let ccurent = custcurrent.checked ? 1 : 0;

    // let delivery = e.target.elements.delivery.value;

    //     console.log("crterms ", crterms);
    //   console.log(custcurrent);

    postRequest(
      endpoints.updateCustomer,
      {
        custcode: custcode,
        customerName: newCustName,
        branchName: branchName,
        custAddress: custAddress,
        city: city,
        pincode: pincode,
        state: custstate,
        stateid: custstateid,
        country: country,
        compemail: compemail,
        maxcredit: maxcredit,
        crterms: crterms,
        creditdays: creditdays,
        avepaydays: avepaydays,
        firstbillingdt: moment(firstbillingdt).format("DD/MM/YYYY"),
        lastbillingdt: moment(lastbillingdt).format("DD/MM/YYYY"),
        gstno: gstno,
        panno: panno,
        govtorg: govtorg,
        isexport: isexport,
        custfoldername: custfoldername,
        custcurent: custcurrent,
        delivery: delivery,
        custContactData: custContactData, //,
        //custContTeleData: custContTeleData
      },
      (resp) => {
        console.log(resp);
        //        clearDataCustomer()
      }
    );

    // postRequest(endpoints.insertContactTeleNos, {custcode : custcode, custContTeleData: custContTeleData}, (respdata) => {
    //     console.log(respdata)
    // })

    alert("Customer data updated sucessfully");
    //    clearDataCustomer();
    //window.location.href = "/customer/createcustomer";
  };

  function clearDataCustomer() {
    setCustCode("");
    setNewCustName("");
    setBranchName("");
    setCustAddress("");
    setCustCity("");
    setPinCode("");
    setCustStateId("");
    setCustState("");
    setCountry("");
    setCompEmail("");
    // setEmail("");
    setCrTerms("");
    setMaxCredit("");
    setCreditDays("");
    setAvePayDays("");
    setFirstBillingDt("");
    setLastBillingDt("");
    setGSTNO("");
    setPANNO("");
    setGovtOrg("");
    setIsExport("");
    setCustFolderName("");
    setCustCurrent(false);
    setDelivery("");
    //  setCustContTeleData([]);
    setCustContactData([]);
  }

  // let dateconv = (da) => {
  //     let cdate = new Date(da);
  //     return cdate.getDay().toString().padStart(2, "0") + "/" + cdate.getMonth().toString().padStart(2, "0") + "/" + cdate.getFullYear();
  // }

  let addContactData = async () => {
    console.log("Add Contact Data");
    console.log(conName);
    if (conName.length > 0) {
      setCustContactData([
        ...custContactData,
        {
          id: custContactData.length + 1,
          conName,
          conDesignation,
          conDept,
          conE_mail,
          conTele_Office,
          conTele_Mobile,
        },
      ]);

      clearData();
    }
  };

  let updContactData = async () => {
    console.log("Update Contact Data ");
    console.log(custContactData.length);
    // if ((conName != null) || (conName != '')) {
    for (let i = 0; i < custContactData.length; i++) {
      if (conName == custContactData[i]["conName"]) {
        custContactData[i]["conDesignation"] = conDesignation;
        custContactData[i]["conDept"] = conDept;
        custContactData[i]["conE_mail"] = conE_mail;
        custContactData[i]["conTele_Office"] = conTele_Office;
        custContactData[i]["conTele_Mobile"] = conTele_Mobile;
      }
    }
    console.log(custContactData);
    // }
    clearData();
  };

  // Tele Data\
  // let addContTeleData = async () => {
  //     console.log(custContactData.conteleno)
  //    // if ((conteleno.length > 0)) {
  //         console.log("contact tele condition macthed")
  //         setCustContTeleData([...custContTeleData, { id: custContTeleData.length + 1, conteleno, conteletype }])
  //         clearTeleData();
  //     //}
  // }

  let clearData = () => {
    setBtnDel(true);
    setBtnUpd(true);
    setBtnNew(false);
    setContactName("");
    setDept("");
    setDesignation("");
    setCEmail("");
    setTele_Office("");
    setTele_Mobile("");
  };

  let selectItem = (item) => {
    setBtnDel(false);
    setBtnUpd(false);
    setBtnNew(true);
    //  setSelectedContId(item.Id);
    setContactName(item.conName ? item.conName : ".");
    setDept(item.conDept);
    setDesignation(item.conDesignation);
    setCEmail(item.conE_mail);
    setTele_Office(item.conTele_Office);
    setTele_Mobile(item.conTele_Mobile);
  };

  let removeContactData = async () => {
    let olddata = custContactData;
    console.log("Remove Contact");
    let newdata = olddata.filter(
      (data) =>
        data.conName !== conName &&
        data.conE_mail !== conE_mail &&
        data.conTele_Office !== conTele_Office
    );
    setCustContactData(newdata);
    clearData();
  };

  // let clearTeleData = () => {
  //      setContactName("")
  //     setTeleNo(0);
  //     setTeleType("");
  // }

  // let selectTeleItem = (item) => {
  //      setContactName(item.contactname)
  //     setTeleNo(item.conteleno)
  //     setTeleType(item.conteletype)
  // }

  // let removeCustTeleData = async () => {
  //     let olddata = custContTeleData
  //     let newdata = olddata.filter(data => (data.conteleno !== conteleno))
  //     setCustContTeleData(newdata)
  //     clearTeleData();
  // }

  const handleChangeNumeric = (e) => {
    const mvalue = e.target.value.replace(/[^0-9]/gi, "");
    if (e.target.value.length > 6) {
      alert("Pin Code Only 6 digits are allowed..");
      return;
    }

    setPinCode(mvalue);
  };

  const handleChangePhNo = (e) => {
    const mvalue = e.target.value.replace(/[^0-9 ]/gi, "");
    // mvalue = e.target.value.length > 15 ? e.target.value.substring(0, 15) : e.target.value;
    if (mvalue < 0) {
      alert("Contact No1 cannot be blank..");
    }
    setTele_Office(mvalue);
  };

  const handleChangePhNo1 = (e) => {
    const mvalue = e.target.value.replace(/[^0-9 ]/gi, "");
    //   mvalue = e.target.value.length > 15 ? e.target.value.substring(0, 15) : e.target.value;
    setTele_Mobile(mvalue);
  };

  const handleChangeAlpha = (e) => {
    const mvalue = e.target.value.replace(/[^A-Za-z ]/gi, "");
    if (mvalue.length < 0) {
      alert("Please enter valid name");
    } else {
      setContactName(mvalue);
    }
  };

  const chkgstpan = (e) => {
    console.log(e.target.value);

    if (e.target.value == "GST") {
      setGSTDisabled(false);
      setPANDisabled(true);
    } else if (e.target.value == "PAN") {
      console.log("PAN ");
      setGSTDisabled(true);
      setPANDisabled(false);
      console.log(gstdisabled);
      console.log(pandisabled);
    }
  };

  const valPanNo = (e) => {
    const mpanno = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
    //console.log(mpanno);
    // console.log(gstno);
    // if (((mpanno != '') || (mpanno != null)) && (gstno.length > 2)) {
    //     if (gstno.substring(2, (mpanno.length + 2)) !== mpanno) {
    //         alert('Please check GST No / PAN No');
    //         return;
    //     }
    // }
    setPANNO(mpanno);
  };

  const HandleGSTNo = (e) => {
    const avalue = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
    if (avalue.length > 15) {
      alert("Please enter valid GST No");
    } else {
      setGSTNO(avalue);
      setPANNO(avalue.substr(2, 10));
    }
  };

  const funccreditdays = (e) => {
    console.log("funccreditdays");
    const crdysvalue = e.target.value.replace(/[^0-9]/gi, "");

    setCreditDays(crdysvalue);
  };

  const funcmaxCredit = (e) => {
    console.log("funcmaxCredit");
    const crvalue = e.target.value.replace(/[^0-9.]/gi, "");
    if (crvalue < 0) {
      alert("Please enter positive value");
      return;
    }
    setMaxCredit(crvalue);
  };

  const valemail = (e) => {
    const vcemail = e.target.value.replace(/[^A-Za-z0-9.@]/gi, "");
    if (vcemail.includes("@@") || vcemail.includes("..")) {
      alert("Invalid Email Address...");
      return;
    }
    setCompEmail(vcemail);
  };

  const valconemail = (e) => {
    const vcnemail = e.target.value.replace(/[^A-Za-z0-9.@]/gi, "");
    if (vcnemail.includes("@@") || vcnemail.includes("..")) {
      alert("Invalid Email Address...");
      return;
    }
    setCEmail(vcnemail);
  };

  async function checkBranch(e) {
    const brhnm = e.target.value.replace(/[^A-Za-z0-9. -]/gi, "");
    setBranchName(brhnm);
  }

  let dummydata = [
    {
      label: "Alabama",

      population: 4780127,

      capital: "Montgomery",

      region: "South",
    },

    { label: "Alaska", population: 710249, capital: "Juneau", region: "West" },

    {
      label: "Arizona",

      population: 6392307,

      capital: "Phoenix",

      region: "West",
    },

    {
      label: "Arkansas",

      population: 2915958,

      capital: "Little Rock",

      region: "South",
    },
  ];

  return (
    <div>
      <Form onSubmit={updateCustomerData} autoComplete="off">
        <div>
          <h4 className="title">Customer Details</h4>

          <div className="row">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              {custdata.length > 0 ? (
                <select
                  className="ip-select"
                  controlId="CustName"
                  onChange={selectCust}
                >
                  <option value="" disabled selected>
                    {" "}
                    Select Customer
                  </option>
                  {custdata.map((cust) => {
                    return (
                      <option value={cust["Cust_Code"]}>
                        {cust["Cust_name"]}
                      </option>
                    );
                  })}
                </select>
              ) : (
                ""
              )}
            </div>

            <div className="col-md-4" controlId="branchName">
              <label className="form-label">Branch</label>
              <input
                type="text"
                id="custcode"
                onChange={checkBranch}
                value={branchName}
              />
            </div>
            <div className="col-md-4">
              <div className="row justify-content-space-between">
                <div className="col-md-4" controlId="custcode">
                  <label className="form-label">Code</label>
                  <input type="text" id="custcode" disabled value={custcode} />
                </div>
                <div className="col-md-8" controlId="compemail">
                  <label className="form-label">Email</label>
                  <input type="email" onChange={valemail} value={compemail} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4" controlId="city">
              <div controlId="city" style={{ marginBottom: "9px" }}>
                <label className="form-label">City</label>
                <input
                  type="text"
                  id="custcode"
                  onChange={(e) => setCustCity(e.target.value)}
                  value={custcity}
                />
              </div>
              <div style={{ marginBottom: "9px" }} controlId="pincode">
                <label className="form-label">Pincode</label>
                <input
                  type="number"
                  id="CustName"
                  maxLength="6"
                  onChange={(e) => handleChangeNumeric(e)}
                  value={pincode}
                  required
                />
              </div>
            </div>

            <div className="col-md-4" controlId="custaddress">
              <label className="form-label">Address</label>
              <textarea
                style={{ height: "110px" }}
                className="form-control"
                onChange={(e) => setCustAddress(e.target.value)}
                value={custaddress}
                required
              ></textarea>
            </div>
            <div className="col-md-4">
              <div style={{ marginBottom: "9px" }} controlId="country">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  id="custcode"
                  onChange={checkBranch}
                  value={branchName}
                />
              </div>
              <div style={{ marginBottom: "9px" }} controlId="custstate">
                <label className="form-label">State</label>
                {statedata.length > 0 ? (
                  <select
                    id="custstate"
                    className="ip-select"
                    controlId="CustName"
                    // style={{
                    //   flex: "0.90",
                    //   height: "30px",
                    //   fontFamily: "Roboto",
                    //   fontSize: "12px",
                    // }}
                    onChange={selectState}
                    value={custstateid}
                    required
                  >
                    {/* {(rawCustState.stateid != undefined || rawCustState == '') ?
                                                    <option value={rawCustState.StateId} selected>{rawCustState.State}</option>
                                                    :
                                                    <option value={custstateid} disabled selected>{custstate}</option>
                                                } */}
                    <option value="" disabled selected>
                      {" "}
                      Select State
                    </option>
                    {statedata.map((stat) => {
                      return (
                        <option
                          // style={{ fontFamily: "Roboto", fontSize: "12px" }}
                          value={stat["StateCode"]}
                        >
                          {stat["State"]}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4" controlId="crterms">
              <label className="form-label">Cr Terms</label>
              {crtermsdata.length > 0 ? (
                <select
                  className="ip-select"
                  controlId="CustName"
                  onChange={selectCrTerms}
                  required
                >
                  <option value={crterms} disabled selected>
                    {crterms}
                  </option>
                  {crtermsdata.map((crterm) => {
                    return (
                      <option value={crterm["PaymentTerm"]}>
                        {crterm["PaymentTerm"]}
                      </option>
                    );
                  })}
                </select>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-4" controlId="maxcredit">
              <label className="form-label">Max Credit</label>
              <input
                type="text"
                onChange={funcmaxCredit}
                value={maxcredit}
                required
              />
            </div>

            <div className="col-md-4" controlId="creditdays">
              <label className="form-label">Cr Days</label>
              <input type="text" onChange={funccreditdays} value={creditdays} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4" controlId="avepaydays">
              <label className="form-label">Avg Payment Days</label>
              <input
                disabled
                type="text"
                onChange={(e) => setAvePayDays(e.target.value)}
                value={avepaydays}
              />
            </div>
            <div className="col-md-4" controlId="firstbillingdt">
              <label className="form-label">First Billing</label>
              <input type="text" value={firstbillingdt} disabled />
            </div>
            <div className="col-md-4" controlId="lastbillingdt">
              <label className="form-label">Last Billing</label>
              <input type="text" value={lastbillingdt} disabled />
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <button
              className="button-style"
              id="btnSaveAllDetails"
              style={{ width: "206px" }}
              type="submit"
              // onClick={updateCustomerData()}
            >
              Save Customer Details
            </button>
            <button
              id="btncustupdateclose"
              className="button-style"
              style={{ width: "110px" }}
              onClick={() => navigate("/Customer")}
            >
              Close{" "}
            </button>
          </div>
        </div>

        <div className="p-2">
          <h4 className="form-title  mt-2">Commercial Info</h4>
          <hr className="horizontal-line" />

          <div className="row align-items-end">
            <div className="col-md-2">
              <label className="form-label">Select</label>
              <select className="ip-select" id="gstpan" onChange={chkgstpan}>
                <option value="">Select</option>
                <option value="GST">GST</option>
                <option value="PAN">PAN</option>
              </select>
            </div>
            <div className="col-md-3" controlId="gstno">
              <label className="form-label">GST Number</label>
              <input
                type="text"
                disabled={gstdisabled}
                maxLength={15}
                onChange={HandleGSTNo}
                value={gstno}
              />
            </div>
            <div className="col-md-2" controlId="panno">
              <label className="form-label">PAN Number</label>
              <input
                type="text"
                disabled={pandisabled}
                onChange={valPanNo}
                value={panno}
              />
            </div>
            <div className="col-md-3" controlId="govtorg">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  controlId="govtorg"
                  onChange={() => setGovtOrg(!govtorg)}
                  checked={govtorg}
                />
                <label
                  className="form-check-label checkBoxStyle"
                  htmlFor="flexCheckDefault"
                >
                  Is Government Organization
                </label>
              </div>
            </div>
            <div className="col-md-2" controlId="isexport">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  controlId="govtorg"
                  onChange={() => setIsExport(!isexport)}
                  checked={isexport}
                />
                <label
                  className="form-check-label checkBoxStyle"
                  htmlFor="flexCheckDefault"
                >
                  Is Export
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <label className="form-label">Folder Name</label>
              <input
                type="text"
                onChange={(e) => setCustFolderName(e.target.value)}
                value={custfoldername}
                required
              />
            </div>

            <div className="col-md-6">
              <div className="row align-items-end">
                <div className="col-md-5">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      controlId="custcurrent"
                      onChange={(e) => setCustCurrent(!custcurrent)}
                      checked={custcurrent}
                    />
                    <label
                      className="form-check-label checkBoxStyle"
                      htmlFor="flexCheckDefault"
                    >
                      Current
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <label className="form-label">Delivery</label>
                  {mtrlsourcedata.length > 0 ? (
                    <select
                      className="ip-select"
                      controlId="CustName"
                      onChange={selectMtrlSource}
                      value={delivery}
                    >
                      <option value="" disabled selected>
                        ** Select **
                      </option>
                      {mtrlsourcedata.map((mtlsrc) => {
                        return (
                          <option value={mtlsrc["MtrlSource"]}>
                            {mtlsrc["MtrlSource"]}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="row mt-2"
            style={{ marginLeft: "-3px", marginBottom: "50px" }}
          >
            {/* <NabTab /> */}
            <div className="p-2">
              <h4 className="form-title  mt-1">Contact Details</h4>
              <hr className="horizontal-line" />
              <div className="row">
                <div className="col-md-8">
                  <div
                    style={{
                      height: "520px",
                      overflowY: "scroll",
                      border: "solid #c0c4c2 1px",
                    }}
                  >
                    <Table striped className="table-data border">
                      <thead className="tableHeaderBGColor">
                        <tr className="custtr">
                          <th className="custtd">Name</th>
                          <th className="custtd">Designation</th>
                          <th className="custtd">Dept</th>
                          <th className="custtd">E Mail</th>
                          <th className="custtd">Contact No1</th>
                          <th className="custtd">Contact No2</th>
                        </tr>
                      </thead>
                      <tbody className="tablebody">
                        {custContactData.map((ccont) => {
                          return (
                            <tr
                              className="custtr"
                              key={ccont.id}
                              onClick={() => selectItem(ccont)}
                            >
                              <td className="custtd">{ccont.conName}</td>
                              <td className="custtd">{ccont.conDesignation}</td>
                              <td className="custtd">{ccont.conDept}</td>
                              <td className="custtd">{ccont.conE_mail}</td>
                              <td className="custtd">{ccont.conTele_Office}</td>
                              <td className="custtd">{ccont.conTele_Mobile}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="ip-box form-bg">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Name</label>
                          <input
                            className="in-field"
                            controlId="conName"
                            maxLength={30}
                            onChange={(e) => handleChangeAlpha(e)}
                            value={conName}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Designation</label>
                          <input
                            className="in-field"
                            controlId="conDesignation"
                            onChange={(e) => setDesignation(e.target.value)}
                            value={conDesignation}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Dept</label>
                          <input
                            className="in-field"
                            type="text"
                            controlId="conDept"
                            onChange={(e) => setDept(e.target.value)}
                            value={conDept}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Email</label>
                          <input
                            className="in-field"
                            controlId="conE_mail"
                            onChange={valconemail}
                            value={conE_mail}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Contact No 1</label>
                          <input
                            className="in-field"
                            type="text"
                            controlId="conTele_Office"
                            maxLength={15}
                            onChange={handleChangePhNo}
                            value={conTele_Office}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label className="">Contact No 2</label>
                          <input
                            className="in-field"
                            type="text"
                            controlId="conTele_Mobile"
                            maxLength={15}
                            onChange={handleChangePhNo1}
                            value={conTele_Mobile}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center  ">
                      <button
                        className="button-style mt-4 mb-4 "
                        style={{ width: "80px" }}
                        disabled={btnnew}
                        onClick={() => addContactData()}
                      >
                        New
                      </button>
                      <button
                        className="button-style mt-4 mb-4 "
                        style={{ width: "80px", marginLeft: "4px" }}
                        disabled={btnupd}
                        onClick={() => updContactData()}
                      >
                        Update
                      </button>
                      <button
                        className="button-style mt-4 mb-4"
                        style={{ width: "80px", marginLeft: "4px" }}
                        disabled={btndel}
                        onClick={() => removeContactData()}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ExistedCustomerInfo;
