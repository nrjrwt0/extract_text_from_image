import React from 'react';
import { messageType, useAuth } from '../../contexts/AuthContext.jsx';
import './snackbar.css';

const Snackbar = () => {
  const { message } = useAuth();
  const { type, text } = message;
  return type ? (
    <div className={`snackbar ${type === messageType.error ? 'red' : 'green'}`}>
      {text}
    </div>
  ) : null;
};

export default Snackbar;
