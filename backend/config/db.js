import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const connectionString = process.env.DATABASE_URL || `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE}?sslmode=require`;
const db = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

// const db=new pg.Client({
//      user:process.env.USER_NAME,
//      host:process.env.HOST,
//      database:process.env.DATABASE,
//      password:process.env.PASSWORD,
//      port:process.env.DB_PORT,
// });

export default db;