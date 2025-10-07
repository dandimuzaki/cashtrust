import pool from "../db/index.js"

export const getUser = async (email) => {
  let query = `
  SELECT *
  FROM users
  `;
  const filters = []
  let index = 1

  if (email) {
    filters.push(email)
    query += ` WHERE email = $${index++}`
  }

  query += ` ORDER BY name`

  const result = await pool.query(query, filters)
  return email ? result.rows[0] : result.rows;
}

export const getUserById = async (id) => {
  const result = await pool.query(`
  SELECT id, name, email, password
  FROM users
  WHERE id = $1
  `, [id]);
  return result.rows[0];
}

export const createUser = async (data) => {
  const { name, email, password } = data;
  const result = await pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [name, email, password])

  return result.rows[0]
}

export const deleteUser = async (id) => {
  const result = await pool.query(`
    DELETE FROM users
    WHERE id = $1
    RETURNING id, name, email
  `, [id])

  return result.rows[0]
}

export const updateUser = async (id, data)  => {
  const allowedFields = ["name", "email", "password"];
  const fields = []
  const values = []
  let index = 1

  for (const key of allowedFields) {
    if (key in data) {
      fields.push(`${key} = $${index++}`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return null;

  values.push(id)
  fields.push(`updated_at = NOW()`);

  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id, name, email
  `

  const result = await pool.query(query, values);
  return result.rows[0]
}