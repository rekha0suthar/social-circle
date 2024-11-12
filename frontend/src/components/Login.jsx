import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import '../styles/form.css';

const Login = () => {
  const { username, setUsername, password, setPassword, loading, login } =
    useContext(UserContext); // all the states from context

  return (
    <div className="form-container">
      <form onSubmit={login}>
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
