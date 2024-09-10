import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button } from 'react-bootstrap';

export default function AllotProgramModal({setAllotProgram, allotProgram}) {
    const handleClose=()=>{
        setAllotProgram(false)
    }
  return (
    <div>
      <Modal show={allotProgram} onHide={handleClose}>

<Modal.Header closeButton>
    <Modal.Title>System.Windows.Forms</Modal.Title>
</Modal.Header>

<Modal.Body>
     Select Schedule to Process
</Modal.Body>

<Modal.Footer>
    <Button variant="primary" >Ok</Button>
</Modal.Footer>

</Modal>
    </div>
  );
}
