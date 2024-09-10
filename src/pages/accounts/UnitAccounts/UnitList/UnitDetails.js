import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
//import UnitDetailsForm from "./UnitDetailsForm";
import SharedLayout from "../../../../Layout/SharedLayout";
// import { postRequest } from "../../../api/apiinstance";
const { getRequest, postRequest } = require("../../../api/apiinstance");
const { endpoints } = require("../../../api/constants");

export default function UnitDetails() {

  let [unitdetailsdata, setUnitDetailsData] = useState([]);
  let [unitid, setUnitId] = useState("");
  let [unitname, setUnitName] = useState("");
  let [unitaddress, setUnitAddress] = useState("");
  let [unitplace, setUnitPlace] = useState("");
  let [unitcountry, setUnitCountry] = useState("");
  let [unitstate, setUnitState] = useState("");
  let [gstno, setGstNo] = useState("");
  let [selectedid, setSelectedId] = useState("");
 
  useEffect(() => {
    async function getunitdetailsdata() {
    postRequest(endpoints.showAllUnits, {}, (unitdets) => {
      setUnitDetailsData(unitdets);
    })
  }
    getunitdetailsdata();
  })


  

  let renderunittable = (unitdd,id) => {
    return (
      <tr className="custtr"  style={{ backgroundColor: selectedid === id ? "#98A8F8" : "", cursor:'pointer'}} id={id} onClick={() => selectUnit(unitdd, id)} >
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["UnitID"]}</td>
        {/* <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["UnitID"]}</td> */}
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["UnitName"]}</td>
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["Unit_Address"]}</td>
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["Place"]}</td>
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["State"]}</td>
        <td className="custtd" style={{ fontFamily: "Roboto", fontSize: "12px" }}>{unitdd["Country"]}</td>
      </tr>
    );
  };

  let selectUnit = (unitdd, id) => {
    // setBtnAsmPrtDel(false);
    // setBtnAsmPrtNew(true);
    setSelectedId(id);
    setUnitId(unitdd.unitid);
    setUnitName(unitdd.unitname);
    setUnitAddress(unitdd.unitaddress)
    setUnitPlace(unitdd.unitplace);
    setUnitState(unitdd.unitstate);
    setUnitCountry(unitdd.unitcountry);

    postRequest(endpoints.getUnitbyID, {unitid : unitdd.unitid}, (unitdata) => {
      setGstNo(unitdata.gstno);

    })
  };

  return (
    <div className="mb-5">
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Unit Details</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <h6 className="mt-1"></h6>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <button className="button-style  group-button" style={{ width: "120px" }}>
                Add Unit
              </button>
            </div>
            <div className="col-md-4 col-sm-12">
              <button className="button-style  group-button" style={{ width: "120px" }}>
                Delete Unit
              </button>
            </div>
            <div className="col-md-4 col-sm-12">
              <button className="button-style  group-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <hr  style={{
                 backgroundColor: 'black',
                             height:'3px'}}/> */}

      <div className="row">
        <div className="col-md-4 mt-2  col-sm-12">
          <div className="mb-4" style={{ height: "430px", overflowX: "scroll", overflowY: "scroll", }}>
            <Table striped className="table-data border mb-2" style={{ marginLeft: "5px", border: "1px",overflowX: "scroll", overflowY: "scroll", }}>
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Id</th>
                  <th style={{ whiteSpace: "nowrap" }}>Unit Name</th>
                  <th style={{ whiteSpace: "nowrap", width:'300px' }}>Unit Address</th>
                  <th>Place</th>
                  <th>State</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody className="tablebody">
              {unitdetailsdata != null
                  ? unitdetailsdata.map((unitdd,id) => renderunittable(unitdd,id))
                  : ""}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-8 col-sm-12">
          {/* <UnitDetailsForm /> */}
          <div>
            <div className="mt-2">
              {/* <Form className="form mt-4" > */}
              <div className="ip-box form-bg">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4 mb-2 col-sm-12">
                        <label className='form-label'>Unit Id</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitid" placeholder="Unit Id" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-5  mb-2 col-sm-12">
                        <label className='form-label'>GST No</label>
                      </div>
                      <div className="col-md-7  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="gstno" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4  mb-2 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Unit Name</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitname" placeholder="Unit Name" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-5  mb-2 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap", fontSize: '17px' }}>Tally Account Name</label>
                      </div>
                      <div className="col-md-7  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="tallyaccname" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4  mb-2 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Unit Address</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitaddress" style={{ fontSize: "13px", borderRadius: "0", width: "230px", height: "150px" }} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-5  mb-2 col-sm-12">
                        <label className='form-label'>Current</label>
                      </div>
                      <div className="col-md-7  mb-2 col-sm-12">
                        <input class="form-check-input" type="checkbox" value="" id="unitcurrent" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5  mb-2 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Cash In Hand</label>
                      </div>
                      <div className="col-md-7  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="cashinhand" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5  mb-2 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Mail Id</label>
                      </div>
                      <div className="col-md-7  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="mailid" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Unit Initials</label>
                      </div>
                      <div className="col-md-7 col-sm-12">
                        <input class="form-control" type="text" id="unitinitials" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-6  col-sm-12">
                    <div className="row">
                      <div className="col-md-4 mb-2 col-sm-12">
                        <label className='form-label'>Place</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitplace" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4  mb-2  col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Pin Code</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="number" id="unitpincode" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4  mb-2 col-sm-12">
                        <label className='form-label'>State</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitstate" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4  mb-2 col-sm-12">
                        <label className='form-label'>Country</label>
                      </div>
                      <div className="col-md-8  mb-2 col-sm-12">
                        <input class="form-control" type="text" id="unitcountry" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <label className='form-label' style={{ whiteSpace: "nowrap" }}>Contact Details</label>
                      </div>
                      <div className="col-md-8 col-sm-12">
                        <input class="form-control" type="text" id="unitcontact" style={{ fontSize: "13px", borderRadius: "0", width: "230px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
