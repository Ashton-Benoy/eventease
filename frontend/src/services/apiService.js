

const API_BASE_URL = 'http://localhost:5000/api/v1'; 

const apiService = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

   
    const text = await response.text();
    return text ? JSON.parse(text) : null;
    
  } catch (error) {
    console.error('API Service Error:', error.message);
    throw error;
  }
};

export default apiService;