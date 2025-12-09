
import apiService from './apiService';



export const registerUser = async (userData) => {
  return apiService('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiService('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};