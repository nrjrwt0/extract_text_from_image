import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/Login/Login.jsx';
import ImageToText from './Components/ImageToText/ImageToText.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import './style.css';
import Snackbar from './Components/Snackbar/Snackbar.jsx';
import AllOcr from './Components/AllOcr/AllOcr.jsx';

const PrivateRoute = ({ element }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? element : <Navigate to='/login' />;
};

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Snackbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/image-to-text'
          element={<PrivateRoute element={<ImageToText />} />}
        />
        <Route
          path='/all-ocr'
          element={<PrivateRoute element={<AllOcr />} />}
        />
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
