import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import AddVeggieForm from "./AddVeggieForm";

export default function PostVeggieModal() {
    const [showPostModal, setShowPostModal] = useState(false);

    return (
        <>
            <Modal
                size='lg'
                show={showPostModal}
                onHide={() => setShowPostModal(false)}
                aria-labelledby='veggie-modal'>

                <Modal.Header closeButton>
                    <Modal.Title>Post a Veggie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVeggieForm handleModalClose={() => setShowPostModal(false)} />
                </Modal.Body>

            </Modal>

            <Button onClick={() => setShowPostModal(true)}>
                Post Veggie
            </Button>
        </>
    )
}