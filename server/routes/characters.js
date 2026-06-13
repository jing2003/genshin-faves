import express from "express";
import CharactersController from "../controllers/characters.js";

const router = express.Router();

router.get("/", CharactersController.getCharacters);
router.get("/:id", CharactersController.getCharacterById);

export default router;
