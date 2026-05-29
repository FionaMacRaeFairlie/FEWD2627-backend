import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import passportConfig from "./config/passport.js";
passportConfig(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "public")));

import router from "./routes/routes.js";
app.use("/", router);

app.listen(3001, () => {
  console.log("Server started on port 3001. Ctrl^c to quit.");
});
