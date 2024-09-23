import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
        const data = { email, password };
      const response = await axios.post('http://localhost:5000/api/users/login', data);
      localStorage.setItem('token', response.data.token);
      setUser({ email });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (email: string, password: string) => {
    const data = { email, password };
    const response = await axios.post('http://localhost:5000/api/users/register', data);
    if (response.status !== 201) {
      throw new Error('Register failed');
    }
    localStorage.setItem('token', response.data.token);
    setUser({ email });
    setToken(response.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};