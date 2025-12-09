
import React from 'react';
import { useLocation } from 'react-router-dom';


const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        {isLoginPage ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default AuthPage;