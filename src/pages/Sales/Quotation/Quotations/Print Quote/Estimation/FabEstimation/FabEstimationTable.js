import React, { useEffect, useState } from "react";
import axios from "axios";
import { Page, Document, StyleSheet, View, Text, Image, } from "@react-pdf/renderer";
import { borderRight, padding, style, textAlign } from "@mui/system";
import { Table } from "react-bootstrap";
import magodlogo from "../../../../../../../Logo/MagodLogo.png";
//../../../../../../Logo/MagodLogo.png";

const styles = StyleSheet.create({
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
    tableTitle: {
        marginLeft: "300px",
        marginTop: "20px",
        fontSize: 20,
        fontWeight: "bold",
    },
    code1: {
        fontFamily: "Helvetica-Bold",
        marginTop: "10px",
    },
    title2: {
        marginLeft: "100px",
    },
    shiftperiod: {
        marginLeft: "190px",
        marginTop: "10px",
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
        marginLeft: "30px",
        width: "750px",
    },
    Headingrow: {
        flexDirection: "row",
        width: "750px",
        alignItems: "Center",
        marginLeft: "20px",
        marginTop: 20,
        fontWeight: "bold",
    },
    Headingrow1: {
        flexDirection: "row",
        width: "800px",
        alignItems: "center",
        marginLeft: "20px",
        fontWeight: "bold",
    },
    machineHeading: {
        width: "80%",
    },
    operatorHeading: {
        width: "20%",
    },
    logo: {
        width: "55px",
        height: "55px",

    },
    logostyle: {
        marginTop: "15px",
        marginLeft: "20px",
    },
    code: {
        fontSize: "10px",
    },
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    codestyle: {
        marginLeft: "15px",
        marginTop: "25px",
    },
    MagodTitle: {
        width: "50%",
        // marginLeft:"2px",
        marginTop: "10px",
    },
    titleBold: {
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        fontSize: "15px",
        marginTop: "25px",
    },
    typeofform: {
        fontFamily: "Helvetica-Bold",
        textAlign: "center",
        fontSize: "15px",
    },
    tableContainer2: {
        flexDirection: "column",
        flexWrap: "wrap",
        marginTop: "15px",
        width: "160px",
    },
    quotationNumview: {
        fontSize: 12,
        width: "60px",
        marginLeft: "40%",
        marginTop: "5px"
    },
    quotationNumDataview: {
        width: "100px",
        marginTop: "5px",
    },
    quotesize: {
        fontSize: 12,
    },
    quotationNumData: {
        fontSize: 12,
    },
    dateview: {
        marginTop: "5px",
        fontSize: 12,
        width: "60px",
        marginLeft: "40%",
    },
    dateData: {
        width: "100px",
        marginTop: "4px",
    },
    datesize: {
        fontSize: 12,
    },
    validuptoView: {
        marginTop: "5px",
        fontSize: 12,
        width: "60px",
        marginLeft: "40%",
        marginBottom: "5px",
    },
    validuptodataView: {
        width: "100px",
        marginTop: "4px",
    },
    validsize: {
        fontSize: 12,
    },
    column: {
        flexDirection: "row",
    },
    text: {
        fontSize: 12,

    },
    textBold: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
    },
    pagenum: {
        width: 160,
        textAlign: "right",
    },
    cusdetailsection: {
        marginLeft: "30px",
        marginRight: "30px",
        width: "100%",
        borderBottom: 1,
        borderTop: 1,
    },
    cusdetailsection1: {
        marginLeft: "30px",
        marginRight: "30px",
        width: "90%",
        borderBottom: 1,
        borderTop: 1,
    },
    cusdetailsection2: {
        marginLeft: "30px",
        marginRight: "30px",
        width: "90%",
        borderBottom: 1,
        borderTop: 1,
    },
    cusdetailsection3: {
        marginLeft: "30px",
        marginRight: "30px",
        width: "90%",
        borderBottom: 1,
        borderTop: 1,
    },
    cusnameview: {
        width: "20%",
        // paddingBottom: "3px",


    },
    cusnamedata: {
        width: "100%",
        // paddingBottom: "3px",

    },
    collon: {
        width: "5%",
        // paddingBottom: "3px",


    },
    enquiryrefview: {
        width: "28%",
        // marginLeft: 15,
        paddingBottom: "3px",
    },
    refdata: {
        width: "70%",
        paddingBottom: "3px",
    },
    enquirydateview: {
        width: "28%",
        paddingBottom: "3px",
    },
    enquirydata: {
        // width: "70%",
        //paddingBottom: "3px",
    },
    contactsection: {
        width: "25%",
        borderBottom: 1,
        borderTop: 1,
    },
    contactview: {
        width: "30%",
        paddingBottom: "3px",
    },
    contactdata: {
        width: "70%",
        paddingBottom: "3px",
    },
    teleview: {
        width: "30%",
        paddingBottom: "3px",
    },
    teledata: {
        width: "70%",
        paddingBottom: "3px",
    },

    maintableview: {
        width: "790px",
        marginLeft: "30px",
    },
    datawithboldline: {
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        textDecoration: "underline",
    },
    datawithoutbline: {
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
    },
    taskname: {
        marginLeft: "10px",
    },
    databox: {
        marginTop: "10px",
        width: "50%",
    },
    databox2: {
        marginTop: "30px",
        width: "50%",
    },
    materialdetailheading: {
        marginTop: "10px",
    },
    subdetails: {
        width: "50%",
        borderBottom: 1,
        borderLeft: 1,
        borderTop: 1,
    },
    subdetails2: {
        width: "50%",
        borderBottom: 1,
        borderRight: 1,
        borderTop: 1,
    },
    section1: {
        width: "50%",
    },
    section2: {
        width: "50%",
    },
    subsection1heading: {
        width: "70%",
        textAlign: "right",
    },
    subsection1data: {
        width: "30%",
        textAlign: "left",
    },
    subsection2heading: {
        width: "70%",
        textAlign: "right",
    },
    subsection2data: {
        width: "30%",
        textAlign: "left",
    },
    simtext: {
        fontSize: 10,
        padding: "3px",
    },
    simtextdata: {
        marginLeft: "5px",
        fontSize: 10,
        padding: "3px",
    },
    subsectionlastheading: {
        width: "100%",
        textAlign: "right",
    },
    subsectionlastdata: {
        width: "100%",
        textAlign: "left",
    },
    subdetailspart2: {
        width: "50%",
    },
    sectionpart2: {
        width: "50%",
    },
    subdetail2part2: {
        width: "50%",
    },
    subsectionpart2: {
        width: "50%",
    },
    jobwordview: {
        width: "50%",
        textAlign: "right",
    },
    jobworktext: {
        fontFamily: "Helvetica-Bold",
        fontSize: "12px",
        textAlign: "right",
    },
    jobworkdataview: {
        width: "40%",
        textAlign: "left",
    },
    boldtextbox: {
        marginTop: "20px",
    },
    tableDisplay: {
        width: "100%",

        marginTop: "10px",
        borderBottom: 1,
        borderTop: 1,
    },
    drawingname: {
        width: "25%",
        paddingBottom: "3px",
        paddingTop: "3px",
        textAlign: "center"
    },
    quantity: {
        width: "8%",
        paddingBottom: "3px",
        textAlign: "center",
        paddingTop: "3px",
    },
    tableDataView: {
        width: "100%",
        borderBottom: 1,
    },
    tabletext: {
        fontSize: "10px"
    },
    PageNumber: {
        position: "absolute",
        fontSize: 10,
        bottom: 10,
        left: 270,
        textAlign: "center",
        color: "gray",
    },
    totaltext: {
        fontFamily: "Helvetica-Bold",
        fontSize: "10px"
    },



    textFabrication: {
        width: "200px",
        marginLeft: "40px",
        fontFamily: "Helvetica-Bold",
        marginTop: "17px",
        fontSize: "20px",
    },
    textFabrication2: {
        width: "200px",
        marginLeft: "10px",
        fontFamily: "Helvetica-Bold",
        marginTop: "17px",
        fontSize: "20px",
    },
    collonFabrication: {
        marginTop: "17px",
        marginLeft: "-22%"
    },
    collonFabrication2: {
        marginTop: "17px",
        marginLeft: "-25%"
    },
    textLavourCostDetails: {
        marginTop: "17px",
        marginLeft: "1%",
    },
    fav: {
        width: "17%",
        marginLeft: "2%"
    },
    favBold: {
        fontSize: "10px",
        fontFamily: "Helvetica-Bold",
    },
    favTable: {
        width: "20%",
        marginLeft: "6%"
    },
    fav2: {
        width: "17%",
        marginLeft: "5%"
    },
    favTable2: {
        width: "17%",
        marginLeft: "3%"
    },
    headerData: {
        width: "20%",
    },
    favCol1: {
        width: "20%",
        marginLeft: "5%",
    },
    favCol2: {
        width: "24%",
        marginLeft: "8%",
    },
    favCol3: {
        width: "20%",
        marginLeft: "5%",
    },
    favCol4: {
        width: "21%",
        marginLeft: "5%",
    },
    favCol5: {
        width: "15%",
        marginLeft: "20%"

    },
    favColData1: {
        width: "23%",
        marginLeft: "5%",
    },
    favColData2: {
        width: "21%",
        marginLeft: "5%"

    },
    favColData3: {
        width: "12%",

    },
    favColData4: {
        width: "20%",
        marginLeft: "3%",

    },
    favColData4: {
        width: "20%",
        marginLeft: "4%",
    },
    favColData5: {
        width: "20%",
        marginLeft: "8%",
    },
    favBom1: {
        width: "25%",
        marginLeft: "10%"
    },
    favBom2: {
        width: "25%",
    },
    favBom3: {
        width: "30%",
    },
    favBom4: {
        width: "20%",
    },
    favBomData1: {
        width: "32%",
        marginLeft: "5%"
    },
    favBomData2: {
        width: "18%",
    },
    favBomData3: {
        width: "30%",
        marginLeft: "9%",
    },
    favBomData4: {
        width: "20%",
    },
});

