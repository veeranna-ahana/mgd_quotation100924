import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Tables from "../../../../../components/Tables";
//import NavTab from "./Components/NavTab";
import "../../quotation.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import moment from "moment";
//import ImportRates from "./ImportRates";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuotationContext } from "../../../../../context/QuotationContext";
import { useQuotationItemListContext } from "../QuotationItemListContext";
import { useQuotationTandCContext } from "../QuotationTandCContext";
import { Form, Modal, Table } from 'react-bootstrap';
import SelectTableComponent from "../AddDetails/Components/selectgrid";
//import ServicePrintQuotation from "../Print Quote/Quotation/Service/ServicePrintQuotation";
//import ProfilePrintQuotation from "../Print Quote/Quotation/Profile/ProfilePrintQuotation";
import SvrModalPrintQuotation from "../Print Quote/Quotation/Service/ServicePrintQuotation";
import PrfModalPrintQuotation from "../Print Quote/Quotation/Profile/ProfilePrintQuotation";
import { useRateEstimatorContext } from "../../../../../context/RateEstimatorContext";
import { Buffer } from "buffer";

const { getRequest, postRequest } = require("../../../../api/apiinstance");
const { endpoints } = require("../../../../api/constants");

export default function Adddetails() {

  const [key, setKey] = useState("quotation");
  let { quotation, setQuotationState } = useQuotationContext();
  let { quotationitemlist, setQuotationItemListState } = useQuotationItemListContext();
  let { quotationtandc, setQuotationTandCState } = useQuotationTandCContext();

  const { setProfileList } = useRateEstimatorContext();

  const [show, setShow] = useState("");
  let [mtrldata, setMtrldata] = useState([]);
  let [procdata, setProcdata] = useState([]);

  let [taxDetailsshow, setTaxDetailsShow] = useState(false);
  let [addnotes, setAddNotes] = useState(false);
  let [addnotesentry, setAddNotesEntry] = useState("");
  let [taxpercent, setTaxpercent] = useState("");
  let [openSvrPrintModal, setOpenSvrPrintModal] = useState(false);
  let [openPrfPrintModal, setOpenPrfPrintModal] = useState(false);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  let [selectedRow, setSelectedRow] = useState('');
  let [custdwgfiles, setCustDwgFiles] = useState([]);
  let [empdata, setEmpdata] = useState([]);
  let [taxesdata, setTaxesdata] = useState([]);
  let [tandcdata, setTandCdata] = useState([]);
  let [contact, setContact] = useState("");
  let [custAddress, setCustAddress] = useState([]);
  let [quotationDate, setQuotationDate] = useState([]);
  let [quotationType, setQuotationType] = useState("");
  let [qtnMaterialData, setQtnMaterialData] = useState([]);
  let [qtndata, setQtndata] = useState([]);
  let [qtntaxdata, setQtnTaxdata] = useState([]);
  let [selectedtcdata, setSelectedTCData] = useState([]);
  let [selectedterms, setSelectedTerms] = useState([]);
  let [formformat, setFormformat] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [loaded2, setLoaded2] = useState(false);
  let [qtnitemdata, setQtnItemData] = useState([]);

  let [formtele, setFormTele] = useState("");
  let [formemail, setFormEmail] = useState("");
  let [formpreparedby, setFormPreparedby] = useState("");
  let [quotationNo, setQuotationNo] = useState("");
  let [enquiryDate, setEnquiryDate] = useState("");
  let [validupto, setValidUpTo] = useState("");
  let [enquiryRef, setEnquiryRef] = useState("");
  let [customername, setCustomerName] = useState("");
  let [revisionno, setRevisionNo] = useState("");

  let [itemname, setItemName] = useState("");
  let [material, setMaterial] = useState("");
  let [materialDropdown, setMaterialDropdown] = useState([]);
  let [operation, setOperation] = useState("");
  let [operationDropdown, setOperationDropdown] = useState([]);
  let [quantity, setQuantity] = useState(0);
  let [basicPrice, setBasicPrice] = useState("");
  let [discountAmount, setDiscountAmount] = useState("");
  let [finalPrice, setFinalPrice] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);

  let [taxamount, setTaxamount] = useState(0);
  let [taxamt, setTaxAmt] = useState(0);
  let [taxname, setTaxName] = useState("");

  let [qtnvalue, setQtnValue] = useState(0);
  let [qtntax, setQtnTax] = useState(0);
  let [qtntotal, setQtnTotal] = useState(0);

  let [mtrlcode, setMtrlCode] = useState("");
  let [processdescription, setProcessDescription] = useState("");
  let [lengthOfCut, setLengthOfCut] = useState(0);
  let [noOfPierces, setNoofPierces] = useState(0);
  let [Task_Qtn_JW_Rate, setTask_Qtn_JW_Rate] = useState(0);
  let [matrlcost, setMtrlCost] = useState(0);
  let [unitrate, setUnitRate] = useState(0);
  let [specificwt, setSpecificWt] = useState(0);
  let [qtnProfileData, setQtnProfileData] = useState([]);

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
  let [pformat, setPFormat] = useState("");
  let [selectedDwgId, setSelectedDwgId] = useState("");

  let [taxableamount, setTaxableamount] = useState(0);
  let [Gndtotal, setGndtotal] = useState(0);
  let [Gsttotal, setGsttotal] = useState(0);
  let [formquotationtype, setFormQuotationType] = useState("");
  let [format, setQtnformt] = useState("");
  let [qtnStatus, setQtnStatus] = useState("");

  const [dwgfoldershow, setDwgFolderShow] = useState(false);
  const [dxffiles, setDxfFiles] = useState([]);
  const [files, setFiles] = useState([]);
  let [selectedid, setSelectedId] = useState("");

  //******** button details */
  let [savebtn, setSaveBtn] = useState(false);
  let [btntaxdetails, setBtnTaxDetails] = useState(false);
  let [btnprintqtn, setBtnPrintQtn] = useState(true);
  // let [importratesbtn, setImportRatesBtn] = useState(false);
  // let [printbtn, setPrintBtn] = useState(true);

  const current = new Date();
  // setFormformat(searchParams.get("qtnformat"));
  const [qtnno, setQtnno] = useState(searchParams.get("qtnno"));

  const getHeadings = () => {
    //   if (qtnMaterialData != null && qtnMaterialData[0] != undefined) return Object.keys(qtnMaterialData[0]);
    return [];
  };

  const getHeadings1 = () => {
    if (qtntaxdata != null && qtntaxdata[0] != undefined) return Object.keys(qtntaxdata[0]);
    return [];
  };


  const handleOpenDwgFolder = () => {

    let month = new Date(Date.now()).toLocaleString('en-US', { month: 'long' });
    let quoteno = quotationNo.replaceAll("/", "_");
    let fpath = `C:\\Magod\\Jigani\\QtnDwg\\${month}\\${quoteno}`;

    //  handlePathSubmit(fpath);


    //************ New Commented - 12-01-24*************** */
    let input = document.createElement('input');
    input.filepath = fpath;
    input.type = 'file';
    //input.multiple = true;
    input.accept = '.dxf';
    // input.filepath = `c:\\Magod\\Jigani\\QtnDwg\\${month}\\${quotationNo}`;      //DXF`;
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      console.log(files);
    };
    input.click();
  }
  const handleCloseDwgFolder = () => setDwgFolderShow(false);

  // const handlePathSubmit = async (folderPath) => {
  //   Fetch files for the given folderPath and update the state
  //   try {
  //     postRequest(endpoints.getDxfFileNames, { quoteno: quotationNo, filepath: folderPath }, (dwgdata) => {
  //       console.log(dwgdata);
  //       setCustDwgFiles(dwgdata.files);
  //       setFiles(dwgdata.files)
  //     });
  //     const response = await fetch(`/api/files?path=${encodeURIComponent(folderPath)}`);
  //     const data = await response.json();
  //     setFiles(data);
  //     console.log("Files : ", files);
  //   } catch (error) {
  //     console.error('Error fetching files:', error);
  //   }
  // };

  useEffect(() => {

    async function fetchData() {
      if (!quotation) {
        navigate("/quotation/");
        return;
      }

      //localStorage.getItem("LazerUser", JSON.stringify(data));
      let uname = JSON.parse(localStorage.getItem("LazerUser"));
      if (uname == null) {
        toast.error("Please Login", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        navigate("/login");
        return;
      }
      setFormPreparedby(uname.data[0].Name);
      console.log(quotation);
      setFormformat(quotation.qtnformat);
      setQuotationNo(quotation.quoteno.replaceAll("_", "/"));
      setEnquiryDate(quotation.enquiryDate);
      setEnquiryRef(quotation.enquiryRef);
      setContact(quotation.contact);
      setCustomerName(quotation.customerName);
      setQtnStatus(quotation.qtnStatus);
      setFormEmail(quotation.e_mail);
      setFormTele(quotation.custTele);
      setCustAddress(quotation.custAddress);
      // postRequest(endpoints.getRevSelectedQuotation, { qtnno: quotation.quoteno }, (qtndetails) => {
      //   console.log(qtndetails);
      //   setFormQuotationType(qtndetails[0].QtnType);
      // });
      setFormQuotationType(quotation.formquotationtype);
      setFormformat(quotation.qtnformat);
      setQuotationDate(`${current.getDate().toString().padStart(2, '0')}/${(current.getMonth() + 1).toString().padStart(2, '0')}/${current.getFullYear()}`);
      setQtnValue(quotation.qtnvalue);
      setQtnTax(quotation.qtntax);
      setQtnTotal(quotation.qtntotal);
      // let validupto1 = new Date(current).getTime();
      // validupto1 += (30 * 24 * 60 * 60 * 1000);
      // validupto1 = new Date(validupto1);
      // //  console.log(validupto1);
      // let vupto = `${validupto1.getDate().toString().padStart(2, '0')}/${(validupto1.getMonth() + 1).toString().padStart(2, '0')}/${validupto1.getFullYear()}`;
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
      setValidUpTo(valdate); //vupto);
      //setValidUpTo(moment(vupto).format("dd/mm/yyyy"));

      await postRequest(endpoints.getTermsConditions, {}, (tdata) => {
        setTandCdata(tdata);
        setLoaded(true);
      });

      await postRequest(endpoints.getTaxDetails, { qtntype: quotation.qtnformat }, async (taxdata) => {
        setTaxesdata(taxdata);
      });

      await postRequest(endpoints.getMaterials, {}, (mdata) => {
        setMtrldata(mdata);
      });

      await getRequest(endpoints.getProcessLists, (pdata) => {
        setProcdata(pdata);
      });


    }
    fetchData();

    // if (selectedtcdata.length > 0) {
    //   console.log(selectedtcdata);
    //   setSelectedTCData(selectedtcdata);
    // } else {
    //   setSelectedTCData([]);
    // }

  }, [])

  let sendquotemail = () => {

    console.log("Send Quotation Mail");
    console.log(quotationNo);

    // let newDate = moment(new Date()).format("DD MMM YY");
    // let mfromName = Buffer.from(quotation.formpreparedby);


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
    // if (files == "") {
    //   toast.warning("Please attach file to send the mail..")
    //   return;
    // }
    window.open(`/mailer?mlbody=${mbody}&mlsubjct=${msubjct}`, "_blank");
    //window.open(`/mailer?mlbody=${mbody}&mlsubjct=${msubjct}&mlfrom=${fromName}`, "_blank");
    //   navigate("/mailer");

    // postRequest(endpoints.sendQuotationMail, { qtnno: quotationNo, }, (resp) => {
    //   if (resp.status === "success") {
    //     toast.success("Quotation Mail Sent", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    //   }
    //   else {
    //     toast.warning("Failed to send Quotation Mail...");
    //   }
    //   console.log(resp);
    // });
  }

  let calculateTotalTax = () => {

    let totalAmt = 0;
    console.log(qtnMaterialData);
    console.log("qtn Material Data : ", typeof qtnMaterialData);
    if (qtnMaterialData.length > 0) {
      qtnMaterialData.forEach((item) => {
        totalAmt += parseFloat(item.totalAmount);
      });
      // setQtnMaterialData(qtnMaterialData);
      qtnvalue = totalAmt;
      return totalAmt;
    }
    //  setQtnValue(totalAmt);
  }

  const getqtaxdata = (data) => {
    console.log(data)
  }

  const onClickSave = (e) => {
    if (Gndtotal > 0) {
      setQtnTax(Gsttotal);
      setQtnValue(qtnvalue);
    }
    //e.preventDefault();
    //  console.log(selectedtcdata.length);
    console.log(qtnMaterialData.length);
    console.log(qtntaxdata.length);
    console.log(tandcdata.length);
    console.log(selectedTaxes.length);
    console.log(selectedterms.length);
    if (qtnMaterialData.length > 0 && qtntaxdata.length == 0) {
      setBtnTaxDetails(true);
      setBtnPrintQtn(true);
      toast.error("Please add Tax Details", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    } else if (qtntaxdata.length > 0 && tandcdata.length == 0) { //  selectedtcdata.length == 0) {
      setBtnPrintQtn(true);
      toast.error("Please add Terms Details", { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
        return;
    } else if (qtnMaterialData.length > 0 && qtntaxdata.length > 0 && selectedtcdata.length > 0) {
      setBtnTaxDetails(false);
      setBtnPrintQtn(false);
  }

    console.log("quotationUpdate");
    if (formquotationtype == "") {
      toast.error("Please select Quotation Type", { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      //  return;
    }
    console.log(Gndtotal);

    let qtnno = quotationNo;
    let qtndate = current; //quotationDate;
    let validupto1 = validupto;
    let revisionno1 = revisionno;
    let enquiryDate1 = enquiryDate;
    let enquiryRef1 = enquiryRef;
    let preparedby = formpreparedby;
    let customer = customername;
    let contact1 = contact;
    let address = custAddress;
    let tele = formtele;
    let email = formemail;
    let qtntype = formquotationtype;
    let qtnstatus = "Created";
    setQtnStatus(qtnstatus);
    setFormQuotationType(formquotationtype);

    quotation.formquotationtype = formquotationtype;

    console.log("Quotation Type : " + quotation.formquotationtype);

    setFormQuotationType(quotation.formquotationtype)

    let format = quotation.qtnformat; // e.target.elements.formformat.value; //

    let qtntax = Gsttotal;    //e.target.elements.formtax.value;
    //let qtntotal = parseFloat(Gndtotal + Gsttotal);      //e.target.elements.formtotal.value;
    qtntotal = parseFloat(qtnvalue + Gsttotal);
    console.log(qtnMaterialData);
    let rateestimator = { qtnno, qtndate, validupto1, revisionno1, enquiryDate1, enquiryRef, preparedby, customer, contact, address, tele, email, qtntype, qtnstatus, format, qtnvalue, Gsttotal, qtntotal };
    let newquotation = { ...quotation, ...rateestimator };
    //  newquotation.rateestimator = rateestimator;
    setQuotationState(newquotation);

    //  if (quotationtandc != null || quotationtandc != undefined) {
    setSelectedTCData(quotationtandc);
    // } else {
    //   toast.error("Please select Terms and Conditions", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    //   return;
    // }
    setQtnValue(qtnvalue);
    setQtnTax(Gsttotal);
    setQtnTotal(qtnvalue + Gsttotal);

    // console.log("Qtn Value : " + qtnvalue);
    // console.log("Qtn Tax : " + Gsttotal);
    // console.log("Qtn Total : " + parseFloat(qtnvalue + Gsttotal));
    // console.log(qtntotal);
    postRequest(endpoints.updateQuotation, {
      qtnno, qtndate, validupto1, revisionno1, enquiryDate1, enquiryRef1, formpreparedby, customer, contact1, address, tele, email, qtntype,
      //  qtnstatus, formformat, qtnvalue, Gsttotal, qtntotal: (parseFloat(qtnvalue) + parseFloat(Gsttotal)), qtnMaterialData, selectedtcdata, qtntaxdata
      qtnstatus, qtnvalue, qtntax, qtntotal: (parseFloat(qtnvalue) + parseFloat(Gsttotal)), qtnMaterialData, selectedtcdata, qtntaxdata
    }, (resp) => {
      console.log(resp)
      // if (resp.status === 200) {
      toast.success("Quotation Saved", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

      //      }
    })
    // setSelectedTCData('');

    quotation.qtnstatus = "Qtn Sent";
    setQtnStatus("Qtn Sent");
    postRequest(endpoints.quoteStatusUpdate, { qtnno: quotationNo, qtnstatus: "Qtn Sent" }, (resp) => {
      console.log(resp);
      //  toast.success("Quotation Sent", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    });

    //setPrintBtn(false);
  };

  let LoadTaxData = async () => {
    await postRequest(endpoints.getTaxDetails, { qtntype: quotation.qtnformat }, async (taxdata) => {
      setTaxesdata(taxdata);
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

  const onClickImportRates = () => {
    setShow(true);
    //  e.preventDefault();

    //    ResetQtn();

    console.log("Import Rates");
    console.log(quotationNo);
    let QtnNo = quotationNo;
    let qtnvalue = 0;
    let qtntotal = 0;
    // postRequest(endpoints.getQtnProfileDetails, { QtnNo }, (resp) => {
    postRequest(endpoints.getTaskDetailsDataByQtnNo, { QtnNo }, (resp) => {
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
        let basicPrice = (parseFloat(resp[i].Unit_JobWork_Cost) + parseFloat(resp[i].Unit_Material_cost));
        let discountAmount = resp[i].DiscountAmount > 0 ? resp[i].DiscountAmount : 0;
        let finalPrice = basicPrice - discountAmount;
        totalAmount = parseFloat(finalPrice * quantity);
        console.log(basicPrice);
        newdata = { itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
        //olddata.push(newdata);
        qtnMaterialData.push(newdata);
        qtnvalue += ((Number(resp[i].BasePrice) - Number(resp[i].DiscountAmunt)) * Number(resp[i].Quantity));
        // setQtnMaterialData(resp);
        // for (let i = 0; i < resp.length; i++) {
        //   qtnvalue += ((resp[i].BasePrice - resp[i].DiscountAmunt) * resp[i].Quantity);
      }
      // setQtnValue(qtnvalue);
      // postRequest(endpoints.getQtnTaxDetails, { QtnNo }, (taxresp) => {
      //   console.log(taxresp);
      //   //setQtnTaxdata(taxresp);
      //   for (let i = 0; i < taxresp.length; i++) {
      //     qtntax += taxresp[i].TaxAmt;
      //     qtnvalue = taxresp[i].TaxableAmount;
      //   }

      //   setQtnTotal(qtnvalue + qtntax);
      //   setGndtotal(qtnvalue);
      //   setGsttotal(qtntax);
      // });

      console.log("Material Data");
      console.log(qtnMaterialData);
      setQtnMaterialData(qtnMaterialData);
      // setQtnMaterialData(newdata);
    });

    setShow(false);
  }

  let locCalc = async (drwfile, material, grade, thickness, cb) => {
    // let loc = window.location.pathname;

    // console.log("Getting Sp Wt");
    postRequest(endpoints.getMaterialSpWt, { material, grade }, async (resp) => {
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

  let addMaterialData = async () => {
    console.log("Material : " + material);

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
    else {
      //       if (selectedRow === null) {
      // console.log("Selected Row is null")        
      let id = qtnMaterialData.length + 1
      setFinalPrice((basicPrice - discountAmount).toFixed(2));
      setTotalAmount(((basicPrice - discountAmount) * quantity).toFixed(2));
      let olddata = qtnMaterialData
      setTaxableamount(parseFloat(qtnMaterialData.totalAmount).toFixed(2));
      Gndtotal += qtnMaterialData.totalAmount;

      let qtnno = quotation.quoteno;
      let newdata = { id, itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
      olddata.push(newdata)
      console.log(olddata);
      setQtnMaterialData(olddata)
      //    console.log("Before Saving Items Data");
      postRequest(endpoints.saveQuotationItems, { ...newdata, qtnno },
        async (resp) => {
          //         console.log(resp);
          toast.success("Item Added", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });

      //  Gsttotal += qtnMaterialData.taxamt;
      //      console.log(Gndtotal);
      //      console.log(qtnMaterialData);
      clearData();
      //       }
      //       else {
      // console.log("Selected Row is not null")        
      //         setFinalPrice((basicPrice - discountAmount).toFixed(2));
      //         setTotalAmount(((basicPrice - discountAmount) * quantity).toFixed(2));
      //         let olddata = qtnMaterialData
      //         setTaxableamount(parseFloat(qtnMaterialData.totalAmount).toFixed(2));
      //         Gndtotal += qtnMaterialData.totalAmount;

      //         let qtnno = quotation.quoteno;
      //         let newdata = { selectedRow, itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
      //         olddata.push(newdata)
      //         console.log(olddata);
      //         setQtnMaterialData(olddata)
      //         //    console.log("Before Saving Items Data");
      //         postRequest(endpoints.saveQuotationItems, { ...newdata, qtnno },
      //           async (resp) => {
      //             //         console.log(resp);
      //             toast.success("Item Added", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      //           });
      //         clearData();
      //       }
    }

  }

  let selectProc = (e) => {
    //  e.preventDefault();
    // console.log(operation);
    let proc = {};
    for (let i = 0; i < procdata.length; i++) {
      //if (procdata[i]["ProcessDescription"] === e.target.value) {
      if (e.length > 0 && procdata[i]["ProcessDescription"] === e[0].ProcessDescription) {

        proc = procdata[i];
        break;
      }
    }

    console.log(proc.ProcessDescription);

    setOperation(proc.ProcessDescription != undefined ? proc.ProcessDescription : "");

    // setOperation(e[0].ProcessDescription ?? "");
    // setOperationDropdown(e ?? []);
  }

  let selectMtrl = async (e) => {
    //   e.preventDefault();
    //  console.log(e[0].Mtrl_Code);

    let mtrl = {};
    for (let i = 0; i < mtrldata.length; i++) {
      if (e.length > 0 && mtrldata[i]["Mtrl_Code"] === e[0].Mtrl_Code) {
        mtrl = mtrldata[i];
        break;
      }
    }

    setMaterial(mtrl.Mtrl_Code != undefined ? mtrl.Mtrl_Code : "");

    // locCalc(window.dxffile, mtrldata[0]["Mtrl_Type"], mtrldata[0]["Grade"], mtrldata[0]["Thickness"], (output) => { });
    //   }
    // })

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
    selectedRow.itemname = itemname;
    selectedRow.material = material;
    selectedRow.operation = operation;
    selectedRow.quantity = quantity;
    selectedRow.basicPrice = basicPrice;
    selectedRow.discountAmount = discountAmount;
    selectedRow.finalPrice = finalPrice;
    selectedRow.totalAmount = totalAmount;

    console.log(qtnMaterialData);

    let qbasevalue = 0;

    qbasevalue = calculateTotalTax();

    for (let i = 0; i < qtnMaterialData.length; i++) {

      console.log(qtnMaterialData[i].totalAmount);
      qbasevalue += parseFloat(qtnMaterialData[i].totalAmount);
      console.log(qbasevalue.toFixed(2));
    };

    console.log(qbasevalue);

    setQtnValue(qbasevalue);


    let olddata = qtnMaterialData;
    //  olddata[selectedRow] = selectedRow;
    setQtnMaterialData(olddata);
    clearData();

  }

  const clearData = () => {
    console.log(material);
    setItemName("")
    setMaterial("")
    // setMaterialDropdown([])
    setOperation("")
    //  setOperationDropdown([])
    setQuantity(0)
    setBasicPrice("")
    setDiscountAmount("")
    setFinalPrice(0)
    setTotalAmount(0)
    document.getElementById("itemname").value = "";
    //document.getElementById("material").value = "";
    //document.getElementById("operation").value = "";
    document.getElementById("quantity").value = "";
    setSelectedRow(null);
    material = "";
    setMaterial(material)
    setMtrlCode("");
    console.log(material);
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
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function isValidEmail(formemailid) {
    return /\S+@\S+\.\S+/.test(formemailid);
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      //    toast.error('Email is invalid', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };

  let setHighlight = async (index, value) => {
    let olddata = selectedtcdata;
    console.log(olddata);
    olddata[index].highlight = value;
    setSelectedTCData(olddata);
    setSelectedTerms(olddata);
    setQuotationTandCState(olddata);
  }

  const handleClose = () => {
    setShow(false);

  }

  const onClickYes = () => {
    setShow(false);

    //  e.preventDefault();

    postRequest(endpoints.qtnItemsDeleteandSave, {
      qtnno: quotationNo,
      format: document.getElementById("format").value,
      qtnformat: document.getElementById("formquotationtype").value,
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
        await postRequest(endpoints.getQuotationItems, { qtnno: quotationNo }, async (quoteitems) => {
          console.log(quoteitems);
          setQtnMaterialData(quoteitems);
        })
      }

    });


  };

  let taxdetails = (e) => {
    e.preventDefault();
    if (e.target.elements.taxname.value == "" || e.target.elements.taxname.value == null || e.target.elements.taxname.value == "Select Tax Name") {
      toast.error("Please Select Tax Name", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      setTaxableamount(0);
      setTaxAmt(0);
      return;
    }
    console.log("taxdetails");
    let taxname = e.target.elements.taxname.value;
    let taxpercent = e.target.elements.taxpercent.value;
    taxableamount = e.target.elements.taxableamount.value;
    console.log(taxableamount);
    let taxamt = (taxableamount * taxpercent) / 100;
    let Gstotal = Gsttotal + taxamt;
    setGsttotal(Gstotal);

    console.log(taxamt);

    setTaxAmt(taxamt);
    console.log(taxableamount);
    setGsttotal(Gsttotal + taxamt);
    setQtnTaxdata([...qtntaxdata, { taxname, taxpercent, taxableamount, taxamt }])
    document.getElementById("taxname").innerText = "";
    document.getElementById("taxpercent").innerText = 0;
    document.getElementById("taxamt").innerText = 0;
    setTaxName("");
    setTaxpercent(0);
    setTaxAmt(0);
    setTaxableamount(0);
    setTaxDetailsShow(false);
  }

  const handleqtntype = (e) => {
    if (e.target.value == "*** Select  ***") {
      toast.error("Please Select Quotation Type", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
      return;
    }
    setFormQuotationType(e.target.value);
    console.log(e.target.value);

  }

  const ServiceEstimation = () => {
    toast.warning("ISO Form Rate Estimator under development", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
  }

  // const FabricationAssy = () => {
  //   navigate('/Quotations/AddDetails/RateEsitmator/FabricationAssmDisAggregator')
  //   //    toast.warning("Fabrication Aggregated Form to appear :- under development");
  // }


  const btnenableanddisable = () => {
    quotation.qtnstatus = "Qtn Sent";
    setQtnStatus("Qtn Sent");
    postRequest(endpoints.quoteStatusUpdate, { qtnno: quotationNo, qtnstatus: "Qtn Sent" }, (resp) => {
      console.log(resp);
      toast.success("Quotation Sent", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    });

    setSaveBtn(true);
    // setImportRatesBtn(true);
    //setPrintBtn(false);
  }

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    const isValidQuantity = /^[1-9]\d*$/.test(inputValue); // Check if it's a positive integer
    if (isValidQuantity || inputValue === '') {
      setQuantity(inputValue);
    } else {
      toast.warning("Please enter a valid quantity", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
    }
  };

  const rendertaxdetails = (taxdt) => {
    return (
      <tr>
        <td>{taxdt.taxname}</td>
        <td>{taxdt.taxpercent}</td>
        <td>{parseFloat(taxdt.taxableamount).toFixed(2)}</td>
        <td>{parseFloat(taxdt.taxamt).toFixed(2)}</td>
        <td><button className="btn btn-danger btn-sm" style={{ fontSize: '10px' }} onClick={() => deleteTax(taxdt)}>Del</button></td>
      </tr>
    );
  }

  const deleteTax = (taxdt) => {
    console.log("Delete Tax");
    console.log(taxdt);
    let olddata = qtntaxdata.filter((row) => {
      console.log(taxdt)
      return row !== taxdt;
    });
    setQtnTaxdata(olddata);
    setGsttotal(Gsttotal - taxdt.taxamt);
  }

  return (

    <div>
      <ToastContainer />
      {/* <ImportRates show={show} setShow={setShow} /> */}

      <div>
        <h6 className="title">Quotation Form - {formformat} </h6>
        {/* {quotation.qtnformat} */}

        <div className="row">
          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation No</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="formquotationNo" type="text" style={{ fontSize: '13px' }} disabled value={quotationNo} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quotation Date</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="quotationDate" type="text" style={{ fontSize: '13px' }} disabled value={quotationDate} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Valid Upto</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="validupto" type="text" style={{ fontSize: '13px' }} disabled value={validupto} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Revision No</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="revisionno" type="text" style={{ fontSize: '13px' }} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Date</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="enquiryDate" type="text" style={{ fontSize: '13px' }} disabled value={enquiryDate} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quote status</label>
          </div>
          <div className="col-md-1 mt-1">
            <input id="formqtnstatus" style={{ fontSize: '13px' }} disabled value={'Created'} />
          </div>
        </div>

        <div className="row">
          {/* <div className="col-md-3">
            <label className="form-label">Enquiry Date</label>
            <input id="enquiryDate" type="text" disabled value={enquiryDate} />
          </div> */}

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Enquiry Ref</label>
          </div>
          <div className="col-md-3 mt-1">
            <input id="enquiryRef" type="text" style={{ fontSize: '13px' }} disabled value={enquiryRef} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Prepared by</label>
          </div>
          <div className="col-md-3 mt-1">
            <input id="formpreparedby" type="text" style={{ fontSize: '13px' }} onChange={(e) => setFormPreparedby(e.target.value)} value={formpreparedby} />
          </div>

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Customer</label>
          </div>
          <div className="col-md-3 mt-1">
            <input id="customername" type="text" style={{ fontSize: '13px' }} disabled value={customername} />
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
          {quotation.qtnformat === "Profile" ?
            <div className="col-md-1 mt-1">

              <select className="ip-select" id="formquotationtype" style={{ fontSize: '13px' }} onChange={(e) => handleqtntype(e)} value={formquotationtype}>
                <option value="Select">*** Select ****</option>
                <option value="JobWork">JobWork</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            : quotation.qtnformat === "Service" ?

              < div className="col-md-1 mt-1">
                <select className="ip-select" id="formquotationtype" style={{ fontSize: '13px' }} onChange={(e) => handleqtntype(e)} value={formquotationtype}>
                  <option value="Select">*** Select ****</option>
                  <option value="Service">Service</option>
                  <option value="Service Contract">Service Contract</option>
                </select>
              </div>
              :
              <div className="col-md-1 mt-1">
                <select className="ip-select" id="formquotationtype" style={{ fontSize: '13px' }} onChange={(e) => handleqtntype(e)} value={formquotationtype}>
                  <option value="Select">*** Select ****</option>
                  <option value="Fabrication">Fabrication</option>
                </select>
              </div>
          }

          <div className="col-md-1">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Email</label>
          </div>
          <div className="col-md-5 mt-1">
            <input id="formemail" type="email" style={{ fontSize: '13px' }} onChange={handleChange} value={formemail} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-1">
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Telephone</label>
              </div>
              <div className="col-md-2 mt-1">
                <input id="formtele" type="text" style={{ fontSize: '13px' }} onChange={(e) => setFormTele(e.target.value)} value={formtele} />
              </div>

              <div className="col-md-1">
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Address</label>
              </div>
              <div className="col-md-8 mt-1">
                <input id="custAddress" type="text" style={{ fontSize: '13px' }} value={custAddress} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1">
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Value</label>
              </div>
              <div className="col-md-3 mt-1">
                <input id="formvalue" className="mt-2" disabled style={{ fontSize: '13px' }} value={parseFloat(calculateTotalTax()).toFixed(2)} />
              </div>

              <div className="col-md-1">
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 'bold' }}>Tax</label>
              </div>
              <div className="col-md-3 mt-1">
                <input id="formtax" disabled style={{ fontSize: '13px' }} value={parseFloat(Gsttotal).toFixed(2)} />
              </div>
              <div className="col-md-1">
                <label className="form-label" style={{ fontSie: '13px', fontWeight: 'bold' }}>Total</label>
              </div>
              <div className="col-md-3 mt-1">
                <input id="formtotal" style={{ fontSie: '13px' }} disabled value={parseFloat(calculateTotalTax() + Gsttotal).toFixed(2)} />
              </div>
            </div>

          </div>

          <div className=" col-md -3 mt-2 ms-2 mb-1" id="formformat"
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
            {formformat === "Profile" ?
              <div className="col-md-12 mt-1" style={{ display: "flex", gap: "40px" }}>
                <label className="" style={{ paddingRight: "4px" }}>
                  {" "}
                  Laser Cutting
                </label>
                <input className="form-check-input mt-2" name="pformat" defaultChecked type="radio" />
              </div> : ""}
            {formformat === "Service" ?
              <div>
                <div className="col-md-12 mt-1" style={{ display: "flex", gap: "15px" }}>
                  <label className=""> Welding/Cladding</label>
                  <input className="form-check-input mt-2" name="pformat" type="radio" />
                </div>
                <div className="col-md-12 mt-1" style={{ display: "flex", gap: "48px" }}>
                  <label className="" style={{ paddingRight: "3px" }}>
                    Batch Quote
                  </label>
                  <input className="form-check-input mt-2" name="pformat" type="radio" />
                </div>
              </div>
              : ""}
            {formformat === "Fabrication" ?
              <div className="col-md-12 mt-1" style={{ display: "flex", gap: "58px" }}>
                <label className="" style={{ paddingRight: "3px" }}>
                  Fabrication
                </label>
                <input className="form-check-input mt-2" name="pformat" type="radio" />
              </div>
              : ""}
          </div>

        </div>

        <div className="row mt-1">
          <button className="button-style mt-1 group-button" style={{ width: "80px", fontSize: '13px', fontWeight: 'bold' }} disabled={savebtn} onClick={onClickSave}>Save</button>

          <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={handleOpenDwgFolder}>Drawing Folder</button>

          {((qtnMaterialData.length > 0 && qtnMaterialData != []) && (qtntaxdata.length > 0 && qtntaxdata != []) && (selectedterms.length > 0 && selectedterms != [])) ?
            <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} disabled={btnprintqtn}
              onClick={() => {
                switch (quotation.qtnformat) {
                  case "Profile":
                    setOpenPrfPrintModal(true);
                    //     navigate("/quotation/printprofileqtn")
                    break;
                  case "Service":
                    setOpenSvrPrintModal(true);
                    //navigate(`/quotation/PrintServiceQtn?QtnNo=${quotationNo}`)
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
            :
            <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} //disabled={printbtn}
              onClick={() => {
                switch (quotation.qtnformat) {
                  case "Profile":
                    setOpenPrfPrintModal(true);
                    btnenableanddisable();
                    quotation.qtnstatus = "Qtn Sent";
                    //     navigate("/quotation/printprofileqtn")
                    break;
                  case "Service":
                    setOpenSvrPrintModal(true);
                    btnenableanddisable();
                    quotation.qtnstatus = "Qtn Sent";
                    //navigate(`/quotation/PrintServiceQtn?QtnNo=${quotationNo}`)
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
          }
          {(qtnMaterialData.length > 0 && qtnMaterialData != []) ?
            <button className="button-style mt-1 group-button" style={{ width: "120px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => {
              sendquotemail();
            }}>Send Quote</button>
            :
            <button className="button-style mt-1 group-button" style={{ width: "120px", fontSize: '13px', fontWeight: 'bold' }} disabled onClick={() => {
              sendquotemail();
            }}>Send Quote</button>
          }
          <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => {
            switch (quotation.qtnformat) {
              case "Profile":
                onClickSave();
                navigate("/quotation/rateestimator")
                break;
              case "Service":
                ServiceEstimation()
                break;
              case "Fabrication":
                navigate("/quotation/qtnfabrication")
                break;
              default:
                console.log("Bad Quotation Format")
                console.log(quotation);
                break;
            }
          }}>Rate Estimator</button>
          {quotation.qtnformat === "Profile" ?
            //disabled={importratesbtn} 
            <button className="button-style mt-1 group-button" style={{ width: "150px", fontSize: '13px', fontWeight: 'bold' }} onClick={onClickImportRates}>Import Rates</button>
            : null}
          <button className="button-style mt-1 group-button" style={{ width: "100px", fontSize: '13px', fontWeight: 'bold' }} onClick={() => {
            setProfileList([])
            navigate(-1);
          }}>Close</button>
          {/* navigate("/quotation/*")}>Close</button> */}
        </div>
      </div>

      <div className="p-2">
        <div
          className="row mt-1" style={{ marginLeft: "-3px", marginBottom: "50px" }}>
          <Tabs
            id="QuoteDetails" defaultactivekey="quotation" //activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-1 tab_font">
            <Tab eventKey="quotation" title="Quotation Item List">
              {/* <QuotationItemList /> */}
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <div
                    className="table-data mb-3"
                    style={{ height: "250px", overflowY: "scroll" }}>
                    <Table striped className="table-data border ">
                      <thead className="tableHeaderBGColor">
                        <tr>
                          <th>Item Name</th>
                          <th>Material</th>
                          <th>Operation</th>
                          <th>Quantity</th>
                          <th>Base Price</th>
                          <th>Discount</th>
                          <th>Final Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qtnMaterialData.map((row, index) => {
                          console.log("Selected Row : " + row);
                          console.log(row["material"]);
                          console.log(row["operation"]);
                          return (
                            <tr key={index} style={{ backgroundColor: selectedRow === row ? '#5d88fc' : '', cursor: 'pointer' }} onClick={() => {
                              setItemName(row["itemname"]);
                              setMaterial(row["material"]);
                              setOperation(row["operation"]);
                              setQuantity(row["quantity"]);
                              setBasicPrice(row["basicPrice"]);
                              setDiscountAmount(row["discountAmount"]);
                              setFinalPrice(row["finalPrice"]);
                              setTotalAmount(row["totalAmount"]);
                              setSelectedRow(row);
                              console.log(row);
                            }}>
                              <td>{row["itemname"]}</td>
                              <td>{row["material"]}</td>
                              <td>{row["operation"]}</td>
                              <td>{row["quantity"]}</td>
                              <td>{parseFloat(row["basicPrice"]).toFixed(2)}</td>
                              <td>{parseFloat(row["discountAmount"]).toFixed(2)}</td>
                              <td>{parseFloat(row["finalPrice"]).toFixed(2)}</td>
                              <td>{parseFloat(row["totalAmount"]).toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    {/* {(qtnMaterialData != null || qtnMaterialData != undefined) ?
                      <Tables theadData={getHeadings()} tbodyData={qtnMaterialData} rowClicked={(row, index) => {
                        setItemName(row["itemname"]);
                        setMaterial(row["material"]);
                        setOperation(row["operation"]);
                        setQuantity(row["quantity"]);
                        setBasicPrice(row["basicPrice"]);
                        setDiscountAmount(row["discountAmount"]);
                        setFinalPrice(row["finalPrice"]);
                        setTotalAmount(row["totalAmount"]);
                        setSelectedRow(row);
                        console.log(row);

                      }} />
                      : ""} */}
                  </div>


                  <div
                    className="table-data mb-4" style={{ height: "130px", overflowY: "scroll" }}>

                    <Table striped className="table-data border ">
                      <thead className="tableHeaderBGColor">
                        <tr>
                          <th>Tax Name</th>
                          <th>Tax %</th>
                          <th>Taxable Amount</th>
                          <th>Tax Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(qtntaxdata != null && qtntaxdata != undefined) ? qtntaxdata.map((taxdt) => rendertaxdetails(taxdt)) : ""}
                      </tbody>
                    </Table>


                    {/* {(qtntaxdata != null || qtntaxdata != undefined) ?
                      <Tables theadData={(getHeadings1())} tbodyData={qtntaxdata} rowClicked={(row, index) => {
                        // <Tables theadData={Object.keys(qtntaxdata[0])} tbodyData={qtntaxdata} rowClicked={(row, index) => {
                        let taxname = row[index]["taxName"];
                        let taxpercent = row[index]["taxpercent"];
                        let taxableamount = row[index]["taxableamount"];
                        let taxamt = row[index]["taxamt"];
                      }} />
                      : ""} */}
                  </div>



                </div>

                <div className="col-md-4 col-sm-12">
                  <div className="ip-box form-bg ">
                    <div className="row">
                      <div className="row">
                        <div className="col-md-3">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Item Name</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" id="itemname" type="text" style={{ fontSize: '13px' }} onChange={(e) => {
                            if (e.target.value != "" || e.target.value != null) {
                              setItemName(e.target.value);
                            } else {
                              toast.warning("Please enter valid Item Name", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                            }
                          }} value={itemname} />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 mt-1">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Material</label>
                        </div>
                        <div className="col-md-9 mt-1">
                          {/* {mtrldata.length > 0 ? (
                            <Typeahead
                              id="selected-material"
                              // id={material}
                              labelKey="Mtrl_Code"
                              onChange={selectMtrl}
                              options={mtrldata}
                              // selected = {materialDropdown}
                              placeholder="Choose a Material...">
                            </Typeahead>
                          ) : (
                            ""
                          )} */}

                          <input className="in-field" type="text" id="material" style={{ fontSize: '13px' }} onChange={(e) => {
                            if (e.target.value != "" || e.target.value != null) {
                              setMaterial(e.target.value);
                            } else {
                              toast.warning("Please enter valid Material", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                            }
                          }} value={material}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 mt-2">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Operation</label>
                        </div>
                        <div className="col-md-9 mt-1">
                          {/* {procdata.length > 0 ? (
                            <Typeahead
                              id="selected-operation"
                              // id={operation}
                              labelKey="ProcessDescription"
                              onChange={selectProc}
                              options={procdata}
                             // value={operation}
                              selected = {procdata}
                              placeholder="Choose an Operation...">
                            </Typeahead>
                          ) : (
                            ""
                          )} */}

                          {/* {procdata.length > 0 ?
                            <select className='ip-select' id="operation" onChange={selectProc} defaultValue="Laser Cutting Oxygen" value={operation}>
                              <option value="" disabled selected>** Select **</option>
                              {procdata.map((proc) => {
                                return (
                                  <option value={proc["ProcessDescription"]}>{proc["ProcessDescription"]}</option>
                                )
                              })}
                            </select>
                            : ""
                          } */}
                          <input className="in-field" type="text" id="operation" style={{ fontSize: '13px' }} onChange={(e) => {
                            if (e.target.value != "" || e.target.value != null) {
                              setOperation(e.target.value);
                            } else {
                              toast.warning("Please enter valid Operation", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                            }
                          }} value={operation} />
                        </div>
                      </div>

                      <div className="row mt-2">
                        {/* <div className="col-md-6"> */}
                        {/* <div className="row"> */}
                        <div className="col-md-3">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Quantity</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" id="quantity" type="text" style={{ fontSize: '13px' }} onChange={handleQuantityChange} value={quantity} />
                          {/* if (e.target.value > 0 || e.target.value != "" || e.target.value != null || e.target.value != 0 
                            || e.target.value != "0" || e.target.value != "0.000" || e.target.value != "A-Za-z") {
                              setQuantity(e.target.value);
                            } else {
                              toast.warning("Please enter valid quantity", { autoClose: 1000, position: toast.POSITION.TOP_CENTER });
                            }
                          }} value={quantity} /> */}
                        </div>
                      </div>
                      {/* </div> */}
                      {/* <div className="col-md-6"> */}
                      <div className="row mt-2">
                        <div className="col-md-3">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Base Price</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" id="basicprice" type="text" style={{ fontSize: '13px' }} min="1" max="9999999.99" pattern="[0-9]*." value={basicPrice}
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
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Discnt Amt</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" id="discountAmount" style={{ fontSize: '13px' }} value={discountAmount} onChange={(e) => {
                            setDiscountAmount(parseFloat(e.target.value));
                            setFinalPrice(basicPrice - parseFloat(e.target.value));
                            setTotalAmount(quantity * (basicPrice - parseFloat(e.target.value)));
                          }} />
                        </div>
                      </div>
                      {/* <div className="col-md-6"> */}
                      <div className="row mt-2">
                        <div className="col-md-3 ">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Final Price</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" id="finalPrice" style={{ fontSize: '13px' }} type="text" disabled value={finalPrice} />
                        </div>
                        {/* </div> */}
                      </div>

                      <div className="row mt-2">
                        {/* <div className="col-md-12"> */}
                        <div className="col-md-3 ">
                          <label className="" style={{ fontSize: '13px', fontWeight: 'bold' }}>Total Amt</label>
                        </div>
                        <div className="col-md-9">
                          <input className="in-field" type="text" id="totalAmount" sytle={{ fontSize: '13px' }} disabled value={parseFloat(totalAmount).toFixed(2)} />
                        </div>
                        {/* </div> */}
                      </div>

                    </div>

                    <div className="row justify-content-center mt-2">
                      <button className="button-style " style={{ width: "120px", fontSize: '13px' }} disabled={!!selectedRow} onClick={addMaterialData}>
                        New
                      </button>
                      <button className="button-style " style={{ width: "120px", fontSize: '13px' }} disabled={!selectedRow} onClick={UpdateMaterialData}>
                        Update
                      </button>
                      <button className="button-style " style={{ width: "120px", fontSize: '13px', marginLeft: "4px" }} disabled={!selectedRow} onClick={() => deleteItem()}>
                        Delete
                      </button>
                    </div>

                    <div className="row justify-content-center mt-3 mb-2">
                      <button className="button-style" style={{ width: "250px", fontSize: '13px' }} disabled ={btntaxdetails} onClick={() => { LoadTaxData(); setTaxDetailsShow(true) }}>
                        Tax Details Click Here
                      </button>
                    </div>
                  </div>
                  {/* <div
                    className="table-data mb-4" style={{ height: "130px", overflowY: "scroll" }}>

                    <Table striped className="table-data border ">
                      <thead className="tableHeaderBGColor">
                        <tr>
                          <th>Tax Name</th>
                          <th>Tax %</th>
                          <th>Taxable Amount</th>
                          <th>Tax Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(qtntaxdata != null && qtntaxdata != undefined) ? qtntaxdata.map((taxdt) => rendertaxdetails(taxdt)) : ""}
                      </tbody>
                    </Table>

                  </div> */}
                </div>
              </div>
            </Tab>

            <Tab eventKey="termsandcondition" title="Terms & Conditions">
              {/* <TermsandCondition /> */}
              <div className='row'>
                {/* <div className='col-md-5 col-sm-12 mt-3'> */}

                <div className='col-md-5 mb-5'>
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
                    {loaded ? <SelectTableComponent tcdata={tandcdata} selection={(data) => { setSelectedTCData(data) }} tablename="Terms" style={{ maxHeight: '250px', overflowY: 'scroll' }} /> : ""}
                  </div>
                </div>

                <div className='col-md-5'>
                  <div style={{ overflowY: 'scroll', maxHeight: '250px' }}>
                    <table striped className="table-data border ">
                      <thead className="tableHeaderBGColor">
                        <tr>
                          <th style={{ width: '15px' }}>Bold</th>
                          <th style={{ width: '420px' }}>Terms</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedtcdata != null) ? selectedtcdata.map((tc, id) => {
                          return (
                            <tr className="custtr" key={id} onClick={() => console.log(tc)}>
                              <td className="custth" style={{ width: '60px', height: '20px' }}><input type="checkbox" id={id} onChange={(e) => { setHighlight(id, e.target.checked) }} /></td>
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
          {/* <NavTab getqtaxdata={getqtaxdata} /> */}
        </div>
      </div>

      <div className="row">
        <Modal show={dwgfoldershow}>
          <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
            <Modal.Title style={{ fontFamily: 'Roboto', fontSize: '18px' }}>Drawing Folder</Modal.Title>
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


        {/* <AlertModal
          show={profilealertModal}
          onHide={(e) => setProfileAlertModal(e)}
          firstbutton={() => profilefstbtnc()}
          secondbutton={() => profilesecbtnc()}
          title="Alert !"
          message="Profile Drawings Present shall be deleted ?"
          firstbuttontext="Yes"
          secondbuttontext="No"
        /> */}


        {formformat === "Service" ?
          <SvrModalPrintQuotation openSvrPrintModal={openSvrPrintModal} QtnNo={quotationNo} handleClose={setOpenSvrPrintModal} />
          : <PrfModalPrintQuotation openPrfPrintModal={openPrfPrintModal} QtnNo={quotationNo} handleClose={setOpenPrfPrintModal} />}

      </div>
    </div >
  );
}
