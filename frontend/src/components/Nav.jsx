import React, { useContext } from 'react';
import '../styles/nav.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Nav = () => {
  const navigate = useNavigate();

  const { setIsLogged } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    navigate('/login');
  };

  return (
    <div className="nav-container">
      <h1>Socialify</h1>
      <div className="btns">
        <div className="add-blog" onClick={() => navigate('/post')}>
          <h2>Add Post</h2>
        </div>
        <div className="logout" onClick={logout}>
          <h2>Logout</h2>
        </div>
      </div>
    </div>
  );
};

export default Nav;
