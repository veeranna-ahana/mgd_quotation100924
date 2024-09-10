import React from 'react'

export default function Details() {
  return (
    <div>
      <h6>Profile Details</h6>
      <div className='row mt-4'>
        <div className='col'>
        <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Dwg/PartName</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div
              className="col-md-12 mt-3"
              style={{ display: "flex", gap: "40px" }}
            >
              <label className="form-label" style={{ paddingRight: "4px" }}>
                {" "}
                Laser Cutting
              </label>
              <input className="form-check-input mt-2" type="radio" />
            </div>
      </div>

      <div className='row'>
      <div className="col-md-12 mb-2">
            <label className="form-label">Operation</label>
            <select className="ip-select">
              <option value="option 1"> A A Industries</option>
              <option value="option 1">Test Industries</option>
              <option value="option 1">Ahana Systems and solutions</option>
            </select>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Quantity</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12 mb-2">
            <label className="form-label">Mtrl Code</label>
            <select className="ip-select">
              <option value="option 1"> A A Industries</option>
              <option value="option 1">Test Industries</option>
              <option value="option 1">Ahana Systems and solutions</option>
            </select>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Material</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Grade</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Thickness</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12 mb-2">
            <label className="form-label">Tolerence</label>
            <select className="ip-select">
              <option value="option 1"> A A Industries</option>
              <option value="option 1">Test Industries</option>
              <option value="option 1">Ahana Systems and solutions</option>
            </select>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12 mb-2">
            <label className="form-label">Impection Level</label>
            <select className="ip-select">
              <option value="option 1"> A A Industries</option>
              <option value="option 1">Test Industries</option>
              <option value="option 1">Ahana Systems and solutions</option>
            </select>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">LOC</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">NOof Pieces</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">JN Cost</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Material Cost</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>

      <div className='row'>
      <div className="col-md-12">
            <label className="form-label">Unit Rate</label>
            <input style={{marginTop:"-5px"}}/>
          </div>
      </div>
        </div>

        <div className='col ms-5'>
        <div className='row'>
      <button
            className="button-style mt-4 group-button "
            style={{ width: "150px" }} 
          >
           Add New
          </button>
      </div>

      <div className='row'>
      <button
            className="button-style mt-4 group-button "
            style={{ width: "150px" }} 
          >
            Save
          </button>
      </div>

      <div className='row'>
      <button
            className="button-style mt-4 group-button "
            style={{ width: "150px" }} 
          >
            Delete Profile
          </button>
      </div>
        </div>

      </div>
      </div>
  )
}
