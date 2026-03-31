import express from "express";
import connectDB from "./DB/connection.js";
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from "./routes/Auth.js";
import imageRoutes from "./routes/Image.js";
import profileRoutes from "./routes/Profile.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/uploads", express.static(path.resolve(__dirname, "public/uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes);
app.use("/user", profileRoutes);

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(500).send({ message: "Something broke on the server!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
