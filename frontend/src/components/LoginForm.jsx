// src/components/LoginForm.jsx
import React, { useState } from 'react';
import Input from './Input';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginUser } from '../services/authService'; 

const LoginForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await loginUser(formData);
      
      
      if (response && response.token) {
     
      login(response.user, response.token); 
        navigate('/dashboard');
      } else {
       
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
    
      setError(err.message || 'An unexpected error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Sign in to EventEase</h2>
      
      {/* Display Error Message */}
      {error && (
        <div className="text-red-600 border border-red-300 p-2 rounded-md bg-red-50 text-sm text-center">
          {error}
        </div>
      )}

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </div>
      
      <div className="text-center text-sm">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onSwitch}>
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;