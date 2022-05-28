import mongoose from "../database/mongodb";

const ProjectSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: false,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
