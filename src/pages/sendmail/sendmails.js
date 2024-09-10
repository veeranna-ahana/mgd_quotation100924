import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";

const { postRequestFormData, } = require("../api/apiinstance");
const { endpoints } = require("../api/constants");

function SendMail() {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // let history = useHistory();
  // let [formMessageBody, setFormMessageBody] = useState("");
  // let [formSubject, setFormSubject] = useState("");

  useEffect(() => {
    console.log(searchParams.get("mlbody"));
    // setFormMessageBody(searchParams.get("mlbody"));
    document.getElementById("formMessageBody").value = Buffer.from(
      searchParams.get("mlbody"),
      "base64"
    ).toString("ascii");
    document.getElementById("formSubject").value = Buffer.from(
      searchParams.get("mlsubjct"),
      "base64"
    ).toString("ascii");
    // document.getElementById("fromName").value = Buffer.from(
    //   searchParams.get("mlfromName"),
    //   "base64"
    // ).toString("ascii");

  }, []);

  const sendmaildetails = (e) => {
    e.preventDefault();

    // console.log(e.target.elements.attachments.files);
    // if (e.target.elements.attachments.files.length <= 0 ) {
    //   alert("Please select the file to attach to the mail");
    //   return;
    // }
    console.log("mail details");
    
    let mailto = e.target.elements.formToAddress.value;
    let copyto = e.target.elements.formCCAddress.value;
 //   let mailfrom = e.target.elements.fromName.value;
    let subject = e.target.elements.formSubject.value;
    let mailbody = e.target.elements.formMessageBody.value;
    let files = e.target.attachments.files;

    let formData = new FormData();
    
    formData.append("toAddress", mailto);
    formData.append("ccAddress", copyto);
  //  formData.append("fromName", mailfrom);
    formData.append("subjectLine", subject);
    formData.append("mailBody", mailbody);
    formData.append("file", files[0]);

    console.log(files);
    if (files[0] == null || files[0] == undefined ){
      alert("Please attach file to send the mail..")
      return;
    }
    postRequestFormData(endpoints.sendAttachmentMails, formData, (data) => {
      if (data != null) {
        alert("Email Sent Successfully..");
        window.close();
        //  window.close();
      }
    });
  };

  let closesendmail = () => {
    alert("Closing Email..");
    window.close();
    //  navigate(-1);
  };

  return (
    <div>
      <h4 className="title">Send Mail</h4>
<ToastContainer />
      <div className="form-style">
        <Col xs={12}>
          <div className="addquotecard">
            <Form style={{ padding: "0px 10px" }} onSubmit={sendmaildetails} autoComplete="off" >
              {/* <Row>
                                        <Form.Label style={{ width: '100px', height: '30px', fontFamily: 'Roboto', fontSize: '14px' }}>From</Form.Label>
                                        <Form.Control type="text" controlId="fromaddress" value={fromaddress} style={{ width: '200px', height: '30px', fontFamily: 'Roboto', fontSize: '14px' }} />
                                    </Row> */}
              <div className="row mt-2">
                <div className="col-md-1">
                  <label className="form-label">To</label>
                </div>
                <div className="col-md-5">
                  <input type="text" id="formToAddress" />
                </div>
                <div className="col-md-1">
                      <label className="form-label">Attachments</label>
                    </div>
                    <div className="col-md-5">
                      <input type="file" id="attachments" multiple="multiple" accept="*.*" />
                    </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-1">
                  <label className="form-label">CC</label>
                </div>
                <div className="col-md-5">
                  <input type="text" id="formCCAddress" />
                </div>

                <div className="col-md-1">
                  <label className="form-label">Subject</label>
                </div>
                <div className="col-md-5">
                  <input type="text" id="formSubject" />
                </div>
              </div>


              {/* <Form.Group as={Row} controlId="formSubject">
                <div className="col-md-10">
                  <label className="form-label">Subject</label>
                  <Form.Control type="text" />
                </div>
              </Form.Group> */}
              <Form.Group as={Row} controlId="formMessageBody">
                <div className="col-md-10">
                  <label className="form-label">Message</label>
                  <Form.Control
                    as="textarea"
                    rows={50}
                    style={{ height: "250px", overflowY: "scroll" }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="row justify-content-center mt-3 mb-5">
                <button
                  type="submit"
                  className="button-style"
                  style={{ width: "206px" }}
                >
                  Send Mail
                </button>
                <button
                  type="button"
                  className="button-style"
                  id="close"
                  onClick={closesendmail}
                  style={{ width: "110px" }}
                >
                  Close
                </button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </div>
    </div>
  );
}

export default SendMail;
