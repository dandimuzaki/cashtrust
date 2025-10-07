import fs from "fs";
import path from "path";
import pool from "./index.js"
import { pathToFileURL } from "url";

const migrationDir = path.resolve("./db/migrations");

async function runMigrations() {
  try {
    const files = fs
      .readdirSync(migrationDir)
      .filter(file => file.endsWith(".js"))
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationDir, file)
      console.log(`Running migration: ${file}`)
      const migration = await import(pathToFileURL(filePath).href);
      if (typeof migration.default === "function") {
        await migration.default(pool)
      } else if (typeof migration.migrate === "function") {
        await migration.migrate(pool)
      }
    }

    console.log("All migrations completed");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}

runMigrations();