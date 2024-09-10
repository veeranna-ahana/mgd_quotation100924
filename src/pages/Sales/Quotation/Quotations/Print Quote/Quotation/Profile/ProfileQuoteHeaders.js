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
    reportSectionright: {
        marginLeft: "180px",
        marginTop: "10px",
        textAlign: "right",
        width: "20%",
    },
    attentionbackgrnd: {
        fontSize: 12,
        marginLeft: "180px",
        textAlign: "right",
        width: "100%",
        backgroundColor: "yellow",
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
    text1left: {
        fontSize: 10,
        textAlign: "left",
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
        width: "10px",
    },
    itemname: {
        width: "200px",
    },
    operation: {
        width: "80px",
    },
    operationl: {
        width: "150px",
    },
    quality: {
        width: "70px",
    },
    unitprice: {
        width: "70px",
    },
    total: {
        width: "90px",
    },
    finaltotal: {
        width: "540px",
        textAlign: "right",

    },
    taxnetvalue: {
        width: "50px",
    },
    textdata: {
        fontSize: 9,
        textAlign: "center",
    },
    textdatal: {
        fontSize: 9,
        textAlign: "left",
    },
    textdatar: {
        fontSize: 9,
        textAlign: "right",
    },
    textdataforchoice: {
        fontSize: 9,
        textAlign: "center",
        paddingLeft: "10px",
    },
    textdataforchoice1: {
        fontSize: 9,
        textAlign: "left",
        paddingLeft: "10px",
    },
});


