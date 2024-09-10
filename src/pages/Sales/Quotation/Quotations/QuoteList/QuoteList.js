import React, { useEffect, useState } from "react";
import { Form, Container, Table, Row, Col, Modal, Button, FormLabel, } from "react-bootstrap";
import { Navigate, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
//import QuotationReveiwModal from "../Quotations/FindQuote/QuotationReveiwModal";
//import QuoteListOrderModal from "./QuoteListOrderModal";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

function QuoteList() {
    let navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    let [alertModal, setAlertModal] = React.useState(false);
    let [modal, setModal] = React.useState(false);
    let [txtorderno, setTxtOrderNo] = React.useState("");

    let [quotationListdata, setQuotationListdata] = useState([]);
    let [selectedqtnlist, setSelectedQtnList] = useState({});
    let [reasondata, setReasondata] = useState([]);

    let [qtnliststatus, setQtnListStatus] = useState("");
    let [qtnformat, setQtnformat] = useState("");
    let [qtnstatus, setQtnStatus] = useState("");

    let [action, setAction] = useState("");
    let [qtnno, setQtnno] = useState("");
    let [selectedQtnNo, setSelectedQtnNo] = useState("");
    let [selectedQuoteid, setSelectedQuoteId] = useState("");
    let [customername, setCustomerName] = useState("");
    let [qtn_value, setQtnValue] = useState("");
    let [txtReasonDesc, setTxtReasonDesc] = useState("");

    const [quotationreviewshow, setQuotationReviewShow] = useState(false);
    const handleQuotationReview = () => setQuotationReviewShow(true);
    const handleQuotationReviewClose = () => setQuotationReviewShow(false);

    const [orderdisplayshow, setOrderDisplayShow] = useState(false);
    const [ordermsgshow, setOrderMsgShow] = useState(false);
    const [qtnlistdatastatus, setQtnListDataStatus] = useState(true);


    const GetQuotationdetails = async (qtnstatus, qtnformat) => {

        await postRequest(endpoints.getQuotationList, {
            qtnstatus: searchParams.get("qtnstatus"),
            qtnformat: searchParams.get("qtnformat")
        }, async (data) => {
            if (data.length === 0) {
             //   setQtnListDataStatus(false);
                setQuotationListdata([]);
            //    toast.info("No Data Found");
            } else {
             //   setQtnListDataStatus(true);
                setQuotationListdata(data);
            }
        });
    }

    useEffect(() => {
        setQtnListStatus(searchParams.get("qtnliststat"));
        setQtnStatus(searchParams.get("qtnstatus"));
        setQtnformat(searchParams.get("qtnformat"));
    }, []);


    useEffect(() => {


        async function fetchQtnData() {
            //   await GetQuotationdetails(searchParams.get("qtnstatus"), searchParams.get("qtnformat"));
            await postRequest(endpoints.getQuotationList, {
                qtnstatus: searchParams.get("qtnstatus"),
                qtnformat: searchParams.get("qtnformat")
            }, async (data) => {
                //   setQuotationListdata(data);
                // if (data.length === 0) {
                //     setQtnListDataStatus(false);
                //     setQuotationListdata([]);

                // } else {
                //     setQtnListDataStatus(true);
                console.log(data);
                setQuotationListdata(data);
                //  }
            });
        }
        console.log(qtnformat);

        fetchQtnData();

    }, [qtnliststatus, qtnstatus, qtnformat]);
    // console.log(searchParams.get("qtnstatus"));
    // console.log(searchParams.get("qtnformat"));

    if ((searchParams.get("qtnstatus") !== null)) { // && (qtnlistdatastatus === true)) {
        GetQuotationdetails(searchParams.get("qtnstatus"), searchParams.get("qtnformat"));
     //   setQtnListDataStatus(false);
    } 
    
    //else {
        // if (quotationListdata.length === 0) {
        // //    setQtnListDataStatus(true);
        //     setQuotationListdata([]);
        //    // toast.info("No Data Found");
        //     //return;
        // }

   // }



    let displayModal = (actn) => {
        console.log("Display Modal  : " + actn)
        if (qtnno !== null) {
            console.log(displayModal);
            setAction(actn);
            setQuotationReviewShow(true);
            // let qtnfor = action;
            postRequest(endpoints.getQtnRejnReasons, {
                qtnfor: actn
            }, (data) => {
                setReasondata(data);
            });
        } else {
            toast.info("Please select a Quotation No");
            return;
        }
    };


    // let alertFunction = () => {
    //     setQuotationReviewShow(true);
    //     postRequest(endpoints.getQtnRejnReasons,{
    //         qtnfor: qtnfor
    //     }, (data) => {
    //         setReasondata(data);
    //     });
    //     //setAlertModal(true);
    // };

    const displayModalOrder = (actn) => {
        console.log("Display Modal Order")
        setAction(actn);
        console.log(action)
        postRequest(endpoints.getQtnRejnReasons, {
            qtnfor: action
        }, (data) => {
            setReasondata(data);
        });
        setOrderDisplayShow(true);
        // let qtnreasondesc = "";
        // if (e.target.elements.orderNo.value != "") {
        //     qtnreasondesc = "Order No" + e.target.elements.orderNo.value;
        //     let qtnstatus = action;
        // }
    };

    let orderreceived = (e) => {
        //  e.preventDefault();
        let qtnreasondesc = "";
        if (txtorderno != "") {
            let oldqtnstatus = searchParams.get("qtnstatus");
            let quoteno = qtnno;
            let orderstat = "Order Received";
            let qtnstatus = "Order Received";
            let noOrder = txtorderno;

            postRequest(endpoints.updateQuotationList, {
                quoteno, orderstat, qtnstatus, noOrder, qtnformat, oldqtnstatus
            }, (data) => {
                setQuotationListdata(data);
            });

        }
    };

    let modalFunction = () => {
        setModal(true);
    };
    let secbtnc = () => {
        setQuotationReviewShow(false);
        // setAlertModal(false);
    };

    let qtnselector = async (index, qtnlistdet) => {
        console.log(qtnlistdet[index])
        setSelectedQtnNo(index);
        setSelectedQuoteId(qtnlistdet.QtnID);
        setQtnno(qtnlistdet.QtnNo);
        setCustomerName(qtnlistdet.CustomerName);
        setQtnValue(qtnlistdet.Qtn_Value);

        console.log(qtnlistdet.QtnID);
    };

    let renderqtntable = (qtnlistdet, index) => {
        return (
            <tr style={{
                backgroundColor: selectedQtnNo === index ? "#98A8F8" : "",
                fontFamily: "Roboto",
                fontSize: "12px",
                cursor: "pointer",
            }}
                id={index}
                onClick={() => {
                    console.log(qtnlistdet)
                    qtnselector(index, qtnlistdet);
                    setQtnno(qtnlistdet.QtnNo);
                    console.log(qtnlistdet.QtnNo);
                }}>
                <td style={{ width: '250px', textAlign: 'left' }}>{qtnlistdet.NoOrder}</td>
                <td>{moment(qtnlistdet.EnquiryDate).format("DD-MM-YYYY")}</td>
                <td>{qtnlistdet.QtnNo}</td>
                <td>{moment(qtnlistdet.QtnDate).format("DD-MM-YYYY")}</td>
                <td style={{ textAlign: 'right' }}>{qtnlistdet.Qtn_Value}</td>
                <td style={{ textAlign: 'left', width: '300px' }}>{qtnlistdet.CustomerName}</td>
                <td style={{ textAlign: 'right' }}>{qtnlistdet.CustTele}</td>
                <td style={{ textAlign: 'left', width: '110px' }}>{qtnlistdet.EnquiryRef}</td>
                <td style={{ textAlign: 'left', width: '150px' }}>{qtnlistdet.Contact}</td>
                <td style={{ textAlign: 'left', width: '200px' }}>{qtnlistdet.PreparedBy}</td>
            </tr>
        );
    }

    let fstbtnc = () => {
        let oldqtnstatus = searchParams.get("qtnstatus");
        let noOrder = txtReasonDesc;         //txtorderno;
        let quoteno = qtnno;
        let qtnstatus = "No Order";
        let orderstat = "Order Cancelled";
        let qtnformat = searchParams.get("qtnformat");
        postRequest(endpoints.updateQuotationList, {
            quoteno, qtnstatus, orderstat, noOrder, qtnformat, oldqtnstatus
        }, (data) => {
            setQuotationListdata(data);
        });
        setQuotationReviewShow(false);
    };

    return (
        <div>
            <h4 className="title"> Quotation Manager: Quotation List - {searchParams.get("qtnformat")} - {searchParams.get("qtnstatus")} </h4>
            <div className="row">
                <div>
                    <div className="row mt-1 justify-content-center">
                        <button
                            className="button-style mt-1 mb-1"
                            style={{ width: "150px", marginLeft: "4px", fontSize: "13px" }}
                            onClick={() => {
                                // OldQtnId=${oldqtnid}&OldQtnNo=${quotationNo}&NewQtnNo=${""}&qtnformat=${searchParams.get("qtnformat")}&btn=Open`
                                navigate(`/Quotation/FindQuoteOpen?OldQtnId=${selectedQuoteid}&OldQtnNo=${qtnno}&NewQtnNo=${""}&qtnformat=${qtnformat}&btn=Open`);
                            }}>
                            Open Quotation
                        </button>
                        <button
                            className="button-style mt-1 mb-1"
                            onClick={() => {
                                navigate(`/Quotation/QuoteList?qtnliststat=${qtnliststatus}&qtnstatus=${qtnstatus}&qtnformat=${qtnformat}`)
                            }}
                            style={{ width: "150px", marginLeft: "4px", fontSize: "13px" }}>
                            Refresh
                        </button>
                    </div>
                </div>
                {qtnstatus === "Created" ? (
                    <div className="col-md-1">
                        {" "}
                        <button
                            className="button-style "
                            style={{ width: "80px", fontSize: "13px" }}
                            onClick={(e) => { displayModal("Cancel") }}>
                            {/* onClick={alertFunction}> */}
                            Cancel
                        </button>
                    </div>
                    //  } else if (qtnstatus === "Qtn Sent") {
                ) : ""}
                {qtnstatus === "Qtn Sent" ? (
                    <div className="col-md-1">
                        <button
                            className="button-style "
                            style={{ width: "100px", fontSize: "13px" }}
                            onClick={(e) => { displayModalOrder("Order") }}>
                            {/* onClick={modalFunction}> */}
                            Order
                        </button>
                        <button
                            className="button-style mt-3"
                            style={{ width: "100px", fontSize: "13px" }}
                            onClick={(e) => { displayModal("No Order") }}>
                            {/* onClick={alertFunction}> */}
                            No Order
                        </button>
                    </div>
                ) : ""}


                <div className="col-md-11" style={{ height: "400px", overflowY: "scroll", overflowX: "scroll", marginTop: "10px", }}>
                    {" "}
                    <Table
                        striped
                        className="table-data border"
                        style={{ marginLeft: "5px", border: "1px" }}
                    >
                        <thead className="tableHeaderBGColor tablebody ">
                            <tr>
                                <td>Reason</td>
                                <td style={{ width: '100px' }}> Enqury Date</td>
                                <td>Qtn No</td>
                                <td style={{ width: '100px' }}>Date</td>
                                <td>Amount</td>
                                <td>Customer Name</td>
                                <td>Cust Tale</td>
                                <td>Enqury Ref</td>
                                <td>Contact</td>
                                <td>Prepared By</td>
                            </tr>
                        </thead>
                        <tbody className="tablebody" style={{ overflowY: 'scroll', overFlowX: 'scroll' }}>
                            {quotationListdata.length > 0 ? quotationListdata.map((qtnlistdet, index) =>
                                renderqtntable(qtnlistdet, index)
                            )
                                : <tr><td colSpan="10" style={{ textAlign: "center" }}>No Data Found</td></tr>}
                        </tbody>
                    </Table>
                </div>
            </div>
            {/* <QuotationReveiwModal
        show={alertModal}
        onHide={(e) => setAlertModal(e)}
        firstbutton={fstbtnc}
        secondbutton={secbtnc}
        firstbuttontext="Save"
        secondbuttontext="Cancel"
      /> */}
            {/*<QuoteListOrderModal
        show={modal}
        onHide={(e) => setModal(e)}
        firstbutton={fstbtnc}
        secondbutton={secbtnc}
        firstbuttontext="OK"
        secondbuttontext="Cancel"
      /> */}
            {/* </div>
    <div>*/}
            <Modal show={quotationreviewshow}>
                <Modal.Header>
                    <Modal.Title>Quotation Reveiw</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Quotation No</label>
                                <input type="text" disabled value={qtnno} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Customer</label>
                                <input type="text" disabled value={customername} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Status</label>
                                <input type="text" disabled value={qtnstatus} />
                            </div>
                        </div>

                        <div className="row">
                            <label className="form-label">Value</label>
                            <div className="col-md-6">
                                <input type="text" disabled value={qtn_value} />
                            </div>
                            <div className="col-md-6">
                                {reasondata.length > 0 ?
                                    <select
                                        className="ip-select"
                                        // onChange={selectState}
                                        // value={custstateid}
                                        required >
                                        <option value="" disabled selected>** Select **</option>
                                        {reasondata.map((reasn) => {
                                            return (
                                                <option value={reasn["Reason"]}>{reasn["Reason"]}</option>
                                            )
                                        })}
                                    </select>
                                    : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Reason</label>
                                <input id="txtReasonDesc" type="textarea" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
                        onClick={() => {
                            // firstbutton();
                            fstbtnc();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            // secondbutton();
                            secbtnc();
                        }}
                    >
                        Cancel
                        {/* {secondbuttontext} */}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* =========================== Order Modal for Entering Order No ======================*/}

            <Modal show={orderdisplayshow}>
                <Modal.Header>
                    <Modal.Title>Quotation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Enter Order No</label>
                                <input type="text" id="txtorderno" onChange={(e) => setTxtOrderNo(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
                        onClick={() => {
                            //    Display Msg and accpet yes or no
                            setOrderDisplayShow(false);
                            setTxtOrderNo(txtorderno);
                            setOrderMsgShow(true);
                        }}>OK
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setOrderDisplayShow(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ====================== Msg that needs to be displayed and get confirmation from user ================== */}
            <Modal show={ordermsgshow}>
                <Modal.Header>
                    <Modal.Title>Quotation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="form-label">Wish to mark as Order Received. Order No : {txtorderno}</label>

                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
                        onClick={() => {
                            //    to save the order no and mark as order received
                            orderreceived();
                            setOrderMsgShow(false);
                        }}>Yes </Button>
                    <Button
                        variant="secondary"
                        onClick={() => { setOrderMsgShow(false); }}> No </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuoteList;
