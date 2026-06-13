import "./dotenv.js";
import { pool } from "./database.js";
import characterData from "../data/characters.js";

const createCharactersTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS characters;

    CREATE TABLE IF NOT EXISTS characters (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      element VARCHAR(255) NOT NULL,
      weapon VARCHAR(255) NOT NULL,
      region VARCHAR(255) NOT NULL,
      rarity INTEGER NOT NULL,
      role VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255) NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 characters table created successfully");
  } catch (err) {
    console.error("⚠️ error creating characters table", err);
  }
};

const seedCharactersTable = async () => {
  await createCharactersTable();

  for (const character of characterData) {
    const insertQuery = {
      text: `
        INSERT INTO characters 
        (id, name, element, weapon, region, rarity, role, description, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
    };

    const values = [
      character.id,
      character.name,
      character.element,
      character.weapon,
      character.region,
      character.rarity,
      character.role,
      character.description,
      character.image,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${character.name} added successfully`);
    } catch (err) {
      console.error(`⚠️ error inserting ${character.name}`, err);
    }
  }
};

seedCharactersTable();
