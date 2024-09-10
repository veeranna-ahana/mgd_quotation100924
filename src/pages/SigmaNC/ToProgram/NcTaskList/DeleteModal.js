import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button } from 'react-bootstrap';

export default function DeleteModal({setDeleteData, deleteData}) {
    const handleClose=()=>{
        setDeleteData(false);
    }
  return (
    <div>
       <Modal show={deleteData} onHide={handleClose}>

<Modal.Header closeButton>

    <Modal.Title>magod_NC_Sigma_Programmer</Modal.Title>

</Modal.Header>

<Modal.Body> Select rows to Delete
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
