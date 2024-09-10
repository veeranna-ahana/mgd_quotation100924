import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import WithNav from "./Layout/WithNav";
import Customer from "./customer/Customer";
import CustomerInfo from "./pages/Sales/Customer/Customer/CustomerInfo";
import CustomerNew from "./pages/Sales/Customer/Customer/CustomerNew";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import DrawingList from "./pages/Sales/Customer/DrawingList/DrawingList";
import Material from "./pages/Sales/Customer/Material/Material";
import Order from "./pages/Sales/Customer/Orders/Order";
//import NewQuote from "./pages/Sales/Quotation/Quotations/Quotation"
import PartList from "./pages/Sales/Customer/PartList/PartList";
import Commercial from "./pages/Sales/Customer/Commercial/Outstanding_summary/Commercial";
import Custinvandpayments from "./pages/Sales/Customer/Commercial/Invoices_and_payments/Custinvandpayments";

import { QuotationProvider } from './context/QuotationContext';
import { OrderProvider } from './context/OrderContext';
import { QuotationItemListProvider } from "./pages/Sales/Quotation/Quotations/QuotationItemListContext";
import { QuotationTandCProvider } from "./pages/Sales/Quotation/Quotations/QuotationTandCContext";

// import Mapping from "./pages/Admin/Access/Mapping";
// import MenuRole from "./pages/Admin/Access/MenuRole";
// import Menus from "./pages/Admin/Users/Menus";
// import Roles from "./pages/Admin/Users/Roles";
// import Users from "./pages/Admin/Users/Users";
// import Quotation from "./pages/Quotation/Quotations/Quotation";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import HomeOne from "./pages/HomeOne";

import Quotation from "./pages/Sales/Quotation/CreateNewQuotation";
import GetQuotationForm from "./pages/Sales/Quotation/Quotations/FindQuote/GetQuotationForm";
import FindQuoteOpen from "./pages/Sales/Quotation/Quotations/FindQuote/FindQuoteOpen";
import QuoteList from "./pages/Sales/Quotation/Quotations/QuoteList/QuoteList";
import Adddetails from "./pages/Sales/Quotation/Quotations/AddDetails/Adddetails";
import RateEstimator from "./pages/Sales/Quotation/Quotations/AddDetails/RateEstimator/RateEstimator";
import QtnFabrication from "./pages/Sales/Quotation/Quotations/AddDetails/RateEstimator/FabricationAssmDisAggregator";
import UpdRateEstimator from "./pages/Sales/Quotation/Quotations/AddDetails/RateEstimator/UpdateRateEstimator";
// import PrintEstimate from "./pages/Sales/Quotation/Quotations/Print Quote/PrintEstimate";

import UnitDetails from "./pages/accounts/UnitAccounts/UnitList/UnitDetails";


import ShowInvoice from "./pages/Sales/Customer/Commercial/Invoices_and_payments/Components/ShowInvoice";
import Menu from "./pages/Packing&Invoicing/Menu/Menu";
import InspServiceScheduleList from "./pages/Packing&Invoicing/Menu/Inspection/Service/InspServiceScheduleList";
import InspServiceFindSchedule from "./pages/Packing&Invoicing/Menu/Inspection/Service/InspServiceFindSchedule";
import InspProfileFindSchedule from "./pages/Packing&Invoicing/Menu/Inspection/Profile/InspProfileFindSchedule";
import InspProfileScheduleList from "./pages/Packing&Invoicing/Menu/Inspection/Profile/InspProfileScheduleList";
import InspFabricationFindSchedule from "./pages/Packing&Invoicing/Menu/Inspection/Fabrication/InspFabricationFindSchedule";
import InspFabricationScheduleList from "./pages/Packing&Invoicing/Menu/Inspection/Fabrication/InspFabricationScheduleList";
import InternalRejectionForm from "./pages/Packing&Invoicing/Menu/Inspection/Components/InternalRejectionForm";
import ExistedCustomerInfo from "./pages/Sales/Customer/Customer/ExistedCustomerInfo";
import UserRolesModules from "./pages/admin/userrolesmodules";
import CreateUsers from "./pages/admin/createusers";
import MenuRoleMapping from "./pages/admin/menurolemapping";
import SendMail from "./pages/sendmail/sendmails";

