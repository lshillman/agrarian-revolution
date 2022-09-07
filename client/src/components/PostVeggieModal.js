import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import AddVeggieForm from "./AddVeggieForm";
import auth from "../utils/auth";

export default function PostVeggieModal() {
    const [showPostModal, setShowPostModal] = useState(false);

    return (
        <>
            {auth.loggedIn() ? (
                <>
                    <Modal
                        size='md'
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
            ) : window.location.replace('/') }
        </>
    )
}