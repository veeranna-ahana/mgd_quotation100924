import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ServicePrintQuotationHeaders from '../Service/ServicePrintQuotationHeaders';

export default function SvrModalPrintQuotation({ openSvrPrintModal, QtnNo, handleClose }) {   
    const [searchParams, setSearchParams] = useSearchParams();
    const [fullscreen, setFullscreen] = useState(true);

    return (
        <>
            <Modal show={openSvrPrintModal} fullscreen={fullscreen}  onHide={() => handleClose(false)}> 
                <Modal.Header closeButton>
                    <Modal.Title>Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body><ServicePrintQuotationHeaders Qtnno={QtnNo} /></Modal.Body>
            </Modal>
        </>
    );
}

