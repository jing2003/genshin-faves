import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import characterData from "../data/characters.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.status(200).json(characterData);
});

router.get("/:characterId", (req, res) => {
  const characterId = req.params.characterId;

  const character = characterData.find(
    (character) => character.id === characterId,
  );

  if (!character) {
    return res
      .status(404)
      .sendFile(path.resolve(__dirname, "../../client/public/404.html"));
  }

  res
    .status(200)
    .sendFile(path.resolve(__dirname, "../../client/public/character.html"));
});

export default router;
