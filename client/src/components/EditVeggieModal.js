import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import auth from "../utils/auth";
import EditVeggieForm from "./EditVeggieForm";

export default function EditVeggieModal({veggie}) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            {auth.loggedIn() ? (
                <>
                    <Modal
                        size='md'
                        show={showEditModal}
                        onHide={() => setShowEditModal(false)}
                        aria-labelledby='veggie-modal'>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit {veggie.type}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditVeggieForm handleModalClose={() => setShowEditModal(false)} veggie={veggie} />
                        </Modal.Body>

                    </Modal>

                    <Button className="button-secondary" onClick={() => setShowEditModal(true)}>
                        Edit
                    </Button>
                </>
            ) : window.location.replace('/') }
        </>
    )
}