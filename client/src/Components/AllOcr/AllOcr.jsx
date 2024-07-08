import React, { useCallback, useEffect, useState } from 'react';
import './allocr.css';
import { fetchOcrs } from '../../services/services.js';
import { useAuth } from '../../contexts/AuthContext.jsx';

const AllOcr = () => {
  const [ocrs, setOcrs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOcrText, setSelectedOcrText] = useState(null);

  const { handleSnackbar, loading, setLoading } = useAuth();

  const getAllOcrs = useCallback(async () => {
    setLoading(true);
    const res = await fetchOcrs(currentPage);
    setOcrs(res.ocrs);
    setTotalPages(res.totalPages);
    setLoading(false);
  }, [currentPage, setLoading]);

  useEffect(() => {
    getAllOcrs();
  }, [getAllOcrs]);

  const handleImageClick = (text) => {
    setSelectedOcrText(text);
  };

  const handleCloseModal = () => {
    setSelectedOcrText(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <p className='loading allOcrLoading'>Loading...</p>;
  }

  if (ocrs.length === 0) {
    return <h5 className='empty'>No Ocr Available</h5>;
  }

  return (
    <div className='all-ocr-container'>
      <div className='ocr-grid'>
        {ocrs.map(({ _id, image, text }) => (
          <div
            key={_id}
            className='ocr-item'
            onClick={() => handleImageClick(text)}
          >
            <img src={`data:image/png;base64,${image}`} alt='OCR' />
          </div>
        ))}
      </div>
      <div className='pagination'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {selectedOcrText && (
        <div className='modal' onClick={handleCloseModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <h2>Extracted Text</h2>
            <p>{selectedOcrText}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOcr;
