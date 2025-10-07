import api from "../api/axios"

export const getCategories = async (query = '') => {
  try {
    const res = await api.get(`/categories?${query}`)
    return res.data
  } catch (err) {
    console.error("Failed to load the categories", err)
  }
}

export const createCategory = async (data) => {
  try {
    const res = await api.post(`/categories`, data)
    return res.data
  } catch (err) {
    console.error("Failed to create category", err)
  }
}

export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`)
    return res.data
  } catch (err) {
    console.error("Failed to delete category", err)
  }
}