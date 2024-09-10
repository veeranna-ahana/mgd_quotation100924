import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import EstimationPrint from '../Estimate/EstimatePrint';
//'../Estimation/Estimate/EstimatePrint';
 

 export default function ModalPrintEstimation({openEstPrintModal, EstData, handleClose}) {
 //   console.log("in Print Modal",selectedWeek)
//   const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  
console.log(EstData);
  return (
    <div>
      <Modal show={openEstPrintModal} fullscreen={fullscreen} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Estimation Report</Modal.Title>
        </Modal.Header>
        <Modal.Body><EstimationPrint EstData={EstData}/></Modal.Body>
      </Modal>
    </div>
  );
}

