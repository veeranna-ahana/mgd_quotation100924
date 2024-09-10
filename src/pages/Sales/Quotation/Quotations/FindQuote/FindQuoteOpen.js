import React, { useEffect, useState } from "react";
import NabTab from "../AddDetails/Components/NavTab";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ImportRates from "../AddDetails/ImportRates";
import Table from "react-bootstrap/Table";
import Tables from "../../../../../components/Tables";
import { QuotationdData, table2data } from "../AddDetails/Components/DataList";
import { Form, Modal, Tab, Tabs, } from 'react-bootstrap';

import { useNavigate, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useQuotationContext } from "../../../../../context/QuotationContext";
import SelectTableComponent from "../AddDetails/Components/selectgrid";
import SvrModalPrintQuotation from "../Print Quote/Quotation/Service/ServicePrintQuotation";
import PrfModalPrintQuotation from "../Print Quote/Quotation/Profile/ProfilePrintQuotation";
import { Buffer } from "buffer";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

export default function FindQuoteOpen() {
    const [key, setKey] = useState("quotation");
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let { quotation, setQuotationState } = useQuotationContext();
    const [taxDetailsshow, setTaxDetailsShow] = useState(false);
    const handleTaxDetails = () => setTaxDetailsShow(true);
    let [openSvrPrintModal, setOpenSvrPrintModal] = useState(false);
    let [openPrfPrintModal, setOpenPrfPrintModal] = useState(false);
    const handleCloseTaxDetails = () => setTaxDetailsShow(false);

    let [selectedDwgId, setSelectedDwgId] = useState("");
    let [formtele, setFormTele] = useState("");
    let [formemail, setFormEmail] = useState("");
    let [qtntaxdata, setQtnTaxdata] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let [tcdata, setTandCdata] = useState([]);
    // let [tandcdata, setTandCData] = useState([]);
    let [custdwgfiles, setCustDwgFiles] = useState([]);
    let [quotationType, setQuotationType] = useState([]);

    let [loaded2, setLoaded2] = useState(false);
    let [Gndtotal, setGndtotal] = useState(0);
    let [format, setFormat] = useState("");

    let [selectedRow, setSelectedRow] = useState("");
    let [selectedItemId, setSelectedItemId] = useState(null);
    let [qtndatadetails, setQtndatadetails] = useState([]);
    let [quotationNo, setQuotationNo] = useState("");
    let [enquiryDate, setEnquiryDate] = useState("");
    let [enquiryRef, setEnquiryRef] = useState("");
    let [quotationDate, setQuotationDate] = useState("");
    let [customername, setCustomerName] = useState("");
    let [custAddress, setCustAddress] = useState("");
    let [custcode, setCustcode] = useState("");
    let [custTele, setCustTele] = useState("");
    let [contact, setContact] = useState("");
    let [e_mail, setE_mail] = useState("");
    let [qtnformat, setQtnformat] = useState("");
    let [qtnstatus, setQtnstatus] = useState("");
    let [qtntype, setQtntype] = useState("");
    let [selectedqtnno, setSelectedqtnno] = useState("");
    let [validupto, setValidUpTo] = useState("");
    let [formpreparedby, setPreparedBy] = useState("");
    let [revisionno, setRevisionNo] = useState("");
    let [Gsttotal, setGsttotal] = useState("");
    let [total, setTotal] = useState("");
    let [discount, setDiscount] = useState("");
    let [qtnMaterialData, setQtnMaterialData] = useState([]);
    let [qtnformt, setQtnformt] = useState("");
    let [Qtnvalue, setQtnValue] = useState("");
    let [qtntotal, setQtnTotal] = useState("");
    let [formformat, setFormFormat] = useState("");

    //  let [tcdata, setTcdata] = useState([]);
    let [selectedtcdata, setSelectedTCData] = useState([]);
    let [addnotes, setAddNotes] = useState(false);
    let [addnotesentry, setAddNotesEntry] = useState("");
    let [qtnid, setQtnid] = useState("");

    let [itemname, setItemName] = useState("");
    let [taxname, setTaxName] = useState("");
    let [name, setName] = useState("");
    let [material, setMaterial] = useState("");
    let [operation, setOperation] = useState("");
    let [quantity, setQuantity] = useState(0);
    let [basicPrice, setBasicPrice] = useState(0);
    let [discountAmount, setDiscountAmount] = useState(0);
    let [finalPrice, setFinalPrice] = useState(0);
    let [totalAmount, setTotalAmount] = useState(0);
    let [taxableamount, setTaxableamount] = useState(0);
    let [taxamt, setTaxAmt] = useState(0);
    let [deleteQtnItemData, setDeleteQtnItemData] = useState([]);
    let [mtrlcode, setMtrlCode] = useState("");
    let [processdescription, setProcessDescription] = useState("");
    let [lengthOfCut, setLengthOfCut] = useState(0);
    let [noOfPierces, setNoofPierces] = useState(0);
    let [Task_Qtn_JW_Rate, setTask_Qtn_JW_Rate] = useState(0);
    let [matrlcost, setMtrlCost] = useState(0);
    let [unitrate, setUnitRate] = useState(0);
    let [specificwt, setSpecificWt] = useState(0);
    let [qtnProfileData, setQtnProfileData] = useState([]);
    let [formquotationtype, setFormQuotationType] = useState("");
    const current = new Date();

    let [recalcscheme, setReCalcScheme] = useState("");
    let [taskno, setTaskNo] = useState(0);
    let [rectArea, setRectArea] = useState(0);
    let [rectweight, setRectWeight] = useState(0);
    let [partoutarea, setPartOutArea] = useState(0);
    let [partoutweight, setPartOutWeight] = useState(0);
    let [hasopencontour, setHasOpenContour] = useState(false);
    let [partnetarea, setPartNetArea] = useState(0);
    let [partnetweight, setPartNetWeight] = useState(0);
    let [outopen, setOutOpen] = useState(0);
    let [complexity, setComplexity] = useState(0);

    let [oldqtnid, setOldQtnId] = useState("");
    let [oldquotationNo, setOldQuotationNo] = useState("");
    let [newquotationNo, setNewQuotationNo] = useState("");
    let [btnlbl, setBtnLbl] = useState("");
    let [taxesdata, setTaxesdata] = useState([]);
    let [taxpercent, setTaxpercent] = useState(0);

    let [saveBtn, setSaveBtn] = useState(false);
    let [impratesBtn, setImpRatesBtn] = useState(false);
    let [matNewAddBtn, setMatNewAddBtn] = useState(false);
    let [matDeleteBtn, setMatDeleteBtn] = useState(false);
    let [btntaxdetails, setBtnTaxDetails] = useState(false);
    let [btnprintqtn, setBtnPrintQtn] = useState(true);
    // const getHeadings = () => {
    //     if (qtnMaterialData != null && qtnMaterialData[0] != undefined) return Object.keys(qtnMaterialData[0]);
    //     return [];
    // };

    // const getHeadings1 = () => {
    //     if (qtntaxdata != null && qtntaxdata[0] != undefined) return Object.keys(qtntaxdata[0]);
    //     return [];
    // };


    //   const [dwgfoldershow, setDwgFolderShow] = useState(false);
    const handleOpenDwgFolder = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            console.log(files);
        };
        input.click();

        // setDwgFolderShow(true);
        // let month = new Date(Date.now()).toLocaleString('en-US', { month: 'long' })
        // let fpath = `\\QtnDwg\\${month}\\${quotationNo}`;      //DXF`;
        // postRequest(endpoints.getDwgFiles, { quoteno: quotationNo, filepath: fpath }, (dwgdata) => {
        //     console.log(dwgdata);
        //     setCustDwgFiles(dwgdata.files);
        // });
    }
    // const handleCloseDwgFolder = () => setDwgFolderShow(false);

    useEffect(() => {
        let uname = JSON.parse(localStorage.getItem("LazerUser"));
        if (uname == null) {
            toast.error("Please Login", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            navigate("/login");
            return;
        }
        setPreparedBy(uname.data[0].Name);

        async function apiCall() {
            console.log(searchParams.get("OldQtnNo"));
            oldquotationNo = searchParams.get("OldQtnNo");
            newquotationNo = searchParams.get("NewQtnNo");
            btnlbl = searchParams.get("btn");
            qtnformat = searchParams.get("qtnformat");
            oldqtnid = searchParams.get("OldQtnId");

            if (oldquotationNo != null && oldquotationNo != undefined) {
                oldquotationNo = newquotationNo.replaceAll('_', "/");
            }


            if (searchParams.get("btn") == "Open") {
                //   quotationNo = oldquotationNo;
                setQuotationNo(searchParams.get("OldQtnNo"));
                //console.log(quotationNo);
                console.log("Open");
                await postRequest(endpoints.getSelectedQuotation, {
                    OLDQtnID: oldqtnid,
                    quotationNo: oldquotationNo,
                }, async (resp) => {
                    console.log(resp);
                    console.log("earlier1 : " + resp[0].QtnID);
                    //   setQuotationNo(newquotationNo.replaceAll('_', '/'));
                    //  setQuotationNo(resp[0].QtnNo);
                    setRevisionNo(resp[0].RevisionNo);
                    setQtnid(resp[0].QtnID);
                    setQtndatadetails(resp);
                    setQtntype(resp[0].QtnType);
                    setCustomerName(resp[0].CustomerName);
                    setFormTele(resp[0].CustTele);
                    setE_mail(resp[0].E_mail);
                    setCustTele(resp[0].CustTele);
                    setEnquiryRef(resp[0].EnquiryRef);
                    setQtnTotal(resp[0].QtnTotal.toFixed(2));
                    setQtnstatus(resp[0].QtnStatus);
                    if (resp[0].QtnStatus == "Qtn Sent") {
                        setImpRatesBtn(false);
                        await postRequest(endpoints.getQuotationItems, { qtnid: oldqtnid }, async (data) => {
                            setQtnMaterialData(data);
                            //  onClickImportRates();
                            console.log(data);
                        });
                    }
                    //   setRevisionNo(oldquotationNo.replaceAll('_', '/'));

                    assignvalues(resp);

                    await postRequest(endpoints.getTermsConditions, {}, async (tdata) => {
                        setTandCdata(tdata);
                        setLoaded(true);
                    });

                    await postRequest(endpoints.getTaxDetails, {}, async (taxdata) => {
                        console.log(taxdata);
                        setTaxesdata(taxdata);
                    });
                    console.log("Getting Qtn Items List");
                    await postRequest(endpoints.getQuotationItems, { qtnid: oldqtnid }, async (data) => {
                        setQtnMaterialData(data);
                        //  onClickImportRates();
                        console.log(data);
                    });
                    console.log("Getting Qtn Tax Details : " + oldqtnid);

                    await postRequest(endpoints.getQtnTaxDetails, { qtnid: oldqtnid }, async (txdata) => {
                        console.log("taxdata");
                        console.log(txdata);
                        if (txdata.length == 0) {
                            setQtnTaxdata([]);
                        } else {
                            setQtnTaxdata(txdata);
                        }
                    });

                    // await postRequest(endpoints.getQtntcDetails, { qtnId: resp[0].QtnID }, async (seldata) => {
                    //     console.log("seldata");
                    //     console.log(seldata);

                    //     setSelectedTCData(
                    //         seldata.map((item) => {
                    //             return {
                    //                 ...item,
                    //                 highlight: item.highlight == 1 ? true : false,
                    //             };
                    //         })
                    //     );
                    // });

                });
            } else if (searchParams.get("btn") == "Revise") {
                console.log("Revise");
                console.log("New Quotation No : " + oldquotationNo);
                console.log(searchParams.get("NewQtnNo"));

                setQuotationNo(searchParams.get("OldQtnNo"));
                await postRequest(endpoints.getRevSelectedQuotation, {
                    quotationNo: oldquotationNo,  //searchParams.get("NewQtnNo"), // newquotationNo,
                }, async (resp) => {
                    console.log("New Quotation Response ")
                    console.log(resp);
                    resp[0].RevisionNo = searchParams.get("NewQtnNo");
                    setQuotationNo(searchParams.get("OldQtnNo"));
                    setRevisionNo(resp[0].RevisionNo.replaceAll('_', '/'));
                    setQtnid(resp[0].QtnID);
                    setQtndatadetails(resp);
                    setQtntype(resp[0].QtnType);
                    setCustomerName(resp[0].CustomerName);
                    setE_mail(resp[0].E_mail);
                    //   setRevisionNo(oldquotationNo.replaceAll('_', '/'));

                    // await postRequest(endpoints.getQtnTaxDetails, {
                    //     qtnId: resp[0].QtnID
                    // }, async (txdata) => {
                    //     if (txdata.length > 0) {
                    //         console.log("taxdata");
                    //         console.log(txdata);
                    //         setQtnTaxdata(txdata);
                    //     } else {
                    //     setQtnTaxdata([]);
                    //     }
                    // });

                    assignvalues(resp);


                    await postRequest(endpoints.getTermsConditions, {}, async (tdata) => {
                        setTandCdata(tdata);
                        setLoaded(true);
                    });

                    await postRequest(endpoints.getTaxDetails, {}, async (taxdata) => {
                        setTaxesdata(taxdata);
                    });
                    console.log(searchParams.get("OldQtnId"));
                    await postRequest(endpoints.getQuotationItems, { qtnid: searchParams.get("OldQtnId") }, async (data) => {
                        setQtnMaterialData(data);
                        console.log(data);
                    });
                    console.log(qtnMaterialData);

                    await postRequest(endpoints.getQuotationTaxes, { qtnid: searchParams.get("OldQtnId") }, async (data) => {
                        setQtnTaxdata(data);
                        //  setQtnMaterialData(data);
                        console.log(data);
                    });

                    await postRequest(endpoints.getQtntcDetails, {
                        qtnId: searchParams.get("OldQtnId")
                    }, async (seldata) => {
                        console.log("seldata");
                        console.log(seldata);
                        setSelectedTCData(
                            seldata.map((item) => {
                                return {
                                    ...item,
                                    highlight: item.highlight == 1 ? true : false,
                                };
                            })
                        );
                    });


                });
            }
        }
        apiCall();

    }, [])

    let assignvalues = async (parameters) => {

        if (parameters[0].QtnStatus == "Qtn Sent") {
            setSaveBtn(true);
            setImpRatesBtn(true);
            setMatNewAddBtn(true);
            setMatDeleteBtn(true);
        }
        console.log("Assign Values");
        console.log(parameters);
        console.log(parameters[0].QtnID);

        let item = parameters[0];
        console.log(moment(item.ValidUpTo).format('DD-MM-YYYY'));

        console.log("Qtn Value : " + item.Qtn_Value);
        setQtnid(item.QtnID);
        // setQuotationNo(item.QtnNo.replaceAll("_", "/"));
        setEnquiryDate(await moment(item.EnquiryDate).format('DD-MM-YYYY'));
        setEnquiryRef(item.EnquiryRef);

        let qdate = await moment(item.QtnDate).format('DD-MM-YYYY');
        setQuotationDate(qdate);
        setCustomerName(item.CustomerName);
        setCustAddress(item.CustAddress);
        setQuotationType(item.QtnType);
        setCustcode(item.Cust_Code);
        setCustTele(item.CustTele);
        setFormTele(item.CustTele);
        setContact(item.Contact);
        setE_mail(item.E_mail);
        setQtnformat(item.QtnFormat);
        setQtnstatus(item.QtnStatus);
        if (item.ValidUpTo != null) {
            setValidUpTo(moment(item.ValidUpTo).format('DD-MM-YYYY'));
        } else {
            let valdate = new Date(current);
            valdate.setMonth(valdate.getMonth() + 1);
            if (valdate.getMonth() == 0) {
                valdate.setMonth(12);
                // valdate.setFullYear(valdate.getFullYear() + 1);
                valdate = `${valdate.getDate().toString().padStart(2, '0')}-${(valdate.getMonth() + 1).toString().padStart(2, '0')}-${valdate.getFullYear() + 1}`;
            }
            else {
                valdate = `${valdate.getDate().toString().padStart(2, '0')}-${(valdate.getMonth() + 1).toString().padStart(2, '0')}-${valdate.getFullYear()}`;
            }
            console.log(valdate);
            //  let vupto = `${valdate.getDate().toString().padStart(2, '0')}/${(valdate.getMonth() + 1).toString().padStart(2, '0')}/${valdate.getFullYear()}`;
            setValidUpTo(valdate);

            let validupto1 = valdate;
        }

        //  setFormPreparedBy(item.PreparedBy);

        setGsttotal(item.QtnTax.toFixed(2));
        setQtnValue(item.Qtn_Value.toFixed(2));
        setQtnTotal(item.QtnTotal.toFixed(2));

        setQuotationState(item);

        await postRequest(endpoints.getQuotationItems, { qtnid: parameters[0].QtnID }, async (data) => {
            setQtnMaterialData(data);
            console.log(qtnMaterialData);
        });

        await postRequest(endpoints.getQtnTaxDetails, { qtnid: parameters[0].QtnID }, async (txdata) => {
            console.log("taxdata");
            console.log(txdata);
            if (txdata.length > 0) {
                setQtnTaxdata(txdata);
            } else {
                setQtnTaxdata([]);
            }

        });

        await postRequest(endpoints.getQtntcDetails, { qtnid: parameters[0].QtnID }, async (seldata) => {
            console.log("seldata");
            console.log(seldata);
            if (seldata.length > 0) {
                setSelectedTCData(
                    seldata.map((item) => {
                        return {
                            ...item,
                            highlight: item.highlight == 1 ? true : false,
                        };
                    })
                );
            }
        });


    }

    let selectedrowItem = async (item, id) => {
        //  console.log(profileList);
        setSelectedDwgId(id);
    }

    let sendquotemail = () => {

        console.log("Send Quotation Mail");

        // let newDate = moment(new Date()).format("DD MMM YY");
        let msubjct = Buffer.from(
            `Magod Laser Quotation : ${quotationNo}`
        ).toString("base64");
        let mbody = Buffer.from(
            `Dear Sir,\n
     
             Reference No: ${enquiryRef} \n
     
             We are pleased to offer our Lowest Quotation of Rs. ${qtntotal}/- for the same.
             Details are as given in the attachment.
             
             Looking forward to your placing an early order. We offer you the best of service in Quality and Timely Delivery
             
             
             With warm regards\n
             
             Yours Sincerely\n
             
             Magod Laser Machining Pvt Ltd :\n
             Unit: Jigani`
        ).toString("base64");
        console.log(mbody);
        // Content Changing option

        window.open(`/mailer?mlbody=${mbody}&mlsubjct=${msubjct}`, "_blank");


        // postRequest(endpoints.sendQuotationMail, { qtnno: quotationNo }, (resp) => {
        //     if (resp.status === "success") {
        //         toast.success("Quotation Mail Sent", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        //     }
        //     else {
        //         toast.warning("Failed to send Quotation Mail...");
        //     }
        //     console.log(resp);
        // });
    }

    let setHighlight = async (index, value) => {
        setSelectedTCData(
            selectedtcdata.map((item, i) => {
                if (i == index) {
                    return {
                        ...item,
                        highlight: value,
                    };
                }
                return item;
            })
        );
        // setQuotationTandCState(olddata);
    }

    let validateEmail = (e) => {
        let emal = e.target.value.replace(/[^A-Za-z0-9@.]/gi, "");
        setFormEmail(emal);
    }

    let calculateTotalTax = () => {
        // let totalAmt = 0;
        // qtnMaterialData.forEach((item) => {
        //     totalAmt += item.totalAmount;
        // });
        //return totalAmt;
        return Qtnvalue;
    }

    const onClickImportRates = async () => {
        console.log(qtnformat);
        if (qtnformat == "Profile") {
            //  setShow(true);
            //  e.preventDefault();

            //    ResetQtn();

            console.log("Import Rates");
            console.log(quotationNo);
            console.log(qtnid);
            let QtnNo = quotationNo;
            let quotevalue = 0;
            let qtntotal = 0;
            // postRequest(endpoints.getProfileDetbyQtnId, { qtnid }, (resp) => {
            postRequest(endpoints.getTaskDetailsDataByQtnId, { qtnid }, (resp) => {
                console.log(resp);
                qtnMaterialData = [];
                //  let olddata = qtnMaterialData;
                let newdata = {};
                let totalAmount = 0;
                for (let i = 0; i < resp.length; i++) {

                    console.log(resp[i].Unit_JobWork_Cost);
                    console.log(resp[i].Unit_Material_cost);
                    console.log(resp);
                    let itemname = resp[i].Dwg_Name;
                    let material = resp[i].Material + " " + resp[i].MtrlGrade + " " + resp[i].Thickness;
                    let operation = resp[i].Operation;
                    let quantity = resp[i].Qty;
                    let basicPrice = (Number(resp[i].Unit_JobWork_Cost) + Number(resp[i].Unit_Material_cost));
                    //  let discountAmount = resp[i].discountAmount > 0 ? Number(resp[i].discountAmount) : 0;
                    // let finalPrice = Number(basicPrice) - Number(discountAmount);

                    let discountAmount = resp[i].discountAmount > 0 ? Number(resp[i].discountAmount) : 0;
                    let finalPrice = Number(basicPrice) - Number(discountAmount);

                    totalAmount = Number(finalPrice * quantity);
                    console.log(basicPrice);
                    newdata = { itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
                    //olddata.push(newdata);
                    qtnMaterialData.push(newdata);
                    console.log(qtnMaterialData);
                    //  quotevalue += ((Number(resp[i].BasePrice) - Number(resp[i].DiscountAmunt)) * Number(resp[i].Quantity));
                    quotevalue += ((Number(basicPrice) - Number(discountAmount)) * Number(quantity));
                    console.log("Quote Value : " + quotevalue);
                }
                setQtnValue(quotevalue.toFixed(2));
                setQtnTotal(quotevalue.toFixed(2));
                console.log("Material Data");
                console.log(qtnMaterialData);
                setQtnMaterialData(qtnMaterialData);
                // setQtnMaterialData(newdata);
            });


            await postRequest(endpoints.getqtntaxdetailsbyqtnId, { qtnid }, async (txdata) => {
                console.log(txdata);
                setQtnTaxdata(txdata);
            });
            setShow(false);
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    const onClickYes = async () => {
        setShow(false);
        console.log("qtn type : " + qtntype);
        console.log("qtn format : " + qtnformat);
        console.log("qtn no : " + quotationNo);
        await postRequest(endpoints.qtnItemsDeleteandSave, {
            qtnno: quotationNo,
            format: qtntype,      //document.getElementById("format").value,
            qtnformat: qtnformat, //document.getElementById("formquotationtype").value,
        }, async (resp) => {
            if (resp.cntgtr) {
                //   if (window.confirm("Material Rate or Jobwork rate not set for all parts. Continue to import?")) {
                await postRequest(endpoints.qtnItemsDeletedSave, {
                    qtnno: quotationNo,
                },
                    async (resp) => {
                        toast.success('Quotation Saved', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                        return;
                    })
            }
            console.log(resp);

        });
    };


    const [show, setShow] = useState("");

    const ServiceEstimation = () => {
        toast.warning("ISO Form under development", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    }

    let locCalc = async (drwfile, material, grade, thickness, cb) => {
        // let loc = window.location.pathname;

        // console.log("Getting Sp Wt");
        postRequest(endpoints.getMaterialSpWt, { material, grade }, async (resp) => {
            //     console.log("Specific Wt : ");
            //     console.log(resp1[0]);
            //     console.log(resp1[0].Specific_Wt);
            //     console.log(drwfile);
            const formData = new FormData();
            //  window.dxffiles.forEach(async (dfile) => {
            formData.append("file", drwfile); //files[i]);
            formData.append("thickness", thickness);
            formData.append("specficWeight", resp[0].Specific_Wt);
            setSpecificWt(resp[0].Specific_Wt);
            console.log("Sending to Service");
            // const getCalcReq = await fetch('http://127.0.0.1:21341/getCalc', {
            const getCalcReq = await fetch('http://localhost:21341/getCalc', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const res = await getCalcReq.json();
            //   const data = await res.json();
            //    console.log("Get Calc Response");
            //   console.log(res.data);
            setLengthOfCut(res.data.lengthOfCut)
            setNoofPierces(res.data.noOfPierces)
            setPartNetArea(res.data.partNetArea)
            setOutOpen(res.data.outOpen)
            setComplexity(res.data.complexity)
            setHasOpenContour(res.data.hasOpenContour)
            setPartNetWeight(res.data.partNetWeight)
            setPartOutArea(res.data.partOutArea)
            setPartOutWeight(res.data.partOutWeight)
            setRectArea(res.data.rectArea)
            setRectWeight(res.data.rectWeight)
            //  setSpecificWt(res.Specific_Wt)
            cb({
                lengthOfCut: res.data.lengthOfCut, noOfPierces: res.data.noOfPierces,
                partNetArea: res.data.partNetArea, complexity: res.data.complexity,
                hasOpenContour: res.data.hasOpenContour, outOpen: res.data.outOpen,
                partNetWeight: res.data.partNetWeight, partOutArea: res.data.partOutArea,
                partOutWeight: res.data.partOutWeight, rectArea: res.data.rectArea,
                rectWeight: res.data.rectWeight
            });
            //, spWeight: res.data.Specific_Wt
            // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode,loc }]);
        });
    }

    let selectedTaxes = async (e) => {
        if (e.target.value === "Select Tax Name") {
            toast.error("Please Select Tax Name", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        console.log(e.target.value);

        let taxdet = taxesdata.find(taxdet => taxdet["TaxName"] === e.target.value);
        console.log(taxdet);
        if (taxdet != null) {
            console.log("Tax Name " + taxdet["TaxName"])
            setTaxName(taxdet["TaxName"]);
        }
        setTaxpercent(parseFloat(taxdet["Tax_Percent"]).toFixed(2));

    }

    let taxdetails = (e) => {
        e.preventDefault();
        // if (qtntaxdata.length > 0) {
        //     console.log("Tax Details - 1");
        //     let txableamt =0;
        //     let txamt = 0;
        //     let gtotamt =0;
        //     qtntaxdata.map((item) => {
        //         console.log(item.taxname);
        //         console.log(item.taxpercent);
        //         console.log(item.taxableamount);
        //         console.log(item.taxamt);

        //     });
        //     // setQtnTaxdata(qtntaxdata)
        // }
        console.log("Empty qtn tax data array...");
        if (qtntaxdata.length == 0) {
            setQtnTaxdata([]);
        }
        if (e.target.elements.taxname.value == "" || e.target.elements.taxname.value == null || e.target.elements.taxname.value == "Select Tax Name") {
            toast.error("Please Select Tax Name", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            setTaxableamount(0);
            setTaxAmt(0);
            return;
        }
        console.log(e.target.elements.taxname.value);
        let taxname = e.target.elements.taxname.value;
        let taxpercent = e.target.elements.taxpercent.value;
        taxableamount = e.target.elements.taxableamount.value;
        // taxableamount = Qtnvalue;

        setQtnValue(Number(taxableamount).toFixed(2));
        let taxamt = ((Number(taxableamount) * Number(taxpercent)) / 100);
        setTaxAmt(taxamt);
        console.log(taxamt);
        setGsttotal(taxamt.toFixed(2));
        setGndtotal((Number(taxableamount) + Number(taxamt)).toFixed(2));
        setQtnTotal((Number(taxableamount) + Number(taxamt)).toFixed(2));
        setTaxableamount(Number(taxableamount).toFixed(2));
        //let taxamt = e.target.elements.taxamt.value;
        // taxableamount = Gndtotal;
        console.log(taxableamount);


        let Gndtotal = Number(taxableamount) + Number(Gsttotal);
        // setGsttotal(Gndtotal);
        setGndtotal(Number(Gndtotal).toFixed(2));
        setQtnTotal(Number(Gndtotal).toFixed(2));
        console.log(taxamt);

        setTaxAmt(taxamt);
        console.log(taxableamount);
        setGndtotal(Number(Gndtotal)); // + taxamt);
        //  setTotalAmount(Number(Gsttotal) + Number(taxableamount));

        setQtnTaxdata([...qtntaxdata, { taxname, taxpercent, taxableamount, taxamt }])
        console.log(qtntaxdata);
        document.getElementById("taxname").innerText = "";
        document.getElementById("taxpercent").innerText = 0;
        document.getElementById("taxamt").innerText = 0;
        setTaxName("");
        setTaxpercent(0);
        setTaxAmt(0);
        setTaxableamount(0);
        setTaxDetailsShow(false);
        // }
    }



    const onClickSave = (e) => {
        console.log(qtnMaterialData);
        console.log(qtntaxdata);
        console.log(tcdata);
        console.log(selectedtcdata);
        
        console.log(selectedTaxes);
        if (qtnMaterialData.length > 0 && qtntaxdata.length == 0) {
            setBtnTaxDetails(true);
            setBtnPrintQtn(true);
            toast.error("Please add Tax Details", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        } else if (qtntaxdata.length > 0 && selectedtcdata.length == 0) { // tandcdata.length == 0) { //  selectedtcdata.length == 0) {
            setBtnTaxDetails(true);
            setBtnPrintQtn(true);
            toast.error("Please add Terms Details", { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
            return;
        } else if (qtnMaterialData.length > 0 && qtntaxdata.length > 0 && selectedtcdata.length > 0) {
            setBtnTaxDetails(false);
            setBtnPrintQtn(false);
        }

        let qtnno = quotationNo;
        let qtndate = current; //quotationDate;
        let valdate = new Date(current);
        valdate.setMonth(valdate.getMonth() + 1);
        if (valdate.getMonth() == 0) {
            valdate.setMonth(12);
            // valdate.setFullYear(valdate.getFullYear() + 1);
            valdate = `${valdate.getDate().toString().padStart(2, '0')}/${(valdate.getMonth() + 1).toString().padStart(2, '0')}/${valdate.getFullYear() + 1}`;
        }
        else {
            valdate = `${valdate.getDate().toString().padStart(2, '0')}/${(valdate.getMonth() + 1).toString().padStart(2, '0')}/${valdate.getFullYear()}`;
        }
        console.log(valdate);
        //  let vupto = `${valdate.getDate().toString().padStart(2, '0')}/${(valdate.getMonth() + 1).toString().padStart(2, '0')}/${valdate.getFullYear()}`;
        setValidUpTo(valdate);

        let validupto1 = valdate;
        let revisionno1 = revisionno;
        let enquiryDate1 = enquiryDate;
        let enquiryRef1 = enquiryRef;
        let preparedby = formpreparedby;
        let customer = customername;
        let contact1 = contact;
        let address = custAddress;
        let tele = formtele;
        let email = formemail;

        //  let qtntype = formquotationtype;
        console.log(qtntype);

        let qtnstatus = "Created";
        let format = searchParams.get("qtnformat");    //formformat;
        console.log(searchParams.get("qtnformat"));
        let qtnvalue = Number(Qtnvalue).toFixed(2); //   Gndtotal; //e.target.elements.formvalue.value;
        let qtntax = Number(Gsttotal).toFixed(2);   //Gsttotal;    //e.target.elements.formtax.value;
        let qtntotal = (Number(Qtnvalue) + Number(Gsttotal)).toFixed(2);  // Gndtotal + Gsttotal;      //e.target.elements.formtotal.value;
        let rateestimator = { qtnno, qtndate, validupto1, revisionno1, enquiryDate1, enquiryRef1, formpreparedby, customer, contact1, address, tele, email, qtntype: formquotationtype, qtnstatus, format, qtnvalue, qtntax, qtntotal };
        let newquotation = quotation;
        newquotation.rateestimator = rateestimator;
        setQuotationState(newquotation);


        //   setSelectedTCData(quotationtandc);
        console.log(selectedtcdata);
        console.log(qtntaxdata);
        console.log("Saving Quotation Data  ");
        console.log("Value : " + qtnvalue);
        console.log("Tax : " + qtntax);
        console.log("Total : " + qtntotal);
        postRequest(endpoints.updateQuotation, {
            qtnno, qtndate, validupto1, revisionno1, enquiryDate1, enquiryRef1, preparedby, customer, contact1, address, tele, email, qtntype,
            qtnstatus, qtnvalue, qtntax, qtntotal, selectedtcdata, qtntaxdata, qtnMaterialData
        }, (resp) => {
            console.log(resp)
            // if (resp.status === 200) {
            toast.success("Quotation Saved", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            //      }
        })

        // postRequest(endpoints.saveQuotationItems, { qtnno, qtnMaterialData }, (resp) => {
        //     if (resp.status === "success") {
        //         console.log("Quotation Items Saved");
        //     }
        // });

        postRequest(endpoints.saveqtnFindItemsList, { qtnno, qtnMaterialData }, (resp) => {
            if (resp.status === "success") {
                console.log("Quotation Items Saved");
            }
        });
    }



    let addMaterialData = async () => {

        if (itemname == "" || itemname == null) {
            toast.error("Please enter Item Name", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        else if (material == "" || material == null) {
            toast.error("Please enter Material", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        else if (operation == "" || operation == null) {
            toast.error("Please enter Operation", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        else if (quantity == "" || quantity == 0) {
            toast.error("Please enter Quantity", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        else if (basicPrice == "" || basicPrice == 0) {
            toast.error("Please enter Basic Price", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        // console.log("Before Saving Items Data  - " + qtnMaterialData.length);
        console.log(qtnMaterialData);
        let qvalue = (basicPrice - discountAmount) * quantity;
        console.log(qvalue);
        console.log(Qtnvalue);
        let id = qtnMaterialData.length + 1
        let qnvalue = Number(Qtnvalue);
        //  Qtnvalue = Number(qnvalue) + Number(qvalue);
        setQtnValue(Number(qnvalue) + Number(qvalue));
        console.log(Qtnvalue);

        setFinalPrice((basicPrice - discountAmount));
        setTotalAmount((basicPrice - discountAmount) * quantity);
        let olddata = qtnMaterialData
        setTaxableamount(Number(qvalue) + Number(qtnMaterialData.totalAmount));
        Gndtotal += Number(qtnMaterialData.totalAmount);
        //  setQtnValue(taxableamount);
        setQtnTotal(Gndtotal);
        let basePrice = basicPrice;
        let qtnno = quotation.quoteno;
        //  let newdata = { id, itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
        let newdata = { id, itemname, material, operation, quantity, basePrice, discountAmount, finalPrice, totalAmount }
        olddata.push(newdata)
        setQtnMaterialData(olddata)
        console.log(qtnMaterialData);
        console.log("Before Saving Items Data");
        // postRequest(endpoints.saveQuotationItems, { ...newdata, quotationNo }, 
        postRequest(endpoints.saveQuotationItems, { qtnMaterialData, quotationNo },
            async (resp) => {
                console.log(resp);
                toast.success("Item Added", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            });
        //  Gsttotal += qtnMaterialData.taxamt;
        let taxableAmt = 0;
        let gtotamt = 0;
        qtnMaterialData.forEach((item) => {
            taxableAmt += taxableAmt + item.totalAmount;
            gtotamt += gtotamt + item.totalAmount;
        });
        setTaxableamount(Number(taxableAmt));
        Gndtotal += Number(gtotamt);
        //   setQtnValue(taxableamount);
        setQtnTotal(Number(gtotamt));

        console.log(Qtnvalue);
        console.log(qtntotal);
        // console.log(Gndtotal);
        console.log(qtnMaterialData);
        clearData();

    }

    let UpdateMaterialData = async (e) => {
        // onClick of "Update" button in "Quotation Profile" tab
        console.log("Updating Material Data");
        // function updateDwgTable(e) {
        //async function updateDwgTable(e) {
        e.preventDefault();
        console.log("Update Material Data");
        console.log(selectedRow);
        if (selectedRow === null) {
            toast.warning("Please select an Item Name to edit", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        // selectedRow.itemname = itemname;
        // selectedRow.material = material;
        // selectedRow.operation = operation;
        // selectedRow.quantity = quantity;
        // selectedRow.basicPrice = basicPrice;
        // selectedRow.discountAmount = discountAmount;
        // selectedRow.finalPrice = finalPrice;
        // selectedRow.totalAmount = totalAmount;

        selectedRow.Name = itemname;
        selectedRow.Material = material;
        selectedRow.Operation = operation;
        selectedRow.Quantity = quantity;
        selectedRow.BasePrice = basicPrice;
        selectedRow.DiscountAmount = discountAmount;
        selectedRow.FinalPrice = finalPrice;
        selectedRow.TotalAmount = totalAmount;

        console.log(qtnMaterialData);

        //    let qbasevalue = 0;

        //  qbasevalue = calculateTotalTax();

        //    console.log(qbasevalue);

        // for (let i = 0; i < qtnMaterialData.length; i++) {

        //  console.log(qtnMaterialData[i].totalAmount);
        //  qbasevalue += parseFloat(qtnMaterialData[i].totalAmount);
        //  console.log(qbasevalue.toFixed(2));
        // };
        ////////////////////

        let taxableAmt = 0;
        let gtotamt = 0;
        console.log(qtnMaterialData);
        qtnMaterialData.forEach((item) => {

            //        console.log(item);
            console.log(item.TotalAmount);
            taxableAmt = taxableAmt + parseFloat(item.TotalAmount);
            console.log(taxableAmt);
            gtotamt = gtotamt + parseFloat(item.TotalAmount);
            console.log(gtotamt);
        });
        console.log(taxableAmt);
        setTaxableamount(Number(taxableAmt));
        Gndtotal = Number(gtotamt);
        //   setQtnValue(taxableamout);
        setQtnTotal(Number(gtotamt));

        setTaxableamount(Number(taxableAmt));
        Gndtotal += Number(gtotamt);
        setQtnValue(taxableAmt);
        setQtnTotal(Number(gtotamt));

        console.log(Qtnvalue);
        // setQtnValue(qbasevalue);


        //  let olddata = qtnMaterialData;
        //  olddata[selectedRow] = selectedRow;
        // setQtnMaterialData(olddata);
        clearData();

    }

    let clearData = () => {
        setItemName("")
        setMaterial("")
        setOperation("")
        setQuantity(0)
        setBasicPrice(0)
        setDiscountAmount(0)
        setFinalPrice(0)
        setTotalAmount(0)
    }

    let deleteItem = async () => {
        // selectedRow is the selected row for deletion
        if (selectedRow != null) {
            let oldQtnMaterialData = qtnMaterialData.filter((row) => {
                console.log(selectedRow)
                return row !== selectedRow;
            });
            setQtnMaterialData(oldQtnMaterialData);
            postRequest(endpoints.deleteQtnItemData, {
                qtnno: quotation.quoteno,
                item: selectedRow,
            }, (resp) => {
                if (resp.status === "success") {
                    toast.success("Item deleted", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                }
                // else {
                //   toast.warning("Failed to delete Item...");
                // }
                console.log(resp);
            });
            clearData();
            setSelectedRow(null);
        }
        // else { toast.warning("No Item to Delete..") }
    }

    const handleqtntype = (e) => {
        if (e.target.value == "*** Select  ***") {
            toast.error("Please Select Quotation Type", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            return;
        }
        setFormQuotationType(e.target.value);
        setQuotationType(e.target.value);
        console.log(e.target.value);

    }


    //   const handleClose = () => {
    //     setShow(false);

    //   }

    //   const onClickYes = () => {
    //     setShow(false);

    //     //  e.preventDefault();

    //     postRequest(endpoints.qtnItemsDeleteandSave, {
    //       qtnno: quotationNo,
    //       format: document.getElementById("format").value,
    //       qtnformat: document.getElementById("formquotationtype").value,
    //     }, async (resp) => {
    //       if (resp.cntgtr) {
    //         //   if (window.confirm("Material Rate or Jobwork rate not set for all parts. Continue to import?")) {
    //         await postRequest(endpoints.qtnItemsDeletedSave, {
    //           qtnno: quotationNo,
    //         },
    //           async (resp) => {
    //             toast.success('Quotation Saved', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    //             return;
    //           })
    //         await postRequest(endpoints.getQuotationItems, { qtnno: quotationNo }, async (quoteitems) => {
    //           console.log(quoteitems);
    //           setQtnMaterialData(quoteitems);
    //         })
    //       }

    //     });


    //   };

    //     e.preventDefault();
    //     //    ResetQtn();
    //     console.log("Import Drawings");
    //   //  console.log(e.target.elements.material.value);
    //     //console.log(document.getElementById("mtrlcode").value);
    //     let materialcode = mtrlcode; //e.target.elements.mtrlcode.value;
    //     let material = material; //e.target.elements.material.value;
    //     let grade = e.target.elements.grade.value;
    //     let thickness = e.target.elements.thickness.value;
    //     let process = processdescription; //e.target.elements.processdescription.value;
    //     let quantity = e.target.elements.quantity.value;
    //     let files = e.target.elements.files.files;
    //     for (let i = 0; i < files.length; i++) {

    //         let drwfname = files[i];
    //         console.log(drwfname);
    //         locCalc(drwfname, material, grade, thickness, (output) => {
    //             console.log(output);
    //             setQtnProfileData((olddata) => [...olddata, {
    //                 file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: output.lengthOfCut, noOfPierces: output.noOfPierces = true ? 1 : 0,
    //                 partNetArea: output.partNetArea, complexity: output.complexity, hasOpenContour: output.hasOpenContour, outOpen: output.outOpen, partNetWeight: output.partNetWeight,
    //                 partOutArea: output.partOutArea, partOutWeight: output.partOutWeight, rectArea: output.rectArea, rectWeight: output.rectWeight
    //             }]);
    //         });
    //         //---------------------------------- end -----------------------------------
    //         // setQtnProfileData((olddata) => [...olddata, { file: files[i], operation: process, material, grade, thickness, quantity, materialcode, lengthOfCut: loccalcoutput.lengthOfCut, noOfPierces: loccalcoutput.noOfPierces }]);
    //     }
    //     postRequest(endpoints.dxfupload, { files }, (res) => {
    //         console.log(res);
    //     })
    //     window.dxffiles = files;

    //     console.log(quotationNo);
    //     let month = quotationNo.split("_")[1]
    //     let monthName = ["January", "Febraury", "March", "April", "May", "June",
    //         "July", "August", "September", "October", "November", "December"][parseInt(month) - 1]
    //     let destPath = `\\QtnDwg\\` + monthName + "\\" + quotationNo;
    //     console.log(files);
    //     for (let i = 0; i < files.length; i++) {

    //         let drwfname = files[i].name;
    //         console.log(files[i]);
    //         postRequest(endpoints.dxfCopy, { drwfname, destPath }, (msgdata) => {
    //             console.log(msgdata);
    //         });
    //     }
    //     console.log(materialcode, material, grade, thickness, process, quantity, files);
    //     setShow(false);
    // };

    let rendertaxdetails = (qtntax) => {
        console.log(qtntax);
        return (
            <tr>
                {/* className="custtr" style={{ backgroundColor: (selectedDwgId === id ? '#5d88fc' : ''), cursor: 'pointer' }} id={id} onClick={() => selectedrowItem(mat, id)}> */}
                <td className="custtd">{qtntax.taxname ?? qtntax.TaxName}</td>
                <td className="custtd">{qtntax.taxpercent ?? qtntax.TaxPercent}</td>
                <td className="custtd">{qtntax.taxableamount ?? qtntax.TaxableAmount}</td>
                <td className="custtd">{(qtntax.taxamt) ?? (qtntax.TaxAmount)}</td>
                <td><button className="btn btn-danger btn-sm" style={{ fontSize: '11px' }} onClick={() => deleteTax(qtntax)}>Del</button></td>
            </tr>
        )
    }

    const deleteTax = (qtntax) => {
        console.log("Delete Tax");
        console.log(qtntax);
        let olddata = qtntaxdata.filter((row) => {
            console.log(qtntax)
            return row !== qtntax;
        });
        setQtnTaxdata(olddata);
        setGsttotal(Gsttotal - qtntax.taxamt);
        setGndtotal(Gndtotal - qtntax.taxamt);
    }

    return (
        <div>
            <ToastContainer />
            <ImportRates show={show} setShow={setShow} />

            <div>
                <h6 className="title" style={{ fontSize: '14px', fontWeight: 'bold' }}>Quotation Form - {searchParams.get("qtnformat")}</h6>

                <div className="row">
                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation No</label>
                    </div>
                    <div className="col-md-1">
                        {/* <input type="text" value={quotationNo} /> */}
                        <input type="text" style={{ fontSize: '13px' }} value={quotationNo} />
                        {/* value={searchParams.get("QuotationNo")} /> */}
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation Date</label>
                    </div>
                    <div className="col-md-1">
                        <input type="text" style={{ fontSize: '13px' }} value={quotationDate} />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Valid Upto</label>
                    </div>
                    <div className="col-md-1">
                        <input type="text" style={{ fontSize: '13px' }} value={validupto} />
                        {/* onChange={() => setValidUpTo(validupto)} */}
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Revision No</label>
                    </div>
                    <div className="col-md-1">
                        <input type="text" style={{ fontSize: '13px' }} value={revisionno} />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Date</label>
                    </div>
                    <div className="col-md-1">
                        <input id="enquiryDate" style={{ fontSize: '13px' }} type="text" disabled value={enquiryDate} />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quote status</label>
                    </div>
                    <div className="col-md-1 mt-1">
                        <input id="formqtnstatus" style={{ fontSize: '13px' }} disabled value={'Created'} />
                    </div>
                </div>

                <div className="row">


                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Ref</label>
                    </div>
                    <div className="col-md-3">
                        <input type="text" style={{ fontSize: '13px' }} onChange={(e) => setEnquiryRef(e.target.value)} value={enquiryRef} />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Prepared by</label>
                    </div>
                    <div className="col-md-3">
                        <input type="text" style={{ fontSize: '13px' }} onChange={(e) => setPreparedBy(e.target.value)} value={formpreparedby} />
                    </div>

                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
                    </div>
                    <div className="col-md-3">
                        <input id="customername" style={{ fontSize: '13px' }} type="text" disabled value={customername} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Contact</label>
                    </div>
                    <div className="col-md-3 mt-1">
                        <input id="contact" type="text" style={{ fontSize: '13px' }} onChange={(e) => setContact(e.target.value)} value={contact} />
                    </div>
                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quote Type</label>
                    </div>
                    {qtnformat === "Profile" ?
                        <div className="col-md-1 mt-1">
                            {/* <label className="form-label">Quotation Type</label> */}
                            {/* value={quotation["qtntype"]} */}
                            <select className="ip-select" style={{ fontSize: '13px' }} id="formquotationtype" onChange={(e) => handleqtntype(e)} value={quotationType}>
                                <option value="Select">*** Select ****</option>
                                <option value="JobWork">JobWork</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        : qtnformat === "Service" ?
                            <div className="col-md-1 mt-1">
                                {/* <label className="form-label">Quotation Type</label> */}
                                {/* value={quotation["qtntype"]} */}
                                <select className="ip-select" style={{ fontSize: '13px' }} id="formquotationtype" onChange={(e) => handleqtntype(e)} value={quotationType}>
                                    <option value="Select">*** Select ****</option>
                                    <option value="Service">Service</option>
                                    <option value="Service Contract">Service Contract</option>
                                </select>
                            </div>
                            :
                            <div className="col-md-1 mt-1">
                                {/* <label className="form-label">Quotation Type</label> */}
                                {/* value={quotation["qtntype"]} */}
                                <select className="ip-select" style={{ fontSize: '13px' }} id="formquotationtype" onChange={(e) => handleqtntype(e)} value={quotationType}>
                                    <option value="Select">*** Select ****</option>
                                    <option value="Fabrication">Fabrication</option>
                                </select>
                            </div>
                    }

                    {/* 
                    <div className="col-md-3">
                        <label className="form-label">Quotation Type</label>
                        <select className="ip-select" onChange={(e) => setQtntype(e.target.value)} value={qtntype} >
                            <option value="JobWork">JobWork</option>
                            <option value="Sales">Sales</option>
                            <option value="Service">Service</option>
                            <option value="Service Contract">Service Contract</option>
                        </select>
                    </div> */}
                    {/* <div className="col-md-3">
                        <label className="form-label">Quotation status</label>
                        <input id="formqtnstatus" disabled value={'Created'} />
                    </div> */}
                    <div className="col-md-1">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Email</label>
                    </div>
                    <div className="col-md-5 mt-1">
                        <input id="e_mail" type="email" style={{ fontSize: '13px' }} onChange={validateEmail} value={e_mail} />
                    </div>


                </div>

                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-1">
                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }} >Telephone</label>
                            </div>
                            <div className="col-md-2 mt-1">
                                <input id="formtele" type="text" style={{ fontSize: '13px' }} onChange={(e) => setFormTele(e.target.value)} value={formtele} />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }} >Address</label>
                            </div>
                            <div className="col-md-8 mt-1">
                                <input id="custAddress" style={{ fontSize: '13px' }} type="text" value={custAddress} />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-1">
                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Value</label>
                            </div>
                            <div className="col-md-3">
                                <input id="formvalue" style={{ fontSize: '13px' }} disabled value={Qtnvalue} />
                                {/* value={calculateTotalTax()} /> */}
                            </div>

                            <div className="col-md-1">
                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Tax</label>
                            </div>
                            <div className="col-md-3">
                                <input id="formtax" style={{ fontSize: '13px' }} disabled value={Gsttotal} />
                            </div>
                            <div className="col-md-1">
                                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Total</label>
                            </div>
                            <div className="col-md-3">
                                <input id="formtotal" style={{ fontSize: '13px' }} disabled value={parseFloat(Qtnvalue) + parseFloat(Gsttotal)} />
                                {/* value={calculateTotalTax() + Gsttotal} /> */}
                            </div>
                        </div>

                    </div>

                    <div className=" col-md -3 mt-1 ms-2" id="formformat"
                        style={{
                            border: "1px solid black",
                            paddingBottom: "5px",
                            paddingLeft: "30px",
                            marginTop: "5px",
                        }}
                    >
                        <h8>
                            <b>Format</b>
                        </h8>
                        {qtnformat === "Profile" ?
                            <div className="col-md-12 mt-1" style={{ display: "flex", gap: "40px" }}>
                                <label className="" style={{ paddingRight: "4px" }}>
                                    {" "}
                                    Laser Cutting
                                </label>
                                <input className="form-check-input mt-1" name="pformat" defaultChecked type="radio" />
                            </div>
                            : ""}
                        {qtnformat === "Service" ?
                            <div>
                                <div className="col-md-12 mt-1" style={{ display: "flex", gap: "15px" }}>
                                    <label className=""> Welding/Cladding</label>
                                    <input className="form-check-input mt-2" name="pformat" defaultChecked type="radio" />
                                </div>
                                <div className="col-md-12 mt-1" style={{ display: "flex", gap: "48px" }}>
                                    <label className="" style={{ paddingRight: "3px" }}>
                                        Batch Quote
                                    </label>
                                    <input className="form-check-input mt-2" name="pformat" type="radio" />
                                </div>
                            </div>
                            : ""}
                        {qtnformat === "Fabrication" ?
                            <div className="col-md-12 mt-1" style={{ display: "flex", gap: "58px" }}>
                                <label className="" style={{ paddingRight: "3px" }}>
                                    Fabrication
                                </label>
                                <input className="form-check-input mt-2" name="pformat" defaultChecked type="radio" />
                            </div>
                            : ""}
                    </div>

                </div>

                <div className="row mt-1">
                    <button
                        className="button-style mt-1 group-button"
                        style={{ width: "80px", fontSize: '13px', fontWeight: 'bold' }} disabled={saveBtn}
                        onClick={onClickSave}>
                        Save
                    </button>

                    <button
                        className="button-style mt-1 group-button"
                        style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={handleOpenDwgFolder}>
                        Drawing Folder
                    </button>
                    <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} disabled={btnprintqtn}
                        onClick={() => {
                            switch (qtnformat) {
                                case "Profile":
                                    setOpenPrfPrintModal(true);
                                    //     navigate("/quotation/printprofileqtn")
                                    break;
                                case "Service":
                                    setOpenSvrPrintModal(true);
                                    // navigate(`/quotation/PrintServiceQtn?QtnNo=${quotationNo}`)
                                    break;
                                case "Fabrication":
                                    //    navigate("/quotation/printfabricationqtn")
                                    break;
                                default:
                                    console.log("Bad Quotation Format")
                                    console.log(quotation);
                                    break;
                            }
                        }}>Print Quotation</button>

                    <button className="button-style mt-1 group-button"
                        style={{ width: "120px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => { sendquotemail() }}>
                        Send Quote
                    </button>

                    {qtnformat == "Profile" ?
                        //  <button className="button-style mt-2 group-button" style={{ width: "150px" }} onClick={() => navigate(`/quotation/updrateestimator?quotationNo=${quotation.QtnNo}`)}>Rate Estimator</button>
                        <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => navigate(`/quotation/updrateestimator?QtnNo=${quotationNo}`)}>Rate Estimator</button>
                        : (qtnformat == "Service" ?
                            <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={ServiceEstimation}>Rate Estimator</button>
                            :
                            <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => {
                                navigate(`/quotation/qtnfabrication?QtnNo=${searchParams.get("QtnNo")}`)
                            }}>Rate Estimator</button>
                        )}


                    {qtnformat === "Profile" ?
                        <button className="button-style mt-1 group-button"
                            style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} disabled={impratesBtn}
                            onClick={() => onClickImportRates()}>
                            Import Rates
                        </button>
                        : null}
                    <button className="button-style mt-1 group-button"
                        style={{ width: "100px", fontSize: '13px', fontWeight: 'bold' }}
                        onClick={() => navigate(-1)}>
                        Close
                    </button>
                </div>
            </div >

            <div className="p-1">
                <div
                    className="row"
                    style={{ marginLeft: "-3px", marginBottom: "50px" }}>
                    <Tabs
                        id="QuoteDetails" defaultactivekey="quotation"
                        onSelect={(k) => setKey(k)}
                        className="mb-1 mt-1 tab_font" >
                        <Tab eventKey="quotation" title="Quotation Item List">
                            <div className="row mb-1">
                                <div className="col-md-8">
                                    <div className="table-data" style={{ height: "250px", overflowX: 'scroll', overflowY: "scroll" }}>

                                        <Table striped className="table-data border" style={{ overflowY: "scroll", overflowX: "scroll" }}>
                                            <thead className="tableHeaderBGColor">
                                                <tr style={{ fontSize: '13px', fontWeight: 'bold', overflowY: "scroll", overflowX: "scroll", }}>
                                                    {/* <th>srl</th> */}
                                                    <th>Item Name</th>
                                                    <th>Material</th>
                                                    <th>Operation</th>
                                                    <th>Quantity</th>
                                                    <th>Basic Price</th>
                                                    <th>Disc Amount</th>
                                                    <th>Final Price</th>
                                                    <th>Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {qtnMaterialData.map((row, index) => {
                                                    console.log("Selected Row : " + row);
                                                    console.log(row["itemname"] ?? row["Name"]);
                                                    console.log(row["material"] ?? row["Material"]);
                                                    console.log(row["operation"] ?? row["Operation"]);
                                                    console.log(row["finalPrice"] ?? row["FinalPrice"]);
                                                    console.log(row["totalAmount"] ?? row["TotalAmount"]);
                                                    return (
                                                        <tr key={index} style={{ backgroundColor: selectedRow === row ? '#5d88fc' : '', cursor: 'pointer' }} onClick={() => {
                                                            setItemName(row["itemname"] ?? row["Name"]);
                                                            setMaterial(row["material"] ?? row["Material"]);
                                                            setOperation(row["operation"] ?? row["Operation"]);
                                                            setQuantity(row["quantity"] ?? row["Quantity"]);
                                                            setBasicPrice(row["basicPrice"] ?? row["BasePrice"]);
                                                            setDiscountAmount(row["discountAmount"] ?? row["DiscountAmount"]);
                                                            setFinalPrice(row["finalPrice"] ?? row["FinalPrice"]);
                                                            setTotalAmount(row["totalAmount"] ?? row["TotalAmount"]);
                                                            setSelectedRow(row);
                                                            console.log(row);
                                                        }}>
                                                            <td>{row["itemname"] ?? row["Name"]}</td>
                                                            <td>{row["material"] ?? row["Material"]}</td>
                                                            <td>{row["operation"] ?? row["Operation"]}</td>
                                                            <td>{row["quantity"] ?? row["Quantity"]}</td>
                                                            <td>{(row["basicPrice"] ?? row["BasePrice"])}</td>
                                                            <td>{(row["discountAmount"] ?? row["DiscountAmount"])}</td>
                                                            <td>{(row["finalPrice"] ?? row["FinalPrice"])}</td>
                                                            <td>{(row["totalAmount"] ?? row["TotalAmount"])}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>

                                    <div className="table-data mt-1" style={{ height: "130px", overflowY: "scroll" }}>
                                        <Table striped className="table-data border" style={{ overflowY: "scroll", overflowX: "scroll" }}>
                                            <thead className="tableHeaderBGColor">
                                                <tr style={{ overflowY: "scroll", overflowX: "scroll", }}>
                                                    {/* <th>srl</th> */}
                                                    <th>Tax Name</th>
                                                    <th>Tax %</th>
                                                    <th>Taxable Amount</th>
                                                    <th>Tax Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {(qtntaxdata != null && qtntaxdata.length > 0) ? qtntaxdata.map((qtntax) => renderTaxData(qtntax)) : ""} */}
                                                {(qtntaxdata != null && qtntaxdata != undefined) ? qtntaxdata.map((qtntax) => rendertaxdetails(qtntax)) : ""}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="ip-box form-bg ">
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Item Name</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} id="itemname" type="text" onChange={(e) => {
                                                        if (e.target.value != "" || e.target.value != null) {
                                                            setItemName(e.target.value);
                                                        } else {
                                                            toast.warning("Please enter valid Item Name");
                                                        }
                                                    }} value={itemname} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3 mt-1">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Material</label>
                                                </div>
                                                <div className="col-md-9 mt-1">
                                                    <input className="in-field" style={{ fontsize: '13px' }} type="text" id="material" onChange={(e) => {
                                                        if (e.target.value != "" || e.target.value != null) {
                                                            setMaterial(e.target.value);
                                                        } else {
                                                            toast.warning("Please enter valid Material");
                                                        }
                                                    }} value={material} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3 mt-2">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Operation</label>
                                                </div>
                                                <div className="col-md-9 mt-1">
                                                    <input className="in-field" style={{ fontsize: '13px' }} type="text" id="operation" onChange={(e) => {
                                                        if (e.target.value != "" || e.target.value != null) {
                                                            setOperation(e.target.value);
                                                        } else {
                                                            toast.warning("Please enter valid Operation");
                                                        }
                                                    }} value={operation} />
                                                </div>
                                            </div>

                                            <div className="row mt-2">
                                                {/* <div className="col-md-6"> */}
                                                {/* <div className="row"> */}
                                                <div className="col-md-3">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Quantity</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} id="quantity" type="text" onChange={(e) => {
                                                        if (e.target.value > 0 || e.target.value != "") {
                                                            setQuantity(e.target.value);
                                                        } else {
                                                            toast.warning("Please enter valid quantity", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                                                        }
                                                    }} value={quantity} />
                                                </div>
                                            </div>
                                            {/* </div> */}
                                            {/* <div className="col-md-6"> */}
                                            <div className="row mt-2">
                                                <div className="col-md-3">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Base Price</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} id="basicprice" type="text" min="1" max="9999999.99" pattern="[0-9]." value={basicPrice}
                                                        onChange={(e) => {
                                                            if (e.target.value > 0 || e.target.value != "") {
                                                                setBasicPrice(Number(e.target.value));
                                                                setFinalPrice(Number(e.target.value) - Number(discountAmount));
                                                                setTotalAmount((Number(quantity * e.target.value)).toFixed(2));
                                                            } else {

                                                                toast.warning("Please enter valid price", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                                                            }
                                                        }} />
                                                </div>
                                            </div>
                                            {/* </div> */}

                                            <div className="row mt-2">
                                                {/* <div className="col-md-6"> */}
                                                <div className="col-md-3">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Discnt Amt</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} id="discountAmount" value={discountAmount} onChange={(e) => {
                                                        setDiscountAmount(parseFloat(e.target.value));
                                                        setFinalPrice(basicPrice - parseFloat(e.target.value));
                                                        setTotalAmount(quantity * (basicPrice - parseFloat(e.target.value)));
                                                    }} />
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6"> */}
                                            <div className="row mt-2">
                                                <div className="col-md-3 ">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Final Price</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} id="finalPrice" type="text" disabled value={finalPrice} />
                                                </div>
                                                {/* </div> */}
                                            </div>

                                            <div className="row mt-2">
                                                {/* <div className="col-md-12"> */}
                                                <div className="col-md-3 ">
                                                    <label className="" style={{ fontsize: '13px', fontWeight: 'bold' }}>Total Amt</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input className="in-field" style={{ fontsize: '13px' }} type="text" id="totalAmount" disabled value={(totalAmount)} />
                                                </div>
                                                {/* </div> */}
                                            </div>

                                        </div>
                                        <div className="row justify-content-center mt-1">
                                            <button className="button-style " style={{ width: "120px", fontsize: '13px', fontWeight: 'bold' }} disabled={matNewAddBtn} onClick={addMaterialData}>
                                                New
                                            </button>
                                            <button className="button-style " style={{ width: "120px", fontsize: '13px', fontWeight: 'bold' }} disabled={!selectedRow} onClick={UpdateMaterialData}>
                                                Update
                                            </button>
                                            <button className="button-style " style={{ width: "120px", fontsize: '13px', fontWeight: 'bold', marginLeft: "4px" }} disabled={matDeleteBtn} onClick={() => deleteItem()}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mt-2 mb-1">
                                        <button className="button-style " style={{ width: "250px", fontsize: '13px', fontWeight: 'bold' }} onClick={() => { setTaxDetailsShow(true) }} >
                                            Tax Details Click Here
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </Tab>

                        <Tab eventKey="termsandcondition" title="Terms & Conditions">
                            {/* <TermsandCondition/> */}
                            <div className='row'>
                                {/* <div className='col-md-5 col-sm-12 mt-3'> */}

                                <div className='col-md-6 mb-5'>
                                    <div style={{ maxheight: '250px', overflowY: 'scroll' }}>
                                        <button className="button-style" style={{ width: '120px' }} onClick={() => setAddNotes(true)}>Add Notes</button>
                                        {addnotes ? <input type="text" style={{ width: '400px', height: '30px', padding: '0px 0px 0px 10px' }} placeholder="Enter Notes" value={addnotesentry} onChange={(e) => setAddNotesEntry(e.target.value)} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setAddNotes(false)
                                                setSelectedTCData([...selectedtcdata, {
                                                    ID: null,
                                                    QtnId: selectedtcdata[0].QtnId,
                                                    Terms: addnotesentry,
                                                    Under: "",
                                                    highlight: false,
                                                }]);
                                                setAddNotesEntry("");
                                            }
                                        }} /> : ""}
                                        {loaded ? <SelectTableComponent tcdata={tcdata} selection={(data) => { setSelectedTCData(data) }} tablename="Terms" style={{ maxHeight: '250px', overflowY: 'scroll' }} /> : ""}
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div style={{ overflowY: 'scroll', maxHeight: '250px' }}>
                                        <table striped className="table-data border ">
                                            <thead className="tableHeaderBGColor">
                                                <tr>
                                                    <th style={{ width: '15px' }}>Bold</th>
                                                    <th style={{ width: '420px' }}>Terms</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedtcdata.length > 0 ? selectedtcdata.map((tc, id) => {
                                                    return (
                                                        <tr className="custtr" key={id} onClick={() => console.log(tc)}>
                                                            <td className="custth" style={{ width: '60px', height: '20px' }}><input type="checkbox" id={id} checked={selectedtcdata[id].highlight} onChange={(e) => { setHighlight(id, e.target.checked) }} /></td>
                                                            <td className="custth" style={{ width: '50px', height: '20px' }}>{tc["Terms"]}</td>
                                                        </tr>
                                                    )
                                                }) : <tr><td colSpan={2}>No Items Selected</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='col-md-2'></div>
                                </div>

                            </div >
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div>
                {searchParams.get("qtnformat") == "Service" ?
                    <SvrModalPrintQuotation openSvrPrintModal={openSvrPrintModal} QtnNo={quotationNo} handleClose={setOpenSvrPrintModal} />
                    :
                    <PrfModalPrintQuotation openPrfPrintModal={openPrfPrintModal} QtnNo={quotationNo} handleClose={setOpenPrfPrintModal} />
                }
            </div>
            <div className="row">
                <Modal show={taxDetailsshow}>
                    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
                        <Modal.Title style={{ fontFamily: 'Roboto', fontSize: '18px' }}>Tax Details for Quotation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={taxdetails}>
                            <div className="mb-3">
                                <Form.Group>
                                    <Form.Label>Tax Name</Form.Label>
                                    <select className="ip-select" size="sm" placeholder="Select Tax Name" onChange={(e) => selectedTaxes(e)} id="taxname">
                                        <option selected disabled>Select Tax Name</option>

                                        {taxesdata ? taxesdata.map((tax) => {
                                            return (
                                                <option style={{ fontFamily: 'Roboto', fontSize: '14px' }} value={tax["TaxName"]}>{tax["TaxName"]}</option>
                                            )
                                        }) : null}
                                    </select>
                                    {/* <Form.Control type="text" style={{ height: '30px' }} /> */}
                                </Form.Group>
                                <Form.Group controlId="taxpercent">
                                    <Form.Label>Tax %</Form.Label>
                                    <Form.Control type="float" style={{ height: '30px' }} value={taxpercent} />
                                    {/* onChange={(e) => setTaxpercent(e.target.value)} */}

                                </Form.Group>
                                <Form.Group controlId="taxableamount">
                                    <Form.Label>Taxable Amount</Form.Label>
                                    <Form.Control type="text" style={{ height: '30px' }} disabled value={parseFloat(calculateTotalTax()).toFixed(2)} />
                                </Form.Group>
                                <Form.Group controlId="taxamt">
                                    <Form.Label>Tax Amount</Form.Label>
                                    <Form.Control type="text" style={{ height: '30px' }} disabled value={parseFloat(calculateTotalTax() * taxpercent / 100).toFixed(2)} />
                                </Form.Group>
                            </div>
                            <div className="row" style={{ justifyContent: 'space-between', width: '100%', paddingRight: '70px' }}>
                                <div style={{ width: '120px' }}>
                                    <button className="button-style" type="submit">Accept</button>
                                </div>
                                <div style={{ width: '120px' }}>
                                    <button className="button-style" type="button" onClick={() => { setTaxDetailsShow(false) }}>Close</button>
                                </div>

                            </div>
                        </Form>
                    </Modal.Body>
                </Modal >

                {/* Set Tax Details Modal */}
            </div>
            {/* <div className="row">
                <Modal show={dwgfoldershow}>
                    <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
                        <Modal.Title style={{ fontFamily: 'Roboto', fontSize: '18px' }} >Drawing Folder</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ol style={{ padding: '0px 0px 0px 10px', fontFamily: 'Roboto', fontSize: '12px' }}>
                                {custdwgfiles.map(files => (
                                    <li>{files}</li>
                                ))}

                            </ol>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button onClick={handleCloseDwgFolder} className="button-style " style={{ width: "120px" }}>Close</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal >

            </div> */}
            <div className="row">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Magod Laser:Import Rates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> Current Details will be  deleted before importing.Continue?
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={onClickYes}>
                            {/* style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }} */}
                            Yes
                        </button>
                        <button variant="secondary" onClick={handleClose}>
                            No
                        </button>
                    </Modal.Footer>
                </Modal>



            </div>
        </div >
    );
}
