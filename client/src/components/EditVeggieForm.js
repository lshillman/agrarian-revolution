import React, { useState } from 'react';
import { UPDATE_VEGGIE } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import { Form } from 'react-bootstrap';
import VeggieResponses from './VeggieResponses';


const EditVeggieForm = ({veggie}) => {

    const [formState, setFormState] = useState({
        quantity: veggie.quantity,
        photo: veggie.photo,
        description: veggie.description,
    });

    const [updateVeggie, { error }] = useMutation(UPDATE_VEGGIE)


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
            const owner = localStorage.getItem('_id');
            const quantity = formState.quantity * 1

            console.log({ ...formState, owner })
            console.log(formState)
            await updateVeggie({
                variables: { ...formState, owner, quantity, _id: veggie._id },
            });
            window.location.reload();
        } catch (e) {
            console.error(e);
        }

    };


    return (
        <>
            <Form id="edit-veggie-form" onSubmit={handleFormSubmit}>
                <input
                    className="form-input"
                    placeholder="quantity"
                    name="quantity"
                    type="number"
                    value={formState.quantity}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    placeholder="photo"
                    name="photo"
                    type="text"
                    value={formState.photo}
                    onChange={handleChange}
                />

                <input
                    className="form-input"
                    placeholder="description"
                    name="description"
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                />
                <button
                    className="btn btn-block btn-info"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Save
                </button>

            </Form>


            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}

        </>
    )
}

export default EditVeggieForm
