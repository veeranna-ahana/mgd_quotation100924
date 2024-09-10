import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import { Page, Document, StyleSheet, View, Text, Image, } from "@react-pdf/renderer";
import { borderBottom, borderRight, fontSize, padding, style, textAlign, width, } from "@mui/system";
import moment from "moment";
import { toBeInTheDOM } from "@testing-library/jest-dom/matchers";
import magodlogo from "../../../../../../../Logo/MagodLogo.png";

import { Table } from "react-bootstrap";

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
    tableContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginTop: "20px",
        marginLeft: "30px",
        border: 1,
        height: "80px",
        width: "270px",
    },
    tableContainer2: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginTop: "20px",

        borderBottom: 1,
        borderRight: 1,
        borderTop: 1,
        height: "80px",
        width: "270px",
    },
    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
    tableTitle: {
        marginTop: "20px",
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        marginBottom: "10px",
    },
    headerbox: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        marginBottom: "10px",
        marginLeft: "10px",
    },
    underline: {
        textDecoration: "underline",
    },
    code: {
        fontSize: 8,
        textDecoration: "none",
    },
    title2: {
        marginLeft: "200px",
    },
    shiftperiod: {
        marginLeft: "120px",
        marginTop: "20px",
    },
    boxdata: {
        border: "1px",
        padding: "10px",
        marginTop: "40px",
        width: "550px",
        marginLeft: "50px",
        marginRight: "100px",
    },
    tableview: {
        width: "600px",
        marginLeft: "5px",
        height: "730px", // Adjust the height as per your requirement
        overflow: "hidden",
    },
    Headingrow: {
        flexDirection: "row",
        alignItems: "center",
        width: "600px",
        marginTop: 5,
        fontWeight: "bold",
        marginLeft: "5px",
    },
    HeadingrowData: {
        flexDirection: "row",
        width: "600px",
        fontWeight: "bold",
        marginLeft: "5px",
    },
    machineHeading: {
        width: "80%",
    },
    operatorHeading: {
        width: "20%",
    },

    row: {
        flexDirection: "column",
    },
    logo: {
        width: "70px",
        height: "70px",
    },
    addresstext: {
        fontSize: 10,
        width: "190px",
        overflow: "hidden",
    },
    quotationNum: {
        marginLeft: "10px",
        fontSize: 10,
        width: "200px",
    },
    quotationNumData: {
        fontSize: 12,
        color: "black",
    },
    date: {
        marginTop: "5px",
        fontSize: 10,
        marginLeft: "45px",
        width: "200px",
    },
    dateData: {
        fontSize: 12,
    },
    validupto: {
        marginTop: "5px",
        fontSize: 10,
        marginLeft: "18px",
        width: "200px",
    },
    validuptodata: {
        fontSize: 12,
    },
    column: {
        flexDirection: "row",
    },
    subtitle: {
        marginTop: "10px",
        marginLeft: "40px",
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
    },
    subtitle1: {
        marginTop: "10px",
        marginLeft: "30px",
        width: "90%",
        borderBottom: 1,
    },
    text: {
        fontSize: 9,
    },
    reportSection: {
        marginLeft: "30px",
        marginTop: "10px",
        width: "20%",
    },
    reportSectiondata: {
        width: "50%",
        marginTop: "10px",
    },
    reportSection2: {
        marginLeft: "30px",
        marginTop: "10px",
        width: "20%",
    },
    reportSection2data: {
        width: "70%",
        marginTop: "10px",
        borderBottom: 1,
    },
    attention: {
        fontSize: 12,
    },
    attentiondata: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
    },
    referencedata: {
        fontSize: 11,
    },
    subReportSection: {
        marginTop: "10px",

        width: "100%",
    },
    text1: {
        fontSize: 10,
        textAlign: "center",
    },
    section1options1: {
        marginLeft: "80px",
        marginTop: "10px",
        width: "20%",
    },
    section1options1data: {
        marginTop: "10px",
        width: "30%",
    },
    section1options1text: {
        // marginTop: "10px",
        // width: "30%",
        // backgroundColor: "yellow",
        marginTop: "10px",
        marginLeft: "400px",
        marginRight: "30px",
        width: "85%",
        textAlign: "right",
        backgroundColor: "yellow",
    },

    subsection2texts: {
        marginTop: "10px",
        marginLeft: "60px",
    },

    text2: {
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
    },
    subsection2: {
        marginTop: "20px",
        marginLeft: "55px",
    },
    text3without: {
        fontSize: 10,
        padding: "3px",
    },
    text3with: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        padding: "3px",
    },
    sincerely: {
        marginLeft: "50px",
        marginTop: "40px",
    },
    lasttext: {
        marginTop: "40px",
        marginLeft: "40px",
        textAlign: "left",
        width: "90%",
    },
    qtdetail: {
        marginTop: "10px",
        width: "100%",
        marginLeft: "30px",
    },
    tableviewsection: {
        marginLeft: "30px",
        width: "530px",
        textAlign: "center",
        borderBottom: 1,
        borderTop: 1,
        paddingTop: "5px",
        paddingBottom: "5px",
    },
    tableviewsectiondata: {
        marginLeft: "30px",
        width: "530px",
        textAlign: "center",
        paddingTop: "5px",
        paddingBottom: "5px",
    },
    slno: {
        width: "30px",
    },
    itemname: {
        width: "200px",
    },
    operation: {
        width: "80px",
    },
    quality: {
        width: "80px",
    },
    unitprice: {
        width: "80px",
    },
    total: {
        width: "100px",
    },
    textdata: {
        fontSize: 10,
        textAlign: "center",
    },
    textdataforchoice: {
        fontSize: 10,
        textAlign: "left",
        paddingLeft: "10px",
    },
});


