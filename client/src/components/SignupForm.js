import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CREATE_USER } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import Auth from '../utils/auth';

const SignupForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        street: '',
        crossStreet: '',
        zipcode: ''
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

    // update state based on form input changes
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
            const location = `${formState.street} and ${formState.crossStreet} ${formState.zipcode}`

            const { data } = await createUser({
                variables: { ...formState, location },
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
                                    value={formState.username}
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
                                <input
                                    className="form-input"
                                    placeholder="zip code"
                                    name="zipcode"
                                    type="text"
                                    value={formState.zipcode}
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

export default SignupForm;