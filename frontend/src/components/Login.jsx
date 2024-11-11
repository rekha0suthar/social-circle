import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/form.css';

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    setIsLogged,
    loading,
    setLoading,
  } = useContext(UserContext); // all the states from context
  const navigate = useNavigate(); // hook for navigation

  // Method to submit user data
  const handleForm = async (e) => {
    e.preventDefault();
    const newUser = { username, password };
    try {
      setLoading(true);
      const response = await axios.post(
        'https://socialify-backend-rekha0suthars-projects.vercel.app/api/user/login', // login api
        newUser, //new user object
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.msg);
      localStorage.setItem('token', response.data.token);
      setIsLogged(true);
      navigate('/dashboard');
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Incorrect username/password');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleForm}>
        <h1>Login</h1>

        <label>Username</label>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{loading ? 'Logging ...' : 'Login'}</button>
        <p className="msg">
          Don't have an account? <a href="/">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
