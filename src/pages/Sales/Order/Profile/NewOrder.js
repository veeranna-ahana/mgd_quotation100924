import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useOrderContext } from "../../../../context/OrderContext";
import { BsChevronCompactLeft } from "react-icons/bs";


const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

function NewOrder() {

  const [searchParams] = useSearchParams();
  
  let navigate = useNavigate();
  let { orders, setOrderState } = useOrderContext();
  let [orderno, setOrderno] = useState("");

  let [formPaymentTerms, setFormPaymentTerms] = useState("");
  let [salesExecdata, setSalesExecdata] = useState([]);
  //let [selectCust, setSelectCust] = useState("");
  let [custdata, setCustdata] = useState([]);
  let [statesdata, setStatesdata] = useState([]);
  let [creditTermsdata, setCreditTermsdata] = useState([]);
  let [qtnnossentdata, setQtnNosSentData] = useState([]);
  let [selectedqtnno, setSelectedqtnno] = useState([]);

  let [quotationNo, setQuotationNo] = useState("");
  let [CustomerName, setCustomerName] = useState("");
  let [CustCode, setCustCode] = useState("");
  let [formOrderDate, setFormOrderDate] = useState("");
  let [CustomerContact, setCustomerContact] = useState("");
  let [GSTIN, setGSTIN] = useState("");
  let [formBillingAddress, setFormBillingAddress] = useState("");
  let [formSpecialInstructions, setFormSpecialInstructions] = useState("");
  let [formBillingState, setFormBillingState] = useState("");
  let [formMagodDelivery, setFormMagodDelivery] = useState("");
  let [formShippingAddress, setFormShippingAddress] = useState("");
  let [formGSTTaxState, setFormGSTTaxState] = useState("");
  let [formTransportCharges, setFormTransportCharges] = useState("");
  let [formquotationNo, setFormQuotationNo] = useState("");

  let Oformat = searchParams.get("ordformat");

  console.log(" Order Type : "+Oformat);

  useEffect(() => {
    setFormOrderDate(new Date().toISOString().slice(0, 10));


    async function fetchData() {
      await postRequest(endpoints.getCustomers, {}, (cdata) => {
        setCustdata(cdata);
      });

      await postRequest(endpoints.getSalesExecLists, {}, (sdata) => {
        console.log(sdata);
        setSalesExecdata(sdata);
      });
      await postRequest(endpoints.getStates, {}, (sdata) => {
        setStatesdata(sdata);
      });
      await postRequest(endpoints.getCreditTerms, {}, (tcdata) => {
        setCreditTermsdata(tcdata);
        //        setLoaded(true);
      });

      await postRequest(endpoints.getQuoteNosSent, { ordtype: Oformat }, (qtnsentdata) => {
        console.log(qtnsentdata);
        setQtnNosSentData(qtnsentdata);
      })
    }
    fetchData();
  }, []);


  let selectQtns = (selectedqtnno) => {
    console.log(selectedqtnno)
    if (selectedqtnno.length == 0 || selectedqtnno[0].QtnID == undefined) return;
    setQuotationNo(selectedqtnno[0].QtnNo);
    setFormQuotationNo(selectedqtnno[0].QtnNo);
  }

  let handleInputChange = (input) => {
    selectedqtnno = input;
    //console.log(input,e.target.value);
}

  let selectCust = async (e) => {
    let cust;
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i]["Cust_Code"] === e[0].Cust_Code) {
        cust = custdata[i];
        break;
      }
    }
    console.log(cust);
    setCustCode(cust.Cust_Code);
    setCustomerContact(cust.PurchaseContact1 ? cust.PurchaseContact1 : cust.PurchaseContact2 ? cust.PurchaseContact2 : "");
    setFormPaymentTerms(cust.CreditTerms);
    setGSTIN(cust.GSTNo);
    setFormBillingAddress(cust.Address);
    setFormBillingState(cust.State);
    setFormGSTTaxState(cust.State);
    //console.log(CustomerName);
    //setCustCode(e.target.value);
    //  setCustomerName(e.target.elements.Cust_name.value);
    for (let i = 0; i < custdata.length; i++) {
      if (custdata[i].Cust_Code == e[0].Cust_Code) {
        document.getElementById("formPaymentTerms").value = cust.CreditTerms;
        document.getElementById("formBillingAddress").value = cust.Address;
        document.getElementById("formGSTNNo").value = cust.GSTNo;
        document.getElementById("formBillingState").value = cust.State;
        document.getElementById("formGSTTaxState").value = cust.State;
        break;
      }
    }
  }

  async function SaveOrder(e) {
    e.preventDefault();
    console.log("Save Order");
    let ordertype = e.target.elements.formOrderType.value;
    console.log(ordertype)
    let purchaseorder = e.target.elements.formPurchaseOrderNo.value;
    let qtnno = formquotationNo;
    let deldate = e.target.elements.formDeliveryDate.value;
    console.log(deldate);
    let deliverydate = deldate;

    let paymentterms = e.target.elements.formPaymentTerms.value;
    let salesContact = e.target.elements.formSalesContact.value;
    //let customername = e.target.elements.CustomerName.value;
    // postRequest(endpoints.getCustomerDets, { CustomerName }, (data) => {
    //   setCustCode(data.Cust_code);
    //   setCustomerContact(data.Cust_contact);
    //   setGSTIN(data.GSTIN);
    // });
    //let custcode = CustCode;
    //console.log(custcode);
    //let customer = ''; //CustomerName; // e.target.elements.CustName.value;
    // postRequest(endpoints.getCustomerDets, { custcode }, (data) => {
    //   customer = data.Cust_name;
    // })
    //console.log(customer);
    //  let CustomerContact = e.target.elements.formCustomerContact.value;
    let receivedby = e.target.elements.formReceivedBy.value;
    let RecordedBy = e.target.elements.formRecordedBy.value;
    // let gstin = e.target.elements.formGSTNNo.value;
    let DealingEngineer = e.target.elements.formDealingEngineer.value;
    let DeliveryMode = e.target.elements.formDeliveryMode.value;
    let billingAddress = e.target.elements.formBillingAddress.value;
    let SpecialInstructions = e.target.elements.formSpecialInstructions.value;
    let BillingState = e.target.elements.formBillingState.value;
    let MagodDelivery = e.target.elements.formMagodDelivery.value;
    let shippingAddress = e.target.elements.formShippingAddress.value;
    let GSTTaxState = e.target.elements.formGSTTaxState.value;
    let Transportcharges = e.target.elements.formTransportCharges.value;

    console.log("Entering API Call");
    await postRequest(endpoints.saveCreateOrder, {
      ordertype, purchaseorder, qtnno, deliverydate, paymentterms, salesContact, CustCode,
      CustomerContact, receivedby, RecordedBy, GSTIN, DealingEngineer, DeliveryMode, billingAddress, SpecialInstructions, BillingState,
      MagodDelivery, shippingAddress, GSTTaxState, Transportcharges
    }, async (resp) => {
      console.log(resp)
      setOrderno(resp.orderno);
      // postRequest(endpoints.getCustomerDets, { CustCode }, (custdata) => {
      //   console.log(custdata[0]["Cust_name"]
      //   setCustomerName(custdata[0]["Cust_name"]);
      // })
      console.log(CustCode)
      console.log(CustomerName)
      let orders = {
        orderno: resp.orderno,
        ordertype: ordertype,
        purchaseorder: purchaseorder,
        paymentterms: paymentterms,
        qtnno: qtnno,
        deliverydate: deliverydate,
        salesContact: salesContact,
        custcode: CustCode,
        customer: CustomerName, // customer
        CustomerContact: CustomerContact,
        receivedby: receivedby,
        RecordedBy: RecordedBy,
        DealingEngineer: DealingEngineer,
        DeliveryMode: DeliveryMode,
        MagodDelivery: MagodDelivery,

        Transportcharges: Transportcharges,
      }
      await setOrderState(orders);
      //   localStorage.setItem("LazerOrder", JSON.stringify(orderno,customer))
      let Ordno = (resp.orderno);
      console.log(resp.orderno);
      console.log(orders.ordertype);
      toast.success('Order Created with ' + Ordno, { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER })
      if (Ordno != null) {
        navigate("/order/ScheduleCreation");
      } else {
        toast.error('Order Not Created', { autoClose: 1000 }, { position: toast.POSITION.TOP_CENTER })
      }
    });
  }

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Sales Department</h4>
        </div>
      </div>
      <h5 className="mt-2">
        <b>Sales Manager  - </b>
        <b>New Order Entry Form: Profile</b>
      </h5>

      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      <Form className="form mt-3" onSubmit={SaveOrder}>
        <div className="col-md-12" style={{ display: "flex" }}>
          <h9 className="mt-2" style={{ flex: 1 }} ><b>New Order</b></h9>
          <button className="button-style  group-button " style={{ flex: '0.2', width: "120px" }} type="submit">Save Order</button>
        </div>


        <div className="ip-box form-bg">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Order No</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input type="text" id="orderno" disabled value={orderno} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">PO No</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="formPurchaseOrderNo" type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Order Date</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="formOrderDate" type="date" value={formOrderDate} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Quotation No</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  {qtnnossentdata.length > 0 ? (
                    <Typeahead
                      id="basic-example"
                      labelKey="QtnNo"
                      onChange={selectQtns}
                      onInputChange={handleInputChange}
                      options={qtnnossentdata}
                      placeholder="Choose Quotation...">
                    </Typeahead>
                  ) : (
                    ""
                  )}

                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Order Type</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select id="formOrderType" className="ip-select">
                    <option value="">Select Order Type</option>
                    <option value="Complete">Complete</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Open">Open</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Delivery Date</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="formDeliveryDate" type="date" />
                  {" "}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Payment Terms</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="formPaymentTerms" type="text" disabled value={formPaymentTerms} />

                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Sales Contact</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className='ip-select' id="formSalesContact" >
                    <option>Select Sales Contact</option>
                    {salesExecdata.map((sdata) => {
                      return (
                        <option value={sdata["ID"]}>{sdata["Name"]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Customer Name</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  {/* <input className="ip-select" type="text" id="customername" onChange={(e) => setCustomerName(e.target.value)} value={CustomerName} /> */}
                  {custdata.length > 0 ? (
                    <Typeahead id="basic-example" labelKey="Cust_name" onChange={selectCust} options={custdata} placeholder="Choose a Customer...">
                    </Typeahead>
                  ) : (
                    ""
                  )}


                  {/* <select className='ip-select' type="text" id="formCustomerName" onChange={selectCust}>
                    <option>Select Customer</option>
                    {custdata.map((cust) => {
                      return (
                        <option value={cust["Cust_Code"]}>{cust["Cust_name"]}</option>
                      )
                    })}
                  </select> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Received By</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className='ip-select' id="formReceivedBy" >
                    <option>*** Select ***</option>
                    {salesExecdata.map((sdata) => {
                      return (
                        <option value={sdata["ID"]}>{sdata["Name"]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Contact Name</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="CustomerContact" type="text" onChange={(e) => setCustomerContact(e.target.value)} value={CustomerContact} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Recorded By</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className='ip-select' id="formRecordedBy" >
                    <option>*** Select ***</option>
                    {salesExecdata.map((sdata) => {
                      return (
                        <option value={sdata["ID"]}>{sdata["Name"]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">GST No</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <input id="formGSTNNo" disabled type="text" value={GSTIN} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Dealing Engineer</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className='ip-select' id="formDealingEngineer" >
                    <option>*** Select ***</option>
                    {salesExecdata.map((sdata) => {
                      return (
                        <option value={sdata["ID"]}>{sdata["Name"]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Billing Address</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <textarea id="formBillingAddress" type="text" onChange={(e) => setFormBillingAddress(e.target.value)} value={formBillingAddress}
                    style={{
                      borderRadius: "0",
                      height: "120px",
                      width: "387px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Special Instructions</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <textarea id="formSpecialInstructions" type="text" onChange={(e) => setFormSpecialInstructions(e.target.value)} value={formSpecialInstructions}
                    style={{
                      borderRadius: "0",
                      height: "120px",
                      width: "387px",
                    }}
                  />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-2 col-sm-12">
                  <label className="form-label">Billing State</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className='ip-select' id="formBillingState">
                    <option>Select State</option>
                    {statesdata.map((stat) => {
                      return (
                        <option value={stat["Id"]}>{stat["State"]}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">GST Tax State</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select className="ip-select" id="formGSTTaxState">
                    <option>Select State</option>
                    {statesdata.map((stat) => {
                      return (
                        <option value={stat["Id"]}>{stat["State"]}</option>
                      )
                    })}

                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4 mb-4 col-sm-12">
                  <label className="form-label">Shipping Address</label>
                </div>
                <div className="col-md-8  mb-4 col-sm-12">
                  <textarea id="formShippingAddress" type="text" placeholder="EX Factory" onChange={(e) => setFormShippingAddress(e.target.value)} value={formShippingAddress}
                    style={{
                      borderRadius: "0",
                      height: "120px",
                      width: "387px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Delivery Mode</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select id="formDeliveryMode" className="ip-select">
                    <option value="">Select Delivery Mode</option>
                    <option value="By Lorry">By Lorry</option>
                    <option value="By Courier">By Courier</option>
                    <option value="By Air Cargo">By Air Cargo</option>
                    <option value="By Ship">By Ship</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4  mb-2 col-sm-12">
                  <label className="form-label">Transport Charges</label>
                </div>
                <div className="col-md-8  mb-2 col-sm-12">
                  <select id="formTransportCharges" className="ip-select">
                    <option value=""> Select </option>
                    <option value="Customer Account">Customer Account</option>
                    <option value="Magod Account">Magod Account</option>
                  </select>

                  {/* <input id="formTransportCharges" type="text" placeholder="Enter Transport Charges" /> */}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-4 col-sm-12">
                  <label className="form-label">Magod Delivery</label>
                </div>
                <div className="col-md-8  mb-4 col-sm-12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="formMagodDelivery"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default NewOrder;