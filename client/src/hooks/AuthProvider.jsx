import { AuthContext } from './AuthContext';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getAccessToken } from './../api/axios.js';
import { deleteUser, login, register, silentLogin, updateUser } from '../services/authService.js';

export const AuthProvider = ({ children }) => {
  console.log("Rendering auth");

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');
  const [onEdit, setOnEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addErrors, setAddErrors] = useState('');
  const [onDeleteAccount, setOnDeleteAccount] = useState(false);

  // 🔹 Silent login
  useEffect(() => {
    const getNewToken = async () => {
      setLoadingAuth(true);
      try {
        const result = await silentLogin();
        if (result) {
          setAccessToken(result.accessToken);
          setUser(result.user);
          getAccessToken(result.accessToken);
        }
      } catch (err) {
        console.error('Failed to silent login', err);
        setAccessToken(null);
        setUser(null);
        setAuthenticated(false);
        localStorage.removeItem('authenticated');
      } finally {
        setLoadingAuth(false);
      }
    };

    if (authenticated) {
      getNewToken();
    } else {
      setLoadingAuth(false);
    }
  }, [authenticated]);

  // 🔹 Callbacks
  const handleLogin = useCallback(async (data) => {
    setLoadingAuth(true);
    try {
      const res = await login(data);
      setAccessToken(res.accessToken);
      setUser(res.user);
      getAccessToken(res.accessToken);
      navigate('/dashboard');
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error('Error login', err.message);
    } finally {
      setLoadingAuth(false);
    }
  }, [navigate]);

  const handleRegister = useCallback(async (data) => {
    setLoadingAuth(true);
    try {
      const res = await register(data);
      setAccessToken(res.accessToken);
      setUser(res.user);
      getAccessToken(res.accessToken);
      navigate('/dashboard');
      setAuthenticated(true);
      localStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error('Error register', err);
    } finally {
      setLoadingAuth(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Error during logout', err);
    }
    setUser(null);
    setAccessToken(null);
    setAuthenticated(false);
    localStorage.removeItem('authenticated');
    navigate('/');
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setOnEdit((prev) => !prev);
  }, []);

  const editProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await updateUser(data);
      if (!res.success) {
        setAddErrors(res.message);
      } else {
        setUser(res.data);
        setOnEdit((prev) => !prev);
        setOpenModal(false);
      }
    } catch (err) {
      console.error("Failed to edit account.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await deleteUser(data);
      if (!res.success) {
        setAddErrors(res.message);
      } else {
        setUser(null);
        setAccessToken(null);
        setAuthenticated(false);
        localStorage.removeItem('authenticated');
        navigate('/');
      }
    } catch (err) {
      console.error("Failed to delete account.", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // 🔹 Small UI handlers
  const openPasswordModal = useCallback(() => setOpenModal(true), []);
  const closePasswordModal = useCallback(() => setOpenModal(false), []);
  const openDeleteAccount = useCallback(() => setOnDeleteAccount(true), []);
  const closeDeleteAccount = useCallback(() => setOnDeleteAccount(false), []);

  // 🔹 Memoize context value
  const value = useMemo(() => ({
    handleLogin,
    loadingAuth,
    user,
    handleRegister,
    accessToken,
    handleLogout,
    editProfile,
    deleteAccount,
    onEdit, setOnEdit, handleEdit,
    openModal,
    openPasswordModal, closePasswordModal,
    loading, addErrors,
    openDeleteAccount, closeDeleteAccount, onDeleteAccount
  }), [
    handleLogin,
    loadingAuth,
    user,
    handleRegister,
    accessToken,
    handleLogout,
    editProfile,
    deleteAccount,
    onEdit, handleEdit,
    openModal,
    openPasswordModal, closePasswordModal,
    loading, addErrors,
    openDeleteAccount, closeDeleteAccount, onDeleteAccount
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
