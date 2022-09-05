import React from "react";
import auth from "../utils/auth";

export default function DeleteBtn({ veggieDelete }) {
    const handleDeleteButton = (e) => {
        if (auth.loggedIn()) {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "block";
        } else {
            window.location.replace('/');
        }
    }

    return (
        <>
            <button className="delete-veggie-btn" onClick={handleDeleteButton}>Delete</button>
            <button className="confirm-delete" style={{ display: 'none', backgroundColor: 'red' }} onClick={veggieDelete} >Confirm</button>
        </>
    )
}