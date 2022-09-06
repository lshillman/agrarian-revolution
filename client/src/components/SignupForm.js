import React, { useState } from 'react';
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

        if(formState.username && formState.password
        && formState.email && formState.location && formState.coordinates)

        try {
            const location = `${formState.street} and ${formState.crossStreet} ${formState.zipcode}`

            const { data } = await createUser({
                variables: { ...formState, location },
            });

            localStorage.setItem("_id", data.createUser.user._id);
            localStorage.setItem("username", data.createUser.user.username);
            localStorage.setItem("email", data.createUser.user.email);
            localStorage.setItem("location", data.createUser.user.location);
            localStorage.setItem("coordinates", JSON.stringify(data.createUser.user.coordinates));


            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <form id="signup-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="username">Choose a public username</label>
                    <input
                        className="form-input"
                        placeholder="e.g., veggiebob"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Your email address</label>
                    <input
                        className="form-input"
                        placeholder="bob@example.com"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Choose a secure password</label>
                    <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="street">What's the name of your street?<br />(Just the street. Please do NOT include your house number)</label>
                    <input
                        className="form-input"
                        placeholder="street"
                        name="street"
                        type="text"
                        value={formState.street}
                        onChange={handleChange}
                    />
                    <label htmlFor="crossStreet">What's the nearest cross street?</label>
                    <input
                        className="form-input"
                        placeholder="cross street"
                        name="crossStreet"
                        type="text"
                        value={formState.crossStreet}
                        onChange={handleChange}
                    />
                    <label htmlFor="zipcode">Your ZIP code</label>
                    <input
                        className="form-input"
                        placeholder="zip code"
                        name="zipcode"
                        type="text"
                        value={formState.zipcode}
                        onChange={handleChange}
                    />

                    <button
                        className="button-primary"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Create account
                    </button>
                </form>
            )}

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </>
    )
}

export default SignupForm;