const ServiceQuoteHeaders = ({ newData }) => {

    const [Tabledata, setTabledata] = useState([]);

    const [index, setIndex] = useState(0);

    const recordsPerPage = 19; //if page is 1 displays 4 records afterwords dispalys 5 records
    //  const totalPages = Math.ceil(Tabledata.length / recordsPerPage);
    const totalPages = Math.ceil(newData["qtnitemslist"].length / recordsPerPage);
    console.log(newData);

    const taxesdata = (qtntaxdets) => {
        let taxdata = 0;
        for (let i = 0; i < qtntaxdets.length; i++) {
            taxdata = taxdata + parseFloat(qtntaxdets[i]["TaxAmount"]);
        }
        return taxdata.toFixed(2);
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={styles.tableContainer}>
                            <View>
                                <Image src={magodlogo} style={styles.logo} />
                            </View>
                            <View>
                                <Text style={styles.tableTitle}>
                                    Magod Laser Machining Pvt Ltd
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.addresstext}>{newData["unitdata"][0]["Unit_Address"]}</Text>
                                {/* Plot No 547,2nd Stage Somapur Industrial Area Nelamangala
                    Taluk Dabaspet
                  </Text> */}
                            </View>
                        </View>

                        <View style={styles.tableContainer2}>
                            <View>
                                <View>
                                    <View>
                                        <Text style={styles.headerbox}>
                                            <Text style={styles.underline}>
                                                SERVICE QUOTATION
                                            </Text>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.code}>F 30 Rev 4</Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.quotationNum}>
                                            Quotation No : &nbsp;&nbsp;<Text style={styles.addresstext}>{newData["unitdata"][0]["UnitName"]} / </Text>
                                            <Text style={styles.quotationNumData}>
                                                {newData["qtnidchk"][0]["QtnNo"]}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.date}>
                                            Date : &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.dateData}>{moment(newData["qtnidchk"][0]["QtnDate"]).format("DD/MM/YYYY")}</Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.validupto}>
                                            Valid Upto : &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.validuptodata}>{moment(newData["qtnidchk"][0]["ValidUpTo"]).format("DD/MM/YYYY")}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.subtitle}>
                        <Text style={style.title}>{newData["qtnidchk"][0]["CustomerName"]}</Text>
                    </View>

                    <View style={styles.subtitle1}>
                        <Text style={styles.text}>{newData["qtnidchk"][0]["CustAddress"]}</Text>
                    </View>

                    <View>
                        <View>
                            <View style={styles.column}>
                                <View style={styles.reportSection}>
                                    <Text style={styles.attention}>For Kind Attention :</Text>
                                </View>
                                <View style={styles.reportSectiondata}>
                                    <Text style={styles.attentiondata}>
                                        {newData["qtnidchk"][0]["Contact"]}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.column}>
                                <View style={styles.reportSection2}>
                                    <Text style={styles.attention}>Reference :</Text>
                                </View>
                                <View style={styles.reportSection2data}>
                                    <Text style={styles.referencedata}>{newData["qtnidchk"][0].EnquiryRef}</Text>
                                </View>
                            </View>

                            <View style={styles.column}>
                                <View style={styles.section1options1text}>
                                    <Text style={styles.text2}>
                                        @ See Page 2 for Partwise Rates
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.subReportSection}>
                                <Text style={styles.text1}>
                                    1. Thank you very much for your kind enquiry. We are
                                    pleased to make the following lowest Quotation as shown below
                                </Text>
                            </View>

                            {/* <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(a) Net Value @ :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {parseFloat(newData["qtntaxdets"].length) > 0 && (newData["qtntaxdets"] != null) ?
                                        <Text style={styles.text2}>{parseFloat(newData["qtntaxdets"][0]["TaxableAmount"])}</Text>
                                        : <Text style={styles.text2}>0</Text>}
                                </View>
                                <View style={styles.section1options1text}>
                                    <Text style={styles.text2}>
                                        @ See Page 2 for Partwise Rates
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(b) Taxes :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {parseFloat(newData["qtntaxdets"].length) > 0 && (newData["qtntaxdets"] != null) ?
                                        <Text style={styles.text2}>{parseFloat(newData["qtntaxdets"][0]["TaxAmount"])}</Text>
                                        : <Text style={styles.text2}>0</Text>}
                                </View>
                            </View>

                            <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(c) Total :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {parseFloat(newData["qtntaxdets"].length) > 0 && (newData["qtntaxdets"] != null) ?
                                        <Text style={styles.text2}>{parseFloat(newData["qtntaxdets"][0]["TaxableAmount"]) + parseFloat(newData["qtntaxdets"][0]["TaxAmount"])}</Text>
                                        : <Text style={styles.text2}>0</Text>}
                                </View>
                            </View> */}
                            <View style={styles.tableviewsection}>
                                <View style={styles.column}>
                                    <View style={styles.quality}>
                                        <Text style={styles.text2}>Net Value </Text>
                                    </View>

                                    <View style={styles.itemname}>
                                        <Text style={styles.text2}>Tax Name</Text>
                                    </View>

                                    <View style={styles.operation}>
                                        <Text style={styles.text2}>Tax %</Text>
                                    </View>

                                    <View style={styles.quality}>
                                        <Text style={styles.text2}>Tax Amount</Text>
                                    </View>

                                    <View style={styles.unitprice}>
                                        <Text style={styles.text2}>Total Taxes</Text>
                                    </View>

                                    <View style={styles.total}>
                                        <Text style={styles.text2}>Total</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                {newData["qtntaxdets"].map((qtntax) => (

                                    <View style={styles.tableviewsectiondata}>
                                        <View style={styles.column}>
                                            <View style={styles.quality}>
                                                <Text style={styles.textdata}>
                                                    {qtntax.TaxableAmount}
                                                </Text>
                                            </View>

                                            <View style={styles.itemname}>
                                                <Text style={styles.textdataforchoice}>{qtntax.TaxName}</Text>
                                            </View>

                                            <View style={styles.operation}>
                                                <Text style={styles.textdata}>{qtntax.TaxPercent}</Text>
                                            </View>

                                            <View style={styles.quality}>
                                                <Text style={styles.textdata}>{parseFloat(qtntax.TaxAmount).toFixed(2)}</Text>
                                            </View>

                                            <View style={styles.unitprice}>

                                                {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                                    <Text style={styles.text2}>{parseFloat(taxesdata(newData["qtntaxdets"])).toFixed(2)}</Text>
                                                    : <Text style={styles.text2}>0</Text>}
                                            </View>

                                            <View style={styles.total}>
                                                <Text style={styles.text2}>
                                                    {parseFloat(Number(qtntax.TaxableAmount) + Number(taxesdata(newData["qtntaxdets"]))).toFixed(2)}
                                                </Text>
                                                {/* {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                            <Text style={styles.text2}>

                                                {(parseFloat(newData["qtntaxdets"][0]["TaxableAmount"]) + parseFloat(newData["qtntaxdets"][0]["TaxAmount"])).toFixed(2)}
                                            </Text>
                                            : <Text style={styles.text2}>0</Text>} */}
                                            </View>
                                        </View>
                                    </View>

                                ))}

                            </View>
                        </View>
                    </View>

                    <View style={styles.subsection2}>
                        <Text style={[styles.text2, { textDecoration: "underline" }]}>
                            2. Terms and Condition
                        </Text>
                    </View>

                    <View style={styles.subsection2texts}>
                        <Text style={[styles.text2, { textDecoration: "underline" }]}>
                            Rates
                        </Text>
                        {newData["qtntandc"].map((qtc) => (qtc["highlight"] == 1 ?
                            //   return (
                            <Text style={styles.text2}>- {qtc["Terms"]}</Text>
                            : <Text style={styles.text1left}>- {qtc["Terms"]}</Text>
                        ))}
                        {/* {newData["qtntandc"].map((qtc) => (
                            //   return (
                            <Text style={styles.text3without}>- {qtc["Terms"]}</Text>
                        ))} */}

                    </View>

                    <View style={styles.sincerely}>
                        <Text style={[{ fontSize: "10px", color: "black" }]}>Your's Sincerely</Text>
                    </View>

                    <View style={styles.lasttext}>
                        <Text style={[{ fontSize: "10px", padding: "5px" }]}>
                            {newData["qtnidchk"][0]["PreparedBy"]}
                        </Text>
                        <Text style={[{ fontSize: "10px", padding: "5px" }]}>
                            Sales Representative
                        </Text>
                        <Text style={[{ fontSize: "10px", padding: "5px" }]}>
                            Magod Laser Machining Pvt Ltd
                        </Text>
                    </View>
                </View>
            </Page>


            {Array.from({ length: totalPages }, (_, index) => (
                <Page
                    key={index}
                    size="A4"
                    style={styles.page}>
                    <View style={styles.column}>
                        <View style={styles.tableContainer}>
                            <View>
                                <Image src={magodlogo} style={styles.logo} />
                            </View>
                            <View>
                                <Text style={styles.tableTitle}>
                                    Magod Laser Machining Pvt Ltd
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.addresstext}>
                                    {newData["unitdata"][0]["Unit_Address"]}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.tableContainer2}>
                            <View>
                                <View>
                                    <View>
                                        <Text style={styles.headerbox}>
                                            <Text style={styles.underline}>SERVICE QUOTATION</Text>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.code}>F 30 Rev 4</Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.quotationNum}>
                                            Quotation No : &nbsp;&nbsp;<Text style={styles.addresstext}>{newData["unitdata"][0]["UnitName"]} / </Text>
                                            <Text style={styles.quotationNumData}>
                                                {newData["qtnidchk"][0]["QtnNo"]}
                                            </Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.date}>
                                            Date : &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.dateData}>{moment(newData["qtnidchk"][0]["QtnDate"]).format("DD/MM/YYYY")}</Text>
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.validupto}>
                                            Valid Upto : &nbsp;&nbsp;&nbsp;&nbsp;
                                            <Text style={styles.validuptodata}>{moment(newData["qtnidchk"][0]["ValidUpTo"]).format("DD/MM/YYYY")}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.qtdetail}>
                        <Text style={styles.text2}>Quotation Details : Appendix</Text>
                    </View>

                    <View style={styles.tableviewsection}>
                        <View style={styles.column}>
                            <View style={styles.slno}>
                                <Text style={styles.text2}>Srl No</Text>
                            </View>

                            <View style={styles.itemname}>
                                <Text style={styles.text2}>Item Name / Job Descrption</Text>
                            </View>

                            <View style={styles.operation}>
                                <Text style={styles.text2}>Operation</Text>
                            </View>

                            <View style={styles.quality}>
                                <Text style={styles.text2}>Quantity</Text>
                            </View>

                            <View style={styles.unitprice}>
                                <Text style={styles.text2}>Unit Price</Text>
                            </View>

                            <View style={styles.total}>
                                <Text style={styles.text2}>Total Amount</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        {newData["qtnitemslist"].slice(index * recordsPerPage, (index + 1) * recordsPerPage).map((qtitems) => (
                            <View style={styles.tableviewsectiondata}>
                                <View style={styles.column}>
                                    <View style={styles.slno}>
                                        <Text style={styles.textdata}>
                                            {index + 1}
                                        </Text>
                                    </View>

                                    <View style={styles.itemname}>
                                        <Text style={styles.textdataforchoice}>{qtitems["Name"]}</Text>
                                    </View>

                                    <View style={styles.operation}>
                                        <Text style={styles.textdata}>{qtitems["Operation"]}</Text>
                                    </View>

                                    <View style={styles.quality}>
                                        <Text style={styles.textdata}>{qtitems["Quantity"]}</Text>
                                    </View>

                                    <View style={styles.unitprice}>
                                        <Text style={styles.textdata}> {qtitems["BasePrice"]}</Text>
                                    </View>

                                    <View style={styles.total}>
                                        <Text style={styles.textdata}>{parseFloat(qtitems["Quantity"]) * parseFloat(qtitems["BasePrice"])}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}


                    </View>
                </Page>
            ))}
        </Document>

    );

};

export default ServiceQuoteHeaders;
