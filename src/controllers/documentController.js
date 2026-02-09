const {
  createDocument,
  getDocuments,
  updateDocument,
  updateStatus,
  deleteDocument
} = require("../services/documentService");

// CREATE
const createDoc = async (req, res, body) => {
  try {
    const data = JSON.parse(body);
    const doc = await createDocument(data);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Document created", document: doc }));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: err.message }));
  }
};

// READ
const getDocs = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const filters = Object.fromEntries(url.searchParams);
  const docs = await getDocuments(filters);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(docs));
};

// UPDATE METADATA
const updateDoc = async (req, res, id, body) => {
  try {
    const updates = JSON.parse(body);
    const doc = await updateDocument(id, updates);

    res.writeHead(200);
    res.end(JSON.stringify(doc));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: err.message }));
  }
};

// UPDATE STATUS
const updateDocStatus = async (req, res, id, body) => {
  try {
    const { status, reason } = JSON.parse(body);
    const doc = await updateStatus(id, status, reason);

    res.writeHead(200);
    res.end(JSON.stringify(doc));
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: err.message }));
  }
};

// DELETE
const deleteDoc = async (req, res, id) => {
  try {
    await deleteDocument(id);
    res.writeHead(204);
    res.end();
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: err.message }));
  }
};

module.exports = {
  createDoc,
  getDocs,
  updateDoc,
  updateDocStatus,
  deleteDoc
};
