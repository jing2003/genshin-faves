import { pool } from "../config/database.js";

const allowedAttributes = {
  name: "name",
  element: "element",
  region: "region",
  role: "role",
};

const getCharacters = async (req, res) => {
  try {
    const { attribute, value } = req.query;

    let query = "SELECT * FROM characters ORDER BY id ASC";
    let values = [];

    if (attribute && value) {
      const column = allowedAttributes[attribute];

      if (!column) {
        return res.status(400).json({ error: "Invalid search attribute" });
      }

      if (column === "rarity") {
        query = `SELECT * FROM characters WHERE ${column} = $1 ORDER BY id ASC`;
        values = [Number(value)];
      } else {
        query = `SELECT * FROM characters WHERE ${column} ILIKE $1 ORDER BY id ASC`;
        values = [`%${value}%`];
      }
    }

    const results = await pool.query(query, values);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await pool.query("SELECT * FROM characters WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getCharacters,
  getCharacterById,
};
