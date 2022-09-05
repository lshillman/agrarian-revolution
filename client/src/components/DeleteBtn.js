import React from "react";
import auth from "../utils/auth";

export default function DeleteBtn({ veggieDelete }) {
    const handleDeleteButton = (e) => {
        if (auth.loggedIn()) {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "block";
            e.currentTarget.nextElementSibling.nextElementSibling.style.display = "block";
        } else {
            window.location.replace('/');
        }
    }

    const cancelDelete = (e) => {
        e.currentTarget.style.display = "none";
        e.currentTarget.previousElementSibling.style.display = "block";
        e.currentTarget.nextElementSibling.style.display = "none";
    }

    return (
        <div className="delete-actions" style={{ display: "flex", gap: "1rem"}}>
            <button className="delete-veggie-btn" onClick={handleDeleteButton}>Delete</button>
            <button className="delete-veggie-btn" style={{ display: "none" }} onClick={cancelDelete}>Cancel</button>
            <button className="confirm-delete" style={{ display: 'none', backgroundColor: 'red' }} onClick={veggieDelete} >Confirm</button>
        </div>
    )
}