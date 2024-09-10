import React from 'react';
import { Table } from 'react-bootstrap';

export default function NcProgramsForm() {
    return (
        <div>
            <div className=' row col-md-12 '>
                <div className='row col-md-12 '>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Program No</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '>Process</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-4'>
                        <label className='form-label col-md-3  '>LOC</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>


                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '>Priority</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Task No</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Material Source</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '>Pierces</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '  >Status</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-4'>
                        <label className='form-label col-md-3  '  >Machine</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '>Para1</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Estimated Time</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className='col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Material </label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  '>Para2</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Dwgs</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className='col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Machine </label>
                        <input class="  " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Sheets</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className='col-md-4 '>
                        <label className='form-label col-md-3  ' style={{ whiteSpace: 'nowrap' }}>Parts </label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=" col-md-4">

                        <label className="form-label">Remarks</label>

                        <textarea className="form-control sticky-top" rows='2' id="" style={{ height: '100px', resize: 'none' }}></textarea>

                    </div>

                </div >



                <div className=' row col-md-12 mt-2'>
                    <div style={{

                        height: '350px',
                        overflowX: "scroll",
                        overflowY: "scroll",

                    }}
                    >
                        <Table
                            striped
                            className="table-data border"

                        >
                            <thead className="tableHeaderBGColor">
                                <tr>
                                    <th style={{ whiteSpace: "nowrap" }}>Dwg Name</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Qty Nested</th>
                                    <th style={{ whiteSpace: "nowrap" }}>TotQtyNested</th>

                                </tr>
                            </thead>
                            <tbody className="tablebody">



                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        </div>
    );
}
