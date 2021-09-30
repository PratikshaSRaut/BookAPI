const mongoose = require("mongoose");

//create book schema
const BookSchema = mongoose.Schema({
  ISBN: String,
  title: String,
  authors: [Number],
  language: String,
  pubDate: String,
  numOfPage: Number,
  Category: [String],
  publication: [Number],
});

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
