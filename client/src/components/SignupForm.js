import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { CREATE_USER } from "../utils/mutations"
import { useMutation } from "@apollo/react-hooks"
import Auth from '../utils/auth';

const signupForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        street: '',
        crossStreet: '',
        latitude: '37.93301',
        longitude: '-122.31681'
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { username, value } = event.target;

        setFormState({
            ...formState,
            [username]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createUser({
                variables: { ...formState },
            });

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="street"
                                    name="street"
                                    type="text"
                                    value={formState.street}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="cross street"
                                    name="crossStreet"
                                    type="text"
                                    value={formState.crossStreet}
                                    onChange={handleChange}
                                />

                                <button
                                    className="btn btn-block btn-info"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>


    )
}

export default signupForm;