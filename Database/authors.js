const mongoose = require("mongoose");

const AuthorSchema = {
  id: Number,
  name: String,
  books: [String],
};

const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;
