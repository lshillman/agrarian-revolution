import React, { useState } from 'react';
import { CREATE_REQUEST } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import { Form } from 'react-bootstrap';
import auth from '../utils/auth';


const RequestVeggieForm = ({ veggie }) => {

    const [formState, setFormState] = useState({
        content: '',
    });

    const [createRequest, { error }] = useMutation(CREATE_REQUEST)


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };


    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const content = formState.content;
            const requestor = localStorage.getItem('_id');

            await createRequest({
                variables: { content, veggie: veggie._id, requestor },
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }

    };


    return (
        <>
            {auth.loggedIn() ? (
                <>
                    <Form id="request-veggie-form" onSubmit={handleFormSubmit}>
                        <textarea
                            className="form-input"
                            placeholder={"Write a message to " + veggie.owner.username}
                            name="content"
                            type="text"
                            value={formState.content}
                            onChange={handleChange}
                        />

                        <button
                            className="button-primary"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                        >
                            Submit
                        </button>

                    </Form>


                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </>
            ) : window.location.replace('/')}
        </>
    )
}

export default RequestVeggieForm;
