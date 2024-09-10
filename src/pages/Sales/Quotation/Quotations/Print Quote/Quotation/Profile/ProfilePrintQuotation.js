import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ProfilePrintQuotationHeaders from '../Profile/ProfilePrintQuotationHeaders';
//import {SaveToPdf} from '../../../../../../sendmail/savingpdf';

export default function ModalPrintQuotation({ openPrfPrintModal, QtnNo,handleClose }) {   
    const [searchParams, setSearchParams] = useSearchParams();

    const [fullscreen, setFullscreen] = useState(true);

    return (
        <>
            <Modal show={openPrfPrintModal} fullscreen={fullscreen}  onHide={() =>  handleClose(false)}> 
                <Modal.Header closeButton>
                    <Modal.Title>Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProfilePrintQuotationHeaders Qtnno={QtnNo} /></Modal.Body>
            </Modal>
            {/* <SaveToPdf /> */}
        </>
    );
}

