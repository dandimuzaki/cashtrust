export default async function migrate(pool) {
  await pool.query(`
    CREATE TABLE business_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      business_name VARCHAR(100) NOT NULL,
      business_type VARCHAR(50),
      starting_balance NUMERIC(12, 2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `)
}
