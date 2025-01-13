import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import prospectsRoutes from './routes/prospects.js';

const app = express();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const MONGODB_URI = "mongodb+srv://jennastover810:vigmMrzL5iGkqDeU@clusterassignment17.ydj7558.mongodb.net/prospects?retryWrites=true&w=majority&appName=ClusterAssignment17";
const PORT = 4000;

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

app.use("/api/prospects", prospectsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});