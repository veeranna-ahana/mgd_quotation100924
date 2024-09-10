import React, { useEffect, useState } from "react";

import { Table, Row, Col, Container, Form, FormLabel, FormCheck, Button, FormControl, Tabs, Tab, } from "react-bootstrap";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import AlertModal from "../../../../../components/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useQuotationContext } from "../../../../../../context/QuotationContext";
import useForceUpdate from 'use-force-update';
import ModalPrintFabEstimation from "../../Print Quote/Estimation/FabEstimation/PrintFabEstimate";

const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

export default function QtnFabrication() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let { quotation, setQuotationState } = useQuotationContext();
    let [openFabEstPrintModal, setOpenFabEstPrintModal] = useState(false);
    let [fabestprintdata, setFabEstPrintData] = useState([]);
    const forceUpdate = useForceUpdate();

    let [assmdata, setAssmdata] = useState([]); // Fabrication_ AssyParts
    let [assmcomps1, setAssmcomps1] = useState([]); // Fabrication_ AssyParts
    let [mainassmdata, setMainAssmData] = useState([]);
    let [mainchilddata, setMainChildData] = useState([]);
    let [childdata, setChildData] = useState([]);
    let [childpartmtrl, setChildPartMtrl] = useState([]);
    let [maintreenodes, setMainTreeNodes] = useState([]);

    let [itemName, setItemName] = useState('');
    let [formsubassmname, setFormSubassmname] = useState("");
    let [formisassembly, setFormIsassembly] = useState(false);
    let [formqty, setFormQty] = useState("");
    let [partquantity, setPartQuantity] = useState("");

    let [processcost, setProcessCost] = useState("");
    let [processdesc, setProcessDesc] = useState("");
    let [processdata, setProcessData] = useState([]);

    let [qtndata, setQtnData] = useState([]);
    let [customerName, setCustomerName] = useState("");
    let [materialcost, setMaterialCost] = useState("");
    let [labourcost, setLaboutCost] = useState("");
    let [totalcost, setTotalCost] = useState("");
    let [fabassydata, setFabAssyData] = useState([]);
    let [highlight, setHighlight] = useState([]);
    let [selectedtcdata, setSelectedTCData] = useState([]);
    let [quotationNo, setQuotationNo] = useState('');
    let [quotationDate, setQuotationDate] = useState('');
    let [assyid, setAssyId] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [selectedMainAssm, setSelectedMainAssm] = useState(null);

    let [mainprocdata, setMainProcData] = useState([]);

    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedParentNode, setSelectedParentNode] = useState(null);
    const [rootNode, setRootNode] = useState(null);
    const [newNode, setNewNode] = useState(null);
    const [nodeCount, setNodeCount] = useState(0);
    const [tree, setTree] = useState({
        id: 1,
        baseid: 1,
        parentid: 0,
        level: 0,
        name: 'Item Name / Description',
        isassy: 1,
        children: [],
    });

    const [tableInputOperation, setTableInputOperation] = useState("");
    const [tableInputCost, setTableInputCost] = useState(0);

    const getNodeCount = (tree) => {
        let count = 0;
        const traverse = (tree) => {
            count++;
            tree.children.forEach(child => {
                traverse(child);
            });
        }
        traverse(tree);
        return count;
    }

    useEffect(() => {
        setQuotationNo(quotation['QtnNo'] ?? quotation['quoteno'].replaceAll("_", "/"));

        setNodeCount(getNodeCount(tree));
        setRootNode(tree.name);
    }, [tree]);

    var flatten = function (data) {
        var result = {};
        function recurse(cur, prop) {
            if (Object(cur) !== cur) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                for (var i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop ? prop + "." + i : "" + i);
                if (l == 0)
                    result[prop] = [];
            } else {
                var isEmpty = true;
                for (var p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "." + p : p);
                }
                if (isEmpty)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    }

    let [alertModal, setAlertModal] = React.useState(false);

    let alertFunction = () => {
        setAlertModal(true);
        addNode();
        setAlertModal(false);
    };
    let secbtnc = () => {
        setAlertModal(false);
    };

    let fstbtnc = () => {
        window.location.href = "";
    };

    useEffect(() => {
        if (searchParams.get("QtnNo") == null || searchParams.get("QtnNo") == undefined) {
            // ((quotation !== null) || (quotation !== undefined)) {
            console.log(quotation);
            setQtnData(quotation);

            setQuotationNo(quotation.quoteno);
            setQuotationDate(quotation.quotationDate);
        } else {
            console.log(searchParams.get("QtnNo"));
            setQuotationNo(searchParams.get("QtnNo"));
            //   setQuotationDate(QtnDate);
        }

    }, []);


    const addNode = (tree, id, isassembly, newNode) => {
        if (tree.id === id) {
            tree.children.push({
                id: nodeCount + 1,
                baseid: 0,
                parentid: id,
                level: tree.level + 1,
                name: newNode,
                isassy: isassembly,
                children: [],
            });
        } else {
            tree.children.forEach(child => {
                addNode(child, id, isassembly, newNode, nodeCount + 1);
            });
        }
    }

    const modifyNode = (tree, id, newNode) => {
        if (tree.id === id) {
            tree.name = newNode;
        } else {
            tree.children.forEach(child => {
                modifyNode(child, id, newNode);
            });
        }
    }


    const addMainAssemblyData = async (e) => {
        //        e.preventDefault();
        console.log("addMainAssemblyData");
        let Mainassmname = itemName;
        let mainQty = 1;


        setMainAssmData((oldmainassmdata) => [...oldmainassmdata, { mainassmname: Mainassmname, mainquantity: mainQty, calculatedcost: 0, labourcost: 0, totalcost: 0 }]);

        console.log(mainassmdata);
        //  saveMainAssyBOM();
    }

    console.log("tree " + tree);

    const saveMainAssyBOM = async () => {
        postRequest(endpoints.SaveFabAssyParts, { quotationNo, tree }, (resp) => {
            //  await postRequest(endpoints.SaveFabAssyParts, { quotationNo, maintreenodes, childdata }, (resp) => {
            console.log(resp);
            //  setAssyId(resp.assyid);
            toast.success("Assembly Details Saved ");

        });

        // postRequest(endpoints.saveFab_SubAssy, { quotationNo }, (resp) => {
        //     console.log(resp);
        //     if (resp.assyid > 0) {
        //         toast.success("Saved Successfully");
        //     }
        // });

    }

    const addAssemblyDetails = async (e) => {
        e.preventDefault();
        console.log("Adding Assembly Details")
        if (e.target.elements.formsubassmname.value === null || e.target.elements.formsubassmname.value === "") {
            alert("Please enter a value");
            return;
        }

        // let Subassmname = e.target.elements.formsubassmname.value;
        //  let Isassembly = formisassembly;
        console.log(e.target.elements.formisassembly.checked);
        let Isassembly = (e.target.elements.formisassembly.checked == true ? 1 : 0);
        // let Isassembly = formisassembly;
        // formisassembly
        let Qty = 1;
        if (Isassembly == 1) {
            setFabAssyData((oldfabassydata) => [...oldfabassydata, { subassmname: e.target.elements.formsubassmname.value, quantity: Qty }]);

            // if (tree.level > 0) {
            //     setMainAssmData((oldmainassmdata) => [...oldmainassmdata, { mainassmname: e.target.elements.formsubassmname.value, mainquantity: Qty, calculatedcost: 0, labourcost: 0, totalcost: 0 }]);
            // }
        }

        if (selectedNode === null) {
            addNode(tree, 1, Isassembly, e.target.elements.formsubassmname.value, newNode);
        } else {
            addNode(tree, selectedNode, Isassembly, e.target.elements.formsubassmname.value, newNode);
            console.log("selectedNode " + selectedNode + ' - ' + e.target.elements.formsubassmname.value);
            //      setSelectedParentNode(e.target.elements.formsubassmname.value);
        }
        setTree({ ...tree });
        setNewNode("");
        setSelectedNode(null);

        console.log(tree);

        mainchilddata = tree.children.filter(a => a.level == 1); // && a.isassy == 0);  // 1 is for child)

        console.log(mainchilddata);
        console.log("addAssemblyDetails - assmdata " + e.target.elements.formsubassmname.value + " " + Isassembly + " " + Qty);

        setMainChildData(mainchilddata);
        setAssmdata((oldassmdata) => [...oldassmdata, { subassmname: e.target.elements.formsubassmname.value, isassembly: Isassembly, quantity: Qty }]);


        const getleafnodes = (tree) => {
            let leafnodes = [];
            const traverse = (tree) => {
                if (tree.children.length == 0) {
                    leafnodes.push(tree);
                }
                tree.children.forEach(child => {
                    traverse(child);
                });
            }
            traverse(tree);
            console.log(leafnodes);
            return leafnodes;
        }

        childdata = getleafnodes(tree); // 1 is for child)
        setChildData(childdata);
//         setChildPartMtrl(childdata);
//         console.log("Child Part Mtrl : ")
// console.log(childpartmtrl);

        const getallnodes = (tree) => {
            let allnodes = [];
            const traverse = (tree) => {
                allnodes.push(tree);
                tree.children.forEach(child => {
                    traverse(child);
                });
            }
            traverse(tree);
            console.log(allnodes);
            return allnodes;
        }

        let maintreenods = getallnodes(tree); // 1 is for child)
        setMainTreeNodes(maintreenods)
        console.log(maintreenods);

        const updatedChildmtrldata = childdata.map(item => ({
            ...item,
             unitcost: 0,
            quantity: 1,
        }));
        setChildPartMtrl(updatedChildmtrldata);


        setMainAssmData(mainchilddata);

        const updatedMainAssmData = mainchilddata.map(item => ({
            ...item,
            mainquantity: 1,
            calculatedcost: 0,
            labourcost: 0,
            totalcost: 0,
        }));
        //setMainAssmData((oldmainassmdata) => [...oldmainassmdata, { mainassmname: e.target.elements.formsubassmname.value, mainquantity: Qty, calculatedcost: 0, labourcost: 0, totalcost: 0 }]);
        let updatedMainAssmData1 = updatedMainAssmData.filter(a => a.isassy == 1);  // 1 is for child
        setMainAssmData(updatedMainAssmData1);
        console.log(updatedMainAssmData1);


        setFormSubassmname("");
        setFormIsassembly(false);


    };



    // const saveSubAssy = async () => {
    //     postRequest(endpoints.SaveFabAssy, { quotationNo, tree }, (resp) => {
    //         console.log(resp);
    //         if (resp.status == "success") {
    //             toast.success("Saved Successfully");
    //         }
    //     });
    // }

    // const saveFabAssyOperations = async () => {
    //     postRequest(endpoints.SaveFabAssyOperations, { quotationNo, tree }, (resp) => {
    //         console.log(resp);
    //         if (resp.status == "success") {
    //             toast.success("Saved Successfully");
    //         }
    //     });
    // }

    // const partcosting = async (e) => {
    //     let partqty = e.target.elements.partquantity.value;
    //     let partcost = e.target.elements.unitcost.value;
    //     let parttotal = parseFloat(partqty) * parseFloat(partcost);

    //     //setAssmdata((oldassmdata) => [...oldassmdata, { subassmname: Subassmname, isassembly: Isassembly, quantity: partqty, partcost:partcost,parttotal:parttotal }]);
    //     setAssmdata((oldassmdata) => [...oldassmdata, { quantity: partqty, partcost: partcost, parttotal: parttotal }]);
    // }

    // const distributecost = async (e) => {
    //     // e.preventDefault();
    //     let ProcessDesc = e.target.elements.processdesc.value;
    //     let ProcessCost = e.target.elements.processcost.value;
    //     let maincalcost = parseFloat(maincalcost) + parseFloat(ProcessCost);
    //     setMainProcData((oldmainprocdata) => [...oldmainprocdata, { mainassmname: ProcessDesc, mainquantity: '1', mainCalculatedcost: maincalcost, mainTotalcost: maincalcost }]);
    // }


    //========  New Code from here =========
    // const [tableData, setTableData] = useState([
    //     {
    //         name: 'Item 1',
    //         totalCost: 0,
    //         totalTax: 0,
    //         items: [{ name: '', quantity: 1, cost: 0 }],
    //     },
    // ]);

    // const handleInputChange = (index, field, value) => {
    //     const updatedTableData = [...tableData];
    //     if (field === 'quantity' || field === 'cost') {
    //         updatedTableData[0].items[index][field] = value;
    //     } else {
    //         updatedTableData[0][field] = value;
    //     }
    //     setTableData(updatedTableData);
    // };

    // const calculateTotalCostAndTax = () => {
    //     let totalCost = 0;
    //     let totalTax = 0;
    //     const items = tableData[0].items;

    //     items.forEach((item) => {
    //         totalCost += item.quantity * item.cost;
    //     });

    // You can add tax calculation logic here if needed

    //     const updatedTableData = [
    //         { ...tableData[0], totalCost, totalTax, items: [...items] },
    //     ];
    //     setTableData(updatedTableData);
    // };

    // const handleAddItem = () => {
    //     const updatedItems = [...tableData[0].items, { name: '', quantity: 1, cost: 0 }];
    //     const updatedTableData = [{ ...tableData[0], items: updatedItems }];
    //     setTableData(updatedTableData);
    // };

    //========  New Code ends here =========

    let renderFabItemList = (part, id) => {
        console.log(part)
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: 'left' }}>{part["name"]}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}><input type="checkbox" checked={part["isassy"] == 1 ? true : false} /></td>
                {/* onChange={(e) => { setFormIsassembly(id, e.target.checked) }} /></td> */}
            </tr>
        );
    };

    let renderFabPartList = (partlist, id) => {
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: 'left' }}>{partlist["name"]}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>1</td>
                {/* {partlist["quantity"]}</td> */}
            </tr>
        );
    };

    let renderAssyList = (part) => {
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: 'left' }}>{part.subassmname}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{part.quantity}</td>
            </tr>
        );
    };

    let renderFabCostAssyList = (fabcostpartlist, id) => {
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "left" }}>{fabcostpartlist["name"]}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}><input type="number" id="partquantity" onChange={(e) => {
                    let oldassmdata = [...childpartmtrl];
                    oldassmdata[id].quantity = e.target.value;
                    let total = parseFloat(e.target.value) * parseFloat(fabcostpartlist.unitcost);
                    oldassmdata[id].parttotal = total;
                    setChildPartMtrl(oldassmdata);
                }} value={fabcostpartlist.quantity} /></td>
                {/* <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}><input type="text" id="unitcost" onChange={(e) => setUnitCost(e.target.value)} /></td> */}
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}><input type="number" id="unitcost" onChange={(e) => {
                    let oldassmdata = [...childpartmtrl];
                    oldassmdata[id].unitcost = e.target.value;

                    let total = parseFloat(e.target.value) * parseFloat(fabcostpartlist.quantity);
                    oldassmdata[id].parttotal = parseFloat(total);

                    let matTotal = 0;
                    for (let i = 0; i < oldassmdata.length; i++) {
                        if (parseFloat(oldassmdata[i].parttotal) > 0) {
                            matTotal = matTotal + parseFloat(oldassmdata[i].parttotal); // + parseFloat(total));
                        }
                    }
                    setMaterialCost(matTotal); //(parseFloat(total ? (total + total) : total)));

                    setTotalCost((parseFloat(e.target.value ? e.target.value : 0) + parseFloat(labourcost)));
                    setChildPartMtrl(oldassmdata);
                    console.log(oldassmdata);
                }} value={fabcostpartlist.unitcost} /></td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{fabcostpartlist.parttotal}</td>
            </tr>
        );
    }

    let renderFabCostAssyPartList = (mainassy, id) => {
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px", backgroundColor: selectedMainAssm === id ? "#ff0000" : "" }} onClick={() => {
                setSelectedMainAssm(id);
            }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px", textAlign: "left" }}>{mainassy.name}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{mainassy.mainquantity}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{mainassy.calculatedcost}</td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}><input type="text" value={mainassy.labourcost} onChange={(e) => {
                    let oldmainassmdata = [...mainassmdata];
                    oldmainassmdata[id].labourcost = e.target.value;
                    oldmainassmdata[id].totalcost = parseFloat(oldmainassmdata[id].calculatedcost) + (e.target.value == "" ? 0 : parseFloat(e.target.value));
                    let labTotal = 0;
                    for (let i = 0; i < oldmainassmdata.length; i++) {
                        if (parseFloat(oldmainassmdata[i].labourcost) > 0) {
                            labTotal = labTotal + parseFloat(oldmainassmdata[i].labourcost); // + parseFloat(total));
                        }
                    }
                    // setLaboutCost(e.target.value ? e.target.value : 0);
                    setLaboutCost(labTotal);
                    // setTotalCost((parseFloat(e.target.value ? e.target.value : 0) + parseFloat(materialcost)));
                    setTotalCost((parseFloat(labTotal) + parseFloat(materialcost)));
                    setMainAssmData(oldmainassmdata);
                }} /></td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{mainassy.totalcost}</td>
            </tr>
        );
    }

    // 

    let renderFabProcessCostAssy = (pdata, id) => {
        return (
            <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                    {pdata.operation}
                </td>
                <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                    {pdata.cost}
                </td>
            </tr>
        );
    };

    const updateCalculatedProcessCost = (sel, oldData) => {
        let oldmainassmdata = [...mainassmdata];
        let calculatedCost = 0
        for (let i = 0; i < oldData[sel].length; i++) {
            calculatedCost += parseFloat(oldData[sel][i].cost);
        }
        oldmainassmdata[sel].calculatedcost = calculatedCost;
        oldmainassmdata[sel].totalcost = parseFloat(oldmainassmdata[sel].labourcost) + calculatedCost;
        setMainAssmData(oldmainassmdata);
    }

    const saveCostingTab = () => {
        console.log("saveCostingTab")
        console.log(childpartmtrl);
       // setChildPartMtrl(oldassmdata);

        postRequest(endpoints.saveFab_SubAssy, { quotationNo, childpartmtrl, mainassmdata,processdata,labourcost,materialcost }, (respdata) => {
            if (respdata.status === "success") {
                alert("Successfully Saved");
            } else {
                alert("Failed to Save");
            }

        })

        // postRequest(endpoints.savefab_subassy_operations, { mainassmdata, processdata }, (respdata) => {
        //     if (respdata.status === "success") {
        //         alert("Successfully Saved");
        //     } else {
        //         alert("Failed to Save");
        //     }
        // });
    }

    let onClickPrintFabEstimate = () => {
        console.log("Fab Estimate Printing ")
        //   navigate(`printestimate/printestimate/${quotationNo}`)
        postRequest(endpoints.getQtnPrintFabEstmnDets, { quotationno: quotationNo }, (fabestprintdata) => {
            console.log(fabestprintdata);
            if (Object.keys(fabestprintdata).length > 0) {
                setFabEstPrintData(fabestprintdata);
                setOpenFabEstPrintModal(true);
            } else {
                console.log("No Data Found")
            }
        });

    }


    return (
        <>

            <h4 className="title">Fabrication Assembly Dis-Aggregator Form</h4>
            <div className="row mt-3 ">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-4  col-sm-12">
                            <label className="form-label">Quotation No</label>
                            <input id="formquotationNo" type="text" disabled value={quotationNo} />
                        </div>
                        <div className="col-md-8  col-sm-12">
                            <label className="form-label">  </label>
                            <input type="text" disabled placeholder="Item Name / Description" value={itemName} />
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-3  col-sm-12">
                            <label className="form-label">Material Cost</label>
                            <input type="text" id="materialcost" disabled value={materialcost} />
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <label className="form-label">Labour Cost</label>
                            <input id="labourcost" type="text" value={labourcost} />
                        </div>
                        <div className="col-md-2 col-sm-12">
                            <label className="form-label">Total Cost</label>
                            <input id="totalcost" type="text" value={totalcost} />
                        </div>
                        <div className="col-md-2 col-sm-12 mt-1">
                            <button className="button-style" onClick={onClickPrintFabEstimate} >Print</button>
                        </div>
                        <div className="col-md-2 col-sm-12 mt-1">
                            <button className="button-style" onClick={() => navigate(-1)}>Close</button>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="" className="mb-1  tab_font mt-2">
                        <Tab
                            eventKey=""
                            title="Assembly Components"
                            style={{ padding: 0, marginRight: "20px" }}
                        >
                            <Container fluid style={{ padding: 0, marginRight: "20px mt-1" }}>
                                <div className="row">
                                    <div className="col-md-7  col-sm-12">
                                        <label className="form-label"> </label>
                                        <input type="text" id="itemName" onChange={(e) => {
                                            setItemName(e.target.value)
                                            setRootNode(e.target.value)
                                        }} value={rootNode} />
                                    </div>
                                    <div className="col-md-5">
                                        {" "}
                                        <div className="row justify-content-center mt-2 ">
                                            <button className="button-style" style={{ width: "90px" }}
                                                //onClick={alertFunction}
                                                onClick={() => {
                                                    if (rootNode === null || rootNode === "") {
                                                        alert("Please enter a value");
                                                        return;
                                                    }
                                                    modifyNode(tree, 1, rootNode);
                                                    setTree({ ...tree });
                                                    setRootNode("");
                                                    addMainAssemblyData();
                                                }}
                                                value={newNode}>Add</button>

                                            <button className="button-style" style={{ width: "90px" }} onClick={() => saveMainAssyBOM()}>Save</button>
                                            <button className="button-style" style={{ width: "90px" }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <Row className="mt-2">
                                    <Col xs={4} style={{ overflowX: 'scroll', overflowY: "scroll", height: "300px" }}>
                                        <Table striped className="table-data border">
                                            <thead className="tableHeaderBGColor tablebody">
                                                <tr style={{ fontSize: '14px' }}>
                                                    <th>Name</th>
                                                    <th>Assembly</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">

                                                {mainchilddata != null
                                                    ? mainchilddata.map((part, id) => renderFabItemList(part, id))
                                                    : null}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs={4} style={{ overflowX: 'scroll', overflowY: "scroll", height: "300px" }}>
                                        <Table striped className="table-data border">
                                            <thead className="tableHeaderBGColor tablebody">
                                                <tr style={{ fontSize: '14px' }}>
                                                    <th>Part Name</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {childdata != null
                                                    ? childdata.map((part, id) => renderFabPartList(part, id))
                                                    : null}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs={4} style={{ overflowX: 'scroll', overflowY: "scroll", height: "300px" }}>
                                        <Table striped className="table-data border">
                                            <thead className="tableHeaderBGColor tablebody">
                                                <tr style={{ fontSize: '14px' }}>
                                                    <th>Assembly Name</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {fabassydata != null
                                                    ? fabassydata.map((part) => renderAssyList(part))
                                                    : null}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className="row mt-2">
                                    <Form onSubmit={addAssemblyDetails} style={{ display: "flex" }} className="mb-3 ">
                                        <div className="col-md-4">
                                            <label className="form-label">Name</label>
                                            <input type="text" id="formsubassmname" />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label" style={{ marginTop: "5px", marginLeft: "70px" }}>Is Assembly</label>
                                            <input id="formisassembly" type="checkbox" onChange={setFormIsassembly} checked={formisassembly} style={{ marginLeft: "-35px", marginTop: "10px" }} />
                                        </div>
                                        <div className=" col-md-4 mt-2 mb-3">
                                            <button className="button-style" type="submit">Add</button>
                                        </div>
                                    </Form>
                                </Row>

                            </Container>
                        </Tab>

                        <Tab eventKey="custpartassmlist" title="Costing">
                            <Row>
                                <button className="button-style mt-1"
                                    style={{ width: "120px", marginLeft: "12px" }} onClick={() => { saveCostingTab() }} >
                                    Save
                                </button>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={6} style={{ height: "230px", overflowY: "scroll", overflowX: 'scroll' }}>
                                    <Table striped className="table-data border">
                                        <thead className="tableHeaderBGColor tablebody">
                                            <tr>
                                                <th>Part Name</th>
                                                <th>Quantity</th>
                                                <th>Material Cost Unit</th>
                                                <th>Total Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tablebody">
                                            {(childpartmtrl != null)
                                                ? childpartmtrl.map((partcostassy, id) => renderFabCostAssyList(partcostassy, id))
                                                : null}

                                        </tbody>
                                    </Table>
                                </Col>
                                <Col xs={6}>
                                    <div style={{ height: "230px", overflowY: "scroll", overflowX: 'scroll', fontFamily: "Roboto", fontSize: "12px" }}>
                                        <Table striped className="table-data border">
                                            <thead className="tableHeaderBGColor tablebody">
                                                <tr>
                                                    <th>Assy Name  </th>
                                                    <th>Quantity </th>
                                                    <th>Calc Cost </th>
                                                    <th>LabourCost/ Unit</th>
                                                    <th>Total Cost </th>
                                                </tr>
                                            </thead>
                                            <tbody className="tablebody">
                                                {(mainassmdata != null) // || (mainassmdata.level > 0 && mainassmdata.Isassembly == 1))
                                                    ? mainassmdata.map((mainassy, id) => renderFabCostAssyPartList(mainassy, id)) : null}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div style={{ height: "230px", overflowY: "scroll ", overflowX: 'scroll' }}>
                                        {selectedMainAssm != null ? (
                                            <Table striped className="table-data border">
                                                <thead className="tableHeaderBGColor tablebody">
                                                    <tr>
                                                        <th>Operation</th>
                                                        <th> Cost</th>
                                                        <th> Operation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tablebody">
                                                    {processdata[selectedMainAssm] !== undefined ? processdata[selectedMainAssm].map((pdata, id) => renderFabProcessCostAssy(pdata, id)) : null}
                                                    <tr className="custtr" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                                                        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                                                            <input
                                                                id="tableInputOperation"
                                                                type="text"
                                                                onChange={(e) => {
                                                                    setTableInputOperation(e.target.value);
                                                                }}
                                                                value={tableInputOperation}
                                                            />
                                                        </td>
                                                        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>
                                                            <input
                                                                id="tableInputCost"
                                                                type="text"
                                                                onChange={(e) => {
                                                                    setTableInputCost(e.target.value);
                                                                }}
                                                                value={tableInputCost}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button style={{ padding: '5px 10px' }} onClick={async () => {
                                                                let oldData = [...processdata];
                                                                if (oldData[selectedMainAssm] == undefined || oldData[selectedMainAssm] == null) {
                                                                    oldData[selectedMainAssm] = [];
                                                                }
                                                                oldData[selectedMainAssm].push({ operation: tableInputOperation, cost: tableInputCost });
                                                                await setProcessData(oldData);
                                                                setTableInputOperation("");
                                                                setTableInputCost(0);
                                                                await updateCalculatedProcessCost(selectedMainAssm, oldData);
                                                            }}>
                                                                +
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                            {/* </Container> */}
                        </Tab>
                    </Tabs>
                </div>

                <div className="col-md-2">
                    <div class="container"
                        style={{ border: "1px solid black", height: "650px", width: "304px", padding: "2px", }}>
                        {/* <button className="button-style" style={{ width: "120px", marginLeft: "12px" }} onClick={() => {
                                console.log(tree);
                            }}>Print</button> */}
                        <RenderTree {...tree} level={0} selectedNode={selectedNode} onSelectNode={setSelectedNode} />
                        {/* <input type="text" value={newNode} onChange={(e) => setNewNode(e.target.value)} /> */}
                        {/* <button onClick={() => addNode()}>Add Node</button> */}
                    </div>
                </div>
                <div>
                    <ModalPrintFabEstimation openFabEstPrintModal={openFabEstPrintModal} FabEstData={fabestprintdata} handleClose={setOpenFabEstPrintModal} />
                </div>
                <AlertModal
                    show={alertModal}
                    onHide={(e) => setAlertModal(e)}
                    firstbutton={fstbtnc}
                    secondbutton={secbtnc}
                    title="Assembly Details"
                    message="Assembly Details Saved"
                    firstbuttontext="Yes"
                    secondbuttontext="No"
                />
            </div >
        </>
    );
}

function RenderTree({ id, name, children, level, selectedNode, onSelectNode }) {
    return (
        <ul>
            <li style={{ fontSize: '13px', paddingLeft: `${level * 1}px`, cursor: "pointer", userSelect: "none", border: id === selectedNode ? "1px solid red" : "none" }} onClick={() => onSelectNode(id)}>{name}</li>
            {children.map(child => (
                <RenderTree {...child} level={level + 1} selectedNode={selectedNode} onSelectNode={onSelectNode} />

            ))}
        </ul>
    );
}