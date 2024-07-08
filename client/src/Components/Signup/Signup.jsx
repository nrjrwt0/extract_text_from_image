import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './signup.css';
import { Navigate } from 'react-router-dom';

const initState = {
  fullname: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [formData, setFormData] = useState(initState);
  const { register, handleSnackbar, loggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullname, email, password } = formData;

    if (!fullname || !email || !password) {
      handleSnackbar({ error: 'All fields are mandatory' });
      return;
    }

    register(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loggedIn) {
    return <Navigate to='/image-to-text' />;
  }

  return (
    <div className='signup-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type='input'
          name='fullname'
          placeholder='Full Name'
          value={formData.fullname}
          onChange={handleChange}
          className='input'
        />
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='input'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className='input'
        />
        <button type='submit' className='button'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