import NewOrder from "./pages/Sales/Order/Profile/NewOrder";
import ScheduleCreation from "./pages/Sales/Order/Profile/ScheduleCreationForm";

//import PrintServiceQtn from "./pages/Sales/Quotation/Quotations/Print Quote/PrintServiceQtn";
import PrintServiceQuotation from "./pages/Sales/Quotation/Quotations/Print Quote/Quotation/Service/ServicePrintQuotation";
import PrintProfileQuotation from "./pages/Sales/Quotation/Quotations/Print Quote/Quotation/Profile/ProfilePrintQuotation";
import PrintEstimate from "./pages/Sales/Quotation/Quotations/Print Quote/Estimation/Estimate/PrintEstimate";

import SigmaNc from "./pages/SigmaNC/SigmaNC"; 
//import SigmaForm from "./pages/SigmaNC/ToProgram/SigmaForm";
import ProcessingSigmaForm from "./pages/SigmaNC/Processing/ProcessingSigmaForm";
import RateEstimatorContext, { RateEstimatorProvider } from "./context/RateEstimatorContext";
//import TaskedSigmaForm from "./pages/SigmaNC/Processing/ProcessingSigmaForm";
//import UnderProdForm from "./pages/SigmaNC/UnderProduction/UnderProdForm";
//import ClosedForm from "./pages/SigmaNC/Close/ClosedForm";

