import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/form.css';

const Signup = () => {
  const { name, setName, username, setUsername, password, setPassword } =
    useContext(UserContext);
  const navigate = useNavigate(); // hook for navigation

  const handleForm = async (e) => {
    e.preventDefault();
    const newUser = { name, username, password };

    try {
      const response = await axios.post(
        'http://localhost:5100/api/user/signup',
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.msg);
      navigate('/login'); // redirect to login page
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg); // show specific error message if available
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleForm}>
        <h1>Signup</h1>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password" // update input type to password for security
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p className="msg">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
