import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Table,
  Row,
  Col,
  Button,
  FormLabel,
} from "react-bootstrap";
// import BreadcrumbsComponent from "../../components/BreadCumbsComponent";
import { toast } from "react-toastify";
import AlertModal from "../../../../pages/components/alert";

const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function CreateCustomer() {
  //  const alert = useAlert()
  // let navigate = useNavigate();
  let modcust = {};
  // let modcustname = "";

  let [alertModal, setAlertModal] = useState(false);

  let [saved, setSaved] = useState(false);
  let [custdetdata, setCustDetdata] = useState([]);
  let [custdetdatafiltered, setCustDetdatafiltered] = useState([]);
  let [loaded, setLoaded] = useState(false);

  // Form data
  let [selectedCustomerId, setSelectedCustomerId] = useState("");
  let [newCustName, setNewCustName] = useState("");
  let [branchName, setBranchName] = useState("");
  let [custcode, setCustCode] = useState("");
  let [respo, setRespo] = useState("");
  let [modcustname, setModcustname] = useState("");

  useEffect(() => {
    async function getCustomersdata() {
      postRequest(endpoints.getCustomers, {}, (custdetdata) => {
        setCustDetdata(custdetdata);
        setCustDetdatafiltered(custdetdata);
        setLoaded(true);
      });
    }
    getCustomersdata();
  }, []);

  let rendertable = (cust, id) => {
    // console.log(cust);
    return (
      <tr
        className="custtr"
        style={{
          backgroundColor: selectedCustomerId === id ? "#98A8F8" : "",
          fontFamily: "Roboto",
          fontSize: "12px",
          cursor: "pointer",
        }}
        id={id}
        onClick={() => {
          custselector(cust, id);
        }}
      >
        <td className="custtd">{cust["Cust_Code"]}</td>
        <td className="custtd">{cust["Cust_name"]}</td>
        <td className="custtd">{cust["Branch"]}</td>
      </tr>
    );
  };

  async function valCustName(e) {
    let cname = e.target.value.replace("^[A-Za-Z0-9 ");
    setNewCustName(cname);
  }

  // const GetAlert = () => {
  //   alert("customer created");
  // };

  let custselector = (cust, id) => {
    console.log(cust);
    setSelectedCustomerId(id);
    setNewCustName(cust["Cust_name"]);
    setBranchName(cust["Branch"]);
    setCustCode(cust["Cust_Code"]);
    localStorage.setItem("LazerCustExist", JSON.stringify(cust));
  };

  let csavedata = async () => {
    let custsavedata = {
      customerName: newCustName,
      branchName: branchName,
      custCode: custcode,
    };
    localStorage.setItem("LazerCustomer", JSON.stringify(custsavedata));
  };

  async function searchCustomer(e) {
    let sarray = [];

    // {custdetdata
    //     .filter(name => name.match(new RegExp(e.target.value.toLowerCase(), "i")))
    //     .map(name => {
    //         sarray.push(element);
    //     //  return <li key={Cust_name}>{Cust_name} </li>
    //     })}

    custdetdata.forEach((element) => {
      let sstring = element["Cust_name"].toLowerCase();
      if (sstring.startsWith(e.target.value.toLowerCase())) {
        // .includes(e.target.value.toLowerCase())) {
        sarray.push(element);
      }
    });
    //   console.log(sarray);
    if (sarray.length > 0) {
      setCustDetdatafiltered(sarray);
    }
    setNewCustName(e.target.value);
  }

  async function checkBranch(e) {
    e.preventDefault();
    let branName = e.target.value.replace(/[^A-Za-z0-9. -]/g, "");
    //   let branName = e.target.elements.branchName.value.replace(/[^A-Za-z0-9. -]/g, "");
    // if ((branchName === null) || (branchName === "") || (branchName.replaceAll(" ", "") === "")){
    //     alert('Branch Name cannot be blank');
    //     return;
    // }
    //   const brhname = e.target.elements.value.replace(/[^A-Za-z0-9. -]/g, "")
    setBranchName(branName);
  }
  let secbtnc = () => {
    setAlertModal(false);
  };

  let fstbtnc = () => {
    window.location.href = "/Customer/CustomerInfo";
  };
  async function submitSave(e) {
    e.preventDefault();
    let newCustName = e.target.elements.newCustName.value;
    let branchName = e.target.elements.branchName.value;
    var spformat = /[!@#$%^*_+\-=\[\]{};:"\\|,<>\/?]+/;

    if (
      newCustName === null ||
      newCustName === "" ||
      newCustName.replaceAll(" ", "") === "" ||
      newCustName.match(spformat)
    ) {
      //  alert.show('Customer Name cannot be blank or contain special characters', {type: 'error'}, {timeout: 5000}, {position: 'top center'}, {offset: '50px'}, {transition: 'scale'}, {containerStyle: {zIndex: 100}}, {containerClassName: 'alert-container'}, {theme: 'light'}, {closeCopy: 'Close'}, {progressCopy: 'Loading...'}, {progressDuration: 3000}, {progressClassName: 'alert-progress-bar'}, {progressStyle: {backgroundColor: 'red'}}, {closeStyle: {color: 'red'}}, {closeClassName: 'alert-close-button'},);
      toast.error("Customer Name cannot be blank or have special characters");
      return;
    }
    // if ((branchName === null) || (branchName === "") || (branchName.replaceAll(" ", "") === "")){
    //     alert('Branch Name cannot be blank');
    //     return;
    // }
    if (custdetdatafiltered.length > 0) {
      console.log("custdetdatafiltered");
      console.log(custdetdatafiltered);
      for (let i = 0; i < custdetdatafiltered.length; i++) {
        //if((custdetdatafiltered[i]["Cust_name"]==newCustName) && (custdetdatafiltered[i]["Branch"]==branchName)){
        if (custdetdatafiltered[i]["Cust_name"] == newCustName) {
          console.log(custdetdatafiltered[i]);
          toast.error("Already Exists");
          localStorage.setItem(
            "LazerCustExist",
            custdetdatafiltered[i]["Cust_Code"]
          );
          window.location.href = "/Customer/CustomerInfo";
          // return;
        }
      }
    }

    let secbtnc = () => {
      setAlertModal(false);
    };

    let fstbtnc = () => {
      window.location.href = "/Customer/CustomerInfo";
    };

    await csavedata();
    postRequest(
      endpoints.createCustomer,
      { customerName: newCustName, branchName: branchName },

      (resp) => {
        console.log(resp);
        setRespo(resp);

        localStorage.removeItem("LazerCustExist");

        modcust = JSON.parse(localStorage.getItem("LazerCustomer"));
        console.log(modcust.customerName);
        // modcustname = modcust.customerName;
        setModcustname(modcust.customerName);
        localStorage.removeItem("LazerCustomer");
        modcust["custcode"] = resp.custcode;
        modcust["customerName"] = newCustName;
        modcust["branchName"] = branchName;
        localStorage.setItem("LazerCustomer", JSON.stringify(modcust));
        console.log(modcust["branchName"]);
        //  alert.success(modcust["customerName"]+" added to Cutomer List with Code No : "+modcust["custcode"]);
        setAlertModal(true);
        // alert(
        //   modcust["customerName"] +
        //     " added to Cutomer List with Code No : " +
        //     resp.custcode
        // ); //modcust["custcode"]);
        // window.location.href = "/Customer/CustomerInfo";
      }
    );
  }
  console.log(modcustname);

  const handleKeyDown = (event) => {
    if (event.key === ' ' && event.target.selectionStart === 0) {
    event.preventDefault(); // Prevent adding space at the beginning
    }
    };
  return (
    <div>
      {/* <BreadcrumbsComponent /> */}
      <h4 className="title">Customer Creator Form</h4>
      <div className="form-style">
        <Form onSubmit={submitSave} autoComplete="off">
          <div className="row mt-3">
            <div className="col-md-4">
              <label className="form-label">Name </label>
              <Form.Control
                id="newCustName"
                type="text"
                placeholder="Enter Customer Name"
                maxLength={150}
                value={newCustName}
                onKeyDown={handleKeyDown}
                onChange={(e) => searchCustomer(e)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Branch </label>
              <Form.Control
                id="branchName"
                type="text"
                placeholder="Enter Branch Name"
                onChange={checkBranch}
                onKeyDown={handleKeyDown}
                value={branchName}
              />
            </div>
            <div className="col-md-4 mt-4">
              <button className="button-style">Create Customer</button>
            </div>
          </div>
          {/* <Row className="mb-1">

                        <Form.Label style={{ width: '70px', fontFamily: 'Roboto', fontSize: '12px', fontWeight: 'bold' }}>Name <Form.Label style={{ color: '#f20707', fontSize: '16px', fontWeight: 'bold' }}>*</Form.Label> </Form.Label>
                        <Form.Control id="newCustName" type="text" style={{ width: '350px', height: '30px', fontFamily: 'Roboto', fontSize: '12px', marginRight: '80px' }} placeholder='Enter Customer Name' maxLength={150} value={newCustName} onChange={(e) => searchCustomer(e)} />
                        <Form.Label style={{ width: '100px', fontFamily: 'Roboto', fontSize: '12px', fontWeight: 'bold' }}>Branch </Form.Label>
                        <Form.Control id="branchName" type="text" style={{ width: '300px', height: '30px', fontFamily: 'Roboto', fontSize: '12px' }} placeholder='Enter Branch Name' onChange={checkBranch} value={branchName} />
                        <Col style={{ display: 'flex' }}>
                            <Button id="btnnewcustomer" type="submit" style={{ flex: '0.5', backgroundColor: '#283E81', align: 'float-right', fontFamily: 'Roboto', fontSize: '14px' }} >Create Customer </Button>
                        </Col>

                    </Row> */}
          {/* <Row> */}
          <div className="row mt-3 ">
            <div
              style={{
                height: "375px",
                overflowY: "scroll",
                overflowX: "hidden",
                marginTop: "20px",
              }}
            >
              <Table
                striped
                className="table-data border"
                style={{ marginLeft: "5px", border: "1px" }}
              >
                <thead className="tableHeaderBGColor">
                  <tr>
                    {["Customer Code", "Customer Name", "Branch"].map((h) => {
                      return <th>{h}</th>;
                    })}
                  </tr>
                </thead>
                <tbody className="tbody">
                  {custdetdatafiltered != null
                    ? custdetdatafiltered.map((cust, id) =>
                        rendertable(cust, id)
                      )
                    : ""}
                </tbody>
              </Table>
            </div>
          </div>
          {/* </Row> */}
        </Form>
        <AlertModal
          modcustname={modcustname}
          respo={respo}
          show={alertModal}
          onHide={(e) => setAlertModal(e)}
          firstbutton={fstbtnc}
          secondbutton={secbtnc}
          title="New Customer to the List"
          // message="New customer added, do you want edit Customer Information ?"
          message={
            modcustname +
            " added to Cutomer List with Code No : " +
            respo.custcode
          }
          firstbuttontext="Yes"
          secondbuttontext="No"
        />
      </div>
    </div>
  );
}

export default CreateCustomer;
