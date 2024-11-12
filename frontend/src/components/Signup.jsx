import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/form.css';

const Signup = () => {
  const {
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    loading,
    signup,
  } = useContext(UserContext);

  return (
    <div className="form-container">
      <form onSubmit={signup}>
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
          minLength={6}
        />
        <button type="submit">{loading ? 'Loading' : 'Signup'}</button>
        <p className="msg">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
