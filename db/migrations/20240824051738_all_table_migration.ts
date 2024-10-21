import { Knex } from "knex";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathname = __dirname
  .split("\\")
  .filter((p) => p !== "dist")
  .join("\\");

export async function up(knex: Knex): Promise<void> {
  const sqlPath = path.join(pathname, "../sql/migration.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");
  await knex.raw(sql);
}

export async function down(knex: Knex): Promise<void> {
  const sqlPath = path.join(pathname, "../sql/rollback.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");
  await knex.raw(sql);
}
