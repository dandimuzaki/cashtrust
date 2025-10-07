import pool from "../db/index.js"

export const getTransactions = async (user_id, type, category, sort = "desc") => {
  let query = `
    SELECT t.*, c.name AS category_name
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id=$1
  `;
  const filters = [user_id];
  let index = 2;

  if (type) {
    filters.push(type);
    query += ` AND t.type = $${index++}`;
  }

  if (category) {
    filters.push(category);
    query += ` AND c.name = $${index++}`;
  }

  query += ` ORDER BY t.created_at ${sort.toLowerCase() === "asc" ? "ASC" : "DESC"}`;

  const result = await pool.query(query, filters);
  return result.rows
}

export const getTransactionById = async (id, user_id) => {
  const result = await pool.query(`
    SELECT * FROM transactions
    WHERE id=$1
    AND user_id=$2
  `, [id, user_id])

  return result.rows[0]
}

export const getMonthlyTransactions = async (user_id, interval, from, to) => {
  const result = await pool.query(`
    WITH months AS (
      SELECT DATE_TRUNC('month', dd)::date AS month_start
      FROM generate_series(
          DATE_TRUNC('month', COALESCE($3, CURRENT_DATE - make_interval(months := $2))),
          DATE_TRUNC('month', COALESCE($4, CURRENT_DATE)),
          interval '1 month'
      ) dd
    )
    SELECT 
        TO_CHAR(m.month_start, 'MM-YYYY') AS month,
        COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS total_expense,
        COALESCE(SUM(amount), 0) AS total_balance,
        COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) - COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS net
    FROM months m
    LEFT JOIN transactions t
      ON DATE_TRUNC('month', t.created_at) = m.month_start
    AND t.user_id = $1
    GROUP BY m.month_start
    ORDER BY m.month_start ASC
  `, [user_id, interval, from, to])
  
  return result.rows
}

export const getTransactionsByCategory = async (user_id, type, from, to) => {
  const defaultFrom = from || '1900-01-01';
  const defaultTo = to || new Date();

  let query = `
    SELECT
      c.name AS category,
      SUM(t.amount) AS total
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
      AND t.created_at BETWEEN $2 AND $3
  `;

  const filters = [user_id, defaultFrom, defaultTo];
  let index = 4;

  if (type) {
    filters.push(type);
    query += ` AND t.type = $${index++}`;
  }

  query += ` GROUP BY c.name ORDER BY total DESC`;

  const result = await pool.query(query, filters);
  return result.rows;
};

export const createTransaction = async (data) => {
  const {user_id, description, category_id, amount, type} = data;
  const result = await pool.query(`
    INSERT INTO transactions (user_id, description, category_id, amount, type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [user_id, description, category_id, amount, type]
  );

  return result.rows[0]
}

export const deleteTransaction = async (id, user_id) => {
  const result = await pool.query(`
    DELETE FROM transactions
    WHERE id = $1
    AND user_id = $2
    RETURNING *
    `, [id, user_id]);
  
  return result.rows[0]
}

export const updateTransaction = async (id, data) => {
  const allowedFields = ["description", "category_id", "amount", "type"];
  const fields = []
  const values = []
  let index = 1

  for (const key of allowedFields) {
    if (key in data) {
      fields.push(`${key} = $${index++}`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return null

  values.push(id)
  fields.push(`updated_at = NOW()`);

  const query = `
    UPDATE transactions
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
  `

  const result = await pool.query(query, values);

  return result.rows[0]
}