const QuoteHeaders = ({ newData }) => {

    const [Tabledata, setTabledata] = useState([]);

    const [index, setIndex] = useState(0);
    console.log(newData["qtnitemslist"]);
    const recordsPerPage = 19; //if page is 1 displays 4 records afterwords dispalys 5 records
    //  const totalPages = Math.ceil(Tabledata.length / recordsPerPage);
    let totalPages = 0;
    if (newData["qtnitemslist"].length > 0) {
        totalPages = Math.ceil(newData["qtnitemslist"].length / recordsPerPage);
    }
    console.log(newData);
    // useEffect(() => {
    //   axios
    //     .get("http://localhost:7000/data")
    //     .then((res) => setTabledata(res.data));
    // }, []);

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
                                                {newData["qtnidchk"][0]["QtnType"].toUpperCase()} QUOTATION
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


                            {/* <View style={styles.column}>
                                <View style={styles.reportSectionright}>
                                    <Text style={styles.attentionbackgrnd}>@ See Page 2 for Partwise Rates</Text>
                                </View>
                            </View> */}
                            <View style={styles.subReportSection}>
                                <Text style={styles.text1}>
                                    1. Thank you very much for your kind enquiry. We are pleased
                                    to make the following lowest Quotation as shown below
                                </Text>
                            </View>

                            {/* <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(a) Net Value @ :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                        <Text style={styles.text2}>{parseFloat(newData["qtntaxdets"][0]["TaxableAmount"]).toFixed(2)}</Text>
                                        : <Text style={styles.text2}>0</Text>}
                                </View>
                                <View style={styles.section1options1text}>
                                    <Text style={styles.text2}>
                                        @ See Page 2 for Partwise Rates
                                    </Text>
                                </View>
                            </View> */}

                            {/* <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(b) Taxes :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                        <Text style={styles.text2}>{taxesdata(newData["qtntaxdets"])}</Text>

                                        // parseFloat(newData["qtntaxdets"][0]["TaxAmount"]).toFixed(2)

                                        // }</Text>
                                        : <Text style={styles.text2}>0</Text>}

                                    {/* <Text style={styles.text2}>{parseFloat(newData["qtnidchk"][0]["QtnTax"]).toFixed(2)}</Text> 
                                </View>
                            </View>

                            <View style={styles.column}>
                                <View style={styles.section1options1}>
                                    <Text style={styles.text2}>(c) Total :</Text>
                                </View>
                                <View style={styles.section1options1data}>
                                    {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                        <Text style={styles.text2}>
                                            {(parseFloat(newData["qtntaxdets"][0]["TaxableAmount"]) + parseFloat(newData["qtntaxdets"][0]["TaxAmount"])).toFixed(2)}
                                        </Text>
                                        : <Text style={styles.text2}>0</Text>}
                                </View>
                            </View>*/}
                        </View>
                    </View>

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
                                        {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                                            <Text style={styles.text2}>

                                                {parseFloat(Number(newData["qtntaxdets"][0]["TaxableAmount"]) + Number(taxesdata(newData["qtntaxdets"]))).toFixed(2)}
                                                     {/* newData["qtntaxdets"][0]["TaxAmount"])).toFixed(2)} */}
                                            </Text>
                                            : <Text style={styles.text2}>0</Text>}
                                    </View>
                                </View>
                            </View>

                            // <View style={styles.tableviewsectiondata}>
                            //     <View style={styles.column}>
                            //         <View style={styles.taxnetvalue}>
                            //             <Text style={styles.textdata}>{qtntax.TaxableAmount}</Text>
                            //         </View>
                            //     {/* </View>
                            //     <View style={styles.column}> */}
                            //         <View style={styles.itemname}>
                            //             <Text style={styles.textdata}>{qtntax.TaxName}</Text>
                            //         </View>
                            //         <View style={styles.operation}>
                            //             <Text style={styles.textdata}>{qtntax.TaxPercent}</Text>
                            //         </View>
                            //         <View style={styles.quality}>
                            //             <Text style={styles.textdata}>{parseFloat(qtntax.TaxAmount).toFixed(2)}</Text>
                            //         </View>
                            //         <View style={styles.total}>
                            //             {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                            //                 <Text style={styles.text2}>{parseFloat(taxesdata(newData["qtntaxdets"])).toFixed(2)}</Text>
                            //                 : <Text style={styles.text2}>0</Text>}
                            //         </View>
                            //     {/* </View>
                            //     <View style={styles.column}> */}
                            //         <View style={styles.finaltotal}>
                            //             {((newData["qtntaxdets"] != null) && (newData["qtntaxdets"].length > 0)) ?
                            //                 <Text style={styles.text2}>
                            //                     {(parseFloat(newData["qtntaxdets"][0]["TaxableAmount"]) + parseFloat(newData["qtntaxdets"][0]["TaxAmount"])).toFixed(2)}
                            //                 </Text>
                            //                 : <Text style={styles.text2}>0</Text>}
                            //         </View>
                            //     </View>
                            // </View>
                        ))}

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
                        {/* })} */}
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


            {
                Array.from({ length: totalPages }, (_, index) => (
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
                                                <Text style={styles.underline}>{newData["qtnidchk"][0]["QtnType"].toUpperCase()} QUOTATION</Text>
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
                                    <Text style={styles.text2}>Item Name / Job Description</Text>
                                </View>

                                <View style={styles.operationl}>
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
                                                {qtitems["serial_number"]}
                                            </Text>
                                        </View>

                                        <View style={styles.itemname}>
                                            <Text style={styles.textdataforchoice1}>{qtitems["Name"]}</Text>
                                        </View>

                                        <View style={styles.operationl}>
                                            <Text style={styles.textdatal}>{qtitems["Operation"]}</Text>
                                        </View>

                                        <View style={styles.quality}>
                                            <Text style={styles.textdatar}>{qtitems["Quantity"]}</Text>
                                        </View>

                                        <View style={styles.unitprice}>
                                            <Text style={styles.textdatar}> {parseFloat(qtitems["BasePrice"]).toFixed(2)}</Text>
                                        </View>

                                        <View style={styles.total}>
                                            <Text style={styles.textdatar}>{(parseFloat(qtitems["Quantity"]) * parseFloat(qtitems["BasePrice"])).toFixed(2)}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.slno}>
                                            <Text style={styles.textdata}>
                                                
                                            </Text>
                                        </View>

                                        <View style={styles.itemname}>
                                            <Text style={styles.textdataforchoice1}>{qtitems["Material"]}</Text>
                                        </View>

                                        <View style={styles.operation}>
                                            <Text style={styles.textdata}></Text>
                                        </View>

                                        <View style={styles.quality}>
                                            <Text style={styles.textdata}></Text>
                                        </View>

                                        <View style={styles.unitprice}>
                                            <Text style={styles.textdata}> </Text>
                                        </View>

                                        <View style={styles.total}>
                                            <Text style={styles.textdata}></Text>
                                        </View>
                                    </View>
                                </View>
                            ))}



                        </View>
                    </Page>
                ))
            }
        </Document >

    );

};

export default QuoteHeaders;
