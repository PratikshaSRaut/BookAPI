// Main Backend File
require('dotenv').config()

const BookModel = require("./Database/books");
const AuthorModel = require("./Database/authors");
const PublicationModel = require("./Database/publications");

const express = require("express");
const app = express();
app.use(express.json());

var mongoose = require("mongoose");
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("CONNECTION ESTABLISHED"));

// ----------------Book-------------------

// http://localhost:3000
app.get("/", (req, res) => {
  return res.json({ Welcome: `to my backend s/w for book company` });
});

// http://localhost:3000/books
app.get("/books", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// http://localhost:3000/book
app.post("/book", async (req, res) => {
  // console.log(req.body);
  const addNewBook = await BookModel.create(req.body);
  return res.json({
    bookAdded: addNewBook,
    message: "Book is Added.",
  });
});

// http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const getSpecificBook = await BookModel.findOne({ ISBN: isbn });
  console.log(getSpecificBook);
  if (getSpecificBook === null) {
    return res.json({ error: `No Book Found for ISBN of ${isbn}` });
  }
  return res.json(getSpecificBook);
});

// http://localhost:3000/book-update/12One
app.put("/book-update/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const updateBook = await BookModel.findOneAndUpdate({ ISBN: isbn }, req.body, {
    new: true,
  });
  return res.json({ bookUpdated: updateBook, message: "Book Updated" });
});

// http://localhost:3000/book-delete/12345Three
app.delete("/book-delete/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const deleteBook = await BookModel.deleteOne({
    ISBN: isbn,
  });

  return res.json({ bookDeleted: deleteBook, message: "Book Is Deleted" });
});

// http://localhost:3000/book-author-delete/12One/1
app.delete("/book-author-delete/:isbn/:id", async (req, res) => {
  const { isbn, id } = req.params;
  let getSpecificBook = await BookModel.findOne({ ISBN: isbn });
  if (getSpecificBook === null) {
    return res.json({
      error: `No Book Found for ISBN of ${isbn}`,
    });
  } else {
    getSpecificBook.authors.remove(id);
    const updateBook = await BookModel.findOneAndUpdate({ ISBN: isbn });
    return res.json({
      bookUpdated: updateBook,
      message: "Author is Deleted from book...",
    });
  }
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
  const { category } = req.params;
  const getSpecificBooks = await BookModel.find({ Category: category });

  if (getSpecificBooks.length === 0) {
    return res.json({ error: `No Book Found for Category of ${category}` });
  }
  return res.json(getSpecificBooks);
});

// ----------------Author-------------------

// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

// http://localhost:3000/author
app.post("/author", async (req, res) => {
  // console.log(req.body);
  const addNewAuthor = await AuthorModel.create(req.body);
  return res.json({ authorAdded: addNewAuthor, message: "Author is added!!!" });
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
  const { id } = req.params;
  const getSpecificAuthor = await AuthorModel.findOne({ id: id });
  if (getSpecificAuthor === null) {
    return res.json({ error: `No Author found for the id of ${id}` });
  }
  return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-isbn/12Two
app.get("/author-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  // console.log(isbn);
  const getSpecificAuthor = await AuthorModel.find({ books: isbn });
  if (getSpecificAuthor.length === 0) {
    return res.json({ error: `No Book found for isbn of ${isbn}` });
  }
  return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id", async (req, res) => {
  const { id } = req.params;
  const updateAuthor = await AuthorModel.findOneAndUpdate({ id: id }, req.body, {
    new: true,
  });
  return res.json({ authorUpdated: updateAuthor, message: "Author Updated" });
});

// http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", async (req, res) => {
  const { id } = req.params;
  const filteredAuthors = await AuthorModel.deleteOne();

  db.authors.filter((author) => author.id !== id);
  console.log(filteredAuthors);
  db.authors = filteredAuthors;
  return res.json(db.books);
});

// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", async (req, res) => {
  const { id, isbn } = req.params;
  let getSpecificAuthor = await AuthorModel.findOne({ id: id });
  if (getSpecificAuthor === null) {
    return res.json({ error: `No Book found for the id of ${id}` });
  } else {
    getSpecificAuthor.books.remove(isbn);
    const updateAuthor = await AuthorModel.findOneAndUpdate(
      { id: id },
      getSpecificAuthor,
      { new: true }
    );
    return res.json({
      AuthorUpdated: updateAuthor,
      message: "Author was Deleted from the Book !!!",
    });
  }
});

// ----------------Publication-----------------

// http://localhost:3000/publications
app.get("/publications", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
  const addNewPublication = await PublicationModel.create(req.body);
  return res.json({
    publicationAdded: addNewPublication,
    message: "Publication Added!!",
  });
});

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", async (req, res) => {
  const { id } = req.params;
  const updatePublication = await PublicationModel.findOneAndUpdate(
    { id: id },
    req.body,
    { new: true }
  );
  return res.json({
    publicationUpdated: updatePublication,
    message: "Publication is updated !!!",
  });
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const getSpecificPublications = await PublicationModel.find({ books: isbn });

  if (getSpecificPublications.length === 0) {
    return res.json({ error: `No Publications found for isbn of ${isbn}` });
  }
  return res.json(getSpecificPublications);
});

// http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", async (req, res) => {
  const { id } = req.params;
  const deletePublication = await PublicationModel.deleteOne({ id: id });
  return res.json({
    publicationDeleted: deletePublication,
    message: "Publication is Deleted !!!",
  });
});

// http://localhost:3000/publication-book-delete/1/12One
app.delete("/publication-book-delete/:id/:isbn", async (req, res) => {
  const { id, isbn } = req.params;
  let getSpecificPublication = await PublicationModel.findOne({ id: id });
  if (getSpecificPublication === null) {
    return res.json({ error: `No Book found for the id of ${id}` });
  } else {
    getSpecificPublication.books.remove(isbn);
    const updatePublication = await PublicationModel.findOneAndUpdate(
      { id: id },
      getSpecificPublication,
      { new: true }
    );
    return res.json({
      publicationUpdated: updatePublication,
      message: "Book is Deleted from the Publication !!!",
    });
  }
});

app.listen(3000, () => {
  console.log("My express app is running on port 3000....");
});
