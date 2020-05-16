const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    trim: true
  },
  setNum: {
    type: Number,
    trim: true
  },
  repNum: {
    type: Number,
    trim: true
  },
  weight: {
    type: Number,
    trim: true
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
