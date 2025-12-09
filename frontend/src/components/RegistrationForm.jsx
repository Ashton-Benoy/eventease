// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input'; 
import Button from './Button'; 
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const RegistrationForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // If registration auto-logs in the user

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    
    // Destructure required fields for the API call
    const { confirmPassword, ...dataToSend } = formData; 

    try {
      const response = await registerUser(dataToSend);

      if (response && response.token) {
        // Auto-login after successful registration
        login(response.user, response.token); 
        navigate('/dashboard'); 
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Create Your EventEase Account</h2>
      
      {error && (
        <div className="text-red-600 border border-red-300 p-2 rounded-md bg-red-50 text-sm text-center">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />
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
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <div>
        <Button
          type="submit"
          disabled={isLoading}
          variant="success" 
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </div>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onSwitch}>
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;