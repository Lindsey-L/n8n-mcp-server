const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const N8N_API_URL = (process.env.N8N_API_URL || "").replace(/\/$/, "");
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const PORT = process.env.PORT || 3000;

if (!N8N_API_URL || !N8N_API_KEY) {
  console.error("Missing env: N8N_API_URL or N8N_API_KEY");
  process.exit(1);
}

const client = axios.create({
  baseURL: N8N_API_URL,
  headers: { "X-N8N-API-KEY": N8N_API_KEY },
  timeout: 15000
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/workflows", async (req, res) => {
  try {
    const r = await client.get("/workflows");
    res.json(r.data);
  } catch (e) {
    const status = e.response?.status || 500;
    res.status(status).json({ error: e.message, status });
  }
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`n8n-mcp-server up on :${PORT}`)
);
