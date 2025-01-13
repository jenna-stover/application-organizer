import mongoose from 'mongoose';

const prospectSchema = new mongoose.Schema({
  name: String,
  company: String,
  link: String,
  location: String,
  deadline: String,
  img: String,
  completed: { type: Boolean, default: false },
});

const Prospect = mongoose.model("Prospect", prospectSchema);

export default Prospect;