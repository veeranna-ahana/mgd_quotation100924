import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';


export default function ImportRates({ show, setShow }) {

  const handleClose = () => {
    setShow(false);
  }

  const onClickYes = () => {
    setShow(false);
    toast.success('Quotation Saved', {
      position: toast.POSITION.TOP_CENTER
    })
  }

  return (
    <div>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Laser:Import Rates</Modal.Title>
        </Modal.Header>
        <Modal.Body> Current Details will be  deleted before importing.Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }} onClick={onClickYes}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
