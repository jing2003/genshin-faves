import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import charactersRouter from "./routes/characters.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/characters", charactersRouter);

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "public/index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
