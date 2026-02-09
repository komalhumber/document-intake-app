const fs = require("fs/promises");
const path = require("path");
const documentRepository = require("../repositories/documentRepository");
const { canTransition } = require("../utils/workflowRules");

const UPLOADS_DIR = path.join(__dirname, "../uploads");

// CREATE
const createDocument = async ({ clientRef, type, fileName, content }) => {
  const id = `doc-${Date.now()}`;

  await fs.writeFile(
    path.join(UPLOADS_DIR, `${id}.txt`),
    content
  );

  const document = {
    id,
    clientRef,
    type,
    fileName,
    status: "RECEIVED",
    createdAt: new Date().toISOString(),
    rejectedReason: null
  };

  const documents = await documentRepository.getAll();
  documents.push(document);
  await documentRepository.saveAll(documents);

  return document;
};

// READ + FILTER
const getDocuments = async (filters = {}) => {
  const documents = await documentRepository.getAll();
  const { clientRef, type, status } = filters;

  return documents.filter(doc =>
    (!clientRef || doc.clientRef === clientRef) &&
    (!type || doc.type === type) &&
    (!status || doc.status === status)
  );
};

// UPDATE METADATA
const updateDocument = async (id, updates) => {
  const documents = await documentRepository.getAll();
  const index = documents.findIndex(d => d.id === id);

  if (index === -1) throw new Error("Document not found");
  if (documents[index].status === "PROCESSED") {
    throw new Error("Processed documents cannot be modified");
  }

  documents[index] = {
    ...documents[index],
    ...updates
  };

  await documentRepository.saveAll(documents);
  return documents[index];
};

// UPDATE STATUS (WORKFLOW)
const updateStatus = async (id, newStatus, reason = null) => {
  const documents = await documentRepository.getAll();
  const doc = documents.find(d => d.id === id);

  if (!doc) throw new Error("Document not found");

  if (!canTransition(doc.status, newStatus)) {
    throw new Error("Invalid status transition");
  }

  doc.status = newStatus;
  if (newStatus === "REJECTED") {
    doc.rejectedReason = reason;
  }

  await documentRepository.saveAll(documents);
  return doc;
};

// DELETE (ONLY IF REJECTED)
const deleteDocument = async (id) => {
  const documents = await documentRepository.getAll();
  const doc = documents.find(d => d.id === id);

  if (!doc) throw new Error("Document not found");

  if (doc.status !== "REJECTED") {
    throw new Error("Only REJECTED documents can be deleted");
  }

  await fs.unlink(path.join(UPLOADS_DIR, `${id}.txt`));

  const remaining = documents.filter(d => d.id !== id);
  await documentRepository.saveAll(remaining);
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  updateStatus,
  deleteDocument
};
