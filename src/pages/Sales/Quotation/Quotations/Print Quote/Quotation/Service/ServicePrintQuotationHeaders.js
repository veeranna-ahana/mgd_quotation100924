import React, { Fragment, useEffect, useState } from 'react';
//import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//import PDFdocument from './PDFdocument';
import ServiceQuoteHeaders from '../Service/ServiceQuoteHeaders';
import { useLocation } from 'react-router-dom';
//import { baseURL } from '../../../../../api/baseUrl';
import { getRequest, postRequest } from "../../../../../../api/apiinstance";
import { endpoints } from "../../../../../../api/constants";
import { toast } from 'react-toastify';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


export default function ServicePrintQuotationHeaders({ Qtnno }) {
    // const location = useLocation();

    // let selectedWeek=location.state.selectedWeek;
    console.log("to pass", Qtnno);

    let [units, setUnits] = useState([]);

    const newData1 = [
        [{
            ShiftIc: "Kumar N",
            Shift: "First",
            day: "20-01-2023",
            machineOperators: [
                {
                    Machine: "Laser 1",
                    Operator: "Operator 1"
                },
                {
                    Machine: "Laser 2",
                    Operator: "Operator 2"
                },
                {
                    Machine: "Laser 3",
                    Operator: "Operator 3"
                },

            ]
        },
        {
            ShiftIc: "Shashidhara",
            Shift: "Second",
            day: "20-01-2023",
            machineOperators: [
                {
                    Machine: "Laser 4",
                    Operator: "Operator 4"
                },
                {
                    Machine: "Laser 5",
                    Operator: "Operator 5"
                },
                {
                    Machine: "Laser 6",
                    Operator: "Operator 6"
                },

            ]
        },
        {
            ShiftIc: "Mahesh Bogan",
            Shift: "Third",
            day: "20-01-2023",
            machineOperators: [
                {
                    Machine: "Laser 7",
                    Operator: "Operator 7"
                },
                {
                    Machine: "Laser 8",
                    Operator: "Operator 8"
                },
                {
                    Machine: "Laser 9",
                    Operator: "Operator 9"
                },

            ]
        }], [
            {
                ShiftIc: "Kumar N",
                Shift: "First",
                day: "21-01-2023",
                machineOperators: [
                    {
                        Machine: "Laser 1",
                        Operator: "Operator 1"
                    },
                    {
                        Machine: "Laser 2",
                        Operator: "Operator 2"
                    },
                    {
                        Machine: "Laser 3",
                        Operator: "Operator 3"
                    },

                ]
            },
            {
                ShiftIc: "Shashidhara",
                Shift: "Second",
                day: "21-01-2023",
                machineOperators: [
                    {
                        Machine: "Laser 4",
                        Operator: "Operator 4"
                    },
                    {
                        Machine: "Laser 5",
                        Operator: "Operator 5"
                    },
                    {
                        Machine: "Laser 6",
                        Operator: "Operator 6"
                    },

                ]
            },
            {
                ShiftIc: "Mahesh Bogan",
                Shift: "Third",
                day: "21-01-2023",
                machineOperators: [
                    {
                        Machine: "Laser 7",
                        Operator: "Operator 7"
                    },
                    {
                        Machine: "Laser 8",
                        Operator: "Operator 8"
                    },
                    {
                        Machine: "Laser 9",
                        Operator: "Operator 9"
                    },

                ]
            }
        ]
    ]

    const data = {
        id: "5df3180a09ea16dc4b95f910",
        items: [
            {
                Machine: "Laser 1",
                Operator: "Suresh A",
                ShiftRemarks: "",
            },
            {
                Machine: "Laser 6",
                Operator: "Deepak",
                ShiftRemarks: ""
            },
            {
                Machine: "Laser 8",
                Operator: "Shreyas K",
                ShiftRemarks: ""
            }
        ],
    };

    //API 
    //First Shift
    const [newData, setNewdata] = useState([]);

    const getQuotationPrint = () => {
        postRequest(endpoints.getQtnPrintDetails, { qtnno: Qtnno }, async (qtnidchk) => {
            console.log(qtnidchk);
          //  if (qtnidchk.length > 0) {
                setNewdata(qtnidchk);

            //     console.log(qtnidchk);
            // } else {
            //     setNewdata([]);
            //     toast.error("No Data Found for Tax Details and Terms..!");
            // }
        });
    }


    useEffect(() => {
        getQuotationPrint();
    }, []);
    return (

        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
                {Object.keys(newData).length > 0 &&
                    <ServiceQuoteHeaders data={data}
                        // selectedWeek={selectedWeek}
                        newData={newData}
                    />
                }
            </PDFViewer>
        </Fragment>
    );

}
