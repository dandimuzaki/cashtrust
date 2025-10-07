import { useEffect, useState } from "react"
import { CategoryContext } from "./CategoryContext.jsx"
import { createCategory, deleteCategory, getCategories } from "../services/categoryService"
import { useAuth } from "./AuthContext"

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const { loadingAuth, accessToken } = useAuth()

  const fetchCategories = async (query) => {
    try {
      const result = await getCategories(query)
      if (result.data) {
        setCategories(result.data)
      }
    } catch (err) {
      console.error("Failed to fetch categories", err)
    }
  }

  useEffect(() => {
    if (!loadingAuth && accessToken) {
    fetchCategories()
    }
  }, [lastUpdated, loadingAuth, accessToken])

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id)
      setLastUpdated(Date.now())
    } catch (err) {
      console.error("Failed to remove category", err)
    }
  }

  const openCategoryModal = () => {
    setOpenModal(true)
  }

  const closeCategoryModal = () => {
    setOpenModal(false)
  }

  const saveCategory = async (data) => {
    setLoading(true)
    try {
      const result = await createCategory(data)
      if (result.data) {
        setCategories((prev) => [...prev, result.data])
      }
    } catch (err) {
      console.error("Failed to add category", err)
    } finally {
      setLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <CategoryContext.Provider value={{
      categories,
      removeCategory,
      loading, setLoading,
      openModal, openCategoryModal, closeCategoryModal,
      saveCategory
    }}>
      {children}
    </CategoryContext.Provider>
  )
}