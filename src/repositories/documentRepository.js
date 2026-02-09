const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileUtils");

const DB_PATH = path.join(__dirname, "../data/documents.json");

const getAll = async () => {
  return await readJSON(DB_PATH);
};

const saveAll = async (documents) => {
  await writeJSON(DB_PATH, documents);
};

module.exports = {
  getAll,
  saveAll
};
