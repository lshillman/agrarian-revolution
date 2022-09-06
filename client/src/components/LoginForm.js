import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


import Auth from '../utils/auth';

const LoginForm = ({setUserInfo, userInfo}) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      localStorage.setItem("_id", data.login.user._id);
      localStorage.setItem("username", data.login.user.username);
      localStorage.setItem("email", data.login.user.email);
      localStorage.setItem("location", data.login.user.location);
      localStorage.setItem("coordinates", JSON.stringify(data.login.user.coordinates));
      
      // console.log(userInfo);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
      
        
          
          
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                {!localStorage.getItem('id_token') && localStorage.getItem('username') ? <div className='expired-message'>Your session has expired. Please log in again.</div> : ''}
                <form id="login-form" onSubmit={handleFormSubmit}>
                  <label htmlFor="email">Your email</label>
                  <input
                    placeholder="e.g., bob@example.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="button-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Log in
                  </button>
                </form>
              </>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          
       
      
    </>
  );
};

export default LoginForm;