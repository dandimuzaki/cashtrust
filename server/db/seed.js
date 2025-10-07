import pool from "./index.js";

async function seed() {
  try {
    console.log("Seeding database...")

    // 1️⃣ Clear existing data & reset IDs
    await pool.query(`TRUNCATE TABLE transactions RESTART IDENTITY CASCADE;`);
    await pool.query(`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`);

    const categoriesExpense = ["Raw Materials", "Transport", "Utilities", "Misc"];
    const categoriesIncome = ["Product Sale", "Service Fee"];

    for (const name of categoriesExpense) {
      await pool.query('INSERT INTO categories (name, type) VALUES ($1, $2);', [name, "expense"])
    }

    for (const name of categoriesIncome) {
      await pool.query('INSERT INTO categories (name, type) VALUES ($1, $2);', [name, "income"])
    }
    console.log("Categories inserted")

    await pool.query(`
      INSERT INTO transactions (description, amount, type, category_id, created_at)
      VALUES
      ($1, $2, $3, $4, NOW()),
      ($5, $6, $7, $8, NOW()),
      ($9, $10, $11, $12, NOW());
    `,
  [
    "Membeli aci", 10000, "expense", 1,
    "Membayar listrik", 20000, "expense", 2,
    "Hasil penjualan", 100000, "income", 5
  ]);
  console.log("✅ Transactions inserted");

  console.log("✅ Seeding completed");

  } catch (err) {
    console.error("Seeding failed", err)
  } finally {
    await pool.end()
  }
}

seed();