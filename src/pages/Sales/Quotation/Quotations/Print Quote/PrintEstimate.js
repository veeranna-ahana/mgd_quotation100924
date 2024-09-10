import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRequest, postRequest } from "../../../../api/apiinstance";
import { endpoints } from "../../../../api/constants";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import { toast } from "react-toastify";
import { useQuotationContext } from "./../../../../../context/QuotationContext";

function PrintEstimate() {
    const [searchParams, setsearchParams] = useState(useSearchParams());

    let [QtnNo, setQtnNo] = useState("");
    let [QtnId, setQtnId] = useState("");
    let [QtnType, setQtnType] = useState("");
    let [QtnStatus, setQtnStatus] = useState("");
    let [QtnDate, setQtnDate] = useState("");
    let [Customer, setCustomer] = useState({});
    let [EnquiryRef, setEnquiryRef] = useState("");
    let [EnquiryDate, setEnquiryDate] = useState("");
    let [Contact, setContact] = useState("");
    let [CustTele, setCustTele] = useState("");

    let [QtnDetails, setQtnDetails] = useState([]);
    let [QtnTC, setQtnTC] = useState([]);

    useEffect(() => {
        setQtnNo(searchParams.get("QtnNo"));
        // Data from Qtnlist
        postRequest(endpoints.getQtnPrintDetails, { qtnno: searchParams.get("QtnNo") }, (data) => {
            // setQtnNo(data[0].QtnNo);
            setQtnId(data[0].QtnId);
            setQtnType(data[0].QtnType);
            setQtnStatus(data[0].QtnStatus);
            setQtnDate(data[0].QtnDate);
            setCustomer(data[0].CustomerName);
            setEnquiryRef(data[0].EnquiryRef);
            setEnquiryDate(data[0].EnquiryDate);
            setContact(data[0].Contact);
            setCustTele(data[0].CustTele);

            console.log(data);
        });

        // Data from QtnDetails
        postRequest(endpoints.getQtnDetails, { qtnno: searchParams.get("QtnNo") }, (qtndetsdata) => {
            setQtnDetails(qtndetsdata);
            console.log(qtndetsdata);
        });

        // Data from QtnTC
        postRequest(endpoints.getQtnTC, { qtnid: QtnId }, (qtntcdata) => {
            console.log(qtntcdata);
        }
        );
    }, []);


    let quotationStartPage = (customer, qtnDetails, qtnTC) => {
        let key = "";
        let TCcontent = "";
        for (key in qtnTC) {
            TCcontent += `<p><b><u>${key}</u></b></p><ul>`
            for (let i = 0; i < qtnTC[key].length; i++) {
                TCcontent += `<li>${qtnTC[key][i]}</li>`
            }
            TCcontent += `</ul>`
        }
        let CustAddressContent = "";
        let CustAddress = customer.address.split(",");
        for (let i = 0; i < CustAddress.length; i++) {
            CustAddressContent += `${CustAddress[i] + (i < CustAddress.length - 1 ? "," : "")}<br/>`
        }
        return `
<html>
<style>
* {
    font-family: Arial, Helvetica, sans-serif;
}

body{
    margin: 48px;
}

.addr {
    font-size: 12px;
    display: flex;
}

.logo-container {
    flex: 1;
    padding: 5px 10px;
}

.logo {
    width: 60px;
    height: 60px;
}

.addr-container {
    flex: 3;
}

.qtn-container {
    flex: 3;
}

.details-body {
    font-size: 14px;
    display: block;
}

th {
    padding: 2px;
}
</style>

<body>
<div style="border: 1px #000000 solid">
    <div class="addr">
        <div class="logo-container">
            <center>
                <div style="width: 60px; letter-spacing: 0.2rem; text-align: center;"><b>MAGOD</b></div>
                <img src="data:image/png;base64,Qk0uDAAAAAAAAHYAAAAoAAAASgAAAEsAAAABAAQAAAAAAAAAAADEDgAAxA4AABAAAAAQAAAAAAAA/wAAgP8AgAD/AICA/4AAAP+AAID/gIAA/8DAwP+AgID/AAD//wD/AP8A/////wAA//8A/////wD//////5mZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZ//////////mf/////////5n/////////+ZmZmZmZmQAAAJmZmZmZmZn///////mZmZ///////5mZmf//////+ZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZn///////////////////////////////////+ZmZmZmZAAAAmZmZmZ////////////////////////////////////mZmZmZmQAAAJmZmZmf///////////////////////////////////5mZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn//////5mZmZ//////+ZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ///////5mZn///////+ZmZ//////mZmZmZmZmZmQAAAJmZmZmZmZmf///////5mZ//////n/+Zmf/////5mZmZmZmZmZkAAACZmZmZmZmZn/////+f/////////5n/////////+ZmZmZmZmZmZAAAAmZmZmZmZmf//////mf////////mZn////////5mZmZmZmZmZmQAAAJmZmZmZmf///////5mZ//////+ZmZmf//////mZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZn///+ZmZmZmZ////mZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAA=="
                    alt="logo" class="logo" />
                    <div style="width: 60px; letter-spacing: 0.3rem; text-align: center;"><b>LASER</b></div>
                    <div style="max-width:60px; font-size: 10px"><small>ISO9001 : 2008</small></div>
            </center>
        </div>
        <div class="addr-container">
            <h4>Magod Laser Machining Pvt Ltd</h4>
            <p>Plot No 72, Phase II KIADB Industrial,<br/>
            Area Jigani, Anekal Taluk,<br/>
            Bangalore - 560 105</p>
        </div>
        <div class="qtn-container">
            <small> F 30 Rev 4</small>
            <h4>${qtnDetails.format} QUOTATION </h4>
            <p>Quotation No : ${qtnDetails.unitName} / ${qtnDetails.qtnNo} <br />
                Date : ${moment(qtnDetails.qtnDate).format("DD MMMM YYYY")} <br />
                Valid Upto : ${moment(qtnDetails.validUpto).format("DD MMMM YYYY")} </p>
        </div>
    </div>
</div>
<div class="details-body">
    <hr />
    <h4>${customer.name}</h4>
    <p>${CustAddressContent}</p>
    <hr />
    <div>
        Kind Attn : ${customer.contact} <br />
        Reference : ${qtnDetails.enquiryRef}
    </div>
    <hr />
    <div>
        <ol>
            <li>
                Thank you very much for your kind enquiry. We are pleased to make the following lowest Quotation as
                shown below.
                <div style="display:flex; padding:10px">
                    <table style="flex:1;max-width:fit-content">
                        <tbody>
                            <tr>
                                <th>(a)</th>
                                <th>Net Value @ :</th>
                                <th>${qtnDetails.netValue}</th>
                            </tr>
                            <tr>
                                <th>(b)</th>
                                <th>Taxes :</th>
                                <th>${qtnDetails.taxes}</th>
                            </tr>
                            <tr>
                                <th>(c)</th>
                                <th>Total :</th>
                                <th>${qtnDetails.total}</th>
                            </tr>
                        </tbody>
                    </table>
                    <div style="flex:1; text-align: center;">
                        <span style="background-color:yellow; font-weight: bold;">@ See Page 2 for Partwise
                            Rates</span>
                    </div>
                </div>
                <div>
                    <center>
                        <table style="font-size: 14px;">
                            <thead>
                                <tr>
                                    <th>Tax Name</th>
                                    <th>Taxable Amount</th>
                                    <th>Tax %</th>
                                    <th>Tax Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${qtnDetails.taxDetails.map(tax => {
            return (`
                                    <tr>
                                        <td>${tax.taxName}</td>
                                        <td>${tax.taxableAmt}</td>
                                        <td>${tax.taxPercent}</td>
                                        <td>${tax.taxAmt}</td>
                                    </tr>
                                `)
        })}
                            </tbody>
                        </table>
                    </center>
                </div>
            </li>
            <li>
                <b><u>Terms & Conditions</u></b>
                <div>
                    ${TCcontent}
                </div>
            </li>
        </ol><br/><br/>
        Your's Sincerely<br/><br/><br/><br/>
        ${qtnDetails.preparedBy}<br/>
        Sales Representative<br/>
        Magod Laser Machining Pvt Ltd
    </div>
</div>
</body>

</html>
`}

    let quotationDetails = (qtnDetails) => {
        return (`
<html>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    body{
        margin: 48px;
    }

    .addr {
        font-size: 12px;
        display: flex;
    }

    .logo-container {
        flex: 1;
        padding: 5px 10px;
    }

    .logo {
        width: 60px;
        height: 60px;
    }

    .addr-container {
        flex: 3;
    }

    .qtn-container {
        flex: 3;
    }

    th {
        border-top: 1px solid;
        border-bottom: 1px solid;
        padding: 10px 2px;
        font-size: 14px;
    }

    td {
        padding: 5px 2px;
        font-size: 14px;
    }
</style>

<body>
    <div style="border: 1px #000000 solid">
        <div class="addr">
            <div class="logo-container">
                <center>
                    <div style="width: 60px; letter-spacing: 0.2rem; text-align: center;"><b>MAGOD</b></div>
                    <img src="data:image/png;base64,Qk0uDAAAAAAAAHYAAAAoAAAASgAAAEsAAAABAAQAAAAAAAAAAADEDgAAxA4AABAAAAAQAAAAAAAA/wAAgP8AgAD/AICA/4AAAP+AAID/gIAA/8DAwP+AgID/AAD//wD/AP8A/////wAA//8A/////wD//////5mZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZ//////////mf/////////5n/////////+ZmZmZmZmQAAAJmZmZmZmZn///////mZmZ///////5mZmf//////+ZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZn///////////////////////////////////+ZmZmZmZAAAAmZmZmZ////////////////////////////////////mZmZmZmQAAAJmZmZmf///////////////////////////////////5mZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn/////+ZmZmZ//////mZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ//////mZmZmf/////5mZmZn/////+ZmZmZmZmZmQAAAJmZmZmZmZmf/////5mZmZn/////+ZmZmZ//////mZmZmZmZmZkAAACZmZmZmZmZn//////5mZmZ//////+ZmZmf/////5mZmZmZmZmZAAAAmZmZmZmZmZ///////5mZn///////+ZmZ//////mZmZmZmZmZmQAAAJmZmZmZmZmf///////5mZ//////n/+Zmf/////5mZmZmZmZmZkAAACZmZmZmZmZn/////+f/////////5n/////////+ZmZmZmZmZmZAAAAmZmZmZmZmf//////mf////////mZn////////5mZmZmZmZmZmQAAAJmZmZmZmf///////5mZ//////+ZmZmf//////mZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZn///+ZmZmZmZ////mZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAJmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZAAAAmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmQAAAA=="
                        alt="logo" class="logo" />
                        <div style="width: 60px; letter-spacing: 0.3rem; text-align: center;"><b>LASER</b></div>
                        <div style="max-width:60px; font-size: 10px"><small>ISO9001 : 2008</small></div>
                </center>
            </div>
            <div class="addr-container">
                <h4>Magod Laser Machining Pvt Ltd</h4>
                <p>Plot No 72, Phase II KIADB Industrial,<br />
                    Area Jigani, Anekal Taluk, <br />
                    Bangalore - 560 105</p>
            </div>
            <div class="qtn-container">
            <small> F 30 Rev 4</small>
            <h4>${qtnDetails.format} QUOTATION </h4>
            <p>Quotation No : ${qtnDetails.unitName} / ${qtnDetails.qtnNo} <br />
                Date : ${moment(qtnDetails.qtnDate).format("DD MMMM YYYY")} <br />
                Valid Upto : ${moment(qtnDetails.validUpto).format("DD MMMM YYYY")} </p>
        </div>
        </div>
    </div>
    <p><b>Quotation Details : Appendix</b></p>
    <table style="width: 100%;">
        <thead>

            <tr class="thead">
                <th>Srl No</th>
                <th>Item Name / Job Descrption</th>
                <th>Operation</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
            </tr>

        </thead>
        <tbody>
            <tr>
                ${qtnDetails.items.map((item, index) => {
            return `<tr>
                                <td>${index + 1}</td>
                                <td>${item.itemName}</td>
                                <td>${item.operation}</td>
                                <td align="right">${item.qty}</td>
                                <td align="right">${item.unitPrice}</td>
                                <td align="right">${item.total}</td>
                            </tr>`
        })}
                    </tbody>
                </table>
            </body>
            
        </html>`
        )
    }

    return (
        <>
            <div>
                <Fragment>
                    <PDFViewer width="1200" height="600" filename="somename.pdf">

                        {/* {salesDlyPdfReport({ reportdate: reportdate, newData: dlyrepsalesdata })} */}

                    </PDFViewer>
                </Fragment>
            </div>
        </>
    );
}


export default PrintEstimate;