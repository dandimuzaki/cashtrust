import api from './../api/axios.js'

export const register = async (data) => {
  try {
    const res = await api.post('/auth/register', data)
    return res.data
  } catch (err) {
    console.error("Failed to register", err)
  }
}

export const login = async (data) => {
  try {
    const res = await api.post('/auth/login', data)
    return res.data
  } catch (err) {
    console.error("Failed to login", err)
  }
}

export const silentLogin = async () => {
  try {
    const res = await api.get('/auth/silent-login')
    return res.data
  } catch (err) {
    console.error("Failed to get new token", err)
  }
}

export const logout = async (data) => {
  try {
    const res = await api.post('/auth/logout', data)
    return res.data
  } catch (err) {
    console.error("Failed to logout", err)
  }
}

export const updateUser = async (data) => {
  try {
    const res = await api.put(`/auth/user/update`, data)
    return res.data
  } catch (err) {
    if (err.response?.status === 401) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    return { success: false, message: "Failed to update profile." };
  }
}

export const deleteUser = async (data) => {
  try {
    const res = await api.post('/auth/user/delete', data)
    return res.data
  } catch (err) {
    if (err.response?.status === 401) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    return { success: false, message: "Failed to delete account." };
  }
}