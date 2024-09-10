import React, { useEffect, useState } from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import Tables from "../../../../../../components/Tables";
import { table2data } from "./DataList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Form, Modal } from 'react-bootstrap';
import { useQuotationContext } from "../../../../../../context/QuotationContext";
import { useQuotationItemListContext } from "../../QuotationItemListContext";


const { getRequest, postRequest } = require("../../../../../api/apiinstance");
const { endpoints } = require("../../../../../api/constants");

export default function QuotationItemList() {
  let { quotation, setQuotationState } = useQuotationContext();
  let { quotationitemlist, setQuotationItemListState } = useQuotationItemListContext();
  const [taxDetailsshow, setTaxDetailsShow] = useState(false);
  const handleTaxDetails = () => setTaxDetailsShow(true);
  const handleCloseTaxDetails = () => setTaxDetailsShow(false);

  let [quotationNo, setQuotationNo] = useState("");
  let [itemname, setItemName] = useState("");
  let [material, setMaterial] = useState("");
  let [operation, setOperation] = useState("");
  let [quantity, setQuantity] = useState(0);
  let [basicPrice, setBasicPrice] = useState(0);
  let [discountAmount, setDiscountAmount] = useState(0);
  let [finalPrice, setFinalPrice] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);
  let [Gndtotal, setGndtotal] = useState(0);
  let [formtaxableamount, setTaxableamount] = useState(0);
  let [formtaxpercent, setTaxpercent] = useState("");
  let [selectedItemId, setSelectedItemId] = useState(null);
  let [format, setQtnformt] = useState("");
  let [Gsttotal, setGsttotal] = useState(0);
  let [formtaxamount, setTaxamount] = useState(0);
  let [formtaxamt, setTaxAmt] = useState(0);
  let [formtaxname, setTaxName] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [formquotationtype, setFormQuotationType] = useState("");

  let [qtntaxdata, setQtnTaxdata] = useState([]);
  let [selectedtcdata, setSelectedTCData] = useState([]);
  let [qtnMaterialData, setQtnMaterialData] = useState([]);
  let [taxesdata, setTaxesData] = useState([]);
  let [tandcdata, setTandCdata] = useState([]);
  let [qtndata, setQtndata] = useState([]);
  let [selectedRow, setSelectedRow] = useState("");
  const getHeadings = () => {
    if (qtnMaterialData != null && qtnMaterialData[0] != undefined) return Object.keys(qtnMaterialData[0]);
    return [];
  };

  const getHeadings1 = () => {
    if (qtntaxdata != null && qtntaxdata[0] != undefined) return Object.keys(qtntaxdata[0]);
    return [];
  };

  useEffect(() => {
    postRequest(endpoints.getTaxDetails, {}, (taxdat)=> {
      setTaxesData(taxdat);
    })
    // postRequest(endpoints.getTermsConditions, {}, (tcdata) => {
    //   setTandCdata(tcdata);
    //   setLoaded(true);
    // });
  })

  let addMaterialData = async () => {
    let id = qtnMaterialData.length + 1
    setFinalPrice((basicPrice - discountAmount));
    setTotalAmount((basicPrice - discountAmount) * quantity);
    let olddata = qtnMaterialData
    setTaxableamount(qtnMaterialData.totalAmount);
    Gndtotal += qtnMaterialData.totalAmount;

    let qtnno = quotation.quoteno;
    let newdata = { id, itemname, material, operation, quantity, basicPrice, discountAmount, finalPrice, totalAmount }
    olddata.push(newdata)
    setQtnMaterialData(olddata)
    console.log("Before Saving Items Data");
    postRequest(endpoints.saveQuotationItems, { ...newdata, qtnno },
      async (resp) => {
        console.log(resp);

      });
    //  Gsttotal += qtnMaterialData.taxamt;
    console.log(Gndtotal);
    console.log(qtnMaterialData);
    clearData();
  }

  let clearData = () => {
    setItemName("")
    setMaterial("")
    setOperation("")
    setQuantity(0)
    setBasicPrice(0)
    setDiscountAmount(0)
    setFinalPrice(0)
    setTotalAmount(0)
  }

  let selectedTaxes = async (e) => {
//console.log(selectedOptions);
   e.preventDefault();
   console.log(e.target.value);
    setTaxName(e.target.value);
   // setTaxpercent(selectedTaxes.Tax_Percent)

  }

  let calculateTotalTax = () => {
    let totalAmt = 0;
    qtnMaterialData.forEach((item) => {
      totalAmt += item.totalAmount;
    });
//    setTaxableamount(totalAmt);
  //  setTotalAmount(totalAmt);
    return totalAmt;
  }

  let taxdetails = (e) => {
    e.preventDefault();
    console.log("taxdetails");
    console.log(e.target.elements.taxname.value);
    let taxname = formtaxname; //e.target.elements.taxname.value;
    let taxpercent = formtaxpercent; //e.target.elements.taxpercent.value;
    let taxableamount = e.target.elements.formtaxableamount.value;
    let taxamt = ((((e.target.elements.formtaxableamount.value)) * formtaxpercent) / 100);
    // taxableamount = Gndtotal;
   // console.log(taxableamount);

console.log(taxableamount);
console.log(taxamt);

  //  let taxamt = (e.target.elements.formtaxableamount.value * formtaxpercent) / 100;
    let Gstotal = Gsttotal + taxamt;
    setGsttotal(Gstotal);

   // console.log(totalAmount);

    setTaxAmt(taxamt);
   
    setGsttotal(Gsttotal + taxamt);
    let oldtaxdata = qtntaxdata;

    let newtaxdata = { taxname, taxpercent, taxableamount, taxamt }
    oldtaxdata.push(newtaxdata)
    setQtnTaxdata(oldtaxdata)


    postRequest(endpoints.saveQtnTaxDetails, {qtntaxdata, qtnno : quotation.quoteno}, (txdata) => {
      console.log("saved taxes");
    })
//    setQtnTaxdata([...qtntaxdata, { taxname, taxpercent, taxableamount, taxamt }])
 //   setQuotationItemListState(oldtaxdata, quotation.quoteno);
    console.log(" Qtn Tax Data : " + JSON.stringify(oldtaxdata));
    formtaxname = "";
    formtaxpercent = 0;
    formtaxamt = 0;
   // setTaxDetailsShow(false);
}


  // let selectItem = (item, index) => {
  //   setItemName(item.itemname);
  //   setMaterial(item.material);
  //   setOperation(item.operation);
  //   setQuantity(item.quantity);
  //   setBasicPrice(item.basicPrice);
  //   setDiscountAmount(item.discountAmount);
  //   setFinalPrice(item.basicPrice * item.quantity);
  //   setTotalAmount((item.basicPrice * item.quantity) - item.discountAmount);

  //   Gndtotal += totalAmount;
  //   setSelectedItemId(index);
  // }

  // function getFormatTaxDetails(e) {
  //   setFormQuotationType(e.target.value);
  //   let formqtntype = document.getElementById("formquotationtype").value;
  //   setQtnformt(format);
  //   //    setQuotationType(e.target.value)
  //   console.log(formqtntype);
  //   // postRequest(endpoints.getTaxDetails, { qtype: formqtntype }, (resp) => {
  //   //   //  setLoaded2(true);
  //   //   // console.log(resp);
  //   //   // setQtnTaxdata(resp);
  //   // });

  // }

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
          toast.success("Item deleted");
        }
        else {
          toast.warning("Failed to delete Item...");
        }
        console.log(resp);
      });
      clearData();
      setSelectedRow(null);
    }
    else { toast.warning("No Item to Delete..") }
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-7 col-sm-12">
          <div
            className="table-data"
            style={{ height: "665px", overflowY: "scroll" }}
          >
            {(qtnMaterialData != null || qtnMaterialData != undefined) ?
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
              : ""}
          </div>
        </div>

        <div className="col-md-5 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">
              <div className="row">
                <div className="col-md-12 ">
                  <label className="">Item Name</label>
                  <input className="in-field" id="itemname" type="text" onChange={(e) => setItemName(e.target.value)} value={itemname} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="">Material</label>
                  <input className="in-field" type="text" id="material" value={material} onChange={(e) => setMaterial(e.target.value)} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <label className="">Operation</label>
                  <input className="in-field" type="text" id="operation" value={operation} onChange={(e) => setOperation(e.target.value)} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12 ">
                    <label className="">Quantity</label>
                    <input className="in-field" id="quantity" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-12 ">
                    <label className="">Base Price</label>
                    <input className="in-field" id="basicprice" type="text" value={basicPrice}
                      onChange={(e) => {
                        setBasicPrice(e.target.value);
                        // setFinalPrice(quantity * e.target.value);
                      }} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="col-md-12 ">
                    <label className="">Discount Amount</label>
                    <input className="in-field" id="discountamount" value={discountAmount} onChange={(e) => {
                      setDiscountAmount(e.target.value);
                      setFinalPrice(basicPrice - e.target.value);
                      setTotalAmount((quantity * basicPrice) - discountAmount);
                    }} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="col-md-12 ">
                    <label className="">Final Price</label>
                    <input className="in-field" id="finalprice" type="text" disabled value={finalPrice} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12 ">
                    <label className="">Total Amount</label>
                    <input className="in-field" type="text" id="totalamount" disabled value={totalAmount} />
                  </div>
                </div>
              </div>

            </div>

            <div className="row justify-content-center mt-2">
              <button className="button-style " style={{ width: "120px" }} onClick={addMaterialData}>
                New
              </button>
              <button className="button-style " style={{ width: "120px", marginLeft: "4px" }} onClick={() => deleteItem()}>
                Delete
              </button>
            </div>

            <div className="row justify-content-center mt-3 mb-2">
              <button className="button-style " style={{ width: "250px" }} onClick={handleTaxDetails}>
                Tax Details Click Here
              </button>
            </div>
          </div>
          <div
            className="table-data mt-2" style={{ height: "250px", overflowY: "scroll" }}>
            {(qtntaxdata != null || qtntaxdata != undefined) ?
              <Tables theadData={(getHeadings1())} tbodyData={qtntaxdata} rowClicked={(row, index) => {
              // <Tables theadData={Object.keys(qtntaxdata[0])} tbodyData={qtntaxdata} rowClicked={(row, index) => {
                  let taxname = row[index]["taxName"];
                  let taxpercent = row[index]["taxpercent"];
                  let taxableamount = row[index]["taxableamount"];
                  let taxamt = row[index]["taxamt"];
              }} />
              : ""}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12 mt-5">
          {/* Set Tax Details Modal */}
          <Modal show={taxDetailsshow}>
            <Modal.Header className="justify-content-md-center" style={{ paddingTop: '10px', backgroundColor: '#283E81', color: '#ffffff' }}>
              <Modal.Title style={{ fontSize: '18px' }}>Tax Details for Quotation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={taxdetails}>
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>Tax Name</Form.Label>
                    {/* {taxesdata.length > 0 ? ( */}
                      {/* <Typeahead
                        id="formtaxname"
                        labelKey="TaxName"
                        onChange={selectedTaxes}
                        options={taxesdata}
                        placeholder="Choose Tax Rates...">
                      </Typeahead> */}
                    {/* ) : (
                      ""
                    )} */}

                    <select className='ip-select' placeholder="Select Tax Name" onChange={(e) => selectedTaxes(e)} id="taxname">
                      <option selected disabled>Select Tax Name</option>
                      {taxesdata ? taxesdata.map((tax) => {
                        return (
                          <option style={{ fontFamily: 'Roboto', fontSize: '14px' }} value={tax["TaxName"]}>{tax["TaxName"]}</option>
                        )
                      }) : null}
                    </select>
                    {/* <Form.Control type="text" style={{ height: '30px' }} /> */}
                  </Form.Group>
                  <Form.Group controlId="formtaxpercent">
                    <Form.Label>Tax %</Form.Label>
                    <Form.Control type="float" style={{ height: '30px' }} onChange={(e) => setTaxpercent(e.target.value)} value={formtaxpercent} />

                  </Form.Group>
                  <Form.Group controlId="formtaxableamount">
                    <Form.Label>Taxable Amount</Form.Label>
                    <Form.Control type="text" style={{ height: '30px' }} disabled value={calculateTotalTax()} />
                  </Form.Group>
                  <Form.Group controlId="formtaxamt">
                    <Form.Label>Tax Amount</Form.Label>
                    <Form.Control type="text" style={{ height: '30px' }} disabled value={calculateTotalTax() * formtaxpercent / 100} />
                  </Form.Group>
                </div>
                <div className='row'>
                  <div className="col-md-6">
                    <button className="button-style " style={{ width: "120px" }} type="submit">Accept</button>
                  </div>
                  <div className="col-md-6">
                    <button className="button-style " style={{ width: "120px" }} onClick={handleCloseTaxDetails}>Close</button>
                  </div>

                </div>
              </Form>
            </Modal.Body>
          </Modal >

          {/* Set Tax Details Modal */}
        </div>
      </div>


    </div>
  )
}
