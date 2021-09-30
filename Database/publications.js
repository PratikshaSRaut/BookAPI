const mongoose = require("mongoose");

const PublicationSchema = {
  id: Number,
  name: String,
  books: [String],
};

const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
