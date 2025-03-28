import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
export const baseUrl = `http://localhost:${process.env.PORT}`;
