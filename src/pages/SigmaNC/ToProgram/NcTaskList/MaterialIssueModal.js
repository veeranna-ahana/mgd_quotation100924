import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button } from 'react-bootstrap';



export default function MaterialIssueModal({materialIssue,setMaterialIssue}) {

    const handleClose=()=>{
        setMaterialIssue(false);
    }
  return (
    <div>
       <Modal show={materialIssue} onHide={handleClose}>

<Modal.Header closeButton>

    <Modal.Title>magod_NC_Sigma_Programmer</Modal.Title>

</Modal.Header>

<Modal.Body> Enter Time For: 38841  0 for Material  Issue
</Modal.Body>
<Modal.Footer>

    <Button variant="primary"
    >
Ok
    </Button>

   
</Modal.Footer>

</Modal>
    </div>
  );
}
