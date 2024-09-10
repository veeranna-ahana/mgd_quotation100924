import React from 'react';
import Modal from 'react-bootstrap/Modal';

import { Button } from 'react-bootstrap';

export default function ProgramSaveModal({saveProgram, setSaveProgram}) {

    const handleClose=()=>{
setSaveProgram(false);
    }
    return (
        <div>
            <Modal show={saveProgram} onHide={handleClose}>

                <Modal.Header closeButton>

                    <Modal.Title>magod_NC_Sigma_Programmer</Modal.Title>

                </Modal.Header>

                <Modal.Body> Task and Program detail saved
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary"
                    >
Ok
                    </Button>

                    {/* <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button> */}
                </Modal.Footer>

            </Modal>
        </div>
    );
}
