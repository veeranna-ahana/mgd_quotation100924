import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Typeahead } from "react-bootstrap-typeahead";
import { Table, Row, Col, Form, FormLabel, FormCheck, Button, FormGroup, } from "react-bootstrap";
import AlertModal from "../../../../components/alert";
import { toast } from "react-toastify";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function GetQuotationForm() {
    let [alertModal, setAlertModal] = React.useState(false);

    let navigate = useNavigate();

    const [searchParams] = useSearchParams();

    let [qtnformat, setQtnformat] = useState("");
    let [qtndata, setQtndata] = useState([]);
    let [totalqtndata, setTotalQtndata] = useState([]);
    let [quotationNo, setQuotationNo] = useState("");
    let [oldqtnid, setOldQtnId] = useState("");
    let [reviseddata, setRevisedData] = useState([]);
    let [selectedqtnno, setSelectedqtnno] = useState([]);

    let alertFunction = () => {
        setAlertModal(true);
    };
    let secbtnc = () => {
        setAlertModal(false);
    };

    let fstbtnc = () => {
        window.location.href = "/quotation/quotation/QuotationForm";
    };

    useEffect(() => {
        //console.log(qtnformat);
        // if (qtnformat == "Profile") {
        postRequest(endpoints.getQuotations, { qtnformat: searchParams.get("qtnformat") }, (data) => {
            setQtndata(data);
        });

    }, []);

    let QuoteClear = () => {
        //  navigate(`/quotation/GetQuotationForm?qtnformat=Service`);
        window.location.reload();
    }

    let selectQtns = (selectedqtnno) => {
        console.log(selectedqtnno)
        if (selectedqtnno.length == 0 || selectedqtnno[0].QtnID == undefined) return;
        oldqtnid = selectedqtnno[0].QtnID;
        setOldQtnId(selectedqtnno[0].QtnID);
        quotationNo = selectedqtnno[0].QtnNo;
        setQuotationNo(selectedqtnno[0].QtnNo);
        postRequest(endpoints.getSelectedQuotation, { OLDQtnID: selectedqtnno[0].QtnID }, (reviseddata) => {
            console.log(reviseddata);
            setRevisedData(reviseddata);
        });
    }

    let handleInputChange = (input) => {
        selectedqtnno = input;
        //console.log(input,e.target.value);
    }

    let ImportQtn = async () => {

        console.log("ImportQtn")
        console.log(reviseddata);
        console.log(selectedqtnno.QtnNo);
        //  if (quotationNo != "") {
        await postRequest(endpoints.ReviseQuotation, { OLDQtnID: oldqtnid, oldQtnNo: quotationNo }, async (afterrevdata) => {
            console.log(afterrevdata);
            toast.success("Quotation created as " + afterrevdata.qtnno, { autoClose: 3000, position: toast.POSITION.TOP_CENTER });

            navigate(`/Quotation/FindQuoteOpen?OldQtnId=${oldqtnid}&OldQtnNo=${quotationNo}&NewQtnNo=${afterrevdata.qtnno}&qtnformat=${searchParams.get("qtnformat")}&btn=Revise`);
        });
        //}
    }

    return (
        <div>
            <h4 className="title">Get Quotation Form - - {searchParams.get("qtnformat")}</h4>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup as={Row}>
                        <label className="form-label">Quotation No</label>
                        {/* 
                        <select className='ip-select' type="text" onChange={selectQtns}>
                            <option>Choose Quotation...</option>
                            {qtndata.map((qtn) => {
                                return (
                                    <option value={qtn["QtnID"]}>{qtn["QtnNo"]}</option>
                                )
                            })}
                        </select> */}

                        {qtndata.length > 0 ? (
                            <Typeahead
                                id="basic-example"
                                labelKey="QtnNo"
                                onChange={selectQtns}
                                onInputChange={handleInputChange}
                                options={qtndata}
                                placeholder="Choose Quotation...">
                            </Typeahead>
                        ) : (
                            ""
                        )}


                    </FormGroup>
                </div>
            </div>
            <div className="row mt-2 justify-content-center">
                <button className="button-style mt-4 mb-4 "
                    style={{ width: "120px", marginLeft: "4px" }}
                    onClick={() => {
                        if (quotationNo == "") {
                            toast.error("Please select Quotation No", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
                            return;
                        }
                        else {
                            navigate(`/Quotation/FindQuoteOpen?OldQtnId=${oldqtnid}&OldQtnNo=${quotationNo}&NewQtnNo=${""}&qtnformat=${searchParams.get("qtnformat")}&btn=Open`);
                        }
                    }} >
                    Open
                </button>
                <button
                    className="button-style mt-4 mb-4"
                    style={{ width: "120px", marginLeft: "4px" }}
                    onClick={() => ImportQtn()}
                >
                    Revise
                </button>
                <button
                    className="button-style mt-4 mb-4" onClick={() => { QuoteClear() }}
                    style={{ width: "120px", marginLeft: "4px" }}>
                    Cancel
                </button>
                <button
                    className="button-style mt-4 mb-4"
                    style={{ width: "120px", marginLeft: "4px" }} onClick={() => { navigate(`/quotation`) }}
                >
                    Close
                </button>
            </div>
            <AlertModal
                // modcustname={modcustname}
                // respo={respo}
                show={alertModal}
                onHide={(e) => setAlertModal(e)}
                firstbutton={fstbtnc}
                secondbutton={secbtnc}
                title="Quotation"
                message="Quotation created as"
                firstbuttontext="Yes"
                secondbuttontext="No"
            />
        </div >
    );
}

export default GetQuotationForm;
