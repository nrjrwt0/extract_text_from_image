import React, { useState } from 'react';
import './imageToText.css';
import { uploadImage } from '../../services/services';
import { useAuth } from '../../contexts/AuthContext.jsx';

const ImageToText = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const { handleSnackbar, loading, setLoading } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    const res = await uploadImage(formData);
    if (res?.data?.text) {
      setResponse(res.data.text);
    } else {
      handleSnackbar(res);
    }
    setLoading(false);
  };

  console.log({ file });

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Upload Image to get Text</h2>
        <input type='file' onChange={handleFileChange} className='input' />
        <button
          type='submit'
          className={`button ${!file ? 'grey' : ''}`}
          disabled={!file}
        >
          Upload
        </button>
        {loading && <p className='loading'>Uploading...</p>}
      </form>
      {response && (
        <div className='response'>
          <h3>Extracted Text</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
