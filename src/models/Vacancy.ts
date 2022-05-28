import mongoose from "../database/mongodb";

const VacancySchema = new mongoose.Schema({
  vacancy: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Vacancy = mongoose.model("Vacancy", VacancySchema);

export default Vacancy;
