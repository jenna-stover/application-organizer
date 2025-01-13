import Prospect from '../models/prospectModel.js';
import Joi from 'joi';

const validateProspect = (prospect) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().min(3).required(),
    company: Joi.string().min(2).required(),
    link: Joi.string().allow(""),
    location: Joi.allow(""),
    deadline: Joi.allow(""),
    img: Joi.string().allow(""),
    completed: Joi.boolean().default(false)
  });
  return schema.validate(prospect);
};

export const getProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find();
    res.json(prospects);
  } catch (error) {
    console.error("Error fetching prospects:", error);
    res.status(500).json("Error fetching prospects");
  }
};

export const createProspect = async (req, res) => {
  console.log("Received data foro new prospect: ", req.body);
  const result = validateProspect(req.body);  
  if (result.error) {
    console.error("Validation error:", result.error.details[0].message);
    return res.status(400).json(result.error.details[0].message);
  }

  let prospect = new Prospect({
    name: req.body.name,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location,
    deadline: req.body.deadline,
    img: req.file ? "/images/" + req.file.filename : "",
    completed: req.body.completed,
  });
  
  try {
    prospect = await prospect.save();
    res.json(prospect);
  } catch (error) {
    console.error("Error saving prospect:", error);
    res.status(500).json("Error saving prospect");
  }
};

export const updateProspect = async (req, res) => {
  console.log("Received data for updatiing prospect: ", req.body);

  const { error } = validateProspect(req.body);
  if(error) {
    return res.status(400).json(error.details[0].message);
  }

  let fieldsToUpdate = {
    name: req.body.name,
    company: req.body.company,
    link: req.body.link,
    location: req.body.location,
    deadline: req.body.deadline,
    img: req.file ? "/images/" + req.file.filename : "",
    completed: req.body.completed,
  };

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
}

export const updateProspectStatus = async (req, res) => {
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
};

export const deleteProspect = async (req, res) => {
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
};

