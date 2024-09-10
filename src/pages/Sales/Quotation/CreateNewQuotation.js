import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form } from "react-bootstrap";
import moment from 'moment';
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuotationContext } from "../../../context/QuotationContext";
import validator from "validator";

const { getRequest, postRequest } = require("../../api/apiinstance");
const { endpoints } = require("../../api/constants");

function CreateNewQuotation(props) {
  const [searchParams] = useSearchParams();

  let nav = useNavigate();
  const addDetails = () => {
    nav("addDetails")
  }
  let navigate = useNavigate();
  let { quotation, setQuotationState } = useQuotationContext();
  //  let [custNameselected, setCustNameselected] = useState([false]);

  let [formenqdate, setFormEnqDate] = useState(new Date());
  let [formenqref, setFormEnqRef] = useState("");
  let [formcustTele, setFormCustTele] = useState("");
  let [formcontact, setFormContact] = useState("");
  let [formemailid, setFormEmailId] = useState("");
  let [custNameselected, setCustNameselected] = useState("");
  let [formcustAddr, setFormCustAddr] = useState("");
  let [qtnstatus, setQtnStatus] = useState("");
  let [custdata, setCustdata] = useState([]);
  let [formformat, setFormformat] = useState("");
  let [custcode, setCustCode] = useState("");
  let [customername, setCustomername] = useState("");
  let [quotationNo, setQuotationNo] = useState("");
  let [savebtn, setSaveBtn] = useState(false);
  let [adddetailsbtn, setAddDetailsBtn] = useState(true);

  useEffect(() => {
    setQtnStatus("Created");
    // setFormformat("Profile");
    console.log(searchParams.get("qtnformat"));
    // let qformat = searchParams.get("qtnformat");
    setFormformat(searchParams.get("qtnformat"));

    postRequest(endpoints.getCustomers, {}, (data) => {
      setCustdata(data);
    });
    let edate = moment(new Date()).format("DD/MM/YYYY");
    setFormEnqDate(edate);
  }, [])

  const valienqref = (e) => {
    // if (customername == "") {
    //   toast.error('Please enter the Customer Name ..', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
    //   return;
    // }

    const eqref = e.target.value.replace(/[^A-Za-z/0-9- .]/gi, "");
    if (eqref == null) {
      toast.error('Please enter the Enquiry Reference ..', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
      return;
    }
    setFormEnqRef(eqref);

  }

  const handleChangePhNo = (e) => {
    const mvalue = e.target.value.replace(/[^0-9 -]/gi, "");
    if (mvalue < 0) {
      toast.error("Telephone No cannot be blank..", { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
    }
    setFormCustTele(mvalue);
  }


  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function isValidEmail(formemailid) {
    return /\S+@\S+\.\S+/.test(formemailid);
  }

  const handleEmailFinish = event => {
    if (!isValidEmail(formemailid)) {
      //   toast.error('Email is invalid', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
      //   setEmail("");
    } else {
      setError(null);

    }
  };
  // new
  const valemail = (e) => {
    if (e.target.value == "") {
      toast.error('Please enter the Email ID ..', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
      return;
    }
    //console.log(e.target.value)
    const vcemail = e.target.value.replace(/[^A-Za-z0-9.@]/gi, "");
    setEmail(vcemail);
  };

  const valicontact = (e) => {
    const mcontact = e.target.value.replace(/[^A-Za-z0-9 .]/gi, "");
    setFormContact(mcontact);
  }

  const valCustName = (e) => {
    let cname = e.target.value.replace(/[^A-Za-z0-9. ]/gi, "");
    setCustomername(cname);
  }

  let selectedCust = async (e) => {
    //   e.preventDefault();
    let cust = {};
    for (let i = 0; i < custdata.length; i++) {
      if (e.length > 0 && custdata[i]["Cust_Code"] === e[0].Cust_Code) {
        cust = custdata[i];
        break;
      }
    }
    setCustCode(cust.Cust_Code != undefined ? cust.Cust_Code : "");


    postRequest(
      endpoints.getCustomerDetails, { custcode: cust.Cust_Code, },
      (resp) => {
        console.log(resp)
        let excustdata = resp[0];
        if (excustdata == undefined) return;
        //   console.log(resp[0]["EMail"])
        setCustNameselected(resp[0]["Cust_name"]);
        setCustomername(resp[0]["Cust_name"]);

        setCustCode(excustdata.Cust_Code);
        setFormEmailId(excustdata.EMail);
        setFormContact(excustdata.PurchaseContact1 ? excustdata.PurchaseContact1 : excustdata.PurchaseContact2 ? excustdata.PurchaseContact2 : "")
        setFormCustTele(excustdata.TelePurchase1 ? excustdata.TelePurchase1 : excustdata.TelePurchase2 ? excustdata.TelePurchase2 : "")
        setFormCustAddr(excustdata.Address ? excustdata.Address : "")
      })
  }

  async function submitSave(e) {
    e.preventDefault();

    if ((customername == "") && (custNameselected == "")) {
      toast.error('Please enter the Customer Name ..', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER });
      return;
    }
    let customerName = "";
    if (custNameselected != "") {
      customerName = custNameselected;
    }
    else {
      customerName = e.target.elements.customername.value;
    }

    let enquiryDate = e.target.elements.formenqdate.value;
    let enquiryRef = e.target.elements.formenqref.value;
    let custAddress = formcustAddr;
    let custTele = formcustTele;
    let contact = formcontact;
    let e_mail = e.target.elements.formemailid.value;
    let qtnstatus = "Created";
    //let qtnformat = formformat;

    postRequest(endpoints.createQuotation, {
      enquiryDate, enquiryRef, customerName, custAddress, custcode, contact, custTele, e_mail, formformat, qtnstatus
    }, (resp) => {
      let qtn = {
        enquiryDate: enquiryDate,
        enquiryRef: enquiryRef,
        customerName: customerName,
        custAddress: custAddress,
        custcode: custcode,
        custTele: custTele,
        contact: contact,
        e_mail: e_mail,
        qtnformat: formformat,
        quoteno: resp.quotationno,
      }
      setQuotationState(qtn);
      let qtnno = (resp.quotationno).replaceAll("_", "/");
      setQuotationNo(qtnno);

      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

      const d = new Date();
      let mmonth = monthNames[d.getMonth()];
      postRequest(endpoints.createQuotation, { SrlType :"Quotation", qno: qtnno, mmonth }, (resp) => {
        console.log(resp);
      });
      
      toast.success('Quotation Created as ' + qtnno, { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER })
      setSaveBtn(true);
      setAddDetailsBtn(false);

    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h4 className="title">Create New Quotation - {formformat}</h4>
      <Form onSubmit={submitSave} autoComplete="off">
        <div className="row">
          <div className="col-md-3">
            {" "}
            <label className="form-label">Enquiry Date</label>
            <input id="formenqdate" type="text" disabled value={formenqdate} />
          </div>
          <div className="col-md-5">
            <Form.Group controlId="custNameselected">
              <label className="form-label">Name</label>
              <Form.Label
                style={{ color: "#f20707", fontSize: "16px", fontWeight: "bold" }}
              >*</Form.Label>

              {custdata.length > 0 ? (
                <Typeahead
                  id="basic-example"
                  labelKey="Cust_name"
                  onChange={selectedCust}
                  options={custdata}
                  placeholder="Choose a Customer...">
                </Typeahead>
              ) : (
                ""
              )}
            </Form.Group>
          </div>
          <div className="col-md-4">
            {" "}
            <label className="form-label">Quotation No</label>
            <input id='quotationNo' disabled type="text" value={quotationNo} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {" "}
            <label className="form-label">Enquiry Ref</label>
            <input id='formenqref' type="text" maxLength={50} onChange={valienqref} value={formenqref} required />
          </div>
          {/* </div>
      <div className="row"> */}
          <div className="col-md-6">
            {" "}
            <label className="form-label">Customer</label>
            <input className="ip-select" type="text" id="customername" onChange={(e) => setCustomername(e.target.value)} value={customername} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div>
              <label className="form-label">Address</label>
            </div>
            <textarea
              type="textarea" rows={3}
              style={{ width: "320px", height: "180px" }} onChange={(e) => setFormCustAddr(e.target.value)} value={formcustAddr} required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Cust Tele</label>
            <input id='formcusttele' type="text" maxLength={15} onChange={handleChangePhNo} value={formcustTele} required />
            <label className="form-label">Contact</label>
            <input id="formcontact" type="text" maxLength={150} onChange={valicontact} value={formcontact} required />
            <label className="form-label">E mail ID</label>
            <input id="formemailid" type="email" onChange={valemail} //onChange={(e) => setEmail(e.target.value)} 
              //onBlur={handleEmailFinish} 
              //value={formemailid}  
              required
            />
          </div>
          {/* </div>
      <div className="row mb-4"> */}
          <div className="col-md-4">
            <button className="button-style" disabled={savebtn} type="submit">Save</button>
            <button className="button-style" disabled={adddetailsbtn} onClick={() => navigate(`/Quotation/addDetails?qtnformat=${searchParams.get("qtnformat")}`)}>Add Details</button>
          </div>

        </div>
      </Form >
    </div >


  );
}

export default CreateNewQuotation;
