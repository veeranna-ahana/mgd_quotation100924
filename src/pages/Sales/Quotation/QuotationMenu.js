import React,{useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { TreeView, TreeItem } from "@mui/lab";
import CreateQuotationNew from './createquotation';
//import CreateQuotation from './createquotation-bkp';
import AddQuoteDetails from './addquotations';
import UpdateQuotation from './updatequotation';
import ProfileQuoteEstimatorNew from './profilequoteestimator-new';
import FabAssemblyParts from './fabassemblyparts';
import SearchQuotation from './searchquotation';
import QuotationList from './quotationlist';
import SalesMenu from '../salesmenu';
import { ConfirmationNumberRounded, Deck, Folder } from "@mui/icons-material";
import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";


function QuotationMenus() {
    let navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="main-container" style={{display:"flex",flexDirection:'row'}}>

            <div className={`${isSidebarOpen ? "sidebar sidebar_open" : "sidebar"}`}> 
                {/* logo */}
                <div className="top_section">
                    {isSidebarOpen && (
                        // <img className="logo" src={require("../ML-LOGO.png")} />
                        <h5 className="title_name" style={{color:'#c3ddeb'}}>Quotation</h5>
                    )}
                  
                    <div className="toggle-icon">
                        {isSidebarOpen ? (
                            <FaAngleLeft onClick={toggleSidebar} />
                        ) : (
                            <FaAngleRight onClick={toggleSidebar} />
                        )}
                    </div>
                </div>
        {/* <Container fluid>
            <Row>
                <Col xs={2} style={{ backgroundColor: '#999797', color: '#ffffff', height: '100%', paddingTop: '15px' }}>
                    <h6 style={{ textAlign: 'center', color: '#283E81', fontWeight: 'bold' }}>Quotations</h6>
                    <hr /> */}
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<Folder />}
                        defaultExpandIcon={<Deck />}
                        sx={{ height: '90vh'}}
                        style={{ color:'#c3ddeb' }}
                    >
                        <TreeItem nodeId="1" label="Quotation">
                            <TreeItem nodeId="2" label="New Quote" onClick={() => window.location.href = '/quotation/createquotation2?qtnformat=Profile'} />
                            <TreeItem nodeId="3" label="Find Quote" onClick={() => window.location.href = '/quotation/searchquotation?qtnformat=Profile'} />
                            {/* <TreeItem nodeId="3" label="Find Quote" onClick={() => navigate('./searchquotation')} /> */}
                            <TreeItem nodeId="4" label="Quote List" >
                                <TreeItem nodeId="5" label="To Send" onClick={() => window.location.href = '/quotation/quotationlisttosend?qtnliststat=To Send&qtnstatus=Created&qtnformat=Profile'} />
                                <TreeItem nodeId="6" label="Sent" onClick={() => window.location.href = '/quotation/quotationlistsent?qtnliststat=Sent&qtnstatus=Qtn Sent&qtnformat=Profile'} />
                                <TreeItem nodeId="7" label="No Order" onClick={() => window.location.href = '/quotation/quotationlistnoorder?qtnliststat=No Order&qtnstatus=No Order&qtnformat=Profile'} />
                                <TreeItem nodeId="8" label="Order" onClick={() => window.location.href = '/quotation/quotationlistorder?qtnliststat=Order&qtnstatus=Order Received&qtnformat=Profile'} />
                                <TreeItem nodeId="9" label="Closed" onClick={() => window.location.href = '/quotation/quotationlistclosed?qtnliststat=Closed&qtnstatus=Closed&qtnformat=Profile'} />
                            </TreeItem>
                            {/* <TreeItem nodeId="10" label="Reports" /> */}
                        </TreeItem>
                        <TreeItem nodeId="11" label="Service">
                            <TreeItem nodeId="12" label="New Quote" onClick={() => window.location.href = '/quotation/createquotation2?qtnformat=Service'} />
                            <TreeItem nodeId="13" label="Find Quote" onClick={() => window.location.href = '/quotation/searchquotation?qtnformat=Service'} />
                            <TreeItem nodeId="14" label="Quote List" >
                                <TreeItem nodeId="15" label="To Send" onClick={() => window.location.href = './quotationlisttosend?qtnstatus=Created&qtnformat=Service'} />
                                <TreeItem nodeId="16" label="Sent" onClick={() => window.location.href = './quotationlistsent?qtnstatus=Qtn Sent&qtnformat=Service'} />
                                <TreeItem nodeId="17" label="No Order" onClick={() => window.location.href = './quotationlistnoorder?qtnstatus=No Order&qtnformat=Service'} />
                                <TreeItem nodeId="18" label="Order" onClick={() => window.location.href = './quotationlistorder?qtnstatus=Order Received&qtnformat=Service'} />
                                <TreeItem nodeId="19" label="Closed" onClick={() => window.location.href = './quotationlistclosed?qtnstatus=Closed&qtnformat=Service'} />
                            </TreeItem>
                        </TreeItem>
                        <TreeItem nodeId="20" label="Fabrication" >
                            <TreeItem nodeId="21" label="New Quote" onClick={() => window.location.href = '/quotation/createquotation2?qtnformat=Fabrication'} />
                            <TreeItem nodeId="22" label="Find Quote" onClick={() => window.location.href = '/quotation/searchquotation?qtnformat=Fabrication'} />
                            <TreeItem nodeId="23" label="Quote List">
                                <TreeItem nodeId="24" label="To Send" onClick={() => window.location.href = './quotationlisttosend?qtnstatus=Created&qtnformat=Fabrication'} />
                                <TreeItem nodeId="25" label="Sent" onClick={() => window.location.href = './quotationlistsent?qtnstatus=Qtn Sent&qtnformat=Fabrication'} />
                                <TreeItem nodeId="26" label="No Order" onClick={() => window.location.href = './quotationlistnoorder?qtnstatus=No Order&qtnformat=Fabrication'} />
                                <TreeItem nodeId="27" label="Order" onClick={() => window.location.href = './quotationlistorder?qtnstatus=Order Received&qtnformat=Fabrication'} />
                                <TreeItem nodeId="28" label="Closed" onClick={() => window.location.href = './quotationlistclosed?qtnstatus=Closed&qtnformat=Fabrication'} />

                            </TreeItem>
                        </TreeItem>
                        <TreeItem nodeId="24" label="Previous Menu" onClick={() => navigate('../sales')} />
                    </TreeView>
                </div>
                <div style={{width:'100%'}}>
                    <div style={{ maxHeight: '90vh' }}>

                        <Routes>
                            {/* <Route exact path="/createquotation" element={<CreateQuotation />} /> */}
                            <Route exact path="/createquotation2" element={<CreateQuotationNew />} />
                            <Route exact path="/addquotations" element={<AddQuoteDetails />} />
                            <Route exact path="/updatequotation" element={<UpdateQuotation />} />
                            <Route exact path="/profilequoteestimator2" element={<ProfileQuoteEstimatorNew />} />
                            <Route exact path="/fabassemblyparts" element={<FabAssemblyParts />} />
                            <Route exact path="/searchquotation" element={<SearchQuotation />} />
                            <Route exact path="/quotationlisttosend" element={<QuotationList />} />
                            <Route exact path="/quotationlistsent" element={<QuotationList />} />
                            <Route exact path="/quotationlistnoorder" element={<QuotationList />} />
                            <Route exact path="/quotationlistorder" element={<QuotationList />} />
                            <Route exact path="/quotationlistclosed" element={<QuotationList />} />

                            <Route exact path="/sales" element={<SalesMenu />} />
                            {/* "./createcustomer" element={<CreateCustomer />} /> */}
                            {/* <Route exact path="./addcustomerdetails" element={<AddCustomerDetails />} />
                                <Route exact path="./addcustomerpartlist" element={<CustPartListPage />} /> */}
                        </Routes>



                        {/* <h1>Customer Menus</h1> */}
                    </div>
                </div>

            </div>
        // </Container>

    )
}

export default QuotationMenus;