import { createCategory, deleteCategory, getCategories } from "../models/category.js"

export const retrieveCategories = async (req, res) => {
  try {
    const user = req.user
    const {type} = req.query
    const categories = await getCategories(user.id, type)
    res.status(200).json({
      success: true,
      message: "Success retrieve categories",
      data: categories
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed retrieve categories",
      errors: err
    })
  }
}

export const addCategory = async (req, res) => {
  try {
    const user = req.user
    const added = await createCategory({...req.body, user_id: user.id})
    res.status(201).json({
      success: true,
      message: "Success create category",
      data: added
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed create category",
      error: err
    })
  }
}

export const removeCategory = async (req, res) => {
  try {
    const {id} = req.params
    const deleted = await deleteCategory(id, req.user.id)
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Success delete category",
      data: deleted
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed delete category",
      error: err
    })
  }
}