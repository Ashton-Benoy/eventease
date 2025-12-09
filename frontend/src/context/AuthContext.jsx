// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user'); 

    if (token && storedUser) {
      try {
      
        const userData = JSON.parse(storedUser);
        
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
       
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setLoading(false); 
  }, []);


  const login = (userData, token) => {
   
    localStorage.setItem('authToken', token); 
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
  };


  const logout = () => {
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); 
  };

 
  if (loading) {
   
    return <div>Loading App...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);