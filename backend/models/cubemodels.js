// backend/models/cubemodels.js
const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  cubeId: { type: String, required: true },
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  rotationSpeed: Number,
  lastSaved: Date,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cube", cubeSchema);
