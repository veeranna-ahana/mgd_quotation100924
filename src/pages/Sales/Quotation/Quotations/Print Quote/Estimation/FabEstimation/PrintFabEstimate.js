import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FabEstimationPrint from '../FabEstimation/FabEstimationPrint';
//./FabEstimatePrint';
 

 export default function ModalPrintFabEstimation({openFabEstPrintModal, FabEstData, handleClose}) {
 //   console.log("in Print Modal",selectedWeek)
//   const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);

  return (
    <div>
      <Modal show={openFabEstPrintModal} fullscreen={fullscreen} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Fabrication Estimation Report</Modal.Title>
        </Modal.Header>
        <Modal.Body><FabEstimationPrint FabEstData={FabEstData}/></Modal.Body>
      </Modal>
    </div>
  );
}