// import { QuotationTandCProvider } from "./pages/Sales/Quotation/Quotations/QuotationTandCContext";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <QuotationProvider>
        <QuotationItemListProvider>
          <QuotationTandCProvider>
            <OrderProvider>
              <RateEstimatorProvider>
              <Routes>
                <Route element={<Login />} path="/" />

                <Route path="/home" element={<Home />} />
                <Route path="/salesHome" element={<HomeOne />} />
                <Route path="/accounts" element={<Home />} />

                <Route element={<WithNav />}>
                  {/* <Route path="adminpage" element={<AdminPage />} /> */}
                  {/* <Route element={<TestComp />} path='/admin' /> */}
                  <Route exact path="/mailer" element={<SendMail />} />

                  <Route path="/Customer" element={<Parentroute />}>
                    <Route path="CustomerInfo" element={<CustomerInfo />} />
                    <Route
                      path="ExistedCustomerInfo"
                      element={<ExistedCustomerInfo />}
                    />
                    <Route path="CustomerNew" element={<CustomerNew />} />

                    {/* <Route path="commercial" element={<Commercial />} /> */}
                    <Route path="Outstandings" element={<Commercial />} />
                    {/* <Route path="custinvandpayments" element={<Custinvandpayments />} /> */}

                    <Route path="CustomerInvoiceAndPayments">
                      <Route index={true} element={<Custinvandpayments />} />
                      <Route path="showinvoice" element={<ShowInvoice />} />
                    </Route>

                    <Route path="DrawingList" element={<DrawingList />} />
                    <Route path="Material" element={<Material />} />
                    <Route path="Orders">
                      {/* <Route index={true} element={<Order />} /> */}
                      <Route path="OrdersCreated" element={<Order />} />
                      <Route path="OrdersRecorded" element={<Order />} />
                      <Route path="OrdersProcessing" element={<Order />} />
                      <Route path="OrdersProduced" element={<Order />} />
                      <Route path="OrdersReady" element={<Order />} />
                      <Route path="OrdersDispatched" element={<Order />} />
                      <Route path="OrdersAll" element={<Order />} />
                    </Route>

                    <Route path="PartList" element={<PartList />} />
                  </Route>

                  <Route path="/admin" element={<Parentroute />}>
                    <Route index={true} />
                    <Route path="roles" element={<UserRolesModules />} />

                    <Route path="mapping" element={<MenuRoleMapping />} />
                    {/* <Route path="menuRoles" element={<MenuRoleMapping />} /> */}
                    {/* <Route path="menus" element={<Menus />} /> */}
                    <Route path="users" element={<CreateUsers />} />
                  </Route>

                  <Route path="/quotation" element={<Parentroute />}>
                    {/* <Route path="quotation" element={<Quotation />}> */}
                    <Route index={true} />
                    <Route path="addDetails" element={<Adddetails />} />
                    <Route path="RateEstimator" element={<RateEstimator />} />
                    <Route path="qtnfabrication" element={<QtnFabrication />} />
                    <Route path="/quotation/*" element={<Quotation />} />
                    <Route path="GetQuotationForm" element={<GetQuotationForm />} />
                    <Route path="FindQuoteOpen" element={<FindQuoteOpen />} />
                    <Route path="QuoteList" element={<QuoteList />} />
                    <Route path="updrateestimator" element={<UpdRateEstimator />} />
                    <Route path="PrintServiceQuotation" element={<PrintServiceQuotation />} />
                    <Route path="PrintProfileQuotation" element={<PrintProfileQuotation />} />
                    <Route path="PrintEstimate" element={<PrintEstimate />} />
                    {/* <Route path="PrintServiceQtn" element={<PrintServiceQtn />} /> */}
                    {/* <Route path="printestimate" element={<PrintEstimate />} /> */}
                    {/* </Route> */}
                    {/* <Route path="service" element={<MenuRole />} /> */}
                    {/* <Route path="fabrication" element={<Menus />} /> */}
                  </Route>

                  {/* Orders */}

                  <Route path="/order" element={<Parentroute />}>
                    <Route index={true} />
                    <Route path="NewOrder" element={<NewOrder />} />
                    <Route path="ScheduleCreation" element={<ScheduleCreation />} />
                    {/* <Route path="rateestimator" element={<RateEstimator />} />
                  <Route path="qtnfabrication" element={<QtnFabrication/>} />
                  <Route path="/quotation/*" element={<Quotation />} />
                  <Route path="GetQuotationForm" element={<GetQuotationForm />} />
                  <Route path="FindQuoteOpen" element={<FindQuoteOpen />} />
                  <Route path="QuoteList" element={<QuoteList />} /> */}
                    {/* </Route> */}
                    {/* <Route path="service" element={<MenuRole />} /> */}
                    {/* <Route path="fabrication" element={<Menus />} /> */}
                  </Route>

                  {/* Accounts */}

                  <Route path="/accounts" element={<Parentroute />}>
                    <Route index={true} />
                    <Route path="unitdetails" element={<UnitDetails />} />
                    {/* <Route path="unitlist" element={<UnitDetails />} /> */}
                    {/* <Route path="rateestimator" element={<RateEstimator />} /> */}
                    {/* </Route> */}
                    {/* <Route path="service" element={<MenuRole />} /> */}
                    {/* <Route path="fabrication" element={<Menus />} /> */}
                  </Route>

                  <Route path="sigmaNc"  element={<Parentroute />}>
                    <Route index={true} element={<SigmaNc />} />
                    {/* <Route path="ToProgram" element={<SigmaForm />} /> */}
                    <Route path="ToProgram" element={<ProcessingSigmaForm />} />
                     <Route path="Process" element={<ProcessingSigmaForm />} />
                     <Route path="Task" element={<ProcessingSigmaForm />} />
                     <Route path="UnderProduction" element={<ProcessingSigmaForm />} />
                     <Route path="Close" element={<ProcessingSigmaForm />} />
                   {/* <Route path="UnderProduction" element={<UnderProdForm />} />
                    <Route path="Close" element={<ClosedForm />} /> */}

                  </Route> 

                  <Route path="/PackingAndInvoices" element={<Parentroute />}>
                    {/* <Route path="menu"> */}
                    <Route index={true} />
                    <Route path="Profile">
                      <Route
                        path="FindSchedule"
                        element={<InspProfileFindSchedule />}
                      />
                      <Route
                        path="ScheduleList"
                        element={<InspProfileScheduleList />}
                      />
                    </Route>
                    <Route path="Fabrication">
                      <Route
                        path="FindSchedule"
                        element={<InspFabricationFindSchedule />}
                      />
                      <Route
                        path="ScheduleList"
                        element={<InspFabricationScheduleList />}
                      />
                    </Route>
                    <Route path="Service">
                      <Route path="FindSchedule">
                        <Route index={true} element={<InspServiceFindSchedule />} />

                        <Route path="RejectParts" element={<InternalRejectionForm />} />
                      </Route>
                      <Route
                        path="ScheduleList"
                        element={<InspServiceScheduleList />}
                      />
                    </Route>
                    {/* </Route> */}
                  </Route>
                </Route>
              </Routes>
              </RateEstimatorProvider>
            </OrderProvider>
          </QuotationTandCProvider>
        </QuotationItemListProvider>
      </QuotationProvider>
    </BrowserRouter >
  );
}

export default App;