import React, { useState } from 'react';
import './login.css';
import { FaUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <MdOutlinePassword className="icon" />
          </div>

          <div className="remember-forgot">
            <label><input type='checkbox' />Remember me</label>
            <a href='#'>Forgot Password</a>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
