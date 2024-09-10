import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import NCTaskTwoTabs from './NCTaskTwoTabs';
import ProgramSaveModal from './ProgramSaveModal';
import MaterialIssueModal from './MaterialIssueModal';
import DeleteModal from './DeleteModal';

export default function NcTaskForm() {

    let [bs_mtrlavailability, setBs_MtrlAvailability] = useState([]);
    const [saveProgram, setSaveProgram] = useState(false);
    const [materialIssue, setMaterialIssue] = useState(false);
    const [deleteData, setDeleteData] = useState(false);


    const materialIssueSubmit = () => {
        setMaterialIssue(true);
    }

    const saveSubmit = () => {
        setSaveProgram(true);
    }

    const deleteSubmit = () => {
        setDeleteData(true);
    }


    const renderMtrlAvailTable = (bs_mtrlavail) => {
        return (
            <tr key={bs_mtrlavail.id}>
                <td>{bs_mtrlavail.length}</td>
                <td>{bs_mtrlavail.width}</td>
                <td>{bs_mtrlavail.stock}</td>
            </tr>
        );

    }
    return (
        <div>
            {
                saveProgram &&
                <ProgramSaveModal setSaveProgram={setSaveProgram} saveProgram={saveProgram} />
            }
            {
                <MaterialIssueModal setMaterialIssue={setMaterialIssue} materialIssue={materialIssue} />
            }
            {
                <DeleteModal setDeleteData={setDeleteData} deleteData={deleteData} />
            }
            <div className=' row col-md-12 '>
                <div className='row col-md-6 '>

                    <div className=' col-md-6 '>
                        <label className='form-label col-md-3  '>Drawings</label>
                        <input class="  " type="text" placeholder=" " />
                    </div>

                    <div className=' col-md-6 '>
                        <label className='form-label col-md-3  '>Machine</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-6 mt-1'>
                        <label className='form-label col-md-3  '>Status</label>
                        <input class="" type="text" placeholder=" " />
                    </div>

                    <div className='col-md-6 mt-1'>
                        <label className='form-label col-md-3  '>Nested</label>
                        <input class="" type="text" placeholder=" " />
                    </div>
                    <div className='col-md-6 mt-1'>
                        <label className='form-label col-md-3  '>Priority</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className='col-md-6 mt-1'>
                        <label className='form-label col-md-3  '>Parts</label>
                        <input class="" type="text" placeholder=" " />
                    </div>
                    <div className=' col-md-6 mt-1'>
                        <label className='form-label col-md-3  '>Nested</label>
                        <input class=" " type="text" placeholder=" " />
                    </div>
                    <div className='col-md-6 mt-1 '>
                        <label className='form-label col-md-3 mt-1'>Select</label>
                        <select className="ip-select ">
                            <option value="option 1"> Laser2</option>
                            <option value="option 2">Name2</option>
                            <option value="option 3">Name3</option>
                        </select>
                    </div>

                    <div>
                        <button className="button-style  group-button col-md-2 mt-2 "
                            onClick={saveSubmit}    >
                            Save
                        </button>

                        <button className="button-style  group- col-md-2 mt-2"
                        >
                            Material
                        </button>
                        <button className="button-style  group-button col-md-2 mt-2"
                            onClick={deleteSubmit}
                        >
                            Delete
                        </button>

                        <button className="button-style  group- col-md-5 mt-2 "
                            onClick={materialIssueSubmit}
                        >
                            Send To Material Issue
                        </button>
                    </div>
                </div >
                <div className=' row col-md-6'>
                    <div style={{ overflowX: "scroll", overflowY: "scroll",}}>
                        <Table striped className="table-data border" >
                            <thead className="tableHeaderBGColor">
                                <tr>
                                    <th style={{ whiteSpace: "nowrap" }}>Length</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Width</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Stock</th>
                                    {/* <th style={{ whiteSpace: "nowrap" }}>Length</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Width</th>
                                    <th style={{ whiteSpace: "nowrap" }}>StockQty</th> */}

                                </tr>
                            </thead>
                            <tbody className="tablebody">
                                {(bs_mtrlavailability != null && bs_mtrlavailability.length > 0) ? bs_mtrlavailability.map((bs_mtrlavail) => renderMtrlAvailTable(bs_mtrlavail)) : ""}
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>


            <NCTaskTwoTabs />


        </div>
    );
}
