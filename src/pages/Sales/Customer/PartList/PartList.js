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
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";

// import BreadcrumbsComponent from "../../components/BreadCumbsComponent";

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
  let [formcustpartid, setFormCustPartId] = useState("");
  let [formcustpartdesc, setFormCustPartDesc] = useState("");

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
        for (let i = 0; i < data.length; i++) {
          data[i].label = data[i].Cust_name;
        }
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
    console.log("cust data = ", evt);
    console.log("cust code = ", evt[0].Cust_Code);
    console.log("table customer = ", custarray);
    const cust = custarray.find(
      (cust) => cust["Cust_Code"] === evt[0].Cust_Code
    ); // custdet.substring(0, 4));
    console.log(cust);
    setSelectedCust(cust);
    setCustCode(cust["Cust_Code"]);

    clearAssydata();
    clearcustBOM();

    postRequest(
      endpoints.getCustBOMParts,
      { custcode: evt[0].Cust_Code },
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
      { custcode: evt[0].Cust_Code },
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
          // toast.error("PartId Already Exists for selected Customer");
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
    // console.log(selectedCust["Cust_Code"])
    // console.log(formcustpartid);
    let partid = formcustpartid;
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

  let selectedPart = (e) => {
    setFormCustPartId(e.target.value);
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
    let cstasmid = part["AssyCust_PartId"];
    postRequest(
      endpoints.custbomAssemblyParts,
      {
        custcode: selectedCust["Cust_Code"],
        custassyid: cstasmid, // part["AssyCust_PartId"],
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
    console.log(olddata);
    console.log(newdata);
    setCustPartDetails(newdata);
    postRequest(
      endpoints.DeleteBOMAssemblyPart,
      // { assmid, assmpartid },
      {olddata, newdata},
      (deldata) => {
        if (deldata.status == "success") {
          console.log("Delete Success");
        }
      }
    );
  };

 

  return (
    // <Container>
    //     <div className="addquotecard">
    //         {/* <Row className="justify-content-md-center"> */}
    //         <h4 className="addquotecard-header">Customer BOM</h4>
    <div>
      {/* <BreadcrumbsComponent /> */}
      <h4 className="title">Customer BOM</h4>

      <div className="form-style"></div>
      <Row>
        <Col xs={6} >
          <Form.Group  controlId="formCustName">
            <Form.Label>Customer
              </Form.Label>
              <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label> 
            {/* <Form.Select
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
            </Form.Select> */}
             <Typeahead
              id="basic-example"
              // onChange={selectCust}
              options={custarray}
              placeholder="Select Customer"
              // selected={selected}
              /*onInputChange={(label) => {
                  console.log("input change :", label);
                }}
                onChange={(label) => {
                  console.log("onchange :", label);
                }}*/
              onChange={(label) => handleCustChange(label)}
            />
          </Form.Group>
        </Col>
        <Col xs={3} style={{ display: "flex" }}>
          <Form.Group as={Row} controlId="formCustCode">
            <Form.Label>Code </Form.Label>
            <Form.Control disabled value={custcode} />
          </Form.Group>
        </Col>
        <Col xs={3}>
          <div style={{ marginTop: "24px" }}>
            <button
              className="button-style "
              id="btnclose"
              type="submit"
              onClick={() => navigate("/customer")}
            >
              Close{" "}
            </button>
          </div>
        </Col>
      </Row>
      <Row>
        <Tabs defaultActiveKey="bomitemslist" className="mb-1  tab_font mt-4">
          <Tab
            eventKey="bomitemslist"
            title="Customer BOM Items List"
            style={{ padding: 0, marginRight: "20px" }}
          >
            <Container fluid style={{ padding: 0, marginRight: "20px" }}>
              <Row>
                <Col xs={8} style={{ overflowY: "scroll", height: "300px" }}>
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor tablebody">
                      <tr>
                        <th>Magod Part ID</th>
                        <th>Part ID</th>
                        <th>Part Description</th>
                      </tr>
                    </thead>
                    <tbody className="tablebody">
                      {custbomparts != null
                        ? custbomparts.map((part) => renderBomItemList(part))
                        : null}
                    </tbody>
                  </Table>
                </Col>
                <Col xs={4}>
                  <Form onSubmit={addBOMPart} autoComplete="off">
                    <Form.Text>
                      <u>Part as identified in Customer Drawing</u>
                    </Form.Text>
                    <Form.Group className="mb-2" controlId="formpartid">
                      <Form.Label>Part ID 
                       </Form.Label>
                       <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Part ID"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formpartdesc">
                      <Form.Label>Part Description
                      </Form.Label>
                      <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Part Description"
                        required
                      />
                    </Form.Group>
                    <button
                      variant="primary"
                      type="submit"
                      className="button-style justify-content-center"
                    >
                      Add Part
                    </button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Tab>

          <Tab eventKey="custpartassmlist" title="Customer Assembly List">
            <Row>
              <Col xs={8} style={{ maxHeight: "500px", overflowY: "scroll" }}>
                <Table striped className="table-data border">
                  <thead className="tableHeaderBGColor tablebody">
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
                  <tbody className="tablebody">
                    {custassydetails != null
                      ? custassydetails.map((part, id) =>
                          renderassemblydetails(part, id)
                        )
                      : null}
                  </tbody>
                </Table>
              </Col>
              <Col xs={4}>
                <Form onSubmit={addAssemblyDetails} autoComplete="off">
                  <Form.Text>
                    <u>Part / Assembly Details</u>
                  </Form.Text>
                  <Form.Group
                    controlId="formmagodid"
                  >
                    <Form.Label>Magod ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Magod ID"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formassyid"
                    
                  >
                    <Form.Label>Assembly ID
                  
                    </Form.Label>
                    <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                    
                    <Form.Control
                      type="text"
                      placeholder="Enter Assembly ID"
                      required
                    />
                  </Form.Group>

                  {/* <Row> */}
                  <Form.Group  controlId="formdescription">
                    <Form.Label>Description
                  
                    </Form.Label>
                    <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </Form.Group>
                  <Form.Group  controlId="formstatus">
                  
                    <Form.Label>Status
                    
                    </Form.Label>
                    <Form.Label
                        style={{
                          color: "#f20707",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </Form.Label>
                   
                    <Form.Select
                      className="ip-select"
                      id="formstatus"
                      aria-label="Select Status"
                    >
                      <option selected>Select Status</option>
                      {["Create", "Edit", "Locked", "Closed"].map((st) => {
                        return <option value={st}>{st}</option>;
                      })}
                    </Form.Select>
                  </Form.Group>
                  {/* </Row> */}

                  {/* <Row> */}
                  <Form.Group as={Row} controlId="formmtrlcost">
                    <Form.Label>Mtrl Cost</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mtrl Cost" />
                  </Form.Group>

                  <Form.Group as={Row} className="mb-1" controlId="formjwcost">
                    <Form.Label>Labour Cost</Form.Label>
                    <Form.Control type="text" placeholder="Enter Labour Cost" />
                  </Form.Group>
                  {/* </Row> */}
                  <div>
                    <Form.Group className="mb-1" style={{ marginLeft: "25px" }}>
                      <div className="justify-content-center">
                        <button
                          className="button-style"
                          variant="primary"
                          disabled={btnaddnew}
                          type="submit"
                          style={{
                            width: "110px",
                          }}
                        >
                          Add New
                        </button>
                        <button
                          className="button-style"
                          variant="primary"
                          disabled={btnupdate}
                          style={{
                            width: "110px",
                          }}
                          onClick={updateAssembly}
                        >
                          Update
                        </button>
                        <button
                          className="button-style"
                          variant="primary"
                          style={{
                            width: "110px",
                          }}
                          onClick={() => {
                            saveBomAssemblyParts();
                          }}
                        >
                          Save{" "}
                        </button>
                      </div>
                    </Form.Group>
                  </div>
                </Form>
              </Col>
            </Row>
            <h4 className="form-title  mt-2">Bill of Materials (BOM)</h4>
            <hr className="horizontal-line" />
            <Row>
              <Col xs={7} style={{ maxHeight: "230px", overflowY: "scroll" }}>
                <div style={{ overflowY: "scroll" }}>
                  <Table striped className="table-data border">
                    <thead className="tableHeaderBGColor tablebody">
                      <tr>
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
              </Col>
              <Col xs={5}>
                <Form onSubmit={addCustPart} autoComplete="off">
                  <Form.Text>
                    <u>Part Details</u>
                  </Form.Text>
                  <Form.Group as={Row} controlId="formcustpartid">
                  <Form.Label>
                        Part ID{" "}       </Form.Label>
                      
                    <Form.Select
                      className="ip-select"
                      aria-label="Select Customer Part ID"
                      onChange={selectedPart}
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
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formqty">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control type="number" placeholder="Enter Quantity" min="0"/>
                  </Form.Group>

                  <div className="row mt-4 mb-4 justify-content-center">
                    <button
                      className="button-style"
                      variant="primary"
                      type="submit"
                      style={{ width: "200px" }}
                      disabled={btnasmprtnew}
                    >
                      Add Assm Parts{" "}
                    </button>
                    <button
                      className="button-style"
                      variant="primary"
                      style={{ width: "200px" }}
                      disabled={btnasmprtdel}
                      onClick={deleteassmparts}
                    >
                      Delete Assm Parts{" "}
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
            {/* </Container> */}
          </Tab>
        </Tabs>
      </Row>
    </div>
    // </Container>
  );
}

export default PartList;
