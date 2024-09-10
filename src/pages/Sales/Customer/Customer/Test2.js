import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Container,
  Form,
  FormLabel,
  Button,
  FormControl,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavTab from "./components/NavTab";
import { toast } from "react-toastify";

//getCustomers, bompartsCustomer, assyPartCustomer, assyInsertPartCustomer,
const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function PartList() {
  //  const alert = useAlert();
  let navigate = useNavigate();
  //    console.log("CustPartListPage");

  const [custarray, setCustArray] = useState([]);
  const [selectedCust, setSelectedCust] = useState({});
  const [custcode, setCustCode] = useState("");
  const [custName, setCustName] = useState("");
  const [custbomparts, setCustBomParts] = useState([]);

  const [custassydetails, setCustAssyDetails] = useState([]);

  const [selectedCustAssy, setSelectedCustAssy] = useState({});

  const [custpartdetails, setCustPartDetails] = useState([]);
  let [selectedAssyCustId, setSelectedAssyCustId] = useState("");

  let [formpartid, setFormPartId] = useState("");
  let [formpartdesc, setFormPartDesc] = useState("");

  let [assmpartid, setAssmPartId] = useState("");
  let [assmid, setAssmId] = useState("");
  let [selectedPartId, setSelectedPartId] = useState("");
  let [btnaddnew, setBtnAddNew] = useState(false);
  let [btnupdate, setBtnUpdate] = useState(true);
  let [btnasmprtnew, setBtnAsmPrtNew] = useState(false);
  let [btnasmprtdel, setBtnAsmPrtDel] = useState(true);

  // let [formdescription,setFormDescription] = useState("");
  // let [formmtrlcost, setFormMtrlCost] = useState("");
  // let [formjwcost, setFormJwCost] = useState("");
  // let [status, setStatus] = useState("");

  // setFormMtrlCost("");
  // setStatus("** Select ***");

  useEffect(() => {
    setBtnAddNew(false);
    setBtnUpdate(true);
    setBtnAsmPrtNew(true);
    setBtnAsmPrtDel(true);
    async function getCustomersData() {
      postRequest(endpoints.getCustomers, {}, (data) => {
        setCustArray(data);
      });
    }
    getCustomersData();
    // getCustomers((data) => {
    //     setCustArray(data);
    // });
  }, []);

  // const handleCustChange = async (e) => {
  //     const cust = custarray.find((cust) => cust["Cust_Code"] === e.target.value);
  //     console.log(cust);
  //     setSelectedCust(cust);
  //     postRequest(endpoints.assyPartCustomer, { custcode: cust["Cust_Code"] }, (data) => {
  //         // assyPartCustomer({ custcode: cust["Cust_Code"] }, (data) => {
  //         if (data.length > 0) {
  //             setCustAssyDetails(data);
  //         } else {
  //             setCustAssyDetails([]);
  //         }
  //     });
  // };

  let handleCustChange = async (evt) => {
    // let custdet = evt.target.value.replace(/[^A-Za-z0-9. ]/gi, "");
    // if ((custdet.includes("..")) || (custdet == null) || (custdet == "")) {
    //     alert('Please enter Customer Name ..');
    //     return;
    // }

    // let cdet = custdet.substring(0, 4)
    // console.log(cdet);
    // setCustCode(custdet.substring(0, 4));

    const cust = custarray.find(
      (cust) => cust["Cust_Code"] === evt.target.value
    ); // custdet.substring(0, 4));
    console.log(cust);
    setSelectedCust(cust);
    setCustCode(cust["Cust_Code"]);

    clearAssydata();
    clearcustBOM();

    postRequest(
      endpoints.getCustBOMParts,
      { custcode: evt.target.value },
      (partsdata) => {
        console.log(partsdata);
        if (partsdata.length > 0) {
          setCustBomParts(partsdata);
        } else {
          setCustBomParts([]);
        }
      }
    );
    postRequest(
      endpoints.assyPartCustomer,
      { custcode: evt.target.value },
      (data) => {
        // assyPartCustomer({ custcode: cust["Cust_Code"] }, (data) => {

        if (data.length > 0) {
          setCustAssyDetails(data);
        } else {
          setCustAssyDetails([]);
        }
      }
    );
    // postRequest(endpoints.custbomAssemblyParts, { custcode: evt.target.value }, (data) => {
    //     bompartsCustomer({ custcode: cust["Cust_Code"] }, (data) => {
    //     if (data.length > 0) {
    //         console.log(data)
    //         setCustPartDetails(data);
    //     } else {
    //         setCustPartDetails([]);
    //     }
    // });

    postRequest(
      endpoints.getCustBOMParts,
      { custcode: cust["Cust_Code"] },
      (partsdata) => {
        console.log(partsdata);
        if (partsdata.length > 0) {
          setCustBomParts(partsdata);
        } else {
          setCustBomParts([]);
        }
      }
    );
    // postRequest(endpoints.assyPartCustomer, { custcode: cust["Cust_Code"] }, (data) => {
    //     // assyPartCustomer({ custcode: cust["Cust_Code"] }, (data) => {
    //     if (data.length > 0) {
    //         setCustAssyDetails(data);
    //     } else {
    //         setCustAssyDetails([]);
    //     }
    // });
    postRequest(
      endpoints.custbomAssemblyParts,
      { custcode: cust["Cust_Code"] },
      (data) => {
        // bompartsCustomer({ custcode: cust["Cust_Code"] }, (data) => {
        if (data.length > 0) {
          console.log(data);
          setCustPartDetails(data);
        } else {
          setCustPartDetails([]);
        }
      }
    );
  };

  const addBOMPart = async (e) => {
    e.preventDefault();
    let partid = e.target.elements.formpartid.value;
    let partdesc = e.target.elements.formpartdesc.value;
    if (!partid || !partdesc) {
      toast.error("Please enter part id and description");
      return;
    }
    if (!selectedCust["Cust_name"]) {
      toast.error("Please select a customer");
      return;
    }

    postRequest(
      endpoints.saveCustBOMParts,
      {
        partid: partid,
        partdescription: partdesc,
        custcode: selectedCust["Cust_Code"],
      },
      (response) => {
        if (response.status == "Success") {
          setCustBomParts((olddata) => [
            ...olddata,
            {
              partid: partid,
              partdesc: partdesc,
              magodpartid: response["MagodPartId"],
            },
          ]);
          toast.success("Added Part Successfully..");
          clearcustBOM();
          postRequest(
            endpoints.getCustBOMParts,
            { custcode: selectedCust["Cust_Code"] },
            (partsdata) => {
              console.log(partsdata);
              if (partsdata.length > 0) {
                setCustBomParts(partsdata);
              } else {
                setCustBomParts([]);
              }
              clearcustBOM();
            }
          );
        } else {
          toast.error("Duplicate Part Id for this Customer..");
          return;
        }
        clearcustBOM();
      }
    );
    clearcustBOM();
    console.log(custbomparts);
  };

  function clearcustBOM() {
    setFormPartId("");
    setFormPartDesc("");
  }

  function clearAssydata() {
    document.getElementById("formmagodid").value = "";
    document.getElementById("formassyid").value = "";
    document.getElementById("formdescription").value = "";
    document.getElementById("formstatus").value = "";
    document.getElementById("formmtrlcost").value = "";
    document.getElementById("formjwcost").value = "";
  }

  const addAssemblyDetails = async (e) => {
    e.preventDefault();
    console.log(e.target.elements.formstatus.value);
    let assyid = e.target.elements.formassyid.value;
    let formdescription = e.target.elements.formdescription.value;
    let assmstatus = e.target.elements.formstatus.value;
    let formmtrlcost = e.target.elements.formmtrlcost.value;
    let formjwcost = e.target.elements.formjwcost.value;
    // setCustAssyDetails((custassydetails => [custassydetails,{"MagodCode": resp["magodassmid"], "AssyCust_PartId": assyid, "AssyDescription": formdescription, "MtrlCost": formmtrlcost, "JobWorkCost": formjwcost, assystatus: assmstatus}]));
    setBtnAsmPrtNew(false);
    setBtnAsmPrtDel(true);

    clearcustAssydata(e);
    if (!selectedCust["Cust_name"]) {
      toast.error("Please select a customer");
      return;
    }
    postRequest(
      endpoints.chkAssyDupl,
      { custcode: selectedCust["Cust_Code"], partid: assyid },
      (data) => {
        if (data.status == "Duplicate") {
          toast.error("PartId Already Exists for selected Customer");
          return;
        } else {
          postRequest(
            endpoints.assyInsertPartCustomer,
            {
              custcode: selectedCust["Cust_Code"],
              partid: assyid,
              partdescription: formdescription,
              mtrlcost: formmtrlcost,
              jwcost: formjwcost,
              assystatus: "Edit",
            },
            (resp) => {
              console.log(resp);
              setCustAssyDetails((olddata) => [
                ...olddata,
                {
                  MagodCode: resp["magodassmid"],
                  AssyCust_PartId: assyid,
                  AssyDescription: formdescription,
                  MtrlCost: formmtrlcost,
                  JobWorkCost: formjwcost,
                  assystatus: assmstatus,
                },
              ]);
            }
          );
        }
      }
    );
  };

  const clearcustAssydata = (e) => {
    setBtnAddNew(false);
    setBtnUpdate(true);
    console.log("Clearing Assy Data ");
    e.target.elements.formassyid.value = "";
    e.target.elements.formdescription.value = "";
    e.target.elements.formstatus.value = "";
    e.target.elements.formmtrlcost.value = "";
    e.target.elements.formjwcost.value = "";
  };

  const addCustPart = async (e) => {
    e.preventDefault();
    setBtnAsmPrtDel(true);
    setBtnAsmPrtNew(false);
    if (!selectedCustAssy["AssyCust_PartId"]) {
      toast.error("Please select an assembly");
      return;
    }
    let selcustassy = selectedCustAssy["AssyCust_PartId"];
    let partid = e.target.elements.formcustpartid.value;
    let qty = e.target.elements.formqty.value;
    if (!partid || !qty) {
      toast.error("Please enter part id and qty");
      return;
    }
    if (!selectedCust["Cust_name"]) {
      toast.error("Please select a customer");
      return;
    }
    let partdesc = custbomparts.find((part) => part["PartId"] === partid)[
      "PartDescription"
    ];

    for (let i = 0; i < custpartdetails.length; i++) {
      if (custpartdetails[i].partid == partid) {
        //     setCustPartDetails((olddata => [...olddata, { assyPartId: selectedCustAssy["AssyCust_PartId"], partid: partid, partdesc: partdesc, qty: qty }]));
        // }
        // else{
        toast.error("Duplicate Part Id.. Please check..");
        return;
      }
    }
    // if (custpartdetails.find((part) => part["assyPartId"] === selectedCustAssy["AssyCust_PartId"])) {
    //     alert("Part already added");
    //     return;
    // }
    console.log("Part id : " + partid);
    if (partid !== null || partid !== "") {
      //setCustPartDetails((olddata => [...olddata, { assyPartId: selectedCustAssy["AssyCust_PartId"], partid: partid, partdesc: partdesc, qty: qty }]));
      setCustPartDetails((olddata) => [
        ...olddata,
        {
          assyPartId: selcustassy,
          partid: partid,
          partdesc: partdesc,
          qty: qty,
        },
      ]);

      console.log(custpartdetails);
    }
  };

  let renderBomItemList = (part) => {
    return (
      <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {part["MagodPartId"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {part["PartId"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {part["PartDescription"]}
        </td>
      </tr>
    );
  };

  let renderassemblydetails = (assmpart, id) => {
    return (
      <tr
        className="custtr"
        style={{
          // backgroundColor: selectedAssyCustId === id ? "#969393" : "",
          backgroundColor: selectedAssyCustId === id ? "#98A8F8" : "",
          fontFamily: "Roboto",
          fontSize: "12px",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => selectAssemblyPart(assmpart, id)}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {assmpart["MagodCode"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {assmpart["AssyCust_PartId"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {assmpart["AssyDescription"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {assmpart["MtrlCost"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {assmpart["JobWorkCost"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
          hidden
        >
          {assmpart["Status"]}
        </td>
      </tr>
    );
  };

  let rendercustpartdetail = (custpart, id) => {
    return (
      <tr
        className="custtr"
        style={{
          // backgroundColor: selectedPartId === id ? "#969393" : "",
          backgroundColor: selectedPartId === id ? "#98A8F8" : "",
          overflowY: "scroll",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => selectItem(custpart, id)}
      >
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {custpart["assyPartId"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {custpart["partid"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {custpart["partdesc"]}
        </td>
        <td
          className="custtd"
          style={{ fontFamily: "Roboto", fontSize: "12px" }}
        >
          {custpart["qty"]}
        </td>
      </tr>
    );
  };

  let selectAssemblyPart = (part, id) => {
    setBtnAddNew(true);
    setBtnUpdate(false);
    setBtnAsmPrtDel(true);
    setBtnAsmPrtNew(false);
    setSelectedAssyCustId(id);
    document.getElementById("formmagodid").value = part["MagodCode"];
    document.getElementById("formassyid").value = part["AssyCust_PartId"];
    document.getElementById("formdescription").value = part["AssyDescription"];
    document.getElementById("formmtrlcost").value = part["MtrlCost"];
    document.getElementById("formjwcost").value = part["JobWorkCost"];
    document.getElementById("formstatus").value = "Create"; // part["Status"];
    console.log(part["Status"]);
    setSelectedCustAssy(part);
    console.log(part["AssyCust_PartId"]);
    postRequest(
      endpoints.custbomAssemblyParts,
      {
        custcode: selectedCust["Cust_Code"],
        custassyid: part["AssyCust_PartId"],
      },
      (resp) => {
        console.log("custbomassemblyParts : " + resp.length);
        //    if(resp.length > 0) {
        //         if(resp.partid != null){
        setCustPartDetails(resp);
        //     }

        //     console.log(custPartDetails)
        // }
      }
    );
  };

  const updateAssembly = (e) => {
    setBtnAddNew(false);
    setBtnUpdate(true);
    let mmagodid = document.getElementById("formmagodid").value;
    let assmstatus = document.getElementById("formstatus").value;
    let assmdesc = document.getElementById("formdescription").value;
    let mtrlcost = document.getElementById("formmtrlcost").value;
    let jobworkcost = document.getElementById("formjwcost").value;
    postRequest(
      endpoints.UpdateBOMAssembly,
      { mmagodid, assmstatus, assmdesc, mtrlcost, jobworkcost },
      (data) => {
        if (data.status == "success") {
          toast.success("Updated Assembly Details Successfully");
        }
      }
    );
  };

  let saveBomAssemblyParts = async () => {
    setBtnAddNew(false);
    setBtnUpdate(true);
    console.log("saveBomAssemblyParts");
    console.log(custpartdetails);
    postRequest(
      endpoints.bomAssemblyParts,
      { custcode: selectedCust["Cust_Code"], dataarray: custpartdetails },
      (resp) => {
        //  bomAssemblyParts({

        //  }, (resp) => {
        if (resp.status == "success") {
          toast.success("Bom Assembly Parts saved successfully");
          //    window.location.reload();
        }
        //       console.log(resp);
      }
    );
  };

  let selectItem = (item, id) => {
    setBtnAsmPrtDel(false);
    setBtnAsmPrtNew(true);
    setSelectedPartId(id);
    setAssmPartId(item.partid);
    setAssmId(item.assyPartId);
  };

  let deleteassmparts = async () => {
    setBtnAsmPrtDel(true);
    setBtnAsmPrtNew(false);
    let olddata = custpartdetails;
    let newdata = olddata.filter(
      (data) => data.assyid !== assmid && data.partid != assmpartid
    );
    setCustPartDetails(newdata);
    postRequest(
      endpoints.DeleteBOMAssemblyPart,
      { assmid, assmpartid },
      (deldata) => {
        if (deldata.status == "success") {
          console.log("Delete Success");
        }
      }
    );
  };

  return (
    <div>
      <h4 className="title">Customer BOM</h4>
      {/* <hr className="horizontal-line" /> */}

      <div className="row">
        <div className="col-md-6 ">
          <label className="form-label">Customer</label>
          <select
            className="ip-select mt-1"
            size="sm"
            aria-label="Select Customer"
            onChange={(e) => {
              handleCustChange(e);
            }}
          >
            <option selected disabled>
              Select Customer
            </option>
            {custarray.length > 0
              ? custarray.map((cust) => {
                  return (
                    <option value={cust["Cust_Code"]}>
                      {cust["Cust_name"]}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className="col-md-2">
          <Form.Group controlId="formCustCode">
            <label className="form-label">Code </label>
            <input disabled value={custcode} />
          </Form.Group>
        </div>
        <div className="col-md-3">
          <button
            id="btnclose"
            type="submit"
            className="button-style"
            onClick={() => navigate("/customer")}
          >
            Close{" "}
          </button>
        </div>
      </div>

      {/* <NavTab /> */}

      <div className="row mt-4">
        <Tabs defaultActiveKey="bomitemslist" className="mb-1  tab_font mt-4">
          <Tab eventKey="bomitemslist" title="Customer Parts List">
            <div className="row">
              <div className="col-md-8 mt-3">
                {/* <Table border="1" cellpadding="0" cellspacing="0" width="200px" border-collapse="collapse" border-Color="#000000"> */}

                <div
                  style={{
                    height: "280px",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        <th>Magod Part ID</th>
                        <th>Part ID</th>
                        <th>Part Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {custbomparts != null
                        ? custbomparts.map((part) => renderBomItemList(part))
                        : null}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-4">
                <Form onSubmit={addBOMPart} autoComplete="off">
                  <Form.Text>
                    <u>Part as identified in Customer Drawing</u>
                  </Form.Text>
                  <Form.Group className="mb-2" controlId="formpartid">
                    <Form.Label>Part ID </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Part ID"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formpartdesc">
                    <Form.Label>Part Description </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Part Description"
                      required
                    />
                    {/* <input className='' type="text" name="formpartid" required /> */}
                  </Form.Group>
                  <button
                    variant="primary"
                    className="button-style"
                    type="submit"
                  >
                    Add Part
                  </button>
                </Form>
              </div>
            </div>
          </Tab>
          <Tab eventKey="custpartassmlist" title="Customer Assembly List">
            <div className="row">
              <div className="col-md-8 mt-3">
                <div
                  style={{
                    height: "470px",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr>
                        {[
                          "Magod Code",
                          "Assm Cust PartID",
                          "Assm Description",
                          "Mtrl Cost",
                          "JW Cost",
                        ].map((item) => {
                          return <th>{item}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {custassydetails != null
                        ? custassydetails.map((part, id) =>
                            renderassemblydetails(part, id)
                          )
                        : null}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-4">
                <Form onSubmit={addAssemblyDetails} autoComplete="off">
                  <Form.Text>
                    <u>Part / Assembly Details</u>
                  </Form.Text>
                  <Form.Group
                    as={Row}
                    controlId="formmagodid"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Magod ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Magod ID"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formassyid"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Assembly ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Assembly ID"
                      required
                    />
                  </Form.Group>

                  {/* <Row> */}
                  <Form.Group
                    as={Row}
                    controlId="formdescription"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" />
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    controlId="formstatus"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Status</Form.Label>
                    <select
                      className="ip-select dropdown-field"
                      id="formstatus"
                      aria-label="Select Status"
                    >
                      <option selected>Select Status</option>
                      {["Create", "Edit", "Locked", "Closed"].map((st) => {
                        return <option value={st}>{st}</option>;
                      })}
                    </select>
                  </Form.Group>
                  {/* </Row> */}

                  {/* <Row> */}
                  <Form.Group
                    as={Row}
                    controlId="formmtrlcost"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Mtrl Cost</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mtrl Cost" />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-1"
                    controlId="formjwcost"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Labour Cost</Form.Label>
                    <Form.Control type="text" placeholder="Enter Labour Cost" />
                  </Form.Group>
                  {/* </Row> */}
                  <div>
                    <Form.Group className=" row justify-content-center mt-4 mb-4">
                      <button
                        variant="primary"
                        disabled={btnaddnew}
                        type="submit"
                        className="button-style"
                        style={{ width: "100px" }}
                      >
                        Add New
                      </button>
                      <button
                        variant="primary"
                        disabled={btnupdate}
                        className="button-style"
                        onClick={updateAssembly}
                        style={{ width: "100px" }}
                      >
                        Update
                      </button>
                      <button
                        variant="primary"
                        className="button-style"
                        onClick={() => {
                          saveBomAssemblyParts();
                        }}
                        style={{ width: "100px" }}
                      >
                        Save{" "}
                      </button>
                    </Form.Group>
                  </div>
                </Form>
              </div>
            </div>
            <div className="row">
              <h4 className="form-title  mt-1">Bill of Materials (BOM)</h4>
              <hr className="horizontal-line" />
              <div className="col-md-8 mt-3">
                <div style={{ overflowY: "scroll", height: "200px" }}>
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor">
                      <tr className="custtr">
                        {["Assm PartId", "Part ID", "Description", "Qty"].map(
                          (item) => {
                            return <th>{item}</th>;
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody className="tablebody">
                      {custpartdetails != null
                        ? custpartdetails.map((part, id) =>
                            rendercustpartdetail(part, id)
                          )
                        : null}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="col-md-4" xs={5}>
                <Form onSubmit={addCustPart} autoComplete="off">
                  <Form.Text>
                    <u>Part Details</u>
                  </Form.Text>
                  <Form.Group
                    as={Row}
                    controlId="formcustpartid"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Part ID</Form.Label>
                    <select
                      className="ip-select dropdown-field"
                      aria-label="Select Customer Part ID"
                    >
                      <option selected disabled>
                        Select Customer Part ID
                      </option>
                      {custbomparts.length > 0
                        ? custbomparts.map((part1) => {
                            return (
                              <option value={part1.PartId}>
                                {part1.PartId} - {part1.PartDescription}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    controlId="formqty"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Oty</Form.Label>
                    <Form.Control type="text" placeholder="Enter Quantity" />
                  </Form.Group>

                  <Row className="mt-1">
                    <div className="row justify-content-center mt-2 mb-5">
                      <Form.Group style={{ marginLeft: "40px" }}>
                        <button
                          type="submit"
                          className="button-style"
                          disabled={btnasmprtnew}
                        >
                          Add Assm Parts{" "}
                        </button>
                        <button
                          className="button-style"
                          disabled={btnasmprtdel}
                          onClick={deleteassmparts}
                        >
                          Delete Assm Parts{" "}
                        </button>
                      </Form.Group>
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
            {/* </Container> */}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default PartList;