const FabEstimationTable = ({ newData }) => {
    const [Tabledata, setTabledata] = useState([]);

    const recordsPerPage = 19;
    const totalPages = Math.ceil(Tabledata.length / recordsPerPage);


    const firstItemData = Tabledata[0];

    console.log(newData);

    return (
        <Document>

            <Page size="A4" style={styles.page} orientation="landscape">

                <View style={styles.tableContainer}>

                    <View >

                        <View style={styles.row}>
                            <View style={styles.column}>
                                <View style={styles.row}>
                                    <View style={styles.logostyle}>
                                        <Image src={magodlogo} style={styles.logo} />
                                    </View>
                                    {/* <View style={styles.codestyle}>
                  <Text style={styles.code}>F 29 Rev 4</Text>
                </View> */}
                                </View>
                            </View>

                            <View style={styles.MagodTitle}>
                                {/* {Tabledata.map((newData, index) => (
                                    <View key={index}> */}

                                <View>
                                    {/* {index === 0 && ( */}
                                    <View>
                                        <Text style={styles.titleBold}>
                                            Magod Laser Machining Pvt Ltd : {newData["unitdata"][0]["UnitName"]}

                                        </Text>
                                        <Text style={styles.typeofform}>Fabrication Quotation Estimation Form</Text>
                                    </View>
                                    {/* )} */}
                                </View>


                            </View>
                            {/* ))} */}
                        </View>

                        <View style={styles.tableContainer2}>
                            {/* {Tabledata.map((newData, index) => ( */}

                            <View>
                                {/* {index === 0 && ( */}
                                <View>
                                    <View style={styles.row}>

                                        <View style={styles.quotationNumview}>
                                            <Text style={styles.quotesize}>Type</Text>
                                        </View>

                                        <View style={styles.quotationNumDataview}>
                                            <Text style={styles.quotationNumData}>{newData["qtnidchk"][0]["QtnType"]}</Text>

                                        </View>

                                        <View style={[styles.pageNumberContainer, { textAlign: "right" }]}>
                                            <Text
                                                style={styles.pageNumberText}
                                                render={({ pageNumber }) =>
                                                    `${pageNumber}`
                                                }
                                                fixed
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.dateview}>
                                            <Text>QtnNo</Text>
                                        </View>
                                        <View style={styles.dateData}>
                                            <Text style={styles.datesize}>{newData["qtnidchk"][0]["QtnNo"]}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.validuptoView}>
                                            <Text>Status</Text>
                                        </View>
                                        <View style={styles.validuptodataView}>
                                            <Text style={styles.validsize}>{newData["qtnidchk"][0]["QtnStatus"]}</Text>
                                        </View>
                                    </View>

                                </View>
                                {/* )} */}
                            </View>
                            {/* ))} */}

                        </View>
                    </View>

                </View>

                <View>
                    {/* {Tabledata.map((newData, index) => ( */}
                    <View>
                        {/* {index === 0 && ( */}
                        <View>

                            <View style={styles.row}>
                                <View style={styles.cusdetailsection}>
                                    <View style={styles.column}>
                                        <View style={styles.cusnameview}>
                                            <Text style={styles.text}>Assembly Name</Text>
                                        </View>
                                        <View style={styles.collon}>
                                            <Text style={styles.textBold}>
                                                :
                                            </Text>
                                        </View>
                                        <View style={styles.headerData}>
                                            <Text style={styles.textBold}>{newData["fabassyparts"][0].Name}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.cusnameview}>
                                            <Text style={styles.text}>Cost of Labour</Text>
                                        </View>
                                        <View style={styles.collon}>
                                            <Text style={styles.textBold}>
                                                :
                                            </Text>
                                        </View>
                                        <View style={styles.headerData}>
                                            <Text style={styles.textBold}>{newData["fabassyparts"][0].LabourCost}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.cusnameview}>
                                            <Text style={styles.text}>Cost of Material</Text>
                                        </View>
                                        <View style={styles.collon}>
                                            <Text style={styles.textBold}>
                                                :
                                            </Text>
                                        </View>
                                        <View style={styles.headerData}>
                                            <Text style={styles.textBold}>{newData["fabassyparts"][0].MaterialCost}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.column}>
                                        <View style={styles.cusnameview}>
                                            <Text style={styles.textBold}>Total</Text>
                                        </View>
                                        <View style={styles.collon}>
                                            <Text style={styles.textBold}>
                                                :
                                            </Text>
                                        </View>
                                        <View style={styles.headerData}>
                                            <Text style={styles.textBold}>{parseFloat(newData["fabassyparts"][0].Total).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>


                        </View>
                        {/* )} */}
                    </View>


                    {/* ))} */}


                </View>
                {/* </View> */}

                {/* {newData["fabsubassy"].map((dt, index) => ( */}
                    <View > 
                        {/* key={index}> */}
                        {/* {index === 0 && ( */}
                            <View>
                                <View style={styles.column}>
                                    <View style={styles.textFabrication}>
                                        <Text style={styles.text}>Fabrication : Labour Cost Details</Text>
                                    </View>
                                    {/* <View style={styles.collonFabrication}>
                                        <Text style={styles.textBold}>
                                            :
                                        </Text>
                                    </View>
                                    <View style={styles.textLavourCostDetails}>
                                        <Text style={styles.textBold}>{dt.fabricationtype1}</Text>
                                    </View> */}
                                </View>

                            </View>
                        {/* )} */}

                    </View>
                {/* ))} */}


                <View style={styles.cusdetailsection1}>
                    <View style={styles.column}>
                        <View style={styles.favCol1}>
                            <Text style={styles.favBold}>Name</Text>
                        </View>
                        <View style={styles.favCol2}>
                            <Text style={styles.favBold}>Estimated Cost</Text>
                        </View>
                        <View style={styles.favCol3}>
                            <Text style={styles.favBold}>Quantity</Text>
                        </View>
                        <View style={styles.favCol4}>
                            <Text style={styles.favBold}>Labour Cost</Text>
                        </View>
                        <View style={styles.favCol5}>
                            <Text style={styles.favBold}>Total</Text>
                        </View>
                    </View>
                </View>

                {/* {Tabledata.map((dt, index) => ( */}
                {newData["fabsubassy"].map((dt, index) => (
                    <View key={index}>


                        <View style={styles.column}>
                            <View style={styles.favColData1}>
                                <Text style={styles.favText}>{dt.AssemblyName}</Text>
                            </View>
                            <View style={styles.favColData2}>
                                <Text>{dt.UnitLabourCost}</Text>
                            </View>
                            <View style={styles.favColData3}>
                                <Text>{dt.Quantity}</Text>
                            </View>
                            <View style={styles.favColData4}>
                                <Text>{dt.UnitLabourCost}</Text>
                            </View>
                            <View style={styles.favColData5}>
                                <Text style={styles.textBold}>{dt.UnitLabourCost}</Text>
                            </View>
                        </View>



                    </View>
                ))}


                <View style={styles.cusdetailsection2}>
                    {/* {Tabledata.map((dt, index) => ( */}
                        <View> 
                            {/* key={index}>
                            {index === 0 && ( */}
                                <View>
                                    <View style={styles.column}>
                                        <View style={styles.textFabrication2}>
                                            <Text style={styles.text}>Fabrication : BOM Cost Details</Text>
                                        </View>
                                        {/* <View style={styles.collonFabrication2}>
                                            <Text style={styles.textBold}>
                                                :
                                            </Text>
                                        </View>
                                        <View style={styles.textLavourCostDetails}>
                                            <Text style={styles.textBold}>{dt.fabricationtype2}</Text>
                                        </View> */}
                                    </View>
                                </View>
                            {/* )} */}
                        </View>
                    {/* ))} */}

                </View>

                <View style={styles.column}>
                    <View style={styles.favBom1}>
                        <Text style={styles.favBold}> Part Name</Text>
                    </View>
                    <View style={styles.favBom2}>
                        <Text style={styles.favBold}>Quantity</Text>
                    </View>
                    <View style={styles.favBom3}>
                        <Text style={styles.favBold}>Unit Cost</Text>
                    </View>
                    <View style={styles.favBom4}>
                        <Text style={styles.favBold}>Total</Text>
                    </View>
                </View>

                <View style={styles.cusdetailsection3}>
                    {/* {Tabledata.map((dt, index) => ( */}
                    {newData["fab_bom"].map((dt, index) => (
                        <View key={index}>

                            <View style={styles.column}>
                                <View style={styles.favBomData1}>
                                    <Text style={styles.favText}>{dt.PartName}</Text>
                                </View>

                                <View style={styles.favBomData2}>
                                    <Text>{dt.Quantity}</Text>
                                </View>
                                <View style={styles.favBomData3}>
                                    <Text>{dt.UnitMaterialCost}</Text>
                                </View>
                                <View style={styles.favBomData4}>
                                    <Text>{(Number(dt.Quantity) * Number(dt.UnitMaterialCost)).toFixed(2)}</Text>
                                </View>
                            </View>



                        </View>
                    ))}


                    {/* <View style={styles.column}>
         <View style={styles.favBomData1}>
          <Text style={styles.favText}>FRAME</Text>
         </View>
         
         <View style={styles.favBomData2}>
          <Text>1</Text>
         </View>
         <View style={styles.favBomData3}>
          <Text>2,500.00</Text>
         </View>
         <View style={styles.favBomData4}>
          <Text>15,000.00</Text>
         </View>
        </View> */}

                    {/* <View style={styles.column}>
         <View style={styles.favTable2}>
          <Text style={styles.favText}>HANDLE</Text>
         </View>
         <View style={styles.favTable2}>
          <Text>1</Text>
         </View>
         <View style={styles.favTable2}>
          <Text>2,500.00</Text>
         </View>
         <View style={styles.favTable2}>
          <Text>15,000.00</Text>
         </View>
        </View> */}
                </View>





            </Page>

        </Document>

    );
};


export default FabEstimationTable;
