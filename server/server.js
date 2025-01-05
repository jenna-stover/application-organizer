import express from "express";
import Joi from "joi";
import multer from "multer";
import path from "path";
import cors from "cors";
import mongoose, { connect, model } from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "public", "images") });
const MONGODB_URI = "mongodb+srv://jennastover810:vigmMrzL5iGkqDeU@clusterassignment17.ydj7558.mongodb.net/prospects?retryWrites=true&w=majority&appName=ClusterAssignment17";
const PORT = 3000;

connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

const prospectSchema = new mongoose.Schema({
  name: String,
  company: String,
  link: String,
  location: String,
  deadline: String,
  img: String,
  completed: { type: Boolean, default: false },
});

const Prospect = model("Prospect", prospectSchema);

//fetch all prospects
app.get("/api/prospects", async (req, res) => {
  try {
    const prospects = await Prospect.find();
    res.json(prospects);
  } catch (error) {
    console.error("Error fetching prospects:", error);
    res.status(500).json("Error fetching prospects");
  }
});

//create new prospect
app.post("/api/prospects", upload.single('img'), async (req, res) => {
  console.log("Received data for new prospect:", req.body);
  const result = validateProspect(req.body);

  if (result.error) {
    res.status(400).json(result.error.details[0].message);
    return;
  }

  let prospect = new Prospect({
    name: req.body.name,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location,
    deadline: req.body.deadline,
  });

  if (req.file) {
    prospect.img = "/images/" + req.file.filename;
  }

  try {
    prospect = await prospect.save();
    res.json(prospect);
  } catch (error) {
    console.error("Error creating prospect:", err);
    res.status(500).json({ error: "Error creating prospect" });
  }
});

//update existing prospect
app.put("/api/prospects/:id", upload.single("img"), async (req, res) => {
  console.log("Received data for updating prospect:", req.body);
  
  const { error } = validateProspect(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }

  let fieldsToUpdate = {
    name: req.body.name,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location,
    deadline: req.body.deadline,
    completed: req.body.completed,
  };

  if (req.file) {
    fieldsToUpdate.img = "images/" + req.file.filename;
  }

  try {
    const prospect = await Prospect.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      { new: true }
    );

    if (!prospect) {
      return res.status(404).json("Prospect not found");
    }

    res.json(prospect);
  } catch (error) {
    res.status(500).json("Error updating prospect");
  }
});

app.put("/api/prospects/:id/completed", async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    if (!prospect) {
      return res.status(404).json("Prospect not found");
    }

    res.json(prospect);
  } catch (error) {
    res.status(500).json("Error updating prospect status");
  }
});

//delete an existing prospect
app.delete("/api/prospects/:id", async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndDelete(req.params.id);
    console.log("deleted prospect");

    if(!prospect) {
      return res.status(404).json("Prospect not found");
    }

    res.json(prospect);
  } catch (error) {
    res.status(500).json("Error deleting prospect");
  }
});

//validate prospect data
const validateProspect = (prospect) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().min(3).required(),
    company: Joi.string().min(2).required(),
    link: Joi.string().min(3).required(),
    location: Joi.allow(""),
    deadline: Joi.allow(""),
  });

  return schema.validate(prospect);
};

app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
});