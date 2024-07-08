import React, { useContext, useState } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/services';
import { isUserLoggedIn } from '../utils/getCookie';
import { useNavigate } from 'react-router-dom';

export const messageType = {
  error: 'error',
  success: 'success',
};

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  const clearSnackbar = () => {
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 2000);
  };

  const handleSnackbar = ({ error, message }) => {
    if (error) {
      setMessage({ type: messageType.error, text: error });
    } else if (message) {
      setMessage({ type: messageType.success, text: message });
    } else {
      setMessage({ type: messageType.error, text: 'Something went wrong!' });
    }
    clearSnackbar();
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      const res = await registerUser(payload);
      console.log(res);
      if (res) {
        handleSnackbar(res);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessage({ type: messageType.error, text: 'Something went wrong!' });
      clearSnackbar();
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    try {
      setLoading(true);
      const res = await loginUser(payload);
      console.log(res);
      if (res) {
        handleSnackbar(res);
        setLoggedIn(true);
        // navigate('/image-to-text');
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      setMessage({ type: messageType.error, text: 'Something went wrong!' });
      clearSnackbar();
    } finally {
      setLoading(false);
    }

    // setCurrentUser(user);
  };

  console.log({ loading });

  const logout = async () => {
    const res = await logoutUser();
    if (res?.message) {
      handleSnackbar(res);
      setLoggedIn(false);
      // navigate('/login');
    } else {
      handleSnackbar(res);
    }
  };

  const value = {
    loggedIn,
    login,
    register,
    logout,
    message,
    handleSnackbar,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
