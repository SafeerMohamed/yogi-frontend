import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

const normalizeEmail = (email) => email.trim().toLowerCase();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('zuntrist_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authAPI.getMe();
      setUser(data);
    } catch {
      localStorage.removeItem('zuntrist_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const { data } = await authAPI.login({
      email: normalizeEmail(email),
      password: password.trim(),
    });
    if (!data?.token) {
      throw new Error('Invalid server response');
    }
    localStorage.setItem('zuntrist_token', data.token);
    setUser({
      _id: data._id,
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      bio: data.bio,
    });
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await authAPI.register({
      username: username.trim(),
      email: normalizeEmail(email),
      password: password.trim(),
    });
    if (!data?.token) {
      throw new Error('Invalid server response');
    }
    localStorage.setItem('zuntrist_token', data.token);
    setUser({
      _id: data._id,
      username: data.username,
      email: data.email,
      avatar: data.avatar,
      bio: data.bio,
    });
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('zuntrist_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        setUser,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
