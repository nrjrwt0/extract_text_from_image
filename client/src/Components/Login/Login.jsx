import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './login.css';
import { Navigate } from 'react-router-dom';

const initState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initState);

  const { login, handleSnackbar, loading, loggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      handleSnackbar({ error: 'All fields are mandatory' });
      return;
    }
    login(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loggedIn) {
    return <Navigate to='/image-to-text' />;
  }

  return (
    <div className='login-container'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type='submit' className='button' disabled={loading}>
          Login
        </button>
        {loading && <p className='loading'>Loading...</p>}
      </form>
    </div>
  );
};

export default Login;
