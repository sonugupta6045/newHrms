import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setMessage('Login Successful!');
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, password });
      setMessage('Registration Successful! Please log in.');
      setIsLogin(true); // Switch to login form after successful registration
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>{isLogin ? 'HRMS - Login' : 'HRMS - Register'}</h1>

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      

      <p>
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'} 
        <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
          {isLogin ? ' Register' : ' Login'}
        </span>
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
