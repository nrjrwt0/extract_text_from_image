const getCookie = (name) => {
  console.log(document.cookie);
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
};

export const isUserLoggedIn = () => {
  return getCookie('XSRF') ? true : false;
};
