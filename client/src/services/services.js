const uploadImage = async (formData) => {
  const response = await fetch('http://localhost:8000/image/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

const registerUser = async (payload) => {
  console.log(payload);
  const response = await fetch('http://localhost:8000/user/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

const loginUser = async (payload) => {
  const response = await fetch('http://localhost:8000/user/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

const logoutUser = async (payload) => {
  const response = await fetch('http://localhost:8000/user/logout', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

const fetchOcrs = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:8000/image/ocrs?page=${page}`,
      {
        credentials: 'include',
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch OCR data:', error);
  }
};

export { uploadImage, registerUser, loginUser, logoutUser, fetchOcrs };
