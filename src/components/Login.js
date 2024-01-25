import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../App.css';

const validatePassword = (password) => {
  // Password should contain a minimum of 8 characters, at least one uppercase letter,
  // one lowercase letter, one special character, and one number.
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  return passwordRegex.test(password);
};

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Empty validations
    if (!data.email.trim() || !data.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Password validation
    if (!validatePassword(data.password)) {
      toast.error(
        'Password should contain a minimum of 8 characters, at least one uppercase letter, one lowercase letter, one special character, and one number.'
      );
      return;
    }

    toast.success('Login successful!');
    navigate('/booking');    
  };


  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="heading">LOGIN</h1>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
