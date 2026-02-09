const {
  createDoc,
  getDocs,
  updateDoc,
  updateDocStatus,
  deleteDoc
} = require("../controllers/documentController");

const handleRoutes = async (req, res, body) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    res.writeHead(200);
    res.end("Document Intake API is running");
  }

  else if (method === "GET" && url.startsWith("/api/documents")) {
    await getDocs(req, res);
  }

  else if (method === "POST" && url === "/api/documents") {
    await createDoc(req, res, body);
  }

  else if (method === "PUT" && url.startsWith("/api/documents/")) {
    const id = url.split("/")[3];
    await updateDoc(req, res, id, body);
  }

  else if (method === "PATCH" && url.startsWith("/api/documents/")) {
    const id = url.split("/")[3];
    await updateDocStatus(req, res, id, body);
  }

  else if (method === "DELETE" && url.startsWith("/api/documents/")) {
    const id = url.split("/")[3];
    await deleteDoc(req, res, id);
  }

  else {
    res.writeHead(404);
    res.end("Route not found");
  }
};

module.exports = handleRoutes;
