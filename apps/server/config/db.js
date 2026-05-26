import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const config = {
  user: process.env.DB_USER ?? "harishanth",
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER ?? "localhost",
  port: Number(process.env.DB_PORT ?? 50436),
  database: process.env.DB_NAME ?? "erp_event",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  connectionTimeout: 30_000,
  requestTimeout: 30_000,
};

if (!config.password) {
  throw new Error(
    "DB_PASSWORD is missing. Copy .env.example to .env and set your SQL login password."
  );
}

const pool = await sql.connect(config);

console.log(
  `SQL Server connected (${config.server}:${config.port}/${config.database})`
);

export default pool;
