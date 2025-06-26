import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();
const port = 3001;

const client = new MongoClient(process.env.MONGODB_URI);

app.get("/api/test", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(); // default DB from URI
    const collections = await db.collections();
    res.json({ collections: collections.map(c => c.collectionName) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});