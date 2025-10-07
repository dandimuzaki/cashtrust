import pool from "../db/index.js"

export const getCategories = async (user_id, type) => {
  let query = `SELECT * FROM categories WHERE user_id=$1`;
  const filters = [user_id];
  let index = 2;

  if (type) {
    filters.push(type);
    query += ` AND type = $${index++}`;
  }

  query += ` ORDER BY name`

  const result = await pool.query(query, filters)
  return result.rows
}

export const createCategory = async (data) => {
  const {user_id, name, type} = data
  const result = await pool.query(`
    INSERT INTO categories (user_id, name, type)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [user_id, name, type])

  return result.rows[0]
}

export const deleteCategory = async (id, user_id) => {
  const result = await pool.query(`
    DELETE FROM categories
    WHERE id = $1
    AND user_id = $2
    RETURNING *
  `, [id, user_id])

  return result.rows[0]
}