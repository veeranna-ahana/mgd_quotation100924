import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";


export default function AcceptModal({openAccept,setOpenAccept}) {
const handleClose=()=>{
    setOpenAccept(false);   
}

const onClickYes=()=>{
    handleClose();
    toast.success("Rates Parameters Set", {
        position: toast.POSITION.TOP_CENTER,
      });
}


  return (
    <div>
              <ToastContainer />
        <Modal show={openAccept} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quotation Rate Input</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        Accept Rates For Tasks?
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55",width:"100px"}}
        onClick={onClickYes}>
           Yes
          </Button>
          <Button style={{width:"100px"}} variant='secondary'>
          No
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
