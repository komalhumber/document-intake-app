const http = require("http");
const fs = require("fs");
const path = require("path");

const handleDocumentRoutes = require("./routes/documentRoutes");

const server = http.createServer(async (req, res) => {

  // 🟢 DEBUG (so we SEE what browser is requesting)
  console.log("REQUESTED URL:", req.url);

  // ===============================
  // FRONTEND FILES (HTML, CSS, JS)
  // ===============================
  if (req.method === "GET" && !req.url.startsWith("/api")) {

    let filePath;

    if (req.url === "/" || req.url === "/?") {
      filePath = path.join(__dirname, "public", "index.html");
    } else {
      filePath = path.join(__dirname, "public", req.url);
    }

    const ext = path.extname(filePath);
    const contentType =
      ext === ".css" ? "text/css" :
      ext === ".js" ? "text/javascript" :
      "text/html";

    try {
      const file = fs.readFileSync(filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(file);
    } catch (err) {
      res.writeHead(404);
      res.end("Not Found");
    }
    return;
  }

  // ===============================
  // API ROUTES
  // ===============================
  if (req.url.startsWith("/api")) {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      await handleDocumentRoutes(req, res, body);
    });
    return;
  }

  // ===============================
  // FALLBACK
  // ===============================
  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
