import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function ErrorModal(props) {
    const { detailsErrorModal, handleModalClose } = props
    return (
        <Modal
            show={true}
            size="lg"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title className='font-text' id="contained-modal-title-vcenter">
                    Error modal
                </Modal.Title>
                <button hidden={detailsErrorModal.disabled} type="button" class="btn-close" aria-label="Close" onClick={handleModalClose}></button>
            </Modal.Header>
            <Modal.Body>
                <p className='font-text'>
                    {detailsErrorModal.title}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button hidden={detailsErrorModal.disabled} onClick={handleModalClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
