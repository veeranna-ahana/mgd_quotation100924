import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AcceptModal from './AcceptModal';


export default function TaskRateModal({openTaskRate,setOpenTaskRate}) {
const handleClose=()=>{
    setOpenTaskRate(false);   
}

const[openAccept,setOpenAccept]=useState('')
const onClickAccept=()=>{
    setOpenAccept(true);
    handleClose();
}

  return (
    <div>
        <AcceptModal
        openAccept={openAccept}
        setOpenAccept={setOpenAccept}
        />

        <Modal show={openTaskRate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quotation Rate Input</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div className="col-md-12 col-sm-12">
          <div >
            <div className="row">

            <div className="col-md-12 mb-2">
                 <label className="form-label">Basic Rates For Quotation</label>
                 <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Per Meter Rates</label>
                <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Per Piece Rates</label>
                <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Machine Setting Up Rate Rs/Task</label>
                <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Sheet Loading Rate Rs/Sheet</label>
                <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Material Handling  Rate Rs/KG</label>
                <input  className='in-fields'/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Machine Sales Rate Rs/KG</label>
                <input  className='in-fields'/>
              </div>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55",width:"100px"}}
        onClick={onClickAccept}>
           Accept
          </Button>
          <Button style={{width:"100px"}} variant='secondary'>
           Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
